import SwiftUI
import FamilyControls

struct HomeView: View {
    @EnvironmentObject var shieldManager: ShieldManager
    @State private var showAppPicker = false
    @State private var showPanicMode = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    VStack(spacing: 8) {
                        Text("NurGuard Shield")
                            .font(.system(size: 28, weight: .bold))
                            .foregroundColor(.white)
                        
                        Text(shieldManager.isShieldActive ? "Protection Active" : "Not Protected")
                            .font(.system(size: 16))
                            .foregroundColor(shieldManager.isShieldActive ? Color(red: 16/255, green: 185/255, blue: 129/255) : .gray)
                    }
                    .padding(.top, 32)
                    
                    // Protection Status Card
                    VStack(spacing: 16) {
                        Image(systemName: shieldManager.isShieldActive ? "shield.fill" : "shield")
                            .font(.system(size: 60))
                            .foregroundColor(shieldManager.isShieldActive ? Color(red: 16/255, green: 185/255, blue: 129/255) : .gray)
                        
                        Text("\(shieldManager.blockedApps.count) apps blocked")
                            .font(.system(size: 18, weight: .medium))
                            .foregroundColor(.white)
                        
                        Button(action: { showAppPicker = true }) {
                            Text("Select Apps to Block")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .frame(height: 48)
                                .background(Color(red: 16/255, green: 185/255, blue: 129/255))
                                .cornerRadius(12)
                        }
                    }
                    .padding(24)
                    .background(Color(red: 30/255, green: 41/255, blue: 59/255))
                    .cornerRadius(16)
                    .padding(.horizontal, 20)
                    
                    // Quick Actions
                    VStack(spacing: 16) {
                        QuickActionCard(
                            icon: "exclamationmark.triangle.fill",
                            title: "Emergency Panic Mode",
                            subtitle: "Block everything now",
                            color: .red,
                            action: { showPanicMode = true }
                        )
                        
                        QuickActionCard(
                            icon: "chart.bar.fill",
                            title: "View Usage Heatmap",
                            subtitle: "See your activity patterns",
                            color: Color(red: 16/255, green: 185/255, blue: 129/255),
                            action: {}
                        )
                    }
                    .padding(.horizontal, 20)
                    
                    // Stats
                    HStack(spacing: 16) {
                        StatCard(
                            title: "Bypasses Today",
                            value: "\(shieldManager.dailyBypassesUsed)/\(shieldManager.dailyBypassLimit)",
                            icon: "hand.raised.fill"
                        )
                        
                        StatCard(
                            title: "Cooldown",
                            value: "\(shieldManager.cooldownSeconds)s",
                            icon: "clock.fill"
                        )
                    }
                    .padding(.horizontal, 20)
                }
                .padding(.bottom, 32)
            }
            .background(Color(red: 2/255, green: 6/255, blue: 23/255))
            .navigationBarHidden(true)
        }
        .familyActivityPicker(isPresented: $showAppPicker, selection: $shieldManager.blockedApps)
        .sheet(isPresented: $showPanicMode) {
            PanicModeView()
        }
    }
}

struct QuickActionCard: View {
    let icon: String
    let title: String
    let subtitle: String
    let color: Color
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 16) {
                Image(systemName: icon)
                    .font(.system(size: 32))
                    .foregroundColor(color)
                    .frame(width: 60, height: 60)
                    .background(color.opacity(0.2))
                    .cornerRadius(12)
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.white)
                    
                    Text(subtitle)
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .foregroundColor(.gray)
            }
            .padding(16)
            .background(Color(red: 30/255, green: 41/255, blue: 59/255))
            .cornerRadius(12)
        }
    }
}

struct StatCard: View {
    let title: String
    let value: String
    let icon: String
    
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 28))
                .foregroundColor(Color(red: 16/255, green: 185/255, blue: 129/255))
            
            Text(value)
                .font(.system(size: 24, weight: .bold))
                .foregroundColor(.white)
            
            Text(title)
                .font(.system(size: 12))
                .foregroundColor(.gray)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 20)
        .background(Color(red: 30/255, green: 41/255, blue: 59/255))
        .cornerRadius(12)
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
            .environmentObject(ShieldManager())
    }
}
