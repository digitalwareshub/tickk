/**
 * MicroLanding - Main landing interface that matches the screenshot
 * Shows the main headline, subtitle, examples, and record button
 */

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
}

export default function MicroLanding({ 
  itemCount, 
  onExampleClick,
  isRecording = false,
  isSupported = true,
  onStartRecording,
  onStopRecording,
  currentTranscript,
  recordingError
}: MicroLandingProps) {
  const { t } = useLanguage()

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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('microlanding.headline')}
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {t('microlanding.subheadline')}
          </p>
        </div>

        {/* Example Prompts */}
        <div className="mb-12">
          <p className="text-gray-600 text-center mb-6">
            {t('microlanding.try_saying')}:
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
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

        {/* Record Button - Central Focus */}
        <div className="mb-8">
          <div className="relative inline-block">
            <button 
              onClick={handleRecordClick}
              disabled={!isSupported}
              aria-label={isRecording ? "Stop recording" : "Click to record your thoughts"}
              className={`
                w-20 h-20 rounded-full flex items-center justify-center 
                transition-all duration-200 transform hover:scale-105 shadow-lg
                ${isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : isSupported
                  ? 'bg-gray-900 hover:bg-gray-800'
                  : 'bg-gray-400 cursor-not-allowed'
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
            Press the microphone to record your thoughts. We&apos;ll organize them later.
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
        inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm
        border transition-all hover:scale-105 hover:shadow-md
        whitespace-nowrap
        ${type === 'task' 
          ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100' 
          : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
        }
      `}
    >
      <span>{emoji}</span>
      <span>&ldquo;{text}&rdquo;</span>
      <span className="text-xs opacity-60">→ {type}</span>
    </button>
  )
}
