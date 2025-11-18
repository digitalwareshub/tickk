import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDarkMode } from '@/hooks/useDarkMode'

interface HeaderProps {
  mode?: 'braindump' | 'organized' | 'focus'
  onModeChange?: (mode: 'braindump' | 'organized' | 'focus') => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Header({ mode: _mode, onModeChange: _onModeChange }: HeaderProps) {
  const router = useRouter()
  const isAppPage = router.pathname === '/landing' // App is now at /landing
  const isMarketingHome = router.pathname === '/' // Marketing page is now at /
  const { isDark, toggleDark } = useDarkMode()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 shadow-sm transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center justify-start w-1/3">
            <Link href="/" className="group flex items-center space-x-2">
              <span className="text-xl sm:text-2xl">✅</span>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent hover:from-orange-700 hover:to-orange-600 transition-all duration-200">
                    tickk
                  </span>
                  <span className="text-orange-500 text-base sm:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    🎙️
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-400 -mt-1 opacity-60 group-hover:opacity-90 transition-opacity duration-200 whitespace-nowrap hidden sm:block">
                  Your brain is faster than your hands
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Keyboard Shortcut Hint or Navigation */}
          <div className="hidden md:flex items-center justify-center w-1/3 gap-6">
            {isAppPage && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="font-medium">Press</span>
                <kbd className="px-2 py-0.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs font-semibold text-gray-700 dark:text-slate-300 shadow-sm">
                  ⌘K
                </kbd>
                <span className="text-gray-400 dark:text-slate-500">/</span>
                <kbd className="px-2 py-0.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs font-semibold text-gray-700 dark:text-slate-300 shadow-sm">
                  Ctrl+K
                </kbd>
                <span>for shortcuts</span>
              </div>
            )}
          </div>

          {/* Right: Go to App Button + Dark Mode Toggle + Mobile Home Button */}
          <div className="flex items-center justify-end w-1/3 gap-2">
            {/* Go to App Button - Show everywhere except on the app page itself */}
            {!isAppPage && (
              <Link
                href="/landing"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="hidden sm:inline">Go to App</span>
                <span className="sm:hidden">App</span>
              </Link>
            )}
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {!isMarketingHome && (
              <div className="md:hidden">
                <Link href="/" className="p-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800" aria-label="Go to Home">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
