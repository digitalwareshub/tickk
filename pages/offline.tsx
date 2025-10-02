/**
 * Offline Fallback Page
 * Displayed when the app is offline and no cached content is available
 */

import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    // Set initial status
    updateOnlineStatus()

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Offline - tickk</title>
        <meta name="description" content="tickk is currently offline. Your data is safe and will sync when you're back online." />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Offline Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" 
                />
              </svg>
            </div>
          </div>

          {/* Status Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {isOnline ? 'Back Online!' : 'You\'re Offline'}
          </h1>
          
          <p className="text-gray-600 mb-8">
            {isOnline 
              ? 'Great! You\'re back online. Your data will sync automatically.'
              : 'Don\'t worry, your data is safe and will sync when you\'re back online.'
            }
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            {isOnline ? (
              <Link 
                href="/"
                className="inline-block w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Continue to tickk
              </Link>
            ) : (
              <>
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </button>
                <Link 
                  href="/"
                  className="inline-block w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Go to Home
                </Link>
              </>
            )}
          </div>

          {/* PWA Info */}
          <div className="mt-12 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              📱 Progressive Web App
            </h3>
            <p className="text-xs text-blue-700">
              tickk works offline! Install the app for the best experience.
            </p>
          </div>

          {/* Development Info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-xs text-yellow-800">
                🛠️ Development Mode: This offline page is for PWA testing
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
