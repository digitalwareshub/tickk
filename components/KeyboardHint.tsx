/**
 * Keyboard Shortcuts Hint
 * Shows subtle hints about available keyboard shortcuts
 */

import { useState, useEffect } from 'react'

interface KeyboardHintProps {
  show: boolean
  isRecording?: boolean
  canProcess?: boolean
}

export default function KeyboardHint({ show, isRecording, canProcess }: KeyboardHintProps) {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if user has dismissed hints before
    const dismissed = localStorage.getItem('tickk_hints_dismissed') === 'true'
    setDismissed(dismissed)
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('tickk_hints_dismissed', 'true')
  }

  if (!show || dismissed) return null

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg max-w-xs z-10">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
            ⌨️ Keyboard shortcuts
          </p>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
            <div>
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Space</kbd> 
              {isRecording ? ' Stop recording' : ' Start recording'}
            </div>
            {canProcess && (
              <div>
                <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+Enter</kbd> 
                <span> Organize</span>
              </div>
            )}
            <div>
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">?</kbd> 
              <span> Show all shortcuts</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-0.5"
          aria-label="Dismiss hint"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
