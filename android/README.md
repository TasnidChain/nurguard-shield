# NurGuard Shield - Android App

A native Android app that provides digital wellness protection through app blocking, DNS filtering, and mindful prompts.

## Features

### Core Protection
- **Niyyah Gate** - Intention prompt with cooldown (7-15 seconds) before opening blocked apps
- **App Blocking** - Blocks Instagram, TikTok, Twitter, YouTube, Chrome, Firefox
- **DNS Filtering** - Local VPN-based filtering of adult and gambling websites
- **Time Limits** - Per-app daily time limits with enforcement
- **Sacred Hours** - Auto-block during prayer times and focus periods

### UI Screens
- **Setup Flow** - Guided onboarding with permission requests
- **Home Dashboard** - Protection status, stats, quick actions
- **Sacred Hours** - Configure prayer times
- **Daily Report** - Usage analytics and accountability mirror
- **Settings** - Account and app configuration

### Technical Stack
- **Language:** Kotlin
- **UI:** Jetpack Compose + Material Design 3
- **Architecture:** MVVM with Repository pattern
- **Database:** Room (SQLite)
- **Networking:** Retrofit + OkHttp
- **Background:** WorkManager + Foreground Services

## Build Instructions

### Prerequisites
- JDK 17 or higher
- Android SDK (API 26-34)
- Gradle 8.2+

### Local Build

```bash
cd android
./gradlew assembleDebug
```

Output: `app/build/outputs/apk/debug/app-debug.apk`

### Release Build

```bash
cd android
./gradlew assembleRelease
```

Output: `app/build/outputs/apk/release/app-release.apk`

### GitHub Actions

The project includes automated CI/CD via GitHub Actions:

1. Push to `main` branch triggers build
2. Both debug and release APKs are compiled
3. APKs are uploaded as artifacts
4. A GitHub Release is created automatically

**Download APK:** Go to Actions → Latest workflow run → Artifacts

## Installation

### On Device
1. Download APK from GitHub Releases or Actions artifacts
2. Enable "Install from Unknown Sources" in Android settings
3. Install the APK
4. Open app and complete setup flow
5. Grant all permissions:
   - Accessibility Service (for app detection)
   - VPN Service (for DNS filtering)
   - Usage Access (for time tracking)
   - Display Over Apps (for Niyyah Gate overlay)

### Testing
- **Minimum Android Version:** 8.0 (API 26)
- **Target Android Version:** 14 (API 34)
- **Tested Devices:** Emulator only (needs real device testing)

## Permissions

### Required
- `INTERNET` - Backend API communication
- `ACCESS_NETWORK_STATE` - Network status checks
- `FOREGROUND_SERVICE` - VPN and blocking services
- `POST_NOTIFICATIONS` - Time limit notifications
- `SYSTEM_ALERT_WINDOW` - Niyyah Gate overlay
- `QUERY_ALL_PACKAGES` - App detection
- `PACKAGE_USAGE_STATS` - Screen time tracking

### Special Permissions (User must grant)
- **Accessibility Service** - Detect app launches
- **VPN Service** - DNS filtering
- **Usage Access** - Time tracking
- **Display Over Apps** - Overlay permission

## Architecture

```
app/
├── data/
│   ├── local/          # Room database, DAOs, entities
│   └── remote/         # Retrofit API client
├── services/
│   ├── AppBlockingService.kt      # Accessibility Service
│   └── DnsFilterService.kt        # VPN Service
├── ui/
│   ├── screens/        # Compose screens
│   ├── theme/          # Material 3 theme
│   ├── MainActivity.kt # Navigation host
│   └── NiyyahGateActivity.kt # Overlay activity
└── utils/
    └── AppUsageTracker.kt # Usage stats helper
```

## Backend Integration

The app connects to the NurGuard backend API at:
- **Dev:** `https://3000-iklf0nm58rmazgbch1hg5-d72bf820.us2.manus.computer`
- **Prod:** TBD (update `BuildConfig.API_BASE_URL` in `build.gradle`)

### API Endpoints
- `POST /api/trpc/mobile.devices.register` - Register device
- `POST /api/trpc/mobile.entitlements.verify` - Check subscription
- `GET /api/trpc/mobile.rules.fetch` - Fetch blocking rules
- `POST /api/trpc/mobile.reports.submit` - Submit daily usage
- `GET /api/trpc/mobile.config.get` - Get user config

## Known Issues

### Not Yet Implemented
- [ ] Real device testing
- [ ] Proper release signing (using debug keystore)
- [ ] Icon assets (using placeholders)
- [ ] Background sync worker
- [ ] Notification channels
- [ ] Sacred hours auto-detection (manual config only)
- [ ] Time budget categories
- [ ] Affiliate code entry

### Limitations
- **DNS filtering** only works when VPN is active
- **App blocking** requires Accessibility Service (can be disabled by user)
- **Time limits** depend on Usage Access permission
- **Niyyah Gate** can be bypassed if user force-stops the app

## Next Steps

1. **Test on real device** - Install APK and verify all features work
2. **Generate release keystore** - For production signing
3. **Add proper icons** - Replace placeholder launcher icons
4. **Implement background sync** - Periodic rule updates
5. **Add crash reporting** - Firebase Crashlytics or Sentry
6. **Optimize battery usage** - Test with battery optimization enabled
7. **Play Store listing** - Prepare store assets and description

## License

Proprietary - NurGuard Shield
