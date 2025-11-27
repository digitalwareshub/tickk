/**
 * Pro Gate Component
 * Gates features behind Tickk Pro subscription
 */

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useProSubscription } from '@/hooks/useProSubscription';
import { Sparkles, Lock, Zap, Check, X } from 'lucide-react';
import { PRICING } from '@/lib/stripe/config';

interface ProGateProps {
  children: ReactNode;
  feature?: string;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

/**
 * ProGate - Wraps content that requires Pro subscription
 */
export function ProGate({
  children,
  feature = 'this feature',
  fallback,
  showUpgradePrompt = true,
}: ProGateProps) {
  const { isPro, isLoading } = useProSubscription();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // User has Pro access
  if (isPro) {
    return <>{children}</>;
  }

  // Show fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Show upgrade prompt
  if (showUpgradePrompt) {
    return <UpgradePrompt feature={feature} />;
  }

  return null;
}

/**
 * Upgrade Prompt Component
 */
function UpgradePrompt({ feature }: { feature: string }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border-2 border-dashed border-orange-200 dark:border-orange-800">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">
          Upgrade to Tickk Pro
        </h3>
        <p className="text-gray-600 dark:text-slate-400 text-center mb-6 max-w-md">
          {feature} is a Pro feature. Upgrade to unlock all transformation tools and more.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
        >
          <Zap className="w-4 h-4" />
          Upgrade to Pro
        </button>
        <p className="text-sm text-gray-500 dark:text-slate-500 mt-4">
          Starting at ${PRICING.PRO.monthlyPrice}/month
        </p>
      </div>

      {showModal && <UpgradeModal onClose={() => setShowModal(false)} />}
    </>
  );
}

/**
 * Upgrade Modal Component
 */
export function UpgradeModal({ onClose }: { onClose: () => void }) {
  const { subscribe, isLoading } = useProSubscription();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const handleSubscribe = async () => {
    await subscribe(billingPeriod);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6" />
            <span className="font-bold text-lg">Tickk Pro</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">
            Unlock All Features
          </h2>
          <p className="text-orange-100">
            Transform notes, export to DOCX, and more.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                  : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                  : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                Save $10
              </span>
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-4xl font-bold text-gray-900 dark:text-slate-100">
              ${billingPeriod === 'yearly' ? PRICING.PRO.yearlyPrice : PRICING.PRO.monthlyPrice}
            </span>
            <span className="text-gray-600 dark:text-slate-400">
              /{billingPeriod === 'yearly' ? 'year' : 'month'}
            </span>
            {billingPeriod === 'yearly' && (
              <p className="text-sm text-gray-500 dark:text-slate-500 mt-1">
                That&apos;s just ${(PRICING.PRO.yearlyPrice / 12).toFixed(2)}/month
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-4">
            Pro Features:
          </h3>
          <ul className="space-y-3">
            {PRICING.PRO.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="p-6 bg-gray-50 dark:bg-slate-900">
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-slate-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Subscribe Now
              </>
            )}
          </button>
          <p className="text-center text-sm text-gray-500 dark:text-slate-500 mt-4">
            Cancel anytime. 14-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Pro Badge Component
 */
export function ProBadge({ className = '' }: { className?: string }) {
  const { isPro } = useProSubscription();

  if (!isPro) return null;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full ${className}`}>
      <Sparkles className="w-3 h-3" />
      PRO
    </span>
  );
}

/**
 * Hook to check if a feature is available
 */
export function useFeatureAccess(feature: string): { hasAccess: boolean; isLoading: boolean } {
  const { isPro, isLoading } = useProSubscription();

  // Define which features require Pro
  const proFeatures = [
    'transform',
    'summarize',
    'structure',
    'polish',
    'extract-tasks',
    'docx-export',
    'advanced-analytics',
  ];

  const requiresPro = proFeatures.includes(feature.toLowerCase());

  return {
    hasAccess: !requiresPro || isPro,
    isLoading,
  };
}
