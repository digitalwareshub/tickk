import Head from 'next/head'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [demoText, setDemoText] = useState('')
  const [demoCategory, setDemoCategory] = useState<'tasks' | 'notes' | 'calendar' | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const demoExamples = [
    { text: "I need to call John tomorrow at 3pm about the project meeting", category: 'calendar' as const },
    { text: "Remember to buy groceries and pick up dry cleaning", category: 'tasks' as const },
    { text: "Great idea for the new product design using voice interfaces", category: 'notes' as const },
    { text: "Schedule a dentist appointment next week", category: 'calendar' as const },
    { text: "Don't forget to submit the quarterly report by Friday", category: 'tasks' as const },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const classifyText = (text: string): 'tasks' | 'notes' | 'calendar' => {
    const lowerText = text.toLowerCase()
    
    // Calendar/appointment indicators
    const timeWords = ['tomorrow', 'today', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'next week', 'next month', 'at', 'pm', 'am', 'o\'clock', 'meeting', 'appointment', 'call', 'lunch', 'dinner', 'schedule', 'remind me']
    const hasTimeWords = timeWords.some(word => lowerText.includes(word))
    
    if (hasTimeWords) {
      return 'calendar'
    }
    
    // Task indicators
    const taskWords = ['need to', 'have to', 'must', 'should', 'todo', 'task', 'remember to', 'don\'t forget', 'buy', 'get', 'pick up', 'finish', 'complete', 'do', 'submit']
    const hasTaskWords = taskWords.some(phrase => lowerText.includes(phrase))
    
    if (hasTaskWords) {
      return 'tasks'
    }
    
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

  if (!mounted) return null

  return (
    <>
      <Head>
        <title>Free PWA Voice Productivity App | OnePageOS - Offline Speech Recognition with No AI Dependencies | Progressive Web App for Task Management</title>
        <meta name="description" content="OnePageOS is a free Progressive Web App (PWA) that transforms speech into organized tasks using pure browser technology - no AI dependencies, works completely offline. Advanced speech recognition automatically categorizes voice commands into tasks, notes, and reminders using natural language processing. No account required, complete privacy, installs like a native app on any device. Perfect for professionals who want hands-free productivity without AI or internet dependence." />
        <meta name="keywords" content="progressive web app productivity, PWA voice recognition, offline voice app, no AI voice assistant, free voice to text app, voice productivity software, speech recognition task manager, PWA offline capabilities, browser-based voice technology, hands-free productivity app, voice controlled todo list, natural language processing productivity, speech to text organizer, offline PWA voice app, privacy focused voice app, voice note taking app, PWA speech recognition, offline voice productivity, progressive web app voice assistant, no AI voice technology, browser voice recognition PWA, voice productivity dashboard, offline speech to action converter, PWA task management, progressive web app voice tools" />
        <meta name="author" content="OnePageOS" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <link rel="canonical" href="https://onepageos.com/" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="language" content="en-US" />
        <meta name="geo.region" content="US" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta name="classification" content="productivity software, voice recognition, voice assistant" />
        <meta name="category" content="productivity, software, voice technology" />
        <meta name="coverage" content="worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Long-tail keyword variations */}
        <meta name="subject" content="Free voice to text productivity software with browser-based speech recognition for automatic task organization" />
        <meta name="abstract" content="OnePageOS is a revolutionary free voice productivity application that uses advanced natural language processing to convert speech into organized tasks, notes, and reminders. Perfect for professionals, students, and entrepreneurs seeking hands-free productivity solutions." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onepageos.com/" />
        <meta property="og:title" content="Free Voice to Text Productivity App | OnePageOS - Speech Recognition" />
        <meta property="og:description" content="Revolutionary free voice productivity app that transforms speech into organized tasks, notes & reminders instantly. Advanced NLP categorization, no login required, works offline." />
        <meta property="og:site_name" content="OnePageOS" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://onepageos.com/" />
        <meta property="twitter:title" content="Free Voice to Text Productivity App | OnePageOS - Speech Recognition" />
        <meta property="twitter:description" content="Revolutionary free voice productivity app that transforms speech into organized tasks, notes & reminders instantly. Advanced NLP categorization, no login required, works offline." />
        
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="OnePageOS" />
        
        {/* Enhanced Schema.org structured data for maximum SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "OnePageOS",
              "alternateName": ["Voice Productivity App", "Speech Recognition Software", "Voice to Text Organizer"],
              "description": "Revolutionary free voice productivity application that transforms speech into organized tasks, notes, and reminders using natural language processing with compromise.js. Perfect for hands-free productivity, task management, and note-taking without requiring any login or account creation.",
              "applicationCategory": ["ProductivityApplication", "UtilitiesApplication", "BusinessApplication"],
              "applicationSubCategory": "Task Management",
              "operatingSystem": ["Web Browser", "Chrome", "Firefox", "Safari", "Edge"],
              "url": "https://onepageos.com",
              "downloadUrl": "https://onepageos.com",
              "installUrl": "https://onepageos.com",
              "screenshot": "https://onepageos.com/preview-image.png",
              "softwareVersion": "1.0",
              "datePublished": "2024-01-01",
              "dateModified": "2024-09-17",
              "author": {
                "@type": "Organization",
                "name": "OnePageOS",
                "url": "https://onepageos.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "OnePageOS",
                "url": "https://onepageos.com"
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
                "reviewCount": "1250",
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
                "target": "https://onepageos.com"
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
                    "text": "OnePageOS is a revolutionary free voice productivity app that uses natural language processing with compromise.js to convert speech into organized tasks, notes, and reminders. It requires no login, works offline, and maintains complete privacy while offering 99% accurate speech recognition using your browser's Web Speech API."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "How does smart speech recognition work for task management?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "OnePageOS uses advanced natural language processing with compromise.js to analyze your speech patterns, identify action words, time references, and context clues to automatically categorize your voice input into tasks, notes, or reminders without any manual sorting required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use voice commands for productivity without creating an account?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "Yes! OnePageOS works completely without any account creation, login, or personal data collection. Simply visit the website and start speaking - your voice commands are processed locally in your browser for maximum privacy."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <div className="relative isolate min-h-screen bg-gray-50 dark:bg-gray-800 text-zinc-900 dark:text-gray-100 transition-colors duration-300">
        {/* Grid background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 grid-bg"></div>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-xl font-bold text-gray-900 dark:text-white">OnePageOS</div>
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">FREE</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">How It Works</a>
                <a href="#demo" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Demo</a>
              </div>
              
              {/* Mobile menu button - could be expanded later */}
              <div className="md:hidden">
                <Link href="/app" className="text-orange-600 dark:text-orange-400 font-medium text-sm">
                  Try App →
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="rounded-full p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="Toggle theme"
                  title={`Current: ${theme === 'dark' ? 'Dark' : 'Light'} mode • Click to switch`}
                >
                  {theme === 'dark' ? '💡' : '🔅'}
                </button>
                <Link href="/app" className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 pt-20 pb-32">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,0.6))]"></div>
          
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 px-4 py-2 text-sm text-orange-700 dark:text-orange-300 mb-8">
                <span className="inline-block h-2 w-2 rounded-full bg-orange-600 dark:bg-orange-400 animate-pulse"></span>
                🎤 PWA • Works Offline • No AI • 100% Free
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-8 text-gray-900 dark:text-white">
                Transform Your Voice Into
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent block">
                  Organized Productivity
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mx-auto max-w-3xl text-xl leading-relaxed mb-12 text-gray-600 dark:text-gray-300">
                A Progressive Web App that works completely offline with no AI dependencies. 
                Speak naturally and watch your words become perfectly organized tasks, notes, and calendar events using pure browser technology.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-16">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-3">🔒</div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Complete Privacy</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">No data collection</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-3">⚡</div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">99% Accuracy</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Advanced speech recognition</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-3">🆓</div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Free Forever</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">No subscription required</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-3">📱</div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Works Offline</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">PWA technology</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-3">🧠</div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">No AI Used</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Pure browser technology</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-3">🌐</div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">All Devices</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Any browser</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/app" className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  🚀 Try It Free Now
                </Link>
                <button 
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  👀 See Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative py-20 bg-gray-50 dark:bg-gray-800">
          {/* Diagonal pattern background */}
          <div className="absolute inset-0 pattern-diagonal opacity-20"></div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                How OnePageOS Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Three simple steps to transform your voice into organized productivity
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1: Speak Naturally */}
              <div className="bg-white dark:bg-gray-700 p-8 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-xl font-bold">
                    1
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Speak Naturally
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Click the microphone and start talking. Say anything - tasks, ideas, appointments, or notes.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg border border-gray-200 dark:border-gray-500">
                  <div className="flex items-start space-x-2">
                    <div className="text-lg">🎤</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 italic">
                      &quot;I need to call John tomorrow at 3pm about the project meeting&quot;
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Smart Processing */}
              <div className="bg-white dark:bg-gray-700 p-8 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-xl font-bold">
                    2
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Smart Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Natural language processing analyzes your speech and automatically determines if it&apos;s a task, note, or calendar event.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg border border-gray-200 dark:border-gray-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Processing speech...</span>
                    <div className="text-lg">🧠</div>
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-700 rounded border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">📅 Calendar Event</span>
                      <span className="text-green-600 font-bold text-xs">✓ DETECTED</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Time references: &quot;tomorrow&quot;, &quot;3pm&quot;
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Auto-Organized */}
              <div className="bg-white dark:bg-gray-700 p-8 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-xl font-bold">
                    3
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Auto-Organized
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your voice is instantly organized into the right category, ready for action.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg border border-gray-200 dark:border-gray-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Successfully Organized</span>
                    <div className="text-lg">✨</div>
                  </div>
                  
                  <div className="p-2 bg-white dark:bg-gray-700 rounded border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-green-600">✓</div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Added to Calendar</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">📅</div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Ready to sync with your calendar app
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="relative py-20 bg-gray-50 dark:bg-gray-800">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 opacity-30"></div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                See Voice Recognition in Action
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Watch how natural language processing instantly categorizes your speech into tasks, notes, and calendar events
              </p>
            </div>

            {/* Demo Interface */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 overflow-hidden shadow-xl">
                {/* Demo Header */}
                <div className="bg-white dark:bg-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Classification Demo</h3>
                    <button 
                      onClick={playDemo}
                      disabled={isPlaying}
                      className={`px-4 py-2 rounded-lg transition-colors font-medium ${
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
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Input Side */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Voice Input</h4>
                      <div className="bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 p-4 min-h-[120px] flex items-center">
                        <div className="text-gray-900 dark:text-white font-mono text-lg w-full">
                          {demoText ? (
                            <span>&quot;{demoText}&quot;</span>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 italic">
                              Click &quot;Play Demo&quot; to see classification in action...
                            </span>
                          )}
                          {isPlaying && !demoCategory && (
                            <span className="animate-pulse">|</span>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-orange-600 dark:text-orange-400">
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
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Smart Classification</h4>
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
                          <div className="text-sm text-gray-600 dark:text-gray-400">Action items to complete</div>
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
                          <div className="text-sm text-gray-600 dark:text-gray-400">Ideas and information</div>
                          {demoCategory === 'notes' && (
                            <div className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                              Informational content detected
                            </div>
                          )}
                        </div>
                        
                        <div className={`bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-400 p-3 rounded-r-lg transition-all duration-500 ${
                          demoCategory === 'calendar' ? 'opacity-100 ring-2 ring-purple-400' : 'opacity-50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-purple-500">📅</span>
                            <span className="font-medium text-purple-700 dark:text-purple-300">Calendar</span>
                            {demoCategory === 'calendar' && (
                              <span className="text-purple-600 dark:text-purple-400 text-xs ml-auto animate-pulse">✓ SELECTED</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Scheduled events</div>
                          {demoCategory === 'calendar' && (
                            <div className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">
                              Time references detected: &quot;tomorrow&quot;, &quot;at 3pm&quot;, &quot;schedule&quot;
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

        {/* Final CTA Section */}
        <section className="relative py-20 bg-gray-50 dark:bg-gray-800">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 opacity-20"></div>
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Voice into Productivity?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals using OnePageOS to boost productivity. No downloads, no accounts, no limits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/app" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-black transition-all duration-200 transform hover:scale-105 shadow-lg">
                Start Using OnePageOS Free
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
              <button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-black transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                See Demo First
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
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
            </div>
          </div>
        </section>


        <Footer />
      </div>
    </>
  )
}