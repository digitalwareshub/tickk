/**
 * Transition Banner Component
 * Nudges users to try VoiceBrainDump while tickk goes mobile
 * Collects feedback on what matters for the mobile app
 */

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'tickk_transition_banner_dismissed'

export default function ShutdownBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = (permanent = false) => {
    if (permanent) {
      localStorage.setItem(STORAGE_KEY, 'true')
    }
    setIsVisible(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) return

    setIsSubmitting(true)

    try {
      const payload: Record<string, string> = {
        feedback: feedback.trim(),
        _subject: 'tickk Mobile App Feedback',
      }

      if (email.trim()) {
        payload.email = email.trim()
      }

      const response = await fetch('https://formspree.io/f/xvgjjanv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          handleDismiss(true)
        }, 4000)
      } else {
        console.error('Formspree error:', response.status)
        alert('Failed to submit feedback. Please try again.')
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-700">
      <div className="max-w-4xl mx-auto px-4 py-3">
        {!showFeedbackForm && !submitted && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-blue-800 dark:text-blue-200 flex-1">
              tickk is going mobile! While we build the app, try{' '}
              <a
                href="https://voicebraindump.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:no-underline"
              >
                VoiceBrainDump
              </a>
              {' '}— same voice capture, plus idea connections.{' '}
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="font-semibold underline hover:no-underline"
              >
                Send feedback
              </button>
            </p>
            <button
              onClick={() => handleDismiss(false)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 p-1"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {showFeedbackForm && !submitted && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                What features matter most for the tickk mobile app?
              </p>
              <button
                type="button"
                onClick={() => handleDismiss(false)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 p-1"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="I'd love to see..."
              className="w-full px-3 py-2 text-sm border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
              required
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional — we'll notify you when the app launches)"
                className="flex-1 px-3 py-2 text-sm border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackForm(false)}
                  className="px-4 py-2 text-sm text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !feedback.trim()}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Feedback'}
                </button>
              </div>
            </div>
          </form>
        )}

        {submitted && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <span className="font-medium">Thanks!</span> We&apos;ll use your feedback to shape the mobile app. In the meantime, give{' '}
              <a
                href="https://voicebraindump.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:no-underline"
              >
                VoiceBrainDump
              </a>
              {' '}a spin.
            </p>
            <button
              onClick={() => handleDismiss(true)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 p-1"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
