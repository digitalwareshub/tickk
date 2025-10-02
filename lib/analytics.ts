import type { GtagConfigOptions, GtagEventParameters } from '@/types/gtag'
import { isGtagAvailable } from '@/types/gtag'

// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Log the page view with their URL
export const pageview = (url: string) => {
  if (isGtagAvailable() && GA_TRACKING_ID) {
    const config: GtagConfigOptions = {
      page_path: url,
    }
    window.gtag('config', GA_TRACKING_ID, config)
  }
}

// Log specific events happening
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (isGtagAvailable() && GA_TRACKING_ID) {
    const parameters: GtagEventParameters = {
      event_category: category,
      event_label: label,
      value: value,
    }
    window.gtag('event', action, parameters)
  }
}

// Voice app specific events
export const trackVoiceEvent = (action: 'recording_started' | 'recording_stopped' | 'classification_success' | 'classification_error', category: 'tasks' | 'notes' | 'calendar' | 'general') => {
  event({
    action,
    category: 'voice_interaction',
    label: category,
  })
}

export const trackPageInteraction = (action: string, element: string) => {
  event({
    action,
    category: 'user_interaction',
    label: element,
  })
}
