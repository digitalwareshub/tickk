/**
 * Keyboard Shortcuts Help Modal
 * Shows available keyboard shortcuts to users
 */

import { KEYBOARD_SHORTCUTS } from '@/hooks/useKeyboardShortcuts'

interface KeyboardHelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function KeyboardHelpModal({ isOpen, onClose }: KeyboardHelpModalProps) {
  if (!isOpen) return null

  const shortcuts = [
    {
      key: KEYBOARD_SHORTCUTS.startStopRecording,
      description: 'Start or stop recording',
      category: 'Recording'
    },
    {
      key: KEYBOARD_SHORTCUTS.stopRecording,
      description: 'Stop recording',
      category: 'Recording'
    },
    {
      key: KEYBOARD_SHORTCUTS.processBraindump,
      description: 'Organize thoughts',
      category: 'Organization'
    },
    {
      key: KEYBOARD_SHORTCUTS.exportData,
      description: 'Export data',
      category: 'Data'
    },
    {
      key: KEYBOARD_SHORTCUTS.showHelp,
      description: 'Show this help',
      category: 'Navigation'
    },
    {
      key: KEYBOARD_SHORTCUTS.closeModal,
      description: 'Close modal',
      category: 'Navigation'
    }
  ]

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<string, typeof shortcuts>)

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white  rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 ">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700  "
            aria-label="Close help"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-gray-700  mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-600 ">
                      {shortcut.description}
                    </span>
                    <kbd className="px-2 py-1 text-xs font-mono bg-gray-100  text-gray-800  rounded border">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 ">
          <p className="text-xs text-gray-500  text-center">
            Press <kbd className="px-1 py-0.5 text-xs font-mono bg-gray-100  rounded">?</kbd> to show this help anytime
          </p>
        </div>
      </div>
    </div>
  )
}
