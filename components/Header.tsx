import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageDropdown from './LanguageDropdown'
import { FEATURES } from '@/lib/config/features'

interface HeaderProps {
  mode?: 'braindump' | 'organized'
  onModeChange?: (mode: 'braindump' | 'organized') => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Header({ mode: _mode, onModeChange: _onModeChange }: HeaderProps) {
  const router = useRouter()
  const { language, t } = useLanguage()
  const isHomePage = router.pathname === '/' || router.pathname === '/es'

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center justify-start w-1/3">
            <Link href={language === 'es' ? '/es' : '/'} className="group flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent hover:from-orange-700 hover:to-orange-600 transition-all duration-200">
                tickk
              </span>
              <span className="text-orange-500 text-base sm:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                🎙️
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center justify-center w-1/3 gap-6">
            {!isHomePage && (
              <Link href={language === 'es' ? '/es' : '/'} className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('nav.back_to_app')}
              </Link>
            )}
            {FEATURES.PRICING_PAGE.enabled && (
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </Link>
            )}
          </div>

          {/* Right: Language Selector */}
          <div className="flex items-center justify-end w-1/3">
            {/* Language Dropdown */}
            <LanguageDropdown />

            {/* Mobile Home Button - only show on small screens when not on home page */}
            {!isHomePage && (
              <div className="md:hidden ml-3">
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
