/**
 * Bug Report Modal Component
 * Allows users to report bugs for BETA features
 * Submits to Formspree endpoint
 */

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface BugReportModalProps {
  isOpen: boolean
  onClose: () => void
  featureName: string
}

export default function BugReportModal({ isOpen, onClose, featureName }: BugReportModalProps) {
  const [name, setName] = useState('')
  const [bugDescription, setBugDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Auto-fill bug description with context
  useEffect(() => {
    if (isOpen && !bugDescription) {
      const browserInfo = `Browser: ${navigator.userAgent}\nURL: ${window.location.href}\nFeature: ${featureName}`
      setBugDescription(`\n\n---\nTechnical Context:\n${browserInfo}`)
    }
  }, [isOpen, featureName, bugDescription])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName('')
      setBugDescription('')
      setIsSubmitting(false)
      setShowConfirmation(false)
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/xvgjjanv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          feature: featureName,
          bugDescription,
          _subject: `Bug Report: ${featureName}`,
        }),
      })

      if (response.ok) {
        setShowConfirmation(true)
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        alert('Failed to submit bug report. Please try again.')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Bug report submission error:', error)
      alert('Failed to submit bug report. Please check your connection.')
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal content */}
        <div className="p-6 md:p-8">
          {showConfirmation ? (
            // Confirmation message
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 dark:text-slate-400">
                Your bug report has been submitted successfully. We&apos;ll look into it and get back to you soon.
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-500 mt-4">
                This window will close automatically...
              </p>
            </div>
          ) : (
            // Bug report form
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-2">
                Report a Bug
              </h2>
              <p className="text-gray-600 dark:text-slate-400 mb-6">
                Found an issue with <span className="font-semibold text-orange-600 dark:text-orange-400">{featureName}</span>? Let us know so we can fix it.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Your Name (optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-50 placeholder-gray-400 dark:placeholder-slate-500"
                  />
                </div>

                {/* Bug description field */}
                <div>
                  <label htmlFor="bugDescription" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Describe the bug <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="bugDescription"
                    value={bugDescription}
                    onChange={(e) => setBugDescription(e.target.value)}
                    required
                    rows={8}
                    placeholder="What happened? What did you expect to happen? Steps to reproduce..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-50 placeholder-gray-400 dark:placeholder-slate-500 resize-y"
                  />
                  <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                    Technical details (browser, URL) are automatically included at the bottom.
                  </p>
                </div>

                {/* Submit buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !bugDescription.trim()}
                    className="w-full sm:w-auto px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Bug Report'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
