import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'
import { trackPageView } from '@/lib/analytics/enhanced-analytics'

export default function Features() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    trackPageView('features_page')
  }, [])

  if (!mounted) return null

  return (
    <>
      <Head>
        <title>Features | tickk - Voice Productivity Tool</title>
        <meta 
          name="description" 
          content="Discover tickk's powerful features: voice-to-text transcription, smart NLP classification, ADHD-friendly Focus Mode, analytics, offline support, and more. No signup required." 
        />
        <link rel="canonical" href="https://tickk.app/features" />
      </Head>

      <Layout showHomeLink={true}>
        <div className="min-h-screen bg-white dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="max-w-6xl mx-auto mb-8">
            <Breadcrumb />
          </div>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h1 className="heading-primary text-gray-900 dark:text-slate-50 mb-6">
                Powerful Features for
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent block">
                  Voice-First Productivity
                </span>
              </h1>
              <p className="text-responsive text-gray-600 dark:text-slate-400 max-w-3xl mx-auto">
                Everything you need to capture, organize, and act on your thoughts—completely free, 
                forever. No signup required.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="btn-responsive bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 text-white transition-colors"
              >
                🚀 Try It Free Now
              </Link>
              <a
                href="https://github.com/digitalwareshub/tickk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-responsive bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-slate-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.374-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Core Features Grid */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 text-center mb-12">
              Core Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Voice to Text */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-8 hover:border-orange-200 dark:hover:border-orange-600 hover:shadow-sm transition-all duration-300">
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">Voice-to-Text Transcription</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  Powered by your browser&apos;s Web Speech API for high-accuracy voice recognition. 
                  Speak naturally and watch your words appear instantly.
                </p>
              </div>

              {/* Smart Classification */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-8 hover:border-orange-200 dark:hover:border-orange-600 hover:shadow-sm transition-all duration-300">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">Smart NLP Classification</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  Advanced natural language processing with compromise.js automatically organizes 
                  your spoken words into tasks, notes, or calendar events.
                </p>
              </div>

              {/* Focus Mode */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-8 hover:border-orange-200 dark:hover:border-orange-600 hover:shadow-sm transition-all duration-300">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">ADHD-Friendly Focus Mode</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  Built-in Pomodoro timer and distraction-free interface designed specifically 
                  for neurodivergent individuals and focus-seekers.
                </p>
              </div>

              {/* Command Palette */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-8 hover:border-orange-200 dark:hover:border-orange-600 hover:shadow-sm transition-all duration-300">
                <div className="text-4xl mb-4">⌨️</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">Command Palette (⌘K)</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  Power-user keyboard shortcuts for lightning-fast navigation. Press Cmd/Ctrl + K 
                  to access all features instantly.
                </p>
              </div>

              {/* Analytics */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-8 hover:border-orange-200 dark:hover:border-orange-600 hover:shadow-sm transition-all duration-300">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">Productivity Analytics</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  Track your completion rates, activity streaks, and productivity patterns with 
                  beautiful charts and insights.
                </p>
              </div>

              {/* Offline Support */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-8 hover:border-orange-200 dark:hover:border-orange-600 hover:shadow-sm transition-all duration-300">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">Works Offline</h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  All your data is stored locally in your browser. Continue working without 
                  internet connection—perfect for flights and remote areas.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy & Security Features */}
          <div className="max-w-6xl mx-auto mb-20 bg-gray-50 dark:bg-slate-800 rounded-lg p-12">
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 text-center mb-12">
              Privacy-First Design
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Zero Data Collection</h3>
                <p className="text-gray-600 dark:text-slate-400">
                  We never collect, store, or transmit your voice data or personal information.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Local Processing</h3>
                <p className="text-gray-600 dark:text-slate-400">
                  All speech processing happens in your browser. Your data never leaves your device.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🚫</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">No Signup Required</h3>
                <p className="text-gray-600 dark:text-slate-400">
                  Start using immediately. No email, phone number, or personal info needed.
                </p>
              </div>
            </div>
          </div>

          {/* Organization Features */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 text-center mb-12">
              Organization & Management
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Bulk Operations */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📦</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Bulk Operations</h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Select multiple items and perform bulk actions like delete, export, 
                      or mark as complete—saving you time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Search & Filter */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🔍</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Search & Filter</h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Quickly find anything with powerful search and filter by type, tags, 
                      dates, or priority levels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Templates */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📝</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Template Library</h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Save frequently used tasks and notes as templates for quick reuse. 
                      Perfect for recurring workflows.
                    </p>
                  </div>
                </div>
              </div>

              {/* Calendar Export */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📅</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Calendar Export (.ics)</h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Export tasks with dates directly to Google Calendar, Apple Calendar, 
                      or Outlook with one click.
                    </p>
                  </div>
                </div>
              </div>

              {/* Context Menu */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📋</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Context Menu Actions</h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Right-click any item for quick actions: edit, delete, pin, convert, 
                      or add to Focus mode.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Export */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💾</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Export Options</h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Export your data in JSON or CSV format for backup, migration, 
                      or analysis in other tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 text-center mb-12">
              Accessibility & Inclusive Design
            </h2>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">♿</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-slate-100 mb-2">Screen Reader Support</h4>
                    <p className="text-gray-600 dark:text-slate-400">Full ARIA labels and live regions for visually impaired users.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">⌨️</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-slate-100 mb-2">Keyboard Navigation</h4>
                    <p className="text-gray-600 dark:text-slate-400">Complete keyboard-only control without touching the mouse.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">🎨</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-slate-100 mb-2">High Contrast Mode</h4>
                    <p className="text-gray-600 dark:text-slate-400">Enhanced visibility for users with visual impairments.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">🎭</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-slate-100 mb-2">Reduced Motion</h4>
                    <p className="text-gray-600 dark:text-slate-400">Respects prefers-reduced-motion for sensitive users.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 text-center mb-12">
              Technical Specifications
            </h2>
            <div className="bg-gray-900 dark:bg-slate-800 text-white dark:text-slate-50 rounded-lg p-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-orange-400 dark:text-orange-500">Technology Stack</h3>
                  <ul className="space-y-2 text-gray-300 dark:text-slate-300">
                    <li>• Next.js 15 (React)</li>
                    <li>• TypeScript</li>
                    <li>• Web Speech API</li>
                    <li>• compromise.js NLP</li>
                    <li>• Tailwind CSS</li>
                    <li>• PWA Support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-orange-400 dark:text-orange-500">Browser Support</h3>
                  <ul className="space-y-2 text-gray-300 dark:text-slate-300">
                    <li>• Chrome 25+</li>
                    <li>• Edge 79+</li>
                    <li>• Safari 14.1+</li>
                    <li>• Firefox (limited)</li>
                    <li>• Mobile browsers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-orange-400 dark:text-orange-500">Platform</h3>
                  <ul className="space-y-2 text-gray-300 dark:text-slate-300">
                    <li>• Web-based</li>
                    <li>• Cross-platform</li>
                    <li>• Mobile responsive</li>
                    <li>• PWA installable</li>
                    <li>• Offline capable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 text-center mb-12">
              Why Choose tickk?
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-slate-50">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-orange-600 dark:text-orange-400">tickk</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-600 dark:text-slate-400">Other Apps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  <tr>
                    <td className="px-6 py-4 text-gray-900 dark:text-slate-100">Voice Recognition</td>
                    <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-bold">✓ Free</td>
                    <td className="px-6 py-4 text-center text-gray-400 dark:text-slate-500">Paid Feature</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-800/50">
                    <td className="px-6 py-4 text-gray-900 dark:text-slate-100">No Signup Required</td>
                    <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-bold">✓</td>
                    <td className="px-6 py-4 text-center text-red-600 dark:text-red-400 font-bold">✗</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900 dark:text-slate-100">Privacy (Local Storage)</td>
                    <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-bold">✓</td>
                    <td className="px-6 py-4 text-center text-red-600 dark:text-red-400 font-bold">✗ Cloud</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-800/50">
                    <td className="px-6 py-4 text-gray-900 dark:text-slate-100">Offline Support</td>
                    <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-bold">✓</td>
                    <td className="px-6 py-4 text-center text-red-600 dark:text-red-400 font-bold">✗</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900 dark:text-slate-100">ADHD-Friendly Focus Mode</td>
                    <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-bold">✓</td>
                    <td className="px-6 py-4 text-center text-gray-400 dark:text-slate-500">Limited</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-800/50">
                    <td className="px-6 py-4 text-gray-900 dark:text-slate-100">Open Source</td>
                    <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-bold">✓</td>
                    <td className="px-6 py-4 text-center text-red-600 dark:text-red-400 font-bold">✗</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900 dark:text-slate-100">Price</td>
                    <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-bold">FREE Forever</td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-slate-400">$5-15/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Final CTA */}
          <div className="max-w-4xl mx-auto text-center bg-gray-900 dark:bg-slate-800 rounded-lg p-12 text-white dark:text-slate-50">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-lg mb-8 text-gray-300 dark:text-slate-300">
              Join thousands of users who are capturing their thoughts effortlessly with tickk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-slate-50 font-semibold rounded-lg transition-colors duration-200"
              >
                Start Using tickk Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/landing"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-gray-800 dark:hover:bg-slate-700 text-white dark:text-slate-50 font-semibold rounded-lg border-2 border-white dark:border-slate-400 transition-colors duration-200"
              >
                Learn More About tickk
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
