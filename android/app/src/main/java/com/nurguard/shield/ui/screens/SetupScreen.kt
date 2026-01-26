package com.nurguard.shield.ui.screens

import android.content.Intent
import android.net.VpnService
import android.provider.Settings
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.nurguard.shield.services.DnsFilterService

@Composable
fun SetupScreen(
    onSetupComplete: () -> Unit
) {
    val context = LocalContext.current
    var currentStep by remember { mutableStateOf(0) }
    
    val steps = listOf(
        "Welcome",
        "Accessibility",
        "VPN",
        "Usage Access",
        "Overlay Permission"
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp)
            .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Progress indicator
        LinearProgressIndicator(
            progress = { (currentStep + 1).toFloat() / steps.size },
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp),
            color = MaterialTheme.colorScheme.primary,
        )

        Spacer(modifier = Modifier.height(32.dp))

        when (currentStep) {
            0 -> WelcomeStep(
                onNext = { currentStep++ }
            )
            1 -> AccessibilityStep(
                onNext = { currentStep++ },
                onSkip = { currentStep++ }
            )
            2 -> VpnStep(
                onNext = { currentStep++ },
                onSkip = { currentStep++ }
            )
            3 -> UsageAccessStep(
                onNext = { currentStep++ },
                onSkip = { currentStep++ }
            )
            4 -> OverlayStep(
                onComplete = onSetupComplete
            )
        }
    }
}

@Composable
fun WelcomeStep(onNext: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            text = "🛡️",
            style = MaterialTheme.typography.displayLarge
        )

        Spacer(modifier = Modifier.height(24.dp))

        Text(
            text = "Welcome to NurGuard",
            style = MaterialTheme.typography.headlineLarge,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = "A pause between impulse and action",
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(48.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surfaceVariant
            )
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "NurGuard helps you:",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.height(12.dp))
                FeatureItem("✓ Pause before opening distracting apps")
                FeatureItem("✓ Block harmful websites")
                FeatureItem("✓ Set time limits")
                FeatureItem("✓ Protect sacred hours")
                FeatureItem("✓ Track your progress")
            }
        }

        Spacer(modifier = Modifier.height(48.dp))

        Button(
            onClick = onNext,
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text(
                text = "Get Started",
                style = MaterialTheme.typography.titleMedium
            )
        }
    }
}

@Composable
fun FeatureItem(text: String) {
    Text(
        text = text,
        style = MaterialTheme.typography.bodyMedium,
        modifier = Modifier.padding(vertical = 4.dp)
    )
}

@Composable
fun AccessibilityStep(
    onNext: () -> Unit,
    onSkip: () -> Unit
) {
    val context = LocalContext.current

    PermissionStep(
        icon = Icons.Default.Accessibility,
        title = "Accessibility Service",
        description = "NurGuard needs this permission to detect when you open blocked apps and show the Niyyah Gate prompt.",
        onGrant = {
            val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
            context.startActivity(intent)
        },
        onNext = onNext,
        onSkip = onSkip
    )
}

@Composable
fun VpnStep(
    onNext: () -> Unit,
    onSkip: () -> Unit
) {
    val context = LocalContext.current

    PermissionStep(
        icon = Icons.Default.Shield,
        title = "VPN Service",
        description = "NurGuard uses a local VPN to filter harmful websites. Your data never leaves your device.",
        onGrant = {
            val intent = VpnService.prepare(context)
            if (intent != null) {
                context.startActivity(intent)
            } else {
                // VPN already authorized, start service
                val serviceIntent = Intent(context, DnsFilterService::class.java).apply {
                    action = DnsFilterService.ACTION_START
                }
                context.startService(serviceIntent)
            }
        },
        onNext = onNext,
        onSkip = onSkip
    )
}

@Composable
fun UsageAccessStep(
    onNext: () -> Unit,
    onSkip: () -> Unit
) {
    val context = LocalContext.current

    PermissionStep(
        icon = Icons.Default.Timer,
        title = "Usage Access",
        description = "NurGuard needs this to track screen time and enforce time limits.",
        onGrant = {
            val intent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
            context.startActivity(intent)
        },
        onNext = onNext,
        onSkip = onSkip
    )
}

@Composable
fun OverlayStep(
    onComplete: () -> Unit
) {
    val context = LocalContext.current

    PermissionStep(
        icon = Icons.Default.Layers,
        title = "Display Over Apps",
        description = "NurGuard needs this to show the Niyyah Gate prompt over blocked apps.",
        onGrant = {
            val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION)
            context.startActivity(intent)
        },
        onNext = onComplete,
        onSkip = onComplete,
        isLastStep = true
    )
}

@Composable
fun PermissionStep(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    title: String,
    description: String,
    onGrant: () -> Unit,
    onNext: () -> Unit,
    onSkip: () -> Unit,
    isLastStep: Boolean = false
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.fillMaxWidth()
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            modifier = Modifier.size(80.dp),
            tint = MaterialTheme.colorScheme.primary
        )

        Spacer(modifier = Modifier.height(24.dp))

        Text(
            text = title,
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = description,
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        Spacer(modifier = Modifier.height(48.dp))

        Button(
            onClick = onGrant,
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text(
                text = "Grant Permission",
                style = MaterialTheme.typography.titleMedium
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        TextButton(
            onClick = if (isLastStep) onNext else onSkip,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(
                text = if (isLastStep) "Complete Setup" else "Skip for now",
                style = MaterialTheme.typography.titleSmall
            )
        }
    }
}
