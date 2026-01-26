package com.nurguard.shield.workers

import android.content.Context
import androidx.work.*
import com.nurguard.shield.data.local.AppDatabase
import com.nurguard.shield.data.remote.ApiClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.util.concurrent.TimeUnit

/**
 * Background worker that syncs user preferences (cooldown, etc.) from backend API
 * Runs periodically every 6 hours
 */
class PreferencesSyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        try {
            val database = AppDatabase.getInstance(applicationContext)
            val prefsDao = database.userPreferencesDao()
            
            // TODO: Get real userId from auth
            val userId = 1
            
            // Fetch latest preferences from backend
            val response = ApiClient.create(applicationContext)
                .getPreferences(userId)
                .execute()
            
            if (response.isSuccessful && response.body() != null) {
                val serverPrefs = response.body()!!
                val localPrefs = prefsDao.getPreferencesOnce()
                
                // Only update if server has newer data
                val serverTime = serverPrefs.lastSyncedAt?.let { 
                    java.time.Instant.parse(it).toEpochMilli() 
                } ?: 0L
                
                val localTime = localPrefs?.updatedAt ?: 0L
                
                if (serverTime > localTime) {
                    // Server has newer data, update local
                    if (localPrefs != null) {
                        prefsDao.updateCooldown(
                            serverPrefs.cooldownSeconds,
                            System.currentTimeMillis()
                        )
                    } else {
                        // Create new local preferences
                        prefsDao.savePreferences(
                            com.nurguard.shield.data.local.UserPreferences(
                                cooldownSeconds = serverPrefs.cooldownSeconds
                            )
                        )
                    }
                    prefsDao.updateLastSynced(System.currentTimeMillis())
                }
                
                Result.success()
            } else {
                // API call failed, retry later
                Result.retry()
            }
        } catch (e: Exception) {
            e.printStackTrace()
            // Network error or other issue, retry
            Result.retry()
        }
    }

    companion object {
        const val WORK_NAME = "preferences_sync"
        
        /**
         * Schedule periodic sync every 6 hours
         */
        fun schedule(context: Context) {
            val constraints = Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build()
            
            val syncRequest = PeriodicWorkRequestBuilder<PreferencesSyncWorker>(
                6, TimeUnit.HOURS,
                15, TimeUnit.MINUTES // Flex interval
            )
                .setConstraints(constraints)
                .setBackoffCriteria(
                    BackoffPolicy.EXPONENTIAL,
                    15, TimeUnit.MINUTES
                )
                .build()
            
            WorkManager.getInstance(context)
                .enqueueUniquePeriodicWork(
                    WORK_NAME,
                    ExistingPeriodicWorkPolicy.KEEP,
                    syncRequest
                )
        }
        
        /**
         * Trigger immediate one-time sync
         */
        fun syncNow(context: Context) {
            val constraints = Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build()
            
            val syncRequest = OneTimeWorkRequestBuilder<PreferencesSyncWorker>()
                .setConstraints(constraints)
                .build()
            
            WorkManager.getInstance(context)
                .enqueue(syncRequest)
        }
    }
}
