/**
 * Pro Subscription Hook
 * Manages Tickk Pro subscription state
 */

import { useState, useEffect, useCallback } from 'react';
import { getStripe, isStripeConfigured, STRIPE_PRICES } from '@/lib/stripe/config';
import toast from 'react-hot-toast';

// Storage key for subscription data
const STORAGE_KEY = 'tickk_pro_subscription';

interface SubscriptionData {
  isPro: boolean;
  subscriptionId?: string;
  customerId?: string;
  expiresAt?: number; // Unix timestamp
  plan?: 'monthly' | 'yearly';
}

interface UseProSubscriptionReturn {
  isPro: boolean;
  isLoading: boolean;
  isStripeReady: boolean;
  expiresAt: Date | null;
  plan: 'monthly' | 'yearly' | null;
  subscribe: (plan: 'monthly' | 'yearly') => Promise<void>;
  restorePurchase: () => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

/**
 * Check if running in development mode with free Pro enabled
 */
const isDevModeFree = (): boolean => {
  return process.env.NEXT_PUBLIC_DEV_MODE_FREE_PRO === 'true';
};

/**
 * Hook for managing Pro subscription
 */
export function useProSubscription(): UseProSubscriptionReturn {
  const [subscription, setSubscription] = useState<SubscriptionData>({ isPro: false });
  const [isLoading, setIsLoading] = useState(true);

  // Load subscription from storage on mount
  useEffect(() => {
    const loadSubscription = () => {
      try {
        // Check dev mode first
        if (isDevModeFree()) {
          setSubscription({
            isPro: true,
            plan: 'yearly',
            expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year from now
          });
          setIsLoading(false);
          return;
        }

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data: SubscriptionData = JSON.parse(stored);

          // Check if subscription has expired
          if (data.expiresAt && data.expiresAt < Date.now()) {
            // Subscription expired
            setSubscription({ isPro: false });
            localStorage.removeItem(STORAGE_KEY);
          } else {
            setSubscription(data);
          }
        }
      } catch (e) {
        console.error('Failed to load subscription:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscription();
  }, []);

  // Save subscription to storage
  const saveSubscription = useCallback((data: SubscriptionData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSubscription(data);
    } catch (e) {
      console.error('Failed to save subscription:', e);
    }
  }, []);

  // Subscribe to Pro
  const subscribe = useCallback(async (plan: 'monthly' | 'yearly') => {
    setIsLoading(true);

    try {
      // Check if Stripe is configured
      if (!isStripeConfigured()) {
        // For demo/development, simulate successful subscription
        const expiresAt = plan === 'yearly'
          ? Date.now() + 365 * 24 * 60 * 60 * 1000
          : Date.now() + 30 * 24 * 60 * 60 * 1000;

        saveSubscription({
          isPro: true,
          plan,
          expiresAt,
          subscriptionId: `demo_${Date.now()}`,
        });

        toast.success('Welcome to Tickk Pro! 🎉');
        return;
      }

      // Get Stripe instance
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe not available');
      }

      // Create checkout session via API
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan === 'yearly' ? STRIPE_PRICES.PRO_YEARLY : STRIPE_PRICES.PRO_MONTHLY,
          plan,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    } catch (e) {
      console.error('Subscription error:', e);
      toast.error('Failed to start subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [saveSubscription]);

  // Restore purchase (for users who already subscribed)
  const restorePurchase = useCallback(async () => {
    setIsLoading(true);

    try {
      // In production, this would verify with Stripe
      // For now, check localStorage or prompt for email
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: SubscriptionData = JSON.parse(stored);
        if (data.isPro && data.expiresAt && data.expiresAt > Date.now()) {
          setSubscription(data);
          toast.success('Subscription restored!');
          return;
        }
      }

      toast.error('No active subscription found');
    } catch (e) {
      console.error('Restore error:', e);
      toast.error('Failed to restore purchase');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cancel subscription
  const cancelSubscription = useCallback(async () => {
    setIsLoading(true);

    try {
      // In production, this would call Stripe API to cancel
      localStorage.removeItem(STORAGE_KEY);
      setSubscription({ isPro: false });
      toast.success('Subscription cancelled. You can still use Pro features until the end of your billing period.');
    } catch (e) {
      console.error('Cancel error:', e);
      toast.error('Failed to cancel subscription');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isPro: subscription.isPro,
    isLoading,
    isStripeReady: isStripeConfigured(),
    expiresAt: subscription.expiresAt ? new Date(subscription.expiresAt) : null,
    plan: subscription.plan || null,
    subscribe,
    restorePurchase,
    cancelSubscription,
  };
}

/**
 * Quick check if user has Pro (for use outside of React components)
 */
export function checkIsPro(): boolean {
  if (typeof window === 'undefined') return false;

  if (isDevModeFree()) return true;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: SubscriptionData = JSON.parse(stored);
      return data.isPro && (!data.expiresAt || data.expiresAt > Date.now());
    }
  } catch {
    return false;
  }

  return false;
}
