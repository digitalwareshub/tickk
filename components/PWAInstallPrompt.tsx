/**
 * PWA Install Prompt Component
 * Shows a native-style prompt to install the app (Add to Home Screen)
 */

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return // Already installed, don't show prompt
    }

    // Check if user has dismissed the prompt before
    const dismissed = localStorage.getItem('pwa_install_dismissed')
    if (dismissed) {
      return // User previously dismissed, don't show again
    }

    // Detect Safari
    const ua = navigator.userAgent
    const isSafariBrowser = /Safari/.test(ua) && !/Chrome/.test(ua) && !/CriOS/.test(ua) && !/FxiOS/.test(ua)
    setIsSafari(isSafariBrowser)

    // For Safari, show instructions after delay
    if (isSafariBrowser) {
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000) // 5 seconds delay
      return
    }

    // Listen for the beforeinstallprompt event (Chrome/Edge only)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after a short delay (let user explore first)
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000) // 5 seconds delay
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    await deferredPrompt.prompt()

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    // Clear the prompt
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa_install_dismissed', 'true')
  }

  if (!showPrompt) return null

  // Safari-specific instructions
  if (isSafari) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-700 p-4 animate-slide-up">
          <div className="flex items-start gap-3">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                ✅
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-50 mb-1">
                Install tickk?
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">
                Add to your Home Screen or Dock
              </p>

              {/* Safari Instructions */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-md p-2 mb-3">
                <p className="text-xs text-orange-900 dark:text-orange-200 mb-1 font-medium">
                  📱 On Safari:
                </p>
                <ol className="text-xs text-orange-800 dark:text-orange-300 space-y-0.5 list-decimal list-inside">
                  <li>Tap the Share button <span className="inline-block">🔼</span></li>
                  <li>Select &ldquo;Add to Home Screen&rdquo;</li>
                </ol>
              </div>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 text-xs font-medium rounded-md transition-colors"
              >
                Got it
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
            <ul className="space-y-1">
              <li className="text-xs text-gray-600 dark:text-slate-400 flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                Works offline
              </li>
              <li className="text-xs text-gray-600 dark:text-slate-400 flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                Faster access
              </li>
              <li className="text-xs text-gray-600 dark:text-slate-400 flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                Native app experience
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // Chrome/Edge install prompt
  if (!deferredPrompt) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-700 p-4 animate-slide-up">
        <div className="flex items-start gap-3">
          {/* App Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              ✅
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-50 mb-1">
              Install tickk?
            </h3>
            <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">
              Add to home screen for quick access
            </p>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-md transition-colors"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 text-xs font-medium rounded-md transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
          <ul className="space-y-1">
            <li className="text-xs text-gray-600 dark:text-slate-400 flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              Works offline
            </li>
            <li className="text-xs text-gray-600 dark:text-slate-400 flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              Faster access
            </li>
            <li className="text-xs text-gray-600 dark:text-slate-400 flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              Native app experience
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
