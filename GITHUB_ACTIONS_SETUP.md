# GitHub Actions Setup Instructions

## How to Add the Workflow File

Since the workflow file couldn't be pushed automatically due to GitHub permissions, you need to add it manually:

### Option 1: Via GitHub Web Interface (Easiest)

1. Go to your repository: https://github.com/TasnidChain/nurguard-shield
2. Click **"Add file"** → **"Create new file"**
3. In the file name field, type: `.github/workflows/android-build.yml`
4. Copy the contents from `android-build-workflow.yml` (attached) and paste into the editor
5. Scroll down and click **"Commit new file"**

### Option 2: Via Git Command Line

```bash
# Clone your repo
git clone https://github.com/TasnidChain/nurguard-shield.git
cd nurguard-shield

# Create workflow directory
mkdir -p .github/workflows

# Copy the workflow file
cp android-build-workflow.yml .github/workflows/android-build.yml

# Commit and push
git add .github/workflows/android-build.yml
git commit -m "Add GitHub Actions workflow for Android APK build"
git push origin main
```

## What the Workflow Does

- **Triggers on:**
  - Every push to `main` branch
  - Every pull request to `main`
  - Manual trigger via GitHub Actions tab

- **Builds:**
  - Debug APK using Gradle
  - Runs on Ubuntu with JDK 17

- **Outputs:**
  - Uploads APK as artifact (downloadable from Actions tab)
  - Creates GitHub release with APK when you push a tag

## How to Download the APK

After the workflow runs:

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Scroll down to **Artifacts** section
4. Download `nurguard-debug-apk.zip`
5. Extract and install `app-debug.apk` on your Android device

## Creating a Release

To create a tagged release with the APK:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The workflow will automatically create a GitHub release with the APK attached.

## Next Steps

1. **Add the workflow file** using one of the methods above
2. **Wait for the build** - Check the Actions tab for progress
3. **Download the APK** - Get it from Artifacts
4. **Test on device** - Install and verify all features work

## Troubleshooting

If the build fails:
- Check the Actions tab for error logs
- Common issues:
  - Missing dependencies (workflow handles this)
  - Gradle version mismatch (using wrapper)
  - API URL needs updating in `app/build.gradle`

## Production Build (Future)

For production releases, you'll need to:
1. Generate a release keystore
2. Add signing config to `app/build.gradle`
3. Store keystore credentials in GitHub Secrets
4. Update workflow to build release APK

Let me know if you need help with production signing!
