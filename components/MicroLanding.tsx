/**
 * MicroLanding - Main landing interface that matches the screenshot
 * Shows the main headline, subtitle, examples, and record button
 */

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

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
  const { t } = useLanguage()
  const [textInput, setTextInput] = useState('')

  const handleRecordClick = () => {
    if (isRecording) {
      onStopRecording?.()
    } else {
      onStartRecording?.()
    }
  }

  return (
    <div className="micro-landing">
      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full px-6 py-12 text-center">
        {/* Main Headline */}
        <div className="mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            {t('microlanding.headline')}
          </h1>
          <p className="text-responsive text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('microlanding.subheadline')}
          </p>
        </div>

        {/* Example Prompts */}
        <div className="mb-12">
          <p className="text-gray-600 text-center mb-6">
            {t('microlanding.try_saying')}:
          </p>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 max-w-4xl mx-auto">
            <ExampleChip 
              text={t('microlanding.example1')}
              emoji="📋"
              type="task"
              onClick={onExampleClick}
            />
            <ExampleChip 
              text={t('microlanding.example2')}
              emoji="📝"
              type="note"
              onClick={onExampleClick}
            />
            <ExampleChip 
              text={t('microlanding.example3')}
              emoji="📋"
              type="task"
              onClick={onExampleClick}
            />
            <ExampleChip 
              text={t('microlanding.example4')}
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
                {isRecording ? 'Recording...' : 'Click to record'}
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
              <span>{t('microlanding.private')}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🌐</span>
              <span>{t('microlanding.works_offline')}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>✨</span>
              <span>{t('microlanding.no_account')}</span>
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
