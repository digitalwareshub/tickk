/**
 * Enhanced Analytics Service for tickk.app
 * Comprehensive user behavior tracking and conversion analysis
 */

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | object,
      config?: object
    ) => void
    dataLayer: Record<string, unknown>[]
  }
}

// Analytics event types for type safety
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, string | number | boolean | null | undefined>;
}

// User journey tracking events
export interface UserJourneyEvent extends AnalyticsEvent {
  user_type: 'new' | 'returning';
  traffic_source: string;
  page_section: string;
  timestamp: number;
}

// Conversion funnel events
export interface ConversionEvent extends AnalyticsEvent {
  funnel_step: string;
  conversion_type: 'landing_to_app' | 'blog_to_app' | 'faq_to_app' | 'github_click' | 'social_share';
  user_segment: 'adhd_focused' | 'student' | 'professional' | 'parent' | 'creative' | 'accessibility' | 'general';
}

// Content engagement events
export interface ContentEvent extends AnalyticsEvent {
  content_type: 'faq' | 'use_case' | 'blog' | 'demo' | 'cta';
  content_id: string;
  engagement_depth: 'view' | 'click' | 'scroll' | 'time_spent' | 'hover';
  duration?: number;
}

class EnhancedAnalytics {
  private isInitialized = false;
  private userId: string | null = null;
  private sessionId: string;
  private userSegment: string | null = null;
  private trafficSource: string | null = null;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  /**
   * Initialize analytics tracking
   */
  private initializeTracking() {
    if (typeof window === 'undefined') return;

    // Generate or retrieve user ID (anonymous)
    this.userId = this.getOrCreateUserId();
    
    // Detect traffic source
    this.trafficSource = this.detectTrafficSource();
    
    // Set up enhanced ecommerce tracking
    this.setupEnhancedEcommerce();
    
    // Track page load performance
    this.trackPagePerformance();
    
    this.isInitialized = true;
  }

  /**
   * Generate anonymous session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get or create anonymous user ID
   */
  private getOrCreateUserId(): string {
    if (typeof window === 'undefined') return 'server_user';
    
    let userId = localStorage.getItem('tickk_analytics_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('tickk_analytics_user_id', userId);
    }
    return userId;
  }

  /**
   * Detect traffic source for attribution
   */
  private detectTrafficSource(): string {
    if (typeof window === 'undefined') return 'direct';
    
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    
    // UTM parameters
    if (urlParams.get('utm_source')) {
      return `${urlParams.get('utm_source')}_${urlParams.get('utm_medium') || 'unknown'}`;
    }
    
    // Referrer analysis
    if (referrer) {
      if (referrer.includes('google')) return 'google_organic';
      if (referrer.includes('bing')) return 'bing_organic';
      if (referrer.includes('reddit')) return 'reddit_social';
      if (referrer.includes('twitter') || referrer.includes('t.co')) return 'twitter_social';
      if (referrer.includes('github')) return 'github_referral';
      return 'referral';
    }
    
    return 'direct';
  }

  /**
   * Setup enhanced ecommerce for conversion tracking
   */
  private setupEnhancedEcommerce() {
    if (typeof window === 'undefined' || !window.gtag || !process.env.NEXT_PUBLIC_GA_ID) return;

    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      custom_map: {
        custom_dimension_1: 'user_segment',
        custom_dimension_2: 'traffic_source',
        custom_dimension_3: 'user_type',
        custom_dimension_4: 'page_section'
      }
    });
  }

  /**
   * Track page performance metrics
   */
  private trackPagePerformance() {
    if (typeof window === 'undefined') return;

    // Wait for page load to complete
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        this.trackEvent({
          action: 'page_performance',
          category: 'technical',
          label: window.location.pathname,
          value: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
          custom_parameters: {
            dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
            first_contentful_paint: this.getFirstContentfulPaint(),
            traffic_source: this.trafficSource
          }
        });
      }, 1000);
    });
  }

  /**
   * Get First Contentful Paint metric
   */
  private getFirstContentfulPaint(): number {
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    return fcpEntry ? Math.round(fcpEntry.startTime) : 0;
  }

  /**
   * Identify user segment based on behavior
   */
  identifyUserSegment(segment: string, confidence: number = 1.0) {
    this.userSegment = segment;
    
    if (typeof window !== 'undefined' && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        user_properties: {
          user_segment: segment,
          segment_confidence: confidence,
          traffic_source: this.trafficSource
        }
      });
    }

    // Store for session persistence
    sessionStorage.setItem('tickk_user_segment', segment);
  }

  /**
   * Track custom events with enhanced data
   */
  trackEvent(event: AnalyticsEvent) {
    if (!this.isInitialized || typeof window === 'undefined') return;

    const enhancedEvent = {
      ...event,
      user_id: this.userId,
      session_id: this.sessionId,
      user_segment: this.userSegment || 'unknown',
      traffic_source: this.trafficSource,
      timestamp: Date.now(),
      page_url: window.location.href,
      page_title: document.title
    };

    // Send to Google Analytics
    if (window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameter_1: this.userSegment,
        custom_parameter_2: this.trafficSource,
        ...event.custom_parameters
      });
    }

    // Log for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', enhancedEvent);
    }
  }

  /**
   * Track user journey events
   */
  trackUserJourney(event: Omit<UserJourneyEvent, 'user_id' | 'session_id' | 'timestamp'>) {
    const userType = this.isReturningUser() ? 'returning' : 'new';
    
    this.trackEvent({
      ...event,
      user_type: userType,
      traffic_source: this.trafficSource || 'unknown',
      timestamp: Date.now()
    } as UserJourneyEvent);
  }

  /**
   * Track conversion events with funnel analysis
   */
  trackConversion(event: Omit<ConversionEvent, 'user_id' | 'session_id'>) {
    this.trackEvent({
      ...event,
      custom_parameters: {
        ...event.custom_parameters,
        conversion_value: 1,
        funnel_position: this.getFunnelPosition(event.funnel_step),
        time_to_conversion: this.getTimeOnPage()
      }
    } as ConversionEvent);

    // Track in GA4 as conversion
    if (typeof window !== 'undefined' && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag('event', 'conversion', {
        event_category: 'conversion',
        event_label: event.conversion_type,
        value: 1,
        conversion_type: event.conversion_type,
        user_segment: event.user_segment,
        funnel_step: event.funnel_step
      });
    }
  }

  /**
   * Track content engagement with depth analysis
   */
  trackContentEngagement(event: Omit<ContentEvent, 'user_id' | 'session_id'>) {
    this.trackEvent({
      ...event,
      custom_parameters: {
        ...event.custom_parameters,
        scroll_depth: this.getScrollDepth(),
        time_on_page: this.getTimeOnPage(),
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
      }
    } as ContentEvent);
  }

  /**
   * Track FAQ interactions with specific question analysis
   */
  trackFAQInteraction(questionId: string, action: 'view' | 'expand' | 'collapse') {
    // Identify user segment based on FAQ interest
    const adhdQuestions = ['adhd-free-app', 'hyperfocus-racing-thoughts'];
    const studentQuestions = ['students-lectures'];
    const accessibilityQuestions = ['accessibility-mobility'];
    
    let inferredSegment = 'general';
    if (adhdQuestions.includes(questionId)) inferredSegment = 'adhd_focused';
    else if (studentQuestions.includes(questionId)) inferredSegment = 'student';
    else if (accessibilityQuestions.includes(questionId)) inferredSegment = 'accessibility';

    this.identifyUserSegment(inferredSegment, 0.7);

    this.trackContentEngagement({
      action: `faq_${action}`,
      category: 'content_engagement',
      label: questionId,
      content_type: 'faq',
      content_id: questionId,
      engagement_depth: action === 'expand' ? 'click' : 'view',
      custom_parameters: {
        inferred_segment: inferredSegment,
        question_category: this.getFAQCategory(questionId)
      }
    });
  }

  /**
   * Track use case card interactions
   */
  trackUseCaseInteraction(useCaseId: string, action: 'view' | 'click' | 'hover') {
    // Map use case to user segment
    const segmentMap: Record<string, string> = {
      'adhd-neurodivergent': 'adhd_focused',
      'busy-professionals': 'professional',
      'students-researchers': 'student',
      'accessibility-champions': 'accessibility',
      'creative-professionals': 'creative',
      'parents-multitaskers': 'parent'
    };

    const userSegment = segmentMap[useCaseId] || 'general';
    if (action === 'click') {
      this.identifyUserSegment(userSegment, 0.8);
    }

    this.trackContentEngagement({
      action: `use_case_${action}`,
      category: 'content_engagement',
      label: useCaseId,
      content_type: 'use_case',
      content_id: useCaseId,
      engagement_depth: action,
      custom_parameters: {
        user_segment_match: userSegment,
        card_position: this.getUseCasePosition(useCaseId)
      }
    });
  }

  /**
   * Track CTA button clicks with context
   */
  trackCTAClick(ctaId: string, context: string, ctaText: string) {
    this.trackConversion({
      action: 'cta_click',
      category: 'conversion',
      label: ctaId,
      funnel_step: 'landing_page_cta',
      conversion_type: 'landing_to_app',
      user_segment: (this.userSegment as 'adhd_focused' | 'student' | 'professional' | 'parent' | 'creative' | 'accessibility' | 'general') || 'general',
      custom_parameters: {
        cta_text: ctaText,
        cta_context: context,
        page_section: context,
        scroll_position: this.getScrollDepth()
      }
    });
  }

  /**
   * Track scroll depth for engagement analysis
   */
  trackScrollDepth() {
    if (typeof window === 'undefined') return;

    let maxScroll = 0;
    const thresholds = [25, 50, 75, 90, 100];
    const tracked = new Set<number>();

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      maxScroll = Math.max(maxScroll, scrollPercent);

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          
          this.trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            label: `${threshold}%`,
            value: threshold,
            custom_parameters: {
              page_section: this.getCurrentPageSection(scrollPercent),
              time_to_scroll: this.getTimeOnPage()
            }
          });
        }
      });
    };

    window.addEventListener('scroll', trackScroll, { passive: true });
  }

  /**
   * Track time spent on page sections
   */
  trackSectionTime(sectionId: string, timeSpent: number) {
    this.trackEvent({
      action: 'section_time',
      category: 'engagement',
      label: sectionId,
      value: Math.round(timeSpent / 1000), // Convert to seconds
      custom_parameters: {
        section_id: sectionId,
        user_segment: this.userSegment,
        engagement_quality: this.getEngagementQuality(timeSpent)
      }
    });
  }

  /**
   * Helper methods
   */
  private isReturningUser(): boolean {
    return localStorage.getItem('tickk_has_visited') === 'true';
  }

  private getFunnelPosition(step: string): number {
    const steps = ['page_view', 'scroll_25', 'use_case_view', 'faq_view', 'cta_click', 'app_visit'];
    return steps.indexOf(step) + 1;
  }

  private getTimeOnPage(): number {
    return Date.now() - (window.performance?.timing?.navigationStart || Date.now());
  }

  private getScrollDepth(): number {
    if (typeof window === 'undefined') return 0;
    return Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
  }

  private getCurrentPageSection(scrollPercent: number): string {
    if (scrollPercent < 10) return 'hero';
    if (scrollPercent < 30) return 'how_it_works';
    if (scrollPercent < 60) return 'use_cases';
    if (scrollPercent < 80) return 'demo';
    if (scrollPercent < 95) return 'faq';
    return 'footer';
  }

  private getFAQCategory(questionId: string): string {
    if (questionId.includes('adhd')) return 'adhd_focused';
    if (questionId.includes('student')) return 'education';
    if (questionId.includes('accessibility')) return 'accessibility';
    if (questionId.includes('professional')) return 'business';
    return 'general';
  }

  private getUseCasePosition(useCaseId: string): number {
    const positions = [
      'adhd-neurodivergent',
      'busy-professionals', 
      'students-researchers',
      'accessibility-champions',
      'creative-professionals',
      'parents-multitaskers'
    ];
    return positions.indexOf(useCaseId) + 1;
  }

  private getEngagementQuality(timeSpent: number): string {
    if (timeSpent < 5000) return 'low'; // Less than 5 seconds
    if (timeSpent < 15000) return 'medium'; // 5-15 seconds
    if (timeSpent < 30000) return 'high'; // 15-30 seconds
    return 'very_high'; // More than 30 seconds
  }
}

// Create singleton instance
export const enhancedAnalytics = new EnhancedAnalytics();

// Convenience functions for common tracking
export const trackPageView = (pageName: string) => {
  enhancedAnalytics.trackEvent({
    action: 'page_view',
    category: 'navigation',
    label: pageName
  });
};

export const trackCTAClick = (ctaId: string, context: string, ctaText: string) => {
  enhancedAnalytics.trackCTAClick(ctaId, context, ctaText);
};

export const trackFAQInteraction = (questionId: string, action: 'view' | 'expand' | 'collapse') => {
  enhancedAnalytics.trackFAQInteraction(questionId, action);
};

export const trackUseCaseInteraction = (useCaseId: string, action: 'view' | 'click' | 'hover') => {
  enhancedAnalytics.trackUseCaseInteraction(useCaseId, action);
};

export const identifyUserSegment = (segment: string, confidence: number = 1.0) => {
  enhancedAnalytics.identifyUserSegment(segment, confidence);
};

export const trackSectionTime = (sectionId: string, timeSpent: number) => {
  enhancedAnalytics.trackSectionTime(sectionId, timeSpent);
};

// Initialize scroll tracking on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    enhancedAnalytics.trackScrollDepth();
  });
}
