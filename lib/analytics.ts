// PWA lifecycle tracking and page interaction tracking — all via enhanced-analytics (Vercel Analytics)
import { enhancedAnalytics } from '@/lib/analytics/enhanced-analytics'

export const trackPageInteraction = (action: string, element: string) => {
  enhancedAnalytics.trackEvent({
    action,
    category: 'user_interaction',
    label: element,
  })
}

export const initPWATracking = () => {
  if (typeof window === 'undefined') return

  window.addEventListener('beforeinstallprompt', () => {
    enhancedAnalytics.trackEvent({
      action: 'pwa_install_prompt_shown',
      category: 'pwa',
      label: 'install_prompt',
    })
  })

  window.addEventListener('appinstalled', () => {
    enhancedAnalytics.trackEvent({
      action: 'pwa_installed',
      category: 'pwa',
      label: 'browser_install',
    })
  })

  const isPWA =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true

  if (isPWA) {
    enhancedAnalytics.trackEvent({
      action: 'pwa_session',
      category: 'pwa',
      label: 'standalone_mode',
    })
  }
}
