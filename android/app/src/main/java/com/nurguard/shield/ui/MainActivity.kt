package com.nurguard.shield.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.nurguard.shield.ui.screens.*
import com.nurguard.shield.ui.theme.NurGuardTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            NurGuardTheme {
                NurGuardApp()
            }
        }
    }
}

@Composable
fun NurGuardApp() {
    val navController = rememberNavController()

    Surface(
        color = MaterialTheme.colorScheme.background
    ) {
        NavHost(
            navController = navController,
            startDestination = "setup"
        ) {
            composable("setup") {
                SetupScreen(
                    onSetupComplete = {
                        navController.navigate("home") {
                            popUpTo("setup") { inclusive = true }
                        }
                    }
                )
            }
            
            composable("home") {
                HomeScreen(
                    onNavigateToSacredHours = { navController.navigate("sacred_hours") },
                    onNavigateToDailyReport = { navController.navigate("daily_report") },
                    onNavigateToSettings = { navController.navigate("settings") }
                )
            }
            
            composable("sacred_hours") {
                SacredHoursScreen(
                    onNavigateBack = { navController.popBackStack() }
                )
            }
            
            composable("daily_report") {
                DailyReportScreen(
                    onNavigateBack = { navController.popBackStack() }
                )
            }
            
            composable("settings") {
                SettingsScreenEnhanced(
                    onNavigateBack = { navController.popBackStack() }
                )
            }
        }
    }
}
