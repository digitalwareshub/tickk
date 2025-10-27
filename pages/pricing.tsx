/**
 * Pricing Page - Sync-Based Monetization Model
 * Free: Unlimited local storage (single device)
 * Pro: Cross-device sync + advanced features
 */

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { FEATURES } from '@/lib/config/features'
import { useRouter } from 'next/router'

export default function Pricing() {
  const [mounted, setMounted] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // If pricing page is not enabled, redirect to home
    if (!FEATURES.PRICING_PAGE.enabled) {
      router.push('/')
    }
  }, [router])

  if (!mounted || !FEATURES.PRICING_PAGE.enabled) {
    return null
  }

  const tiers = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for single-device productivity',
      features: [
        { text: '✓ Unlimited voice recordings', included: true },
        { text: '✓ Unlimited local storage', included: true, highlight: true },
        { text: '✓ Single device (phone OR laptop OR desktop)', included: true },
        { text: '✓ Smart NLP classification', included: true },
        { text: '✓ Basic exports (JSON, Markdown, CSV)', included: true },
        { text: '✓ Offline PWA', included: true },
        { text: '✓ English + Spanish', included: true },
        { text: '✓ 100% private (data never leaves device)', included: true },
        { text: 'Cross-device sync', included: false },
        { text: 'Cloud backup', included: false },
        { text: 'Advanced exports (PDF)', included: false },
        { text: 'Analytics dashboard', included: false },
      ],
      cta: 'Start Free',
      ctaLink: '/',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: { monthly: 4.99, yearly: 49 },
      description: 'Sync across all your devices',
      features: [
        { text: 'Everything in Free, plus:', included: true, bold: true },
        { text: '✓ Sync across ALL devices', included: true, highlight: true },
        { text: '✓ Real-time sync (phone ↔ laptop ↔ desktop)', included: true },
        { text: '✓ Encrypted cloud backup', included: true },
        { text: '✓ Advanced exports (formatted PDF)', included: true },
        { text: '✓ Advanced analytics dashboard', included: true },
        { text: '✓ Custom voice commands', included: true },
        { text: '✓ Priority support (24h response)', included: true },
        { text: '✓ Pro badge', included: true },
        { text: '✓ Early access to new features', included: true },
      ],
      cta: 'Upgrade to Pro',
      ctaLink: '#', // Will connect to Stripe later
      highlighted: true,
      popular: true,
    },
  ]

  const faqs = [
    {
      question: 'Why is local storage unlimited but sync costs money?',
      answer: 'Your local data costs us nothing - it\'s stored on YOUR device using your browser\'s storage. Sync infrastructure (servers, bandwidth, real-time updates, conflict resolution) costs real money to run and maintain. We only charge for what actually costs us to provide.',
    },
    {
      question: 'How many devices can I use with the free plan?',
      answer: 'The free plan works on one device at a time. You can use it on your phone, laptop, or desktop - but your data stays local to that device only. With Pro, your data syncs across unlimited devices automatically.',
    },
    {
      question: 'What happens if I upgrade to Pro and then cancel?',
      answer: 'You can export all your data anytime. After canceling Pro, sync stops but you keep all your data locally on each device. You can continue using the free tier on any single device with all your existing data.',
    },
    {
      question: 'Is my data still private with Pro sync?',
      answer: 'Absolutely! Your tasks and notes are end-to-end encrypted before leaving your device. We only see encrypted data on our servers - we literally cannot read your productivity data. With optional cloud backup, data is encrypted to YOUR Google Drive or Dropbox account.',
    },
    {
      question: 'How does sync work technically?',
      answer: 'When you create or edit an item on one device, it\'s encrypted and securely synced to our servers, then pushed to your other devices in real-time. Conflicts are automatically resolved intelligently. All sync happens in the background - you just use the app naturally.',
    },
    {
      question: 'Can I try Pro before paying?',
      answer: 'We offer a 14-day free trial of Pro when you first sign up for sync. No credit card required upfront. Cancel anytime during the trial with no charges.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, Amex), Apple Pay, and Google Pay through Stripe. We never see or store your payment information.',
    },
    {
      question: 'Can I switch from monthly to yearly billing?',
      answer: 'Yes! Switch anytime from your account settings. Yearly billing saves you $10 (equivalent to 2 months free). The change takes effect at your next billing date.',
    },
  ]

  const comparisonFeatures = [
    { feature: 'Voice recordings', free: 'Unlimited', pro: 'Unlimited' },
    { feature: 'Local storage', free: 'Unlimited', pro: 'Unlimited' },
    { feature: 'Number of devices', free: '1 device', pro: 'Unlimited', highlight: true },
    { feature: 'Cross-device sync', free: '✗', pro: '✓ Real-time', highlight: true },
    { feature: 'Smart classification', free: '✓', pro: '✓' },
    { feature: 'Basic exports (JSON, MD, CSV)', free: '✓', pro: '✓' },
    { feature: 'Advanced exports (PDF)', free: '✗', pro: '✓' },
    { feature: 'Cloud backup (encrypted)', free: '✗', pro: '✓' },
    { feature: 'Advanced analytics', free: 'Basic', pro: 'Advanced' },
    { feature: 'Custom voice commands', free: '✗', pro: '✓' },
    { feature: 'Priority support', free: 'Community', pro: '24h email' },
    { feature: 'Early access', free: '✗', pro: '✓' },
  ]

  return (
    <>
      <Head>
        <title>Pricing - Tickk Pro</title>
        <meta name="description" content="Unlimited local storage, forever free. Upgrade to sync across all your devices. Simple, honest pricing for voice productivity." />
        <meta property="og:title" content="Pricing - Tickk Pro" />
        <meta property="og:description" content="Unlimited local storage, forever free. Upgrade to sync across all your devices." />
        <link rel="canonical" href="https://tickk.app/pricing" />
      </Head>

      <Layout className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-green-600"></span>
              Simple, Honest Pricing
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Unlimited Local Storage.
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent block mt-2">
                Sync When You Need It.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Store unlimited items on your device for free. Upgrade to sync across phone, laptop, and desktop.
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Unlimited local storage</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>100% private (local-first)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free forever</span>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                style={{ backgroundColor: billingPeriod === 'yearly' ? '#ea580c' : '#d1d5db' }}
                aria-label="Toggle billing period"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly
              </span>
              {billingPeriod === 'yearly' && (
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Save $10
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border-2 p-8 ${
                    tier.highlighted
                      ? 'border-orange-500 shadow-xl shadow-orange-100'
                      : 'border-gray-200'
                  }`}
                >
                  {/* Popular Badge */}
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  {/* Tier Name */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-sm text-gray-600">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {tier.price.monthly === 0 ? (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">$0</span>
                        <span className="ml-2 text-gray-600">/forever</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-gray-900">
                            ${billingPeriod === 'monthly' ? tier.price.monthly : tier.price.yearly}
                          </span>
                          <span className="ml-2 text-gray-600">
                            /{billingPeriod === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                        {billingPeriod === 'yearly' && (
                          <p className="text-sm text-gray-500 mt-1">
                            ${(tier.price.yearly / 12).toFixed(2)}/month billed annually
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={tier.ctaLink}
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold mb-6 transition-colors ${
                      tier.highlighted
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {tier.cta}
                  </Link>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className={`text-sm ${
                          'bold' in feature && feature.bold
                            ? 'font-semibold text-gray-900'
                            : 'highlight' in feature && feature.highlight
                            ? 'font-medium text-gray-900'
                            : 'text-gray-600'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Sync Costs Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Why We Charge for Sync
            </h2>
            <p className="text-gray-600 text-center mb-12">
              We believe in honest, transparent pricing
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Free (No Cost to Us) */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Free Forever</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Your local data costs us <strong>$0</strong> to store - it&apos;s on YOUR device using YOUR browser&apos;s storage.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• No servers needed</li>
                  <li>• No bandwidth costs</li>
                  <li>• No storage fees</li>
                  <li>• Completely free to provide</li>
                </ul>
              </div>

              {/* Pro (Real Costs) */}
              <div className="bg-white rounded-xl p-6 border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Pro Sync</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Sync infrastructure costs <strong>real money</strong> to run and maintain reliably.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Server infrastructure</li>
                  <li>• Database hosting</li>
                  <li>• Bandwidth for real-time sync</li>
                  <li>• Conflict resolution logic</li>
                  <li>• 24/7 uptime monitoring</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <strong>Bottom line:</strong> We only charge for features that cost us money to provide.
                Local storage is truly unlimited and free forever.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Feature Comparison
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Choose the plan that fits your workflow
            </p>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-orange-50">Pro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisonFeatures.map((row, idx) => (
                      <tr key={idx} className={`hover:bg-gray-50 ${row.highlight ? 'bg-orange-50/30' : ''}`}>
                        <td className={`px-6 py-4 text-sm font-medium ${row.highlight ? 'text-gray-900' : 'text-gray-900'}`}>
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.free}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-center font-semibold bg-orange-50/50">{row.pro}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Everything you need to know about Tickk Pro
            </p>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-white rounded-lg border border-gray-200 p-6">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <svg
                      className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Start free with unlimited local storage. Upgrade anytime for sync across all your devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Start Free Now
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Try Pro Free (14 Days)
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Questions? <Link href="/contact" className="text-white underline hover:text-gray-200">Contact us</Link>
            </p>
          </div>
        </section>
      </Layout>
    </>
  )
}
