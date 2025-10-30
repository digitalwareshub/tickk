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
import OnboardingTour, { type TourStep } from '@/components/OnboardingTour'
import WhatsNewBanner, { useWhatsNewBanner } from '@/components/WhatsNewBanner'
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
  
  // Smart context state
  const [hasEverRecorded, setHasEverRecorded] = useState(false)
  const [totalItemCount, setTotalItemCount] = useState(0)
  
  // UI state
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showTour, setShowTour] = useState(false)
  
  // What's New banner
  const { showBanner, dismissBanner } = useWhatsNewBanner('1.10.2')
  
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

  /**
   * Initialize app on mount
   */
  useEffect(() => {
    const initializeApp = async () => {
      setMounted(true)

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

          // Show tour for new users
          const tourCompleted = localStorage.getItem('tickk_onboarding_tour_completed') === 'true'
          if (!tourCompleted && totalItems === 0 && !migrationNeeded) {
            setTimeout(() => setShowTour(true), 500)
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

          // Show tour for new users
          const tourCompleted = localStorage.getItem('tickk_onboarding_tour_completed') === 'true'
          if (!tourCompleted) {
            setTimeout(() => setShowTour(true), 500)
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

  // Define onboarding tour steps
  const tourSteps: TourStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Tickk! 🎉',
      description: 'Your voice-first productivity companion. Let\'s take a quick tour of the key features.',
      placement: 'center'
    },
    {
      id: 'modes',
      title: 'Three Powerful Modes',
      description: 'Switch between Braindump (voice capture), Organized (view tasks & notes), and Focus (today\'s priorities).',
      target: '[data-tour="mode-tabs"]',
      placement: 'bottom'
    },
    {
      id: 'braindump',
      title: 'Braindump Mode 🎤',
      description: 'Speak naturally. Your thoughts are automatically organized into tasks and notes with smart NLP classification.',
      target: '[data-tour="braindump-section"]',
      placement: 'center',
      action: () => setMode('braindump')
    },
    {
      id: 'recording',
      title: 'Start Recording',
      description: 'Click the microphone or press Space to start capturing your thoughts. Press Space again to stop.',
      target: '[data-tour="record-button"]',
      placement: 'bottom',
      action: () => {
        // Ensure we're in braindump mode and give extra time for DOM to stabilize
        setMode('braindump')
      }
    },
    {
      id: 'organized',
      title: 'Organized View 📋',
      description: 'Review your captured items organized by type. Edit, complete, or export tasks to your calendar.',
      target: '[data-tour="mode-tabs"]',
      placement: 'bottom',
      action: () => setMode('organized')
    },
    {
      id: 'focus',
      title: 'Focus Mode 🎯',
      description: 'Stay productive with today\'s tasks and a built-in Pomodoro timer.',
      target: '[data-tour="mode-tabs"]',
      placement: 'bottom',
      action: () => setMode('focus')
    },
    {
      id: 'command-palette',
      title: 'Command Palette ⌨️',
      description: 'Press Cmd/Ctrl + K anytime to quickly access all features with keyboard shortcuts.',
      placement: 'center'
    },
    {
      id: 'complete',
      title: 'You\'re All Set! 🚀',
      description: 'Start capturing your thoughts now. Your data is stored locally and works offline. Have fun!',
      placement: 'center',
      action: () => setMode('braindump')
    }
  ]

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
    },
    {
      id: 'show-tour',
      label: 'Show Tour',
      description: 'Restart the onboarding tour',
      icon: '🎓',
      action: () => setShowTour(true),
      keywords: ['tour', 'guide', 'tutorial', 'onboarding', 'help', 'learn']
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
    isModalOpen: showHelpModal || showCommandPalette || showTour,
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
          content="Free voice productivity app for hands-free task management. ADHD-friendly speech-to-text tool with Focus Mode, Command Palette (⌘K), and analytics. Auto-organizes thoughts into tasks & notes. No signup required." 
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
              "description": "Revolutionary voice-to-text productivity application that transforms speech into organized tasks, notes, and reminders using natural language processing with compromise.js. Features ADHD-friendly Focus Mode, Command Palette (⌘K), and executive function support. Perfect for hands-free productivity, task management, and note-taking without requiring any login or account creation.",
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
                "ratingCount": "79",
                "bestRating": "5"
              },
              "featureList": [
                "Voice-to-text transcription",
                "Natural language processing", 
                "Automatic task/note classification",
                "ADHD-friendly Focus Mode",
                "Command Palette with keyboard shortcuts (⌘K)",
                "Productivity Analytics Dashboard",
                "Activity Streak Tracking",
                "Calendar Export (.ics format)",
                "Offline functionality",
                "No login required",
                "Privacy-first design",
                "Executive function support",
                "Cross-platform compatibility",
                "Open source",
                "Real-time processing"
              ],
              "screenshot": "https://tickk.app/og-image.png",
              "softwareVersion": "1.10.2",
              "datePublished": "2024-01-01",
              "dateModified": "2025-10-28",
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
        {/* What's New Banner for existing users */}
        {showBanner && (
          <WhatsNewBanner 
            version="1.10.2" 
            onDismiss={dismissBanner} 
          />
        )}
        
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

      {/* Interactive Onboarding Tour */}
      <OnboardingTour
        isOpen={showTour}
        steps={tourSteps}
        onComplete={() => setShowTour(false)}
        onSkip={() => setShowTour(false)}
        storageKey="tickk_onboarding_tour_completed"
      />

      {/* ARIA Live Regions for screen readers */}
      <LiveRegions />
    </>
  )
}

// Deployment test - trigger deployment check
