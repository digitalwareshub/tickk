import { ReactNode } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  showHomeLink?: boolean
  title?: string
  className?: string
}

export default function Layout({ 
  children, 
  showHomeLink = false, 
  title,
  className = "min-h-screen bg-gray-50 dark:bg-slate-900"
}: LayoutProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  
  const isHomePage = router.pathname === '/'

  return (
    <div className={className}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
                OnePageOS
              </Link>
              <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">FREE</span>
            </div>
            
            {/* Navigation Links - Unified for all pages */}
            <div className="hidden md:flex items-center space-x-6">
              {isHomePage ? (
                // Homepage anchor links
                <>
                  <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    How It Works
                  </a>
                  <a href="#demo" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    Demo
                  </a>
                </>
              ) : null}
              
              {/* Page navigation links for all pages */}
              <Link href="/support" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                Support
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                Contact
              </Link>
              <Link href="/bug-report" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                Bug Report
              </Link>
              <Link href="/app" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors text-sm font-medium">
                Try App →
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Link href="/app" className="text-orange-600 dark:text-orange-400 font-medium text-sm">
                Try App
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 rounded-full hover:bg-white/30 dark:hover:bg-slate-700/30 transition-all duration-300"
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
              
              {/* Back to Home or Try App button */}
              {isHomePage ? (
                <div className="hidden md:flex items-center space-x-4">
                  <Link href="/app" className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Try App →
                  </Link>
                </div>
              ) : (
                <Link href="/" className="inline-flex items-center px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium">
                  ← Home
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Title for non-home pages */}
      {title && !isHomePage && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
      )}

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer showHomeLink={showHomeLink} />
    </div>
  )
}
