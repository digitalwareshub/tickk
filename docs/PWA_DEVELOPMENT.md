# PWA Development Guide

This guide explains how to develop and test Progressive Web App (PWA) features in tickk.

## 🚀 Quick Start

### Development Mode (PWA Disabled)
```bash
npm run dev
```
- Fast development builds
- PWA features disabled for performance
- Standard Next.js development experience

### Development Mode (PWA Enabled)
```bash
npm run dev:pwa
# or
ENABLE_PWA=true npm run dev
```
- PWA features enabled for testing
- Service worker active
- Offline functionality available
- Install prompts work

## 📱 PWA Features

### Core Features
- **Offline Support**: App works without internet connection
- **Install Prompts**: Users can install the app on their devices
- **Service Worker**: Caches resources for offline use
- **App Manifest**: Defines app metadata and icons

### Testing Checklist
- [ ] App installs on mobile devices
- [ ] Offline functionality works
- [ ] Service worker updates properly
- [ ] App icons display correctly
- [ ] Offline fallback page shows when needed

## 🛠️ Development Workflow

### 1. Regular Development
```bash
npm run dev
```
Use this for most development work. PWA is disabled for faster builds.

### 2. PWA Testing
```bash
npm run dev:pwa
```
Use this when you need to test PWA-specific features:
- Install prompts
- Offline functionality
- Service worker behavior
- App manifest changes

### 3. Production Testing
```bash
npm run build
npm run start
```
Test the full production PWA experience.

## 🔧 Configuration

### PWA Settings (next.config.js)
- **Development**: PWA disabled by default
- **Production**: PWA always enabled
- **Override**: Use `ENABLE_PWA=true` to enable in development

### Manifest Validation
The build process automatically validates:
- ✅ manifest.json exists
- ✅ Required fields are present
- ✅ Icons are configured
- ✅ JSON format is valid

### Service Worker
- **Location**: `public/sw.js` (auto-generated)
- **Caching**: CDN resources cached for 1 year
- **Updates**: Automatic updates with `skipWaiting: true`

## 📋 Testing PWA Features

### 1. Install Prompt
1. Run `npm run dev:pwa`
2. Open Chrome DevTools
3. Go to Application tab → Manifest
4. Click "Add to homescreen" or use browser install prompt

### 2. Offline Testing
1. Run `npm run dev:pwa`
2. Open Chrome DevTools
3. Go to Network tab
4. Check "Offline" checkbox
5. Navigate to `/offline` to see fallback page

### 3. Service Worker
1. Run `npm run dev:pwa`
2. Open Chrome DevTools
3. Go to Application tab → Service Workers
4. Check registration status and update behavior

## 🚨 Troubleshooting

### PWA Not Working in Development
- Ensure you're using `npm run dev:pwa` or `ENABLE_PWA=true`
- Check console for PWA configuration logs
- Verify manifest.json exists and is valid

### Service Worker Issues
- Clear browser cache and service worker
- Check Application tab in DevTools
- Restart development server

### Install Prompt Not Showing
- Ensure PWA is enabled (`ENABLE_PWA=true`)
- Check manifest.json configuration
- Verify HTTPS (required for PWA in production)

## 📚 Resources

- [Next.js PWA Documentation](https://github.com/shadowwalker/next-pwa)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Checklist](https://web.dev/pwa-checklist/)

## 🔍 Build Output

When PWA is enabled, you'll see:
```
🚀 PWA Configuration:
   Environment: development
   PWA Enabled: ✅ YES
   Development PWA Testing: ✅ ENABLED
   💡 Use 'ENABLE_PWA=true npm run dev' to test PWA features

✅ PWA Manifest validated successfully
   App Name: tickk - Speak it. Save it. Sort it later.
   Short Name: tickk
   Icons: 9 configured
```

When PWA is disabled:
```
🚀 PWA Configuration:
   Environment: development
   PWA Enabled: ❌ NO
   Development PWA Testing: ❌ DISABLED
   💡 Use 'ENABLE_PWA=true npm run dev' to enable PWA testing
```
