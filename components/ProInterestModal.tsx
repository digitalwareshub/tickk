import { useState } from 'react'
import toast from 'react-hot-toast'
import { trackProductEvent } from '@/lib/analytics/enhanced-analytics'

interface ProInterestModalProps {
  isOpen: boolean
  onClose: () => void
  source?: string
}

export default function ProInterestModal({ isOpen, onClose, source = 'unknown' }: ProInterestModalProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleNotify = async () => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      toast.error('Enter your email to get notified.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/pro-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail, source }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save email')
      }

      trackProductEvent('pro_notify_requested', source, { email_domain: trimmedEmail.split('@')[1] || 'unknown' })
      toast.success('You are on the early access list.')
      setEmail('')
      onClose()
    } catch (error) {
      console.error('Failed to submit Pro interest:', error)
      toast.error('Could not save your email. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true" aria-labelledby="pro-modal-title">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-xl">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2">
                Tickk Pro
              </p>
              <h2 id="pro-modal-title" className="text-2xl font-bold text-gray-900 dark:text-slate-50">
                Tickk Pro is coming back.
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-gray-400 hover:text-gray-700 dark:text-slate-500 dark:hover:text-slate-200"
              aria-label="Close Pro modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 dark:text-slate-300 mb-5">
            Early users will receive lifetime access pricing.
          </p>

          <label htmlFor="pro-notify-email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Email
          </label>
          <input
            id="pro-notify-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-3 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-lg border border-gray-300 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              Maybe later
            </button>
            <button
              type="button"
              onClick={handleNotify}
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-400"
            >
              {isSubmitting ? 'Saving...' : 'Notify me'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
