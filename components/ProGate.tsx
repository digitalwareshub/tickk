/**
 * Pro Gate Component
 * Gates features behind Tickk Pro access
 */

import { ReactNode, useState } from 'react';
import { useProSubscription } from '@/hooks/useProSubscription';
import { Sparkles, Lock, Zap } from 'lucide-react';
import { PRICING } from '@/lib/stripe/config';
import ProInterestModal from './ProInterestModal';
import { trackProductEvent } from '@/lib/analytics/enhanced-analytics';

interface ProGateProps {
  children: ReactNode;
  feature?: string;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

/**
 * ProGate - Wraps content that requires Pro access
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
          onClick={() => {
            trackProductEvent('pro_clicked', 'pro_gate')
            setShowModal(true)
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
        >
          <Zap className="w-4 h-4" />
          Upgrade to Pro
        </button>
        <p className="text-sm text-gray-500 dark:text-slate-500 mt-4">
          Lifetime access for ${PRICING.PRO.lifetimePrice}
        </p>
      </div>

      <ProInterestModal isOpen={showModal} onClose={() => setShowModal(false)} source="pro_gate" />
    </>
  );
}

/**
 * Upgrade Modal Component
 */
export function UpgradeModal({ onClose }: { onClose: () => void }) {
  return <ProInterestModal isOpen={true} onClose={onClose} source="upgrade_modal" />;
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
