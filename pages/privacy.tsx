/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

export default function Privacy() {
  return (
    <Layout className="min-h-screen bg-white dark:bg-slate-900">
      <Head>
        <title>Privacy Policy | tickk - Complete Privacy Protection for Voice Productivity App</title>
        <meta name="description" content="tickk Privacy Policy: Your notes are stored locally in your browser. Tickk does not upload your brain dumps to our servers." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/privacy" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Breadcrumbs */}
        <Breadcrumb />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 dark:text-slate-50 mb-4">
            Privacy Policy
          </h1>
          <p className="text-responsive text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-2">
            Your privacy is our priority. Learn how we protect your data.
          </p>
          <p className="text-sm text-gray-500 dark:text-slate-500">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Privacy Summary */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">Local Browser Storage</h3>
              <p className="text-gray-600 dark:text-slate-400 text-base">Your notes are stored locally in your browser. Tickk does not upload your brain dumps to our servers.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💻</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">Local Processing</h3>
              <p className="text-gray-600 dark:text-slate-400 text-base">All voice recognition happens in your browser</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🚫</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">No Account Required</h3>
              <p className="text-gray-600 dark:text-slate-400 text-base">Use the app without creating an account</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">�</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">Aggregate Analytics</h3>
              <p className="text-gray-600 dark:text-slate-400 text-base">We do not send your notes, tasks, or brain dump content to analytics.</p>
            </div>
          </div>

          {/* Privacy Details */}
          <div className="space-y-6">
            <section>
              <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">Data Collection</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 dark:text-slate-400 mb-4">
                  tickk is designed with privacy as a core principle. Your notes are stored locally in your browser. Tickk does not upload your brain dumps to our servers.
                </p>
                <ul className="text-gray-600 dark:text-slate-400 space-y-2">
                  <li>• Your notes and brain dumps are not uploaded to Tickk servers</li>
                  <li>• Pro waitlist emails are only collected when you submit the Pro interest form</li>
                  <li>• No user accounts or registration required</li>
                  <li>• Analytics events must not include transcript, task, or note content</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">How It Works</h2>
              <p className="text-gray-600 dark:text-slate-400 mb-4">
                Tickk uses your browser's Web Speech API for voice recognition. Your notes are stored locally in your browser. Tickk does not upload your brain dumps to our servers.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">Local Storage</h2>
              <p className="text-gray-600 dark:text-slate-400 mb-4">
                The app stores your organized tasks and notes locally in your browser's storage. This data remains 
                on your device and is never transmitted to external servers.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">Compliance</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">🇪🇺 GDPR Compliant</h4>
                  <p className="text-gray-600 dark:text-slate-400 text-base">
                    No personal data processing means full GDPR compliance by design.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">🇺🇸 CCPA Compliant</h4>
                  <p className="text-gray-600 dark:text-slate-400 text-base">
                    Meets California Consumer Privacy Act requirements by not collecting personal information.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="text-center bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 mt-8">
            <h3 className="heading-secondary text-gray-900 dark:text-slate-100 mb-4">Questions About Privacy?</h3>
            <p className="text-gray-600 dark:text-slate-400 mb-4">
              If you have any questions about this privacy policy or our privacy practices, we're here to help.
            </p>
            <Link 
              href="/contact" 
              className="btn-responsive bg-gray-900 dark:bg-slate-700 hover:bg-gray-800 dark:hover:bg-slate-600 text-white transition-colors"
            >
              Contact Us About Privacy
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
