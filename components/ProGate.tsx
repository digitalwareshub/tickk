/**
 * Pro Gate Component
 * Soft-prompts features for Tickk Pro interest without blocking usage
 */

import { ReactNode, useEffect } from 'react';
import { useProSubscription } from '@/hooks/useProSubscription';
import { Sparkles } from 'lucide-react';
import ProInterestModal from './ProInterestModal';
import { trackProductEvent } from '@/lib/analytics/enhanced-analytics';

interface ProGateProps {
  children: ReactNode;
  feature?: string;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

/**
 * ProGate - Legacy wrapper kept non-blocking while Tickk validates demand
 */
export function ProGate({
  children,
  feature = 'this feature',
}: ProGateProps) {
  const { isPro, isLoading } = useProSubscription();

  useEffect(() => {
    if (!isLoading && !isPro) {
      trackProductEvent('feature_triggered', feature, {
        source: 'pro_gate',
        feature,
      });
    }
  }, [feature, isLoading, isPro]);

  return <>{children}</>;
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
export function useFeatureAccess(): { hasAccess: boolean; isLoading: boolean } {
  const { isLoading } = useProSubscription();

  return {
    hasAccess: true,
    isLoading,
  };
}
