import Foundation
import FamilyControls
import ManagedSettings
import DeviceActivity

class ShieldManager: ObservableObject {
    @Published var isShieldActive = false
    @Published var blockedApps: Set<ApplicationToken> = []
    @Published var cooldownSeconds: Int = 15
    @Published var dailyBypassesUsed: Int = 0
    @Published var dailyBypassLimit: Int = 3
    
    private let store = ManagedSettingsStore()
    private let center = DeviceActivityCenter()
    
    // Block selected apps
    func blockApps(_ apps: Set<ApplicationToken>) {
        blockedApps = apps
        store.shield.applications = apps
        store.shield.applicationCategories = .all(except: Set())
        isShieldActive = true
    }
    
    // Unblock all apps
    func unblockAll() {
        store.shield.applications = nil
        store.shield.applicationCategories = nil
        blockedApps.removeAll()
        isShieldActive = false
    }
    
    // Set time limits for apps
    func setTimeLimit(for apps: Set<ApplicationToken>, minutes: Int) {
        let schedule = DeviceActivitySchedule(
            intervalStart: DateComponents(hour: 0, minute: 0),
            intervalEnd: DateComponents(hour: 23, minute: 59),
            repeats: true
        )
        
        let activityName = DeviceActivityName("timeLimit_\(UUID().uuidString)")
        
        do {
            try center.startMonitoring(activityName, during: schedule)
        } catch {
            print("Failed to start monitoring: \(error)")
        }
    }
    
    // Panic mode - block everything for specified duration
    func activatePanicMode(durationMinutes: Int) {
        let allCategories = ShieldSettings.ActivityCategoryPolicy.all()
        store.shield.applicationCategories = allCategories
        
        // Schedule auto-disable after duration
        DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(durationMinutes * 60)) {
            self.deactivatePanicMode()
        }
    }
    
    func deactivatePanicMode() {
        store.shield.applicationCategories = nil
        // Restore previous blocked apps
        if !blockedApps.isEmpty {
            store.shield.applications = blockedApps
        }
    }
    
    // Configure cooldown duration
    func setCooldown(seconds: Int) {
        cooldownSeconds = seconds
        UserDefaults.standard.set(seconds, forKey: "cooldownSeconds")
    }
    
    // Track bypass usage
    func recordBypass() {
        dailyBypassesUsed += 1
        UserDefaults.standard.set(dailyBypassesUsed, forKey: "dailyBypassesUsed")
        UserDefaults.standard.set(Date(), forKey: "lastBypassDate")
    }
    
    func canBypass() -> Bool {
        resetDailyBypassesIfNeeded()
        return dailyBypassesUsed < dailyBypassLimit
    }
    
    private func resetDailyBypassesIfNeeded() {
        guard let lastBypassDate = UserDefaults.standard.object(forKey: "lastBypassDate") as? Date else {
            return
        }
        
        let calendar = Calendar.current
        if !calendar.isDateInToday(lastBypassDate) {
            dailyBypassesUsed = 0
            UserDefaults.standard.set(0, forKey: "dailyBypassesUsed")
        }
    }
}
