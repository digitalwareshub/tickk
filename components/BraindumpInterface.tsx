/**
 * BraindumpInterface Component
 * The core braindump capture interface with voice recording and session management
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { StorageService } from '@/lib/storage/storage-service'
import { VoiceClassifier } from '@/lib/classification/classifier'
import { trackPageInteraction } from '@/lib/analytics'
import { AccessibilityAnnouncer } from '@/lib/services/announcer.service'
import ProcessBraindumpModal from './ProcessBraindumpModal'
import { useLanguage } from '@/contexts/LanguageContext'
import type { AppData, UserPreferences, VoiceItem, BraindumpSession } from '@/types/braindump'

interface BraindumpInterfaceProps {
  appData: AppData
  preferences: UserPreferences | null
  onDataUpdate: (data: AppData) => void
  onRecordingStateChange?: (isRecording: boolean) => void
  onRecordingControls?: (controls: {
    startRecording: () => void
    stopRecording: () => void
    canProcess: boolean
    processItems: () => void
  }) => void
  onRecordingStatusUpdate?: (status: {
    transcript?: string
    error?: string | null
    isSupported?: boolean
  }) => void
  showMainInterface?: boolean // Controls whether to show the main recording interface
}

export default function BraindumpInterface({ 
  appData, 
  preferences, 
  onDataUpdate,
  onRecordingStateChange,
  onRecordingControls,
  onRecordingStatusUpdate,
  showMainInterface = true
}: BraindumpInterfaceProps) {
  const { language, t } = useLanguage()
  // Recording state
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [recordingError, setRecordingError] = useState<string | null>(null)
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null)
  
  // Use ref to store transcript for immediate access in callbacks
  const transcriptRef = useRef('')
  
  // Session state
  const [currentSession, setCurrentSession] = useState<BraindumpSession | null>(null)
  const [recentItems, setRecentItems] = useState<VoiceItem[]>([])
  
  // Processing modal state
  const [showProcessModal, setShowProcessModal] = useState(false)
  const [itemsToProcess, setItemsToProcess] = useState<VoiceItem[]>([])
  
  // Services
  const [storageService] = useState(() => StorageService.getInstance())
  const [classifier] = useState(() => VoiceClassifier.getInstance())
  const [announcer] = useState(() => AccessibilityAnnouncer.getInstance())
  
  // Web Speech API references
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recognition, setRecognition] = useState<any>(null)
  const [isSupported, setIsSupported] = useState(false)
  
  /**
   * Initialize speech recognition
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = true
      recognitionInstance.lang = language === 'es' ? 'es-ES' : 'en-US'
      recognitionInstance.maxAlternatives = 1
      
      setRecognition(recognitionInstance)
      setIsSupported(true)
      onRecordingStatusUpdate?.({ isSupported: true })
    } else {
      setIsSupported(false)
      setRecordingError(t('braindump.speech_not_supported'))
      onRecordingStatusUpdate?.({ 
        isSupported: false, 
        error: t('braindump.speech_not_supported') 
      })
    }
  }, [language, onRecordingStatusUpdate, t])
  
  /**
   * Load recent braindump items on mount
   */
  useEffect(() => {
    const loadRecentItems = () => {
      // Get the 5 most recent unprocessed braindump items
      const recent = appData.braindump
        .filter(item => !item.processed)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5)
      
      setRecentItems(recent)
    }
    
    loadRecentItems()
  }, [appData.braindump])
  
  /**
   * Start voice recording
   */
  const startRecording = useCallback(async () => {
    if (!recognition || !isSupported) {
      setRecordingError('Speech recognition not available')
      return
    }
    
    setRecordingError(null)
    setCurrentTranscript('')
    transcriptRef.current = ''
    setIsRecording(true)
    onRecordingStatusUpdate?.({ transcript: '', error: null })
    
    // Create new session if none exists
    if (!currentSession) {
      const newSession: BraindumpSession = {
        id: crypto.randomUUID(),
        startTime: new Date().toISOString(),
        endTime: undefined,
        itemCount: 0,
        processed: false
      }
      setCurrentSession(newSession)
    }
    
    // Set up recognition event handlers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      transcriptRef.current = transcript
      setCurrentTranscript(transcript)
      onRecordingStatusUpdate?.({ transcript })
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      const errorMessage = `Recording error: ${event.error}`
      setRecordingError(errorMessage)
      setIsRecording(false)
      onRecordingStatusUpdate?.({ error: errorMessage })
    }
    
    recognition.onend = () => {
      setIsRecording(false)
      const finalTranscript = transcriptRef.current.trim()
      if (finalTranscript) {
        handleTranscriptComplete(finalTranscript)
      }
    }
    
    // Start recording
    try {
      recognition.start()
      announcer.announceRecordingStatus('started')
      trackPageInteraction('voice_recording_started', 'braindump')
    } catch (error) {
      console.error('Failed to start recording:', error)
      setRecordingError('Failed to start recording')
      announcer.announce('Failed to start recording', 'assertive')
      setIsRecording(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recognition, isSupported, currentSession, currentTranscript, announcer])
  
  /**
   * Stop voice recording
   */
  const stopRecording = useCallback(() => {
    if (recognition && isRecording) {
      recognition.stop()
      announcer.announceRecordingStatus('stopped')
    }
  }, [recognition, isRecording, announcer])
  
  /**
   * Provide recording controls to parent for keyboard shortcuts
   */
  useEffect(() => {
    onRecordingControls?.({
      startRecording,
      stopRecording,
      canProcess: recentItems.length >= 5,
      processItems: () => setShowProcessModal(true)
    })
  }, [startRecording, stopRecording, recentItems.length, onRecordingControls])

  /**
   * Notify parent of recording state changes
   */
  useEffect(() => {
    onRecordingStateChange?.(isRecording)
  }, [isRecording, onRecordingStateChange])
  
  /**
   * Handle completed transcript
   */
  const handleTranscriptComplete = useCallback(async (transcript: string) => {
    if (!transcript.trim()) return
    
    setIsProcessing(true)
    
    try {
      // Create new braindump item
      const newItem: VoiceItem = {
        id: crypto.randomUUID(),
        text: transcript,
        timestamp: new Date().toISOString(),
        sessionId: currentSession?.id || crypto.randomUUID(),
        processed: false,
        confidence: undefined,
        classification: undefined,
        metadata: {
          source: 'braindump',
          duration: 0, // TODO: Track actual recording duration
          retryCount: 0
        }
      }
      
      // Set language for classifier and classify the item
      classifier.setLanguage(language)
      const classificationResult = await classifier.classify(newItem.text)
      newItem.classification = classificationResult
      newItem.confidence = classificationResult.confidence
      
      // Update app data
      const updatedData: AppData = {
        ...appData,
        braindump: [...appData.braindump, newItem]
      }
      
      // Update session
      if (currentSession) {
        const updatedSession = {
          ...currentSession,
          itemCount: currentSession.itemCount + 1,
          endTime: new Date().toISOString()
        }
        setCurrentSession(updatedSession)
        
        // Update sessions in app data
        const existingSessionIndex = updatedData.sessions.findIndex(s => s.id === currentSession.id)
        if (existingSessionIndex >= 0) {
          updatedData.sessions[existingSessionIndex] = updatedSession
        } else {
          updatedData.sessions.push(updatedSession)
        }
      }
      
      // Save to storage and update parent
      await storageService.saveAllData(updatedData)
      onDataUpdate(updatedData)
      
      // Announce success with more helpful feedback
      announcer.announceBraindumpAction('item-added', { 
        count: updatedData.braindump.length 
      })
      announcer.announce(`Added: "${transcript.slice(0, 50)}${transcript.length > 50 ? '...' : ''}". Click Organize to categorize your thoughts.`, 'polite')
      
      // Track success
      trackPageInteraction('braindump_item_added', classificationResult.category)
      
      setCurrentTranscript('')
      setLastAddedItem(transcript.slice(0, 50) + (transcript.length > 50 ? '...' : ''))
      onRecordingStatusUpdate?.({ transcript: '' })
      
      // Clear success notification after 3 seconds
      setTimeout(() => setLastAddedItem(null), 3000)
      
    } catch (error) {
      console.error('Failed to process transcript:', error)
      setRecordingError('Failed to process recording')
      announcer.announce('Failed to process recording', 'assertive')
    } finally {
      setIsProcessing(false)
    }
  }, [currentSession, appData, classifier, storageService, onDataUpdate, announcer, language, onRecordingStatusUpdate])
  
  /**
   * Handle completion of processing modal
   */
  const handleProcessingComplete = useCallback(async (organizedData: { tasks: VoiceItem[]; notes: VoiceItem[] }) => {
    try {
      // Get the IDs of items that were processed
      const processedIds = new Set([
        ...organizedData.tasks.map(t => t.id),
        ...organizedData.notes.map(n => n.id)
      ])
      
      // Mark braindump items as processed
      const updatedBraindump = appData.braindump.map(item => 
        processedIds.has(item.id) 
          ? { ...item, processed: true }
          : item
      )
      
      // Add organized items to their respective collections
      const updatedAppData: AppData = {
        ...appData,
        braindump: updatedBraindump,
        tasks: [...appData.tasks, ...organizedData.tasks],
        notes: [...appData.notes, ...organizedData.notes]
      }
      
      // Save to storage
      await storageService.saveAllData(updatedAppData)
      
      // Update parent state
      onDataUpdate(updatedAppData)
      
      // Close modal
      setShowProcessModal(false)
      setItemsToProcess([])
      
      trackPageInteraction('braindump_session_completed', `${organizedData.tasks.length}_tasks_${organizedData.notes.length}_notes`)
      
    } catch (error) {
      console.error('Failed to complete processing:', error)
      alert('Failed to save organized items. Please try again.')
    }
  }, [appData, storageService, onDataUpdate])
  
  /**
   * Handle processing modal close
   */
  const handleProcessingClose = useCallback(() => {
    setShowProcessModal(false)
    setItemsToProcess([])
  }, [])
  
  /**
   * Update the process button to use the modal
   */
  const handleOrganizeClick = useCallback(() => {
    const unprocessedItems = appData.braindump.filter(item => !item.processed)
    
    if (unprocessedItems.length === 0) {
      alert('No unprocessed items to organize!')
      return
    }
    
    // Show the processing modal with unprocessed items
    setItemsToProcess(unprocessedItems)
    setShowProcessModal(true)
    
    trackPageInteraction('braindump_processing_started', `${unprocessedItems.length}_items`)
  }, [appData.braindump])
  
  /**
   * Handle keyboard shortcuts
   */
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!preferences?.enableKeyboardShortcuts) return
      
      // Space bar to start/stop recording
      if (event.code === 'Space' && !event.repeat) {
        event.preventDefault()
        if (isRecording) {
          stopRecording()
        } else {
          startRecording()
        }
      }
      
      // Enter to process items
      if (event.code === 'Enter' && event.ctrlKey) {
        event.preventDefault()
        handleOrganizeClick()
      }
    }
    
    if (preferences?.enableKeyboardShortcuts) {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isRecording, preferences, startRecording, stopRecording, handleOrganizeClick])
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8" role="main" aria-label="Braindump recording interface">
      {/* Skip to content link */}
      <a href="#recording-button" className="sr-only focus:not-sr-only">
        Skip to recording button
      </a>
      
      {/* Simple intro for first-time users */}
      {appData.braindump.length === 0 && (
        <div 
          className="border border-gray-200 rounded-md p-4 mb-6 bg-gray-50"
          role="region"
          aria-label="Getting started instructions"
        >
          <p className="text-sm text-gray-600 text-center">
            Press the microphone to record your thoughts. We&apos;ll organize them later.
          </p>
        </div>
      )}

      {/* Development: Clear Data Button */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-center mb-4">
          <button
            onClick={async () => {
              await StorageService.getInstance().clearAllData()
              window.location.reload()
            }}
            className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 rounded border"
          >
{t('braindump.clear_data')}
          </button>
        </div>
      )}
      
      {/* Main Recording Interface */}
      {showMainInterface && (
        <div className="text-center mb-8">
          <div 
            className="border border-gray-200 rounded-lg p-6 bg-white"
            role="region"
            aria-label="Voice recording controls"
          >
            
            {/* Current Session Info */}
            {currentSession && (
              <div 
                className="bg-gray-50 rounded-md p-3 mb-4 text-sm text-gray-600"
                role="status"
                aria-live="polite"
              >
{t('braindump.session_info').replace('{count}', currentSession.itemCount.toString())}
              </div>
            )}
            
            {/* Success Notification */}
            {lastAddedItem && (
              <div 
                className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4 text-sm text-gray-700"
                role="status"
                aria-live="polite"
              >
                ✅ {t('braindump.added_item').replace('{text}', lastAddedItem)}
                <br />
                <span className="text-xs opacity-75">{t('braindump.click_organize')}</span>
              </div>
            )}
            
            {/* Recording Button */}
            <div className="mb-4">
              <button
                id="recording-button"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={!isSupported || isProcessing}
                aria-label={
                  isRecording 
                    ? 'Stop recording (currently recording)' 
                    : isSupported 
                      ? 'Start voice recording' 
                      : 'Voice recording not supported'
                }
                aria-pressed={isRecording}
                aria-describedby="recording-help"
                className={`w-16 h-16 rounded-full border-2 transition-colors ${
                  isRecording
                    ? 'bg-gray-100 border-gray-300 text-gray-700'
                    : isSupported
                    ? 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                } text-sm font-medium`}
              >
{isRecording ? t('braindump.stop') : t('braindump.record')}
              </button>
            </div>
            
            {/* Hidden help text for screen readers */}
            <div id="recording-help" className="sr-only">
              {t('braindump.recording_help')}
            </div>
            
            {/* Recording Status */}
            <div className="mb-4" role="status" aria-live="polite">
              {isRecording && (
                <p className="text-sm text-gray-600">
                  {t('braindump.recording')}
                </p>
              )}
              {isProcessing && (
                <p className="text-sm text-gray-600">
                  {t('braindump.processing')}
                </p>
              )}
              {!isRecording && !isProcessing && isSupported && (
                <p className="text-sm text-gray-500">
                  {t('braindump.click_to_record')}
                  {preferences?.enableKeyboardShortcuts && (
                    <span className="block text-xs mt-1">{t('braindump.spacebar_shortcut')}</span>
                  )}
                </p>
              )}
            </div>
            
            {/* Live Transcript */}
            {currentTranscript && (
              <div 
                className="bg-gray-50 rounded-md p-3 mb-4 text-left"
                role="region"
                aria-label="Live transcript"
                aria-live="polite"
              >
                <p className="text-xs text-gray-500 mb-1">Transcript:</p>
                <p className="text-sm text-gray-900">
                  {currentTranscript}
                </p>
              </div>
            )}
            
            {/* Error Display */}
            {recordingError && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4">
                <p className="text-gray-700 text-xs">
                  {recordingError}
                </p>
              </div>
            )}
            
            {/* Browser Support Warning */}
            {!isSupported && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <p className="text-gray-700 text-xs">
                  {t('braindump.speech_not_supported')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Recent Items & Process Button */}
      {recentItems.length > 0 && (
        <div 
          className="border border-gray-200 rounded-lg p-4 bg-white"
          role="region"
          aria-label="Recent captured thoughts"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">
              Recent ({recentItems.length})
            </h3>
            <div className="flex items-center gap-2">
              {recentItems.length > 0 && (
                <span className="text-xs text-gray-500 animate-pulse">
                  Click Organize →
                </span>
              )}
              <button
                onClick={handleOrganizeClick}
                disabled={isProcessing || recentItems.length === 0}
                aria-label={`Organize ${recentItems.length} thoughts into tasks and notes`}
                aria-describedby="organize-help"
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  recentItems.length > 0 
                    ? 'bg-black hover:bg-gray-800 text-white border border-gray-300' 
                    : 'bg-gray-300 text-gray-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isProcessing ? 'Processing...' : `Organize${recentItems.length > 0 ? ` (${recentItems.length})` : ''}`}
              </button>
            </div>
          </div>
          
          <div id="organize-help" className="sr-only">
            This will categorize your thoughts into tasks and notes. 
            You can review and adjust the categorization before applying.
          </div>
          
          <ul className="space-y-2" role="list" aria-label="Recent thoughts">
            {recentItems.map((item) => (
              <li 
                key={item.id} 
                className="bg-gray-50 rounded-md p-3 border border-gray-200"
                role="listitem"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p 
                      className="text-gray-900 font-medium mb-1"
                      id={`item-text-${item.id}`}
                    >
                      &quot;{item.text}&quot;
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span aria-label={`Recorded at ${new Date(item.timestamp).toLocaleString()}`}>
                        ⏰ {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                      {item.classification && (
                        <span 
                          className={`px-2 py-1 rounded text-xs ${
                            item.classification.category === 'tasks' 
                              ? 'bg-gray-100 text-gray-700 border border-gray-200'
                              : 'bg-gray-50 text-gray-600 border border-gray-200'
                          }`}
                          aria-label={`Classified as ${item.classification.category}`}
                        >
                          {item.classification.category}
                        </span>
                      )}
                      {item.confidence && (
                        <span 
                          className="text-gray-400 text-xs"
                          aria-label={`${Math.round(item.confidence * 100)}% confidence`}
                        >
                          {Math.round(item.confidence * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          {preferences?.enableKeyboardShortcuts && (
            <p className="text-xs text-gray-400 mt-3 text-center">
              Ctrl+Enter to organize
            </p>
          )}
        </div>
      )}
      
      {/* Simple Stats */}
      <div className="mt-8 text-center">
        <div className="text-xs text-gray-400 space-x-4">
          <span>{appData.braindump.length} braindumps</span>
          <span>{appData.tasks.length} tasks</span>
          <span>{appData.notes.length} notes</span>
        </div>
      </div>
      
      {/* Processing Modal - The Magic Moment */}
      {showProcessModal && (
        <ProcessBraindumpModal
          items={itemsToProcess}
          onClose={handleProcessingClose}
          onComplete={handleProcessingComplete}
        />
      )}
    </div>
  )
}
