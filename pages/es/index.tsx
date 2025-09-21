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
                showOnboarding: false,
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
            // const hasUsedBefore = localStorage.getItem('tickk_has_used') === 'true'
            // if (!hasUsedBefore) {
            //   setShowOnboarding(true)
            // }
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
      <Layout className="min-h-screen bg-white">
        <main>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando...</p>
            </div>
          </div>
        </main>
      </Layout>
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
        <title>Aplicación Gratuita de Productividad por Voz | tickk - Gestor de Tareas por Reconocimiento de Voz</title>
        <meta name="description" content="Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas, notas y eventos de calendario usando procesamiento avanzado de lenguaje natural. Sin registro requerido, funciona completamente offline, protección completa de privacidad. 99% de precisión en reconocimiento de voz." />
        <meta name="keywords" content="aplicación gratuita de voz a texto, software de productividad por voz, gestor de tareas por reconocimiento de voz, asistente de voz, toma de notas sin manos, lista de tareas controlada por voz, productividad de procesamiento de lenguaje natural, organizador de voz a texto, aplicación de comandos de voz, gestión de tareas impulsada por voz, herramientas de productividad gratuitas, reconocimiento de voz offline, aplicación de voz enfocada en privacidad, aplicación de toma de notas por voz, suite de productividad por reconocimiento de voz, flujo de trabajo impulsado por voz, productividad sin manos, organizador activado por voz, categorización de tareas por voz, asistente de voz inteligente, panel de productividad por voz, convertidor de voz a acción, gestión de proyectos basada en voz, software de transcripción por voz, aplicación PWA de voz, aplicación web progresiva de productividad, reconocimiento de voz offline, tecnología de voz del navegador, asistente de voz sin IA, automatización de flujo de trabajo por voz" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="tickk Team" />
        <meta name="language" content="es-ES" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Aplicación Gratuita de Productividad por Voz | tickk - Gestor de Tareas por Reconocimiento de Voz" />
        <meta property="og:description" content="Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas, notas y eventos de calendario usando procesamiento avanzado de lenguaje natural. Sin registro requerido, funciona completamente offline, protección completa de privacidad. 99% de precisión en reconocimiento de voz." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tickk.app/es" />
        <meta property="og:image" content="https://tickk.app/og-image.svg" />
        <meta property="og:image:alt" content="tickk - Aplicación de Voz a Productividad" />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="tickk" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tickkapp" />
        <meta name="twitter:creator" content="@tickkapp" />
        <meta name="twitter:title" content="Aplicación Gratuita de Productividad por Voz | tickk - Gestor de Tareas por Reconocimiento de Voz" />
        <meta name="twitter:description" content="Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas, notas y eventos de calendario usando procesamiento avanzado de lenguaje natural. Sin registro requerido, funciona completamente offline, protección completa de privacidad. 99% de precisión en reconocimiento de voz." />
        <meta name="twitter:image" content="https://tickk.app/og-image.svg" />
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
      </Layout>
    </>
  )
}