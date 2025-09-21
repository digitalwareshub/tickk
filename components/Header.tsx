import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLanguage } from '../contexts/LanguageContext'

interface HeaderProps {
  mode?: 'braindump' | 'organized'
  onModeChange?: (mode: 'braindump' | 'organized') => void
}

export default function Header({ mode, onModeChange }: HeaderProps) {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const isHomePage = router.pathname === '/' || router.pathname === '/es'

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo and Badge */}
          <div className="flex items-center space-x-3 w-1/3">
            <Link href={language === 'es' ? '/es' : '/'} className="group flex items-center space-x-2">
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
          <div className="hidden md:flex items-center justify-center w-1/3">
            {isHomePage && mode && onModeChange ? (
              /* Clean text navigation for home page */
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => onModeChange('braindump')}
                  className={`text-sm font-medium transition-colors duration-200 relative ${
                    mode === 'braindump'
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('nav.braindump')}
                  {mode === 'braindump' && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
                  )}
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => onModeChange('organized')}
                  className={`text-sm font-medium transition-colors duration-200 relative ${
                    mode === 'organized'
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('nav.organized')}
                  {mode === 'organized' && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
                  )}
                </button>
              </div>
            ) : (
              /* Minimal navigation for other pages */
              <Link href={language === 'es' ? '/es' : '/'} className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('nav.back_to_app')}
              </Link>
            )}
          </div>

          {/* Right: Language Switcher and Mode Toggle for Mobile */}
          <div className="flex items-center space-x-3 justify-end w-1/3">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => {
                  setLanguage('en')
                  router.push('/')
                }}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === 'en'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                🇺🇸 EN
              </button>
              <button
                onClick={() => {
                  setLanguage('es')
                  router.push('/es')
                }}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  language === 'es'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                🇪🇸 ES
              </button>
            </div>
            {/* Mobile Mode Toggle - only on home page */}
            {isHomePage && mode && onModeChange && (
              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={() => onModeChange('braindump')}
                  className={`text-xs font-medium transition-colors relative ${
                    mode === 'braindump'
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('nav.braindump')}
                  {mode === 'braindump' && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
                  )}
                </button>
                <span className="text-gray-300 text-xs">|</span>
                <button
                  onClick={() => onModeChange('organized')}
                  className={`text-xs font-medium transition-colors relative ${
                    mode === 'organized'
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('nav.organized')}
                  {mode === 'organized' && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
                  )}
                </button>
              </div>
            )}

            {/* Mobile Home Button - only show on small screens when not on home page */}
            {!isHomePage && (
              <div className="md:hidden">
                <Link href={language === 'es' ? '/es' : '/'} className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100" aria-label="Go to Home">
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
