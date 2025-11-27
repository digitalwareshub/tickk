/**
 * Transform Page - Tickk Pro Feature
 * Text transformation tools: Summarize, Structure, Polish, Extract Tasks
 * Ported from SharpNotes (shrp.app)
 */

import { useState, useCallback, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { transformText, modeDescriptions } from '@/lib/transformers'
import type { TransformMode, TransformedNote } from '@/types/transform'
import { FileText, List, Sparkles, CheckSquare, Copy, Download, Trash2, Star, Pin, Clock, ChevronRight } from 'lucide-react'
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
        <title>Transform Notes - Tickk Pro</title>
        <meta name="description" content="Transform messy notes into clean, organized text. Summarize, structure, polish grammar, and extract tasks." />
      </Head>

      <Layout className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        {/* Hero Section */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/30 px-4 py-2 text-sm text-orange-700 dark:text-orange-300 mb-4">
                <Sparkles className="w-4 h-4" />
                Tickk Pro Feature
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-50 mb-2">
                Transform Your Notes
              </h1>
              <p className="text-gray-600 dark:text-slate-400">
                Turn messy notes into clean, organized text. All processing happens locally.
              </p>
            </div>

            {/* Mode Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {(Object.keys(modeDescriptions) as TransformMode[]).map((m) => {
                const desc = modeDescriptions[m]
                const IconComponent = iconMap[desc.icon as keyof typeof iconMap]
                return (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      mode === m
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30'
                        : 'border-gray-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className={`w-5 h-5 ${mode === m ? 'text-orange-600' : 'text-gray-500 dark:text-slate-400'}`} />
                      <span className={`font-semibold ${mode === m ? 'text-orange-700 dark:text-orange-300' : 'text-gray-700 dark:text-slate-200'}`}>
                        {desc.title}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2">
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
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Input Text
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste or type your messy notes here..."
                  className="w-full h-64 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {input.split(/\s+/).filter(Boolean).length} words
                </div>
              </div>

              {/* Output */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Transformed Output
                </label>
                <div className="w-full h-64 p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 overflow-auto">
                  {output ? (
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-slate-200 font-sans">
                      {output}
                    </pre>
                  ) : (
                    <p className="text-gray-400 dark:text-slate-500 text-sm">
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
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
                className="inline-flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 text-gray-700 dark:text-slate-200 font-medium rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>

              <button
                onClick={handleSave}
                disabled={!output}
                className="inline-flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 text-gray-700 dark:text-slate-200 font-medium rounded-lg transition-colors"
              >
                <Star className="w-4 h-4" />
                Save
              </button>

              <button
                onClick={handleDownload}
                disabled={!output}
                className="inline-flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 text-gray-700 dark:text-slate-200 font-medium rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>

              <button
                onClick={handleClear}
                className="inline-flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 font-medium rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="text-center text-sm text-gray-500 dark:text-slate-400 mb-8">
              <span className="inline-flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs">Cmd/Ctrl + Enter</kbd>
                Transform
              </span>
              <span className="mx-4">|</span>
              <span className="inline-flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs">Cmd/Ctrl + S</kbd>
                Save
              </span>
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
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 bg-gray-50 dark:bg-slate-800/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 text-center mb-8">
              Why Transform Notes?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">100% Private</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  All processing happens locally in your browser. Your notes never leave your device.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Instant Results</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  No waiting for cloud APIs. Get results in milliseconds using local NLP.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">ADHD-Friendly</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Turn brain dumps into organized notes. Perfect for messy thinkers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
