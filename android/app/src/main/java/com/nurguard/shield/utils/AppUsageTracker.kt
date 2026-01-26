package com.nurguard.shield.utils

import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import java.util.Calendar

class AppUsageTracker(private val context: Context) {

    private val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager

    /**
     * Get today's usage time for a specific package in milliseconds
     */
    fun getTodayUsageForPackage(packageName: String): Long {
        val calendar = Calendar.getInstance()
        calendar.set(Calendar.HOUR_OF_DAY, 0)
        calendar.set(Calendar.MINUTE, 0)
        calendar.set(Calendar.SECOND, 0)
        calendar.set(Calendar.MILLISECOND, 0)
        val startTime = calendar.timeInMillis
        val endTime = System.currentTimeMillis()

        val usageStatsList = usageStatsManager.queryUsageStats(
            UsageStatsManager.INTERVAL_DAILY,
            startTime,
            endTime
        )

        return usageStatsList
            ?.firstOrNull { it.packageName == packageName }
            ?.totalTimeInForeground ?: 0L
    }

    /**
     * Get all app usage stats for today
     */
    fun getTodayUsageStats(): List<UsageStats> {
        val calendar = Calendar.getInstance()
        calendar.set(Calendar.HOUR_OF_DAY, 0)
        calendar.set(Calendar.MINUTE, 0)
        calendar.set(Calendar.SECOND, 0)
        calendar.set(Calendar.MILLISECOND, 0)
        val startTime = calendar.timeInMillis
        val endTime = System.currentTimeMillis()

        return usageStatsManager.queryUsageStats(
            UsageStatsManager.INTERVAL_DAILY,
            startTime,
            endTime
        ) ?: emptyList()
    }

    /**
     * Record app open event (for analytics)
     */
    suspend fun recordAppOpen(packageName: String) {
        // This would save to local database for daily reports
        // Implementation depends on database setup
    }

    /**
     * Get total screen time for today across all apps
     */
    fun getTotalScreenTimeToday(): Long {
        return getTodayUsageStats().sumOf { it.totalTimeInForeground }
    }

    /**
     * Format milliseconds to human-readable time
     */
    fun formatTime(millis: Long): String {
        val hours = millis / (1000 * 60 * 60)
        val minutes = (millis % (1000 * 60 * 60)) / (1000 * 60)
        
        return when {
            hours > 0 -> "${hours}h ${minutes}m"
            minutes > 0 -> "${minutes}m"
            else -> "< 1m"
        }
    }
}
