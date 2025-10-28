/**
 * WhatsNewBanner Component
 * Shows latest features to existing users who haven't seen them yet
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface WhatsNewBannerProps {
  version: string
  onDismiss: () => void
}

export default function WhatsNewBanner({ version, onDismiss }: WhatsNewBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already seen this version's updates
    const lastSeenVersion = localStorage.getItem('tickk_last_seen_version')
    const hasSeenOnboarding = localStorage.getItem('tickk_onboarding_completed') || localStorage.getItem('tickk_onboarding_tour_completed')
    
    // Debug logging
    console.log('🎯 WhatsNewBanner Debug:', {
      lastSeenVersion,
      hasSeenOnboarding,
      version,
      shouldShow: hasSeenOnboarding && lastSeenVersion !== version
    })
    
    // Only show to existing users who haven't seen this version
    if (hasSeenOnboarding && lastSeenVersion !== version) {
      setIsVisible(true)
    }
  }, [version])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('tickk_last_seen_version', version)
    onDismiss()
  }

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-b-2 border-blue-800">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="text-center">
          {/* Close button - top right */}
          <div className="flex justify-end mb-1">
            <button
              onClick={handleDismiss}
              className="text-blue-200 hover:text-white transition-colors p-1"
              aria-label="Dismiss banner"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Icon and main content - centered */}
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            {/* Icon */}
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm sm:text-lg">🎉</span>
            </div>

            {/* Main text */}
            <div className="text-center">
              <p className="text-sm sm:text-base lg:text-lg font-bold mb-1">
                🚀 New features just landed!
              </p>
              <p className="text-xs sm:text-sm text-blue-100">
                Analytics accuracy improved, comprehensive ADHD productivity guide & better navigation!
              </p>
            </div>

            {/* Quick Feature Highlights */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs text-blue-100 mb-1 sm:mb-2">
              <div className="flex items-center gap-1">
                <span>📊</span>
                <span>Better Analytics</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🧠</span>
                <span>ADHD Guide</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🎯</span>
                <span>Improved Navigation</span>
              </div>
            </div>

            {/* Call to action button - at bottom */}
            <Link
              href="/changelog#v1-10-2"
              className="bg-blue-500 hover:bg-blue-400 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-md transition-colors font-medium inline-flex items-center gap-2"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              See What&apos;s New
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function useWhatsNewBanner(version: string) {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const lastSeenVersion = localStorage.getItem('tickk_last_seen_version')
    const hasSeenOnboarding = localStorage.getItem('tickk_onboarding_completed') || localStorage.getItem('tickk_onboarding_tour_completed')
    
    // Debug logging
    console.log('🎯 useWhatsNewBanner Debug:', {
      lastSeenVersion,
      hasSeenOnboarding,
      version,
      shouldShow: hasSeenOnboarding && lastSeenVersion !== version
    })
    
    // Show banner to existing users who haven't seen this version
    if (hasSeenOnboarding && lastSeenVersion !== version) {
      setShowBanner(true)
    }
  }, [version])

  const dismissBanner = () => {
    setShowBanner(false)
    localStorage.setItem('tickk_last_seen_version', version)
  }

  return { showBanner, dismissBanner }
}