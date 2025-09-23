/**
 * Main App - Clean, Minimal Design Like Notion/Cal.com
 * Direct braindump-first experience without flashy graphics
 */

import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { DataMigrator } from '@/lib/migration/migrator'
import { StorageService } from '@/lib/storage/storage-service'
import { enhancedAnalytics, trackPageView } from '@/lib/analytics/enhanced-analytics'
import type { AppData, UserPreferences, VoiceItem } from '@/types/braindump'

import BraindumpInterface from '@/components/BraindumpInterface'
import OrganizedView from '@/components/OrganizedView'
import MicroLanding from '@/components/MicroLanding'
import KeyboardHelpModal from '@/components/KeyboardHelpModal'
import KeyboardHint from '@/components/KeyboardHint'
import LiveRegions from '@/components/LiveRegions'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

type AppMode = 'braindump' | 'organized'

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
  
  // Smart context state
  const [hasEverRecorded, setHasEverRecorded] = useState(false)
  const [totalItemCount, setTotalItemCount] = useState(0)
  
  // UI state
  const [showHelpModal, setShowHelpModal] = useState(false)
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
          
          const savedMode = data.preferences?.defaultMode || 'braindump'
          setMode(savedMode)
          
          // Only show onboarding MODAL for truly new users with no data and no previous visits
          // The rich interface should always show regardless of user status
          const hasUsedBefore = localStorage.getItem('tickk_has_used') === 'true'
          const hasAnyData = totalItems > 0
          const onboardingPref = data.preferences?.showOnboarding !== false
          
          if (!hasUsedBefore && !hasAnyData && onboardingPref && !migrationNeeded) {
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
          
          // Show onboarding MODAL for truly new users only
          // The rich interface will always show via MicroLanding component
          const hasUsedBefore = localStorage.getItem('tickk_has_used') === 'true'
          if (!hasUsedBefore) {
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
   * Handle onboarding completion
   */
  const handleOnboardingComplete = useCallback(async () => {
    setShowOnboarding(false)
    
    // Mark user as having used the app
    localStorage.setItem('tickk_has_used', 'true')
    
    if (preferences) {
      const updatedPreferences = { ...preferences, showOnboarding: false }
      setPreferences(updatedPreferences)
      await storageService.savePreferences(updatedPreferences)
    }
    
    // Track successful onboarding completion
    enhancedAnalytics.trackEvent({
      action: 'onboarding_completed',
      category: 'user_journey',
      label: 'success',
      custom_parameters: {
        items_count: (appData?.braindump.length || 0) + (appData?.tasks.length || 0) + (appData?.notes.length || 0)
      }
    })
  }, [preferences, storageService, appData?.braindump.length, appData?.notes.length, appData?.tasks.length])

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
  
  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    onStartRecording: recordingControls?.startRecording,
    onStopRecording: recordingControls?.stopRecording,
    onProcessBraindump: recordingControls?.processItems,
    onShowHelp: () => setShowHelpModal(true),
    onCloseModal: () => setShowHelpModal(false),
    onExport: handleExportData,
    isRecording,
    isModalOpen: showHelpModal,
    canProcess: recordingControls?.canProcess || false
  })
  
  /**
   * Loading state - minimal
   */
  if (!mounted || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">
              {needsMigration ? 'Upgrading data...' : 'Loading...'}
            </p>
          </div>
        </div>
      </Layout>
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
            ? 'tickk - An app that shuts up and listens'
            : 'Organized | tickk'
          }
        </title>
        <meta 
          name="description" 
          content="An app that shuts up and listens. Speak your thoughts, organize later. No AI, just privacy." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
              />
            </>
          )}
          
          {/* Main content area */}
          {appData && (
            <main>
              {mode === 'braindump' ? (
                <BraindumpInterface 
                  appData={appData}
                  preferences={preferences}
                  onDataUpdate={handleDataUpdate}
                  onRecordingStateChange={handleRecordingStateChange}
                  onRecordingControls={setRecordingControls}
                  onRecordingStatusUpdate={handleRecordingStatusUpdate}
                  showMainInterface={false}
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
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="text-center">
              {/* Header with icon - Mobile optimized */}
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">🎤</span>
                </div>
                <h1 
                  id="onboarding-title"
                  className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2"
                >
                  Welcome to tickk
                </h1>
                <p 
                  id="onboarding-description"
                  className="text-gray-600 text-sm sm:text-base leading-relaxed px-2 sm:px-0"
                >
                  Transform scattered thoughts into organized action
                </p>
              </div>

              {/* Demo Preview - Mobile optimized */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">See it in action:</h3>
                <div className="space-y-3">
                  {/* Input example */}
                  <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">You say:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-800 italic text-left">
                      &quot;I need to call mom tomorrow and don&apos;t forget to buy groceries&quot;
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
                    <div className="text-xs text-gray-500 mb-2 text-left">We organize:</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-green-500 flex-shrink-0"></div>
                        <span className="flex-1 text-left">Call mom tomorrow</span>
                        <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded flex-shrink-0">task</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-green-500 flex-shrink-0"></div>
                        <span className="flex-1 text-left">Buy groceries</span>
                        <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded flex-shrink-0">task</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust indicators - Mobile grid optimized */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex flex-col items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                  <span className="text-base sm:text-lg mb-1">🔒</span>
                  <span className="text-xs font-medium text-green-700">100% Private</span>
                  <span className="text-xs text-green-600 hidden sm:block">Local processing</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                  <span className="text-base sm:text-lg mb-1">⚡</span>
                  <span className="text-xs font-medium text-blue-700">No Sign-up</span>
                  <span className="text-xs text-blue-600 hidden sm:block">Start instantly</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                  <span className="text-base sm:text-lg mb-1">🌐</span>
                  <span className="text-xs font-medium text-purple-700">Works Offline</span>
                  <span className="text-xs text-purple-600 hidden sm:block">Your device only</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-3 bg-orange-50 rounded-lg">
                  <span className="text-base sm:text-lg mb-1">✨</span>
                  <span className="text-xs font-medium text-orange-700">Smart AI</span>
                  <span className="text-xs text-orange-600 hidden sm:block">Auto-organize</span>
                </div>
              </div>

              {/* How it works - Mobile optimized */}
              <div className="text-left mb-4 sm:mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3 text-center">How it works:</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</div>
                    <span className="text-xs sm:text-sm text-gray-700">Speak your thoughts naturally</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</div>
                    <span className="text-xs sm:text-sm text-gray-700">Review organized tasks & notes</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</div>
                    <span className="text-xs sm:text-sm text-gray-700">Get productive immediately</span>
                  </div>
                </div>
              </div>

              {/* Action buttons - Mobile optimized */}
              <div className="space-y-3">
                <button
                  onClick={handleOnboardingComplete}
                  className="w-full py-3 sm:py-3 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors min-h-[48px]"
                  aria-label="Start using tickk with microphone"
                >
                  🎤 Start Recording
                </button>
                <button
                  onClick={handleOnboardingComplete}
                  className="w-full py-3 sm:py-3 px-4 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors min-h-[48px]"
                  aria-label="Try tickk demo first"
                >
                  👁️ Try Demo First
                </button>
              </div>

              {/* Skip option - Mobile optimized */}
              <div className="mt-4">
                <button
                  onClick={handleOnboardingComplete}
                  className="text-xs text-gray-500 hover:text-gray-700 underline min-h-[44px] px-2"
                >
                  Skip intro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
