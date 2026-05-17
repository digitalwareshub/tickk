/**
 * Transform Page - Tickk Pro Feature
 * Text transformation tools: Summarize, Structure, Polish, Extract Tasks
 * Ported from SharpNotes (shrp.app)
 * Updated: 2025-11-30
 */

import { useState, useCallback, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { ProGate } from '@/components/ProGate'
import BugReportModal from '@/components/BugReportModal'
import { transformText, modeDescriptions } from '@/lib/transformers'
import type { TransformMode, TransformedNote } from '@/types/transform'
import { FileText, List, Sparkles, CheckSquare, Copy, Download, Trash2, Star, Pin, Clock, ChevronRight, Mic, MicOff } from 'lucide-react'
import toast from 'react-hot-toast'

// Storage key for transformed notes
const STORAGE_KEY = 'tickk_transformed_notes'

// Icon mapping
const iconMap = {
  FileText,
  List,
  Sparkles,
  CheckSquare
}

export default function TransformPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<TransformMode>('summarize')
  const [isProcessing, setIsProcessing] = useState(false)
  const [notes, setNotes] = useState<TransformedNote[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [metadata, setMetadata] = useState<{ originalLength: number; transformedLength: number; compressionRatio?: number; tasksFound?: number } | null>(null)
  const [isBugReportOpen, setIsBugReportOpen] = useState(false)

  // Voice input state
  const [isRecording, setIsRecording] = useState(false)
  const [isVoiceSupported, setIsVoiceSupported] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState('') // Live transcript display
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)
  const isStoppingRef = useRef(false) // Track manual stop
  const transcriptRef = useRef('') // Track transcript to avoid closure issues

  // Load notes from storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setNotes(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load notes:', e)
    }
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = false
      recognitionInstance.interimResults = true
      recognitionInstance.lang = 'en-US'
      recognitionInstance.maxAlternatives = 1

      // Set up event handlers once
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionInstance.onresult = (event: any) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        transcriptRef.current = transcript
        setCurrentTranscript(transcript) // Show live transcript
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
        setCurrentTranscript('')
        if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please enable microphone permissions.')
        } else if (event.error === 'no-speech') {
          toast.error('No speech detected. Please try again.')
        } else if (event.error !== 'aborted') {
          toast.error('Voice input error: ' + event.error)
        }
      }

      recognitionInstance.onend = () => {
        setIsRecording(false)
        const finalTranscript = transcriptRef.current.trim()
        
        // Append the transcript to input when recording ends
        if (finalTranscript) {
          setInput(prev => {
            const baseText = prev.trim()
            return baseText + (baseText ? ' ' : '') + finalTranscript
          })
          toast.success(`Added: "${finalTranscript.slice(0, 50)}${finalTranscript.length > 50 ? '...' : ''}"`)
        }
        
        // Clear transcript display
        setCurrentTranscript('')
        transcriptRef.current = ''
      }

      recognitionRef.current = recognitionInstance
      setIsVoiceSupported(true)
    } else {
      setIsVoiceSupported(false)
      console.warn('Speech recognition not supported in this browser')
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    }
  }, [])

  // Save notes to storage
  const saveNotes = useCallback((updatedNotes: TransformedNote[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes))
      setNotes(updatedNotes)
    } catch (e) {
      console.error('Failed to save notes:', e)
      toast.error('Failed to save note')
    }
  }, [])

  // Toggle voice recording
  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) {
      toast.error('Voice input not supported')
      return
    }

    if (isRecording) {
      // Stop recording
      isStoppingRef.current = true
      recognitionRef.current.stop()
      setIsRecording(false)
      toast.success('Voice input stopped')
    } else {
      // Start recording
      try {
        isStoppingRef.current = false
        transcriptRef.current = ''
        setCurrentTranscript('')
        
        recognitionRef.current.start()
        setIsRecording(true)
        toast.success('🎤 Listening... Speak now', { duration: 2000 })
      } catch (error) {
        console.error('Failed to start recording:', error)
        toast.error('Failed to start voice input')
        isStoppingRef.current = false
      }
    }
  }, [isRecording])

  // Transform text
  const handleTransform = useCallback(() => {
    if (!input.trim()) {
      toast.error('Please enter some text to transform')
      return
    }

    setIsProcessing(true)

    // Small delay for UX
    setTimeout(() => {
      try {
        const result = transformText(input, mode)
        setOutput(result.output)
        setMetadata(result.metadata || null)
        toast.success(`Text ${mode === 'tasks' ? 'analyzed' : 'transformed'}!`)
      } catch (e) {
        console.error('Transform error:', e)
        toast.error('Failed to transform text')
      } finally {
        setIsProcessing(false)
      }
    }, 100)
  }, [input, mode])

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    if (!output) {
      toast.error('Nothing to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(output)
      toast.success('Copied to clipboard!')
    } catch {
      toast.error('Failed to copy')
    }
  }, [output])

  // Save current transformation as note
  const handleSave = useCallback(() => {
    if (!output) {
      toast.error('Nothing to save')
      return
    }

    const newNote: TransformedNote = {
      id: `note_${Date.now()}`,
      title: input.slice(0, 50).trim() + (input.length > 50 ? '...' : ''),
      input,
      output,
      mode,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      wordCount: input.split(/\s+/).filter(Boolean).length,
      isFavorite: false,
      isPinned: false
    }

    const updatedNotes = [newNote, ...notes]
    saveNotes(updatedNotes)
    toast.success('Note saved!')
  }, [input, output, mode, notes, saveNotes])

  // Toggle favorite
  const toggleFavorite = useCallback((id: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    )
    saveNotes(updatedNotes)
  }, [notes, saveNotes])

  // Toggle pin
  const togglePin = useCallback((id: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    )
    saveNotes(updatedNotes)
  }, [notes, saveNotes])

  // Delete note
  const deleteNote = useCallback((id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id)
    saveNotes(updatedNotes)
    toast.success('Note deleted')
  }, [notes, saveNotes])

  // Load note into editor
  const loadNote = useCallback((note: TransformedNote) => {
    setInput(note.input)
    setOutput(note.output)
    setMode(note.mode)
    setShowHistory(false)
    toast.success('Note loaded')
  }, [])

  // Clear all
  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setMetadata(null)
  }, [])

  // Download as markdown
  const handleDownload = useCallback(() => {
    if (!output) {
      toast.error('Nothing to download')
      return
    }

    const content = `# ${mode.charAt(0).toUpperCase() + mode.slice(1)} Result\n\n## Original\n\n${input}\n\n## Transformed\n\n${output}`
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tickk-${mode}-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded!')
  }, [input, output, mode])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        handleTransform()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleTransform, handleSave])

  // Sort notes: pinned first, then by date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return b.createdAt - a.createdAt
  })

  return (
    <>
      <Head>
        <title>Transform Notes - Smart Voice Note Cleanup | Tickk</title>
        <meta name="description" content="Transform messy voice notes into clean summaries, task lists, outlines, and polished text in your browser." />
        <link rel="canonical" href="https://tickk.app/transform" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Transform Notes",
              "description": "Transform messy voice notes into clean summaries, task lists, outlines, and polished text in your browser.",
              "url": "https://tickk.app/transform",
              "about": [
                "voice note cleanup",
                "messy notes to task list",
                "smart note transforms",
                "browser note organizer"
              ],
              "isPartOf": {
                "@type": "WebSite",
                "name": "Tickk",
                "url": "https://tickk.app"
              }
            })
          }}
        />
      </Head>

      <Layout className="min-h-screen bg-[#1a1b26] text-white">
        {/* Hero Section */}
        <section className="px-6 py-10">
          <div className="mx-auto max-w-[900px]">
            <div className="text-center mb-8">
              <h1 className="mb-3 flex items-center justify-center gap-3 font-mono text-3xl font-bold text-white md:text-4xl">
                <span><span className="text-orange-500">Transform</span> Your Notes</span>
                <span className="rounded-md border border-[#333333] bg-white/[0.02] px-3 py-1 font-mono text-xs font-medium text-[#a0a0a0]">
                  BETA
                </span>
              </h1>
              <p className="mb-6 text-[#a0a0a0]">
                Turn messy notes into clean, organized text. All processing happens locally.
              </p>
            </div>

            {/* Pro Gate - Wraps the transformation tools */}
            <ProGate feature="Note transformation">

            {/* Mode Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {(Object.keys(modeDescriptions) as TransformMode[]).map((m) => {
                const desc = modeDescriptions[m]
                const IconComponent = iconMap[desc.icon as keyof typeof iconMap]
                return (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-md border p-4 text-left transition-colors ${
                      mode === m
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-[#333333] bg-white/[0.02] hover:border-orange-500/70'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className={`h-5 w-5 ${mode === m ? 'text-orange-400' : 'text-[#a0a0a0]'}`} />
                      <span className={`font-semibold ${mode === m ? 'text-orange-300' : 'text-white'}`}>
                        {desc.title}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-xs text-[#a0a0a0]">
                      {desc.description}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Editor Area */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Input */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#a0a0a0]">
                    Input Text
                  </label>
                  <div className="flex items-center gap-2">
                    {isRecording && (
                      <div className="flex items-center gap-1.5" role="status" aria-live="polite">
                        <div className="w-1 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1 h-5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                        <span className="text-sm text-red-600 dark:text-red-400 font-medium ml-1">Recording...</span>
                      </div>
                    )}
                    {isVoiceSupported && (
                      <button
                        onClick={toggleVoiceInput}
                        className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${
                          isRecording
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                            : 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20'
                        }`}
                        aria-label={isRecording ? 'Stop voice input' : 'Start voice input'}
                      >
                        {isRecording ? (
                          <MicOff className="w-5 h-5" />
                        ) : (
                          <Mic className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                <textarea
                  value={input + (currentTranscript && isRecording ? (input ? ' ' : '') + currentTranscript : '')}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste or type your messy notes here... Or click Voice Input to speak"
                  className={`w-full h-64 p-4 rounded-xl border ${
                    isRecording 
                      ? 'border-orange-500 ring-2 ring-orange-500/20'
                      : 'border-[#333333]'
                  } resize-none bg-white/[0.02] text-white placeholder-[#737373] transition-all focus:border-transparent focus:ring-2 focus:ring-orange-500`}
                  readOnly={isRecording}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {input.split(/\s+/).filter(Boolean).length} words
                </div>
              </div>

              {/* Output */}
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-[#a0a0a0]">
                  Transformed Output
                </label>
                <div className="h-64 w-full overflow-auto rounded-md border border-[#333333] bg-white/[0.02] p-4">
                  {output ? (
                    <pre className="whitespace-pre-wrap font-sans text-sm text-white">
                      {output}
                    </pre>
                  ) : (
                    <p className="text-sm text-[#737373]">
                      Transformed text will appear here...
                    </p>
                  )}
                </div>
                {metadata && (
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 flex gap-3">
                    {metadata.compressionRatio && (
                      <span>{Math.round((1 - 1/metadata.compressionRatio) * 100)}% reduced</span>
                    )}
                    {metadata.tasksFound !== undefined && (
                      <span>{metadata.tasksFound} tasks found</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <button
                onClick={handleTransform}
                disabled={isProcessing || !input.trim()}
                className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-6 py-3 font-mono text-sm font-semibold lowercase text-white transition-colors hover:bg-orange-500 disabled:bg-white/10 disabled:text-[#737373]"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    Transform
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                disabled={!output}
                className="inline-flex items-center gap-2 rounded-md border border-[#333333] bg-white/[0.02] px-4 py-3 font-mono text-sm font-medium lowercase text-white transition-colors hover:border-orange-500 disabled:opacity-50"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>

              <button
                onClick={handleSave}
                disabled={!output}
                className="inline-flex items-center gap-2 rounded-md border border-[#333333] bg-white/[0.02] px-4 py-3 font-mono text-sm font-medium lowercase text-white transition-colors hover:border-orange-500 disabled:opacity-50"
              >
                <Star className="w-4 h-4" />
                Save
              </button>

              <button
                onClick={handleDownload}
                disabled={!output}
                className="inline-flex items-center gap-2 rounded-md border border-[#333333] bg-white/[0.02] px-4 py-3 font-mono text-sm font-medium lowercase text-white transition-colors hover:border-orange-500 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Download
              </button>

              <button
                onClick={handleClear}
                className="inline-flex items-center gap-2 rounded-md border border-[#333333] bg-white/[0.02] px-4 py-3 font-mono text-sm font-medium lowercase text-white transition-colors hover:border-orange-500"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="mb-8 text-center text-sm text-[#a0a0a0]">
              <span className="inline-flex items-center gap-2">
                <kbd className="rounded border border-[#333333] bg-white/[0.02] px-2 py-1 text-xs">Cmd/Ctrl + Enter</kbd>
                Transform
              </span>
              <span className="mx-4">|</span>
              <span className="inline-flex items-center gap-2">
                <kbd className="rounded border border-[#333333] bg-white/[0.02] px-2 py-1 text-xs">Cmd/Ctrl + S</kbd>
                Save
              </span>
            </div>
            
            {/* Disclaimer */}
            <div className="text-center mb-8">
              <div className="inline-flex max-w-2xl items-start gap-2 rounded-md border border-[#333333] bg-white/[0.02] px-4 py-3 text-left">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-[#d4d4d4]">
                    <span className="font-semibold">No AI Used:</span> We use traditional NLP (Natural Language Processing) for transformations. 
                    Results are rule-based and deterministic, not AI-generated. Don&apos;t expect ChatGPT-level outputs.
                  </p>
                  <p className="mt-1 text-xs text-[#a0a0a0]">
                    Found an issue? <Link href="/bug-report" className="text-orange-500 hover:text-orange-400">Report a bug</Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Saved Notes Toggle */}
            {notes.length > 0 && (
              <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2 text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Saved Notes ({notes.length})</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-90' : ''}`} />
                </button>

                {showHistory && (
                  <div className="mt-4 space-y-3">
                    {sortedNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-orange-300 dark:hover:border-orange-700 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => loadNote(note)}>
                            <div className="flex items-center gap-2 mb-1">
                              {note.isPinned && <Pin className="w-3 h-3 text-orange-500" />}
                              {note.isFavorite && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                              <span className="text-xs font-medium text-orange-600 dark:text-orange-400 uppercase">
                                {note.mode}
                              </span>
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-slate-100 truncate">
                              {note.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 truncate">
                              {note.output.slice(0, 100)}...
                            </p>
                            <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                              {new Date(note.createdAt).toLocaleDateString()} · {note.wordCount} words
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); togglePin(note.id); }}
                              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 ${note.isPinned ? 'text-orange-500' : 'text-gray-400'}`}
                            >
                              <Pin className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleFavorite(note.id); }}
                              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 ${note.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
                            >
                              <Star className={`w-4 h-4 ${note.isFavorite ? 'fill-yellow-500' : ''}`} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            </ProGate>
          </div>
        </section>
      </Layout>

      {/* Bug Report Modal */}
      <BugReportModal
        isOpen={isBugReportOpen}
        onClose={() => setIsBugReportOpen(false)}
        featureName="Transform Notes"
      />
    </>
  )
}
