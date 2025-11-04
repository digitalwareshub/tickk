/**
 * MicroLanding - Main landing interface that matches the screenshot
 * Shows the main headline, subtitle, examples, and record button
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
          <h1 className="heading-primary text-gray-900 mb-2">
            Think at 400 WPM. Type at 40 WPM.
          </h1>
          <p className="text-xl text-gray-700 font-medium mb-4">
            Speak. Save. Sort it later.
          </p>
          <p className="text-responsive text-gray-600 mb-6 max-w-2xl mx-auto">
            Speak your thoughts. We&apos;ll organize them into tasks and notes. No login, 100% private.
          </p>
          
          {/* Social Proof - Reddit Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
            {/* Reddit Discussion Badge */}
            <a 
              href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full hover:bg-orange-100 transition-colors group"
            >
              <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              <span className="text-sm font-medium text-orange-900">
                Featured on Reddit
              </span>
              <svg className="w-3 h-3 text-orange-600 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* How It Works - Simple 3 Steps */}
        <div className="mb-10 bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* Step 1 */}
            <div className="text-center flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 transform hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">🎙️</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-xs sm:text-base mb-1 sm:mb-2">Speak</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Brain dump everything</p>
              <p className="text-xs text-gray-600 sm:hidden">Brain dump</p>
            </div>
            
            {/* Arrow 1 */}
            <div className="text-orange-400 text-xl sm:text-2xl mt-0 sm:-mt-8">→</div>
            
            {/* Step 2 */}
            <div className="text-center flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 transform hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">🤖</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-xs sm:text-base mb-1 sm:mb-2">Auto-Sort</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">NLP organizes into tasks & notes</p>
              <p className="text-xs text-gray-600 sm:hidden">Auto-organize</p>
            </div>
            
            {/* Arrow 2 */}
            <div className="text-blue-400 text-xl sm:text-2xl mt-0 sm:-mt-8">→</div>
            
            {/* Step 3 */}
            <div className="text-center flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 transform hover:scale-110 transition-transform">
                <span className="text-2xl sm:text-3xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-xs sm:text-base mb-1 sm:mb-2">Get Done</h3>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Focus on action, not organizing</p>
              <p className="text-xs text-gray-600 sm:hidden">Take action</p>
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mb-10">
          <p className="text-gray-600 text-center mb-4 font-medium">
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
                <button
                  onClick={handleRecordClick}
                  data-tour="record-button"
                  aria-label={isRecording ? "Stop recording" : "Click to record your thoughts"}
                  className={`
                    w-20 h-20 rounded-full flex items-center justify-center
                    transition-all duration-200 transform hover:scale-105 shadow-lg
                    ${isRecording
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-900 hover:bg-gray-800'
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
              <p className="text-gray-600 text-sm mt-4">
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
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white text-gray-900 text-left"
                rows={3}
                aria-label="Enter your thoughts"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">
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
                  className="px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <p className="text-xs text-gray-500 mb-2">Transcript:</p>
              <p className="text-sm text-gray-900">{currentTranscript}</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {recordingError && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{recordingError}</p>
            </div>
          </div>
        )}

        {/* Helper Text */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm">
            {isSupported
              ? "Press the microphone to capture your thoughts. We'll organize them later."
              : "Type your thoughts below and hit Enter. We'll organize them later."
            }
          </p>
        </div>

        {/* Stats if user has items */}
        {itemCount > 0 && (
          <div className="mb-8">
            <div className="text-xs text-gray-400 space-x-4">
              <span>0 braindumps</span>
              <span>0 tasks</span>
              <span>0 notes</span>
            </div>
          </div>
        )}

        {/* Trust Signals */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-center items-center gap-6 text-xs text-gray-500">
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
          ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
          : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
        }
      `}
    >
      <span className="flex-shrink-0 mt-0.5">{emoji}</span>
      <span className="flex-1 break-words whitespace-normal">&ldquo;{text}&rdquo;</span>
      <span className="text-xs opacity-60 flex-shrink-0 hidden sm:inline mt-0.5">→ {type}</span>
    </button>
  )
}
