import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-800/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo and Badge - Optimized Width */}
          <div className="flex items-center space-x-4 min-w-[240px]">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
              OnePageOS
            </Link>
            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
              FREE
            </span>
          </div>

          {/* Center: Navigation Links - Centered */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <a href={isHomePage ? "#demo" : "/#demo"} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Demo
            </a>
            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Right: Theme Toggle and Action Buttons - Optimized Width Container */}
          <div className="flex items-center space-x-4 min-w-[240px] justify-end">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 rounded-full hover:bg-white/30 dark:hover:bg-slate-700/30 transition-all duration-300 flex-shrink-0"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Primary Action Button - Fixed Dimensions */}
            <div className="flex-shrink-0">
              {isHomePage ? (
                <Link href="/app" className="inline-flex items-center justify-center w-[120px] h-[40px] bg-gray-900 hover:bg-black text-white rounded-lg font-medium transition-colors text-sm">
                  Get Started
                </Link>
              ) : (
                <Link href="/" className="inline-flex items-center justify-center w-[120px] h-[40px] bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium text-sm">
                  ← Home
                </Link>
              )}
            </div>

            {/* Mobile Secondary Button - Reserved Space */}
            <div className="md:hidden min-w-[80px] flex-shrink-0">
              {!isHomePage && (
                <Link href="/app" className="text-orange-600 dark:text-orange-400 font-medium text-sm whitespace-nowrap block text-right">
                  Try App →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
