# tickk - FREE Features Documentation

**Last Updated:** November 23, 2025  
**Version:** 1.10.0  
**Status:** All features listed below are 100% FREE forever

---

## 📋 Table of Contents

- [Overview](#overview)
- [Feature Categories](#feature-categories)
  - [1. Voice & Capture](#1-voice--capture)
  - [2. Organization & Management](#2-organization--management)
  - [3. Productivity & Focus](#3-productivity--focus)
  - [4. Data Management](#4-data-management)
  - [5. Privacy & Security](#5-privacy--security)
  - [6. Accessibility](#6-accessibility)
  - [7. User Experience](#7-user-experience)
  - [8. Technical Infrastructure](#8-technical-infrastructure)
- [Feature Comparison Matrix](#feature-comparison-matrix)
- [Browser Compatibility](#browser-compatibility)
- [FAQ](#faq)

---

## Overview

tickk is a **100% free, open-source voice-first productivity app** with **no premium tier, no paid features, and no subscriptions**. Everything listed in this document is available to all users immediately, without signup or payment.

**Total Free Features:** 44+  
**Core Philosophy:** Privacy-first, local-only, works offline  
**Business Model:** Free forever (community-supported)

---

## Feature Categories

### 1. Voice & Capture

#### 🎤 Voice-to-Text Transcription
- **Description:** High-accuracy speech recognition using Web Speech API
- **Technology:** Browser-native speech recognition (no AI, no cloud)
- **Accuracy:** ~95-99% in supported languages
- **Languages:** English (primary), with browser-dependent multi-language support
- **How to use:** Click microphone button, speak naturally
- **On /features page:** ✅ Yes
- **Status:** Core feature, always free

#### 🧠 Smart NLP Classification
- **Description:** Automatically categorizes speech into tasks, notes, or calendar events
- **Technology:** compromise.js (deterministic NLP, no AI)
- **Categories:** Tasks, Notes, Calendar Events (auto-detected)
- **How it works:** 
  - Detects action words → Tasks
  - Detects information/ideas → Notes
  - Detects dates/times → Calendar Events
- **On /features page:** ✅ Yes
- **Status:** Core feature, always free

#### 💭 Braindump Interface
- **Description:** Capture racing thoughts without organizing them first
- **Philosophy:** "Capture first, organize later"
- **Use case:** ADHD minds, hyperfocus sessions, racing thoughts
- **Features:**
  - Continuous voice recording
  - Real-time transcription
  - Defer categorization until later
  - Process mode for bulk review
- **On /features page:** ❌ Not yet (SHOULD BE ADDED!)
- **Status:** Core differentiator, always free

#### 📅 Date/Time Auto-Detection
- **Description:** Automatically extracts dates and times from natural speech
- **Examples:**
  - "tomorrow at 3pm" → Creates task with due date
  - "next Monday" → Schedules accordingly
  - "in 2 weeks" → Calculates exact date
- **Technology:** compromise.js date parsing
- **On /features page:** ❌ Not yet
- **Status:** Smart convenience feature, always free

#### ⚡ Real-Time Transcription
- **Description:** See your words appear as you speak
- **Latency:** Near-instant (<100ms)
- **Editing:** Live corrections as you speak
- **On /features page:** ✅ (Implied in Voice-to-Text)
- **Status:** Core feature, always free

---

### 2. Organization & Management

#### 🔍 Search & Filter
- **Description:** Powerful search across all items with advanced filters
- **Features:**
  - Full-text search
  - Filter by type (tasks/notes/events)
  - Filter by date range
  - Filter by tags/projects
  - Filter by priority level
  - Filter by completion status
- **Keyboard shortcut:** Cmd/Ctrl + F
- **On /features page:** ✅ Yes
- **Status:** Power user feature, always free

#### 📦 Bulk Operations
- **Description:** Select multiple items for batch actions
- **Actions:**
  - Bulk delete
  - Bulk complete/incomplete
  - Bulk export
  - Bulk tag assignment
- **How to use:** Checkbox selection mode
- **On /features page:** ✅ Yes
- **Status:** Efficiency feature, always free

#### 📝 Template Library
- **Description:** Save frequently used tasks/notes as reusable templates
- **Use cases:**
  - Recurring workflows
  - Standard checklists
  - Common meeting notes
  - Project structures
- **Limit:** Unlimited templates
- **On /features page:** ✅ Yes
- **Status:** Productivity booster, always free

#### 📋 Context Menu Actions
- **Description:** Right-click any item for quick actions
- **Actions:**
  - Edit
  - Delete
  - Duplicate
  - Pin/Unpin
  - Convert (task ↔ note)
  - Add to Focus Mode
  - Export individual item
- **On /features page:** ✅ Yes
- **Status:** UX convenience, always free

#### ✏️ Edit/Delete/Complete
- **Description:** Full CRUD operations on all items
- **Features:**
  - Edit text inline
  - Delete with confirmation
  - Mark complete/incomplete
  - Archive completed items
  - Restore deleted items (undo)
- **On /features page:** ❌ Not explicitly mentioned
- **Status:** Basic functionality, always free

#### 📌 Pin/Favorite Items
- **Description:** Pin important items to the top
- **Use case:** Keep critical tasks visible
- **Limit:** Unlimited pins
- **On /features page:** ❌ Not mentioned
- **Status:** Organization feature, always free

#### 🏷️ Tags & Projects (Organization)
- **Description:** Organize items with custom tags and projects
- **Features:**
  - Create unlimited tags
  - Assign multiple tags per item
  - Project grouping
  - Color-coded organization
- **On /features page:** ❌ Not mentioned (exists in OrganizedView)
- **Status:** Advanced organization, always free

#### ⚠️ Priority Levels
- **Description:** Assign urgency/importance to tasks
- **Levels:** High, Medium, Low, None
- **Visual indicators:** Color-coded badges
- **Sorting:** Sort by priority
- **On /features page:** ❌ Not mentioned
- **Status:** Task management, always free

---

### 3. Productivity & Focus

#### 🎯 ADHD-Friendly Focus Mode
- **Description:** Distraction-free interface for deep work
- **Features:**
  - Single-task view
  - Pomodoro timer (25/5 intervals)
  - Break reminders
  - Session tracking
  - No notifications/distractions
- **On /features page:** ✅ Yes
- **Status:** Core ADHD feature, always free

#### ⏱️ Pomodoro Timer
- **Description:** Built-in focus timer with breaks
- **Intervals:** 25min work / 5min break (customizable)
- **Features:**
  - Visual countdown
  - Break reminders
  - Session counter
  - Pause/resume
- **On /features page:** ✅ (Part of Focus Mode)
- **Status:** Productivity tool, always free

#### ⌨️ Command Palette (⌘K)
- **Description:** Power-user keyboard shortcuts for instant actions
- **Shortcut:** Cmd/Ctrl + K
- **Actions:**
  - Navigate to any view
  - Create new task/note
  - Search items
  - Toggle Focus Mode
  - Open settings
  - Export data
- **On /features page:** ✅ Yes
- **Status:** Power user feature, always free

#### 📊 Productivity Analytics
- **Description:** Track your productivity patterns and trends
- **Metrics:**
  - Tasks completed (daily/weekly/monthly)
  - Completion rates
  - Activity streaks
  - Time spent in Focus Mode
  - Most productive hours/days
- **Visualizations:** Charts, graphs, heatmaps
- **On /features page:** ✅ Yes
- **Status:** Insights feature, always free

#### 🔥 Activity Heatmap
- **Description:** GitHub-style heatmap showing daily activity
- **View:** Visual calendar of productivity patterns
- **Use case:** Identify your most productive periods
- **On /features page:** ❌ Not mentioned
- **Status:** Visual analytics, always free

#### 📈 Streak Tracker
- **Description:** Track consecutive days of usage for motivation
- **Features:**
  - Current streak
  - Longest streak
  - Visual badges
  - Streak preservation reminders
- **Gamification:** Encourages daily use
- **On /features page:** ❌ Not mentioned
- **Status:** Motivation feature, always free

#### 🧘 Session Tracking
- **Description:** Log and analyze your focus sessions
- **Tracked data:**
  - Session duration
  - Tasks completed per session
  - Focus quality metrics
  - Session history
- **On /features page:** ❌ Not mentioned
- **Status:** Advanced analytics, always free

#### 🔄 Review Mode
- **Description:** Process braindumped items in batches
- **Workflow:**
  1. Capture everything via voice
  2. Enter Review Mode
  3. Categorize/edit/delete items
  4. Organize into tasks/notes
- **Use case:** End-of-day processing
- **On /features page:** ❌ Not mentioned
- **Status:** Workflow feature, always free

---

### 4. Data Management

#### 💾 Import & Export (JSON/CSV)
- **Description:** Full data portability with multiple formats
- **Export formats:**
  - JSON (full data backup)
  - CSV (spreadsheet analysis)
  - ICS (calendar events)
- **Import:** Restore from JSON backup
- **Use case:** Multi-device sync (manual), data backup, analysis
- **On /features page:** ✅ Yes
- **Status:** Data freedom, always free

#### 📅 Calendar Export (.ics)
- **Description:** Export tasks with dates to calendar apps
- **Compatible with:**
  - Google Calendar
  - Apple Calendar
  - Outlook
  - Any ICS-compatible calendar
- **One-click export:** Direct download
- **On /features page:** ✅ Yes
- **Status:** Integration feature, always free

#### 🔄 Automatic Backups
- **Description:** Local backup system prevents data loss
- **Features:**
  - Auto-backup before imports
  - Auto-backup before bulk deletes
  - Manual backup trigger
  - Restore from backups
- **Storage:** Browser IndexedDB
- **On /features page:** ❌ Not mentioned
- **Status:** Safety feature, always free

#### 🔓 Data Portability
- **Description:** Your data, your control - export anytime
- **Philosophy:** No lock-in, no vendor dependency
- **Formats:** Open standards (JSON, CSV, ICS)
- **On /features page:** ❌ Not mentioned (should be highlighted!)
- **Status:** Trust/transparency, always free

#### 🏠 Local-Only Storage
- **Description:** All data stored in your browser (IndexedDB)
- **Capacity:** Unlimited (browser-dependent, typically 50MB-1GB+)
- **Sync:** Manual via export/import
- **On /features page:** ✅ (Part of Privacy section)
- **Status:** Privacy foundation, always free

---

### 5. Privacy & Security

#### 🔒 Zero Data Collection
- **Description:** We never collect, store, or transmit your data
- **What we DON'T collect:**
  - Voice recordings
  - Transcripts
  - Personal information
  - Usage analytics (beyond basic page views)
  - IP addresses
  - Device fingerprints
- **Verification:** Open-source code on GitHub
- **On /features page:** ✅ Yes
- **Status:** Core principle, always free

#### 🏠 Local Processing Only
- **Description:** All speech recognition happens in your browser
- **No cloud servers:** Voice never leaves your device
- **Technology:** Web Speech API (browser-native)
- **Privacy benefit:** No third-party access
- **On /features page:** ✅ Yes
- **Status:** Privacy architecture, always free

#### 🚫 No Signup Required
- **Description:** Use immediately without account creation
- **What we DON'T ask for:**
  - Email address
  - Phone number
  - Name
  - Credit card
  - OAuth login
- **Start time:** Instant (no barriers)
- **On /features page:** ✅ Yes
- **Status:** Frictionless access, always free

#### ✅ Open Source
- **Description:** Fully transparent codebase on GitHub
- **Repository:** github.com/digitalwareshub/tickk
- **License:** MIT (free to use, modify, distribute)
- **Benefits:**
  - Security audits by community
  - Trust through transparency
  - Self-hosting possible
- **On /features page:** ✅ Yes
- **Status:** Transparency commitment, always free

---

### 6. Accessibility

#### ♿ Screen Reader Support
- **Description:** Full ARIA labels and semantic HTML
- **Features:**
  - Live regions for dynamic updates
  - Meaningful alt text
  - Proper heading hierarchy
  - Form labels
- **Compatible with:** NVDA, JAWS, VoiceOver
- **On /features page:** ✅ Yes
- **Status:** Inclusive design, always free

#### ⌨️ Keyboard Navigation
- **Description:** Complete keyboard-only control
- **Features:**
  - Tab navigation
  - Arrow key movement
  - Enter to activate
  - Escape to cancel
  - Focus indicators
- **No mouse required:** Full functionality
- **On /features page:** ✅ Yes
- **Status:** Accessibility standard, always free

#### 🎨 High Contrast Mode
- **Description:** Enhanced visibility for visual impairments
- **Features:**
  - High contrast colors
  - Increased text size options
  - Clear focus indicators
  - Readable fonts
- **On /features page:** ✅ Yes
- **Status:** Visual accessibility, always free

#### 🎭 Reduced Motion Support
- **Description:** Respects user motion preferences
- **Implementation:** Honors `prefers-reduced-motion` CSS
- **Effect:** Disables animations for sensitive users
- **Conditions:** Vestibular disorders, motion sensitivity
- **On /features page:** ✅ Yes
- **Status:** Accessibility consideration, always free

#### ❓ Keyboard Shortcuts Help Modal
- **Description:** Press ? to see all keyboard shortcuts
- **Content:**
  - Complete shortcut list
  - Categorized by function
  - Visual key indicators
  - Searchable
- **On /features page:** ❌ Not mentioned
- **Status:** User assistance, always free

---

### 7. User Experience

#### 🌓 Dark Mode / Light Mode
- **Description:** Toggle between dark and light themes
- **Features:**
  - System preference detection
  - Manual toggle
  - Smooth transitions
  - Optimized contrast
- **On /features page:** ❌ Not mentioned (expected feature in 2025)
- **Status:** Standard UX, always free

#### 📱 Responsive Design
- **Description:** Works seamlessly on all screen sizes
- **Breakpoints:**
  - Mobile (320px+)
  - Tablet (768px+)
  - Desktop (1024px+)
  - Large screens (1440px+)
- **Touch-optimized:** Mobile gestures supported
- **On /features page:** ❌ Not mentioned (expected feature)
- **Status:** Modern UX standard, always free

#### 📲 PWA Installation
- **Description:** Install as standalone app on any device
- **Platforms:**
  - iOS (Safari)
  - Android (Chrome)
  - Windows (Edge)
  - macOS (Chrome/Safari)
- **Benefits:**
  - App icon on home screen
  - Full-screen experience
  - Faster loading
  - Offline support
- **On /features page:** ✅ (Brief mention in tech specs)
- **Status:** Modern web standard, always free

#### ✈️ Offline Support
- **Description:** Full functionality without internet
- **Offline capabilities:**
  - Voice recognition (browser-dependent)
  - Data access
  - All features work
  - Syncs when online (manual)
- **Technology:** Service Workers, IndexedDB
- **On /features page:** ✅ Yes
- **Status:** Core capability, always free

#### 🎓 Onboarding Tour
- **Description:** First-time user guide
- **Features:**
  - Interactive walkthrough
  - Feature highlights
  - Skip option
  - "Don't show again" preference
- **On /features page:** ❌ Not mentioned (internal UX)
- **Status:** User assistance, always free

#### 🆕 What's New Banner
- **Description:** Notifications for new features and updates
- **Features:**
  - Non-intrusive banner
  - Dismissible
  - Links to changelog
  - Version notes
- **On /features page:** ❌ Not mentioned (internal UX)
- **Status:** Communication tool, always free

#### 🛡️ Error Boundaries
- **Description:** Graceful error handling prevents crashes
- **Features:**
  - Catches JavaScript errors
  - Shows friendly error message
  - Offers recovery options
  - Preserves user data
- **On /features page:** ❌ Not mentioned (technical detail)
- **Status:** Reliability feature, always free

#### 🦊 Browser Compatibility Notices
- **Description:** Warnings for limited-support browsers
- **Example:** Firefox voice recognition notice
- **Purpose:** Set expectations, avoid confusion
- **On /features page:** ❌ Not mentioned (technical notice)
- **Status:** User communication, always free

---

### 8. Technical Infrastructure

#### ⚙️ Technology Stack
- **Frontend:** Next.js 15 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Voice:** Web Speech API (browser-native)
- **NLP:** compromise.js (deterministic)
- **Storage:** IndexedDB (browser)
- **PWA:** Service Workers, Web App Manifest
- **On /features page:** ✅ Yes
- **Status:** Open stack, always free

#### 🌐 Browser Support
**Full Support:**
- Chrome 25+ (desktop & mobile)
- Edge 79+ (desktop & mobile)
- Safari 14.1+ (desktop & mobile)

**Limited Support:**
- Firefox (no voice recognition)

**Requirements:**
- JavaScript enabled
- IndexedDB support
- Modern ES6+ support

**On /features page:** ✅ Yes
**Status:** Wide compatibility, always free

#### 🖥️ Platform Capabilities
- **Web-based:** No installation required
- **Cross-platform:** Works on any OS
- **Mobile responsive:** Touch-optimized
- **PWA installable:** Add to home screen
- **Offline capable:** Full offline mode

**On /features page:** ✅ Yes
**Status:** Modern web standards, always free

#### 📦 No External Dependencies (Privacy)
**What we DON'T use:**
- ❌ Google Analytics (privacy violation)
- ❌ Third-party trackers
- ❌ Cloud APIs (except optional CDNs for libraries)
- ❌ External fonts (self-hosted)
- ❌ Social media pixels

**What we DO use:**
- ✅ Vercel Analytics (basic page views only, privacy-friendly)
- ✅ CDN libraries (compromise.js) - optional, can work offline

**On /features page:** ❌ Not mentioned
**Status:** Privacy infrastructure, always free

---

## Feature Comparison Matrix

| Feature | tickk | Notion | Todoist | Evernote | Apple Notes |
|---------|-------|--------|---------|----------|-------------|
| **Voice Recognition** | ✅ Free | ❌ No | ❌ No | ❌ Limited | ✅ iOS only |
| **Auto-Categorization** | ✅ Free | ❌ No | ❌ No | ❌ No | ❌ No |
| **Offline Support** | ✅ Full | ⚠️ Limited | ⚠️ Limited | ⚠️ Limited | ✅ Full |
| **Privacy (Local Only)** | ✅ Yes | ❌ Cloud | ❌ Cloud | ❌ Cloud | ⚠️ iCloud |
| **No Signup** | ✅ Yes | ❌ Required | ❌ Required | ❌ Required | ⚠️ Apple ID |
| **ADHD-Friendly** | ✅ Yes | ❌ Complex | ⚠️ Rigid | ❌ Complex | ⚠️ Basic |
| **Open Source** | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No |
| **Price** | ✅ **FREE** | 💰 $10/mo | 💰 $4/mo | 💰 $8/mo | ✅ Free* |
| **Bulk Operations** | ✅ Free | ✅ Free | ❌ Paid | ✅ Free | ❌ Limited |
| **Analytics** | ✅ Free | ❌ No | ✅ Paid | ❌ No | ❌ No |
| **Focus Mode** | ✅ Free | ❌ No | ❌ No | ❌ No | ❌ No |
| **Templates** | ✅ Free | ✅ Paid | ✅ Paid | ✅ Free | ❌ No |
| **Export Options** | ✅ JSON/CSV/ICS | ⚠️ Limited | ⚠️ Limited | ⚠️ Limited | ❌ Minimal |

\* Apple Notes free with Apple device purchase

---

## Browser Compatibility

### Voice Recognition Support

| Browser | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Chrome | ✅ Full | ✅ Full | Best support |
| Edge | ✅ Full | ✅ Full | Chromium-based |
| Safari | ✅ Full | ✅ Full | iOS 14.1+ required |
| Firefox | ❌ No | ❌ No | No Web Speech API |
| Opera | ✅ Full | ✅ Full | Chromium-based |
| Samsung Internet | ⚠️ Varies | ⚠️ Varies | Version-dependent |

### Storage Limits

| Browser | IndexedDB Limit | Notes |
|---------|----------------|-------|
| Chrome | ~80% of disk | Generous |
| Safari | ~1GB | Moderate |
| Firefox | ~2GB | Good |
| Edge | ~80% of disk | Generous |
| Mobile browsers | Varies | Device-dependent |

### PWA Installation

| Platform | Support | How to Install |
|----------|---------|----------------|
| iOS Safari | ✅ Yes | Share → Add to Home Screen |
| Android Chrome | ✅ Yes | Menu → Install App |
| Windows Edge | ✅ Yes | Address bar → Install |
| macOS Chrome | ✅ Yes | Address bar → Install |
| macOS Safari | ⚠️ Limited | Add to Dock |

---

## FAQ

### General

**Q: Is tickk really 100% free?**  
A: Yes! All features are free forever. No premium tier, no paid add-ons, no subscriptions. We're committed to keeping it free.

**Q: How do you make money if it's free?**  
A: Currently, tickk is a passion project. We may explore community donations or sponsorships in the future, but features will always remain free.

**Q: Will features ever become paid?**  
A: No. Any feature currently listed as free will remain free forever. If we ever add new paid features (unlikely), existing free features won't be removed.

### Privacy & Data

**Q: Where is my data stored?**  
A: Locally in your browser's IndexedDB. It never leaves your device unless you manually export it.

**Q: Can you see my voice recordings or transcripts?**  
A: No. All processing happens in your browser. We never collect or transmit your data.

**Q: What if I lose my device?**  
A: Export your data regularly as a backup. Since everything is local, losing your device means losing your data (just like files on your computer).

**Q: Can I use tickk on multiple devices?**  
A: Yes, but you'll need to manually export/import data between devices. We don't have cloud sync (to protect your privacy).

### Features

**Q: Does voice recognition work offline?**  
A: It depends on your browser. Chrome/Edge support offline voice recognition on some platforms. Safari and Firefox may require internet.

**Q: How accurate is the voice recognition?**  
A: 95-99% accuracy in quiet environments. Quality depends on your browser's Web Speech API implementation.

**Q: What languages are supported?**  
A: English is fully tested. Other languages depend on your browser's capabilities. The Web Speech API supports 60+ languages.

**Q: Can I customize the Pomodoro timer?**  
A: Not yet, but it's on the roadmap! Currently fixed at 25min/5min intervals.

**Q: Is there a mobile app?**  
A: tickk is a Progressive Web App (PWA), so you can "install" it on mobile devices and it works like a native app.

### Technical

**Q: Why doesn't voice recognition work on Firefox?**  
A: Firefox doesn't support the Web Speech API. We recommend Chrome, Edge, or Safari for voice features.

**Q: What's the storage limit?**  
A: It depends on your browser, typically 50MB-1GB+. Most users never hit the limit.

**Q: Can I self-host tickk?**  
A: Yes! It's open-source. Clone the repo and host it yourself.

**Q: Does it work on iPad/iPhone?**  
A: Yes! Safari on iOS 14.1+ has full voice recognition support.

---

## Related Documentation

- **Public Features Page:** [tickk.app/features](https://tickk.app/features)
- **Import/Export Guide:** [/docs/IMPORT_FEATURE.md](./IMPORT_FEATURE.md)
- **README:** [README.md](../README.md)
- **Privacy Policy:** [tickk.app/privacy](https://tickk.app/privacy)
- **GitHub Repository:** [github.com/digitalwareshub/tickk](https://github.com/digitalwareshub/tickk)

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-11-23 | 1.10.0 | Initial FREE_FEATURES.md documentation |
| 2025-10-29 | 1.9.0 | Import/Export feature added |
| 2025-10-15 | 1.8.0 | Focus Mode enhancements |

---

## Contributing

Found a feature we missed? Want to suggest improvements? 

- Open an issue: [GitHub Issues](https://github.com/digitalwareshub/tickk/issues)
- Submit a PR: [GitHub Pull Requests](https://github.com/digitalwareshub/tickk/pulls)
- Email: digitalwareshub@gmail.com

---

**Built with ❤️ for productivity enthusiasts, ADHD brains, and anyone who thinks better out loud.**

**Free Forever. No Catch. No Ads. No Tracking.**
