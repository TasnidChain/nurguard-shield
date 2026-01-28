import SwiftUI
import FamilyControls

@main
struct NurGuardShieldApp: App {
    @StateObject private var authManager = AuthManager()
    @StateObject private var shieldManager = ShieldManager()
    
    init() {
        // Request Family Controls authorization on app launch
        Task {
            do {
                try await AuthorizationCenter.shared.requestAuthorization(for: .individual)
            } catch {
                print("Failed to request Family Controls authorization: \(error)")
            }
        }
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(authManager)
                .environmentObject(shieldManager)
        }
    }
}
