import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import ProInterestModal from '@/components/ProInterestModal'
import { trackProductEvent } from '@/lib/analytics/enhanced-analytics'

const freeFeatures = [
  'Unlimited voice brain dumps',
  'Organize into tasks and notes',
  'Local storage',
  'PWA install',
  'JSON backup/import',
  'Basic CSV export',
  'Experience transforms',
  'Starter templates',
  'Mind map preview',
]

const proFeatures = [
  'Unlimited smart transforms',
  'Full mind maps',
  'Advanced exports: Markdown, DOCX',
  'More export formats coming',
  'Saved transform workflows',
  'Unlimited templates',
  'Bulk actions',
  'Future premium features included',
]

export default function Pricing() {
  const [showProModal, setShowProModal] = useState(false)

  const openProModal = (source: string) => {
    trackProductEvent('pricing_clicked', source, { source })
    trackProductEvent('feature_triggered', 'pro_interest', { source, feature: 'pro_interest' })
    trackProductEvent('pro_clicked', source, { source, feature: 'lifetime_pro' })
    setShowProModal(true)
  }

  return (
    <>
      <Head>
        <title>Tickk Pricing - Free Brain Dumps and Pro Early Access</title>
        <meta
          name="description"
          content="Use Tickk free forever for unlimited private brain dumps. Join early access for planned smart transforms, full mind maps, advanced exports, templates, and saved workflows."
        />
        <meta property="og:title" content="Tickk Pricing - Free Brain Dumps and Pro Early Access" />
        <meta property="og:description" content="Free private voice brain dumps. Join Tickk Pro early access for planned power workflows and advanced exports." />
        <link rel="canonical" href="https://tickk.app/pricing" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Tickk Pricing",
              "description": "Free private voice brain dumps with optional Tickk Pro early access for smart transforms, full mind maps, advanced exports, templates, saved workflows, and future premium features.",
              "url": "https://tickk.app/pricing",
              "about": [
                "free voice brain dump app",
                "pro early access productivity app",
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
              pro early access
            </div>
            <h1 className="mb-4 font-mono text-[clamp(1.75rem,4vw,2.4rem)] font-semibold leading-tight tracking-normal text-white">
              Tickk Pricing
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-[#a0a0a0]">
              Use Tickk free forever for unlimited private brain dumps. Join early access for planned power features.
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
                Tickk Pro Early Access
              </h2>
              <p className="mb-6 text-[#a0a0a0]">
                Planned power features. Pricing is not live yet.
              </p>
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
                Join early access
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
              Tickk keeps the core voice brain dump workflow free and local. Pro is for users who want faster workflows, full mind maps, advanced exports, unlimited templates, and future premium tools.
            </p>
            <button
              type="button"
              onClick={() => openProModal('pricing_bottom_cta')}
              className="inline-flex rounded-md bg-orange-600 px-8 py-4 font-mono text-sm font-semibold lowercase text-white transition-colors hover:bg-orange-500"
            >
              Join early access
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
