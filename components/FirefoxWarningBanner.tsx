/**
 * Firefox Warning Banner
 * Prominent warning for Firefox users that voice input is not supported
 */

import { useState, useEffect } from 'react'

export default function FirefoxWarningBanner() {
  const [isFirefox, setIsFirefox] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if Firefox
    const userAgent = navigator.userAgent.toLowerCase()
    const firefox = userAgent.indexOf('firefox') > -1
    
    // Check if Web Speech API is supported
    const hasVoiceSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
    
    // Show banner if Firefox and no voice support
    setIsFirefox(firefox && !hasVoiceSupport)
    
    // Check if user previously dismissed (stored in sessionStorage)
    const dismissed = sessionStorage.getItem('firefox-warning-dismissed')
    setIsDismissed(dismissed === 'true')
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    sessionStorage.setItem('firefox-warning-dismissed', 'true')
  }

  if (!isFirefox || isDismissed) {
    return null
  }

  return (
    <>
      {/* Fixed banner at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 py-2 sm:px-6 sm:py-2.5">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex-shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 text-sm">
              <span className="font-bold">🎤 Voice Recording Not Available in Firefox</span>
              <span className="hidden sm:inline"> — Firefox doesn&apos;t support the Web Speech API. This is a browser limitation, not a tickk.app issue.</span>
            </div>
            
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1.5 hover:bg-white/20 rounded transition-colors"
              aria-label="Dismiss"
              title="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Spacer to prevent content from being hidden under fixed banner */}
      <div className="h-14 sm:h-12" aria-hidden="true"></div>
    </>
  )
}
