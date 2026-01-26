package com.nurguard.shield.data.local

import androidx.room.*

// App Cooldown Override entity
@Entity(tableName = "app_cooldown_overrides")
data class AppCooldownOverride(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val userId: Int,
    val packageName: String,
    val appName: String,
    val cooldownSeconds: Int,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
)

@Dao
interface AppCooldownOverrideDao {
    @Query("SELECT * FROM app_cooldown_overrides WHERE userId = :userId AND packageName = :packageName LIMIT 1")
    suspend fun getOverrideForPackage(userId: Int, packageName: String): AppCooldownOverride?

    @Query("SELECT * FROM app_cooldown_overrides WHERE userId = :userId")
    suspend fun getAllOverrides(userId: Int): List<AppCooldownOverride>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOverride(override: AppCooldownOverride)

    @Delete
    suspend fun deleteOverride(override: AppCooldownOverride)
}

// Daily Bypass entity
@Entity(tableName = "daily_bypasses")
data class DailyBypass(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val userId: Int,
    val date: String, // YYYY-MM-DD
    val bypassCount: Int = 0,
    val bypassLimit: Int = 3,
    val updatedAt: Long = System.currentTimeMillis()
)

@Dao
interface DailyBypassDao {
    @Query("SELECT * FROM daily_bypasses WHERE userId = :userId AND date = :date LIMIT 1")
    suspend fun getBypassForDate(userId: Int, date: String): DailyBypass?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBypass(bypass: DailyBypass)

    @Transaction
    suspend fun incrementBypass(userId: Int, date: String) {
        val existing = getBypassForDate(userId, date)
        if (existing != null) {
            insertBypass(existing.copy(
                bypassCount = existing.bypassCount + 1,
                updatedAt = System.currentTimeMillis()
            ))
        } else {
            insertBypass(DailyBypass(
                userId = userId,
                date = date,
                bypassCount = 1
            ))
        }
    }

    @Query("DELETE FROM daily_bypasses WHERE date < :cutoffDate")
    suspend fun deleteOldRecords(cutoffDate: String)
}

// Panic Mode Session entity
@Entity(tableName = "panic_mode_sessions")
data class PanicModeSession(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val userId: Int,
    val deviceId: String?,
    val startedAt: Long = System.currentTimeMillis(),
    val endsAt: Long,
    val isActive: Boolean = true,
    val reason: String? = null
)

@Dao
interface PanicModeDao {
    @Query("SELECT * FROM panic_mode_sessions WHERE userId = :userId AND isActive = 1 AND endsAt > :currentTime LIMIT 1")
    suspend fun getActiveSession(userId: Int, currentTime: Long = System.currentTimeMillis()): PanicModeSession?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSession(session: PanicModeSession)

    @Query("UPDATE panic_mode_sessions SET isActive = 0 WHERE id = :sessionId")
    suspend fun deactivateSession(sessionId: Int)

    @Query("UPDATE panic_mode_sessions SET isActive = 0 WHERE userId = :userId")
    suspend fun deactivateAllSessions(userId: Int)
}
