declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | object,
      config?: object
    ) => void
  }
}

// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Log the page view with their URL
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
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
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
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
