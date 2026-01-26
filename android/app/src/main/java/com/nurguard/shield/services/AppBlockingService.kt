package com.nurguard.shield.services

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.view.accessibility.AccessibilityEvent
import com.nurguard.shield.data.local.AppDatabase
import com.nurguard.shield.ui.NiyyahGateActivity
import com.nurguard.shield.utils.AppUsageTracker
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch

class AppBlockingService : AccessibilityService() {

    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    private lateinit var database: AppDatabase
    private lateinit var usageTracker: AppUsageTracker
    
    private val blockedPackages = setOf(
        "com.instagram.android",
        "com.zhiliaoapp.musically", // TikTok
        "com.twitter.android",
        "com.google.android.youtube",
        "com.android.chrome",
        "org.mozilla.firefox",
        "com.android.browser"
    )
    
    private var lastBlockedPackage: String? = null
    private var lastBlockedTime: Long = 0
    
    override fun onServiceConnected() {
        super.onServiceConnected()
        database = AppDatabase.getInstance(applicationContext)
        usageTracker = AppUsageTracker(applicationContext)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event == null || event.eventType != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            return
        }

        val packageName = event.packageName?.toString() ?: return
        
        // Ignore our own package
        if (packageName == "com.nurguard.shield") {
            return
        }
        
        // Check if this package is blocked
        if (blockedPackages.contains(packageName)) {
            handleBlockedApp(packageName)
        }
        
        // Track app usage for daily reports
        serviceScope.launch {
            usageTracker.recordAppOpen(packageName)
        }
    }

    private fun handleBlockedApp(packageName: String) {
        val currentTime = System.currentTimeMillis()
        
        // Debounce: Don't show Niyyah Gate if we just blocked this app < 2 seconds ago
        if (packageName == lastBlockedPackage && currentTime - lastBlockedTime < 2000) {
            return
        }
        
        lastBlockedPackage = packageName
        lastBlockedTime = currentTime
        
        // Check if app has time limit remaining
        serviceScope.launch {
            val timeLimitDao = database.timeLimitDao()
            val timeLimit = timeLimitDao.getTimeLimitForPackage(packageName)
            
            if (timeLimit != null && timeLimit.isActive) {
                val usedToday = usageTracker.getTodayUsageForPackage(packageName)
                
                if (usedToday >= timeLimit.dailyLimitMinutes * 60 * 1000) {
                    // Time limit exceeded - block completely
                    showNiyyahGate(packageName, isTimeLimitExceeded = true)
                    returnToHome()
                    return@launch
                }
            }
            
            // Show Niyyah Gate prompt
            showNiyyahGate(packageName, isTimeLimitExceeded = false)
        }
    }

    private fun showNiyyahGate(packageName: String, isTimeLimitExceeded: Boolean) {
        val intent = Intent(this, NiyyahGateActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
            addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
            putExtra("blocked_package", packageName)
            putExtra("time_limit_exceeded", isTimeLimitExceeded)
        }
        startActivity(intent)
    }

    private fun returnToHome() {
        val homeIntent = Intent(Intent.ACTION_MAIN).apply {
            addCategory(Intent.CATEGORY_HOME)
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        startActivity(homeIntent)
    }

    override fun onInterrupt() {
        // Service interrupted
    }

    override fun onDestroy() {
        super.onDestroy()
        serviceScope.cancel()
    }
}
