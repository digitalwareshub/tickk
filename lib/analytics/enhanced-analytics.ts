/**
 * Enhanced Analytics for tickk.app
 * Routes events through Vercel Analytics only — no Google Analytics, no cookies.
 * Content rules: never transmit transcript text, note text, task text, search queries,
 * tag values, or any other user-created content.
 */

import { track } from '@vercel/analytics'

export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, string | number | boolean | null | undefined>
}

export interface UserJourneyEvent extends AnalyticsEvent {
  user_type: 'new' | 'returning'
  traffic_source: string
  page_section: string
  timestamp: number
}

export interface ConversionEvent extends AnalyticsEvent {
  funnel_step: string
  conversion_type: 'landing_to_app' | 'blog_to_app' | 'faq_to_app' | 'github_click' | 'social_share'
}

export interface ContentEvent extends AnalyticsEvent {
  content_type: 'faq' | 'use_case' | 'blog' | 'demo' | 'cta'
  content_id: string
  engagement_depth: 'view' | 'click' | 'scroll' | 'time_spent' | 'hover'
  duration?: number
}

class EnhancedAnalytics {
  private sessionId: string
  private trafficSource: string | null = null

  constructor() {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    if (typeof window !== 'undefined') {
      this.trafficSource = this.detectTrafficSource()
    }
  }

  private detectTrafficSource(): string {
    const referrer = document.referrer
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.get('utm_source')) {
      return `${urlParams.get('utm_source')}_${urlParams.get('utm_medium') || 'unknown'}`
    }

    if (referrer) {
      if (referrer.includes('google')) return 'google_organic'
      if (referrer.includes('bing')) return 'bing_organic'
      if (referrer.includes('reddit')) return 'reddit_social'
      if (referrer.includes('twitter') || referrer.includes('t.co')) return 'twitter_social'
      if (referrer.includes('github')) return 'github_referral'
      return 'referral'
    }

    return 'direct'
  }

  private isReturningUser(): boolean {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('tickk_has_visited') === 'true'
  }

  private getScrollDepth(): number {
    if (typeof window === 'undefined') return 0
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    if (scrollable <= 0) return 100
    return Math.round((window.scrollY / scrollable) * 100)
  }

  private getTimeOnPage(): number {
    return Date.now() - (window.performance?.timing?.navigationStart || Date.now())
  }

  private getCurrentPageSection(scrollPercent: number): string {
    if (scrollPercent < 10) return 'hero'
    if (scrollPercent < 30) return 'how_it_works'
    if (scrollPercent < 60) return 'use_cases'
    if (scrollPercent < 80) return 'demo'
    if (scrollPercent < 95) return 'faq'
    return 'footer'
  }

  private getEngagementQuality(timeSpent: number): string {
    if (timeSpent < 5000) return 'low'
    if (timeSpent < 15000) return 'medium'
    if (timeSpent < 30000) return 'high'
    return 'very_high'
  }

  trackEvent(event: AnalyticsEvent) {
    if (typeof window === 'undefined') return

    track(event.action, {
      category: event.category,
      ...(event.label ? { label: event.label } : {}),
      ...(event.value !== undefined ? { value: event.value } : {}),
      session_id: this.sessionId,
      traffic_source: this.trafficSource,
      page_path: window.location.pathname,
      ...event.custom_parameters,
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event)
    }
  }

  trackUserJourney(event: Omit<UserJourneyEvent, 'timestamp'>) {
    this.trackEvent({
      ...event,
      user_type: this.isReturningUser() ? 'returning' : 'new',
      traffic_source: this.trafficSource || 'unknown',
      timestamp: Date.now(),
    } as UserJourneyEvent)
  }

  trackConversion(event: Omit<ConversionEvent, never>) {
    this.trackEvent({
      ...event,
      custom_parameters: {
        ...event.custom_parameters,
        conversion_value: 1,
        time_to_conversion: this.getTimeOnPage(),
      },
    })
  }

  trackContentEngagement(event: Omit<ContentEvent, never>) {
    this.trackEvent({
      ...event,
      custom_parameters: {
        ...event.custom_parameters,
        scroll_depth: this.getScrollDepth(),
        time_on_page: this.getTimeOnPage(),
      },
    })
  }

  trackFAQInteraction(questionId: string, action: 'view' | 'expand' | 'collapse') {
    this.trackContentEngagement({
      action: `faq_${action}`,
      category: 'content_engagement',
      label: questionId,
      content_type: 'faq',
      content_id: questionId,
      engagement_depth: action === 'expand' ? 'click' : 'view',
    })
  }

  trackUseCaseInteraction(useCaseId: string, action: 'view' | 'click' | 'hover') {
    this.trackContentEngagement({
      action: `use_case_${action}`,
      category: 'content_engagement',
      label: useCaseId,
      content_type: 'use_case',
      content_id: useCaseId,
      engagement_depth: action,
    })
  }

  trackCTAClick(ctaId: string, context: string, ctaText: string) {
    this.trackConversion({
      action: 'cta_click',
      category: 'conversion',
      label: ctaId,
      funnel_step: 'landing_page_cta',
      conversion_type: 'landing_to_app',
      custom_parameters: {
        cta_text: ctaText,
        cta_context: context,
        scroll_position: this.getScrollDepth(),
      },
    })
  }

  trackScrollDepth() {
    if (typeof window === 'undefined') return

    const thresholds = [25, 50, 75, 90, 100]
    const tracked = new Set<number>()

    const trackScroll = () => {
      const scrollPercent = this.getScrollDepth()

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold)
          this.trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            label: `${threshold}%`,
            value: threshold,
            custom_parameters: {
              page_section: this.getCurrentPageSection(scrollPercent),
              time_to_scroll: this.getTimeOnPage(),
            },
          })
        }
      })
    }

    window.addEventListener('scroll', trackScroll, { passive: true })
  }

  trackSectionTime(sectionId: string, timeSpent: number) {
    this.trackEvent({
      action: 'section_time',
      category: 'engagement',
      label: sectionId,
      value: Math.round(timeSpent / 1000),
      custom_parameters: {
        engagement_quality: this.getEngagementQuality(timeSpent),
      },
    })
  }
}

export const enhancedAnalytics = new EnhancedAnalytics()

export const trackPageView = (pageName: string) => {
  enhancedAnalytics.trackEvent({
    action: 'page_view',
    category: 'navigation',
    label: pageName,
  })
}

export const trackCTAClick = (ctaId: string, context: string, ctaText: string) => {
  enhancedAnalytics.trackCTAClick(ctaId, context, ctaText)
}

export const trackFAQInteraction = (questionId: string, action: 'view' | 'expand' | 'collapse') => {
  enhancedAnalytics.trackFAQInteraction(questionId, action)
}

export const trackUseCaseInteraction = (useCaseId: string, action: 'view' | 'click' | 'hover') => {
  enhancedAnalytics.trackUseCaseInteraction(useCaseId, action)
}

export const trackSectionTime = (sectionId: string, timeSpent: number) => {
  enhancedAnalytics.trackSectionTime(sectionId, timeSpent)
}

export const trackProductEvent = (
  action: string,
  label?: string,
  customParameters?: Record<string, string | number | boolean | null | undefined>
) => {
  const sessionParameters: Record<string, string | number | boolean | null | undefined> = {}

  if (typeof window !== 'undefined') {
    const lastSession =
      sessionStorage.getItem('tickk_session_previous_seen_at') ||
      localStorage.getItem('tickk_last_product_session')
    const now = Date.now()
    const daysSinceLastSession = lastSession
      ? Math.max(0, Math.floor((now - Number(lastSession)) / 86400000))
      : null

    sessionParameters.returning_user = localStorage.getItem('tickk_has_visited') === 'true'
    sessionParameters.days_since_last_session = daysSinceLastSession
    sessionParameters.is_pwa = window.matchMedia?.('(display-mode: standalone)').matches || false

    if (!sessionStorage.getItem('tickk_session_previous_seen_at')) {
      sessionStorage.setItem('tickk_session_previous_seen_at', lastSession || String(now))
    }

    localStorage.setItem('tickk_has_visited', 'true')
    localStorage.setItem('tickk_last_product_session', String(now))
  }

  enhancedAnalytics.trackEvent({
    action,
    category: 'product',
    label,
    custom_parameters: {
      ...sessionParameters,
      ...customParameters,
    },
  })
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    enhancedAnalytics.trackScrollDepth()
  })
}
