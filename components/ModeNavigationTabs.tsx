/**
 * ModeNavigationTabs Component
 * Large, prominent navigation tabs for Braindump and Organized modes
 * Positioned below the header for maximum visibility
 */

import { useLanguage } from '@/contexts/LanguageContext'

interface ModeNavigationTabsProps {
  mode: 'braindump' | 'organized' | 'focus'
  onModeChange: (mode: 'braindump' | 'organized' | 'focus') => void
}

export default function ModeNavigationTabs({ mode, onModeChange }: ModeNavigationTabsProps) {
  const { t } = useLanguage()

  return (
    <div className="border-b border-gray-200 bg-white sticky top-16 z-40 shadow-sm" data-tour="mode-tabs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Braindump Tab */}
          <button
            onClick={() => onModeChange('braindump')}
            className={`flex-1 py-4 px-2 sm:px-4 text-center border-b-2 transition-all duration-200 ${
              mode === 'braindump'
                ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-label="Switch to Braindump mode to record your thoughts"
          >
            <div className="flex flex-col items-center space-y-1.5">
              <span className="text-xl sm:text-2xl" role="img" aria-label="Microphone">🎙️</span>
              <span className="font-semibold text-xs sm:text-sm">{t('nav.braindump')}</span>
              <span className="text-xs text-gray-500 hidden lg:block">
                {t('nav.braindump_description')}
              </span>
            </div>
          </button>

          {/* Focus Tab - NEW */}
          <button
            onClick={() => onModeChange('focus')}
            className={`flex-1 py-4 px-2 sm:px-4 text-center border-b-2 transition-all duration-200 ${
              mode === 'focus'
                ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-label="Switch to Focus mode to see today's priorities"
          >
            <div className="flex flex-col items-center space-y-1.5">
              <span className="text-xl sm:text-2xl" role="img" aria-label="Target">🎯</span>
              <span className="font-semibold text-xs sm:text-sm">Focus</span>
              <span className="text-xs text-gray-500 hidden lg:block">
                Today&apos;s priorities
              </span>
            </div>
          </button>

          {/* Organized Tab */}
          <button
            onClick={() => onModeChange('organized')}
            className={`flex-1 py-4 px-2 sm:px-4 text-center border-b-2 transition-all duration-200 ${
              mode === 'organized'
                ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-label="Switch to Organized mode to view your tasks and notes"
          >
            <div className="flex flex-col items-center space-y-1.5">
              <span className="text-xl sm:text-2xl" role="img" aria-label="Clipboard">📋</span>
              <span className="font-semibold text-xs sm:text-sm">{t('nav.organized')}</span>
              <span className="text-xs text-gray-500 hidden lg:block">
                {t('nav.organized_description')}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
