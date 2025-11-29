/**
 * MicroLanding - Main landing interface that matches the sc          <h1 className="heading-primary text-gray-900 dark:text-slate-50 mb-4">
            <span className="text-orange-600 dark:text-orange-400">Speak.</span> Save. Sort it later.
          </h1>
          <p className="text-responsive text-gray-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            Speak your thoughts. We&apos;ll organize them into tasks and notes. No login, 100% private.
          </p>
        </div>s the main headline, subtitle, examples, and record button
 */

import { useState } from 'react'

interface MicroLandingProps {
  itemCount: number
  onExampleClick?: (text: string) => void
  isRecording?: boolean
  isSupported?: boolean
  onStartRecording?: () => void
  onStopRecording?: () => void
  currentTranscript?: string
  recordingError?: string | null
  onTextSubmit?: (text: string) => void
}

export default function MicroLanding({
  itemCount,
  onExampleClick,
  isRecording = false,
  isSupported = true,
  onStartRecording,
  onStopRecording,
  currentTranscript,
  recordingError,
  onTextSubmit
}: MicroLandingProps) {
  const [textInput, setTextInput] = useState('')

  const handleRecordClick = () => {
    if (isRecording) {
      onStopRecording?.()
    } else {
      onStartRecording?.()
    }
  }

  return (
    <div className="micro-landing" data-tour="braindump-section">
      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full px-6 py-12 text-center">
        {/* Main Headline */}
        <div className="mb-8">
          {/* Keyboard Shortcut Hint */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span className="font-medium">Press</span>
            <kbd className="px-2 py-0.5 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs font-semibold text-gray-700 dark:text-slate-300">
              ⌘K
            </kbd>
            <span className="text-gray-400 dark:text-slate-500">/</span>
            <kbd className="px-2 py-0.5 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs font-semibold text-gray-700 dark:text-slate-300">
              Ctrl+K
            </kbd>
            <span>for shortcuts</span>
          </div>
          
          <h1 className="heading-primary text-gray-900 dark:text-slate-50 mb-4">
            <span className="text-orange-600 dark:text-orange-400">Speak.</span> Save. Sort it later.
          </h1>
          <p className="text-responsive text-gray-600 dark:text-slate-300 mb-3 max-w-2xl mx-auto">
            Speak your thoughts. We&apos;ll organize them into tasks and notes. No login, 100% private.
          </p>
        </div>

        {/* How It Works - Simple 3 Steps */}
        <div className="mb-10 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/50 dark:to-slate-900/30 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* Step 1 */}
            <div className="text-center flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 transform hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">🎙️</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-xs sm:text-base mb-1 sm:mb-2">Speak</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 hidden sm:block">Brain dump everything</p>
              <p className="text-xs text-gray-600 dark:text-slate-400 sm:hidden">Brain dump</p>
            </div>
            
            {/* Arrow 1 */}
            <div className="text-orange-400 dark:text-orange-500 text-xl sm:text-2xl mt-0 sm:-mt-8">→</div>
            
            {/* Step 2 */}
            <div className="text-center flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 transform hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">🤖</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-xs sm:text-base mb-1 sm:mb-2">Auto-Sort</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 hidden sm:block">NLP organizes into tasks & notes</p>
              <p className="text-xs text-gray-600 dark:text-slate-400 sm:hidden">Auto-organize</p>
            </div>
            
            {/* Arrow 2 */}
            <div className="text-blue-400 dark:text-blue-500 text-xl sm:text-2xl mt-0 sm:-mt-8">→</div>
            
            {/* Step 3 */}
            <div className="text-center flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 transform hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-xs sm:text-base mb-1 sm:mb-2">Get Done</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 hidden sm:block">Focus on action, not organizing</p>
              <p className="text-xs text-gray-600 dark:text-slate-400 sm:hidden">Take action</p>
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mb-10">
          <p className="text-gray-600 dark:text-slate-300 text-center mb-4 font-medium">
            Try saying:
          </p>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 max-w-4xl mx-auto">
            <ExampleChip
              text="Buy groceries tomorrow at 3pm"
              emoji="📋"
              type="task"
              onClick={onExampleClick}
            />
            <ExampleChip
              text="Ideas for the blog post about productivity"
              emoji="📝"
              type="note"
              onClick={onExampleClick}
            />
            <ExampleChip
              text="Call mom this weekend"
              emoji="📋"
              type="task"
              onClick={onExampleClick}
            />
            <ExampleChip
              text="Remember to backup files"
              emoji="📝"
              type="note"
              onClick={onExampleClick}
            />
          </div>
        </div>

        {/* Record Button or Text Input - Central Focus */}
        <div className="mb-8">
          {isSupported ? (
            <div>
              <div className="relative inline-block">
                {/* Pulsing ring for first-time users */}
                {!isRecording && itemCount === 0 && (
                  <div className="absolute inset-0 w-24 h-24 -m-2 rounded-full border-4 border-blue-500 animate-pulse-ring pointer-events-none" />
                )}
                
                <button
                  onClick={handleRecordClick}
                  data-tour="record-button"
                  aria-label={isRecording ? "Stop recording" : "Click to record your thoughts"}
                  className={`
                    w-20 h-20 rounded-full flex items-center justify-center
                    transition-all duration-200 transform hover:scale-105 shadow-lg relative z-10
                    ${isRecording
                      ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
                      : 'bg-gray-900 hover:bg-gray-800 dark:bg-violet-600 dark:hover:bg-violet-700'
                    }
                  `}
                >
                  {isRecording ? (
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  ) : (
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  )}
                </button>
              </div>
              <p className="text-gray-600 dark:text-slate-300 text-sm mt-4">
                {isRecording ? 'Recording...' : 'Click to start recording'}
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  // Prevent spacebar from triggering global shortcuts
                  if (e.key === ' ') {
                    e.stopPropagation()
                  }
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    const text = textInput.trim()
                    if (text && onTextSubmit) {
                      onTextSubmit(text)
                      setTextInput('')
                    }
                  }
                }}
                placeholder="Type your thoughts here..."
                className="w-full p-4 border border-gray-300 dark:border-slate-700 rounded-lg resize-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-violet-500 focus:border-transparent bg-white dark:bg-slate-900/80 text-gray-900 dark:text-slate-100 text-left"
                rows={3}
                aria-label="Enter your thoughts"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500 dark:text-slate-400">
                  Press Enter to add • Shift+Enter for new line
                </span>
                <button
                  onClick={() => {
                    const text = textInput.trim()
                    if (text && onTextSubmit) {
                      onTextSubmit(text)
                      setTextInput('')
                    }
                  }}
                  disabled={!textInput.trim()}
                  className="px-4 py-2 text-sm bg-gray-800 dark:bg-violet-600 text-white rounded hover:bg-gray-700 dark:hover:bg-violet-700 disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Transcript */}
        {currentTranscript && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-gray-50 dark:bg-slate-900/80 border dark:border-slate-700 rounded-lg p-4 text-left">
              <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">Transcript:</p>
              <p className="text-sm text-gray-900 dark:text-slate-100">{currentTranscript}</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {recordingError && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-700 dark:text-red-300 text-sm">{recordingError}</p>
            </div>
          </div>
        )}

        {/* Helper Text */}
        <div className="mb-8">
          <p className="text-gray-500 dark:text-slate-400 text-sm">
            {isSupported
              ? "Press the microphone to capture your thoughts. We'll organize them later."
              : "Type your thoughts below and hit Enter. We'll organize them later."
            }
          </p>
        </div>

        {/* Stats if user has items */}
        {itemCount > 0 && (
          <div className="mb-8">
            <div className="text-xs text-gray-400 dark:text-slate-500 space-x-4">
              <span>0 braindumps</span>
              <span>0 tasks</span>
              <span>0 notes</span>
            </div>
          </div>
        )}

        {/* Trust Signals */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
          <div className="flex justify-center items-center gap-6 text-xs text-gray-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <span>🔒</span>
              <span>Private</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🌐</span>
              <span>Works Offline</span>
            </span>
            <span className="flex items-center gap-1">
              <span>✨</span>
              <span>No Account</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ExampleChipProps {
  text: string
  emoji: string
  type: 'task' | 'note'
  onClick?: (text: string) => void
}

function ExampleChip({ text, emoji, type, onClick }: ExampleChipProps) {
  return (
    <button
      onClick={() => onClick?.(text)}
      className={`
        flex items-start gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm
        border transition-all hover:scale-105 hover:shadow-md
        text-left leading-tight min-w-0 w-full sm:w-auto min-h-0
        ${type === 'task'
          ? 'border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50'
          : 'border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50'
        }
      `}
    >
      <span className="flex-shrink-0 mt-0.5">{emoji}</span>
      <span className="flex-1 break-words whitespace-normal">&ldquo;{text}&rdquo;</span>
      <span className="text-xs opacity-60 flex-shrink-0 hidden sm:inline mt-0.5">→ {type}</span>
    </button>
  )
}
