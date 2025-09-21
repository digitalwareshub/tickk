/**
 * LanguageDropdown Component
 * Clean dropdown selector for language switching with flags
 */

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLanguage } from '@/contexts/LanguageContext'

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    path: '/'
  },
  {
    code: 'es', 
    name: 'Español',
    flag: '🇪🇸',
    path: '/es'
  }
]

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguage()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setLanguage(lang.code as 'en' | 'es')
    router.push(lang.path)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 touch-manipulation min-w-[100px] justify-center"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span 
          className="text-base emoji leading-none" 
          role="img" 
          aria-label={`${currentLanguage.name} Flag`}
          style={{ fontFamily: "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', 'Android Emoji', sans-serif" }}
        >
          {currentLanguage.flag}
        </span>
        <span className="text-xs font-bold tracking-wide">{currentLanguage.code.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                language === lang.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
              }`}
              role="menuitem"
            >
              <span 
                className="text-base emoji leading-none" 
                role="img" 
                aria-label={`${lang.name} Flag`}
                style={{ fontFamily: "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', 'Android Emoji', sans-serif" }}
              >
                {lang.flag}
              </span>
              <span className="font-medium">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto text-orange-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
