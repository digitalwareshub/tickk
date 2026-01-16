/**
 * Shutdown Banner Component
 * Shows a dismissable banner asking users for feedback about keeping tickk alive
 * Submits responses to Formspree
 */

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'tickk_shutdown_banner_dismissed'

export default function ShutdownBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsVisible(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) return

    setIsSubmitting(true)

    try {
      const payload: Record<string, string> = {
        feedback: feedback.trim(),
        _subject: 'tickk Shutdown Feedback',
      }

      // Only include email if provided (Formspree validates email format)
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
          handleDismiss()
        }, 3000)
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
    <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-700">
      <div className="max-w-4xl mx-auto px-4 py-3">
        {!showFeedbackForm && !submitted && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-amber-800 dark:text-amber-200 flex-1">
              <span className="font-medium">Real talk:</span> tickk isn&apos;t growing — despite being free, open-source, private, offline, no AI, no signup.
              We&apos;re deciding whether to shut it down. If you&apos;d miss this →{' '}
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="font-semibold underline hover:no-underline"
              >
                Give Feedback
              </button>
            </p>
            <button
              onClick={handleDismiss}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 p-1"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {showFeedbackForm && !submitted && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Why would you miss tickk? What makes it valuable to you?
              </p>
              <button
                type="button"
                onClick={handleDismiss}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 p-1"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="I use tickk because..."
              className="w-full px-3 py-2 text-sm border border-amber-300 dark:border-amber-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              rows={2}
              required
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional - for updates)"
                className="flex-1 px-3 py-2 text-sm border border-amber-300 dark:border-amber-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackForm(false)}
                  className="px-4 py-2 text-sm text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !feedback.trim()}
                  className="px-4 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white rounded-md transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Feedback'}
                </button>
              </div>
            </div>
          </form>
        )}

        {submitted && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <span className="font-medium">Thank you!</span> Your feedback means a lot. We&apos;ll take it into consideration.
            </p>
            <button
              onClick={handleDismiss}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 p-1"
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
