/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Privacy() {
  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-slate-800">
      <Head>
        <title>Privacy Policy | tickk - Complete Privacy Protection for Voice Productivity App</title>
        <meta name="description" content="tickk Privacy Policy: Learn how we protect your privacy with zero data collection. All voice processing happens locally in your browser. GDPR, CCPA compliant voice productivity app." />
        <meta name="keywords" content="privacy policy, voice app privacy, speech recognition privacy, data protection, GDPR compliance, CCPA compliance, zero data collection, browser-based privacy, voice data security" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/privacy" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Privacy Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Zero Data Collection</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">We don't collect, store, or transmit your personal data</p>
          </div>
          
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💻</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Local Processing</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">All voice recognition happens in your browser</p>
          </div>
          
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚫</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Accounts</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Use the app without creating an account</p>
          </div>
          
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👁️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">We don't use analytics or tracking scripts</p>
          </div>
        </div>

        {/* Data Flow Diagram */}
        <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">How Your Data Flows</h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎤</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Your Voice</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">You speak into your microphone</p>
            </div>
            
            <div className="text-gray-400 text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Browser Processing</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Local speech recognition</p>
            </div>
            
            <div className="text-gray-400 text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Local Storage</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Stored on your device only</p>
            </div>
            
            <div className="text-gray-400 text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚫</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No Servers</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Never leaves your device</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12">
          
          {/* Information We Collect */}
          <section className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">📊</span>
              </span>
              1. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              tickk is designed with privacy as a core principle. We operate on a "zero data collection" model:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">✅ What We DON'T Collect</h4>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>• Voice recordings</li>
                  <li>• Personal information</li>
                  <li>• Usage analytics</li>
                  <li>• Device information</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ℹ️ How It Works</h4>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>• Speech processed locally</li>
                  <li>• No server transmission</li>
                  <li>• Browser-only storage</li>
                  <li>• Complete user control</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Storage */}
          <section className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">🔐</span>
              </span>
              2. Data Storage & Security
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💾</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Local Storage</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">All data stored in your browser only</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Device</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Data never leaves your computer</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎛️</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Full Control</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Clear data anytime you want</p>
              </div>
            </div>
          </section>

          {/* Compliance */}
          <section className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400">⚖️</span>
              </span>
              3. Legal Compliance
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>🇪🇺</span> GDPR Compliant
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Complies with European Union General Data Protection Regulation through zero data collection.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>🇺🇸</span> CCPA Compliant
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Meets California Consumer Privacy Act requirements by not collecting personal information.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-orange-50 dark:bg-orange-900/20 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Questions About Privacy?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you have any questions about this privacy policy or our privacy practices, we're here to help.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Contact Us About Privacy
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>

      </div>
    </Layout>
  )
}