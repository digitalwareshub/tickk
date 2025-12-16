/**
 * AISurveyModal Component
 * Survey modal to gauge user interest in AI-powered categorization
 * Controlled by NEXT_PUBLIC_SURVEY_AI env var
 */

import { useState, useEffect } from 'react'

interface AISurveyModalProps {
  isOpen: boolean
  onClose: () => void
}

type SurveyResponse = 'yes' | 'no' | 'maybe' | null

const STORAGE_KEY = 'tickk_ai_survey_completed'
const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_SURVEY_URL || 'https://formspree.io/f/xvgjjanv'

export default function AISurveyModal({ isOpen, onClose }: AISurveyModalProps) {
  const [selectedOption, setSelectedOption] = useState<SurveyResponse>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if survey was already completed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem(STORAGE_KEY)
      if (completed) {
        onClose()
      }
    }
  }, [onClose])

  const handleSubmit = async () => {
    if (!selectedOption) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          survey: 'AI Interest Survey',
          response: selectedOption,
          responseText: getResponseText(selectedOption),
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        localStorage.setItem(STORAGE_KEY, 'true')
        setIsSubmitted(true)
      } else {
        throw new Error('Failed to submit survey')
      }
    } catch (err) {
      setError('Failed to submit. Please try again.')
      console.error('Survey submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getResponseText = (option: SurveyResponse): string => {
    switch (option) {
      case 'yes':
        return "Yes, I'd use AI for better accuracy"
      case 'no':
        return 'No, I prefer the current no-AI approach'
      case 'maybe':
        return 'Maybe, depends on privacy/cost'
      default:
        return ''
    }
  }

  const handleClose = () => {
    // Mark as completed even if skipped (to not show again)
    localStorage.setItem(STORAGE_KEY, 'true')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[10000]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-[calc(100%-2rem)] sm:w-full mx-auto">
          <div className="p-5 sm:p-6">
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      Quick Question 🤔
                    </h3>
                    <p className="text-sm text-gray-600">
                      Tickk currently uses NLP (not AI) to categorize your tasks and notes.
                      Would you prefer AI-powered categorization for more accurate results?
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="ml-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    aria-label="Close survey"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-5">
                  <button
                    onClick={() => setSelectedOption('yes')}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all ${
                      selectedOption === 'yes'
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="font-medium">Yes, I&apos;d use AI for better accuracy</span>
                  </button>

                  <button
                    onClick={() => setSelectedOption('no')}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all ${
                      selectedOption === 'no'
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="font-medium">No, I prefer the current no-AI approach</span>
                  </button>

                  <button
                    onClick={() => setSelectedOption('maybe')}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all ${
                      selectedOption === 'maybe'
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="font-medium">Maybe, depends on privacy/cost</span>
                  </button>
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-sm text-red-600 mb-4">{error}</p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleClose}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOption || isSubmitting}
                    className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedOption && !isSubmitting
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </>
            ) : (
              /* Confirmation message */
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Thank you for your feedback!
                </h3>
                <p className="text-sm text-gray-600 mb-5">
                  Your input helps us shape the future of Tickk. We appreciate you taking the time to share your thoughts.
                </p>
                <button
                  onClick={handleClose}
                  className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * Hook to check if the AI survey should be shown
 * Returns true if survey is enabled and user hasn't completed it
 */
export function useAISurvey() {
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const surveyEnabled = process.env.NEXT_PUBLIC_SURVEY_AI === 'true'
      const completed = localStorage.getItem(STORAGE_KEY)
      setShouldShow(surveyEnabled && !completed)
    }
  }, [])

  return shouldShow
}
