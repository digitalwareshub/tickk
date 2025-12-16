/**
 * OnboardingTour Component
 * Interactive step-by-step tour for new users
 */

import { useState, useEffect, useCallback } from 'react'

export interface TourStep {
  id: string
  title: string
  description: string
  target?: string // CSS selector for element to highlight
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  action?: () => void // Optional action to perform when step is shown
}

interface OnboardingTourProps {
  steps: TourStep[]
  isOpen: boolean
  onComplete: () => void
  onSkip: () => void
  storageKey?: string
}

export default function OnboardingTour({
  steps,
  isOpen,
  onComplete,
  onSkip,
  storageKey = 'tickk_onboarding_completed'
}: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  // Update target element position with retry mechanism
  useEffect(() => {
    if (!isOpen || !step?.target) {
      setTargetRect(null)
      return
    }

    let retryCount = 0
    const maxRetries = 15 // Increased from 10
    const isRecordingStep = step.id === 'recording'

    const updatePosition = () => {
      const element = document.querySelector(step.target!)
      if (element) {
        setTargetRect(element.getBoundingClientRect())
        console.log(`🎯 Tour step "${step.id}" found target element:`, element)
        return true
      }
      console.log(`⚠️ Tour step "${step.id}" target not found: ${step.target}`)
      return false
    }

    const tryUpdatePosition = () => {
      if (updatePosition()) {
        return // Success
      }
      
      // Retry if element not found and we haven't exceeded max retries
      if (retryCount < maxRetries) {
        retryCount++
        const delay = isRecordingStep ? 100 * retryCount : 50 * retryCount // Longer delay for recording step
        console.log(`🔄 Retry ${retryCount}/${maxRetries} for step "${step.id}" in ${delay}ms`)
        setTimeout(tryUpdatePosition, delay)
      } else {
        console.log(`❌ Failed to find target for step "${step.id}" after ${maxRetries} attempts`)
      }
    }

    // Execute step action first if provided, then wait for DOM to update
    if (step.action) {
      step.action()
      // Use multiple requestAnimationFrame calls to ensure DOM has fully updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Extra delay for steps that change DOM significantly
          setTimeout(() => {
            tryUpdatePosition()
          }, isRecordingStep ? 200 : 100)
        })
      })
    } else {
      tryUpdatePosition()
    }

    // Update position on resize/scroll
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, step])

  const handleComplete = useCallback(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, 'true')
    }
    onComplete()
  }, [onComplete, storageKey])

  const handleNext = useCallback(() => {
    if (isLastStep) {
      handleComplete()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }, [isLastStep, handleComplete])

  const handlePrevious = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
    }
  }, [isFirstStep])

  const handleSkip = useCallback(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, 'true')
    }
    onSkip()
  }, [onSkip, storageKey])

  // Calculate tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect && step?.placement !== 'center') {
      // Fallback to center if target element is missing (e.g., during re-renders)
      console.log(`📱 Fallback to center positioning for step "${step?.id}"`)
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10002
      }
    }

    if (step?.placement === 'center' || !targetRect) {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10002
      }
    }

    const style: React.CSSProperties = {
      position: 'fixed',
      zIndex: 10002
    }

    const padding = 16
    const isMobile = window.innerWidth < 640

    switch (step.placement) {
      case 'top':
        style.left = `${targetRect.left + targetRect.width / 2}px`
        style.bottom = `${window.innerHeight - targetRect.top + padding}px`
        style.transform = 'translateX(-50%)'
        break
      case 'bottom':
        // On mobile, ensure tooltip doesn't go off-screen
        if (isMobile && targetRect.bottom + padding + 200 > window.innerHeight) {
          // Switch to center if not enough space below
          style.top = '50%'
          style.left = '50%'
          style.transform = 'translate(-50%, -50%)'
        } else {
          style.left = `${targetRect.left + targetRect.width / 2}px`
          style.top = `${targetRect.bottom + padding}px`
          style.transform = 'translateX(-50%)'
        }
        break
      case 'left':
        style.right = `${window.innerWidth - targetRect.left + padding}px`
        style.top = `${targetRect.top + targetRect.height / 2}px`
        style.transform = 'translateY(-50%)'
        break
      case 'right':
        style.left = `${targetRect.right + padding}px`
        style.top = `${targetRect.top + targetRect.height / 2}px`
        style.transform = 'translateY(-50%)'
        break
    }

    return style
  }

  // Calculate spotlight position for highlighting target element
  const getSpotlightStyle = (): React.CSSProperties => {
    if (!targetRect) {
      return { display: 'none' }
    }

    const padding = 8

    return {
      position: 'fixed',
      top: `${targetRect.top - padding}px`,
      left: `${targetRect.left - padding}px`,
      width: `${targetRect.width + padding * 2}px`,
      height: `${targetRect.height + padding * 2}px`,
      zIndex: 10001,
      pointerEvents: 'none'
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[10000]"
        onClick={handleSkip}
        onTouchStart={(e) => {
          // Prevent accidental touch closes on mobile during re-renders
          if (step?.action) {
            e.preventDefault()
          }
        }}
      />

      {/* Spotlight highlight */}
      {step.target && targetRect && (
        <div
          style={getSpotlightStyle()}
          className="rounded-lg ring-4 ring-blue-500 ring-opacity-50 bg-white/5"
        />
      )}

      {/* Tooltip */}
      <div
        style={getTooltipStyle()}
        className="bg-white rounded-lg shadow-2xl border-2 border-blue-500 max-w-md w-[calc(100%-2rem)] sm:w-full mx-auto"
      >
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">
                {step.description}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Skip tour"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress indicators */}
          <div className="flex items-center gap-1 mb-4 sm:mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-blue-600'
                    : index < currentStep
                    ? 'bg-blue-300'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="flex gap-2">
              {!isFirstStep && (
                <button
                  onClick={handlePrevious}
                  className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isLastStep ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
