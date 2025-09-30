/**
 * Spanish Main App - Clean, Minimal Design Like Notion/Cal.com
 * Direct braindump-first experience without flashy graphics
 */

import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { DataMigrator } from '@/lib/migration/migrator'
import { StorageService } from '@/lib/storage/storage-service'
import { enhancedAnalytics, trackPageView } from '@/lib/analytics/enhanced-analytics'
import type { AppData, UserPreferences } from '@/types/braindump'

import BraindumpInterface from '@/components/BraindumpInterface'
import OrganizedView from '@/components/OrganizedView'
import MicroLanding from '@/components/MicroLanding'
import KeyboardHelpModal from '@/components/KeyboardHelpModal'
import KeyboardHint from '@/components/KeyboardHint'
import LiveRegions from '@/components/LiveRegions'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

type AppMode = 'braindump' | 'organized'

export default function SpanishApp() {
  // Core state
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<AppMode>('braindump')
  const [appData, setAppData] = useState<AppData | null>(null)
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  
  // Loading and migration states
  const [isLoading, setIsLoading] = useState(true)
  const [needsMigration, setNeedsMigration] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [rememberChoice, setRememberChoice] = useState(false) // Checkbox for "don't show again"
  // Smart context state
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

  // Mount effect
  useEffect(() => {
    setMounted(true)
    // Track page view for Spanish app
    trackPageView('main_app_es')
  }, [])

  // Initialize app data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await storageService.init()
        
        // Check for migration needs
        const migrationNeeded = await migrator.needsMigration()
        if (migrationNeeded) {
          setNeedsMigration(true)
          const migrationResult = await migrator.migrate()
          if (migrationResult.success) {
            // After migration, load the data normally
            const data = await storageService.getAllData()
            const prefs = await storageService.getPreferences()
            setAppData(data)
            setPreferences(prefs)
            setMode('braindump')
          }
        } else {
          // Load existing data
          const data = await storageService.getAllData()
          const prefs = await storageService.getPreferences()
          
          if (data && prefs) {
            setAppData(data)
            setPreferences(prefs)
            setTotalItemCount(data.braindump.length)
                   // setHasEverRecorded(data.braindump.length > 0)
            setMode('braindump')
          } else {
            // Create fresh data for new users
            const freshData: AppData = {
              tasks: [],
              notes: [],
              braindump: [],
              sessions: [],
              version: '1.0.0',
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
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to initialize app:', error)
        setIsLoading(false)
      }
    }
    
    initializeApp()
  }, [storageService, migrator])

  // Handle data updates
  const handleDataUpdate = useCallback(async (newData: AppData) => {
    setAppData(newData)
    setTotalItemCount(newData.braindump.length)
    await storageService.saveAllData(newData)
  }, [storageService])

  // Handle onboarding completion
  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false)
    
    // Only hide modal permanently if user checked the "remember" checkbox
    if (rememberChoice) {
      localStorage.setItem('tickk_hide_language_modal', 'true')
    }
    
    // Mark user as having used the app
    localStorage.setItem('tickk_has_used', 'true')
    
    // Save Spanish language preference
    localStorage.setItem('tickk_language', 'es')
  }, [rememberChoice])

  // Handle recording state changes
  const handleRecordingStateChange = useCallback((recording: boolean) => {
    setIsRecording(recording)
    if (recording) {
      // setHasEverRecorded(true)
      localStorage.setItem('tickk_has_used', 'true')
    }
  }, [])

  // Handle recording controls
  const handleRecordingControls = useCallback((controls: {
    startRecording: () => void
    stopRecording: () => void
    canProcess: boolean
    processItems: () => void
  }) => {
    setRecordingControls(controls)
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

  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    onStartRecording: recordingControls?.startRecording,
    onStopRecording: recordingControls?.stopRecording,
    onProcessBraindump: recordingControls?.processItems,
    onShowHelp: () => setShowHelpModal(true),
    onCloseModal: () => setShowHelpModal(false),
    isRecording,
    isModalOpen: showHelpModal,
    canProcess: recordingControls?.canProcess || false
  })

  // Handle mode switching
  const handleModeSwitch = useCallback((newMode: AppMode) => {
    setMode(newMode)
    // Track mode switch
    enhancedAnalytics.trackEvent({
      action: 'mode_switched',
      category: 'navigation',
      label: newMode,
      custom_parameters: {
        language: 'es',
        previous_mode: mode
      }
    })
  }, [mode])


  // Handle migration completion
  const handleMigrationComplete = useCallback(() => {
    setNeedsMigration(false)
    // Track migration completion
    enhancedAnalytics.trackEvent({
      action: 'migration_completed',
      category: 'system',
      label: 'spanish',
      custom_parameters: {
        language: 'es',
        migration_version: '1.0'
      }
    })
  }, [])

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null
  }

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Head>
          <title>Cargando... | tickk</title>
          <meta name="description" content="Cargando la aplicación de productividad por voz tickk..." />
        </Head>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      </>
    )
  }

  // Show migration screen if needed
  if (needsMigration) {
    return (
      <Layout className="min-h-screen bg-white">
        <main>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Actualizando datos</h2>
              <p className="text-gray-600 mb-4">Estamos actualizando tu información para la nueva versión.</p>
              <button
                onClick={handleMigrationComplete}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </main>
      </Layout>
    )
  }

  // Ensure we have data before rendering
  if (!appData || !preferences) {
    return (
      <Layout className="min-h-screen bg-white">
        <main>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Preparando aplicación...</p>
            </div>
          </div>
        </main>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>tickk - Habla. Guarda. Ordénalo después.</title>
        <meta name="description" content="Habla. Guarda. Ordénalo después. Volcado mental por voz → auto-organizado en tareas y notas. Gratis, código abierto, almacenamiento local." />
        <meta name="keywords" content="aplicación gratuita de voz a texto, software de productividad por voz, gestor de tareas por reconocimiento de voz, asistente de voz, toma de notas sin manos, lista de tareas controlada por voz, productividad de procesamiento de lenguaje natural, organizador de voz a texto, aplicación de comandos de voz, gestión de tareas impulsada por voz, herramientas de productividad gratuitas, reconocimiento de voz offline, aplicación de voz enfocada en privacidad, aplicación de toma de notas por voz, suite de productividad por reconocimiento de voz, flujo de trabajo impulsado por voz, productividad sin manos, organizador activado por voz, categorización de tareas por voz, asistente de voz inteligente, panel de productividad por voz, convertidor de voz a acción, gestión de proyectos basada en voz, software de transcripción por voz, aplicación PWA de voz, aplicación web progresiva de productividad, reconocimiento de voz offline, tecnología de voz del navegador, asistente de voz sin IA, automatización de flujo de trabajo por voz" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="tickk Team" />
        <meta name="language" content="es-ES" />
        
        {/* Open Graph */}
        <meta property="og:title" content="tickk - Háblalo. Guárdalo. Ordénalo después." />
        <meta property="og:description" content="Volcado mental por voz → auto-organizado en tareas y notas. Gratis, código abierto, almacenamiento local." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tickk.app/es" />
        <meta property="og:image" content="https://tickk.app/og-image.png" />
        <meta property="og:image:alt" content="tickk - Aplicación de Voz a Productividad" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="tickk" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TheTickkApp" />
        <meta name="twitter:creator" content="@TheTickkApp" />
        <meta name="twitter:title" content="tickk - Háblalo. Guárdalo. Ordénalo después." />
        <meta name="twitter:description" content="Volcado mental por voz → auto-organizado en tareas y notas. Gratis, código abierto, almacenamiento local." />
        <meta name="twitter:image" content="https://tickk.app/og-image.png" />
        <meta name="twitter:image:alt" content="tickk - Aplicación de Voz a Productividad" />
        
        {/* Canonical and hreflang */}
        <link rel="canonical" href="https://tickk.app/es" />
        <link rel="alternate" hrefLang="en" href="https://tickk.app/" />
        <link rel="alternate" hrefLang="es" href="https://tickk.app/es" />
        <link rel="alternate" hrefLang="x-default" href="https://tickk.app/" />
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
                  onRecordingControls={handleRecordingControls}
                  onRecordingStatusUpdate={handleRecordingStatusUpdate}
                  showMainInterface={false}
                />
              ) : (
                <OrganizedView 
                  appData={appData}
                  preferences={preferences}
                  onDataUpdate={handleDataUpdate}
                  language="es"
                />
              )}
            </main>
          )}

          {/* Keyboard Help Modal */}
          {showHelpModal && (
            <KeyboardHelpModal
              isOpen={showHelpModal}
              onClose={() => setShowHelpModal(false)}
            />
          )}

          {/* Keyboard Hints */}
          <KeyboardHint show={false} />

          {/* Live Regions for Accessibility */}
          <LiveRegions />
        </div>

        {/* Enhanced Modal onboarding overlay - Mobile Optimized Spanish */}
        {showOnboarding && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-title-es"
            aria-describedby="onboarding-description-es"
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
                    id="onboarding-title-es"
                    className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2"
                  >
                    Háblalo. Guárdalo. Ordénalo después.
                  </h1>
                  <p 
                    id="onboarding-description-es"
                    className="text-gray-600 text-sm sm:text-base leading-relaxed px-2 sm:px-0"
                  >
                    Volcado mental por voz → auto-organizado en tareas y notas. Gratis, código abierto, almacenamiento local.
                  </p>
                </div>

                {/* Demo Preview - Mobile optimized */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Míralo en acción:</h3>
                  <div className="space-y-3">
                    {/* Input example */}
                    <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">Tú dices:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-800 italic text-left">
                        &quot;Necesito llamar a mamá mañana y no olvidar comprar víveres&quot;
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
                      <div className="text-xs text-gray-500 mb-2 text-left">Nosotros organizamos:</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-green-500 flex-shrink-0"></div>
                          <span className="flex-1 text-left">Llamar a mamá mañana</span>
                          <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded flex-shrink-0">tarea</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-green-500 flex-shrink-0"></div>
                          <span className="flex-1 text-left">Comprar víveres</span>
                          <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded flex-shrink-0">tarea</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust indicators - Mobile grid optimized */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="flex flex-col items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                    <span className="text-base sm:text-lg mb-1">🔒</span>
                    <span className="text-xs font-medium text-green-700">100% Privado</span>
                    <span className="text-xs text-green-600 hidden sm:block">Procesamiento local</span>
                  </div>
                  <div className="flex flex-col items-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <span className="text-base sm:text-lg mb-1">⚡</span>
                    <span className="text-xs font-medium text-blue-700">Sin Registro</span>
                    <span className="text-xs text-blue-600 hidden sm:block">Comienza al instante</span>
                  </div>
                  <div className="flex flex-col items-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                    <span className="text-base sm:text-lg mb-1">🌐</span>
                    <span className="text-xs font-medium text-purple-700">Funciona Sin Conexión</span>
                    <span className="text-xs text-purple-600 hidden sm:block">Solo tu dispositivo</span>
                  </div>
                  <div className="flex flex-col items-center p-2 sm:p-3 bg-orange-50 rounded-lg">
                    <span className="text-base sm:text-lg mb-1">✨</span>
                    <span className="text-xs font-medium text-orange-700">PLN Inteligente</span>
                    <span className="text-xs text-orange-600 hidden sm:block">Auto-organiza</span>
                  </div>
                </div>

                {/* How it works - Mobile optimized */}
                <div className="text-left mb-4 sm:mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 text-center">Cómo funciona:</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</div>
                      <span className="text-xs sm:text-sm text-gray-700">Habla tus pensamientos de forma natural</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</div>
                      <span className="text-xs sm:text-sm text-gray-700">Revisa tareas y notas organizadas</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</div>
                      <span className="text-xs sm:text-sm text-gray-700">Sé productivo inmediatamente</span>
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
                    <span>Recordar mi elección y no preguntar de nuevo</span>
                  </label>
                </div>

                {/* Action buttons - Mobile optimized */}
                <div className="space-y-3">
                  <button
                    onClick={handleOnboardingComplete}
                    className="w-full py-3 sm:py-3 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors min-h-[48px]"
                    aria-label="Comenzar a usar tickk con micrófono"
                  >
                    🎤 Comenzar a Grabar
                  </button>
                  <button
                    onClick={handleOnboardingComplete}
                    className="w-full py-3 sm:py-3 px-4 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors min-h-[48px]"
                    aria-label="Probar demo de tickk primero"
                  >
                    👁️ Probar Demo Primero
                  </button>
                </div>

                {/* Skip option - Mobile optimized */}
                <div className="mt-4">
                  <button
                    onClick={handleOnboardingComplete}
                    className="text-xs text-gray-500 hover:text-gray-700 underline min-h-[44px] px-2"
                  >
                    Saltar introducción
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}