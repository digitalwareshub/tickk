/**
 * Pro Access Hook
 * Manages local Tickk Pro lifetime access state
 */

import { useState, useEffect, useCallback } from 'react';
import { isCheckoutConfigured } from '@/lib/stripe/config';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'tickk_pro_access';

interface ProAccessData {
  isPro: boolean;
  purchaseId?: string;
  customerId?: string;
  plan?: 'lifetime';
}

interface UseProSubscriptionReturn {
  isPro: boolean;
  isLoading: boolean;
  isCheckoutReady: boolean;
  plan: 'lifetime' | null;
  requestProAccess: () => Promise<void>;
  restorePurchase: () => Promise<void>;
}

/**
 * Check if running in development mode with free Pro enabled
 */
const isDevModeFree = (): boolean => {
  return process.env.NEXT_PUBLIC_DEV_MODE_FREE_PRO === 'true';
};

/**
 * Hook for managing Pro access
 */
export function useProSubscription(): UseProSubscriptionReturn {
  const [proAccess, setProAccess] = useState<ProAccessData>({ isPro: false });
  const [isLoading, setIsLoading] = useState(true);

  // Load Pro access from storage on mount
  useEffect(() => {
    const loadProAccess = () => {
      try {
        // Check dev mode first
        if (isDevModeFree()) {
          setProAccess({
            isPro: true,
            plan: 'lifetime',
          });
          setIsLoading(false);
          return;
        }

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data: ProAccessData = JSON.parse(stored);

          setProAccess(data);
        }
      } catch (e) {
        console.error('Failed to load Pro access:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadProAccess();
  }, []);

  // Placeholder until lifetime checkout is re-enabled
  const requestProAccess = useCallback(async () => {
    setIsLoading(true);

    try {
      toast('Tickk Pro lifetime access is coming back soon.');
    } catch (e) {
      console.error('Pro access error:', e);
      toast.error('Failed to start Pro flow. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Restore purchase for users with local lifetime access
  const restorePurchase = useCallback(async () => {
    setIsLoading(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: ProAccessData = JSON.parse(stored);
        if (data.isPro) {
          setProAccess(data);
          toast.success('Pro access restored!');
          return;
        }
      }

      toast.error('No active Pro access found');
    } catch (e) {
      console.error('Restore error:', e);
      toast.error('Failed to restore purchase');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isPro: proAccess.isPro,
    isLoading,
    isCheckoutReady: isCheckoutConfigured(),
    plan: proAccess.plan || null,
    requestProAccess,
    restorePurchase,
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
      const data: ProAccessData = JSON.parse(stored);
      return data.isPro;
    }
  } catch {
    return false;
  }

  return false;
}
