package com.nurguard.shield.data.remote

import com.nurguard.shield.BuildConfig
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*
import java.util.concurrent.TimeUnit

object ApiClient {
    
    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = if (BuildConfig.DEBUG) {
            HttpLoggingInterceptor.Level.BODY
        } else {
            HttpLoggingInterceptor.Level.NONE
        }
    }

    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()

    private val retrofit = Retrofit.Builder()
        .baseUrl(BuildConfig.API_BASE_URL)
        .client(okHttpClient)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val api: NurGuardApi = retrofit.create(NurGuardApi::class.java)
}

interface NurGuardApi {
    
    @POST("/api/trpc/mobile.devices.register")
    suspend fun registerDevice(@Body request: RegisterDeviceRequest): ApiResponse<RegisterDeviceResponse>
    
    @POST("/api/trpc/mobile.entitlements.verify")
    suspend fun verifyEntitlement(@Body request: VerifyEntitlementRequest): ApiResponse<VerifyEntitlementResponse>
    
    @GET("/api/trpc/mobile.rules.fetch")
    suspend fun fetchRules(@Query("userId") userId: Int): ApiResponse<FetchRulesResponse>
    
    @POST("/api/trpc/mobile.reports.submit")
    suspend fun submitDailyReport(@Body request: SubmitReportRequest): ApiResponse<SubmitReportResponse>
    
    @GET("/api/trpc/mobile.config.get")
    suspend fun getUserConfig(@Query("userId") userId: Int): ApiResponse<UserConfigResponse>
}

// Request/Response models
data class ApiResponse<T>(
    val result: Result<T>
)

data class Result<T>(
    val data: T
)

data class RegisterDeviceRequest(
    val userId: Int,
    val platform: String,
    val deviceFingerprint: String,
    val appVersion: String,
    val osVersion: String,
    val model: String
)

data class RegisterDeviceResponse(
    val deviceId: String,
    val registered: Boolean
)

data class VerifyEntitlementRequest(
    val userId: Int,
    val deviceId: String
)

data class VerifyEntitlementResponse(
    val hasAccess: Boolean,
    val status: String,
    val expiresAt: String?,
    val token: String?
)

data class FetchRulesResponse(
    val rulesetId: String,
    val version: Int,
    val rules: List<Rule>
)

data class Rule(
    val ruleType: String,
    val value: String,
    val category: String?
)

data class SubmitReportRequest(
    val userId: Int,
    val deviceId: String,
    val date: String,
    val totalScreenTime: Long,
    val blockedAttempts: Int,
    val appUsage: List<AppUsageData>
)

data class AppUsageData(
    val packageName: String,
    val appName: String,
    val usageTimeMillis: Long,
    val openCount: Int
)

data class SubmitReportResponse(
    val received: Boolean
)

data class UserConfigResponse(
    val sacredHours: List<SacredHourConfig>,
    val timeBudgets: List<TimeBudgetConfig>,
    val cooldownSeconds: Int
)

data class SacredHourConfig(
    val name: String,
    val startTime: String,
    val endTime: String,
    val isActive: Boolean
)

data class TimeBudgetConfig(
    val category: String,
    val dailyLimitMinutes: Int
)
