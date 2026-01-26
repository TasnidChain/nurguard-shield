package com.nurguard.shield.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import java.time.LocalDate
import java.time.YearMonth
import java.time.format.TextStyle
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UsageHeatmapScreen(onNavigateBack: () -> Unit) {
    val currentMonth = remember { YearMonth.now() }
    
    // Mock data - in real app, load from database
    val usageData = remember {
        generateMockUsageData(currentMonth)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Usage Heatmap") },
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
                .padding(16.dp)
                .verticalScroll(rememberScrollState())
        ) {
            Text(
                text = "Your accountability mirror",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Month header
            Text(
                text = "${currentMonth.month.getDisplayName(TextStyle.FULL, Locale.getDefault())} ${currentMonth.year}",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Calendar heatmap
            CalendarHeatmap(
                yearMonth = currentMonth,
                usageData = usageData
            )
            
            Spacer(modifier = Modifier.height(24.dp))
            
            // Legend
            HeatmapLegend()
            
            Spacer(modifier = Modifier.height(24.dp))
            
            // Stats summary
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                ),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "This Month",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    StatRow("Clean days", "18")
                    StatRow("Blocked attempts", "142")
                    StatRow("Bypasses used", "9")
                    StatRow("Average daily blocks", "6.8")
                }
            }
        }
    }
}

@Composable
fun CalendarHeatmap(
    yearMonth: YearMonth,
    usageData: Map<LocalDate, Int>
) {
    val firstDayOfMonth = yearMonth.atDay(1)
    val lastDayOfMonth = yearMonth.atEndOfMonth()
    val daysInMonth = yearMonth.lengthOfMonth()
    val firstDayOfWeek = firstDayOfMonth.dayOfWeek.value % 7 // 0 = Sunday
    
    Column {
        // Weekday headers
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            listOf("S", "M", "T", "W", "T", "F", "S").forEach { day ->
                Text(
                    text = day,
                    modifier = Modifier.weight(1f),
                    textAlign = TextAlign.Center,
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }
        
        Spacer(modifier = Modifier.height(8.dp))
        
        // Calendar grid
        LazyVerticalGrid(
            columns = GridCells.Fixed(7),
            modifier = Modifier.height(300.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            // Empty cells before first day
            items(firstDayOfWeek) {
                Box(modifier = Modifier.aspectRatio(1f))
            }
            
            // Days of month
            items(daysInMonth) { dayIndex ->
                val day = dayIndex + 1
                val date = yearMonth.atDay(day)
                val usageCount = usageData[date] ?: 0
                
                DayCell(
                    day = day,
                    usageCount = usageCount,
                    isToday = date == LocalDate.now()
                )
            }
        }
    }
}

@Composable
fun DayCell(
    day: Int,
    usageCount: Int,
    isToday: Boolean
) {
    val color = when {
        usageCount == 0 -> Color(0xFF10B981) // Green - clean day
        usageCount in 1..3 -> Color(0xFFFFA500) // Orange - low usage
        usageCount in 4..10 -> Color(0xFFFF6B6B) // Red - medium usage
        else -> Color(0xFF8B0000) // Dark red - high usage
    }
    
    Box(
        modifier = Modifier
            .aspectRatio(1f)
            .background(
                color = color.copy(alpha = 0.2f),
                shape = RoundedCornerShape(8.dp)
            )
            .border(
                width = if (isToday) 2.dp else 0.dp,
                color = if (isToday) MaterialTheme.colorScheme.primary else Color.Transparent,
                shape = RoundedCornerShape(8.dp)
            ),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = day.toString(),
            fontSize = 12.sp,
            fontWeight = if (isToday) FontWeight.Bold else FontWeight.Normal,
            color = if (usageCount > 5) Color.White else MaterialTheme.colorScheme.onSurface
        )
    }
}

@Composable
fun HeatmapLegend() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        LegendItem(Color(0xFF10B981), "Clean")
        LegendItem(Color(0xFFFFA500), "1-3")
        LegendItem(Color(0xFFFF6B6B), "4-10")
        LegendItem(Color(0xFF8B0000), "10+")
    }
}

@Composable
fun LegendItem(color: Color, label: String) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        Box(
            modifier = Modifier
                .size(16.dp)
                .background(color.copy(alpha = 0.2f), RoundedCornerShape(4.dp))
        )
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

@Composable
fun StatRow(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Text(
            text = value,
            style = MaterialTheme.typography.bodyMedium,
            fontWeight = FontWeight.SemiBold
        )
    }
}

fun generateMockUsageData(yearMonth: YearMonth): Map<LocalDate, Int> {
    val data = mutableMapOf<LocalDate, Int>()
    val daysInMonth = yearMonth.lengthOfMonth()
    
    for (day in 1..daysInMonth) {
        val date = yearMonth.atDay(day)
        // Random usage count (0-15)
        data[date] = (0..15).random()
    }
    
    return data
}
