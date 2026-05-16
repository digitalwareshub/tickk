/**
 * ModeNavigationTabs Component
 * Large, prominent navigation tabs for Braindump and Organized modes
 * Positioned below the header for maximum visibility
 */

interface ModeNavigationTabsProps {
  mode: 'braindump' | 'organized' | 'focus'
  onModeChange: (mode: 'braindump' | 'organized' | 'focus') => void
}

export default function ModeNavigationTabs({ mode, onModeChange }: ModeNavigationTabsProps) {

  return (
    <div className="border-b border-[#333333] bg-[#1a1b26] sticky top-16 z-40" data-tour="mode-tabs">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="flex">
          {/* Braindump Tab */}
          <button
            onClick={() => onModeChange('braindump')}
            className={`flex-1 py-4 px-2 sm:px-4 text-center border-b-2 transition-all duration-200 ${
              mode === 'braindump'
                ? 'border-orange-500 text-orange-500 bg-white/[0.02]'
                : 'border-transparent text-[#a0a0a0] hover:text-white hover:bg-white/[0.02]'
            }`}
            aria-label="Switch to Braindump mode to record your thoughts"
          >
            <div className="flex flex-col items-center space-y-1.5">
              <span className="font-mono font-semibold text-xs sm:text-sm">braindump</span>
              <span className="text-xs text-[#777777] hidden lg:block">
                capture your thoughts
              </span>
            </div>
          </button>

          {/* Focus Tab - NEW */}
          <button
            onClick={() => onModeChange('focus')}
            className={`flex-1 py-4 px-2 sm:px-4 text-center border-b-2 transition-all duration-200 ${
              mode === 'focus'
                ? 'border-orange-500 text-orange-500 bg-white/[0.02]'
                : 'border-transparent text-[#a0a0a0] hover:text-white hover:bg-white/[0.02]'
            }`}
            aria-label="Switch to Focus mode to see today's priorities"
          >
            <div className="flex flex-col items-center space-y-1.5">
              <span className="font-mono font-semibold text-xs sm:text-sm">focus</span>
              <span className="text-xs text-[#777777] hidden lg:block">
                today&apos;s priorities
              </span>
            </div>
          </button>

          {/* Organized Tab */}
          <button
            onClick={() => onModeChange('organized')}
            className={`flex-1 py-4 px-2 sm:px-4 text-center border-b-2 transition-all duration-200 ${
              mode === 'organized'
                ? 'border-orange-500 text-orange-500 bg-white/[0.02]'
                : 'border-transparent text-[#a0a0a0] hover:text-white hover:bg-white/[0.02]'
            }`}
            aria-label="Switch to Organized mode to view your tasks and notes"
          >
            <div className="flex flex-col items-center space-y-1.5">
              <span className="font-mono font-semibold text-xs sm:text-sm">organized</span>
              <span className="text-xs text-[#777777] hidden lg:block">
                view tasks & notes
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
