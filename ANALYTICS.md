# Analytics Setup Guide

This guide explains how to set up Google Analytics and Vercel Analytics for tickk.

## 📊 Analytics Overview

The application includes two analytics services:

1. **Google Analytics 4 (GA4)** - Detailed user behavior tracking
2. **Vercel Analytics** - Performance and usage metrics (automatically enabled on Vercel)

## 🔧 Setup Instructions

### 1. Google Analytics Setup

#### Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

#### Step 2: Add Environment Variable
1. In your Vercel project dashboard, go to Settings → Environment Variables
2. Add a new environment variable:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: Your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`)
   - **Environment**: Production, Preview, Development (check all)

#### Step 3: Deploy
The analytics will be automatically active on your next deployment.

### 2. Vercel Analytics Setup

Vercel Analytics is automatically enabled when you deploy to Vercel. No additional configuration needed!

## 📈 What Gets Tracked

### Google Analytics Events

#### Voice Interactions
- `recording_started` - When user starts voice recording
- `recording_stopped` - When user stops voice recording  
- `classification_success` - When speech is successfully classified
- `classification_error` - When there's an error in processing

#### User Interactions
- `mic_button_clicked` - When microphone button is clicked
- `clear_all_data` - When user clears all data
- Page views and navigation

#### Categories Tracked
- `tasks` - Task-related interactions
- `notes` - Note-related interactions  
- `calendar` - Calendar-related interactions
- `general` - General app interactions

### Vercel Analytics Metrics
- Page views
- Unique visitors
- Core Web Vitals (LCP, FID, CLS)
- Performance metrics

## 🔒 Privacy & Compliance

- **Google Analytics**: IP anonymization enabled
- **Cookie Policy**: SameSite=None;Secure cookies
- **Data Retention**: Follows Google Analytics default policies
- **GDPR Compliant**: User can opt-out via browser settings

## 🛠️ Local Development

During development:
- Analytics only work if `NEXT_PUBLIC_GA_ID` is set
- Vercel Analytics is disabled in development mode
- No tracking data is sent from localhost

## 📱 Testing Analytics

### Verify Google Analytics
1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Open your website
3. Check browser console for GA debug messages
4. Visit GA Real-time reports to see live data

### Verify Vercel Analytics
1. Deploy to Vercel
2. Visit your site
3. Check Vercel dashboard → Analytics tab
4. Data appears within 24 hours

## 🔧 Custom Event Tracking

To track custom events in your code:

```typescript
import { trackVoiceEvent, trackPageInteraction } from '@/lib/analytics'

// Track voice interactions
trackVoiceEvent('custom_action', 'category')

// Track page interactions  
trackPageInteraction('button_click', 'button_name')
```

## 📋 Environment Variables Reference

```bash
# Required for Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Vercel Analytics (automatic - no env vars needed)
```

## 🚀 Production Checklist

- [ ] GA4 property created
- [ ] `NEXT_PUBLIC_GA_ID` added to Vercel environment variables
- [ ] Deployed to Vercel
- [ ] Verified analytics in GA Real-time reports
- [ ] Checked Vercel Analytics dashboard

## 🔍 Troubleshooting

### Google Analytics Not Working
1. Verify `NEXT_PUBLIC_GA_ID` is set correctly
2. Check browser console for errors
3. Ensure ad blockers are disabled during testing
4. Check GA Real-time reports for data

### Vercel Analytics Not Working
1. Ensure deployed to Vercel (not other platforms)
2. Wait 24 hours for data to appear
3. Check Vercel project settings

### CORS Issues
The CSP headers in `next.config.js` are pre-configured for analytics domains.

## 📞 Support

For analytics issues:
- Google Analytics: [GA4 Help Center](https://support.google.com/analytics/)
- Vercel Analytics: [Vercel Docs](https://vercel.com/docs/analytics)
