import Head from 'next/head'
import { useEffect, useState, useCallback } from 'react'
import Layout from '@/components/Layout'
import { trackVoiceEvent, trackPageInteraction } from '@/lib/analytics'

// Type for Speech Recognition
type SpeechRecognitionType = {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onstart: ((event: Event) => void) | null
  onresult: ((event: { resultIndex: number; results: { length: number; [index: number]: { [index: number]: { transcript: string }; isFinal: boolean } } }) => void) | null
  onend: ((event: Event) => void) | null
  onerror: ((event: { error: string }) => void) | null
}

interface VoiceItem {
  id: number
  text: string
  timestamp: string
  category: 'tasks' | 'notes'
}

interface VoiceData {
  tasks: VoiceItem[]
  notes: VoiceItem[]
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [status, setStatus] = useState('Click the microphone to start')
  const [data, setData] = useState<VoiceData>({ 
    tasks: [],
    notes: []
  })
  const [recognition, setRecognition] = useState<SpeechRecognitionType | null>(null)
  const [viewMode, setViewMode] = useState<'dashboard' | 'calendar'>('dashboard')

  useEffect(() => {
    setMounted(true)
    
    // Initialize speech recognition
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognitionConstructor()
      
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsRecording(true)
        setStatus('Listening... 🎤')
        trackVoiceEvent('recording_started', 'general')
      }

      recognition.onresult = (event: { resultIndex: number; results: { length: number; [index: number]: { [index: number]: { transcript: string }; isFinal: boolean } } }) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        setTranscription(transcript)
        
        if (event.results[event.results.length - 1].isFinal) {
          processTranscript(transcript)
        }
      }

      recognition.onend = () => {
        setIsRecording(false)
        setStatus('Click the microphone to start')
        trackVoiceEvent('recording_stopped', 'general')
      }

      recognition.onerror = (event: { error: string }) => {
        setIsRecording(false)
        handleSpeechError(event.error)
      }

      setRecognition(recognition as SpeechRecognitionType)
    } else {
      setStatus('Speech recognition not supported in this browser')
    }

    // Load saved data
    loadData()

    // Keyboard shortcut (spacebar)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault()
        toggleRecording()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = useCallback(() => {
    try {
      const savedData = localStorage.getItem('voiceAppData')
      if (savedData) {
        setData(JSON.parse(savedData))
      }
    } catch (error) {
      console.error('Error loading saved data:', error)
    }
  }, [])

  const saveData = useCallback((newData: VoiceData) => {
    try {
      localStorage.setItem('voiceAppData', JSON.stringify(newData))
      setData(newData)
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }, [])

  const classifyText = useCallback((text: string): 'tasks' | 'notes' => {
    const originalText = text.trim()
    
    // Early return for empty text
    if (!originalText) return 'notes'
    
    // 1. INTENT/DESIRE RECOGNITION (Highest Priority) → Notes
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
    
    // 3. STRONG OBLIGATION PATTERNS → Tasks
    const obligationPatterns = [
      /\bi\s+need\s+to\b/i,
      /\bi\s+have\s+to\b/i,
      /\bi\s+must\b/i,
      /\bremember\s+to\b/i,
      /\bdon't\s+forget\s+to\b/i,
      /\bmake\s+sure\s+to\b/i,
      /\btodo\b/i,
      /\btask\b/i,
      /\bschedule\b/i,
      /\bappointment\b/i,
      /\bmeeting\b/i,
      /\bcall\b/i,
      /\bemail\b/i,
      /\bcontact\b/i
    ]
    
    const hasObligation = obligationPatterns.some(pattern => pattern.test(originalText))
    if (hasObligation) {
      return 'tasks'
    }
    
    // 4. ACTION WORDS (only if no intent detected) → Tasks
    const actionPatterns = [
      /\b(?:buy|purchase|get|obtain|acquire)\b/i,
      /\b(?:pick\s+up|collect)\b/i,
      /\b(?:finish|complete|submit|send)\b/i,
      /\b(?:fix|repair|resolve)\b/i,
      /\b(?:create|make|build|write)\b/i,
      /\b(?:book|reserve)\b/i,
      /\b(?:pay|invoice|bill)\b/i,
      /\b(?:clean|organize|tidy)\b/i
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
    
    // 5. NOTE INDICATORS (explicit) → Notes
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
    
    // 6. DEFAULT: Notes (thoughts, observations, general input)
    return 'notes'
  }, [])

  const processTranscript = useCallback((transcript: string) => {
    if (!transcript.trim()) return

    const category = classifyText(transcript)
    const item: VoiceItem = {
      id: Date.now(),
      text: transcript.trim(),
      timestamp: new Date().toISOString(),
      category
    }

    // Track successful classification
    trackVoiceEvent('classification_success', category)

    // Use functional state update to ensure we have the latest data
    setData(currentData => {
      const newData = {
        ...currentData,
        [category]: [...currentData[category], item]
      }
      
      // Save to localStorage
      try {
        localStorage.setItem('voiceAppData', JSON.stringify(newData))
      } catch (error) {
        console.error('Error saving data:', error)
        trackVoiceEvent('classification_error', 'general')
      }
      
      return newData
    })
    
    setTranscription('')
    setStatus(`✅ Added to ${category}: "${transcript.trim().slice(0, 50)}${transcript.length > 50 ? '...' : ''}"`)
    
    setTimeout(() => {
      setStatus('Click the microphone to start')
    }, 3000)
  }, [classifyText])

  const toggleRecording = useCallback(() => {
    if (!recognition) {
      setStatus('Speech recognition not available')
      return
    }

    if (isRecording) {
      recognition.stop()
    } else {
      try {
        recognition.start()
        trackPageInteraction('mic_button_clicked', 'microphone')
      } catch (error) {
        console.error('Speech recognition error:', error)
        setStatus('Error starting speech recognition. Please try again.')
        trackVoiceEvent('classification_error', 'general')
      }
    }
  }, [recognition, isRecording])

  const handleSpeechError = useCallback((error: string) => {
    let message = 'Speech recognition error occurred.'
    
    switch (error) {
      case 'network':
        message = 'Network error. Please check your internet connection.'
        break
      case 'not-allowed':
        message = '❌ Microphone access denied. Please allow microphone access and reload.'
        break
      case 'no-speech':
        message = 'No speech detected. Please try again.'
        break
      case 'audio-capture':
        message = 'No microphone found. Please check your microphone.'
        break
    }
    
    setStatus(message)
    setTimeout(() => {
      setStatus('Click the microphone to start')
    }, 4000)
  }, [])

  const removeItem = useCallback((category: keyof VoiceData, id: number) => {
    const newData = {
      ...data,
      [category]: data[category].filter(item => item.id !== id)
    }
    saveData(newData)
  }, [data, saveData])

  const clearAll = useCallback(() => {
    if (confirm('Are you sure you want to clear all items?')) {
      const newData = { tasks: [], notes: [] }
      saveData(newData)
      // Also manually clear localStorage to ensure it's gone
      try {
        localStorage.removeItem('voiceAppData')
      } catch (error) {
        console.error('Error clearing localStorage:', error)
      }
      trackPageInteraction('clear_all_data', 'clear_button')
    }
  }, [saveData])

  const formatTimestamp = useCallback((timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 60000) {
      return 'Just now'
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }, [])

  const getCategoryColor = useCallback((category: string) => {
    switch (category) {
      case 'tasks': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
      case 'notes': return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }, [])

  const getCategoryHeaderColor = useCallback((category: string) => {
    switch (category) {
      case 'tasks': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
      case 'notes': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
      default: return 'bg-gray-100 dark:bg-gray-900/30'
    }
  }, [])

  // Calendar view functionality
  const getAllEntriesByDate = useCallback(() => {
    const allEntries = [
      ...data.tasks.map(item => ({ ...item, type: 'tasks' as const })),
      ...data.notes.map(item => ({ ...item, type: 'notes' as const }))
    ]

    // Group by date
    const entriesByDate = allEntries.reduce((acc, entry) => {
      const date = new Date(entry.timestamp).toDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(entry)
      return acc
    }, {} as Record<string, Array<VoiceItem & { type: 'tasks' | 'notes' }>>)

    // Sort dates (most recent first) and sort entries within each date
    return Object.entries(entriesByDate)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([date, entries]) => [
        date,
        entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      ] as const)
  }, [data])

  const formatDateHeader = useCallback((dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      })
    }
  }, [])

  const quickAddExample = useCallback((category: 'tasks' | 'notes', example: string) => {
    const item: VoiceItem = {
      id: Date.now(),
      text: example,
      timestamp: new Date().toISOString(),
      category
    }

    const newData = {
      ...data,
      [category]: [...data[category], item]
    }

    saveData(newData)
    setStatus(`✅ Added example to ${category}`)
    setTimeout(() => {
      setStatus('Click the microphone to start')
    }, 2000)
  }, [data, saveData])

  if (!mounted) return null

  return (
    <>
      <Head>
        <title>Voice-to-Productivity Dashboard | OnePageOS</title>
        <meta name="description" content="Transform your voice into organized tasks and notes with mobile-first design" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Layout 
        className="relative isolate min-h-screen bg-gray-50 dark:bg-slate-800 text-zinc-900 dark:text-gray-100 transition-colors duration-300"
        seoTitle="Free Voice Productivity App | OnePageOS - Speech Recognition Dashboard"
        seoDescription="Transform your voice into organized tasks and notes instantly. Advanced speech recognition with natural language processing. No login required, works offline, complete privacy."
      >
        {/* Grid background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 grid-bg"></div>

        {/* Main Content */}
        <section className="relative bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-8 pb-16">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 px-4 sm:px-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4">
                Voice-to-Productivity
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent block mt-1 sm:mt-0">
                  Dashboard
                </span>
              </h1>
                            <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Start speaking to automatically organize your thoughts into tasks and notes
              </p>
              
              {/* SEO-friendly feature list */}
              <div className="max-w-4xl mx-auto mb-4">
                {/* Desktop: Single row */}
                <div className="hidden md:grid grid-cols-6 gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div>🔒 Complete Privacy</div>
                  <div>⚡ 99% Speech Accuracy</div>
                  <div>🆓 Free Forever</div>
                  <div>📱 Works Offline</div>
                  <div>🧠 No AI Used</div>
                  <div>🌐 All Devices</div>
                </div>
                {/* Mobile: Two rows */}
                <div className="md:hidden grid grid-cols-3 gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div>🔒 Privacy</div>
                  <div>⚡ 99% Accuracy</div>
                  <div>🆓 Free</div>
                  <div>📱 Offline</div>
                  <div>🧠 No AI</div>
                  <div>🌐 Universal</div>
                </div>
              </div>
              
              {/* View Mode Toggle */}
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-700 p-1">
                <button
                  onClick={() => setViewMode('dashboard')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'dashboard'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  📊 Dashboard
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'calendar'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  📅 Calendar View
                </button>
              </div>
            </div>

            {/* Voice Input Section */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-gray-200/50 dark:border-slate-700/50 mx-4 sm:mx-0">
              {/* Voice Interface */}
              <div className="text-center mb-4 sm:mb-6">
                <button 
                  onClick={toggleRecording}
                  className={`voice-button w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl lg:text-3xl mx-auto mb-4 shadow-lg transition-all ${isRecording ? 'recording scale-110 animate-pulse-slow' : 'hover:scale-105'}`}
                  disabled={!recognition}
                >
                  {isRecording ? (
                    <div className="spinner"></div>
                  ) : (
                    <span>🎤</span>
                  )}
                </button>
                
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 px-2">
                  {status}
                </div>
                
                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm bg-gray-50/80 dark:bg-slate-700/80 rounded-lg p-3 sm:p-4 min-h-[50px] sm:min-h-[60px] border border-gray-200 dark:border-slate-600 backdrop-blur-sm max-w-2xl mx-auto">
                  {transcription || 'Your speech will appear here...'}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <button 
                  onClick={clearAll}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors font-medium"
                >
                  🗑️ Clear All
                </button>
                <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 flex items-center">
                  💡 Press Space to record
                </div>
              </div>
            </div>

            {/* Quick Examples */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 mb-6 sm:mb-8 border border-orange-200 dark:border-orange-800 mx-4 sm:mx-0">
              <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-3">💡 Try these examples:</h3>
              <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
                <button 
                  onClick={() => quickAddExample('tasks', 'Remember to finish the quarterly report by Friday')}
                  className="bg-white dark:bg-slate-800 p-3 rounded-lg text-left hover:shadow-md transition-shadow border border-orange-200 dark:border-orange-700"
                >
                  <div className="font-medium text-blue-600 dark:text-blue-400 mb-1">📋 Task:</div>
                  <div className="text-gray-600 dark:text-gray-300 text-xs">&quot;Remember to finish the quarterly report by Friday&quot;</div>
                </button>
                <button 
                  onClick={() => quickAddExample('notes', 'Great idea for the new project design')}
                  className="bg-white dark:bg-slate-800 p-3 rounded-lg text-left hover:shadow-md transition-shadow border border-orange-200 dark:border-orange-700"
                >
                  <div className="font-medium text-green-600 dark:text-green-400 mb-1">📝 Note:</div>
                  <div className="text-gray-600 dark:text-gray-300 text-xs">&quot;Great idea for the new project design&quot;</div>
                </button>
              </div>
            </div>

            {/* Demo Controls */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-3 items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  📊 {data.tasks.length + data.notes.length} total entries
                </span>
                <button
                  onClick={() => {
                    const demoData = {
                      tasks: [
                        { id: 1, text: 'Buy groceries for the week', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), category: 'tasks' as const },
                        { id: 2, text: 'Call the dentist to schedule appointment', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), category: 'tasks' as const },
                        { id: 3, text: 'Finish the quarterly report by Friday', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), category: 'tasks' as const },
                        { id: 4, text: 'Pick up dry cleaning after work', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), category: 'tasks' as const },
                        { id: 5, text: 'Review and approve team budget proposal', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), category: 'tasks' as const },
                        { id: 6, text: 'Book flight tickets for next month trip', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), category: 'tasks' as const },
                        { id: 7, text: 'Update project timeline with stakeholders', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), category: 'tasks' as const },
                        { id: 8, text: 'Organize team building event for Q4', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), category: 'tasks' as const },
                        { id: 9, text: 'Send follow-up emails to potential clients', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), category: 'tasks' as const },
                        { id: 10, text: 'Prepare presentation for board meeting', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), category: 'tasks' as const }
                      ],
                      notes: [
                        { id: 11, text: 'Remember the new password policy starts next month', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), category: 'notes' as const },
                        { id: 12, text: 'Great idea from Sarah about improving customer onboarding', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), category: 'notes' as const },
                        { id: 13, text: 'Coffee shop on 5th street has excellent Wi-Fi for remote work', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), category: 'notes' as const },
                        { id: 14, text: 'New React framework update includes better TypeScript support', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), category: 'notes' as const },
                        { id: 15, text: 'Client mentioned they prefer weekly updates instead of daily', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(), category: 'notes' as const },
                        { id: 16, text: 'The marketing team needs design assets by end of week', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(), category: 'notes' as const },
                        { id: 17, text: 'Interesting article about AI productivity tools in Forbes', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), category: 'notes' as const },
                        { id: 18, text: 'Reminder that office parking permits expire next quarter', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), category: 'notes' as const },
                        { id: 19, text: 'New supplier offers 20% discount for bulk orders over $5000', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(), category: 'notes' as const },
                        { id: 20, text: 'Team feedback suggests more flexible work-from-home policy', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(), category: 'notes' as const }
                      ]
                    };
                    setData(demoData);
                  }}
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
                  title="Load 20 sample entries to test scrolling"
                >
                  📝 Load Demo Data
                </button>
                <button
                  onClick={() => setData({ tasks: [], notes: [] })}
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                  title="Clear all data"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>

            {/* Results Dashboard */}
            {viewMode === 'dashboard' ? (
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 px-4 sm:px-0">
                {/* Tasks Column */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm sm:text-base">📋</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Tasks</h2>
                    <span className={`ml-auto px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${getCategoryHeaderColor('tasks')}`}>
                      {data.tasks.length}
                    </span>
                  </div>
                  <div className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 dark:scrollbar-thumb-blue-600 scrollbar-track-transparent hover:scrollbar-thumb-blue-400 dark:hover:scrollbar-thumb-blue-500">
                    {data.tasks.length === 0 ? (
                      <div className="text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8">
                        <div className="text-2xl sm:text-3xl mb-2 opacity-50">📋</div>
                        <p className="text-xs sm:text-sm">No tasks yet. Say something like:<br/>&quot;I need to buy groceries&quot;</p>
                      </div>
                    ) : (
                      <>
                        {data.tasks.map((item) => (
                          <div key={item.id} className={`p-3 sm:p-4 rounded-lg border-l-4 group ${getCategoryColor('tasks')}`}>
                            <div className="flex justify-between items-start">
                              <div className="flex-1 pr-2">
                                <p className="text-xs sm:text-sm font-medium break-words">{item.text}</p>
                                <p className="text-xs opacity-70 mt-1">{formatTimestamp(item.timestamp)}</p>
                              </div>
                              <button 
                                onClick={() => removeItem('tasks', item.id)}
                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity text-sm flex-shrink-0"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                        {data.tasks.length > 5 && (
                          <div className="text-center py-2 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-600">
                            ↑ Scroll to see more tasks ↑
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Notes Column */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 dark:text-green-400 text-sm sm:text-base">📝</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Notes</h2>
                    <span className={`ml-auto px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${getCategoryHeaderColor('notes')}`}>
                      {data.notes.length}
                    </span>
                  </div>
                  <div className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 dark:scrollbar-thumb-green-600 scrollbar-track-transparent hover:scrollbar-thumb-green-400 dark:hover:scrollbar-thumb-green-500">
                    {data.notes.length === 0 ? (
                      <div className="text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8">
                        <div className="text-2xl sm:text-3xl mb-2 opacity-50">📝</div>
                        <p className="text-xs sm:text-sm">No notes yet. Say something like:<br/>&quot;Great idea for the project&quot;</p>
                      </div>
                    ) : (
                      <>
                        {data.notes.map((item) => (
                          <div key={item.id} className={`p-3 sm:p-4 rounded-lg border-l-4 group ${getCategoryColor('notes')}`}>
                            <div className="flex justify-between items-start">
                              <div className="flex-1 pr-2">
                                <p className="text-xs sm:text-sm font-medium break-words">{item.text}</p>
                                <p className="text-xs opacity-70 mt-1">{formatTimestamp(item.timestamp)}</p>
                              </div>
                              <button 
                                onClick={() => removeItem('notes', item.id)}
                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity text-sm flex-shrink-0"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                        {data.notes.length > 5 && (
                          <div className="text-center py-2 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-600">
                            ↑ Scroll to see more notes ↑
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Calendar View */
              <div className="px-4 sm:px-0">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">All Entries by Date</h2>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Total: {data.tasks.length + data.notes.length} entries
                      </div>
                    </div>
                    
                    <div className="space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
                      {getAllEntriesByDate().length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-4xl mb-4 opacity-50">📅</div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No entries yet</h3>
                          <p className="text-gray-500 dark:text-gray-400">Start recording to see your entries organized by date</p>
                        </div>
                      ) : (
                        <>
                          {getAllEntriesByDate().map(([date, entries]) => (
                            <div key={date} className="border-b border-gray-200 dark:border-gray-600 last:border-b-0 pb-6 last:pb-0">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-2 border-b border-gray-100 dark:border-gray-700">
                                {formatDateHeader(date)}
                                <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                  ({entries.length} {entries.length === 1 ? 'entry' : 'entries'})
                                </span>
                              </h3>
                              
                              <div className="grid gap-3 sm:gap-4">
                                {entries.map((entry) => (
                                  <div key={`${entry.type}-${entry.id}`} className={`p-3 sm:p-4 rounded-lg border-l-4 group ${getCategoryColor(entry.type)}`}>
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1 pr-2">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-xs font-medium px-2 py-1 rounded-full uppercase tracking-wide">
                                            {entry.type === 'tasks' && '📋 Task'}
                                            {entry.type === 'notes' && '📝 Note'}
                                          </span>
                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(entry.timestamp).toLocaleTimeString('en-US', { 
                                              hour: 'numeric', 
                                              minute: '2-digit', 
                                              hour12: true 
                                            })}
                                          </span>
                                        </div>
                                        <p className="text-sm font-medium break-words">{entry.text}</p>
                                      </div>
                                      <button 
                                        onClick={() => removeItem(entry.type, entry.id)}
                                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity text-sm flex-shrink-0"
                                      >
                                        🗑️
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                          {getAllEntriesByDate().length > 2 && (
                            <div className="text-center py-4 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-600">
                              📅 {data.tasks.length + data.notes.length} total entries across {getAllEntriesByDate().length} days
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Footer */}
        <section className="relative bg-gray-50 dark:bg-slate-900 py-12 border-t border-gray-200 dark:border-slate-700">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Free Voice Productivity Software</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  OnePageOS is a revolutionary free voice-to-text productivity application that uses advanced natural language processing to automatically organize your speech into tasks and notes. No account required, complete privacy protection.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• 99% accurate speech recognition</li>
                  <li>• Automatic task classification</li>
                  <li>• Real-time speech transcription</li>
                  <li>• Works completely offline</li>
                  <li>• No AI dependencies</li>
                  <li>• Complete privacy protection</li>
                  <li>• Progressive Web App (PWA)</li>
                  <li>• Cross-platform compatibility</li>
                  <li>• Keyboard shortcuts for accessibility</li>
                  <li>• Dark mode support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How to Use</h3>
                <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>1. Click the microphone button</li>
                  <li>2. Speak naturally about tasks or ideas</li>
                  <li>3. Watch automatic categorization</li>
                  <li>4. Access organized productivity dashboard</li>
                  <li>5. Export or sync with other tools</li>
                </ol>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-600 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Free voice productivity app for hands-free task management and note-taking. Advanced speech recognition technology for instant organization.
              </p>
            </div>
          </div>
        </section>

      </Layout>
    </>
  )
}