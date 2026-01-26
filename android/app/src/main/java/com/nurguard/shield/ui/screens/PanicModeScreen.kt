package com.nurguard.shield.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nurguard.shield.data.local.AppDatabase
import com.nurguard.shield.data.local.PanicModeSession
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PanicModeScreen(onNavigateBack: () -> Unit) {
    val context = LocalContext.current
    val database = AppDatabase.getInstance(context)
    val scope = rememberCoroutineScope()
    
    var isActive by remember { mutableStateOf(false) }
    var remainingMinutes by remember { mutableStateOf(0) }
    var showActivationDialog by remember { mutableStateOf(false) }
    
    // Check if panic mode is active
    LaunchedEffect(Unit) {
        val activeSession = database.panicModeDao().getActiveSession(1) // TODO: Get real userId
        if (activeSession != null) {
            isActive = true
            val remaining = (activeSession.endsAt - System.currentTimeMillis()) / 60000
            remainingMinutes = remaining.toInt()
            
            // Start countdown
            while (remainingMinutes > 0) {
                delay(60000) // Update every minute
                remainingMinutes--
            }
            isActive = false
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Emergency Panic Mode") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, "Back")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            if (isActive) {
                ActivePanicMode(
                    remainingMinutes = remainingMinutes,
                    onDeactivate = {
                        scope.launch {
                            database.panicModeDao().deactivateAllSessions(1) // TODO: Get real userId
                            isActive = false
                        }
                    }
                )
            } else {
                InactivePanicMode(
                    onActivate = { showActivationDialog = true }
                )
            }
        }
    }

    // Activation confirmation dialog
    if (showActivationDialog) {
        PanicModeActivationDialog(
            onDismiss = { showActivationDialog = false },
            onConfirm = { duration ->
                scope.launch {
                    val endsAt = System.currentTimeMillis() + (duration * 60000)
                    database.panicModeDao().insertSession(
                        PanicModeSession(
                            userId = 1, // TODO: Get real userId
                            deviceId = null,
                            endsAt = endsAt
                        )
                    )
                    isActive = true
                    remainingMinutes = duration
                    showActivationDialog = false
                    
                    // Start countdown
                    while (remainingMinutes > 0) {
                        delay(60000)
                        remainingMinutes--
                    }
                    isActive = false
                }
            }
        )
    }
}

@Composable
fun InactivePanicMode(onActivate: () -> Unit) {
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

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        // Warning icon with pulse
        Box(
            modifier = Modifier
                .size(120.dp)
                .scale(scale)
                .background(
                    color = Color(0xFFFF6B6B).copy(alpha = 0.2f),
                    shape = CircleShape
                ),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Warning,
                contentDescription = "Panic Mode",
                modifier = Modifier.size(64.dp),
                tint = Color(0xFFFF6B6B)
            )
        }

        Text(
            text = "Emergency Lockdown",
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center
        )

        Text(
            text = "Feeling overwhelmed? Activate panic mode to block ALL apps immediately.",
            fontSize = 16.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center,
            lineHeight = 24.sp
        )

        Spacer(modifier = Modifier.height(16.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            ),
            shape = RoundedCornerShape(12.dp)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "What happens:",
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 16.sp
                )
                Spacer(modifier = Modifier.height(12.dp))
                BulletPoint("All blocked apps become inaccessible")
                BulletPoint("No bypasses allowed")
                BulletPoint("Cooldown timer set to maximum")
                BulletPoint("Lasts 15 minutes to 2 hours")
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = onActivate,
            modifier = Modifier
                .fillMaxWidth()
                .height(64.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFFF6B6B)
            ),
            shape = RoundedCornerShape(16.dp)
        ) {
            Text(
                text = "ACTIVATE PANIC MODE",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
fun ActivePanicMode(
    remainingMinutes: Int,
    onDeactivate: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        // Active indicator
        Box(
            modifier = Modifier
                .size(120.dp)
                .background(
                    color = Color(0xFFFF6B6B),
                    shape = CircleShape
                ),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Warning,
                contentDescription = "Active",
                modifier = Modifier.size(64.dp),
                tint = Color.White
            )
        }

        Text(
            text = "Panic Mode Active",
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFFFF6B6B)
        )

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = Color(0xFFFF6B6B).copy(alpha = 0.1f)
            ),
            shape = RoundedCornerShape(12.dp)
        ) {
            Column(
                modifier = Modifier.padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "$remainingMinutes",
                    fontSize = 64.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFFFF6B6B)
                )
                Text(
                    text = "minutes remaining",
                    fontSize = 16.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        Text(
            text = "All blocked apps are currently inaccessible. Take this time to breathe, pray, or do something productive.",
            fontSize = 14.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center,
            lineHeight = 20.sp
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedButton(
            onClick = onDeactivate,
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            colors = ButtonDefaults.outlinedButtonColors(
                contentColor = Color(0xFFFF6B6B)
            ),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text(
                text = "Deactivate Early",
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}

@Composable
fun PanicModeActivationDialog(
    onDismiss: () -> Unit,
    onConfirm: (Int) -> Unit
) {
    val durations = listOf(
        15 to "15 minutes",
        30 to "30 minutes",
        60 to "1 hour",
        120 to "2 hours"
    )

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "Activate Panic Mode",
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            Column {
                Text(
                    text = "How long do you need?",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                
                durations.forEach { (minutes, label) ->
                    Button(
                        onClick = { onConfirm(minutes) },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFFFF6B6B)
                        )
                    ) {
                        Text(label)
                    }
                }
            }
        },
        confirmButton = {},
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}

@Composable
fun BulletPoint(text: String) {
    Row(
        modifier = Modifier.padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = "•",
            fontSize = 16.sp,
            color = MaterialTheme.colorScheme.primary
        )
        Text(
            text = text,
            fontSize = 14.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.weight(1f)
        )
    }
}
