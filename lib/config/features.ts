/**
 * Feature Flags Configuration
 *
 * Use environment variables to control feature rollout.
 * This allows us to build features in production without exposing them.
 *
 * Usage:
 * import { FEATURES } from '@/lib/config/features'
 *
 * if (FEATURES.MONETIZATION.enabled) {
 *   // Show pricing, quota limits, etc.
 * }
 */

export interface FeatureFlag {
  enabled: boolean
  description: string
  envVar: string
}

export interface FeatureFlags {
  MONETIZATION: FeatureFlag
  PRO_TIER: FeatureFlag
  PRICING_PAGE: FeatureFlag
  USAGE_QUOTAS: FeatureFlag
  CLOUD_BACKUP: FeatureFlag
  ADVANCED_EXPORTS: FeatureFlag
  ANALYTICS_DASHBOARD: FeatureFlag
  STRIPE_INTEGRATION: FeatureFlag
}

/**
 * Feature flag definitions
 * Set corresponding env vars to 'true' to enable
 */
export const FEATURES: FeatureFlags = {
  MONETIZATION: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_MONETIZATION === 'true',
    description: 'Master switch for all monetization features',
    envVar: 'NEXT_PUBLIC_ENABLE_MONETIZATION',
  },

  PRO_TIER: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_PRO_TIER === 'true',
    description: 'Enable Pro tier subscription option',
    envVar: 'NEXT_PUBLIC_ENABLE_PRO_TIER',
  },

  PRICING_PAGE: {
    enabled: process.env.NEXT_PUBLIC_SHOW_PRICING === 'true',
    description: 'Show /pricing page and navigation links',
    envVar: 'NEXT_PUBLIC_SHOW_PRICING',
  },

  USAGE_QUOTAS: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_QUOTAS === 'true',
    description: 'Enforce storage limits for free tier (500 items)',
    envVar: 'NEXT_PUBLIC_ENABLE_QUOTAS',
  },

  CLOUD_BACKUP: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_CLOUD_BACKUP === 'true',
    description: 'Cloud backup to Google Drive/Dropbox (Pro feature)',
    envVar: 'NEXT_PUBLIC_ENABLE_CLOUD_BACKUP',
  },

  ADVANCED_EXPORTS: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_ADVANCED_EXPORTS === 'true',
    description: 'Markdown, CSV, PDF export formats (Pro feature)',
    envVar: 'NEXT_PUBLIC_ENABLE_ADVANCED_EXPORTS',
  },

  ANALYTICS_DASHBOARD: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_DASHBOARD === 'true',
    description: 'Advanced productivity analytics (Pro feature)',
    envVar: 'NEXT_PUBLIC_ENABLE_ANALYTICS_DASHBOARD',
  },

  STRIPE_INTEGRATION: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_STRIPE === 'true',
    description: 'Stripe payment processing',
    envVar: 'NEXT_PUBLIC_ENABLE_STRIPE',
  },
}

/**
 * Check if any monetization feature is enabled
 */
export const isMonetizationEnabled = (): boolean => {
  return FEATURES.MONETIZATION.enabled ||
         FEATURES.PRO_TIER.enabled ||
         FEATURES.PRICING_PAGE.enabled
}

/**
 * Get all enabled features (useful for debugging)
 */
export const getEnabledFeatures = (): string[] => {
  return Object.entries(FEATURES)
    .filter(([_, flag]) => flag.enabled)
    .map(([name, _]) => name)
}

/**
 * Development helper: Log enabled features on app start
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🚀 Feature Flags:', {
    enabled: getEnabledFeatures(),
    all: FEATURES,
  })
}
