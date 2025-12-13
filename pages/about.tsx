import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo' // Added: Import NextSeo
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'
import { 
  useSectionTracking, 
  useCTATracking, 
  useFAQTracking, 
  useUseCaseTracking,
  usePerformanceTracking,
  useUserSegmentation,
  useLinkTracking 
} from '@/hooks/useAnalytics'
import { trackPageView, enhancedAnalytics } from '@/lib/analytics/enhanced-analytics'

export default function About() {
  const [demoText, setDemoText] = useState('')
  const [demoCategory, setDemoCategory] = useState<'tasks' | 'notes' | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Analytics hooks
  const heroSectionRef = useSectionTracking('hero');
  const howItWorksSectionRef = useSectionTracking('how_it_works');
  const useCasesSectionRef = useSectionTracking('use_cases');
  const demoSectionRef = useSectionTracking('interactive_demo');
  const blogSectionRef = useSectionTracking('blog');
  const faqSectionRef = useSectionTracking('faq');
  const finalCtaSectionRef = useSectionTracking('final_cta');

  // CTA tracking
  const { trackClick: trackHeroCTA } = useCTATracking('hero_cta', 'hero');
  const { trackClick: trackUseCaseCTA } = useCTATracking('use_case_cta', 'use_cases');
  const { trackClick: trackComparisonCTA } = useCTATracking('comparison_cta', 'comparison');
  const { trackClick: trackFinalCTA } = useCTATracking('final_cta', 'final_cta');

  // User segmentation
  const { identifySegment } = useUserSegmentation();
  const { trackLinkClick } = useLinkTracking();

  // Performance tracking
  usePerformanceTracking('landing_page');

  // Use case tracking hooks
  const adhdUseCase = useUseCaseTracking('adhd-neurodivergent');
  const professionalUseCase = useUseCaseTracking('busy-professionals');
  const studentUseCase = useUseCaseTracking('students-researchers');
  const accessibilityUseCase = useUseCaseTracking('accessibility-champions');
  const creativeUseCase = useUseCaseTracking('creative-professionals');
  const parentUseCase = useUseCaseTracking('parents-multitaskers');

  // FAQ tracking hooks
  const adhdFAQ = useFAQTracking('adhd-free-app');
  const hyperfocusFAQ = useFAQTracking('hyperfocus-racing-thoughts');
  const comparisonFAQ = useFAQTracking('notion-ticktick-comparison');
  const studentsFAQ = useFAQTracking('students-lectures');
  const accessibilityFAQ = useFAQTracking('accessibility-mobility');
  const professionalsFAQ = useFAQTracking('professionals-parents');

  const demoExamples = [
    { text: "Remember to buy groceries and pick up dry cleaning", category: 'tasks' as const },
    { text: "Great idea for the new product design using voice interfaces", category: 'notes' as const },
    { text: "Schedule a dentist appointment next week", category: 'tasks' as const },
    { text: "Don't forget to submit the quarterly report by Friday", category: 'tasks' as const },
    { text: "Interesting insights about user behavior patterns", category: 'notes' as const },
  ]

  useEffect(() => {
    // Track page view
    trackPageView('landing_page');
    
    // Mark as visited for returning user detection
    localStorage.setItem('tickk_has_visited', 'true');

    // Set up intersection observers for use case cards
    const observeUseCaseCards = () => {
      const cards = document.querySelectorAll('[data-use-case]');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const useCaseId = entry.target.getAttribute('data-use-case');
              if (useCaseId) {
                // Track view based on use case ID
                switch (useCaseId) {
                  case 'adhd-neurodivergent':
                    adhdUseCase.trackView();
                    break;
                  case 'busy-professionals':
                    professionalUseCase.trackView();
                    break;
                  case 'students-researchers':
                    studentUseCase.trackView();
                    break;
                  case 'accessibility-champions':
                    accessibilityUseCase.trackView();
                    break;
                  case 'creative-professionals':
                    creativeUseCase.trackView();
                    break;
                  case 'parents-multitaskers':
                    parentUseCase.trackView();
                    break;
                }
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      cards.forEach((card) => observer.observe(card));
    };

    // Set up intersection observers for FAQ items
    const observeFAQItems = () => {
      const faqItems = document.querySelectorAll('[data-faq]');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const faqId = entry.target.getAttribute('data-faq');
              if (faqId) {
                // Track FAQ view based on ID
                switch (faqId) {
                  case 'adhd-free-app':
                    adhdFAQ.trackView();
                    break;
                  case 'hyperfocus-racing-thoughts':
                    hyperfocusFAQ.trackView();
                    break;
                  case 'notion-ticktick-comparison':
                    comparisonFAQ.trackView();
                    break;
                  case 'students-lectures':
                    studentsFAQ.trackView();
                    break;
                  case 'accessibility-mobility':
                    accessibilityFAQ.trackView();
                    break;
                  case 'professionals-parents':
                    professionalsFAQ.trackView();
                    break;
                }
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      faqItems.forEach((item) => observer.observe(item));
    };

    // Initialize observers after mount
    setTimeout(() => {
      observeUseCaseCards();
      observeFAQItems();
    }, 100);
  }, [adhdUseCase, professionalUseCase, studentUseCase, accessibilityUseCase, creativeUseCase, parentUseCase, adhdFAQ, hyperfocusFAQ, comparisonFAQ, studentsFAQ, accessibilityFAQ, professionalsFAQ])

  const classifyText = (text: string): 'tasks' | 'notes' => {
    const originalText = text.trim()
    
    // Early return for empty text
    if (!originalText) return 'notes'
    
    // 1. INTENT/DESIRE RECOGNITION (Highest Priority)
    // These should always go to Notes regardless of action words
    const intentPatterns = [
      /\bi\s+want\s+to\b/i,
      /\bi'd\s+like\s+to\b/i,
      /\bi\s+wish\s+to\b/i,
      /\bi\s+hope\s+to\b/i,
      /\bi'm\s+thinking\s+about\b/i,
      /\bi'm\s+interested\s+in\b/i,
      /\bi\s+love\s+to\b/i,
      /\bi\s+enjoy\b/i,
      /\bi\s+should\s+(?:read|learn|try|explore|check\s+out|look\s+into)\b/i,
      /\bwould\s+like\s+to\b/i
    ]
    
    const hasIntent = intentPatterns.some(pattern => pattern.test(originalText))
    if (hasIntent) {
      return 'notes'
    }
    
    // 2. QUESTION PATTERNS → Notes
    const questionPatterns = [
      /\bwhat\s+should\s+i\b/i,
      /\bhow\s+(?:do|can)\s+i\b/i,
      /\bwhere\s+(?:should|can)\s+i\b/i,
      /\bwhen\s+should\s+i\b/i,
      /\bwhy\s+(?:should|do)\s+i\b/i,
      /\?$/
    ]
    
    const isQuestion = questionPatterns.some(pattern => pattern.test(originalText))
    if (isQuestion) {
      return 'notes'
    }
    
    // 3. SCHEDULING/APPOINTMENT PATTERNS → Tasks 
    const schedulingPatterns = [
      /\b(?:schedule|book|arrange)\b/i,
      /\b(?:appointment|meeting|call)\b/i,
      /\b(?:remind\s+me\s+to)\b/i,
    ]
    
    const hasSchedulingPattern = schedulingPatterns.some(pattern => pattern.test(originalText))
    if (hasSchedulingPattern) {
      return 'tasks'
    }
    
    // 4. STRONG OBLIGATION PATTERNS → Tasks
    const obligationPatterns = [
      /\bi\s+need\s+to\b/i,
      /\bi\s+have\s+to\b/i,
      /\bi\s+must\b/i,
      /\bremember\s+to\b/i,
      /\bdon't\s+forget\s+to\b/i,
      /\bmake\s+sure\s+to\b/i,
      /\btodo\b/i,
      /\btask\b/i
    ]
    
    const hasObligation = obligationPatterns.some(pattern => pattern.test(originalText))
    if (hasObligation) {
      return 'tasks'
    }
    
    // 5. ACTION WORDS (only if no intent detected)
    const actionPatterns = [
      /\b(?:buy|purchase|get|obtain|acquire)\b/i,
      /\b(?:pick\s+up|collect)\b/i,
      /\b(?:finish|complete|submit|send)\b/i,
      /\b(?:fix|repair|resolve)\b/i,
      /\b(?:create|make|build|write)\b/i,
      /\b(?:email|contact|text)\b/i
    ]
    
    const hasAction = actionPatterns.some(pattern => pattern.test(originalText))
    if (hasAction) {
      // Check context - if it's a gentle suggestion, it might be a note
      const gentleContext = /\b(?:maybe|perhaps|could|might|should\s+probably)\b/i.test(originalText)
      if (gentleContext) {
        return 'notes'
      }
      return 'tasks'
    }
    
    // 6. NOTE INDICATORS (explicit)
    const notePatterns = [
      /\b(?:idea|ideas|thought|thoughts|note|notes)\b/i,
      /\b(?:insight|inspiration|concept|brainstorm)\b/i,
      /\b(?:interesting|fascinating|cool)\b/i,
      /\b(?:remember\s+(?:this|that)|note\s*:)\b/i
    ]
    
    const hasNoteIndicator = notePatterns.some(pattern => pattern.test(originalText))
    if (hasNoteIndicator) {
      return 'notes'
    }
    
    // 7. DEFAULT: Notes (thoughts, observations, general input)
    return 'notes'
  }

  const playDemo = async () => {
    if (isPlaying) return
    
    setIsPlaying(true)
    setDemoText('')
    setDemoCategory(null)
    
    // Pick a random example
    const example = demoExamples[Math.floor(Math.random() * demoExamples.length)]
    
    // Simulate typing the text
    for (let i = 0; i <= example.text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50))
      setDemoText(example.text.slice(0, i))
    }
    
    // Wait a moment, then show classification
    await new Promise(resolve => setTimeout(resolve, 500))
    const predictedCategory = classifyText(example.text)
    setDemoCategory(predictedCategory)
    
    // Reset after showing result
    setTimeout(() => {
      setIsPlaying(false)
    }, 3000)
  }

  return (
    <>
      {/* NextSeo will override DefaultSeo from _app.tsx - prevents duplicates */}
      <NextSeo
        title="About tickk - Voice-First Productivity for ADHD Minds"
        description="Learn about tickk, the free voice productivity app designed for ADHD and neurodivergent minds. Brain dump first, organize later with speech-to-text technology."
        canonical="https://tickk.app/about"
        openGraph={{
          type: 'website',
          url: 'https://tickk.app/about',
          title: 'About tickk - Voice-First Productivity App',
          description: 'Learn about tickk, the free productivity app for ADHD & neurodivergent minds. Brain dump first, organize later with voice-to-text technology.',
          site_name: 'tickk',
          locale: 'en_US',
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@tickkdotapp',
          site: '@tickkdotapp',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'progressive web app productivity, PWA voice recognition, offline voice app, no AI voice assistant, free voice to text app, voice productivity software, speech recognition task manager, PWA offline capabilities, browser-based voice technology, hands-free productivity app, voice controlled todo list, natural language processing productivity, speech to text organizer, offline PWA voice app, privacy focused voice app, voice note taking app, PWA speech recognition, offline voice productivity, progressive web app voice assistant, no AI voice technology, browser voice recognition PWA, voice productivity dashboard, offline speech to action converter, PWA task management, progressive web app voice tools, voice memo organization app, dictation software for tasks, speech to text for productivity, voice recording productivity tool, voice note taking for meetings, mobile voice productivity app, voice notes on mobile browser, voice controlled task management, speech recognition for project management, hands-free note taking app, voice dictation task organizer, browser speech recognition app, offline voice memo app, privacy voice productivity tool, no login voice app, voice braindump organizer, speech to organized tasks, voice thought capture app, hands-free brainstorming tool'
          },
          { name: 'author', content: 'tickk' },
          { name: 'keywords-adhd-core', content: 'best free productivity apps for ADHD, voice note app for ADHD brain, ADHD friendly task management tools, brain dump apps for ADHD and neurodivergent people, simple productivity apps for ADHD students, capture thoughts app for ADHD adults, ADHD focus tool free online, free productivity app for ADHD adults, best productivity apps for ADHD and neurodivergent thinkers, brain dump app for ADHD racing thoughts, voice note app for ADHD hyperfocus, ADHD friendly task management app free, capture thoughts instantly ADHD tool, organize later productivity app for ADHD' },
          { name: 'keywords-voice-braindump', content: 'brain dump app online free, voice to notes productivity app, capture ideas with voice app, free brain dump organizer app, instant voice transcription productivity tool, note taking app that organizes later, quick voice capture app for ideas' },
          { name: 'keywords-startup', content: 'new productivity startup 2025, featured indie app, trending startup tools, best new productivity apps, innovative voice startup, ADHD startup tools, neurodivergent tech startup, bootstrapped productivity app, indie maker productivity tool, startup discovery, new app launch 2025, featured on Product Hunt, trending on Hacker News' },
          { name: 'keywords-affordability', content: 'free alternative to ADHD productivity apps, free alternative to TickTick Notion for ADHD, free ADHD organization apps 2025, free task manager app for busy minds, productivity tools for ADHD without subscription, free alternative to expensive ADHD productivity apps, free productivity app with no subscription' },
          { name: 'keywords-students-makers', content: 'productivity apps for college students ADHD, note taking app for exams ADHD friendly, best productivity app for makers 2025, quick capture tools for creators and entrepreneurs, free idea capture app for startups, best free brain dump app for students 2025, productivity app for researchers and PhD students, note taking app for ADHD students free, lecture capture voice note app for students, study session brain dump app, assignment idea capture tool free' },
          { name: 'keywords-pain-points', content: 'overwhelmed by productivity apps ADHD, simple alternative to complex task managers, stop forgetting ideas ADHD tool, best app to avoid context switching ADHD, minimal productivity app for busy people, brain dump productivity tool 2025 free, minimal productivity app for overwhelmed people, quick capture and organize later app, one tap voice productivity tool' },
          { name: 'keywords-professionals', content: 'productivity app for busy professionals free, best voice note app for meetings and action items, one tap brain dump app for professionals, capture ideas during commutes productivity app, productivity tool for executives on the go, free productivity app for entrepreneurs and founders' },
          { name: 'keywords-accessibility', content: 'accessible productivity app for mobility challenges, voice-first productivity app for accessibility, best productivity apps for people with typing difficulties, hands-free productivity app free, inclusive productivity apps 2025, productivity tools compatible with assistive technologies' },
          { name: 'keywords-creatives', content: 'brain dump app for creative professionals, idea capture app for artists and designers, best productivity apps for writers free, voice brainstorming app for creatives, project idea collection tool free, productivity app for creative flow states' },
          { name: 'keywords-parents', content: 'hands-free productivity app for parents, free productivity app for moms and dads, best app for multitaskers to capture thoughts, productivity app while cooking or parenting, quick reminder voice app for families, organize household tasks with voice app' },
          { name: 'keywords-branding', content: 'tickk app ADHD productivity, digiwares productivity apps family, new productivity tool 2025 ADHD friendly, one tap voice brain dump app, productivity without overwhelm free app, tickk app ADHD productivity tool' },
          { name: 'keywords-usecases', content: 'voice productivity for students, voice notes for professionals, voice memo for parents, voice app for creatives, voice productivity for accessibility, voice notes for busy professionals, voice memo for multitaskers, voice app for researchers, voice productivity for entrepreneurs, voice notes for consultants, voice memo for writers, voice app for designers, voice productivity for coaches, voice notes for therapists, voice memo for project managers, voice app for executives, voice productivity for freelancers, voice notes for remote workers, voice memo for content creators, voice app for podcasters, voice productivity for journalists, voice notes for bloggers, voice memo for marketers, voice app for sales professionals, voice productivity for customer service, voice notes for HR professionals, voice memo for trainers, voice app for educators, voice productivity for librarians, voice notes for researchers, voice memo for analysts, voice app for consultants, voice productivity for advisors, voice notes for mentors, voice memo for coaches, voice app for facilitators, voice productivity for workshop leaders, voice notes for meeting facilitators, voice memo for team leaders, voice app for managers, voice productivity for supervisors, voice notes for directors, voice memo for executives, voice app for CEOs, voice productivity for founders, voice notes for entrepreneurs, voice memo for startup teams, voice app for small business owners, voice productivity for solopreneurs, voice notes for independent contractors, voice memo for gig workers, voice app for freelance professionals' },
          { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
          { name: 'googlebot', content: 'index, follow' },
          { name: 'bingbot', content: 'index, follow' },
          { name: 'language', content: 'en-US' },
          { name: 'geo.region', content: 'US' },
          { name: 'distribution', content: 'global' },
          { name: 'rating', content: 'general' },
          { name: 'revisit-after', content: '1 days' },
          { name: 'classification', content: 'productivity software, voice recognition, voice assistant' },
          { name: 'category', content: 'productivity, software, voice technology' },
          { name: 'coverage', content: 'worldwide' },
          { name: 'target', content: 'all' },
          { name: 'HandheldFriendly', content: 'True' },
          { name: 'MobileOptimized', content: '320' },
          { name: 'subject', content: 'Free voice to text productivity software with browser-based speech recognition for automatic task organization' },
          { name: 'abstract', content: 'tickk is a revolutionary free voice productivity application that uses advanced natural language processing to convert speech into organized tasks, notes, and reminders. Perfect for professionals, students, and entrepreneurs seeking hands-free productivity solutions.' },
        ]}
      />

      {/* Keep Head only for structured data (Schema.org) and FAQPage that NextSeo doesn't handle */}
      <Head>
        {/* iOS-specific meta tags already in _app.tsx, no need to duplicate */}
        
        {/* Schema.org SoftwareApplication structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "tickk",
              "alternateName": ["Voice Productivity App", "Speech Recognition Software", "Voice to Text Organizer"],
              "description": "Revolutionary free voice productivity application that transforms speech into organized tasks, notes, and reminders using natural language processing with compromise.js. Perfect for hands-free productivity, task management, and note-taking without requiring any login or account creation.",
              "applicationCategory": ["ProductivityApplication", "UtilitiesApplication", "BusinessApplication"],
              "applicationSubCategory": "Task Management",
              "operatingSystem": ["Web Browser", "Chrome", "Firefox", "Safari", "Edge"],
              "url": "https://tickk.app",
              "downloadUrl": "https://tickk.app",
              "installUrl": "https://tickk.app",
              "screenshot": "https://tickk.app/preview-image.png",
              "softwareVersion": "1.0",
              "datePublished": "2024-01-01",
              "dateModified": "2024-11-17",
              "author": {
                "@type": "Organization",
                "name": "tickk",
                "url": "https://tickk.app"
              },
              "publisher": {
                "@type": "Organization",
                "name": "tickk",
                "url": "https://tickk.app"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free forever - no subscription, no hidden costs, no account required",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "79",
                "bestRating": "5",
                "worstRating": "1"
              },
              "featureList": [
                "Advanced voice recognition with 99% accuracy",
                "Natural language processing and text classification",
                "Automatic categorization of tasks, notes, and reminders",
                "Real-time speech transcription",
                "Complete offline functionality",
                "Zero data collection - privacy focused",
                "Progressive Web App (PWA) installation",
                "Cross-platform browser compatibility",
                "Voice-controlled task management",
                "Speech-to-text productivity tools",
                "Hands-free note taking",
                "Voice braindump organization",
                "No account or login required",
                "Progressive Web App support",
                "Cross-platform compatibility",
                "Dark mode support",
                "Keyboard shortcuts for accessibility",
                "Mobile responsive design",
                "Instant voice command processing",
                "Smart context understanding",
                "Multi-language support",
                "Export capabilities",
                "Hands-free operation",
                "Voice-controlled workflow management"
              ],
              "keywords": "free voice to text, speech recognition, voice productivity, hands-free task management, speech to text organizer, voice note taking, natural language processing, voice commands, voice assistant, productivity software",
              "inLanguage": "en-US",
              "isAccessibleForFree": true,
              "isFamilyFriendly": true,
              "genre": ["Productivity", "Business", "Utilities"],
              "audience": {
                "@type": "Audience",
                "audienceType": ["Professionals", "Students", "Entrepreneurs", "Busy Parents", "Accessibility Users"]
              },
              "potentialAction": {
                "@type": "UseAction",
                "target": "https://tickk.app"
              }
            })
          }}
        />
        
        {/* FAQ Schema for voice search optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the best free voice to text productivity app?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "tickk is a revolutionary free voice productivity app that uses natural language processing with compromise.js to convert speech into organized tasks, notes, and reminders. It requires no login, works offline, and maintains complete privacy while offering 99% accurate speech recognition using your browser's Web Speech API."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "How does smart speech recognition work for task management?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "tickk uses advanced natural language processing with compromise.js to analyze your speech patterns, identify action words, time references, and context clues to automatically categorize your voice input into tasks, notes, or reminders without any manual sorting required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use voice commands for productivity without creating an account?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "Yes! tickk works completely without any account creation, login, or personal data collection. Simply visit the website and start speaking - your voice commands are processed locally in your browser for maximum privacy."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <Layout className="min-h-screen bg-white dark:bg-slate-900" disableNextSeo={true}>
        {/* Hero Section */}
        <section ref={heroSectionRef} className="bg-white dark:bg-slate-900 py-16">
          
          <div className="max-w-4xl mx-auto px-4 py-8">
            
            {/* Breadcrumbs */}
            <Breadcrumb />
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 mb-6">
                <span className="inline-block h-2 w-2 rounded-full bg-gray-600 dark:bg-slate-400 animate-pulse"></span>
                🎤 PWA • Works Offline • No AI • 100% Free
              </div>

              {/* Main Headline */}
              <h1 className="heading-primary text-gray-900 dark:text-slate-50 mb-4">
                You think at <span className="text-orange-600 dark:text-orange-400">400 WPM</span>.{' '}
                <span className="sm:inline block">You type at <span className="text-orange-600 dark:text-orange-400">40 WPM</span>.</span>
              </h1>
              
              {/* Subheading */}
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-slate-300 mb-6">
                Voice-First Idea Capture and Task Manager 2025
              </h2>

              {/* Audience Positioning */}
              <div className="mx-auto max-w-2xl mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-r">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  <strong>Built for privacy-conscious users</strong> who want nothing to do with AI, cloud storage, or account registrations. 
                  If you value data sovereignty and local-first tools, this is for you.
                </p>
              </div>

              {/* Subheadline */}
              <p className="mx-auto max-w-2xl text-responsive text-gray-600 dark:text-slate-400 mb-8 text-center">
                Just speak your thoughts and watch them become organized tasks and notes. 
                No complex setup, no subscriptions, no data collection. <Link href="/privacy" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline">Your privacy is protected</Link> - everything stays on your device.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-base font-medium text-gray-700 dark:text-slate-300">Complete Privacy</div>
                  <div className="text-sm text-gray-500 dark:text-slate-500">No data collection</div>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-base font-medium text-gray-700 dark:text-slate-300">99% Accuracy</div>
                  <div className="text-sm text-gray-500 dark:text-slate-500">Advanced speech recognition</div>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">🆓</div>
                  <div className="text-base font-medium text-gray-700 dark:text-slate-300">Free Forever</div>
                  <div className="text-sm text-gray-500 dark:text-slate-500">No subscription required</div>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-base font-medium text-gray-700 dark:text-slate-300">Works Offline</div>
                  <div className="text-sm text-gray-500 dark:text-slate-500">PWA technology</div>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">🧠</div>
                  <div className="text-base font-medium text-gray-700 dark:text-slate-300">No AI Used</div>
                  <div className="text-sm text-gray-500 dark:text-slate-500">Pure browser technology</div>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">🔄</div>
                  <div className="text-base font-medium text-gray-700 dark:text-slate-300">Multi-Device</div>
                  <div className="text-sm text-gray-500 dark:text-slate-500">Import/Export data</div>
                </div>
              </div>

              {/* Social Proof - Reddit Badge */}
              <div className="flex justify-center mb-8">
                <a 
                  href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700/50 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors group"
                  onClick={() => trackLinkClick('https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/', 'Featured on Reddit', 'hero_social_proof')}
                >
                  <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                  <span className="text-sm font-medium text-orange-900 dark:text-orange-200">
                    Featured on Reddit
                  </span>
                  <svg className="w-3 h-3 text-orange-600 dark:text-orange-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/" 
                  className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
                  onClick={() => trackHeroCTA('🚀 Try It Free Now')}
                >
                  🚀 Try It Free Now
                </Link>
                <button 
                  onClick={() => {
                    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                    enhancedAnalytics.trackEvent({
                      action: 'demo_scroll_click',
                      category: 'engagement',
                      label: 'hero_demo_button',
                      custom_parameters: { button_text: '👀 See Demo', context: 'hero' }
                    });
                  }}
                  className="btn-responsive bg-gray-200 hover:bg-gray-300 text-gray-900 transition-colors"
                >
                  👀 See Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About tickk Section */}
        <section className="bg-white dark:bg-slate-900 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700">
              {/* App Screenshot */}
              <div className="mb-8 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
                <Image
                  src="/tickk-app.webp"
                  alt="tickk app interface showing voice-first productivity features"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority
                />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-4 text-center">
                What is tickk?
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-slate-300 text-lg leading-relaxed">
                <p>
                  tickk is a revolutionary voice-first productivity application designed for ADHD minds and neurodivergent thinkers. Unlike traditional task managers that force you to categorize while capturing thoughts, tickk lets you brain dump everything through voice, then organizes it later.
                </p>
                <p>
                  Using advanced natural language processing (compromise.js), it automatically classifies your spoken words into tasks, notes, and reminders. Perfect for racing thoughts, overwhelmed parents, busy students, and professionals seeking hands-free productivity. 100% free, no login required, works completely offline with local storage for maximum privacy. Features include Focus Mode for deep work, Command Palette (⌘K) for power users, and executive function support specifically designed for ADHD brains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksSectionRef} id="how-it-works" className="bg-gray-50 dark:bg-slate-800 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">
                How tickk Works
              </h2>
              <p className="text-responsive text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                Three simple steps to transform your voice into organized productivity
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
              {/* Step 1: Speak Naturally */}
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-slate-700">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-50 rounded-lg text-xl font-bold">
                    1
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-50 mb-4">
                  Speak Naturally
                </h3>
                <p className="text-gray-600 dark:text-slate-400 mb-6 text-base sm:text-lg">
                  Click the microphone and start talking. Say anything - tasks, ideas, appointments, or notes.
                </p>
                
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
                  <div className="flex items-start space-x-2">
                    <div className="text-base sm:text-lg">🎤</div>
                    <div className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 italic flex-1">
                      &quot;I need to call John tomorrow at 3pm about the project meeting&quot;
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Smart Processing */}
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-slate-700">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-50 rounded-lg text-xl font-bold">
                    2
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-50 mb-4">
                  Smart Processing
                </h3>
                <p className="text-gray-600 dark:text-slate-400 mb-6 text-base sm:text-lg">
                  Natural language processing analyzes your speech and automatically determines if it&apos;s a task or note.
                </p>
                
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-slate-400">Processing speech...</span>
                    <div className="text-base sm:text-lg">🧠</div>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded border dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300">📋 Task</span>
                      <span className="text-green-600 dark:text-green-400 font-bold text-xs">✓ DETECTED</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                      Time references: &quot;tomorrow&quot;, &quot;3pm&quot;
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Auto-Organized */}
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-slate-700">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-50 rounded-lg text-xl font-bold">
                    3
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-50 mb-4">
                  Auto-Organized
                </h3>
                <p className="text-gray-600 dark:text-slate-400 mb-6 text-base sm:text-lg">
                  Your voice is instantly organized into the right category, ready for action.
                </p>
                
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300">Successfully Organized</span>
                    <div className="text-base sm:text-lg">✨</div>
                  </div>
                  
                  <div className="p-2 bg-white dark:bg-slate-900 rounded border dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-green-600 dark:text-green-400">✓</div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-300">Added to Tasks</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-slate-500">📋</div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                      Ready to manage and complete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section ref={useCasesSectionRef} className="py-16 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">
                Best Free Productivity App for ADHD, Students & Professionals
              </h2>
              <p className="text-responsive text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                Whether you think differently, work on-the-go, or just prefer speaking over typing
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {/* ADHD/Neurodivergent - Featured */}
              <div 
                data-use-case="adhd-neurodivergent"
                className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border-2 border-orange-500 dark:border-orange-600 relative flex flex-col h-full cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                onClick={() => {
                  adhdUseCase.trackClick();
                  identifySegment('adhd_focused', 0.9, 'clicked_adhd_use_case');
                  trackLinkClick('/', 'Try tickk Now', 'adhd_use_case');
                }}
                onMouseEnter={() => adhdUseCase.trackHover()}
              >
                <div className="absolute -top-2 -right-2 bg-orange-500 dark:bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  ⭐ Most Popular
                </div>
                <div className="text-2xl mb-4">🧠</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  ADHD & Neurodivergent Minds
                </h3>
                <p className="text-gray-700 dark:text-slate-300 text-base mb-4">
                  Finally, a productivity app that works with your brain, not against it. Capture racing thoughts instantly without getting stuck in organization paralysis.
                </p>
                <ul className="text-gray-600 dark:text-slate-400 text-base space-y-1 flex-grow">
                  <li>• No overwhelming setup or categories</li>
                  <li>• Capture hyperfocus insights instantly</li>
                  <li>• Process later when you&apos;re in &quot;organize mode&quot;</li>
                  <li>• <strong className="text-orange-600 dark:text-orange-400">Free forever</strong> - no expensive subscriptions</li>
                </ul>
              </div>

              {/* Busy Professionals */}
              <div data-use-case="busy-professionals" className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 flex flex-col h-full">
                <div className="text-2xl mb-4">💼</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Busy Professionals
                </h3>
                <p className="text-gray-700 dark:text-slate-300 text-base mb-4">
                  Capture meeting insights, action items, and brilliant shower thoughts without missing a beat.
                </p>
                <ul className="text-gray-600 dark:text-slate-400 text-base space-y-1 flex-grow">
                  <li>• Record while walking between meetings</li>
                  <li>• Voice notes during commutes</li>
                  <li>• Quick braindumps during breaks</li>
                  <li>• No typing on mobile keyboards</li>
                </ul>
              </div>

              {/* Students */}
              <div data-use-case="students-researchers" className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 flex flex-col h-full">
                <div className="text-2xl mb-4">🎓</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Students & Researchers
                </h3>
                <p className="text-gray-700 dark:text-slate-300 text-base mb-4">
                  From lecture insights to research ideas, capture knowledge without breaking your flow.
                </p>
                <ul className="text-gray-600 dark:text-slate-400 text-base space-y-1 flex-grow">
                  <li>• Quick voice notes during lectures</li>
                  <li>• Capture research insights instantly</li>
                  <li>• Study session braindumps</li>
                  <li>• Assignment idea collection</li>
                </ul>
              </div>

              {/* Accessibility */}
              <div data-use-case="accessibility-champions" className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 flex flex-col h-full">
                <div className="text-2xl mb-4">♿</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Accessibility Champions
                </h3>
                <p className="text-gray-700 dark:text-slate-300 text-base mb-4">
                  Hands-free productivity for users with mobility challenges or typing difficulties.
                </p>
                <ul className="text-gray-600 dark:text-slate-400 text-base space-y-1 flex-grow">
                  <li>• Voice-first interface design</li>
                  <li>• No complex navigation required</li>
                  <li>• Works with assistive technologies</li>
                  <li>• Inclusive by design</li>
                </ul>
              </div>

              {/* Creative Professionals */}
              <div data-use-case="creative-professionals" className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 flex flex-col h-full">
                <div className="text-2xl mb-4">🎨</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Creative Professionals
                </h3>
                <p className="text-gray-700 dark:text-slate-300 text-base mb-4">
                  Don&apos;t let brilliant ideas slip away. Capture inspiration the moment it strikes.
                </p>
                <ul className="text-gray-600 dark:text-slate-400 text-base space-y-1 flex-grow">
                  <li>• Preserve creative flow states</li>
                  <li>• Voice brainstorming sessions</li>
                  <li>• Client meeting insights</li>
                  <li>• Project idea collection</li>
                </ul>
              </div>

              {/* Parents & Multitaskers */}
              <div data-use-case="parents-multitaskers" className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 flex flex-col h-full">
                <div className="text-2xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Parents & Multitaskers
                </h3>
                <p className="text-gray-700 dark:text-slate-300 text-base mb-4">
                  Capture important thoughts while your hands are full with life&apos;s beautiful chaos.
                </p>
                <ul className="text-gray-600 dark:text-slate-400 text-base space-y-1 flex-grow">
                  <li>• Voice notes while cooking</li>
                  <li>• Parenting insight capture</li>
                  <li>• Household task management</li>
                  <li>• Quick reminders on-the-go</li>
                </ul>
              </div>
            </div>

            {/* Bottom CTA for this section */}
            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-slate-400 mb-6">
                <strong>Overwhelmed by productivity apps?</strong> Most task managers are too complex and force you to organize while capturing ideas. tickk is a simple alternative - just brain dump first, organize later. Perfect for ADHD minds and anyone who wants to stop forgetting ideas.
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center bg-gray-900 dark:bg-slate-700 hover:bg-gray-800 dark:hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                onClick={() => trackUseCaseCTA('Try tickk Now - It&apos;s Free')}
              >
                Try tickk Now - It&apos;s Free
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Voice-First Beats Text-First Section */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">
                Why Voice-First Beats Text-First Productivity
              </h2>
              <p className="text-responsive text-gray-600 dark:text-slate-400 max-w-3xl mx-auto">
                See how tickk solves problems that traditional tools can&apos;t handle
              </p>
            </div>

            {/* Problem Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Notion Card */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 relative">
                <div className="absolute -top-3 left-4 bg-gray-600 dark:bg-slate-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Problem
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-sm border border-gray-200 dark:border-slate-700">
                      <span className="text-lg font-bold text-gray-700 dark:text-slate-300">N</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-slate-50">Notion & Similar</h3>
                  </div>
                  <ul className="text-base text-gray-700 dark:text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>Text-heavy, overwhelming for quick thoughts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>Forces you to organize while capturing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>Complex setup breaks creative flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>Slow when you need to capture fast</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Obsidian Card */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 relative">
                <div className="absolute -top-3 left-4 bg-gray-600 dark:bg-slate-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Problem
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-sm border border-gray-200 dark:border-slate-700">
                      <span className="text-lg font-bold text-gray-700 dark:text-slate-300">O</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-slate-50">Obsidian & PKM Tools</h3>
                  </div>
                  <ul className="text-base text-gray-700 dark:text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>Steep learning curve, not intuitive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>No voice input, purely text-based</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>Over-engineered for simple tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>Requires technical knowledge to setup</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Apple Notes Card */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 relative">
                <div className="absolute -top-3 left-4 bg-gray-600 dark:bg-slate-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Problem
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-sm border border-gray-200 dark:border-slate-700">
                      <span className="text-lg font-bold text-gray-700 dark:text-slate-300">📝</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-slate-50">Apple Notes & Simple Apps</h3>
                  </div>
                  <ul className="text-base text-gray-700 dark:text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>No smart organization or categorization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>Just dumps everything in one place</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>No distinction between tasks and notes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 dark:text-slate-500 mt-0.5">✗</span>
                      <span>Becomes a messy list over time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* tickk Solution */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-gray-300 dark:border-slate-600 relative mb-12 shadow-sm">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-slate-700 text-white text-sm px-4 py-2 rounded-full font-medium">
                ✨ tickk Solution
              </div>
              <div className="text-center mt-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-4">
                  Voice-First Changes Everything
                </h3>
                <p className="text-lg text-gray-700 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
                  An app designed for how your brain actually works. Capture first, organize later.
                </p>
                
                {/* Feature Comparison Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎤</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-slate-50 mb-2">Voice-First Input</h4>
                    <p className="text-base text-gray-600 dark:text-slate-400">Natural speech, no typing required</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-slate-50 mb-2">Instant Categorization</h4>
                    <p className="text-base text-gray-600 dark:text-slate-400">AI-free NLP sorts tasks from notes automatically</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-slate-50 mb-2">Complete Privacy</h4>
                    <p className="text-base text-gray-600 dark:text-slate-400">Everything stays in your browser, nothing uploaded</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-slate-50 mb-2">Zero Setup</h4>
                    <p className="text-base text-gray-600 dark:text-slate-400">Works instantly, no accounts or configuration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Comparison Table */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-50 dark:bg-slate-800 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50">Feature Comparison</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Feature</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">tickk</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Notion</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Obsidian</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Apple Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-50">Voice Input</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 dark:text-slate-500 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 dark:text-slate-500 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600 dark:text-slate-400 text-lg">📱</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-slate-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-50">Auto Categorization</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 dark:text-slate-500 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 dark:text-slate-500 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 dark:text-slate-500 text-lg">✗</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-50">Privacy (No Upload)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 dark:text-slate-500 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600 dark:text-slate-400 text-lg">⚠️</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-slate-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-50">Zero Setup</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 dark:text-slate-500 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 dark:text-slate-500 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-50">Works Offline</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 dark:text-slate-500 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-slate-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-50">Free Forever</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600 dark:text-slate-400 text-lg">💰</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 dark:text-slate-50 text-lg font-semibold">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
                Ready to Experience Voice-First Productivity?
              </h3>
              <p className="text-gray-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                Stop fighting with complex tools. Start with the simplest, most natural way to capture your thoughts.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
                onClick={() => trackComparisonCTA('Try tickk Now - It\'s Free')}
              >
                Try tickk Now - It&apos;s Free
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section ref={demoSectionRef} id="demo" className="relative py-20 bg-gray-50 dark:bg-slate-800">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid-gray-100 opacity-30"></div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-4">
                See Voice Recognition in Action
              </h2>
              <p className="text-xl text-gray-600 dark:text-slate-400 max-w-3xl mx-auto">
                Watch how natural language processing instantly categorizes your speech into tasks and notes
              </p>
            </div>

            {/* Demo Interface */}
            <div className="max-w-4xl mx-auto px-4 sm:px-0">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-xl">
                {/* Demo Header */}
                <div className="bg-white dark:bg-slate-900 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-slate-50">Live Classification Demo</h3>
                    <button 
                      onClick={playDemo}
                      disabled={isPlaying}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-colors font-medium ${
                        isPlaying 
                          ? 'bg-gray-400 text-white cursor-not-allowed' 
                          : 'bg-gray-900 hover:bg-black text-white'
                      }`}
                    >
                      {isPlaying ? '⏳ Playing...' : '▶ Play Demo'}
                    </button>
                  </div>
                </div>

                {/* Demo Content */}
                <div className="p-4 sm:p-8">
                  <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                    {/* Input Side */}
                    <div className="order-2 lg:order-1">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-3">Voice Input</h4>
                      <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 min-h-[100px] sm:min-h-[120px] flex items-center">
                        <div className="text-gray-900 dark:text-slate-50 font-mono text-sm sm:text-lg w-full">
                          {demoText ? (
                            <span>&quot;{demoText}&quot;</span>
                          ) : (
                            <span className="text-gray-400 dark:text-slate-500 italic text-sm">
                              Click &quot;Play Demo&quot; to see classification in action...
                            </span>
                          )}
                          {isPlaying && !demoCategory && (
                            <span className="animate-pulse">|</span>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 text-xs sm:text-sm text-orange-600 dark:text-orange-400">
                        <span className="mr-2">🧠</span>
                        <span>
                          {isPlaying && demoText && !demoCategory 
                            ? 'Analyzing keywords and patterns...' 
                            : 'NLP analyzes grammar, verbs, and temporal references'
                          }
                        </span>
                      </div>
                    </div>

                    {/* Output Side */}
                    <div className="order-1 lg:order-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-3">Smart Classification</h4>
                      <div className="space-y-3">
                        <div className={`bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-3 rounded-r-lg transition-all duration-500 ${
                          demoCategory === 'tasks' ? 'opacity-100 ring-2 ring-blue-400' : 'opacity-50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-blue-500">📋</span>
                            <span className="font-medium text-blue-700 dark:text-blue-300">Tasks</span>
                            {demoCategory === 'tasks' && (
                              <span className="text-blue-600 dark:text-blue-400 text-xs ml-auto animate-pulse">✓ SELECTED</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 ">Action items to complete</div>
                          {demoCategory === 'tasks' && (
                            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
                              Action words detected: &quot;need to&quot;, &quot;remember&quot;, &quot;don&apos;t forget&quot;
                            </div>
                          )}
                        </div>
                        
                        <div className={`bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-3 rounded-r-lg transition-all duration-500 ${
                          demoCategory === 'notes' ? 'opacity-100 ring-2 ring-green-400' : 'opacity-50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-green-500">📝</span>
                            <span className="font-medium text-green-700 dark:text-green-300">Notes</span>
                            {demoCategory === 'notes' && (
                              <span className="text-green-600 dark:text-green-400 text-xs ml-auto animate-pulse">✓ SELECTED</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 ">Ideas and information</div>
                          {demoCategory === 'notes' && (
                            <div className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                              Informational content detected
                            </div>
                          )}
                        </div>
                        

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section ref={blogSectionRef} className="py-16 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-4">
              Learn More About Voice Productivity
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Discover the science behind braindump-first productivity and why your best ideas die in traditional apps.
            </p>
            
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-8 max-w-2xl mx-auto border border-gray-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-50 mb-3">
                Latest Article: Why Your Best Ideas Die in Your Productivity App
              </h3>
              <p className="text-gray-700 dark:text-slate-300 mb-6">
                Learn the braindump-first method that separates capture from organization, and why voice changes everything.
              </p>
              <Link href="/blog/braindump-first-organize-later-productivity" className="inline-flex items-center bg-gray-900 dark:bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors">
                Read the Article
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section - ChatGPT Recommended SEO Magnet */}
        <section ref={faqSectionRef} className="py-16 bg-gray-50 dark:bg-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-responsive text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                Everything you need to know about tickk&apos;s voice-first productivity approach
              </p>
            </div>

            <div className="space-y-6">
              {/* FAQ 1 - ADHD Focus */}
              <div data-faq="adhd-free-app" className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Is tickk a free productivity app for ADHD?
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  Yes! tickk is completely free forever and specifically designed for ADHD and neurodivergent minds. Unlike expensive ADHD productivity apps that cost $10-20/month, tickk removes the &quot;organize while capturing&quot; friction that overwhelms ADHD brains. Just brain dump your racing thoughts instantly, then organize later when you&apos;re in the right headspace.
                </p>
              </div>

              {/* FAQ 2 - Hyperfocus & Racing Thoughts */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  How does tickk help with hyperfocus and racing thoughts?
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  tickk captures your thoughts instantly without breaking your flow state. During hyperfocus sessions, just hit record and keep working - no need to stop and categorize. For racing thoughts, our voice-first approach lets you dump everything out of your head in seconds, then our smart categorization organizes it automatically. Perfect for ADHD brains that think faster than they can type.
                </p>
              </div>

              {/* FAQ 3 - vs Notion/TickTick */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  What makes tickk different from task managers like Notion or TickTick?
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  Traditional task managers force you to organize while capturing ideas, which kills creativity and overwhelms ADHD minds. tickk flips this: <strong>capture first, organize later</strong>. No complex setup, no overwhelming categories, no subscription fees. Just voice-to-text brain dumping that works with how your mind actually thinks. It&apos;s the simple alternative to complex task managers.
                </p>
              </div>

              {/* FAQ 4 - Students */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Can students use tickk for lectures and assignments?
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  Absolutely! tickk is perfect for college students, especially those with ADHD. Capture lecture insights instantly without missing what the professor says next. Voice-record study session thoughts, assignment ideas, and research notes. Later, organize everything into actionable tasks and reference notes. It&apos;s the best free brain dump app for students who need to capture ideas quickly during fast-paced academic environments.
                </p>
              </div>

              {/* FAQ 5 - Accessibility */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Is tickk accessible for mobility or typing challenges?
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  Yes! tickk is a hands-free productivity app designed with accessibility in mind. Our voice-first interface works perfectly for users with mobility challenges, typing difficulties, or conditions like arthritis. No complex navigation required - just speak your thoughts and let our accessible voice technology handle the rest. It&apos;s inclusive productivity that works for everyone.
                </p>
              </div>

              {/* FAQ 6 - Additional FAQ for more keywords */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  What&apos;s the best way to use tickk for busy professionals and parents?
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  tickk excels for multitaskers who need hands-free productivity. Capture meeting action items while walking between offices, record ideas during commutes, or voice-note reminders while cooking dinner. Parents love using tickk to organize household tasks and capture parenting insights when their hands are full. It&apos;s the perfect productivity app for busy people who can&apos;t always stop to type.
                </p>
              </div>

              {/* FAQ 7 - Privacy Protection */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  How is my privacy protected?
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  Privacy is our top priority. All voice processing happens locally in your browser using the Web Speech API. We don&apos;t use AI servers, don&apos;t collect voice recordings, and don&apos;t track your tasks or notes. Everything is stored on your device using IndexedDB. We don&apos;t even use cookies except for essential functionality. You can review our open-source code on GitHub to verify these claims.
                </p>
              </div>

              {/* FAQ 8 - Offline Functionality */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Does tickk work offline?
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  Yes! tickk is a Progressive Web App (PWA) that works completely offline once loaded. You can capture voice notes, organize tasks, and access all features without an internet connection. Your data is stored locally on your device, so you never lose access to your productivity tools.
                </p>
              </div>

              {/* FAQ 9 - No AI Explanation */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Does tickk use AI or ChatGPT?
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  No. tickk uses compromise.js, a deterministic natural language processing library that runs entirely in your browser. There&apos;s no AI, no machine learning models, no cloud processing, and no data sent to third-party AI services. This ensures your privacy and makes the app work offline.
                </p>
              </div>

              {/* FAQ 10 - Account & Signup */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                  Do I need to create an account?
                </h3>
                <p className="text-gray-700 dark:text-slate-300">
                  No signup required. tickk works instantly in your browser without any account creation. Your data is stored locally on your device using browser storage, which means you have complete control and privacy. No emails, no passwords, no personal information needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section ref={finalCtaSectionRef} className="relative py-20 bg-gray-50 dark:bg-slate-800">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid-gray-100 opacity-20"></div>
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-4">
              Ready to Transform Your Voice into Productivity?
            </h2>
            <p className="text-responsive text-gray-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals using tickk to boost productivity. No downloads, no accounts, no limits. Need help getting started? Check our <Link href="/support" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline">support center</Link>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
              <Link 
                href="/" 
                className="w-full sm:w-auto text-center inline-flex items-center justify-center px-6 sm:px-8 py-4 bg-gray-900 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-black dark:hover:bg-slate-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => trackFinalCTA('Start Using tickk Free')}
              >
                Start Using tickk Free
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
              <button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto text-center inline-flex items-center justify-center px-6 sm:px-8 py-4 bg-gray-900 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-black dark:hover:bg-slate-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                See Demo First
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>No Account Required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Complete Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </section>


      </Layout>
    </>
  )
}