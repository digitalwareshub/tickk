# tickk - Project Structure

A comprehensive documentation of all files and their purposes in the tickk codebase.

---

## Project Overview

**tickk** is a voice-first productivity application built with Next.js that lets users brain dump thoughts via voice, then auto-organizes them into tasks and notes using NLP (not AI). It's designed with ADHD and neurodivergent users in mind, featuring a privacy-first, offline-capable architecture.

### Key Principles
- **No AI** - Uses local NLP (compromise.js) for classification
- **No Login** - Works immediately without signup
- **No Cloud** - All data stored locally in browser (IndexedDB)
- **No Data Leaves Device** - Complete privacy
- **Works Offline** - Full PWA support
- **Open Source** - MIT licensed

### Technology Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | ^16.0.7 | React framework with Pages Router |
| React | ^18 | UI library |
| TypeScript | ^5 | Type-safe JavaScript |
| Tailwind CSS | ^3.4.1 | Utility-first CSS |
| compromise.js | ^14.14.0 | NLP for text classification |
| IndexedDB | - | Primary local storage |
| Web Speech API | - | Voice recognition |
| next-seo | ^6.8.0 | SEO management |
| next-pwa | ^5.6.0 | Progressive Web App support |
| Stripe | ^17.3.1 | Payment processing (Pro tier) |

---

## Root Directory Structure

```
tickk/
├── __mocks__/              # Jest mock files
├── __tests__/              # Test files
├── AHREFs/                 # SEO audit reports
├── components/             # React components (40+)
├── docs/                   # Project documentation
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries and services
├── pages/                  # Next.js pages (28 pages)
├── public/                 # Static assets
├── scripts/                # Utility scripts
├── styles/                 # Global CSS
├── types/                  # TypeScript type definitions
└── [config files]          # Root configuration
```

---

## Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and npm scripts |
| `package-lock.json` | Locked dependency versions |
| `tsconfig.json` | TypeScript compiler configuration with path aliases |
| `next.config.js` | Next.js configuration with PWA, webpack, critters |
| `tailwind.config.js` | Tailwind CSS theme configuration |
| `postcss.config.js` | PostCSS configuration |
| `.eslintrc.json` | ESLint rules for code quality |
| `jest.config.js` | Jest testing configuration |
| `jest.setup.js` | Jest setup and global mocks |
| `middleware.ts` | Next.js middleware (currently minimal) |
| `vercel.json` | Vercel deployment configuration |
| `manifest.json` | Root PWA manifest |
| `sw.js` | Root service worker |
| `next-env.d.ts` | Next.js TypeScript definitions |

## Root Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation and setup |
| `CONTRIBUTING.md` | Contribution guidelines |
| `CODE_OF_CONDUCT.md` | Community code of conduct |
| `SECURITY.md` | Security policy and reporting |
| `DEVELOPMENT.md` | Development setup guide |
| `DEPLOYMENT_TEST.md` | Deployment testing notes |
| `SEO.md` | SEO strategy documentation |

---

## `/pages` - Next.js Pages

### Core Application Pages

| File | Route | Purpose |
|------|-------|---------|
| `index.tsx` | `/` | Main app - voice braindump interface with 3 modes |
| `_app.tsx` | - | Global app wrapper with SEO, analytics, providers |
| `_document.tsx` | - | Custom HTML document structure |
| `404.tsx` | `/404` | Custom 404 error page |

### Feature Pages

| File | Route | Purpose |
|------|-------|---------|
| `about.tsx` | `/about` | About page with use cases, FAQs, testimonials |
| `features.tsx` | `/features` | Comprehensive features showcase |
| `pricing.tsx` | `/pricing` | Pricing page (Free vs Pro comparison) |
| `transform.tsx` | `/transform` | Note transformation tool (polish, structure, summarize) |
| `mindmap.tsx` | `/mindmap` | Visual mind map view of notes |

### Blog Pages

| File | Route | Purpose |
|------|-------|---------|
| `blog.tsx` | `/blog` | Blog index listing all articles |
| `blog/adhd-voice-technology-perfect-match.tsx` | `/blog/adhd-voice-technology-perfect-match` | Why voice tech works for ADHD |
| `blog/braindump-first-organize-later-productivity.tsx` | `/blog/braindump-first-organize-later-productivity` | Brain dump methodology article |
| `blog/complete-guide-tickk-app-voice-productivity-2025.tsx` | `/blog/complete-guide-tickk-app-voice-productivity-2025` | Complete tickk guide |
| `blog/hidden-cost-of-typing.tsx` | `/blog/hidden-cost-of-typing` | Typing vs voice comparison |
| `blog/mobile-voice-productivity-capture-ideas-on-the-go.tsx` | `/blog/mobile-voice-productivity-capture-ideas-on-the-go` | Mobile productivity guide |
| `blog/voice-productivity-vs-ai-tools-local-processing-wins.tsx` | `/blog/voice-productivity-vs-ai-tools-local-processing-wins` | Local processing benefits |

### SEO Landing Pages

| File | Route | Purpose |
|------|-------|---------|
| `adhd-productivity-tools.tsx` | `/adhd-productivity-tools` | ADHD tools SEO landing page |
| `voice-productivity-apps.tsx` | `/voice-productivity-apps` | Voice apps SEO landing page |

### Support & Legal Pages

| File | Route | Purpose |
|------|-------|---------|
| `support.tsx` | `/support` | Help center with FAQ, troubleshooting |
| `contact.tsx` | `/contact` | Contact form |
| `bug-report.tsx` | `/bug-report` | Bug reporting page |
| `privacy.tsx` | `/privacy` | Privacy policy |
| `terms.tsx` | `/terms` | Terms of service |
| `changelog.tsx` | `/changelog` | Product changelog and updates |

### Pro & Payment Pages

| File | Route | Purpose |
|------|-------|---------|
| `donate.tsx` | `/donate` | Donation page with Stripe |
| `pro/success.tsx` | `/pro/success` | Post-payment success page |

### Admin & Debug Pages

| File | Route | Purpose |
|------|-------|---------|
| `admin/analytics.tsx` | `/admin/analytics` | Analytics dashboard (internal) |
| `test-error-handling.tsx` | `/test-error-handling` | Error boundary testing page |
| `reviews.tsx` | `/reviews` | User reviews showcase |

### API Routes

| File | Route | Purpose |
|------|-------|---------|
| `api/stripe/create-checkout.ts` | `/api/stripe/create-checkout` | Stripe checkout session creation |

---

## `/components` - React Components

### Core Application Components

| Component | Purpose |
|-----------|---------|
| `BraindumpInterface.tsx` | Main voice recording interface with session management |
| `OrganizedView.tsx` | Task/note dashboard with search, filter, bulk operations |
| `FocusView.tsx` | ADHD-friendly focus mode with Pomodoro timer |
| `MicroLanding.tsx` | Minimal landing interface with quick start |

### Modal Components

| Component | Purpose |
|-----------|---------|
| `ProcessBraindumpModal.tsx` | Review and confirm auto-classification before organizing |
| `EditItemModal.tsx` | Edit individual task or note details |
| `DeleteConfirmModal.tsx` | Confirmation dialog for deletions |
| `BulkDeleteModal.tsx` | Bulk delete confirmation with item list |
| `SaveTemplateModal.tsx` | Save task as reusable template |
| `ImportModal.tsx` | Import data from JSON backup |
| `KeyboardHelpModal.tsx` | Keyboard shortcuts reference |
| `BugReportModal.tsx` | Bug report submission form |
| `AISurveyModal.tsx` | User preference survey for AI features |

### Navigation & Layout

| Component | Purpose |
|-----------|---------|
| `Layout.tsx` | Main layout wrapper with header and mode navigation |
| `Header.tsx` | Top navigation bar with logo, dark mode toggle |
| `Footer.tsx` | Site footer with links |
| `ModeNavigationTabs.tsx` | Braindump/Organized/Focus mode switcher |
| `Breadcrumb.tsx` | Breadcrumb navigation for SEO |
| `CommandPalette.tsx` | VS Code-style command palette (Cmd+K) |

### Analytics & Tracking

| Component | Purpose |
|-----------|---------|
| `Analytics.tsx` | Analytics overview component |
| `AnalyticsDashboard.tsx` | Detailed productivity analytics dashboard |
| `ActivityHeatmap.tsx` | GitHub-style activity heatmap visualization |
| `ProductivityChart.tsx` | 7-day productivity line chart |
| `StreakTracker.tsx` | Consecutive days streak display |
| `StatCard.tsx` | Individual statistic card |

### User Experience

| Component | Purpose |
|-----------|---------|
| `OnboardingTour.tsx` | Interactive 8-step onboarding tutorial |
| `KeyboardHint.tsx` | Contextual keyboard shortcut hints |
| `WhatsNewBanner.tsx` | New feature announcements |
| `FirefoxWarningBanner.tsx` | Browser compatibility warning |
| `PWAInstallPrompt.tsx` | PWA installation prompt |

### Item Display

| Component | Purpose |
|-----------|---------|
| `DateBadge.tsx` | Date display badge with parsed dates |
| `ContextMenu.tsx` | Right-click context menu for items |
| `ReviewItem.tsx` | Individual review/testimonial display |
| `TemplateLibrary.tsx` | Template selection and management |
| `ProjectGroupView.tsx` | Group items by project/category |

### Content & SEO

| Component | Purpose |
|-----------|---------|
| `SEOMeta.tsx` | Reusable SEO meta tags component |
| `FAQSection.tsx` | FAQ accordion with Schema.org markup |
| `RelatedArticles.tsx` | Related blog posts sidebar |
| `MarketingContent.tsx` | Marketing content sections |

### Special Features

| Component | Purpose |
|-----------|---------|
| `MindMapView.tsx` | Visual mind map of notes and connections |
| `DonationButton.tsx` | Stripe donation button |
| `ProGate.tsx` | Pro feature gate wrapper |
| `ReturningUserInterface.tsx` | Welcome back interface for returning users |

### Utilities

| Component | Purpose |
|-----------|---------|
| `ErrorBoundary.tsx` | React error boundary with fallback UI |
| `LiveRegions.tsx` | ARIA live regions for screen readers |
| `ActionButtons.tsx` | Reusable action button group |
| `ClarityAnalytics.tsx` | Microsoft Clarity analytics integration |

---

## `/lib` - Utility Libraries

### Core Services

| File | Purpose |
|------|---------|
| `storage/storage-service.ts` | IndexedDB + localStorage data persistence |
| `classification/classifier.ts` | NLP-based task/note classification using compromise.js |
| `migration/migrator.ts` | Data migration between app versions |
| `config/features.ts` | Feature flags configuration |

### Analytics

| File | Purpose |
|------|---------|
| `analytics.ts` | PWA and basic analytics tracking |
| `analytics/enhanced-analytics.ts` | Enhanced analytics with user segmentation |
| `services/analytics.service.ts` | Analytics data processing service |
| `rate-limiting/rate-limiter.ts` | API rate limiting with quotas |

### Transformers (Pro Feature)

| File | Purpose |
|------|---------|
| `transformers/index.ts` | Transformer exports |
| `transformers/polish.ts` | Text polishing/cleaning |
| `transformers/structure.ts` | Text structuring with headings |
| `transformers/summarize.ts` | Text summarization |
| `transformers/tasks.ts` | Task extraction from text |

### Utilities

| File | Purpose |
|------|---------|
| `utils/dateParser.ts` | Natural language date parsing |
| `utils/icsExport.ts` | ICS calendar file export |
| `utils/error-messages.ts` | User-friendly error message catalog |
| `utils/deviceDetection.ts` | Device and browser detection |
| `utils/retry.ts` | Retry logic with exponential backoff |

### Export

| File | Purpose |
|------|---------|
| `export/docx.ts` | DOCX document export (Pro feature) |

### SEO & Config

| File | Purpose |
|------|---------|
| `seo.config.ts` | Global SEO configuration for next-seo |
| `canonical.ts` | Canonical URL helpers |
| `faq-data.ts` | FAQ content data |
| `confetti.ts` | Celebration confetti animation |

### Services

| File | Purpose |
|------|---------|
| `services/announcer.service.ts` | Screen reader announcement service |
| `services/mindmap.service.ts` | Mind map generation service |

### Payments

| File | Purpose |
|------|---------|
| `stripe/config.ts` | Stripe configuration and pricing |

---

## `/hooks` - Custom React Hooks

| Hook | Purpose |
|------|---------|
| `useKeyboardShortcuts.ts` | Global keyboard shortcut handling |
| `useDarkMode.ts` | Dark mode toggle with persistence |
| `useAnalytics.ts` | Analytics tracking hook |
| `useTemplates.ts` | Template CRUD operations |
| `useContextMenu.ts` | Context menu state management |
| `useProSubscription.ts` | Pro subscription status check |

---

## `/types` - TypeScript Definitions

| File | Purpose |
|------|---------|
| `braindump.ts` | Core types: VoiceItem, Task, Note, AppData, UserPreferences |
| `transform.ts` | Transform feature types |
| `mindmap.ts` | Mind map node and connection types |
| `speech.d.ts` | Web Speech API type definitions |
| `es-compromise.d.ts` | Spanish compromise.js type definitions |

### Key Type Definitions

```typescript
// From types/braindump.ts
interface VoiceItem {
  id: string
  text: string
  timestamp: string
  category: 'task' | 'note' | 'reminder' | 'braindump'
  sessionId: string
  processed: boolean
  confidence?: number
  metadata?: ItemMetadata
}

interface AppData {
  tasks: VoiceItem[]
  notes: VoiceItem[]
  braindump: VoiceItem[]
  sessions: Session[]
  version: string
  preferences?: UserPreferences
}

interface UserPreferences {
  defaultMode: 'braindump' | 'organized' | 'focus'
  showOnboarding: boolean
  enableKeyboardShortcuts: boolean
  recordingTimeout: number
  enableContinuousRecording: boolean
  confidenceThreshold: number
  enableManualReview: boolean
  enableScreenReader: boolean
  highContrast: boolean
  reducedMotion: boolean
}
```

---

## `/styles` - Global CSS

| File | Purpose |
|------|---------|
| `globals.css` | Tailwind imports, CSS variables, animations, responsive utilities |
| `accessibility.css` | Accessibility-focused styles (focus indicators, high contrast) |

### Key CSS Features
- Dark mode with gradient backgrounds
- Custom scrollbar styling
- Mobile-responsive utilities
- Animation classes (fade, slide, spin)
- Focus ring styles for accessibility
- Print styles

---

## `/public` - Static Assets

### Favicon & Icons

| File | Purpose |
|------|---------|
| `favicon.ico` | Main favicon (49KB, multi-size) |
| `favicon.svg` | SVG favicon |
| `favicon-16x16.png` through `favicon-512x512.png` | Various favicon sizes |
| `android-chrome-192x192.png`, `android-chrome-512x512.png` | Android icons |
| `apple-touch-icon.png`, `apple-touch-icon-180x180.png` | iOS icons |
| `icon-72x72.png` through `icon-384x384.png` | PWA icons |
| `icon.svg`, `icon-clean.svg` | SVG icons |

### PWA & Offline

| File | Purpose |
|------|---------|
| `manifest.json` | PWA web app manifest |
| `sw.js` | Service worker for offline support |
| `workbox-f52fd911.js` | Workbox service worker utilities |
| `fallback-*.js` | Offline fallback scripts |
| `unregister-sw.js` | Service worker unregistration |
| `offline.html` | Offline fallback page |

### Social & SEO

| File | Purpose |
|------|---------|
| `og-image.png`, `og-image.webp` | Open Graph image for social sharing |
| `twitter-image.png`, `twitter-image.webp` | Twitter card image |
| `twitter-card.png` | Twitter card fallback |
| `robots.txt` | Search engine crawler instructions |
| `sitemap.xml` | XML sitemap for SEO |
| `feed.xml` | RSS feed |
| `opensearch.xml` | OpenSearch description |
| `llms.txt` | LLM crawling instructions |

### Other Assets

| File | Purpose |
|------|---------|
| `tickk-app.webp` | App screenshot |
| `digiwares_logo.jpg` | Company logo |
| `kam.JPG` | Team photo |
| `browserconfig.xml` | Windows tile configuration |
| `clear-cache.html` | Cache clearing utility page |
| `tickk_cards_generator.html` | Social card generator tool |
| `reviews/` | Review-related assets |

---

## `/__tests__` - Test Files

| File | Purpose |
|------|---------|
| `classification.test.ts` | NLP classifier unit tests (comprehensive) |
| `analytics.test.ts` | Analytics service tests |
| `braindump-flow.test.tsx` | Braindump flow integration tests |
| `bulk-operations.test.tsx` | Bulk operations tests |
| `integration.test.ts` | Full integration tests |

### Test Status
- Classification tests: **Comprehensive and passing**
- Other tests: **Need fixes after LanguageContext removal**

---

## `/__mocks__` - Jest Mocks

| File | Purpose |
|------|---------|
| `fileMock.js` | Mock for static file imports |

---

## `/scripts` - Utility Scripts

| File | Purpose |
|------|---------|
| `analyze.js` | Bundle analyzer script |
| `toggle-features.js` | Feature flag toggle CLI tool |

### NPM Script Commands
```bash
npm run dev              # Start development server
npm run build            # Production build
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run features:on      # Enable all features
npm run features:off     # Disable monetization features
npm run features:status  # Show feature status
```

---

## `/docs` - Project Documentation

### Feature Documentation

| File | Purpose |
|------|---------|
| `IMPORT_FEATURE.md` | Import/export feature documentation |
| `IMPORT_BACKUP_RECOVERY.md` | Backup and recovery guide |
| `MINDMAP_FEATURE.md` | Mind map feature documentation |
| `MINDMAP_ALGORITHM.md` | Mind map algorithm explanation |
| `MIND_MAP_INTEGRATION.md` | Mind map integration guide |
| `FREE_FEATURES.md` | Free tier feature list |

### SEO Documentation

| File | Purpose |
|------|---------|
| `SEO_AUDIT_REPORT.md` | SEO audit findings |
| `SEO_FIXES_BING_REPORT.md` | Bing-specific SEO fixes |
| `GSC_REDIRECT_FIX_GUIDE.md` | Google Search Console redirect fixes |
| `GSC_CRAWLED_NOT_INDEXED_FIX.md` | Indexing issue solutions |

### Marketing & Content

| File | Purpose |
|------|---------|
| `SOCIAL_MEDIA_CONTENT_BRIEF.md` | Social media content guide |
| `blogs.md` | Blog post ideas and planning |
| `youtube.md` | YouTube content strategy |
| `youtube-tts-script.md` | YouTube video scripts |

### Business & Strategy

| File | Purpose |
|------|---------|
| `monetization-strategy-2025-11-18.md` | Monetization strategy document |
| `fresh-monetization-ideas_dnd.md` | Brainstormed monetization ideas |
| `MOBILE_DEV.md` | Mobile development plans |
| `CLAUDE_FINDINGS.md` | AI-generated findings and analysis |

---

## `/AHREFs` - SEO Audit Files

| File | Purpose |
|------|---------|
| `All issues - Tickk.pdf` | Complete Ahrefs SEO audit report |
| `404 page.csv` | 404 error URLs |
| `4XX page.csv` | All 4XX error URLs |
| `Multiple meta description tags.csv` | Duplicate description issues |
| `Title too long.csv` | Pages with long titles |

---

## Feature Flags

Located in `/lib/config/features.ts`:

| Flag | Default | Purpose |
|------|---------|---------|
| `PRICING_PAGE` | true | Show pricing page |
| `MONETIZATION` | false | Enable monetization features |
| `PRO_TIER` | false | Enable Pro subscription |
| `USAGE_QUOTAS` | false | Enable usage limits (500 items) |
| `CLOUD_BACKUP` | false | Cloud backup feature |
| `ADVANCED_EXPORTS` | false | DOCX export and advanced formats |
| `ANALYTICS_DASHBOARD` | false | Advanced analytics dashboard |
| `TRANSFORM_MODE` | true | Note transformation feature |
| `STRIPE_INTEGRATION` | false | Stripe payment processing |

---

## Key Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^16.0.7 | React framework |
| `react` | ^18 | UI library |
| `compromise` | ^14.14.0 | NLP text classification |
| `next-seo` | ^6.8.0 | SEO management |
| `next-pwa` | ^5.6.0 | PWA support |
| `stripe` | ^17.3.1 | Payment processing |
| `@stripe/stripe-js` | ^4.9.0 | Stripe frontend SDK |
| `docx` | ^9.5.1 | DOCX file generation |
| `jszip` | ^3.10.1 | ZIP file creation |
| `file-saver` | ^2.0.5 | File download utility |
| `lucide-react` | ^0.548.0 | Icon library |
| `react-hot-toast` | ^2.6.0 | Toast notifications |
| `@vercel/analytics` | ^1.5.0 | Vercel analytics |
| `@vercel/speed-insights` | ^1.2.0 | Performance monitoring |
| `critters` | ^0.0.23 | Critical CSS inlining |
| `uuid` | ^13.0.0 | UUID generation |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5 | Type checking |
| `tailwindcss` | ^3.4.1 | CSS framework |
| `eslint` | ^8 | Code linting |
| `jest` | ^30.1.3 | Testing framework |
| `@testing-library/react` | ^16.3.0 | React testing utilities |

---

## Environment Variables

```env
# Analytics
NEXT_PUBLIC_GA_ID=                    # Google Analytics ID
NEXT_PUBLIC_CLARITY_ID=               # Microsoft Clarity ID

# Stripe (Pro features)
STRIPE_SECRET_KEY=                    # Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=   # Stripe publishable key
STRIPE_WEBHOOK_SECRET=                # Stripe webhook secret
STRIPE_PRICE_ID=                      # Stripe price ID

# Feature Flags
NEXT_PUBLIC_ENABLE_MONETIZATION=      # Enable monetization
NEXT_PUBLIC_ENABLE_PRO_TIER=          # Enable Pro tier
NEXT_PUBLIC_ENABLE_CLOUD_BACKUP=      # Enable cloud backup
NEXT_PUBLIC_ENABLE_ANALYTICS_DASHBOARD= # Enable analytics
NEXT_PUBLIC_SURVEY_AI=                # Enable AI survey
```

---

## Architecture Overview

### Data Flow

```
User Voice Input
      ↓
Web Speech API (transcription)
      ↓
VoiceClassifier (compromise.js NLP)
      ↓
Classification: task | note | reminder
      ↓
StorageService (IndexedDB)
      ↓
React State (AppData)
      ↓
UI Components
```

### Application Modes

1. **Braindump Mode** - Voice capture, example prompts, session management
2. **Organized Mode** - Task/note lists, search, filter, bulk operations, analytics
3. **Focus Mode** - Today's priorities, Pomodoro timer, minimal UI

### Storage Architecture

- **Primary**: IndexedDB via StorageService singleton
- **Fallback**: localStorage for older browsers
- **Data Version**: 2.0.0 with migration support

### SEO Architecture

- **Global Config**: `DefaultSeo` in `_app.tsx` with `seo.config.ts`
- **Page-Level**: Individual `<Head>` or `<NextSeo>` overrides
- **Schema.org**: JSON-LD structured data on key pages
- **Sitemap**: Auto-generated XML sitemap

---

## Codebase Statistics

| Metric | Value |
|--------|-------|
| Total Files | ~170 |
| Components | 40+ |
| Pages | 28 |
| Hooks | 6 |
| Service Classes | 5+ |
| Blog Articles | 6 |
| Test Files | 5 |
| Languages Supported | 2 (EN/ES) |
| ARIA Labels | 73+ |
| Feature Flags | 9 |

---

## Known Issues & TODOs

### High Priority
1. Fix broken tests after LanguageContext removal
2. Date parser edge case: past dates jump to next year
3. Storage performance: full clear+write on every save

### Medium Priority
4. 61 `any` TypeScript usages need proper types
5. Large component files need splitting (BraindumpInterface, OrganizedView)
6. TODO in OrganizedView: custom timer modal

### Low Priority
7. 168 console statements could be cleaned for production
8. 22 ESLint disables to review

---

*Last updated: December 2024*
