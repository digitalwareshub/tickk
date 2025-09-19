import Head from 'next/head'
import { useTheme } from 'next-themes'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'
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
  category: 'tasks' | 'notes' | 'calendar'
}

interface VoiceData {
  tasks: VoiceItem[]
  notes: VoiceItem[]
  calendar: VoiceItem[]
}

export default function App() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [status, setStatus] = useState('Click the microphone to start')
  const [data, setData] = useState<VoiceData>({ tasks: [], notes: [], calendar: [] })
  const [recognition, setRecognition] = useState<SpeechRecognitionType | null>(null)
  const router = useRouter()

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

  const classifyText = useCallback((text: string): 'tasks' | 'notes' | 'calendar' => {
    if (!text || typeof text !== 'string') return 'notes'
    
    const lowerText = text.toLowerCase()
    
    // Calendar/meeting indicators (check these FIRST for scheduling context)
    const timeWords = ['tomorrow', 'today', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'next week', 'next month', 'at', 'pm', 'am', 'o\'clock']
    const meetingWords = ['meet', 'meeting', 'appointment', 'call', 'lunch', 'dinner', 'schedule', 'remind me']
    
    const hasTimeWords = timeWords.some(word => lowerText.includes(word))
    const hasMeetingWords = meetingWords.some(word => lowerText.includes(word))
    
    // Note indicators (ideas, thoughts, etc.)
    const noteIndicators = ['idea', 'ideas', 'thought', 'thoughts', 'note', 'notes', 'insight', 'inspiration', 'concept', 'brainstorm']
    const hasNoteIndicators = noteIndicators.some(word => lowerText.includes(word))
    
    // Task indicators (split into strong phrases and actions)
    const strongTaskPhrases = ['need to', 'have to', 'must', 'should', 'todo', 'task', 'remember to', 'don\'t forget']
    const taskActions = ['buy', 'get', 'pick up', 'finish', 'complete', 'do', 'make', 'create', 'build', 'write', 'send', 'email', 'fix', 'repair']
    
    const hasStrongTaskPhrases = strongTaskPhrases.some(phrase => lowerText.includes(phrase))
    const hasTaskActions = taskActions.some(word => lowerText.includes(word))
    
    // IMPROVED PRIORITY LOGIC:
    
    // 1. Clear note indicators always go to notes
    if (hasNoteIndicators) {
      return 'notes'
    }
    
    // 2. Meeting context with time = calendar (even with "have to")
    if (hasMeetingWords && hasTimeWords) {
      return 'calendar'
    }
    
    // 3. Meeting words without specific time = calendar
    if (hasMeetingWords) {
      return 'calendar'
    }
    
    // 4. Time words with task phrases = need to analyze context
    if (hasTimeWords && hasStrongTaskPhrases) {
      // If it's clearly a meeting ("meet", "call", etc.), go to calendar
      if (lowerText.includes('meet') || lowerText.includes('call') || lowerText.includes('appointment')) {
        return 'calendar'
      }
      // Otherwise it's a task with a deadline
      return 'tasks'
    }
    
    // 5. Strong task phrases without meeting context = tasks
    if (hasStrongTaskPhrases) {
      return 'tasks'
    }
    
    // 6. Task actions without meeting context = tasks
    if (hasTaskActions) {
      return 'tasks'
    }
    
    // 7. Time words alone = calendar
    if (hasTimeWords) {
      return 'calendar'
    }
    
    // Default to notes for everything else
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
      const newData = { tasks: [], notes: [], calendar: [] }
      saveData(newData)
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
      case 'calendar': return 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100'
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }, [])

  const getCategoryHeaderColor = useCallback((category: string) => {
    switch (category) {
      case 'tasks': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
      case 'notes': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
      case 'calendar': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
      default: return 'bg-gray-100 dark:bg-gray-900/30'
    }
  }, [])

  const quickAddExample = useCallback((category: 'tasks' | 'notes' | 'calendar', example: string) => {
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
        <meta name="description" content="Transform your voice into organized tasks, notes, and calendar events with mobile-first design" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="relative isolate min-h-screen bg-gray-50 dark:bg-gray-900 text-zinc-900 dark:text-gray-100 transition-colors duration-300">
        {/* Grid background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 grid-bg"></div>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => router.push('/')} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">OnePageOS</div>
                </button>
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">FREE</span>
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
                <button onClick={() => router.push('/')} className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <section className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-8 pb-16">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Voice-to-Productivity
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent block">
                  Dashboard
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Start speaking to automatically organize your thoughts into tasks, notes, and calendar events
              </p>
            </div>

            {/* Voice Input Section */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-200/50 dark:border-gray-700/50">
              {/* Voice Interface */}
              <div className="text-center mb-6">
                <button 
                  onClick={toggleRecording}
                  className={`voice-button w-20 h-20 sm:w-24 sm:h-24 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-4 shadow-lg transition-all ${isRecording ? 'recording scale-110 animate-pulse-slow' : 'hover:scale-105'}`}
                  disabled={!recognition}
                >
                  {isRecording ? (
                    <div className="spinner"></div>
                  ) : (
                    <span>🎤</span>
                  )}
                </button>
                
                <div className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  {status}
                </div>
                
                <div className="text-gray-600 dark:text-gray-400 text-sm bg-gray-50/80 dark:bg-gray-700/80 rounded-lg p-4 min-h-[60px] border border-gray-200 dark:border-gray-600 backdrop-blur-sm max-w-2xl mx-auto">
                  {transcription || 'Your speech will appear here...'}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <button 
                  onClick={clearAll}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium"
                >
                  🗑️ Clear All
                </button>
                <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 flex items-center">
                  💡 Press Space to record
                </div>
              </div>
            </div>

            {/* Quick Examples */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 mb-8 border border-orange-200 dark:border-orange-800">
              <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-3">💡 Try these examples:</h3>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <button 
                  onClick={() => quickAddExample('tasks', 'I need to buy groceries tomorrow')}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg text-left hover:shadow-md transition-shadow border border-orange-200 dark:border-orange-700"
                >
                  <div className="font-medium text-blue-600 dark:text-blue-400">📋 Task:</div>
                  <div className="text-gray-600 dark:text-gray-300">&quot;I need to buy groceries tomorrow&quot;</div>
                </button>
                <button 
                  onClick={() => quickAddExample('notes', 'Great idea for the new project design')}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg text-left hover:shadow-md transition-shadow border border-orange-200 dark:border-orange-700"
                >
                  <div className="font-medium text-green-600 dark:text-green-400">📝 Note:</div>
                  <div className="text-gray-600 dark:text-gray-300">&quot;Great idea for the new project design&quot;</div>
                </button>
                <button 
                  onClick={() => quickAddExample('calendar', 'Meeting with John tomorrow at 3pm')}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg text-left hover:shadow-md transition-shadow border border-orange-200 dark:border-orange-700"
                >
                  <div className="font-medium text-purple-600 dark:text-purple-400">📅 Calendar:</div>
                  <div className="text-gray-600 dark:text-gray-300">&quot;Meeting with John tomorrow at 3pm&quot;</div>
                </button>
              </div>
            </div>

            {/* Results Dashboard */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Tasks Column */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400">📋</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tasks</h2>
                  <span className={`ml-auto px-2 py-1 rounded-full text-sm font-medium ${getCategoryHeaderColor('tasks')}`}>
                    {data.tasks.length}
                  </span>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {data.tasks.length === 0 ? (
                    <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                      <div className="text-3xl mb-2 opacity-50">📋</div>
                      <p className="text-sm">No tasks yet. Say something like:<br/>&quot;I need to buy groceries&quot;</p>
                    </div>
                  ) : (
                    data.tasks.map((item) => (
                      <div key={item.id} className={`p-4 rounded-lg border-l-4 group ${getCategoryColor('tasks')}`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.text}</p>
                            <p className="text-xs opacity-70 mt-1">{formatTimestamp(item.timestamp)}</p>
                          </div>
                          <button 
                            onClick={() => removeItem('tasks', item.id)}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2 text-sm"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Notes Column */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 dark:text-green-400">📝</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notes</h2>
                  <span className={`ml-auto px-2 py-1 rounded-full text-sm font-medium ${getCategoryHeaderColor('notes')}`}>
                    {data.notes.length}
                  </span>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {data.notes.length === 0 ? (
                    <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                      <div className="text-3xl mb-2 opacity-50">📝</div>
                      <p className="text-sm">No notes yet. Say something like:<br/>&quot;Great idea for the project&quot;</p>
                    </div>
                  ) : (
                    data.notes.map((item) => (
                      <div key={item.id} className={`p-4 rounded-lg border-l-4 group ${getCategoryColor('notes')}`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.text}</p>
                            <p className="text-xs opacity-70 mt-1">{formatTimestamp(item.timestamp)}</p>
                          </div>
                          <button 
                            onClick={() => removeItem('notes', item.id)}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2 text-sm"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Calendar Column */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 dark:text-purple-400">📅</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Calendar</h2>
                  <span className={`ml-auto px-2 py-1 rounded-full text-sm font-medium ${getCategoryHeaderColor('calendar')}`}>
                    {data.calendar.length}
                  </span>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {data.calendar.length === 0 ? (
                    <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                      <div className="text-3xl mb-2 opacity-50">📅</div>
                      <p className="text-sm">No events yet. Say something like:<br/>&quot;Meeting tomorrow at 3pm&quot;</p>
                    </div>
                  ) : (
                    data.calendar.map((item) => (
                      <div key={item.id} className={`p-4 rounded-lg border-l-4 group ${getCategoryColor('calendar')}`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.text}</p>
                            <p className="text-xs opacity-70 mt-1">{formatTimestamp(item.timestamp)}</p>
                          </div>
                          <button 
                            onClick={() => removeItem('calendar', item.id)}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2 text-sm"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer showHomeLink={true} />
      </div>
    </>
  )
}