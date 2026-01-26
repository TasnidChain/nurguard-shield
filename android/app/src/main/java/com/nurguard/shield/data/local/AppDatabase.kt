package com.nurguard.shield.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters

@Database(
    entities = [
        TimeLimit::class,
        BlockingRule::class,
        SacredHour::class,
        Ruleset::class,
        RulesetItem::class,
        DailyUsage::class
    ],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    
    abstract fun timeLimitDao(): TimeLimitDao
    abstract fun blockingRuleDao(): BlockingRuleDao
    abstract fun sacredHourDao(): SacredHourDao
    abstract fun rulesetDao(): RulesetDao
    abstract fun dailyUsageDao(): DailyUsageDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "nurguard_database"
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
