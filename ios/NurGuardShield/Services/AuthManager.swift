import Foundation
import Combine

class AuthManager: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
    @Published var authToken: String?
    
    private let baseURL = "https://nurguard.manus.space/api/trpc"
    
    func login(email: String, password: String) async throws {
        // Implement OAuth login flow
        // For now, just check if user has valid entitlement
        try await checkEntitlement(email: email)
    }
    
    func checkEntitlement(email: String) async throws {
        guard let url = URL(string: "\(baseURL)/mobile.checkEntitlement") else {
            throw AuthError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["email": email]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw AuthError.unauthorized
        }
        
        let result = try JSONDecoder().decode(EntitlementResponse.self, from: data)
        
        if result.hasAccess {
            self.isAuthenticated = true
            self.currentUser = User(email: email, hasAccess: true)
        } else {
            throw AuthError.noEntitlement
        }
    }
    
    func logout() {
        isAuthenticated = false
        currentUser = nil
        authToken = nil
    }
}

enum AuthError: Error {
    case invalidURL
    case unauthorized
    case noEntitlement
}

struct User: Codable {
    let email: String
    let hasAccess: Bool
}

struct EntitlementResponse: Codable {
    let hasAccess: Bool
    let expiresAt: String?
}
