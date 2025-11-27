/**
 * Stripe Configuration
 * Tickk Pro Payment Integration
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe publishable key (safe for client-side)
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Stripe price IDs
export const STRIPE_PRICES = {
  PRO_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID || '',
  PRO_YEARLY: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID || '',
};

// Singleton Stripe instance
let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Get Stripe instance (lazy loaded)
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise || Promise.resolve(null);
};

/**
 * Check if Stripe is configured
 */
export const isStripeConfigured = (): boolean => {
  return Boolean(stripePublishableKey && STRIPE_PRICES.PRO_MONTHLY);
};

/**
 * Pricing tiers
 */
export const PRICING = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Unlimited voice recordings',
      'Unlimited local storage',
      'Smart NLP classification',
      'Basic exports (JSON, CSV, ICS)',
      'Offline PWA',
      '100% private',
    ],
  },
  PRO: {
    name: 'Pro',
    monthlyPrice: 4.99,
    yearlyPrice: 49,
    features: [
      'Everything in Free, plus:',
      'Transform Notes (Summarize, Structure, Polish, Tasks)',
      'DOCX Export',
      'Advanced analytics dashboard',
      'Priority support',
      'Early access to new features',
    ],
  },
};
