package com.nurguard.shield.ui

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nurguard.shield.ui.theme.NurGuardTheme
import kotlinx.coroutines.delay

class NiyyahGateActivity : ComponentActivity() {

    private var blockedPackage: String = ""
    private var isTimeLimitExceeded: Boolean = false
    private var cooldownSeconds: Int = 7

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        blockedPackage = intent.getStringExtra("blocked_package") ?: ""
        isTimeLimitExceeded = intent.getBooleanExtra("time_limit_exceeded", false)
        
        // Determine cooldown based on app
        cooldownSeconds = when {
            isTimeLimitExceeded -> 15 // Longer cooldown for time limit exceeded
            blockedPackage.contains("instagram") -> 7
            blockedPackage.contains("tiktok") || blockedPackage.contains("musically") -> 15
            blockedPackage.contains("twitter") -> 7
            blockedPackage.contains("youtube") -> 7
            else -> 7
        }

        setContent {
            NurGuardTheme {
                NiyyahGateScreen(
                    appName = getAppName(blockedPackage),
                    cooldownSeconds = cooldownSeconds,
                    isTimeLimitExceeded = isTimeLimitExceeded,
                    onContinue = { handleContinue() },
                    onWalkAway = { handleWalkAway() }
                )
            }
        }
    }

    private fun getAppName(packageName: String): String {
        return when {
            packageName.contains("instagram") -> "Instagram"
            packageName.contains("tiktok") || packageName.contains("musically") -> "TikTok"
            packageName.contains("twitter") -> "Twitter"
            packageName.contains("youtube") -> "YouTube"
            packageName.contains("chrome") -> "Chrome"
            packageName.contains("firefox") -> "Firefox"
            else -> "this app"
        }
    }

    private fun handleContinue() {
        // User chose to continue - return to the app
        setResult(Activity.RESULT_OK)
        finish()
    }

    private fun handleWalkAway() {
        // User chose to walk away - go to home screen
        val homeIntent = Intent(Intent.ACTION_MAIN).apply {
            addCategory(Intent.CATEGORY_HOME)
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        startActivity(homeIntent)
        finish()
    }

    override fun onBackPressed() {
        // Prevent back button from bypassing the gate
        handleWalkAway()
    }
}

@Composable
fun NiyyahGateScreen(
    appName: String,
    cooldownSeconds: Int,
    isTimeLimitExceeded: Boolean,
    onContinue: () -> Unit,
    onWalkAway: () -> Unit
) {
    var remainingSeconds by remember { mutableStateOf(cooldownSeconds) }
    var canContinue by remember { mutableStateOf(false) }

    // Pulse animation for the shield icon
    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val scale by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = 1.1f,
        animationSpec = infiniteRepeatable(
            animation = tween(1000, easing = EaseInOut),
            repeatMode = RepeatMode.Reverse
        ),
        label = "scale"
    )

    // Countdown timer
    LaunchedEffect(Unit) {
        while (remainingSeconds > 0) {
            delay(1000)
            remainingSeconds--
        }
        canContinue = true
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xE6000000)) // Semi-transparent black
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color(0xFF1A1F26)
            ),
            elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
        ) {
            Column(
                modifier = Modifier
                    .padding(32.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Shield icon with pulse animation
                Text(
                    text = "🛡️",
                    fontSize = 72.sp,
                    modifier = Modifier.scale(scale)
                )

                Spacer(modifier = Modifier.height(24.dp))

                // Title
                Text(
                    text = if (isTimeLimitExceeded) {
                        "Time Limit Reached"
                    } else {
                        "What's your intention?"
                    },
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(12.dp))

                // Subtitle
                Text(
                    text = if (isTimeLimitExceeded) {
                        "You've reached your daily limit for $appName"
                    } else {
                        "Take a moment to reflect before opening $appName"
                    },
                    fontSize = 16.sp,
                    color = Color(0xFFB0B8C1),
                    textAlign = TextAlign.Center,
                    lineHeight = 24.sp
                )

                Spacer(modifier = Modifier.height(32.dp))

                // Countdown or ready state
                if (!canContinue) {
                    CircularProgressIndicator(
                        progress = { (cooldownSeconds - remainingSeconds).toFloat() / cooldownSeconds },
                        modifier = Modifier.size(80.dp),
                        color = Color(0xFF10B981),
                        strokeWidth = 6.dp,
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Text(
                        text = "$remainingSeconds",
                        fontSize = 48.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF10B981)
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Text(
                        text = "seconds to reflect",
                        fontSize = 14.sp,
                        color = Color(0xFFB0B8C1)
                    )
                } else {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "Ready",
                        modifier = Modifier.size(80.dp),
                        tint = Color(0xFF10B981)
                    )
                }

                Spacer(modifier = Modifier.height(32.dp))

                // Action buttons
                if (!isTimeLimitExceeded) {
                    Button(
                        onClick = onContinue,
                        enabled = canContinue,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFF10B981),
                            disabledContainerColor = Color(0xFF2D3748)
                        ),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text(
                            text = "Continue with intention",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))
                }

                OutlinedButton(
                    onClick = onWalkAway,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = Color.White
                    ),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text(
                        text = if (isTimeLimitExceeded) "Go Home" else "Walk away",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}
