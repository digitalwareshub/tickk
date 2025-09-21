/**
 * React hooks for analytics integration
 * Provides easy-to-use hooks for tracking user interactions
 */

import { useEffect, useRef, useCallback } from 'react';
import { 
  enhancedAnalytics, 
  trackCTAClick, 
  trackFAQInteraction, 
  trackUseCaseInteraction,
  trackSectionTime,
  identifyUserSegment
} from '@/lib/analytics/enhanced-analytics';

/**
 * Hook to track section visibility and time spent
 */
export const useSectionTracking = (sectionId: string, threshold: number = 0.5) => {
  const sectionRef = useRef<HTMLElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisibleRef.current) {
            // Section became visible
            isVisibleRef.current = true;
            startTimeRef.current = Date.now();
            
            enhancedAnalytics.trackEvent({
              action: 'section_view',
              category: 'engagement',
              label: sectionId,
              custom_parameters: {
                visibility_threshold: threshold,
                scroll_position: Math.round(window.scrollY)
              }
            });
          } else if (!entry.isIntersecting && isVisibleRef.current) {
            // Section became invisible
            isVisibleRef.current = false;
            
            if (startTimeRef.current) {
              const timeSpent = Date.now() - startTimeRef.current;
              trackSectionTime(sectionId, timeSpent);
              startTimeRef.current = null;
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      
      // Track final time if still visible
      if (isVisibleRef.current && startTimeRef.current) {
        const timeSpent = Date.now() - startTimeRef.current;
        trackSectionTime(sectionId, timeSpent);
      }
    };
  }, [sectionId, threshold]);

  return sectionRef;
};

/**
 * Hook to track CTA button interactions
 */
export const useCTATracking = (ctaId: string, context: string) => {
  const handleClick = useCallback((ctaText: string) => {
    trackCTAClick(ctaId, context, ctaText);
  }, [ctaId, context]);

  return { trackClick: handleClick };
};

/**
 * Hook to track FAQ interactions with state management
 */
export const useFAQTracking = (questionId: string) => {
  const hasViewedRef = useRef(false);

  const trackView = useCallback(() => {
    if (!hasViewedRef.current) {
      hasViewedRef.current = true;
      trackFAQInteraction(questionId, 'view');
    }
  }, [questionId]);

  const trackExpand = useCallback(() => {
    trackFAQInteraction(questionId, 'expand');
  }, [questionId]);

  const trackCollapse = useCallback(() => {
    trackFAQInteraction(questionId, 'collapse');
  }, [questionId]);

  return {
    trackView,
    trackExpand,
    trackCollapse
  };
};

/**
 * Hook to track use case card interactions
 */
export const useUseCaseTracking = (useCaseId: string) => {
  const hasViewedRef = useRef(false);

  const trackView = useCallback(() => {
    if (!hasViewedRef.current) {
      hasViewedRef.current = true;
      trackUseCaseInteraction(useCaseId, 'view');
    }
  }, [useCaseId]);

  const trackClick = useCallback(() => {
    trackUseCaseInteraction(useCaseId, 'click');
  }, [useCaseId]);

  const trackHover = useCallback(() => {
    trackUseCaseInteraction(useCaseId, 'hover');
  }, [useCaseId]);

  return {
    trackView,
    trackClick,
    trackHover
  };
};

/**
 * Hook to track form interactions
 */
export const useFormTracking = (formId: string) => {
  const trackFormStart = useCallback(() => {
    enhancedAnalytics.trackEvent({
      action: 'form_start',
      category: 'engagement',
      label: formId
    });
  }, [formId]);

  const trackFormComplete = useCallback((fields: Record<string, any>) => {
    enhancedAnalytics.trackConversion({
      action: 'form_complete',
      category: 'conversion',
      label: formId,
      funnel_step: 'form_submission',
      conversion_type: 'landing_to_app',
      user_segment: 'general',
      custom_parameters: {
        form_fields: Object.keys(fields).length,
        completion_time: Date.now()
      }
    });
  }, [formId]);

  const trackFieldFocus = useCallback((fieldName: string) => {
    enhancedAnalytics.trackEvent({
      action: 'field_focus',
      category: 'engagement',
      label: `${formId}_${fieldName}`
    });
  }, [formId]);

  return {
    trackFormStart,
    trackFormComplete,
    trackFieldFocus
  };
};

/**
 * Hook to track link clicks with external/internal detection
 */
export const useLinkTracking = () => {
  const trackLinkClick = useCallback((url: string, linkText: string, context: string) => {
    const isExternal = url.startsWith('http') && !url.includes(window.location.hostname);
    const isGitHub = url.includes('github.com');
    const isBlog = url.includes('/blog');

    let conversionType: any = 'internal_navigation';
    if (isGitHub) conversionType = 'github_click';
    else if (isBlog) conversionType = 'blog_to_app';
    else if (isExternal) conversionType = 'external_link';

    enhancedAnalytics.trackConversion({
      action: 'link_click',
      category: 'navigation',
      label: url,
      funnel_step: 'link_click',
      conversion_type: conversionType,
      user_segment: 'general',
      custom_parameters: {
        link_text: linkText,
        link_context: context,
        is_external: isExternal,
        is_github: isGitHub,
        is_blog: isBlog
      }
    });
  }, []);

  return { trackLinkClick };
};

/**
 * Hook to track user segment identification
 */
export const useUserSegmentation = () => {
  const identifySegment = useCallback((segment: string, confidence: number = 1.0, reason: string) => {
    identifyUserSegment(segment, confidence);
    
    enhancedAnalytics.trackEvent({
      action: 'segment_identified',
      category: 'user_behavior',
      label: segment,
      value: Math.round(confidence * 100),
      custom_parameters: {
        identification_reason: reason,
        confidence_score: confidence,
        timestamp: Date.now()
      }
    });
  }, []);

  return { identifySegment };
};

/**
 * Hook to track page performance and user experience
 */
export const usePerformanceTracking = (pageName: string) => {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        enhancedAnalytics.trackEvent({
          action: 'web_vital_lcp',
          category: 'performance',
          label: pageName,
          value: Math.round(lastEntry.startTime),
          custom_parameters: {
            metric_type: 'largest_contentful_paint',
            page_name: pageName
          }
        });
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          enhancedAnalytics.trackEvent({
            action: 'web_vital_fid',
            category: 'performance',
            label: pageName,
            value: Math.round(entry.processingStart - entry.startTime),
            custom_parameters: {
              metric_type: 'first_input_delay',
              page_name: pageName
            }
          });
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        
        enhancedAnalytics.trackEvent({
          action: 'web_vital_cls',
          category: 'performance',
          label: pageName,
          value: Math.round(clsValue * 1000), // Convert to milliseconds
          custom_parameters: {
            metric_type: 'cumulative_layout_shift',
            page_name: pageName
          }
        });
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Track after page load
    if (document.readyState === 'complete') {
      trackWebVitals();
    } else {
      window.addEventListener('load', trackWebVitals);
    }
  }, [pageName]);
};

/**
 * Hook to track search and filter interactions
 */
export const useSearchTracking = () => {
  const trackSearch = useCallback((query: string, results: number, context: string) => {
    enhancedAnalytics.trackEvent({
      action: 'search',
      category: 'engagement',
      label: query,
      value: results,
      custom_parameters: {
        search_query: query,
        results_count: results,
        search_context: context,
        query_length: query.length
      }
    });
  }, []);

  const trackFilter = useCallback((filterType: string, filterValue: string, results: number) => {
    enhancedAnalytics.trackEvent({
      action: 'filter',
      category: 'engagement',
      label: `${filterType}:${filterValue}`,
      value: results,
      custom_parameters: {
        filter_type: filterType,
        filter_value: filterValue,
        results_count: results
      }
    });
  }, []);

  return { trackSearch, trackFilter };
};

/**
 * Hook to track error events
 */
export const useErrorTracking = () => {
  const trackError = useCallback((error: Error, context: string, severity: 'low' | 'medium' | 'high' | 'critical') => {
    enhancedAnalytics.trackEvent({
      action: 'error',
      category: 'technical',
      label: error.name,
        custom_parameters: {
          error_message: error.message,
          error_stack: error.stack?.substring(0, 500) || '', // Limit stack trace length
          error_context: context,
          severity: severity,
          user_agent: navigator.userAgent,
          page_url: window.location.href
        }
    });
  }, []);

  const trackJavaScriptError = useCallback((errorEvent: ErrorEvent) => {
    enhancedAnalytics.trackEvent({
      action: 'javascript_error',
      category: 'technical',
      label: errorEvent.filename || 'unknown',
      custom_parameters: {
        error_message: errorEvent.message,
        error_filename: errorEvent.filename,
        error_line: errorEvent.lineno,
        error_column: errorEvent.colno,
        page_url: window.location.href
      }
    });
  }, []);

  // Set up global error tracking
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackJavaScriptError(event);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      enhancedAnalytics.trackEvent({
        action: 'unhandled_promise_rejection',
        category: 'technical',
        label: 'promise_rejection',
        custom_parameters: {
          rejection_reason: String(event.reason),
          page_url: window.location.href
        }
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [trackJavaScriptError]);

  return { trackError };
};
