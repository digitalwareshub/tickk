import Link from 'next/link'
import { useRouter } from 'next/router'

interface HeaderProps {
  mode?: 'braindump' | 'organized'
  onModeChange?: (mode: 'braindump' | 'organized') => void
}

export default function Header({ mode, onModeChange }: HeaderProps) {
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo and Badge */}
          <div className="flex items-center space-x-3 min-w-[200px] sm:min-w-[240px]">
            <Link href="/" className="group flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent hover:from-orange-700 hover:to-orange-600 transition-all duration-200">
                tickk
              </span>
              <span className="text-orange-500 text-base sm:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                🎙️
              </span>
            </Link>
            <div className="relative">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                FREE
              </span>
            </div>
          </div>

          {/* Center: Navigation Links or Mode Toggle */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {isHomePage && mode && onModeChange ? (
              /* Mode toggle for home page */
              <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => onModeChange('braindump')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    mode === 'braindump'
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  🧠 Braindump
                </button>
                <button
                  onClick={() => onModeChange('organized')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    mode === 'organized'
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  📊 Organized
                </button>
              </div>
            ) : (
              /* Regular navigation for other pages */
              <>
                <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
                <Link href="/support" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Support
                </Link>
              </>
            )}
          </div>

          {/* Right: Mode Toggle for Mobile */}
          <div className="flex items-center space-x-3 justify-end min-w-[80px]">
            {/* Mobile Mode Toggle - only on home page */}
            {isHomePage && mode && onModeChange && (
              <div className="md:hidden flex bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                <button
                  onClick={() => onModeChange('braindump')}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                    mode === 'braindump'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🧠
                </button>
                <button
                  onClick={() => onModeChange('organized')}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                    mode === 'organized'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  📊
                </button>
              </div>
            )}

            {/* Mobile Home Button - only show on small screens when not on home page */}
            {!isHomePage && (
              <div className="md:hidden">
                <Link href="/" className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100" aria-label="Go to Home">
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
