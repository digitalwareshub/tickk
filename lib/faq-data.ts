/**
 * FAQ Data for Tickk.app
 * Centralized FAQ content for all pages
 * Used with FAQSection component for Schema.org markup
 */

export interface FAQItem {
  question: string
  answer: string
}

/**
 * Homepage FAQs - General questions about Tickk
 */
export const homepageFAQs: FAQItem[] = [
  {
    question: "Is Tickk really free?",
    answer: "Yes, Tickk is 100% free forever. There are no hidden costs, no premium tiers, no subscription fees. We built Tickk as a public good for productivity and mental health. All features including voice recognition, task organization, and offline functionality are completely free."
  },
  {
    question: "Do I need to create an account?",
    answer: "No signup required. Tickk works instantly in your browser without any account creation. Your data is stored locally on your device using browser storage, which means you have complete control and privacy. No emails, no passwords, no personal information needed."
  },
  {
    question: "How does voice recognition work?",
    answer: "Tickk uses the Web Speech API built into modern browsers for voice recognition. This means the speech processing happens locally in your browser, not on our servers. We don't record, store, or transmit your voice data anywhere. The recognition is fast, accurate, and works completely offline once the page is loaded."
  },
  {
    question: "Does Tickk work offline?",
    answer: "Yes! Tickk is a Progressive Web App (PWA) that works completely offline once loaded. You can capture voice notes, organize tasks, and access all features without an internet connection. Your data is stored locally on your device, so you never lose access to your productivity tools."
  },
  {
    question: "Is Tickk good for ADHD?",
    answer: "Tickk was specifically designed with ADHD minds in mind. The 'brain dump first, organize later' approach reduces cognitive load and decision fatigue. Focus Mode minimizes distractions, the Command Palette (⌘K) provides quick access without hunting through menus, and executive function support helps with task initiation and organization. Many users from the ADHD community have reported it's transformative for managing racing thoughts."
  },
  {
    question: "How is my privacy protected?",
    answer: "Privacy is our top priority. All voice processing happens locally in your browser using the Web Speech API. We don't use AI servers, don't collect voice recordings, and don't track your tasks or notes. Everything is stored on your device using IndexedDB. We don't even use cookies except for essential functionality. You can review our open-source code on GitHub to verify these claims."
  },
  {
    question: "What browsers are supported?",
    answer: "Tickk works best on Chrome, Edge, and Safari (desktop and mobile). Firefox has limited Web Speech API support. The app is optimized for mobile use, so you can capture ideas on the go. For the best experience, use Chrome on desktop or Safari on iOS."
  },
  {
    question: "Can I export my data?",
    answer: "Yes, you can export all your tasks, notes, and braindump items as JSON at any time using the keyboard shortcut Ctrl+E (or Cmd+E on Mac). The export includes timestamps and categories. We're also adding CSV and PDF export options soon. You own your data completely."
  },
  {
    question: "How accurate is the speech recognition?",
    answer: "Tickk achieves approximately 99% accuracy for clear speech using the Web Speech API. Accuracy depends on your microphone quality and speaking clarity. The app includes smart punctuation detection and can handle natural speech patterns, ums, and pauses. You can always edit any captured text manually."
  },
  {
    question: "Can I use Tickk for team collaboration?",
    answer: "Currently, Tickk is designed for individual productivity. However, you can export your tasks and share them with team members. We're exploring team features for future releases, but our priority is keeping the core experience simple and privacy-focused for individual users."
  },
  {
    question: "What's the difference between Braindump, Organized, and Focus modes?",
    answer: "Braindump mode lets you speak freely without categories - just capture everything. Organized mode shows your tasks and notes in structured lists. Focus mode provides a distraction-free environment with a single task visible. You can switch between modes anytime using the tab navigation or Command Palette (⌘K)."
  },
  {
    question: "Does Tickk use AI or ChatGPT?",
    answer: "No. Tickk uses compromise.js, a deterministic natural language processing library that runs entirely in your browser. There's no AI, no machine learning models, no cloud processing, and no data sent to third-party AI services. This ensures your privacy and makes the app work offline."
  }
]

/**
 * ADHD Productivity FAQs - Questions specific to ADHD users
 */
export const adhdFAQs: FAQItem[] = [
  {
    question: "Why is voice productivity better for ADHD?",
    answer: "Voice input bypasses typing barriers that often stop ADHD individuals from capturing thoughts. Racing thoughts move faster than typing allows, so speaking naturally captures ideas at the speed of thought. Voice also reduces the executive function burden of deciding how to categorize things while you're thinking of them."
  },
  {
    question: "How does Tickk help with executive function challenges?",
    answer: "Tickk reduces decision fatigue by letting you brain dump first without categorization. The automatic organization using NLP means you don't have to decide 'is this a task or a note?' while capturing. Focus Mode removes distractions, and the Command Palette provides structure without overwhelming choice. These features specifically target common executive function challenges."
  },
  {
    question: "Can Tickk help with task initiation problems?",
    answer: "Yes. Focus Mode shows only one task at a time, reducing overwhelm. The voice-first approach lowers the activation energy needed to start - you just speak instead of opening multiple apps and typing. The visual progress tracking also provides dopamine hits that help maintain motivation."
  },
  {
    question: "Is the interface ADHD-friendly?",
    answer: "The interface is intentionally minimal to reduce visual overwhelm. Large buttons, clear hierarchy, dark mode support, and keyboard shortcuts all help ADHD users navigate efficiently. The Command Palette (⌘K) lets you access any feature without hunting through menus. We prioritized reducing cognitive load in every design decision."
  },
  {
    question: "How does Tickk handle time-blindness?",
    answer: "Every item is automatically timestamped, so you have a record of when thoughts occurred. The streak tracking helps build awareness of time passing. Calendar export (coming soon) will integrate with your existing time management tools. The app shows relative timestamps (e.g., '2 hours ago') which can be more intuitive than absolute times."
  }
]

/**
 * Voice Technology FAQs - Technical questions about voice features
 */
export const voiceTechFAQs: FAQItem[] = [
  {
    question: "What is the Web Speech API?",
    answer: "The Web Speech API is a browser standard that enables speech recognition and synthesis directly in the browser, without server-side processing. It's built into Chrome, Safari, and Edge. Tickk leverages this API to provide fast, accurate, and private voice recognition without sending data to external servers."
  },
  {
    question: "How does compromise.js work for natural language processing?",
    answer: "Compromise.js is a lightweight, browser-based natural language processing library. It analyzes your spoken text locally to identify verbs, nouns, time expressions, and intent. This allows Tickk to automatically categorize your thoughts into tasks (action items) or notes (information) without using AI or cloud services."
  },
  {
    question: "Why not use AI like ChatGPT for organization?",
    answer: "AI-based tools require sending your data to external servers, which compromises privacy. They also require internet connectivity and often cost money. Compromise.js runs entirely in your browser, works offline, protects your privacy, and is completely free. For productivity tasks, deterministic NLP is often more reliable than AI."
  },
  {
    question: "Can I use Tickk in other languages?",
    answer: "The Web Speech API supports multiple languages for speech recognition. Currently, the UI and NLP classification are optimized for English, but we're planning Spanish and French versions. You can already change your browser's voice recognition language in browser settings."
  },
  {
    question: "What happens if speech recognition makes a mistake?",
    answer: "You can manually edit any captured text by clicking on it. The inline editing preserves your timestamps and categories. We've optimized the UI for quick corrections. Most users find the 99% accuracy sufficient, with occasional minor edits needed for proper nouns or technical terms."
  }
]

/**
 * Privacy FAQs - Questions about data privacy and security
 */
export const privacyFAQs: FAQItem[] = [
  {
    question: "Where is my data stored?",
    answer: "All your data is stored locally on your device using IndexedDB, a browser storage system. Nothing is sent to our servers. You can verify this by checking the Network tab in browser developer tools - you'll see zero data transmission related to your tasks and notes."
  },
  {
    question: "Can you see my voice recordings?",
    answer: "No. We don't record, store, or transmit voice audio. The Web Speech API processes your voice locally in your browser and only outputs text. The audio never leaves your device. We never have access to what you say."
  },
  {
    question: "Do you use cookies or tracking?",
    answer: "We use minimal cookies only for essential functionality (dark mode preference). We use Vercel Analytics for anonymous aggregate traffic statistics (page views, country), but we don't track individual users or their content. No third-party advertising or tracking cookies."
  },
  {
    question: "Is Tickk GDPR and CCPA compliant?",
    answer: "Yes. Since we don't collect personal data, voice recordings, or task content, we're inherently compliant. The only data we collect is anonymous aggregate analytics. You can request deletion of any analytics data by contacting us, though we don't tie it to individuals."
  },
  {
    question: "What if I lose my device?",
    answer: "Since data is stored locally, losing your device means losing your Tickk data unless you've exported it. We recommend regularly exporting your data (Ctrl+E) as backups. We're exploring optional encrypted cloud backup for Tickk Pro, but it will always be opt-in."
  }
]
