package com.nurguard.shield

import android.app.Application
import com.nurguard.shield.data.local.AppDatabase
import com.nurguard.shield.workers.PreferencesSyncWorker

class NurGuardApplication : Application() {
    
    val database: AppDatabase by lazy {
        AppDatabase.getInstance(this)
    }

    override fun onCreate() {
        super.onCreate()
        // Initialize app-wide components here
        
        // Schedule background sync for preferences (every 6 hours)
        PreferencesSyncWorker.schedule(this)
    }
}
