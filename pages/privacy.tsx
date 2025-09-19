/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Privacy() {
  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Head>
        <title>Privacy Policy | OnePageOS - Complete Privacy Protection for Voice Productivity App</title>
        <meta name="description" content="OnePageOS Privacy Policy: Learn how we protect your privacy with zero data collection. All voice processing happens locally in your browser. GDPR, CCPA compliant voice productivity app." />
        <meta name="keywords" content="privacy policy, voice app privacy, speech recognition privacy, data protection, GDPR compliance, CCPA compliance, zero data collection, browser-based privacy, voice data security" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://onepageos.com/privacy" />
      </Head>

      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we protect your data.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: January 15, 2024
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-gray dark:prose-invert max-w-none">

          {/* Summary */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-12 border-l-4 border-green-500">
            <h2 className="text-lg font-semibold text-green-900 dark:text-green-100 mt-0 mb-3">
              🔒 Privacy Summary
            </h2>
            <ul className="text-green-800 dark:text-green-200 space-y-2 mb-0">
              <li><strong>Zero data collection:</strong> We don't collect, store, or transmit your personal data</li>
              <li><strong>Local processing:</strong> All voice recognition happens in your browser</li>
              <li><strong>No accounts required:</strong> Use the app without creating an account</li>
              <li><strong>No tracking:</strong> We don't use analytics or tracking scripts</li>
            </ul>
          </div>

          <section className="mb-12">
            <h2>1. Information We Collect</h2>
            <p>
              OnePageOS is designed with privacy as a core principle. We operate on a "zero data collection" model:
            </p>
            <ul>
              <li><strong>Voice Data:</strong> Your voice recordings are processed locally in your browser using the Web Speech API. They are never transmitted to our servers.</li>
              <li><strong>Personal Information:</strong> We do not collect names, email addresses, phone numbers, or any other personal identifiers.</li>
              <li><strong>Usage Analytics:</strong> We do not track how you use the application or collect usage statistics.</li>
              <li><strong>Device Information:</strong> We do not collect information about your device, browser, or operating system.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>2. How We Use Information</h2>
            <p>
              Since we don't collect personal information, there's no personal data for us to use. The application functions entirely within your browser:
            </p>
            <ul>
              <li><strong>Voice Processing:</strong> Your speech is converted to text using your browser's built-in speech recognition</li>
              <li><strong>Text Classification:</strong> The converted text is analyzed locally using natural language processing libraries</li>
              <li><strong>Data Storage:</strong> All your tasks, notes, and calendar items are stored locally in your browser's storage</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>3. Data Storage and Security</h2>
            <p>
              Your data remains under your complete control:
            </p>
            <ul>
              <li><strong>Local Storage:</strong> All data is stored in your browser's local storage on your device</li>
              <li><strong>No Cloud Storage:</strong> We do not store any of your data on external servers or in the cloud</li>
              <li><strong>Data Persistence:</strong> Your data persists across browser sessions but remains on your device</li>
              <li><strong>Data Control:</strong> You can clear all data at any time through your browser settings</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>4. Third-Party Services</h2>
            <p>
              OnePageOS uses minimal third-party services:
            </p>
            <ul>
              <li><strong>Web Speech API:</strong> We use your browser's built-in speech recognition, which may send audio to the browser vendor's servers (Google, Mozilla, etc.)</li>
              <li><strong>CDN Services:</strong> We may use content delivery networks to serve static assets like fonts and libraries</li>
              <li><strong>No Analytics:</strong> We do not use Google Analytics, Facebook Pixel, or similar tracking services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>5. Cookies and Tracking</h2>
            <ul>
              <li><strong>Essential Cookies:</strong> We only use essential cookies required for the application to function (theme preferences, etc.)</li>
              <li><strong>No Tracking Cookies:</strong> We do not use cookies for tracking, advertising, or analytics</li>
              <li><strong>Third-Party Cookies:</strong> We do not allow third-party cookies on our domain</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>6. Children's Privacy</h2>
            <p>
              OnePageOS does not knowingly collect personal information from children under 13. Since we don't collect personal information from anyone, this protection extends to all users regardless of age.
            </p>
          </section>

          <section className="mb-12">
            <h2>7. International Users</h2>
            <p>
              OnePageOS is accessible globally and complies with major privacy regulations:
            </p>
            <ul>
              <li><strong>GDPR Compliance:</strong> We comply with European Union General Data Protection Regulation</li>
              <li><strong>CCPA Compliance:</strong> We comply with California Consumer Privacy Act</li>
              <li><strong>Data Residency:</strong> Since all processing is local, your data never leaves your jurisdiction</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>8. Changes to Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last modified" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-12">
            <h2>9. Contact Information</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:write@digiwares.xyz" className="text-orange-600 dark:text-orange-400 hover:underline">write@digiwares.xyz</a></li>
              <li><strong>Subject Line:</strong> "Privacy Policy Question"</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>10. Data Subject Rights</h2>
            <p>
              While we don't collect personal data, you have complete control over any data stored locally:
            </p>
            <ul>
              <li><strong>Right to Access:</strong> All your data is accessible within the application</li>
              <li><strong>Right to Delete:</strong> You can clear all data through the app or browser settings</li>
              <li><strong>Right to Portability:</strong> You can export your data using browser developer tools</li>
              <li><strong>Right to Rectification:</strong> You can edit or modify your data directly in the app</li>
            </ul>
          </section>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mt-0 mb-3">
              📞 Questions?
            </h3>
            <p className="text-blue-800 dark:text-blue-200 mb-0">
              If you have any questions about our privacy practices, please don't hesitate to <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact us</Link>.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  )
}