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
  const { isDark, toggleDark } = useDarkMode()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#1a1b26] border-b border-[#333333] transition-colors">
      <div className="mx-auto max-w-[900px] px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center justify-start w-1/4">
            <Link href="/" className="group flex items-center space-x-2 no-underline">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xl font-medium text-orange-500 transition-opacity group-hover:opacity-85">
                    ~/tickk
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#a0a0a0] mt-0.5 whitespace-nowrap hidden sm:block">
                  voice brain dump
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="hidden md:flex items-center justify-center w-1/2 gap-6">
            <nav className="flex items-center gap-5 relative z-10" aria-label="Main navigation">
              <Link href="/" className={`font-mono text-[13px] transition-colors no-underline ${
                router.pathname === '/'
                  ? 'border-b border-orange-400/60 pb-1 text-white'
                  : 'text-white/90 hover:text-orange-300'
              }`}>
                braindump
              </Link>
              <Link href="/transform" className={`font-mono text-[13px] transition-colors no-underline ${
                router.pathname === '/transform'
                  ? 'border-b border-orange-400/60 pb-1 text-white'
                  : 'text-white/90 hover:text-orange-300'
              }`}>
                transform
              </Link>
              <Link href="/mindmap" className={`font-mono text-[13px] transition-colors no-underline whitespace-nowrap ${
                router.pathname === '/mindmap'
                  ? 'border-b border-orange-400/60 pb-1 text-white'
                  : 'text-white/90 hover:text-orange-300'
              }`}>
                mind map
              </Link>
              <Link href="/pricing" className={`font-mono text-[13px] font-medium transition-colors no-underline whitespace-nowrap ${
                router.pathname === '/pricing'
                  ? 'border-b border-orange-400/60 pb-1 text-white'
                  : 'text-white/90 hover:text-orange-300'
              }`}>
                pricing
              </Link>
            </nav>
          </div>

          {/* Right: Dark Mode Toggle + Mobile Menu */}
          <div className="flex items-center justify-end w-1/4 gap-2 relative z-0">
            {/* Mobile Menu Button - Show on all pages */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#a0a0a0] hover:text-white transition-colors"
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
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 text-[#a0a0a0] hover:text-white transition-colors"
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
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Only on marketing pages */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="md:hidden fixed inset-0 bg-black/60 z-[45]"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="md:hidden absolute top-full left-0 right-0 z-[55] border-b border-[#333333] bg-[#1a1b26] shadow-lg">
            <div className="mx-auto max-w-[900px] px-6 py-5 space-y-4">
              <Link
                href="/"
                className={`block font-mono text-lg transition-colors no-underline ${
                  router.pathname === '/'
                    ? 'text-white'
                    : 'text-white/90 hover:text-orange-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                braindump
              </Link>
              <Link 
                href="/transform" 
                className={`block font-mono text-lg transition-colors no-underline ${
                  router.pathname === '/transform'
                    ? 'text-white'
                    : 'text-white/90 hover:text-orange-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                transform
              </Link>
              <Link
                href="/mindmap"
                className={`block font-mono text-lg transition-colors no-underline ${
                  router.pathname === '/mindmap'
                    ? 'text-white'
                    : 'text-white/90 hover:text-orange-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                mind map
              </Link>
              <Link
                href="/pricing"
                className={`block font-mono text-lg transition-colors no-underline ${
                  router.pathname === '/pricing'
                    ? 'text-white'
                    : 'text-white/90 hover:text-orange-300'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                pricing
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
