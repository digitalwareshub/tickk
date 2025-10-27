/**
 * Pricing Page - Clean, Minimal Design
 * Shows Free, Pro, and Enterprise tiers with clear value props
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
      description: 'Perfect for getting started',
      features: [
        { text: 'Unlimited voice recordings', included: true },
        { text: '500 items storage', included: true },
        { text: '30 days history', included: true },
        { text: 'Smart NLP classification', included: true },
        { text: 'Basic export (JSON)', included: true },
        { text: 'Offline PWA', included: true },
        { text: 'English + Spanish', included: true },
        { text: 'Advanced exports', included: false },
        { text: 'Cloud backup', included: false },
        { text: 'Analytics dashboard', included: false },
      ],
      cta: 'Start Free',
      ctaLink: '/',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: { monthly: 4.99, yearly: 49 },
      description: 'Unlimited power for productivity enthusiasts',
      features: [
        { text: 'Everything in Free, plus:', included: true, bold: true },
        { text: '✓ Unlimited storage', included: true },
        { text: '✓ Forever history', included: true },
        { text: '✓ Advanced exports (MD, CSV, PDF)', included: true },
        { text: '✓ Cloud backup (E2E encrypted)', included: true },
        { text: '✓ Advanced analytics', included: true },
        { text: '✓ Custom voice commands', included: true },
        { text: '✓ Priority support (24h)', included: true },
        { text: '✓ Pro badge', included: true },
        { text: '✓ Early access to features', included: true },
      ],
      cta: 'Upgrade to Pro',
      ctaLink: '#', // Will connect to Stripe later
      highlighted: true,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: { monthly: null, yearly: null },
      description: 'Custom solutions for teams',
      features: [
        { text: 'Everything in Pro, plus:', included: true, bold: true },
        { text: '✓ Team workspaces', included: true },
        { text: '✓ Admin dashboard', included: true },
        { text: '✓ SSO integration', included: true },
        { text: '✓ API access', included: true },
        { text: '✓ White-label option', included: true },
        { text: '✓ Dedicated support', included: true },
        { text: '✓ SLA guarantees', included: true },
        { text: '✓ On-premise deployment', included: true },
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlighted: false,
    },
  ]

  const faqs = [
    {
      question: 'What happens when I reach 500 items on the free plan?',
      answer: 'You\'ll see a friendly reminder to upgrade or clean up old items. We give you a grace period of 20 extra items (520 total) so you\'re never blocked suddenly. You can export your data, delete old items, or upgrade to Pro for unlimited storage.',
    },
    {
      question: 'Can I cancel my Pro subscription anytime?',
      answer: 'Absolutely! Cancel anytime from your account settings. Your Pro features will remain active until the end of your billing period. No questions asked, no hassle.',
    },
    {
      question: 'Is my data still private with Pro?',
      answer: 'Yes! Your tasks and notes NEVER leave your device. With Pro, we only store your email and subscription status. Cloud backup (optional Pro feature) uses end-to-end encryption to YOUR Google Drive or Dropbox - we never see your data.',
    },
    {
      question: 'What\'s included in cloud backup?',
      answer: 'Cloud backup automatically encrypts and saves your data to your own Google Drive or Dropbox account. Only you have the encryption key - we literally cannot read your data. It\'s an optional Pro feature you can enable in settings.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes! If you\'re not satisfied within the first 30 days, we\'ll refund you in full, no questions asked. Just email support@tickk.app.',
    },
    {
      question: 'Can I switch from monthly to yearly billing?',
      answer: 'Yes! You can switch anytime from your account settings. When you switch to yearly, you save $10 (2 months free) and the change takes effect at your next billing date.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, Amex), Apple Pay, and Google Pay through our secure payment processor Stripe. We never see or store your payment information.',
    },
  ]

  return (
    <>
      <Head>
        <title>Pricing - Tickk Pro</title>
        <meta name="description" content="Free forever, or upgrade to Pro for unlimited storage and power features. Simple, honest pricing for voice productivity." />
        <meta property="og:title" content="Pricing - Tickk Pro" />
        <meta property="og:description" content="Free forever, or upgrade to Pro for unlimited storage and power features." />
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
              Free Forever, or Unlock
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent block mt-2">
                Unlimited Power
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start with our generous free tier. Upgrade when you need unlimited storage and advanced features.
            </p>

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
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
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
                    {tier.price.monthly === null ? (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">Custom</span>
                      </div>
                    ) : tier.price.monthly === 0 ? (
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
                        <span className={`text-sm ${feature.bold ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
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

        {/* Detailed Feature Comparison */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Feature Comparison
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Choose the plan that fits your productivity needs
            </p>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Pro</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { feature: 'Voice recordings', free: 'Unlimited', pro: 'Unlimited', enterprise: 'Unlimited' },
                      { feature: 'Storage', free: '500 items', pro: 'Unlimited', enterprise: 'Unlimited' },
                      { feature: 'History retention', free: '30 days', pro: 'Forever', enterprise: 'Forever' },
                      { feature: 'Smart classification', free: '✓', pro: '✓', enterprise: '✓' },
                      { feature: 'Basic export (JSON)', free: '✓', pro: '✓', enterprise: '✓' },
                      { feature: 'Advanced exports (MD, CSV, PDF)', free: '✗', pro: '✓', enterprise: '✓' },
                      { feature: 'Cloud backup (encrypted)', free: '✗', pro: '✓', enterprise: '✓' },
                      { feature: 'Advanced analytics', free: '✗', pro: '✓', enterprise: '✓' },
                      { feature: 'Custom voice commands', free: '✗', pro: '✓', enterprise: '✓' },
                      { feature: 'Team workspaces', free: '✗', pro: '✗', enterprise: '✓' },
                      { feature: 'API access', free: '✗', pro: '✗', enterprise: '✓' },
                      { feature: 'SSO integration', free: '✗', pro: '✗', enterprise: '✓' },
                      { feature: 'Priority support', free: '✗', pro: '24h email', enterprise: 'Dedicated' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.free}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center font-semibold">{row.pro}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
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
            <h2 className="text-3xl font-bold mb-4">Ready to Unlock Your Productivity?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Start free, upgrade when you need more power. No credit card required.
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
                Upgrade to Pro
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
