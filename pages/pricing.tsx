import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import ProInterestModal from '@/components/ProInterestModal'
import { PRICING } from '@/lib/stripe/config'
import { trackProductEvent } from '@/lib/analytics/enhanced-analytics'

const freeFeatures = [
  'Unlimited voice brain dumps',
  'Organize into tasks and notes',
  'Local storage',
  'PWA install',
  'Basic export',
]

const proFeatures = [
  'Mind maps',
  'Advanced exports (Markdown, CSV, DOCX)',
  'Smart transforms',
  'Productivity templates',
  'Bulk actions',
  'Future premium features included',
]

export default function Pricing() {
  const [showProModal, setShowProModal] = useState(false)

  const openProModal = (source: string) => {
    trackProductEvent('pricing_clicked', source)
    trackProductEvent('pro_clicked', source)
    setShowProModal(true)
  }

  return (
    <>
      <Head>
        <title>Pricing - Tickk Pro Lifetime Access</title>
        <meta
          name="description"
          content="Tickk is free for unlimited voice brain dumps. Tickk Pro lifetime access unlocks mind maps, advanced exports, smart transforms, templates, bulk actions, and future premium features."
        />
        <meta property="og:title" content="Pricing - Tickk Pro Lifetime Access" />
        <meta property="og:description" content="Free voice brain dumps. Tickk Pro lifetime access for advanced productivity features." />
        <link rel="canonical" href="https://tickk.app/pricing" />
      </Head>

      <Layout className="min-h-screen bg-white dark:bg-slate-900">
        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 px-4 py-2 text-sm font-medium text-orange-700 dark:text-orange-300">
              Early adopter lifetime pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-50 mb-4">
              Simple pricing for a browser-first voice brain dump app.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-slate-300">
              Start free. Upgrade once when you want the deeper organization and export tools.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-2">
                Free
              </h2>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900 dark:text-slate-50">$0</span>
              </div>
              <ul className="mb-8 space-y-3">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex gap-3 text-gray-700 dark:text-slate-300">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/"
                className="block w-full rounded-lg bg-gray-900 dark:bg-slate-700 px-6 py-3 text-center font-semibold text-white hover:bg-gray-800 dark:hover:bg-slate-600"
              >
                Start Brain Dump
              </Link>
            </div>

            <div className="relative rounded-lg border-2 border-orange-500 bg-white dark:bg-slate-800 p-8 shadow-xl shadow-orange-100 dark:shadow-orange-950/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white">
                LIFETIME
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-2">
                Tickk Pro - Lifetime Access
              </h2>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900 dark:text-slate-50">
                  ${PRICING.PRO.lifetimePrice}
                </span>
                <span className="ml-2 text-gray-600 dark:text-slate-400">one-time</span>
              </div>
              <ul className="mb-8 space-y-3">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex gap-3 text-gray-700 dark:text-slate-300">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openProModal('pricing_card')}
                className="block w-full rounded-lg bg-orange-600 px-6 py-3 text-center font-semibold text-white hover:bg-orange-700"
              >
                Get Lifetime Pro
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 bg-gray-50 dark:bg-slate-800/50">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-4">
              Built for private capture first.
            </h2>
            <p className="text-gray-600 dark:text-slate-300 mb-8">
              Tickk keeps the core voice brain dump workflow free and local. Pro is for users who want richer organization, exports, templates, and future premium tools.
            </p>
            <button
              type="button"
              onClick={() => openProModal('pricing_bottom_cta')}
              className="inline-flex rounded-lg bg-orange-600 px-8 py-4 font-semibold text-white hover:bg-orange-700"
            >
              Get Lifetime Pro
            </button>
          </div>
        </section>
      </Layout>

      <ProInterestModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        source="pricing"
      />
    </>
  )
}
