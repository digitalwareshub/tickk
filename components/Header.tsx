import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useState } from 'react'

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            {isAppPage ? (
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
            ) : (
              <nav className="flex items-center gap-6">
                <Link href="/landing" className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-sm font-medium rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Braindump
                </Link>
                <Link href="/transform" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Transform</span>
                </Link>
                <Link href="/mindmap" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors whitespace-nowrap">
                  <span>🧠</span>
                  <span>Mind Map</span>
                </Link>
                <Link href="/features" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Features
                </Link>
              </nav>
            )}
          </div>

          {/* Right: Dark Mode Toggle + Mobile Menu */}
          <div className="flex items-center justify-end w-1/3 gap-2">
            {/* Mobile Menu Button - Show on marketing pages only */}
            {!isAppPage && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
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

            {!isMarketingHome && isAppPage && (
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

      {/* Mobile Menu Dropdown - Only on marketing pages */}
      {!isAppPage && mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="md:hidden fixed inset-0 bg-black/20 dark:bg-black/40 z-[45]"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="md:hidden absolute top-full left-0 right-0 z-[55] border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg">
            <div className="mx-auto max-w-6xl px-4 py-3 space-y-2">
              <Link 
                href="/landing" 
                className="flex items-center gap-2 px-3 py-2 text-base font-medium border-2 border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Braindump
              </Link>
              <Link 
                href="/transform" 
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Transform</span>
              </Link>
              <Link 
                href="/mindmap" 
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl">🧠</span>
                <span>Mind Map</span>
              </Link>
              <Link 
                href="/features" 
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Features
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
