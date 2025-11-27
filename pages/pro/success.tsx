/**
 * Pro Subscription Success Page
 * Shown after successful Stripe checkout
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import confetti from '@/lib/confetti';

export default function ProSuccessPage() {
  const router = useRouter();
  const { plan } = router.query;
  const [countdown, setCountdown] = useState(5);

  // Store subscription data and trigger confetti
  useEffect(() => {
    if (router.isReady && plan) {
      // Store subscription data
      const subscriptionData = {
        isPro: true,
        plan: plan as 'monthly' | 'yearly',
        expiresAt: plan === 'yearly'
          ? Date.now() + 365 * 24 * 60 * 60 * 1000
          : Date.now() + 30 * 24 * 60 * 60 * 1000,
        subscribedAt: Date.now(),
      };

      try {
        localStorage.setItem('tickk_pro_subscription', JSON.stringify(subscriptionData));
      } catch (e) {
        console.error('Failed to store subscription:', e);
      }

      // Trigger confetti
      confetti();
    }
  }, [router.isReady, plan]);

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/transform');
    }
  }, [countdown, router]);

  return (
    <>
      <Head>
        <title>Welcome to Tickk Pro!</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Layout className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Welcome Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-50 text-center mb-4">
            Welcome to Tickk Pro!
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 text-center mb-8 max-w-md">
            Your subscription is now active. You have full access to all Pro features.
          </p>

          {/* Plan Info */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 mb-8 text-center">
            <p className="text-sm text-gray-500 dark:text-slate-500 mb-2">Your Plan</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {plan === 'yearly' ? 'Pro Yearly' : 'Pro Monthly'}
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/transform"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors mb-4"
          >
            Start Transforming Notes
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-sm text-gray-500 dark:text-slate-500">
            Redirecting to Transform in {countdown} seconds...
          </p>
        </div>
      </Layout>
    </>
  );
}
