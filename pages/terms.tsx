/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Terms() {
  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-slate-800">
      <Head>
        <title>Terms of Service | OnePageOS - Free Voice Productivity App Terms and Conditions</title>
        <meta name="description" content="OnePageOS Terms of Service: Free voice productivity app terms, conditions, and usage guidelines. Open source software with privacy-first approach." />
        <meta name="keywords" content="terms of service, voice app terms, speech recognition terms, free software terms, open source license, user agreement, privacy-first terms" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://onepageos.com/terms" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Terms Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🆓</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Completely Free</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">No hidden costs, subscriptions, or fees</p>
          </div>
          
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📖</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Open Source</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">MIT license - view and modify the code</p>
          </div>
          
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚖️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fair Terms</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Simple, transparent, and user-friendly</p>
          </div>
          
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Your data stays on your device</p>
          </div>
        </div>

        {/* User Rights Diagram */}
        <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Your Rights as a User</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Use Freely</h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• Access all features</li>
                <li>• No time limits</li>
                <li>• No account required</li>
                <li>• No data charges</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Modify & Share</h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• View source code</li>
                <li>• Make modifications</li>
                <li>• Share improvements</li>
                <li>• Commercial use OK</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Control Data</h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• Own your content</li>
                <li>• Export anytime</li>
                <li>• Delete instantly</li>
                <li>• Privacy guaranteed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Sections */}
        <div className="space-y-12">
          
          {/* Service Description */}
          <section className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">🎯</span>
              </span>
              What OnePageOS Does
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">✅ Core Features</h4>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>• Voice-to-text conversion</li>
                  <li>• Task organization</li>
                  <li>• Calendar integration</li>
                  <li>• Note taking</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🛡️ How It Works</h4>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>• Browser-based processing</li>
                  <li>• Local data storage</li>
                  <li>• No server uploads</li>
                  <li>• Privacy by design</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400">🤝</span>
              </span>
              Your Responsibilities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Lawful Use</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Use for legal purposes only</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Appropriate Content</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Keep content suitable and safe</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">System Requirements</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Modern browser with speech API</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎤</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Permissions</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Grant microphone access</p>
              </div>
            </div>
          </section>

          {/* Open Source License */}
          <section className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">📖</span>
              </span>
              Open Source Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>🔓</span> MIT License
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Free to use, modify, and distribute. No restrictions on commercial use.
                </p>
                <Link 
                  href="https://github.com/digitalwareshub/opos-voice" 
                  className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub →
                </Link>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>🤝</span> Community Driven
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Contributions welcome! Help improve OnePageOS for everyone.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400">⚠️</span>
              </span>
              Important Disclaimers
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">⚠️ "As Is" Service</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Provided without warranties or guarantees of any kind.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🎯 Accuracy</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Speech recognition may not always be 100% accurate.
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💾 Data Backup</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  We recommend backing up important data regularly.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Questions About Terms?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our terms are designed to be fair and transparent. If you need clarification on anything, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Contact Us
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 21l1.98-5.874A8.955 8.955 0 013 12a8 8 0 018-8c4.418 0 8 3.582 8 8z" />
              </svg>
            </Link>
            <Link 
              href="/support" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Visit Support Center
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-6.364 15.364 9.75 9.75 0 016.364-15.364z" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </Layout>
  )
}