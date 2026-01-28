# NurGuard Shield - iOS App

Complete iOS app with Screen Time API integration, VPN-based DNS filtering, and SwiftUI interface.

## Features

- **Screen Time Integration** - Block apps using Apple's Family Controls framework
- **VPN DNS Filtering** - Block harmful websites at network level
- **Niyyah Gate** - Cooldown timer before accessing blocked apps (3s-60s)
- **Bypass Limits** - Maximum 3 bypasses per day
- **Usage Heatmap** - Calendar visualization of app usage patterns
- **Panic Mode** - Emergency full lockdown (15min-2hr)
- **Motivational Quotes** - Islamic quotes during cooldown
- **Backend Sync** - Automatic sync with NurGuard backend API

## Requirements

- Xcode 15.0+
- iOS 16.0+
- Apple Developer Account (for testing on device)
- macOS for building

## Project Structure

```
ios/
├── NurGuardShield/
│   ├── NurGuardShieldApp.swift      # App entry point
│   ├── Services/
│   │   ├── AuthManager.swift        # Authentication & entitlement check
│   │   └── ShieldManager.swift      # Screen Time API integration
│   ├── Views/
│   │   ├── ContentView.swift        # Main navigation
│   │   ├── LoginView.swift          # Login screen
│   │   ├── HomeView.swift           # Dashboard
│   │   └── OtherViews.swift         # Settings, Heatmap, Panic Mode
│   └── Info.plist                   # App configuration
├── NurGuardShieldVPN/
│   └── PacketTunnelProvider.swift   # VPN Network Extension
└── NurGuardShield.xcodeproj/
    └── project.pbxproj              # Xcode project file
```

## Building

### Option 1: Xcode (Recommended)

1. Open `NurGuardShield.xcodeproj` in Xcode
2. Select your development team in Signing & Capabilities
3. Connect your iPhone
4. Click Run (⌘R)

### Option 2: Command Line

```bash
cd ios
xcodebuild -project NurGuardShield.xcodeproj \
  -scheme NurGuardShield \
  -configuration Debug \
  -destination 'platform=iOS,name=Your iPhone' \
  build
```

## Capabilities Required

The app requires these capabilities (already configured in project):

1. **Family Controls** - For Screen Time API
   - Entitlement: `com.apple.developer.family-controls`
   
2. **Network Extensions** - For VPN DNS filtering
   - Entitlement: `com.apple.developer.networking.networkextension`

3. **App Groups** - For sharing data between main app and VPN extension
   - Entitlement: `com.apple.security.application-groups`

## Permissions

Users must grant:

1. **Family Controls** - Required for app blocking
2. **VPN Configuration** - Required for DNS filtering

The app requests these on first launch.

## Testing

1. **Login** - Use email from paid Lemon Squeezy order
2. **Select Apps** - Tap "Select Apps to Block" and choose Instagram, TikTok, etc.
3. **Test Blocking** - Try to open a blocked app, should see iOS Screen Time warning
4. **Test DNS** - Visit a porn site, should be blocked by VPN
5. **Test Panic Mode** - Activate emergency lockdown

## Limitations (iOS vs Android)

| Feature | iOS | Android |
|---------|-----|---------|
| App Blocking | ⚠️ Warnings only | ✅ Full blocking |
| DNS Filtering | ✅ Full support | ✅ Full support |
| Niyyah Gate | ⚠️ Notification | ✅ Full-screen overlay |
| Time Limits | ✅ Full support | ✅ Full support |
| Bypass Limits | ✅ Full support | ✅ Full support |

**Why iOS is limited:** Apple doesn't allow third-party apps to fully block other apps. We can only show warnings and time limits via Screen Time API.

## Distribution

### TestFlight (Beta Testing)

1. Archive the app in Xcode (Product → Archive)
2. Upload to App Store Connect
3. Add testers in TestFlight
4. Share TestFlight link

### App Store (Production)

1. Complete App Store Connect listing
2. Submit for review
3. Wait for approval (~1-3 days)

## Backend API

The app connects to:
- **Production:** `https://nurguard.manus.space/api/trpc`
- **Endpoints:**
  - `mobile.checkEntitlement` - Verify user subscription
  - `mobile.getBlockedDomains` - Fetch DNS blocklist
  - `mobile.syncPreferences` - Sync cooldown settings

## Troubleshooting

**"Family Controls authorization failed"**
- Ensure you're running on a real device (not simulator)
- Check that Family Controls capability is enabled

**"VPN configuration failed"**
- Ensure Network Extensions capability is enabled
- Check that VPN profile isn't already installed

**"No active subscription found"**
- Verify email matches Lemon Squeezy purchase
- Check backend webhook processed the payment

## Support

For issues or questions:
- Email: support@nurguard.com
- GitHub: https://github.com/TasnidChain/nurguard-shield/issues
