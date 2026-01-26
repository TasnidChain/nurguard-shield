package com.nurguard.shield.data.local

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Entity(tableName = "user_preferences")
data class UserPreferences(
    @PrimaryKey val id: Int = 1, // Single row for user preferences
    val cooldownSeconds: Int = 7, // Default 7 seconds
    val userId: Int? = null,
    val lastSyncedAt: Long? = null,
    val updatedAt: Long = System.currentTimeMillis()
)

@Dao
interface UserPreferencesDao {
    @Query("SELECT * FROM user_preferences WHERE id = 1 LIMIT 1")
    fun getPreferences(): Flow<UserPreferences?>

    @Query("SELECT * FROM user_preferences WHERE id = 1 LIMIT 1")
    suspend fun getPreferencesOnce(): UserPreferences?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun savePreferences(preferences: UserPreferences)

    @Query("UPDATE user_preferences SET cooldownSeconds = :seconds, updatedAt = :timestamp WHERE id = 1")
    suspend fun updateCooldown(seconds: Int, timestamp: Long = System.currentTimeMillis())

    @Query("UPDATE user_preferences SET lastSyncedAt = :timestamp WHERE id = 1")
    suspend fun updateLastSynced(timestamp: Long)
}
