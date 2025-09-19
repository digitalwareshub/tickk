/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Terms() {
  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Head>
        <title>Terms of Service | OnePageOS - Free Voice Productivity App Terms and Conditions</title>
        <meta name="description" content="OnePageOS Terms of Service: Free voice productivity app terms, conditions, and usage guidelines. Open source software with privacy-first approach." />
        <meta name="keywords" content="terms of service, voice app terms, speech recognition terms, free software terms, open source license, user agreement, privacy-first terms" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://onepageos.com/terms" />
      </Head>

      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Simple, fair terms for using OnePageOS voice productivity app.
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
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-12 border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mt-0 mb-3">
              📋 Terms Summary
            </h2>
            <ul className="text-blue-800 dark:text-blue-200 space-y-2 mb-0">
              <li><strong>Free to use:</strong> OnePageOS is completely free with no hidden costs</li>
              <li><strong>Open source:</strong> The code is available under MIT license</li>
              <li><strong>No warranties:</strong> Provided "as is" without guarantees</li>
              <li><strong>Privacy focused:</strong> We don't collect or store your personal data</li>
            </ul>
          </div>

          <section className="mb-12">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using OnePageOS ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2>2. Description of Service</h2>
            <p>
              OnePageOS is a free, open-source voice productivity application that helps users convert speech into organized tasks, notes, and calendar events. The Service:
            </p>
            <ul>
              <li>Processes voice input locally in your browser</li>
              <li>Uses natural language processing to categorize content</li>
              <li>Stores data locally on your device</li>
              <li>Operates without requiring user accounts or personal information</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>3. User Responsibilities</h2>
            <p>
              When using OnePageOS, you agree to:
            </p>
            <ul>
              <li><strong>Lawful Use:</strong> Use the Service only for lawful purposes and in accordance with these Terms</li>
              <li><strong>Appropriate Content:</strong> Not input harmful, illegal, or inappropriate content</li>
              <li><strong>System Requirements:</strong> Ensure your browser and device meet the technical requirements</li>
              <li><strong>Microphone Access:</strong> Grant necessary permissions for voice recognition features</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>4. Privacy and Data</h2>
            <p>
              OnePageOS is designed with privacy as a core principle:
            </p>
            <ul>
              <li><strong>Local Processing:</strong> All voice processing occurs on your device</li>
              <li><strong>No Data Collection:</strong> We do not collect, store, or transmit personal data</li>
              <li><strong>User Control:</strong> You maintain complete control over your data</li>
              <li><strong>Privacy Policy:</strong> See our <Link href="/privacy" className="text-orange-600 dark:text-orange-400 hover:underline">Privacy Policy</Link> for detailed information</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>5. Intellectual Property</h2>
            <ul>
              <li><strong>Open Source License:</strong> OnePageOS is released under the MIT License</li>
              <li><strong>User Content:</strong> You retain all rights to content you create using the Service</li>
              <li><strong>Third-Party Libraries:</strong> The Service uses various open-source libraries, each with their respective licenses</li>
              <li><strong>Trademarks:</strong> "OnePageOS" and related marks are trademarks of the project maintainers</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>6. Service Availability</h2>
            <p>
              OnePageOS is provided as a free service:
            </p>
            <ul>
              <li><strong>No Guarantees:</strong> We do not guarantee continuous, uninterrupted access to the Service</li>
              <li><strong>Maintenance:</strong> The Service may be temporarily unavailable for maintenance or updates</li>
              <li><strong>Browser Compatibility:</strong> The Service requires a modern web browser with speech recognition support</li>
              <li><strong>Internet Connection:</strong> Some features may require an internet connection</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>7. Disclaimers and Limitations</h2>
            <p>
              OnePageOS is provided "as is" without warranties:
            </p>
            <ul>
              <li><strong>No Warranties:</strong> We make no warranties, express or implied, about the Service</li>
              <li><strong>Accuracy:</strong> Speech recognition and text classification may not always be accurate</li>
              <li><strong>Data Loss:</strong> We are not responsible for any data loss or corruption</li>
              <li><strong>Third-Party Services:</strong> We are not responsible for third-party services (browser speech recognition, etc.)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law:
            </p>
            <ul>
              <li>We shall not be liable for any indirect, incidental, special, or consequential damages</li>
              <li>Our total liability shall not exceed the amount you paid for the Service (which is zero for the free version)</li>
              <li>We are not responsible for any damages resulting from use or inability to use the Service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>9. Open Source License</h2>
            <p>
              OnePageOS is open source software:
            </p>
            <ul>
              <li><strong>MIT License:</strong> The source code is available under the MIT License</li>
              <li><strong>GitHub Repository:</strong> View the code at <a href="https://github.com/digitalwareshub/opos-voice" className="text-orange-600 dark:text-orange-400 hover:underline">github.com/digitalwareshub/opos-voice</a></li>
              <li><strong>Contributions:</strong> Community contributions are welcome following our contribution guidelines</li>
              <li><strong>Modifications:</strong> You may modify and distribute the software under the terms of the MIT License</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>10. Termination</h2>
            <p>
              These terms remain in effect while you use the Service:
            </p>
            <ul>
              <li><strong>User Termination:</strong> You may stop using the Service at any time</li>
              <li><strong>Data Removal:</strong> Clear your browser data to remove all locally stored information</li>
              <li><strong>Service Discontinuation:</strong> We may discontinue the Service with reasonable notice</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>11. Changes to Terms</h2>
            <p>
              We may update these Terms of Service from time to time:
            </p>
            <ul>
              <li>Changes will be posted on this page with an updated date</li>
              <li>Continued use of the Service after changes constitutes acceptance</li>
              <li>We will make reasonable efforts to notify users of significant changes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>12. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with applicable laws. Any disputes shall be resolved through appropriate legal channels.
            </p>
          </section>

          <section className="mb-12">
            <h2>13. Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:write@digiwares.xyz" className="text-orange-600 dark:text-orange-400 hover:underline">write@digiwares.xyz</a></li>
              <li><strong>Subject:</strong> "Terms of Service Question"</li>
              <li><strong>Support:</strong> Visit our <Link href="/support" className="text-orange-600 dark:text-orange-400 hover:underline">Support Center</Link> for help</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>14. Severability</h2>
            <p>
              If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining terms will remain in full force and effect.
            </p>
          </section>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mt-0 mb-3">
              🤝 Fair and Simple
            </h3>
            <p className="text-green-800 dark:text-green-200 mb-0">
              These terms are designed to be fair and straightforward. We believe in transparency and user rights. If you have any questions, please <Link href="/contact" className="text-green-600 dark:text-green-400 hover:underline">contact us</Link>.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  )
}