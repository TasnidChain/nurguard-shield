package com.nurguard.shield.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF10B981),
    onPrimary = Color(0xFF003826),
    primaryContainer = Color(0xFF005138),
    onPrimaryContainer = Color(0xFF34D399),
    secondary = Color(0xFFB3CCC2),
    onSecondary = Color(0xFF1F352D),
    secondaryContainer = Color(0xFF354B43),
    onSecondaryContainer = Color(0xFFCEEADD),
    tertiary = Color(0xFFA0CFD9),
    onTertiary = Color(0xFF00363F),
    tertiaryContainer = Color(0xFF1F4D57),
    onTertiaryContainer = Color(0xFFBCEBF6),
    error = Color(0xFFFFB4AB),
    errorContainer = Color(0xFF93000A),
    onError = Color(0xFF690005),
    onErrorContainer = Color(0xFFFFDAD6),
    background = Color(0xFF0F1419),
    onBackground = Color(0xFFE1E3E0),
    surface = Color(0xFF0F1419),
    onSurface = Color(0xFFE1E3E0),
    surfaceVariant = Color(0xFF404944),
    onSurfaceVariant = Color(0xFFBFC9C2),
    outline = Color(0xFF89938C),
    inverseOnSurface = Color(0xFF0F1419),
    inverseSurface = Color(0xFFE1E3E0),
    inversePrimary = Color(0xFF00693E),
)

@Composable
fun NurGuardTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = DarkColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
