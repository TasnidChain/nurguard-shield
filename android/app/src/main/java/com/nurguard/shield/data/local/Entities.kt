package com.nurguard.shield.data.local

import androidx.room.*

@Entity(tableName = "time_limits")
data class TimeLimit(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val packageName: String,
    val appName: String,
    val dailyLimitMinutes: Int,
    val isActive: Boolean = true,
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "blocking_rules")
data class BlockingRule(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val ruleType: String, // "app", "domain", "keyword"
    val value: String,
    val isActive: Boolean = true,
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "sacred_hours")
data class SacredHour(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val name: String, // "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha", "Custom"
    val startTime: String, // "HH:mm"
    val endTime: String, // "HH:mm"
    val isActive: Boolean = true,
    val daysOfWeek: String = "1,2,3,4,5,6,7" // Comma-separated: 1=Monday, 7=Sunday
)

@Entity(tableName = "rulesets")
data class Ruleset(
    @PrimaryKey val id: String,
    val platform: String, // "android", "ios", "all"
    val version: Int,
    val isActive: Boolean = true,
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "ruleset_items")
data class RulesetItem(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val rulesetId: String,
    val ruleType: String, // "domain", "app", "keyword"
    val value: String,
    val category: String? = null // "adult", "gambling", "social", etc.
)

@Entity(tableName = "daily_usage")
data class DailyUsage(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val date: String, // "YYYY-MM-DD"
    val packageName: String,
    val appName: String,
    val usageTimeMillis: Long,
    val openCount: Int,
    val blockedCount: Int = 0
)
