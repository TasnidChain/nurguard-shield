package com.nurguard.shield.data.local

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface TimeLimitDao {
    @Query("SELECT * FROM time_limits WHERE isActive = 1")
    fun getAllActive(): Flow<List<TimeLimit>>

    @Query("SELECT * FROM time_limits WHERE packageName = :packageName LIMIT 1")
    suspend fun getTimeLimitForPackage(packageName: String): TimeLimit?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(timeLimit: TimeLimit)

    @Update
    suspend fun update(timeLimit: TimeLimit)

    @Delete
    suspend fun delete(timeLimit: TimeLimit)
}

@Dao
interface BlockingRuleDao {
    @Query("SELECT * FROM blocking_rules WHERE isActive = 1")
    fun getAllActive(): Flow<List<BlockingRule>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(rule: BlockingRule)

    @Delete
    suspend fun delete(rule: BlockingRule)
}

@Dao
interface SacredHourDao {
    @Query("SELECT * FROM sacred_hours WHERE isActive = 1")
    fun getAllActive(): Flow<List<SacredHour>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(sacredHour: SacredHour)

    @Update
    suspend fun update(sacredHour: SacredHour)

    @Delete
    suspend fun delete(sacredHour: SacredHour)
}

@Dao
interface RulesetDao {
    @Query("SELECT * FROM rulesets WHERE platform = :platform AND isActive = 1 ORDER BY version DESC LIMIT 1")
    suspend fun getActiveRuleset(platform: String): Ruleset?

    @Query("SELECT * FROM ruleset_items WHERE rulesetId = :rulesetId")
    suspend fun getRulesetItems(rulesetId: String): List<RulesetItem>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRuleset(ruleset: Ruleset)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRulesetItems(items: List<RulesetItem>)

    @Query("DELETE FROM ruleset_items WHERE rulesetId = :rulesetId")
    suspend fun deleteRulesetItems(rulesetId: String)
}

@Dao
interface DailyUsageDao {
    @Query("SELECT * FROM daily_usage WHERE date = :date ORDER BY usageTimeMillis DESC")
    fun getUsageForDate(date: String): Flow<List<DailyUsage>>

    @Query("SELECT SUM(usageTimeMillis) FROM daily_usage WHERE date = :date")
    suspend fun getTotalUsageForDate(date: String): Long?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(usage: DailyUsage)

    @Query("DELETE FROM daily_usage WHERE date < :cutoffDate")
    suspend fun deleteOldRecords(cutoffDate: String)
}
