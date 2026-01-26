package com.nurguard.shield.services

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.net.VpnService
import android.os.ParcelFileDescriptor
import com.nurguard.shield.R
import com.nurguard.shield.data.local.AppDatabase
import com.nurguard.shield.ui.MainActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import java.io.FileInputStream
import java.io.FileOutputStream
import java.net.InetSocketAddress
import java.nio.ByteBuffer
import java.nio.channels.DatagramChannel

class DnsFilterService : VpnService() {

    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private var vpnInterface: ParcelFileDescriptor? = null
    private var dnsChannel: DatagramChannel? = null
    private lateinit var database: AppDatabase
    
    private val blockedDomains = mutableSetOf<String>()
    
    // NextDNS servers (or fallback to Cloudflare)
    private val dnsServers = listOf(
        "45.90.28.0", // NextDNS primary
        "45.90.30.0", // NextDNS secondary
        "1.1.1.1",    // Cloudflare fallback
        "1.0.0.1"     // Cloudflare fallback
    )

    override fun onCreate() {
        super.onCreate()
        database = AppDatabase.getInstance(applicationContext)
        loadBlockedDomains()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_START -> startVpn()
            ACTION_STOP -> stopVpn()
        }
        return START_STICKY
    }

    private fun startVpn() {
        if (vpnInterface != null) {
            return // Already running
        }

        try {
            val builder = Builder()
                .setSession("NurGuard DNS Filter")
                .addAddress("10.0.0.2", 24)
                .addRoute("0.0.0.0", 0)
                .addDnsServer(dnsServers[0])
                .addDnsServer(dnsServers[1])
                .setBlocking(false)

            vpnInterface = builder.establish()
            
            if (vpnInterface == null) {
                stopSelf()
                return
            }

            startForeground(NOTIFICATION_ID, createNotification())
            
            // Start DNS filtering in background
            serviceScope.launch {
                runDnsFilter()
            }
            
        } catch (e: Exception) {
            e.printStackTrace()
            stopSelf()
        }
    }

    private fun stopVpn() {
        vpnInterface?.close()
        vpnInterface = null
        dnsChannel?.close()
        dnsChannel = null
        stopForeground(STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    private fun runDnsFilter() {
        val vpnFd = vpnInterface ?: return
        val inputStream = FileInputStream(vpnFd.fileDescriptor)
        val outputStream = FileOutputStream(vpnFd.fileDescriptor)
        val buffer = ByteBuffer.allocate(32767)

        try {
            dnsChannel = DatagramChannel.open()
            dnsChannel?.connect(InetSocketAddress(dnsServers[0], 53))

            while (vpnInterface != null) {
                buffer.clear()
                val length = inputStream.read(buffer.array())
                
                if (length > 0) {
                    buffer.limit(length)
                    
                    // Parse DNS query
                    val query = parseDnsQuery(buffer)
                    
                    if (query != null && isBlocked(query)) {
                        // Return NXDOMAIN for blocked domains
                        val response = createBlockedResponse(buffer)
                        outputStream.write(response.array(), 0, response.limit())
                    } else {
                        // Forward to real DNS server
                        dnsChannel?.write(buffer)
                        buffer.clear()
                        dnsChannel?.read(buffer)
                        outputStream.write(buffer.array(), 0, buffer.position())
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun parseDnsQuery(buffer: ByteBuffer): String? {
        try {
            // Skip IP header (20 bytes) and UDP header (8 bytes)
            buffer.position(28)
            
            // Skip DNS header (12 bytes)
            buffer.position(40)
            
            // Parse domain name from DNS question section
            val domain = StringBuilder()
            var length = buffer.get().toInt() and 0xFF
            
            while (length > 0) {
                for (i in 0 until length) {
                    domain.append(buffer.get().toInt().toChar())
                }
                length = buffer.get().toInt() and 0xFF
                if (length > 0) {
                    domain.append('.')
                }
            }
            
            return domain.toString().lowercase()
        } catch (e: Exception) {
            return null
        }
    }

    private fun isBlocked(domain: String): Boolean {
        // Check exact match
        if (blockedDomains.contains(domain)) {
            return true
        }
        
        // Check subdomain match (e.g., "www.example.com" blocked if "example.com" is blocked)
        for (blockedDomain in blockedDomains) {
            if (domain.endsWith(".$blockedDomain")) {
                return true
            }
        }
        
        return false
    }

    private fun createBlockedResponse(query: ByteBuffer): ByteBuffer {
        val response = ByteBuffer.allocate(query.limit())
        response.put(query.array(), 0, query.limit())
        
        // Set response flags (NXDOMAIN)
        response.putShort(30, 0x8183.toShort()) // Standard query response, NXDOMAIN
        
        return response.flip() as ByteBuffer
    }

    private fun loadBlockedDomains() {
        serviceScope.launch {
            val rulesetDao = database.rulesetDao()
            val activeRuleset = rulesetDao.getActiveRuleset("android")
            
            if (activeRuleset != null) {
                val items = rulesetDao.getRulesetItems(activeRuleset.id)
                blockedDomains.clear()
                blockedDomains.addAll(items.map { it.value.lowercase() })
            }
        }
    }

    private fun createNotification(): Notification {
        val channelId = "nurguard_vpn"
        val channel = NotificationChannel(
            channelId,
            "NurGuard Protection",
            NotificationManager.IMPORTANCE_LOW
        )
        
        val notificationManager = getSystemService(NotificationManager::class.java)
        notificationManager.createNotificationChannel(channel)

        val intent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_IMMUTABLE
        )

        return Notification.Builder(this, channelId)
            .setContentTitle("NurGuard Active")
            .setContentText("Protection is running")
            .setSmallIcon(R.drawable.ic_shield)
            .setContentIntent(pendingIntent)
            .build()
    }

    override fun onDestroy() {
        super.onDestroy()
        stopVpn()
        serviceScope.cancel()
    }

    companion object {
        const val ACTION_START = "com.nurguard.shield.START_VPN"
        const val ACTION_STOP = "com.nurguard.shield.STOP_VPN"
        private const val NOTIFICATION_ID = 1001
    }
}
