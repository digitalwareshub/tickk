import { useEffect, useRef, useState } from 'react'
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
  const emailInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.setTimeout(() => {
      emailInputRef.current?.focus()
    }, 0)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

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
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-md rounded-md border border-[#333333] bg-[#101116] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
        aria-describedby="pro-modal-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="p-6 sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-xs font-semibold lowercase text-orange-400">
                Tickk Pro
              </p>
              <h2 id="pro-modal-title" className="font-mono text-2xl font-semibold leading-tight text-white">
                Tickk Pro is coming back.
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-[#a0a0a0] transition-colors hover:text-white"
              aria-label="Close Pro modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p id="pro-modal-description" className="mb-6 text-sm leading-6 text-[#d4d4d4]">
            Early users will receive lifetime access pricing.
          </p>

          <label htmlFor="pro-notify-email" className="mb-2 block text-sm font-medium text-[#d4d4d4]">
            Email
          </label>
          <input
            ref={emailInputRef}
            id="pro-notify-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-[#333333] bg-[#15161f] px-3 py-3 text-white placeholder-[#737373] focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          />

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-[#333333] px-4 py-2.5 font-mono text-sm font-semibold lowercase text-white transition-colors hover:border-orange-300 hover:text-orange-200"
            >
              Maybe later
            </button>
            <button
              type="button"
              onClick={handleNotify}
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md bg-orange-600 px-4 py-2.5 font-mono text-sm font-semibold lowercase text-white transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-orange-900 disabled:text-[#a0a0a0]"
            >
              {isSubmitting ? 'Saving...' : 'Notify me'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
