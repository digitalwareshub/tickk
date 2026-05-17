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
    trackProductEvent('pricing_clicked', source, { source })
    trackProductEvent('pro_clicked', source, { source, feature: 'lifetime_pro' })
    setShowProModal(true)
  }

  return (
    <>
      <Head>
        <title>Tickk Pricing - Free Brain Dumps and Lifetime Pro</title>
        <meta
          name="description"
          content="Use Tickk free for unlimited voice brain dumps. Tickk Pro Lifetime unlocks mind maps, advanced exports, smart transforms, templates, bulk actions, and future premium features."
        />
        <meta property="og:title" content="Tickk Pricing - Free Brain Dumps and Lifetime Pro" />
        <meta property="og:description" content="Free voice brain dumps. Tickk Pro Lifetime access for advanced productivity features." />
        <link rel="canonical" href="https://tickk.app/pricing" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Tickk Pricing",
              "description": "Free voice brain dumps with optional Tickk Pro Lifetime access for mind maps, advanced exports, smart transforms, templates, bulk actions, and future premium features.",
              "url": "https://tickk.app/pricing",
              "about": [
                "free voice brain dump app",
                "lifetime pro productivity app",
                "voice notes to tasks pricing"
              ],
              "isPartOf": {
                "@type": "WebSite",
                "name": "Tickk",
                "url": "https://tickk.app"
              }
            })
          }}
        />
      </Head>

      <Layout className="min-h-screen bg-[#1a1b26] text-white">
        <section className="border-b border-[#333333] px-6 py-12">
          <div className="mx-auto max-w-[900px] text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[#333333] bg-white/[0.02] px-4 py-2 font-mono text-xs lowercase text-[#a0a0a0]">
              early adopter lifetime pricing
            </div>
            <h1 className="mb-4 font-mono text-[clamp(1.75rem,4vw,2.4rem)] font-semibold leading-tight tracking-normal text-white">
              Simple pricing for a browser-first voice brain dump app.
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-[#a0a0a0]">
              Start free. Upgrade once when you want the deeper organization and export tools.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto grid max-w-[900px] gap-4 md:grid-cols-2">
            <div className="rounded-md border border-[#333333] bg-white/[0.02] p-6">
              <h2 className="mb-2 font-mono text-2xl font-bold text-white">
                Free
              </h2>
              <div className="mb-6 flex items-baseline">
                <span className="font-mono text-4xl font-bold text-white">$0</span>
              </div>
              <ul className="mb-8 space-y-3">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[#a0a0a0]">
                    <span className="text-orange-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/"
                className="block w-full rounded-md border border-[#333333] bg-white/[0.03] px-6 py-3 text-center font-mono text-sm font-semibold lowercase text-white transition-colors hover:border-orange-500 hover:text-orange-300"
              >
                Start Brain Dump
              </Link>
            </div>

            <div className="relative rounded-md border border-orange-500 bg-white/[0.02] p-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-md bg-orange-600 px-3 py-1 font-mono text-xs font-bold lowercase text-white">
                LIFETIME
              </div>
              <h2 className="mb-2 font-mono text-2xl font-bold text-white">
                Tickk Pro - Lifetime Access
              </h2>
              <div className="mb-6 flex items-baseline">
                <span className="font-mono text-4xl font-bold text-white">
                  ${PRICING.PRO.lifetimePrice}
                </span>
                <span className="ml-2 text-[#a0a0a0]">one-time</span>
              </div>
              <ul className="mb-8 space-y-3">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[#a0a0a0]">
                    <span className="text-orange-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openProModal('pricing_card')}
                className="block w-full rounded-md bg-orange-600 px-6 py-3 text-center font-mono text-sm font-semibold lowercase text-white transition-colors hover:bg-orange-500"
              >
                Get Lifetime Pro
              </button>
            </div>
          </div>
        </section>

        <section className="border-t border-[#333333] px-6 py-12">
          <div className="mx-auto max-w-[900px] text-center">
            <h2 className="mb-4 font-mono text-3xl font-bold text-white">
              Built for private capture first.
            </h2>
            <p className="mb-8 text-[#a0a0a0]">
              Tickk keeps the core voice brain dump workflow free and local. Pro is for users who want richer organization, exports, templates, and future premium tools.
            </p>
            <button
              type="button"
              onClick={() => openProModal('pricing_bottom_cta')}
              className="inline-flex rounded-md bg-orange-600 px-8 py-4 font-mono text-sm font-semibold lowercase text-white transition-colors hover:bg-orange-500"
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
