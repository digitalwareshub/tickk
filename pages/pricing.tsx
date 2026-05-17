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

const comingFeatures = [
  'Smarter transforms',
  'Saved workflows',
  'Better mind maps',
  'Advanced exports',
  'Cross-device sync (planned)',
  'Voice memo import',
  'Faster capture shortcuts',
  'Future power features',
]

export default function Pricing() {
  const [showProModal, setShowProModal] = useState(false)

  const openProModal = (source: string) => {
    trackProductEvent('pricing_clicked', source, { source })
    trackProductEvent('feature_triggered', 'pro_interest', { source, feature: 'pro_interest' })
    trackProductEvent('pro_clicked', source, { source, feature: 'pro_updates' })
    setShowProModal(true)
  }

  return (
    <>
      <Head>
        <title>Tickk Pricing - Free Brain Dumps and Product Roadmap</title>
        <meta
          name="description"
          content="Use Tickk free forever for unlimited private brain dumps. See what is coming next for Tickk and get updates on planned power features."
        />
        <meta property="og:title" content="Tickk Pricing - Free Brain Dumps and Product Roadmap" />
        <meta property="og:description" content="Free private voice brain dumps. See what is coming next for Tickk and get updates on planned power features." />
        <link rel="canonical" href="https://tickk.app/pricing" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Tickk Pricing",
              "description": "Free private voice brain dumps with planned power features including smarter transforms, saved workflows, better mind maps, advanced exports, and cross-device sync.",
              "url": "https://tickk.app/pricing",
              "about": [
                "free voice brain dump app",
                "voice brain dump app roadmap",
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
              product roadmap
            </div>
            <h1 className="mb-4 font-mono text-[clamp(1.75rem,4vw,2.4rem)] font-semibold leading-tight tracking-normal text-white">
              Tickk Pricing
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-[#a0a0a0]">
              Use Tickk free forever for unlimited private brain dumps. Get updates as we build the next power features.
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
              <h2 className="mb-2 font-mono text-2xl font-bold text-white">
                What&apos;s Coming
              </h2>
              <p className="mb-6 text-[#a0a0a0]">
                We&apos;re building features for people who use Tickk repeatedly.
              </p>
              <p className="mb-4 font-mono text-sm font-semibold text-orange-300">
                Coming next for Tickk:
              </p>
              <ul className="mb-8 space-y-3">
                {comingFeatures.map((feature) => (
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
                Get updates
              </button>
              <p className="mt-3 text-center text-xs text-[#737373]">
                Early supporters may receive future lifetime pricing.
              </p>
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
              Get updates
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
