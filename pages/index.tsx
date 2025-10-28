/**
 * Main App - Clean, Minimal Design Like Notion/Cal.com
 * Direct braindump-first experience without flashy graphics
 */

import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { DataMigrator } from '@/lib/migration/migrator'
import { StorageService } from '@/lib/storage/storage-service'
import { enhancedAnalytics, trackPageView } from '@/lib/analytics/enhanced-analytics'
import type { AppData, UserPreferences, VoiceItem } from '@/types/braindump'

import BraindumpInterface from '@/components/BraindumpInterface'
import OrganizedView from '@/components/OrganizedView'
import FocusView from '@/components/FocusView'
import MicroLanding from '@/components/MicroLanding'
import KeyboardHelpModal from '@/components/KeyboardHelpModal'
import KeyboardHint from '@/components/KeyboardHint'
import LiveRegions from '@/components/LiveRegions'
import CommandPalette, { type Command } from '@/components/CommandPalette'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

type AppMode = 'braindump' | 'organized' | 'focus'

export default function App() {
  // Core state
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<AppMode>('braindump')
  const [appData, setAppData] = useState<AppData | null>(null)
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  
  // Loading and migration states
  const [isLoading, setIsLoading] = useState(true)
  const [needsMigration, setNeedsMigration] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false) // Show only for new users
  const [modalLanguage, setModalLanguage] = useState<'en' | 'es'>('en') // Language for onboarding modal
  const [rememberChoice, setRememberChoice] = useState(false) // Checkbox for "don't show again"
  
  // Smart context state
  const [hasEverRecorded, setHasEverRecorded] = useState(false)
  const [totalItemCount, setTotalItemCount] = useState(0)
  
  // UI state
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [recordingError, setRecordingError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const [recordingControls, setRecordingControls] = useState<{
    startRecording: () => void
    stopRecording: () => void
    canProcess: boolean
    processItems: () => void
  } | null>(null)
  
  // Services
  const [storageService] = useState(() => StorageService.getInstance())
  const [migrator] = useState(() => DataMigrator.getInstance())
  // const [announcer] = useState(() => AccessibilityAnnouncer.getInstance())

  // Modal content in both languages
  const modalContent = {
    en: {
      title: "Speak. Save. Sort it later.",
      subtitle: "Voice-first brain dump → auto-organized into tasks & notes. Free, open-source, local storage.",
      demoTitle: "See it in action:",
      youSay: "You say:",
      weOrganize: "We organize:",
      exampleText: "I need to call mom tomorrow and don't forget to buy groceries",
      task1: "Call mom tomorrow",
      task2: "Buy groceries",
      tagTask: "task",
      trustPrivate: "100% Private",
      trustPrivateDesc: "Local processing",
      trustNoSignup: "No Sign-up",
      trustNoSignupDesc: "Start instantly",
      trustOffline: "Works Offline",
      trustOfflineDesc: "Your device only",
      trustSmart: "Smart NLP",
      trustSmartDesc: "Auto-organize",
      howItWorks: "How it works:",
      step1: "Speak your thoughts naturally",
      step2: "Review organized tasks & notes", 
      step3: "Get productive immediately",
      startRecording: "🎤 Start Recording",
      tryDemo: "👁️ Try Demo First",
      skipIntro: "Skip intro",
      rememberChoice: "Remember my choice and don't ask again"
    },
    es: {
      title: "Habla. Guarda. Ordénalo después.",
      subtitle: "Volcado mental por voz → auto-organizado en tareas y notas. Gratis, código abierto, almacenamiento local.",
      demoTitle: "Míralo en acción:",
      youSay: "Tú dices:",
      weOrganize: "Nosotros organizamos:",
      exampleText: "Necesito llamar a mamá mañana y no olvidar comprar víveres",
      task1: "Llamar a mamá mañana",
      task2: "Comprar víveres",
      tagTask: "tarea",
      trustPrivate: "100% Privado",
      trustPrivateDesc: "Procesamiento local",
      trustNoSignup: "Sin Registro",
      trustNoSignupDesc: "Comienza al instante",
      trustOffline: "Funciona Sin Conexión",
      trustOfflineDesc: "Solo tu dispositivo",
      trustSmart: "IA Inteligente",
      trustSmartDesc: "Auto-organiza",
      howItWorks: "Cómo funciona:",
      step1: "Habla tus pensamientos de forma natural",
      step2: "Revisa tareas y notas organizadas",
      step3: "Sé productivo inmediatamente",
      startRecording: "🎤 Comenzar a Grabar",
      tryDemo: "👁️ Probar Demo Primero",
      skipIntro: "Saltar introducción",
      rememberChoice: "Recordar mi elección y no preguntar de nuevo"
    }
  }

  const content = modalContent[modalLanguage]
  
  /**
   * Auto-redirect to user's preferred language (must happen first)
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for reset parameter (for testing)
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('reset') === 'true') {
        localStorage.removeItem('tickk_hide_language_modal')
        localStorage.removeItem('tickk_language')
        localStorage.removeItem('tickk_has_used')
        // Remove the parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }
      
      const savedLanguage = localStorage.getItem('tickk_language')
      
      // If user prefers Spanish, redirect immediately
      if (savedLanguage === 'es') {
        window.location.replace('/es')
        return
      }
    }
  }, [])

  /**
   * Initialize app on mount
   */
  useEffect(() => {
    const initializeApp = async () => {
      setMounted(true)
      
      // Check for early redirect - if we're still here, proceed with initialization
      const savedLanguage = localStorage.getItem('tickk_language')
      
      // If user should be redirected, don't initialize the app
      if (savedLanguage === 'es') {
        return
      }
      
      // Update modal language to match saved preference (for English users)
      if (savedLanguage === 'es') {
        setModalLanguage('es')
      }
      
      // Track page view
      trackPageView('main_app')
      
      try {
        await storageService.init()
        
        const migrationNeeded = await migrator.needsMigration()
        setNeedsMigration(migrationNeeded)
        
        if (migrationNeeded) {
          const migrationResult = await migrator.migrate()
          if (!migrationResult.success) {
            console.error('Migration failed:', migrationResult.errors)
          }
        }
        
        const data = await storageService.getAllData()
        
        if (data) {
          setAppData(data)
          setPreferences(data.preferences || null)
          
          // Track engagement for smart context
          const totalItems = data.braindump.length + data.tasks.length + data.notes.length
          setTotalItemCount(totalItems)
          setHasEverRecorded(totalItems > 0)
          
          // Always default to braindump for better UX
          setMode('braindump')
          
          // Show onboarding modal unless user explicitly chose to hide it
          const hideModal = localStorage.getItem('tickk_hide_language_modal') === 'true'
          const onboardingPref = data.preferences?.showOnboarding !== false
          
          // Show modal if user hasn't explicitly chosen to hide it
          if (!hideModal && onboardingPref && !migrationNeeded) {
            setShowOnboarding(true)
          }
        } else {
          const freshData: AppData = {
            tasks: [],
            notes: [],
            braindump: [],
            sessions: [],
            version: '2.0.0',
            preferences: {
              defaultMode: 'braindump',
              showOnboarding: true,
              enableKeyboardShortcuts: true,
              recordingTimeout: 30000,
              enableContinuousRecording: false,
              confidenceThreshold: 0.7,
              enableManualReview: true,
              enableScreenReader: false,
              highContrast: false,
              reducedMotion: false
            }
          }
          
          await storageService.saveAllData(freshData)
          setAppData(freshData)
          setPreferences(freshData.preferences!)
          setMode('braindump')
          
          // Show onboarding modal unless user explicitly chose to hide it
          const hideModal = localStorage.getItem('tickk_hide_language_modal') === 'true'
          if (!hideModal) {
            setShowOnboarding(true)
          }
        }
        
      } catch (error) {
        console.error('App initialization failed:', error)
        const fallbackData: AppData = {
          tasks: [],
          notes: [],
          braindump: [],
          sessions: [],
          version: '2.0.0'
        }
        setAppData(fallbackData)
        setMode('braindump')
      } finally {
        setIsLoading(false)
      }
    }
    
    initializeApp()
  }, [storageService, migrator])

  /**
   * Handle onboarding completion with language preference
   */
  const handleOnboardingComplete = useCallback(async () => {
    setShowOnboarding(false)
    
    // Save language preference
    localStorage.setItem('tickk_language', modalLanguage)
    
    // Only hide modal permanently if user checked the "remember" checkbox
    if (rememberChoice) {
      localStorage.setItem('tickk_hide_language_modal', 'true')
    }
    
    // Mark user as having used the app
    localStorage.setItem('tickk_has_used', 'true')
    
    // Force localStorage to be written immediately
    try {
      // Ensure localStorage is written before redirect
      await new Promise(resolve => setTimeout(resolve, 10))
    } catch {
      // Continue regardless
    }
    
    // If Spanish was selected, redirect to Spanish version
    if (modalLanguage === 'es') {
      // Use location.replace to ensure redirect happens
      window.location.replace('/es')
      return // Don't continue with the rest if redirecting
    }
    
    if (preferences) {
      const updatedPreferences = { ...preferences, showOnboarding: false }
      setPreferences(updatedPreferences)
      await storageService.savePreferences(updatedPreferences)
    }
    
    // Track successful onboarding completion with language selection
    enhancedAnalytics.trackEvent({
      action: 'onboarding_completed',
      category: 'user_journey',
      label: `language_${modalLanguage}`,
      custom_parameters: {
        language_selected: modalLanguage,
        modal_version: 'enhanced_with_language_selection',
        items_count: (appData?.braindump.length || 0) + (appData?.tasks.length || 0) + (appData?.notes.length || 0)
      }
    })
  }, [modalLanguage, rememberChoice, preferences, storageService, appData?.braindump.length, appData?.notes.length, appData?.tasks.length])

  /**
   * Handle modal keyboard accessibility (ESC to close)
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showOnboarding) {
        handleOnboardingComplete()
      }
    }

    if (showOnboarding) {
      document.addEventListener('keydown', handleKeyDown)
      // Focus management - focus the modal when it opens
      const modal = document.querySelector('[role="dialog"]')
      if (modal) {
        ;(modal as HTMLElement).focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showOnboarding, handleOnboardingComplete])
  
  /**
   * Handle mode switching
   */
  const handleModeSwitch = async (newMode: AppMode) => {
    setMode(newMode)
    
    if (preferences) {
      const updatedPreferences = { ...preferences, defaultMode: newMode }
      setPreferences(updatedPreferences)
      await storageService.savePreferences(updatedPreferences)
    }
    
    // Track mode switch
    enhancedAnalytics.trackEvent({
      action: 'mode_switch',
      category: 'navigation',
      label: newMode,
      custom_parameters: {
        previous_mode: mode,
        switch_trigger: 'user_action'
      }
    })
  }
  
  /**
   * Handle data updates from child components
   */
  const handleDataUpdate = async (updatedData: AppData) => {
    const previousUnprocessedCount = appData?.braindump.filter(item => !item.processed).length || 0
    const newUnprocessedCount = updatedData.braindump.filter(item => !item.processed).length || 0
    
    setAppData(updatedData)
    await storageService.saveAllData(updatedData)
    
    // Track user engagement for smart context
    const totalItems = updatedData.braindump.length + updatedData.tasks.length + updatedData.notes.length
    setTotalItemCount(totalItems)
    
    // Mark as having recorded if any items exist
    if (totalItems > 0 && !hasEverRecorded) {
      setHasEverRecorded(true)
      localStorage.setItem('tickk_has_used', 'true')
    }
    
    // Auto-switch to braindump mode if new unprocessed items were added and we're not already there
    if (newUnprocessedCount > previousUnprocessedCount && mode === 'organized') {
      setMode('braindump')
    }
  }
  
  /**
   * Handle recording state changes from BraindumpInterface
   */
  const handleRecordingStateChange = useCallback((recording: boolean) => {
    setIsRecording(recording)
  }, [])
  
  /**
   * Handle recording status updates from BraindumpInterface
   */
  const handleRecordingStatusUpdate = useCallback((status: {
    transcript?: string
    error?: string | null
    isSupported?: boolean
  }) => {
    if (status.transcript !== undefined) setCurrentTranscript(status.transcript)
    if (status.error !== undefined) setRecordingError(status.error)
    if (status.isSupported !== undefined) setIsSupported(status.isSupported)
  }, [])
  
  /**
   * Handle example prompt clicks
   */
  const handleExampleClick = async (text: string) => {
    if (!appData) return
    
    // Create a sample item for demonstration
    const newItem: VoiceItem = {
      id: `example-${Date.now()}`,
      text,
      timestamp: new Date().toISOString(),
      category: 'braindump',
      sessionId: `session-${Date.now()}`,
      processed: false
    }
    
    const updatedData = {
      ...appData,
      braindump: [...appData.braindump, newItem]
    }
    
    await handleDataUpdate(updatedData)
    // Track example click
    enhancedAnalytics.trackEvent({
      action: 'example_clicked',
      category: 'engagement',
      label: text,
      custom_parameters: {
        example_text: text,
        source: 'main_app'
      }
    })
  }

  /**
   * Split text into separate sentences for better classification
   */
  const splitIntoSentences = (text: string): string[] => {
    let sentences: string[] = []
    
    // First, try splitting on sentence boundaries (periods, exclamation, question marks)
    sentences = text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
    
    // If we got multiple sentences from punctuation, return them
    if (sentences.length > 1) {
      return sentences
    }
    
    // No sentence punctuation found, try splitting on patterns that indicate separate thoughts:
    
    // Pattern 1: Split on conjunctions followed by "I" + action/state verbs
    sentences = text
      .split(/(?:,\s*(?:and|but|so|then|also)\s+|,\s+)(?=I\s+(?:need|have|want|should|will|am|going|think|feel|must|can|could|would|might))/i)
      .map(s => s.trim())
      .filter(s => s.length > 0)
    
    if (sentences.length > 1) {
      return sentences
    }
    
    // Pattern 2: Split on "and I" or "but I" patterns  
    sentences = text
      .split(/\s+(?:and|but|so|then|also)\s+(?=I\s+(?:need|have|want|should|will|am|going|think|feel|must|can|could|would|might))/i)
      .map(s => s.trim())
      .filter(s => s.length > 0)
    
    if (sentences.length > 1) {
      return sentences
    }
    
    // Pattern 3: Split on commas before common task/note starters (without "I")
    sentences = text
      .split(/,\s*(?=(?:need\s+to|have\s+to|want\s+to|should|must|remember\s+to|don't\s+forget|call|buy|get|pick\s+up|schedule|book|pay|fix|clean|organize|maybe|perhaps|what\s+if|interesting|cool|weird))/i)
      .map(s => s.trim())
      .filter(s => s.length > 0)
    
    if (sentences.length > 1) {
      return sentences
    }
    
    // If still no splits found, return the original text as a single item
    return [text.trim()]
  }

  /**
   * Handle text input submission (for browsers without speech support)
   */
  const handleTextSubmit = async (text: string) => {
    if (!appData) return
    
    // Split input into separate sentences/thoughts
    const sentences = splitIntoSentences(text.trim())
    const newItems: VoiceItem[] = []
    const sessionId = `session-${Date.now()}`
    
    // Create separate braindump items for each sentence
    sentences.forEach((sentence, index) => {
      if (sentence.length > 0) {
        newItems.push({
          id: crypto.randomUUID(),
          text: sentence,
          timestamp: new Date(Date.now() + index).toISOString(), // Slight time offset
          category: 'braindump',
          sessionId,
          processed: false
        })
      }
    })
    
    const updatedData = {
      ...appData,
      braindump: [...appData.braindump, ...newItems]
    }
    
    await handleDataUpdate(updatedData)
    
    // Track the text input
    enhancedAnalytics.trackEvent({
      action: 'text_input_submitted',
      category: 'engagement', 
      label: 'fallback_mode',
      custom_parameters: {
        input_length: text.length,
        sentences_created: sentences.length,
        source: 'text_fallback'
      }
    })
  }
  
  /**
   * Keyboard shortcuts handlers
   */
  const handleExportData = async () => {
    if (!appData) return
    
    const dataToExport = {
      ...appData,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tickk-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    // Track data export
    enhancedAnalytics.trackEvent({
      action: 'data_exported',
      category: 'feature_usage',
      label: 'keyboard_shortcut',
      custom_parameters: {
        export_trigger: 'keyboard_shortcut',
        items_exported: (appData?.braindump.length || 0) + (appData?.tasks.length || 0) + (appData?.notes.length || 0)
      }
    })
  }

  // Define command palette commands
  const commands: Command[] = [
    // Mode navigation
    {
      id: 'go-braindump',
      label: 'Go to Braindump',
      description: 'Switch to braindump mode',
      icon: '🎤',
      action: () => setMode('braindump'),
      keywords: ['mode', 'voice', 'record']
    },
    {
      id: 'go-organized',
      label: 'Go to Organized',
      description: 'Switch to organized view',
      icon: '📋',
      action: () => setMode('organized'),
      keywords: ['mode', 'tasks', 'notes', 'list']
    },
    {
      id: 'go-focus',
      label: 'Go to Focus',
      description: 'Switch to focus mode',
      icon: '🎯',
      action: () => setMode('focus'),
      keywords: ['mode', 'today', 'pomodoro']
    },
    // Recording actions
    {
      id: 'start-recording',
      label: 'Start Recording',
      description: 'Start voice recording',
      icon: '⏺️',
      action: () => recordingControls?.startRecording(),
      keywords: ['voice', 'mic', 'record', 'speak']
    },
    {
      id: 'stop-recording',
      label: 'Stop Recording',
      description: 'Stop voice recording',
      icon: '⏹️',
      action: () => recordingControls?.stopRecording(),
      keywords: ['voice', 'mic', 'record']
    },
    {
      id: 'process-braindump',
      label: 'Process & Organize',
      description: 'Organize braindump items into tasks and notes',
      icon: '✨',
      action: () => recordingControls?.processItems(),
      keywords: ['organize', 'classify', 'process', 'sort']
    },
    // Data actions
    {
      id: 'export-data',
      label: 'Export Data',
      description: 'Export all your data',
      icon: '💾',
      action: handleExportData,
      keywords: ['save', 'backup', 'download', 'export']
    },
    // Help
    {
      id: 'show-help',
      label: 'Keyboard Shortcuts',
      description: 'Show all keyboard shortcuts',
      icon: '⌨️',
      action: () => setShowHelpModal(true),
      keywords: ['help', 'shortcuts', 'keys', 'commands']
    }
  ]

  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    onStartRecording: recordingControls?.startRecording,
    onStopRecording: recordingControls?.stopRecording,
    onProcessBraindump: recordingControls?.processItems,
    onShowHelp: () => setShowHelpModal(true),
    onCloseModal: () => setShowHelpModal(false),
    onShowCommandPalette: () => setShowCommandPalette(true),
    onExport: handleExportData,
    isRecording,
    isModalOpen: showHelpModal || showCommandPalette,
    canProcess: recordingControls?.canProcess || false
  })
  
  /**
   * Loading state - minimal
   */
  if (!mounted || isLoading) {
    return (
      <>
        <Head>
          <title>Loading... | tickk</title>
          <meta name="description" content="Loading tickk voice productivity app..." />
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">
              {needsMigration ? 'Upgrading data...' : 'Loading...'}
            </p>
          </div>
        </div>
      </>
    )
  }
  
  /**
   * Show onboarding for new users
   */
  if (showOnboarding && appData) {
    // Show as modal overlay instead of full screen
  }
  
  /**
   * Main app - clean, minimal interface
   */
  return (
    <>
      <Head>
        <title>
          {mode === 'braindump' 
            ? 'tickk - Speak. Save. Sort it later.'
            : 'Organized | tickk'
          }
        </title>
        <meta 
          name="description" 
          content="Free voice productivity app for hands-free task management. Speech-to-text tool that auto-organizes thoughts into tasks & notes. No signup required." 
        />
        <link rel="canonical" href="https://tickk.app/" />

        {/* Schema.org Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "tickk",
              "alternateName": "tickk Voice Productivity App",
              "description": "Revolutionary voice-to-text productivity application that transforms speech into organized tasks, notes, and reminders using natural language processing with compromise.js. Perfect for hands-free productivity, task management, and note-taking without requiring any login or account creation.",
              "url": "https://tickk.app",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Web Browser",
              "browserRequirements": "Modern browsers with Web Speech API support",
              "applicationSubCategory": "Voice Productivity Tool",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "category": "Free Software"
              },
              "author": {
                "@type": "Organization",
                "name": "digitalwareshub",
                "url": "https://github.com/digitalwareshub"
              },
              "publisher": {
                "@type": "Organization", 
                "name": "digitalwareshub",
                "url": "https://github.com/digitalwareshub"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150",
                "bestRating": "5"
              },
              "featureList": [
                "Voice-to-text transcription",
                "Natural language processing", 
                "Automatic task/note classification",
                "Offline functionality",
                "No login required",
                "Privacy-first design",
                "Cross-platform compatibility",
                "Open source",
                "Real-time processing",
                "Bilingual support (English/Spanish)"
              ],
              "screenshot": "https://tickk.app/og-image.png",
              "softwareVersion": "1.0",
              "datePublished": "2024-01-01",
              "dateModified": "2025-09-30",
              "license": "https://github.com/digitalwareshub/tickk/blob/main/LICENSE",
              "codeRepository": "https://github.com/digitalwareshub/tickk",
              "programmingLanguage": ["TypeScript", "JavaScript", "React", "Next.js"],
              "runtime": "Web Browser",
              "targetAudience": {
                "@type": "Audience",
                "audienceType": ["Professionals", "Students", "Entrepreneurs", "Productivity Enthusiasts"]
              },
              "potentialAction": {
                "@type": "UseAction",
                "target": "https://tickk.app",
                "name": "Use tickk Voice Productivity App"
              }
            })
          }}
        />
      </Head>

      <Layout 
        mode={mode} 
        onModeChange={handleModeSwitch}
        className="min-h-screen bg-white"
      >
        <div className="min-h-screen bg-white">
          {/* Smart interface for braindump mode */}
          {mode === 'braindump' && !isLoading && (
            <>
              {/* Always show MicroLanding for the main interface as seen in screenshot */}
              <MicroLanding
                itemCount={totalItemCount}
                onExampleClick={handleExampleClick}
                isRecording={isRecording}
                isSupported={isSupported}
                onStartRecording={recordingControls?.startRecording}
                onStopRecording={recordingControls?.stopRecording}
                currentTranscript={currentTranscript}
                recordingError={recordingError}
                onTextSubmit={handleTextSubmit}
              />
            </>
          )}
          
          {/* Main content area */}
          {appData && (
            <main>
              {/* SEO H1 - Hidden but accessible to search engines */}
              <h1 className="sr-only">
                tickk - Free Voice Productivity App: Speak, Save, Sort it Later
              </h1>
              
              {/* SEO H2 - Hidden but accessible to search engines */}
              <h2 className="sr-only">
                {mode === 'braindump' 
                  ? 'Voice Recording Interface - Capture Your Thoughts Instantly'
                  : 'Organized Tasks and Notes Dashboard'
                }
              </h2>
              
              {/* Hidden internal links for SEO - invisible to users */}
              <div className="sr-only">
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
                <Link href="/support">Support</Link>
                <Link href="/contact">Contact Us</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/es">Español</Link>
              </div>
              
              {mode === 'braindump' ? (
                <BraindumpInterface
                  appData={appData}
                  preferences={preferences}
                  onDataUpdate={handleDataUpdate}
                  onRecordingStateChange={handleRecordingStateChange}
                  onRecordingControls={setRecordingControls}
                  onRecordingStatusUpdate={handleRecordingStatusUpdate}
                  onModeSwitch={handleModeSwitch}
                  showMainInterface={false}
                />
              ) : mode === 'focus' ? (
                <FocusView
                  appData={appData}
                  onDataUpdate={handleDataUpdate}
                />
              ) : (
                <OrganizedView
                  appData={appData}
                  preferences={preferences}
                  onDataUpdate={handleDataUpdate}
                />
              )}
            </main>
          )}
        </div>
      </Layout>
      
      {/* Keyboard shortcuts help modal */}
      <KeyboardHelpModal 
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
      
      {/* Keyboard shortcuts hint */}
      <KeyboardHint
        show={hasEverRecorded && totalItemCount < 10}
        isRecording={isRecording}
        canProcess={recordingControls?.canProcess}
      />

      {/* Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={showCommandPalette}
        commands={commands}
        onClose={() => setShowCommandPalette(false)}
      />

      {/* ARIA Live Regions for screen readers */}
      <LiveRegions />
      
      {/* Enhanced Modal onboarding overlay - Mobile Optimized */}
      {showOnboarding && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-title"
          aria-describedby="onboarding-description"
          tabIndex={-1}
        >
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="text-center">
              {/* Language Selector */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setModalLanguage('en')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      modalLanguage === 'en' 
                        ? 'bg-white shadow-sm text-gray-900' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    🇺🇸 English
                  </button>
                  <button 
                    onClick={() => setModalLanguage('es')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      modalLanguage === 'es' 
                        ? 'bg-white shadow-sm text-gray-900' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    🇪🇸 Español
                  </button>
                </div>
              </div>

              {/* Firefox Notice */}
              {typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase().includes('firefox') && (
                <div className="mb-4 sm:mb-6 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 text-lg flex-shrink-0">⚠️</span>
                    <div className="text-left">
                      <p className="text-sm font-medium text-amber-800 mb-1">
                        {modalLanguage === 'es' ? 'Aviso para Firefox' : 'Firefox Notice'}
                      </p>
                      <p className="text-xs text-amber-700">
                        {modalLanguage === 'es' 
                          ? 'Las funciones de voz están actualmente en desarrollo para Firefox. Recomendamos usar Chrome o Safari mientras trabajamos en la compatibilidad completa con Firefox.'
                          : 'Voice features are currently in development for Firefox. We recommend using Chrome or Safari while we work on full Firefox compatibility.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Header with icon - Mobile optimized */}
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">🎤</span>
                </div>
                <h1 
                  id="onboarding-title"
                  className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2"
                >
                  {content.title}
                </h1>
                <p 
                  id="onboarding-description"
                  className="text-gray-600 text-sm sm:text-base leading-relaxed px-2 sm:px-0"
                >
                  {content.subtitle}
                </p>
              </div>

              {/* Demo Preview - Mobile optimized */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">{content.demoTitle}</h3>
                <div className="space-y-3">
                  {/* Input example */}
                  <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">{content.youSay}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-800 italic text-left">
                      &quot;{content.exampleText}&quot;
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  
                  {/* Output example */}
                  <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-2 text-left">{content.weOrganize}</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-green-500 flex-shrink-0"></div>
                        <span className="flex-1 text-left">{content.task1}</span>
                        <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded flex-shrink-0">{content.tagTask}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-green-500 flex-shrink-0"></div>
                        <span className="flex-1 text-left">{content.task2}</span>
                        <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded flex-shrink-0">{content.tagTask}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust indicators - Mobile grid optimized */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex flex-col items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                  <span className="text-base sm:text-lg mb-1">🔒</span>
                  <span className="text-xs font-medium text-green-700">{content.trustPrivate}</span>
                  <span className="text-xs text-green-600 hidden sm:block">{content.trustPrivateDesc}</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                  <span className="text-base sm:text-lg mb-1">⚡</span>
                  <span className="text-xs font-medium text-blue-700">{content.trustNoSignup}</span>
                  <span className="text-xs text-blue-600 hidden sm:block">{content.trustNoSignupDesc}</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                  <span className="text-base sm:text-lg mb-1">🌐</span>
                  <span className="text-xs font-medium text-purple-700">{content.trustOffline}</span>
                  <span className="text-xs text-purple-600 hidden sm:block">{content.trustOfflineDesc}</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 bg-orange-50 rounded-lg">
                  <span className="text-base sm:text-lg mb-1">✨</span>
                  <span className="text-xs font-medium text-orange-700">{content.trustSmart}</span>
                  <span className="text-xs text-orange-600 hidden sm:block">{content.trustSmartDesc}</span>
                </div>
              </div>

              {/* How it works - Mobile optimized */}
              <div className="text-left mb-4 sm:mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3 text-center">{content.howItWorks}</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</div>
                    <span className="text-xs sm:text-sm text-gray-700">{content.step1}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</div>
                    <span className="text-xs sm:text-sm text-gray-700">{content.step2}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</div>
                    <span className="text-xs sm:text-sm text-gray-700">{content.step3}</span>
                  </div>
                </div>
              </div>

              {/* Remember choice checkbox */}
              <div className="mb-4 flex items-center justify-center">
                <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberChoice}
                    onChange={(e) => setRememberChoice(e.target.checked)}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500 focus:ring-2"
                  />
                  <span>{content.rememberChoice}</span>
                </label>
              </div>

              {/* Action buttons - Mobile optimized */}
              <div className="space-y-3">
                <button
                  onClick={handleOnboardingComplete}
                  className="w-full py-3 sm:py-3 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors min-h-[48px]"
                  aria-label={`Start using tickk with microphone - ${modalLanguage}`}
                >
                  {content.startRecording}
                </button>
                <button
                  onClick={handleOnboardingComplete}
                  className="w-full py-3 sm:py-3 px-4 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors min-h-[48px]"
                  aria-label={`Try tickk demo first - ${modalLanguage}`}
                >
                  {content.tryDemo}
                </button>
              </div>

              {/* Skip option - Mobile optimized */}
              <div className="mt-4">
                <button
                  onClick={handleOnboardingComplete}
                  className="text-xs text-gray-500 hover:text-gray-700 underline min-h-[44px] px-2"
                >
                  {content.skipIntro}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Deployment test - trigger deployment check
