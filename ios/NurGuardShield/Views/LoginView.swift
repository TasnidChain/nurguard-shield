import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authManager: AuthManager
    @State private var email = ""
    @State private var isLoading = false
    @State private var errorMessage: String?
    
    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                colors: [
                    Color(red: 2/255, green: 6/255, blue: 23/255),
                    Color(red: 6/255, green: 78/255, blue: 59/255, opacity: 0.2),
                    Color(red: 2/255, green: 6/255, blue: 23/255)
                ],
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
            
            VStack(spacing: 32) {
                Spacer()
                
                // Logo and title
                VStack(spacing: 16) {
                    Image(systemName: "shield.fill")
                        .font(.system(size: 80))
                        .foregroundColor(Color(red: 16/255, green: 185/255, blue: 129/255))
                    
                    Text("NurGuard Shield")
                        .font(.system(size: 32, weight: .bold))
                        .foregroundColor(.white)
                    
                    Text("Digital protection for a focused life")
                        .font(.system(size: 16))
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                // Login form
                VStack(spacing: 20) {
                    TextField("Email", text: $email)
                        .textFieldStyle(.roundedBorder)
                        .textInputAutocapitalization(.never)
                        .keyboardType(.emailAddress)
                        .padding(.horizontal, 32)
                    
                    if let error = errorMessage {
                        Text(error)
                            .font(.system(size: 14))
                            .foregroundColor(.red)
                            .padding(.horizontal, 32)
                    }
                    
                    Button(action: login) {
                        if isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                        } else {
                            Text("Continue")
                                .font(.system(size: 18, weight: .semibold))
                                .foregroundColor(.white)
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: 56)
                    .background(Color(red: 16/255, green: 185/255, blue: 129/255))
                    .cornerRadius(12)
                    .padding(.horizontal, 32)
                    .disabled(isLoading || email.isEmpty)
                    
                    Text("Don't have access? Purchase at nurguard.com")
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 32)
                }
                
                Spacer()
            }
        }
    }
    
    private func login() {
        isLoading = true
        errorMessage = nil
        
        Task {
            do {
                try await authManager.checkEntitlement(email: email)
            } catch {
                errorMessage = "No active subscription found for this email"
            }
            isLoading = false
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
            .environmentObject(AuthManager())
    }
}
