/**
 * BraindumpInterface Component
 * The core braindump capture interface with voice recording and session management
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'
import { StorageService } from '@/lib/storage/storage-service'
import { VoiceClassifier } from '@/lib/classification/classifier'
import { trackPageInteraction } from '@/lib/analytics'
import { AccessibilityAnnouncer } from '@/lib/services/announcer.service'
import { ErrorMessages, SuccessMessages } from '@/lib/utils/error-messages'
import ProcessBraindumpModal from './ProcessBraindumpModal'
import EditItemModal from './EditItemModal'
import DeleteConfirmModal from './DeleteConfirmModal'
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
  onModeSwitch?: (mode: 'braindump' | 'organized') => void // New prop for mode switching
  showMainInterface?: boolean // Controls whether to show the main recording interface
}

export default function BraindumpInterface({
  appData,
  preferences,
  onDataUpdate,
  onRecordingStateChange,
  onRecordingControls,
  onRecordingStatusUpdate,
  onModeSwitch,
  showMainInterface = true
}: BraindumpInterfaceProps) {
  // Recording state
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [recordingError, setRecordingError] = useState<string | null>(null)
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null)
  
  // Text input fallback state
  const [textInput, setTextInput] = useState('')
  
  // Use ref to store transcript for immediate access in callbacks
  const transcriptRef = useRef('')
  
  // Session state
  const [currentSession, setCurrentSession] = useState<BraindumpSession | null>(null)
  const [recentItems, setRecentItems] = useState<VoiceItem[]>([])
  
  // Processing modal state
  const [showProcessModal, setShowProcessModal] = useState(false)
  const [itemsToProcess, setItemsToProcess] = useState<VoiceItem[]>([])
  
  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<VoiceItem | null>(null)
  
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<VoiceItem | null>(null)
  
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
      recognitionInstance.lang = 'en-US'
      recognitionInstance.maxAlternatives = 1
      
      setRecognition(recognitionInstance)
      setIsSupported(true)
      onRecordingStatusUpdate?.({ isSupported: true })
    } else {
      setIsSupported(false)
      // Don't set recordingError since we have a text input fallback
      onRecordingStatusUpdate?.({
        isSupported: false
      })
    }
  }, [onRecordingStatusUpdate])
  
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
    const unprocessedCount = appData.braindump.filter(item => !item.processed).length
    const processItems = () => {
      const unprocessedItems = appData.braindump.filter(item => !item.processed)
      if (unprocessedItems.length > 0) {
        setItemsToProcess(unprocessedItems)
        setShowProcessModal(true)
      }
    }

    onRecordingControls?.({
      startRecording,
      stopRecording,
      canProcess: unprocessedCount > 0,
      processItems
    })
  }, [startRecording, stopRecording, appData.braindump, onRecordingControls])

  /**
   * Notify parent of recording state changes
   */
  useEffect(() => {
    onRecordingStateChange?.(isRecording)
  }, [isRecording, onRecordingStateChange])
  
  /**
   * Handle completed transcript
   * Now supports multi-item braindumps (automatically splits and classifies)
   */
  const handleTranscriptComplete = useCallback(async (transcript: string) => {
    if (!transcript.trim()) return

    setIsProcessing(true)

    try {
      // Process the transcript (splits into multiple items if needed and classifies each)
      classifier.setLanguage('en')
      const processedItems = await classifier.processBraindump(transcript)

      // Create braindump items for each processed result
      const newItems: VoiceItem[] = processedItems.map(result => ({
        id: crypto.randomUUID(),
        text: result.text,
        timestamp: new Date().toISOString(),
        sessionId: currentSession?.id || crypto.randomUUID(),
        processed: false,
        confidence: result.classification.confidence,
        classification: result.classification,
        metadata: {
          source: 'braindump',
          duration: 0,
          retryCount: 0
        }
      }))

      // Update app data with all new items
      const updatedData: AppData = {
        ...appData,
        braindump: [...appData.braindump, ...newItems]
      }

      // Update session
      if (currentSession) {
        const updatedSession = {
          ...currentSession,
          itemCount: currentSession.itemCount + newItems.length,
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

      // Announce success with count of items added
      const itemCount = newItems.length
      const itemWord = itemCount === 1 ? 'item' : 'items'
      announcer.announceBraindumpAction('item-added', {
        count: updatedData.braindump.length
      })
      announcer.announce(`Added ${itemCount} ${itemWord}. Click Organize to categorize your thoughts.`, 'polite')

      // Track success
      trackPageInteraction('braindump_items_added', `count_${itemCount}`)

      setCurrentTranscript('')
      setLastAddedItem(`${itemCount} ${itemWord} added`)
      toast.success(`${itemCount} ${itemWord} added!`)
      onRecordingStatusUpdate?.({ transcript: '' })

      // Clear success notification after 3 seconds
      setTimeout(() => setLastAddedItem(null), 3000)

    } catch (error) {
      console.error('Failed to process transcript:', error)
      setRecordingError(ErrorMessages.PROCESSING_FAILED)
      toast.error(ErrorMessages.PROCESSING_FAILED)
      announcer.announce('Failed to process recording', 'assertive')
    } finally {
      setIsProcessing(false)
    }
  }, [currentSession, appData, classifier, storageService, onDataUpdate, announcer, onRecordingStatusUpdate])

  /**
   * Handle text input submission (for browsers without speech support)
   */
  const handleTextSubmit = useCallback(async () => {
    const text = textInput.trim()
    if (!text) return
    
    // Clear the input immediately for better UX
    setTextInput('')
    
    // Process the text the same way as voice transcript
    await handleTranscriptComplete(text)
  }, [textInput, handleTranscriptComplete])
  
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
      
      // Automatically switch to organized mode to show the results
      if (onModeSwitch) {
        setTimeout(() => {
          onModeSwitch('organized')
        }, 500) // Small delay to ensure smooth transition
      }
      
      toast.success(SuccessMessages.PROCESSING_COMPLETE)
      trackPageInteraction('braindump_session_completed', `${organizedData.tasks.length}_tasks_${organizedData.notes.length}_notes`)
      
    } catch (error) {
      console.error('Failed to complete processing:', error)
      toast.error(ErrorMessages.PROCESSING_FAILED)
    }
  }, [appData, storageService, onDataUpdate, onModeSwitch])
  
  /**
   * Handle processing modal close
   */
  const handleProcessingClose = useCallback(() => {
    setShowProcessModal(false)
    setItemsToProcess([])
  }, [])
  
  /**
   * Handle edit item
   */
  const handleEditItem = useCallback((item: VoiceItem) => {
    setItemToEdit(item)
    setShowEditModal(true)
  }, [])
  
  /**
   * Handle save edited item
   */
  const handleSaveEditedItem = useCallback(async (updatedItem: VoiceItem) => {
    try {
      const updatedBraindump = appData.braindump.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
      
      const updatedData: AppData = {
        ...appData,
        braindump: updatedBraindump
      }
      
      await storageService.saveAllData(updatedData)
      onDataUpdate(updatedData)
      
      toast.success(SuccessMessages.UPDATE_SUCCESS)
      announcer.announce('Item updated successfully', 'polite')
      trackPageInteraction('braindump_item_edited', 'braindump')
      
    } catch (error) {
      console.error('Failed to update item:', error)
      toast.error(ErrorMessages.STORAGE_UPDATE_FAILED)
      announcer.announce('Failed to update item', 'assertive')
    }
  }, [appData, storageService, onDataUpdate, announcer])
  
  /**
   * Handle delete item - show custom modal
   */
  const handleDeleteItem = useCallback((item: VoiceItem) => {
    setItemToDelete(item)
    setShowDeleteModal(true)
  }, [])

  /**
   * Handle confirm delete
   */
  const handleConfirmDelete = useCallback(async () => {
    if (!itemToDelete) return
    
    try {
      const updatedBraindump = appData.braindump.filter(item => item.id !== itemToDelete.id)
      
      const updatedData: AppData = {
        ...appData,
        braindump: updatedBraindump
      }
      
      await storageService.saveAllData(updatedData)
      onDataUpdate(updatedData)
      
      toast.success(SuccessMessages.DELETE_SUCCESS)
      announcer.announce('Item deleted successfully', 'polite')
      trackPageInteraction('braindump_item_deleted', 'braindump')
      
      setShowDeleteModal(false)
      setItemToDelete(null)
      
    } catch (error) {
      console.error('Failed to delete item:', error)
      toast.error(ErrorMessages.STORAGE_DELETE_FAILED)
      announcer.announce('Failed to delete item', 'assertive')
    }
  }, [itemToDelete, appData, storageService, onDataUpdate, announcer])

  /**
   * Handle cancel delete
   */
  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false)
    setItemToDelete(null)
  }, [])
  
  /**
   * Update the process button to use the modal
   */
  const handleOrganizeClick = useCallback(() => {
    const unprocessedItems = appData.braindump.filter(item => !item.processed)
    
    if (unprocessedItems.length === 0) {
      toast.error('No unprocessed items to organize!')
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
      
      // Check if user is typing in an input field
      const target = event.target as HTMLElement
      const isInputElement = target.tagName === 'INPUT' || 
                            target.tagName === 'TEXTAREA' || 
                            target.contentEditable === 'true' ||
                            target.isContentEditable ||
                            target.closest('textarea') !== null ||
                            target.closest('input') !== null ||
                            target.closest('[contenteditable]') !== null
      
      // Don't trigger shortcuts when typing in input fields
      if (isInputElement || document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'INPUT') return
      
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
      <a href={isSupported ? "#recording-button" : "#text-input"} className="sr-only focus:not-sr-only">
        {isSupported ? "Skip to recording button" : "Skip to text input"}
      </a>
      
      {/* Simple intro for first-time users */}
      {appData.braindump.length === 0 && (
        <div 
          className="border border-gray-200 rounded-md p-4 mb-6 bg-gray-50"
          role="region"
          aria-label="Getting started instructions"
        >
          <p className="text-sm text-gray-600 text-center">
            {isSupported
              ? "Press the microphone to capture your thoughts"
              : "Type your thoughts below to get started"
            }
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
            Clear Data (Dev)
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
                Current session: {currentSession.itemCount} items captured
              </div>
            )}
            
            {/* Success Notification */}
            {lastAddedItem && (
              <div 
                className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4 text-sm text-gray-700"
                role="status"
                aria-live="polite"
              >
                ✅ Added: {lastAddedItem}
                <br />
                <span className="text-xs opacity-75">Click Organize to categorize your thoughts</span>
              </div>
            )}
            
            {/* Recording Button or Text Input */}
            {isSupported ? (
              <div className="mb-4">
                <div className="flex flex-col items-center gap-3">
                  <button
                    id="recording-button"
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isProcessing}
                    aria-label={
                      isRecording
                        ? 'Stop recording (currently recording)'
                        : 'Start voice recording'
                    }
                    aria-pressed={isRecording}
                    aria-describedby="recording-help"
                    className={`w-16 h-16 rounded-full border-2 transition-all ${
                      isRecording
                        ? 'bg-red-500 border-red-600 text-white shadow-lg scale-105'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    } text-sm font-medium`}
                  >
                    {isRecording ? '⏸' : '🎤'}
                  </button>

                  {/* Animated Waveform Bars */}
                  {isRecording && (
                    <div className="flex items-center justify-center gap-1.5 h-12 px-4" role="presentation" aria-hidden="true">
                      <div className="w-1.5 bg-red-500 rounded-full animate-wave" style={{ animationDelay: '0ms', height: '12px' }}></div>
                      <div className="w-1.5 bg-red-500 rounded-full animate-wave" style={{ animationDelay: '150ms', height: '20px' }}></div>
                      <div className="w-1.5 bg-red-500 rounded-full animate-wave" style={{ animationDelay: '300ms', height: '28px' }}></div>
                      <div className="w-1.5 bg-red-500 rounded-full animate-wave" style={{ animationDelay: '450ms', height: '36px' }}></div>
                      <div className="w-1.5 bg-red-500 rounded-full animate-wave" style={{ animationDelay: '600ms', height: '28px' }}></div>
                      <div className="w-1.5 bg-red-500 rounded-full animate-wave" style={{ animationDelay: '750ms', height: '20px' }}></div>
                      <div className="w-1.5 bg-red-500 rounded-full animate-wave" style={{ animationDelay: '900ms', height: '12px' }}></div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <div className="max-w-md mx-auto">
                  <textarea
                    id="text-input"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => {
                      // Prevent spacebar from triggering global shortcuts
                      if (e.key === ' ') {
                        e.stopPropagation()
                      }
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleTextSubmit()
                      }
                    }}
                    placeholder="Type your thoughts here..."
                    disabled={isProcessing}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    rows={3}
                    aria-label="Enter your thoughts"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      Press Enter to add • Shift+Enter for new line
                    </span>
                    <button
                      onClick={handleTextSubmit}
                      disabled={!textInput.trim() || isProcessing}
                      className="px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Hidden help text for screen readers */}
            <div id="recording-help" className="sr-only">
              Press the button to start or stop recording your thoughts
            </div>
            
            {/* Recording Status */}
            <div className="mb-4" role="status" aria-live="polite">
              {isRecording && (
                <p className="text-sm text-gray-600">
                  Recording...
                </p>
              )}
              {isProcessing && (
                <p className="text-sm text-gray-600">
                  Processing...
                </p>
              )}
              {!isRecording && !isProcessing && isSupported && (
                <p className="text-sm text-gray-500">
                  Click to start recording
                  {preferences?.enableKeyboardShortcuts && (
                    <span className="block text-xs mt-1">Press spacebar to record</span>
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
            

          </div>
        </div>
      )}
      
      {/* Recent Items & Process Button - ACTIVE WORK AREA */}
      {recentItems.length > 0 && (
        <div 
          className="border-2 border-orange-300 rounded-xl p-6 bg-gradient-to-br from-orange-50/50 to-amber-50/30 shadow-lg ring-2 ring-orange-100"
          role="region"
          aria-label="Recent captured thoughts"
        >
          {/* Work Area Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Your Braindumps
                </h3>
                <p className="text-xs text-gray-600">
                  {recentItems.length} {recentItems.length === 1 ? 'item' : 'items'} ready to organize
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {recentItems.length > 0 && (
                <span className="text-xs text-orange-600 font-medium animate-pulse">
                  Click Organize →
                </span>
              )}
              <button
                onClick={handleOrganizeClick}
                disabled={isProcessing || recentItems.length === 0}
                aria-label="Organize your captured thoughts into tasks and notes"
                aria-describedby="organize-help"
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md ${
                  recentItems.length > 0
                    ? 'bg-orange-500 hover:bg-orange-600 text-white border-2 border-orange-400 hover:shadow-lg hover:scale-105'
                    : 'bg-gray-300 text-gray-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isProcessing ? 'Processing...' : recentItems.length > 0 ? `Organize (${recentItems.length})` : 'Organize'}
              </button>
            </div>
          </div>

          <div id="organize-help" className="sr-only">
            Click to organize your braindump items into tasks and notes
          </div>

          <ul className="space-y-2" role="list" aria-label="Recent captured thoughts">
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          aria-label="Mark as completed"
                        />
                        <span aria-label={`Recorded at ${new Date(item.timestamp).toLocaleString()}`}>
                          ⏰ {new Date(item.timestamp).toLocaleString()}
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
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          aria-label="Edit this item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          aria-label="Delete this item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
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
      
      {/* Edit Item Modal */}
      {showEditModal && (
        <EditItemModal
          isOpen={showEditModal}
          item={itemToEdit}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEditedItem}
          type="braindump"
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          itemText={itemToDelete.text}
          itemType="braindump"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  )
}
