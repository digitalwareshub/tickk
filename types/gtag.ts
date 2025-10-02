/**
 * Comprehensive Google Analytics 4 (gtag) Type Definitions
 * Provides complete type safety for all gtag functions and parameters
 */

// Core gtag command types
export type GtagCommand = 'config' | 'event' | 'js' | 'set' | 'get' | 'consent'

// GA4 Configuration options
export interface GtagConfigOptions {
  // Core configuration
  page_path?: string
  page_title?: string
  page_location?: string
  send_page_view?: boolean
  
  // Privacy and compliance
  anonymize_ip?: boolean
  cookie_flags?: string
  cookie_domain?: string
  cookie_expires?: number
  cookie_prefix?: string
  
  // Custom parameters
  custom_map?: Record<string, string>
  user_properties?: Record<string, string | number | boolean>
  
  // Enhanced measurement
  enhanced_measurement?: boolean
  enhanced_measurement_id?: string
  
  // Debugging
  debug_mode?: boolean
  test_mode?: boolean
  
  // Custom dimensions and metrics
  custom_dimensions?: Record<string, string | number>
  custom_metrics?: Record<string, number>
  
  // Ecommerce
  currency?: string
  country?: string
  language?: string
  
  // Traffic sources
  traffic_source?: string
  campaign_source?: string
  campaign_medium?: string
  campaign_name?: string
  
  // User identification
  user_id?: string
  client_id?: string
  
  // Content grouping
  content_group1?: string
  content_group2?: string
  content_group3?: string
  content_group4?: string
  content_group5?: string
}

// Event parameters for gtag events
export interface GtagEventParameters {
  // Standard event parameters
  event_category?: string
  event_label?: string
  value?: number
  currency?: string
  
  // Custom parameters
  custom_parameters?: Record<string, string | number | boolean | null | undefined>
  
  // Ecommerce parameters
  transaction_id?: string
  items?: GtagItem[]
  
  // User engagement
  engagement_time_msec?: number
  session_id?: string
  
  // Content parameters
  content_type?: string
  content_id?: string
  content_name?: string
  
  // Traffic source parameters
  source?: string
  medium?: string
  campaign?: string
  term?: string
  
  // User properties
  user_properties?: Record<string, string | number | boolean>
  
  // Custom dimensions and metrics
  custom_dimension_1?: string
  custom_dimension_2?: string
  custom_dimension_3?: string
  custom_dimension_4?: string
  custom_dimension_5?: string
  
  custom_metric_1?: number
  custom_metric_2?: number
  custom_metric_3?: number
  custom_metric_4?: number
  custom_metric_5?: number
}

// Ecommerce item interface
export interface GtagItem {
  item_id?: string
  item_name?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_brand?: string
  item_variant?: string
  price?: number
  quantity?: number
  discount?: number
  affiliation?: string
  coupon?: string
  currency?: string
  creative_name?: string
  creative_slot?: string
  location_id?: string
  promotion_id?: string
  promotion_name?: string
}

// User properties for gtag set
export interface GtagSetParameters {
  user_properties?: Record<string, string | number | boolean>
  custom_map?: Record<string, string>
  user_id?: string
  client_id?: string
}

// Consent parameters
export interface GtagConsentParameters {
  ad_storage?: 'granted' | 'denied'
  analytics_storage?: 'granted' | 'denied'
  functionality_storage?: 'granted' | 'denied'
  personalization_storage?: 'granted' | 'denied'
  security_storage?: 'granted' | 'denied'
  wait_for_update?: number
  region?: string[]
}

// Main gtag function with overloads for different commands
export interface GtagFunction {
  // Config command
  (command: 'config', targetId: string, config?: GtagConfigOptions): void
  
  // Event command
  (command: 'event', eventName: string, parameters?: GtagEventParameters): void
  
  // JS command (initialize)
  (command: 'js', date: Date): void
  
  // Set command (user properties)
  (command: 'set', parameters: GtagSetParameters): void
  
  // Get command (retrieve data)
  (command: 'get', targetId: string, fieldName: string, callback?: (field: unknown) => void): void
  
  // Consent command
  (command: 'consent', action: 'default' | 'update', parameters?: GtagConsentParameters): void
}

// Global window interface extension
declare global {
  interface Window {
    gtag: GtagFunction
    dataLayer: Record<string, unknown>[]
  }
}

// Helper function to check if gtag is available
export function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

// Helper function to safely call gtag
export function safeGtagCall(
  command: GtagCommand,
  targetId?: string | Date | object,
  config?: GtagConfigOptions | GtagEventParameters | GtagSetParameters | GtagConsentParameters
): void {
  if (isGtagAvailable()) {
    try {
      if (command === 'js' && targetId instanceof Date) {
        window.gtag(command, targetId)
      } else if (command === 'config' && typeof targetId === 'string') {
        window.gtag(command, targetId, config as GtagConfigOptions)
      } else if (command === 'event' && typeof targetId === 'string') {
        window.gtag(command, targetId, config as GtagEventParameters)
      } else if (command === 'set') {
        window.gtag(command, config as GtagSetParameters)
      } else if (command === 'consent' && typeof targetId === 'string') {
        window.gtag(command, targetId as 'default' | 'update', config as GtagConsentParameters)
      }
    } catch (error) {
      console.error('Error calling gtag:', error)
    }
  }
}

// Types are already exported above, no need to re-export
