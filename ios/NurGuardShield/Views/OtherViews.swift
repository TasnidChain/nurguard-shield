import SwiftUI

// MARK: - Settings View
struct SettingsView: View {
    @EnvironmentObject var shieldManager: ShieldManager
    @EnvironmentObject var authManager: AuthManager
    @State private var showCooldownPicker = false
    
    var body: some View {
        NavigationView {
            List {
                Section("Cooldown Settings") {
                    Button {
                        showCooldownPicker = true
                    } label: {
                        HStack {
                            Text("Cooldown Duration")
                            Spacer()
                            Text("\(shieldManager.cooldownSeconds)s")
                                .foregroundColor(.gray)
                        }
                    }
                }
                
                Section("Bypass Limits") {
                    HStack {
                        Text("Daily Bypass Limit")
                        Spacer()
                        Text("\(shieldManager.dailyBypassLimit)")
                            .foregroundColor(.gray)
                    }
                    
                    HStack {
                        Text("Used Today")
                        Spacer()
                        Text("\(shieldManager.dailyBypassesUsed)")
                            .foregroundColor(.gray)
                    }
                }
                
                Section("Account") {
                    Button("Sign Out", role: .destructive) {
                        authManager.logout()
                    }
                }
            }
            .navigationTitle("Settings")
        }
        .sheet(isPresented: $showCooldownPicker) {
            CooldownPickerView(selectedCooldown: $shieldManager.cooldownSeconds)
        }
    }
}

// MARK: - Cooldown Picker
struct CooldownPickerView: View {
    @Binding var selectedCooldown: Int
    @Environment(\.dismiss) var dismiss
    
    let cooldownOptions = [3, 7, 15, 33, 60]
    
    var body: some View {
        NavigationView {
            List {
                ForEach(cooldownOptions, id: \.self) { seconds in
                    Button {
                        selectedCooldown = seconds
                        dismiss()
                    } label: {
                        HStack {
                            Text("\(seconds) seconds")
                            Spacer()
                            if selectedCooldown == seconds {
                                Image(systemName: "checkmark")
                                    .foregroundColor(Color(red: 16/255, green: 185/255, blue: 129/255))
                            }
                        }
                    }
                }
            }
            .navigationTitle("Select Cooldown")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
    }
}

// MARK: - Heatmap View
struct HeatmapView: View {
    @State private var usageData: [Date: Int] = [:]
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    Text("Usage Heatmap")
                        .font(.system(size: 28, weight: .bold))
                        .foregroundColor(.white)
                        .padding(.top, 32)
                    
                    // Calendar grid (simplified - would need actual implementation)
                    LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 7), spacing: 8) {
                        ForEach(0..<35, id: \.self) { index in
                            RoundedRectangle(cornerRadius: 4)
                                .fill(Color(red: 16/255, green: 185/255, blue: 129/255).opacity(Double.random(in: 0.1...1.0)))
                                .frame(height: 40)
                        }
                    }
                    .padding(.horizontal, 20)
                    
                    // Legend
                    HStack {
                        Text("Less")
                            .font(.system(size: 12))
                            .foregroundColor(.gray)
                        
                        HStack(spacing: 4) {
                            ForEach([0.2, 0.4, 0.6, 0.8, 1.0], id: \.self) { opacity in
                                RoundedRectangle(cornerRadius: 2)
                                    .fill(Color(red: 16/255, green: 185/255, blue: 129/255).opacity(opacity))
                                    .frame(width: 16, height: 16)
                            }
                        }
                        
                        Text("More")
                            .font(.system(size: 12))
                            .foregroundColor(.gray)
                    }
                    .padding(.horizontal, 20)
                }
                .padding(.bottom, 32)
            }
            .background(Color(red: 2/255, green: 6/255, blue: 23/255))
            .navigationBarHidden(true)
        }
    }
}

// MARK: - Panic Mode View
struct PanicModeView: View {
    @EnvironmentObject var shieldManager: ShieldManager
    @Environment(\.dismiss) var dismiss
    @State private var selectedDuration = 15
    
    let durations = [15, 30, 60, 120]
    
    var body: some View {
        NavigationView {
            VStack(spacing: 32) {
                Spacer()
                
                Image(systemName: "exclamationmark.triangle.fill")
                    .font(.system(size: 80))
                    .foregroundColor(.red)
                
                VStack(spacing: 12) {
                    Text("Emergency Panic Mode")
                        .font(.system(size: 28, weight: .bold))
                        .foregroundColor(.white)
                    
                    Text("Block ALL apps for a set duration")
                        .font(.system(size: 16))
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                }
                
                // Duration picker
                VStack(spacing: 16) {
                    Text("Duration")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(.white)
                    
                    Picker("Duration", selection: $selectedDuration) {
                        ForEach(durations, id: \.self) { minutes in
                            Text("\(minutes) min").tag(minutes)
                        }
                    }
                    .pickerStyle(.segmented)
                }
                .padding(.horizontal, 32)
                
                Spacer()
                
                // Activate button
                Button {
                    shieldManager.activatePanicMode(durationMinutes: selectedDuration)
                    dismiss()
                } label: {
                    Text("Activate Panic Mode")
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 56)
                        .background(Color.red)
                        .cornerRadius(12)
                }
                .padding(.horizontal, 32)
                .padding(.bottom, 32)
            }
            .background(Color(red: 2/255, green: 6/255, blue: 23/255))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundColor(.white)
                }
            }
        }
    }
}
