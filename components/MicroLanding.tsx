/**
 * MicroLanding - Main landing interface with the headline, examples, and record button.
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
    <div className="micro-landing bg-[#1a1b26] border-b border-[#333333]" data-tour="braindump-section">
      {/* Main Content Area */}
      <div className="max-w-[900px] mx-auto w-full px-6 py-10 text-center">
        {/* Main Headline */}
        <div className="mb-8">
          {/* Keyboard Shortcut Hint */}
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-[#a0a0a0] mb-4">
            <span>press</span>
            <kbd className="px-2 py-0.5 bg-transparent border border-[#333333] rounded text-[11px] font-semibold text-white">
              ⌘K
            </kbd>
            <span className="text-[#777777]">/</span>
            <kbd className="px-2 py-0.5 bg-transparent border border-[#333333] rounded text-[11px] font-semibold text-white">
              Ctrl+K
            </kbd>
            <span>for shortcuts</span>
          </div>
          
          <h1 className="font-mono text-[clamp(24px,4vw,38px)] font-semibold text-white mb-3 leading-tight">
            <span className="text-orange-500">speak your thoughts.</span> tickk organizes them instantly.
          </h1>
          <p className="text-sm leading-8 text-[#a0a0a0] mb-5 max-w-xl mx-auto">
            private voice brain dump app for people who think faster than they type.
            <br />
            capture messy thoughts and turn them into tasks and notes in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'no account',
              'local notes',
              'browser-first',
              'installable pwa',
              'privacy-first',
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#333333] px-3 py-1 font-mono text-[11px] text-[#a0a0a0]"
              >
                <span className="text-orange-500">✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* How It Works - Simple 3 Steps */}
        <div className="mb-8 rounded-md border border-[#333333] bg-white/[0.02] p-5 sm:p-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* Step 1 */}
            <div className="text-center flex-1">
              <h3 className="font-mono font-semibold text-white text-xs sm:text-sm mb-1 sm:mb-2">speak</h3>
              <p className="text-xs sm:text-sm text-[#a0a0a0] hidden sm:block">brain dump everything</p>
              <p className="text-xs text-[#a0a0a0] sm:hidden">brain dump</p>
            </div>
            
            {/* Arrow 1 */}
            <div className="text-orange-500 text-xl sm:text-2xl">→</div>
            
            {/* Step 2 */}
            <div className="text-center flex-1">
              <h3 className="font-mono font-semibold text-white text-xs sm:text-sm mb-1 sm:mb-2">organize</h3>
              <p className="text-xs sm:text-sm text-[#a0a0a0] hidden sm:block">split into tasks & notes</p>
              <p className="text-xs text-[#a0a0a0] sm:hidden">auto-sort</p>
            </div>
            
            {/* Arrow 2 */}
            <div className="text-orange-500 text-xl sm:text-2xl">→</div>
            
            {/* Step 3 */}
            <div className="text-center flex-1">
              <h3 className="font-mono font-semibold text-white text-xs sm:text-sm mb-1 sm:mb-2">act</h3>
              <p className="text-xs sm:text-sm text-[#a0a0a0] hidden sm:block">focus on action</p>
              <p className="text-xs text-[#a0a0a0] sm:hidden">take action</p>
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mb-8">
          <p className="font-mono text-xs text-[#a0a0a0] text-center mb-4">
            try saying:
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
        <div className="mb-8 rounded-md border border-[#333333] bg-white/[0.02] p-6">
          {isSupported ? (
            <div>
              <div className="relative inline-block">
                {/* Pulsing ring for first-time users */}
                {!isRecording && itemCount === 0 && (
                  <div className="absolute inset-0 w-24 h-24 -m-2 rounded-full border-2 border-orange-500 animate-pulse-ring pointer-events-none" />
                )}
                
                <button
                  onClick={handleRecordClick}
                  data-tour="record-button"
                  aria-label={isRecording ? "Stop recording" : "Click to record your thoughts"}
                  className={`
                    w-20 h-20 rounded-full flex items-center justify-center
                    transition-all duration-200 transform hover:scale-105 relative z-10
                    ${isRecording
                      ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
                      : 'bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 dark:from-orange-500 dark:to-orange-700 dark:hover:from-orange-400 dark:hover:to-orange-600'
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
              <p className="font-mono text-[#a0a0a0] text-sm mt-4">
                {isRecording ? 'recording...' : 'click to start recording'}
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
                className="w-full p-4 border border-[#333333] rounded bg-transparent resize-none focus:border-orange-500 focus:outline-none text-white placeholder-[#777777] text-left"
                rows={3}
                aria-label="Enter your thoughts"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-[#a0a0a0]">
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
                  className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="bg-white/[0.02] border border-[#333333] rounded p-4 text-left">
              <p className="font-mono text-xs text-[#a0a0a0] mb-2">transcript:</p>
              <p className="text-sm text-white">{currentTranscript}</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {recordingError && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-red-500/10 border border-red-500/40 rounded p-4">
              <p className="text-red-300 text-sm">{recordingError}</p>
            </div>
          </div>
        )}

        {/* Helper Text */}
        <div className="mb-8">
          <p className="text-[#a0a0a0] text-sm">
            {isSupported
              ? "Press the microphone to capture your thoughts. We'll organize them later."
              : "Type your thoughts below and hit Enter. We'll organize them later."
            }
          </p>
        </div>

        {/* Stats if user has items */}
        {itemCount > 0 && (
          <div className="mb-8">
            <div className="font-mono text-xs text-[#777777] space-x-4">
              <span>0 braindumps</span>
              <span>0 tasks</span>
              <span>0 notes</span>
            </div>
          </div>
        )}

        {/* Trust Signals */}
        <div className="pt-4 border-t border-[#333333]">
          <div className="flex justify-center items-center gap-6 font-mono text-xs text-[#a0a0a0]">
            <span className="flex items-center gap-1">
              <span>🔒</span>
              <span>private</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🌐</span>
              <span>works offline</span>
            </span>
            <span className="flex items-center gap-1">
              <span>✨</span>
              <span>no account</span>
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
      className="flex items-start gap-1 sm:gap-2 px-3 py-2 rounded-full text-xs sm:text-sm border border-[#333333] bg-transparent text-[#a0a0a0] hover:border-orange-500 hover:text-white transition-colors text-left leading-tight min-w-0 w-full sm:w-auto min-h-0"
    >
      <span className="flex-shrink-0 mt-0.5">{emoji}</span>
      <span className="flex-1 break-words whitespace-normal">&ldquo;{text}&rdquo;</span>
      <span className="text-xs text-orange-500 flex-shrink-0 hidden sm:inline mt-0.5">→ {type}</span>
    </button>
  )
}
