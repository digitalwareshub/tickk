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

  // Update target element position
  useEffect(() => {
    if (!isOpen || !step?.target) {
      setTargetRect(null)
      return
    }

    const updatePosition = () => {
      const element = document.querySelector(step.target!)
      if (element) {
        setTargetRect(element.getBoundingClientRect())
      }
    }

    updatePosition()

    // Update position on resize/scroll
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    // Execute step action if provided
    if (step.action) {
      step.action()
    }

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, step])

  const handleNext = useCallback(() => {
    if (isLastStep) {
      handleComplete()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }, [isLastStep])

  const handlePrevious = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
    }
  }, [isFirstStep])

  const handleComplete = useCallback(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, 'true')
    }
    onComplete()
  }, [onComplete, storageKey])

  const handleSkip = useCallback(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, 'true')
    }
    onSkip()
  }, [onSkip, storageKey])

  // Calculate tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect && step?.placement !== 'center') {
      return { display: 'none' }
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

    switch (step.placement) {
      case 'top':
        style.left = `${targetRect.left + targetRect.width / 2}px`
        style.bottom = `${window.innerHeight - targetRect.top + padding}px`
        style.transform = 'translateX(-50%)'
        break
      case 'bottom':
        style.left = `${targetRect.left + targetRect.width / 2}px`
        style.top = `${targetRect.bottom + padding}px`
        style.transform = 'translateX(-50%)'
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
        className="bg-white rounded-lg shadow-2xl border-2 border-blue-500 max-w-md w-full mx-4"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">
                {step.description}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Skip tour"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress indicators */}
          <div className="flex items-center gap-1 mb-6">
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
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="flex gap-2">
              {!isFirstStep && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
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
