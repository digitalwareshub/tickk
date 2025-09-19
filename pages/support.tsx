/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Support() {
  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-slate-800">
      <Head>
        <title>Support & Help | tickk - How to Use Voice Productivity App</title>
        <meta name="description" content="Complete guide on how to use tickk voice productivity app. Learn voice commands, features, troubleshooting, and tips for maximum productivity." />
        <meta name="keywords" content="tickk help, voice app tutorial, speech recognition guide, productivity app instructions, voice commands" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/support" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Support & Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about using tickk effectively
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Quick Start */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">🚀 Quick Start Guide</h2>
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Open the Voice Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-300">Click "Get Started" on the homepage or go to <Link href="/app" className="text-orange-600 dark:text-orange-400 hover:underline font-medium">/app</Link></p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Allow Microphone Access</h3>
                  <p className="text-gray-600 dark:text-gray-300">When prompted, click "Allow" to enable voice recognition</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Start Speaking</h3>
                  <p className="text-gray-600 dark:text-gray-300">Click the microphone button and speak naturally</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Review Results</h3>
                  <p className="text-gray-600 dark:text-gray-300">Your speech will be automatically categorized into tasks, notes, or calendar events</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voice Commands */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">🎤 Voice Commands Examples</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-lg">✅</span>
                </span>
                Tasks
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <div className="text-gray-600 dark:text-gray-300">"I need to buy groceries tomorrow"</div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <div className="text-gray-600 dark:text-gray-300">"Remember to call John"</div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <div className="text-gray-600 dark:text-gray-300">"Don't forget to submit the report"</div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <div className="text-gray-600 dark:text-gray-300">"Pick up dry cleaning this week"</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-green-500 text-lg">📝</span>
                </span>
                Notes
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <div className="text-gray-600 dark:text-gray-300">"Great idea for the new project"</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <div className="text-gray-600 dark:text-gray-300">"Interesting quote from the meeting"</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <div className="text-gray-600 dark:text-gray-300">"Recipe for homemade pasta"</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <div className="text-gray-600 dark:text-gray-300">"Book recommendation from Sarah"</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-purple-500 text-lg">📅</span>
                </span>
                Calendar
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <div className="text-gray-600 dark:text-gray-300">"Meeting with John tomorrow at 3pm"</div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <div className="text-gray-600 dark:text-gray-300">"Doctor appointment next Monday"</div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <div className="text-gray-600 dark:text-gray-300">"Lunch with Sarah on Friday"</div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <div className="text-gray-600 dark:text-gray-300">"Team standup every morning at 9"</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">✨ Features</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Smart Classification</h3>
              <p className="text-gray-600 dark:text-gray-300">Uses natural language processing to automatically categorize your speech into tasks, notes, or calendar events.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-300">All processing happens locally in your browser. No data is sent to external servers.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Works Offline</h3>
              <p className="text-gray-600 dark:text-gray-300">Once loaded, the app works completely offline. Perfect for productivity anywhere.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Account Required</h3>
              <p className="text-gray-600 dark:text-gray-300">Start using immediately without creating an account or providing personal information.</p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">🔧 Troubleshooting</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Microphone not working?</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Check if microphone access is allowed in your browser</li>
                <li>• Try refreshing the page and allowing permissions again</li>
                <li>• Ensure your microphone is not being used by other applications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Speech not being recognized?</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Speak clearly and at a moderate pace</li>
                <li>• Ensure you're in a quiet environment</li>
                <li>• Check your internet connection for speech recognition</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Items not categorizing correctly?</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Use action words like "need to", "remember to" for tasks</li>
                <li>• Include time references like "tomorrow", "at 3pm" for calendar events</li>
                <li>• Use descriptive language for notes and ideas</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Need More Help */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Need more help?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Can't find what you're looking for? We're here to help!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
            >
              Contact Support
            </Link>
            <Link 
              href="/bug-report" 
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors font-medium"
            >
              Report a Bug
            </Link>
          </div>
        </section>

      </div>
    </Layout>
  )
}