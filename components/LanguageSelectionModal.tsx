import React from 'react'

interface LanguageSelectionModalProps {
  isOpen: boolean
  onLanguageSelect: (language: 'en' | 'es') => void
}

export default function LanguageSelectionModal({ 
  isOpen, 
  onLanguageSelect 
}: LanguageSelectionModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌍</span>
          </div>
          
          <h2 
            id="language-modal-title"
            className="text-xl font-semibold text-gray-900 mb-2"
          >
            Choose Your Language
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Select your preferred language for the best experience
          </p>

          <div className="space-y-3">
            <button
              onClick={() => onLanguageSelect('en')}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇺🇸</span>
                <div className="text-left">
                  <div className="font-medium text-gray-900">English</div>
                  <div className="text-sm text-gray-500">Global English</div>
                </div>
              </div>
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full group-hover:border-blue-500"></div>
            </button>

            <button
              onClick={() => onLanguageSelect('es')}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇪🇸</span>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Español</div>
                  <div className="text-sm text-gray-500">Spanish</div>
                </div>
              </div>
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full group-hover:border-blue-500"></div>
            </button>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-500 text-center">
              You can change this later in settings
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
