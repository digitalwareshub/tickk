import Head from 'next/head'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { useTheme } from 'next-themes'

export default function Support() {
  const { theme, setTheme } = useTheme()
  return (
    <>
      <Head>
        <title>Support & Help | OnePageOS - How to Use Voice Productivity App</title>
        <meta name="description" content="Complete guide on how to use OnePageOS voice productivity app. Learn voice commands, features, troubleshooting, and tips for maximum productivity." />
        <meta name="keywords" content="OnePageOS help, voice app tutorial, speech recognition guide, productivity app instructions, voice commands" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://onepageos.com/support" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
                  OnePageOS
                </Link>
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">FREE</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-full hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </button>
                <Link href="/" className="inline-flex items-center px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 lg:p-12">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Support & Help Center
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to know about using OnePageOS voice productivity app effectively
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8">
                <h2 className="mt-0 text-gray-900 dark:text-white">🚀 Quick Start Guide</h2>
                <ol className="text-gray-700 dark:text-gray-300">
                  <li className="text-gray-700 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">Open the Voice Dashboard:</strong> Click "Try Voice Dashboard" on the homepage or go to <Link href="/app" className="text-blue-600 dark:text-blue-400 hover:underline">/app</Link></li>
                  <li className="text-gray-700 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">Allow Microphone Access:</strong> When prompted, click "Allow" to enable voice recognition</li>
                  <li className="text-gray-700 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">Start Speaking:</strong> Click the microphone button and speak naturally</li>
                  <li className="text-gray-700 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">Review Results:</strong> Your speech will be automatically categorized into tasks, notes, or calendar events</li>
                </ol>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8">
                <h2 className="mt-0">🎤 Voice Commands & Examples</h2>
                
                <div className="grid md:grid-cols-3 gap-6 not-prose mb-6">
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      ✅ Tasks
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Use action-oriented language to create tasks:</p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <li>• "I need to call the client tomorrow"</li>
                      <li>• "Remember to buy groceries"</li>
                      <li>• "Complete the project proposal"</li>
                      <li>• "Schedule dentist appointment"</li>
                      <li>• "Review quarterly reports"</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      📝 Notes
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Capture information and ideas:</p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <li>• "Key insights from today's meeting"</li>
                      <li>• "Important points to remember"</li>
                      <li>• "Project requirements and specs"</li>
                      <li>• "Ideas for the new campaign"</li>
                      <li>• "Client feedback summary"</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      📅 Calendar Events
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Include dates, times, and meeting details:</p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <li>• "Meeting with John on Friday at 3 PM"</li>
                      <li>• "Lunch appointment next Tuesday"</li>
                      <li>• "Conference call tomorrow morning"</li>
                      <li>• "Doctor's visit on the 15th"</li>
                      <li>• "Team standup every Monday"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8">
                <h2 className="mt-0 text-gray-900 dark:text-white">⚡ Key Features</h2>
                
                <div className="space-y-6 not-prose">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">🎤 Voice Recognition</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      OnePageOS uses your browser's built-in speech recognition for maximum privacy and accuracy.
                    </p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <li>• Works in Chrome, Edge, Safari, and other modern browsers</li>
                      <li>• No data sent to external servers</li>
                      <li>• Real-time speech-to-text conversion</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">🧠 Smart Classification</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      Advanced natural language processing automatically categorizes your speech.
                    </p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <li>• Identifies action items and tasks</li>
                      <li>• Recognizes meeting notes and important information</li>
                      <li>• Detects dates, times, and calendar events</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">💾 Local Storage</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      All your data is stored locally in your browser for complete privacy.
                    </p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <li>• No account required</li>
                      <li>• Data never leaves your device</li>
                      <li>• Export capabilities for backup</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8">
                <h2 className="mt-0 text-gray-900 dark:text-white">🛠️ Troubleshooting</h2>
                
                <div className="space-y-4 not-prose">
                  <details className="border border-gray-200 dark:border-gray-600 rounded-lg">
                    <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                      🎤 Microphone not working or no speech detected
                    </summary>
                    <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                      <ul className="space-y-2 text-sm">
                        <li>• Check if your browser has microphone permissions</li>
                        <li>• Ensure your microphone is not muted or blocked by other apps</li>
                        <li>• Try refreshing the page and allowing microphone access again</li>
                        <li>• Test your microphone in other applications to ensure it's working</li>
                        <li>• For best results, use Chrome or Edge browsers</li>
                      </ul>
                    </div>
                  </details>

                  <details className="border border-gray-200 dark:border-gray-600 rounded-lg">
                    <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                      🤖 Speech recognition accuracy issues
                    </summary>
                    <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                      <ul className="space-y-2 text-sm">
                        <li>• Speak clearly and at a moderate pace</li>
                        <li>• Minimize background noise</li>
                        <li>• Use a quality microphone or headset if possible</li>
                        <li>• Check your browser's language settings</li>
                        <li>• Try speaking closer to your microphone</li>
                      </ul>
                    </div>
                  </details>

                  <details className="border border-gray-200 dark:border-gray-600 rounded-lg">
                    <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                      📱 Mobile device issues
                    </summary>
                    <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                      <ul className="space-y-2 text-sm">
                        <li>• Use Chrome or Safari on mobile for best compatibility</li>
                        <li>• Install as a PWA (Progressive Web App) for better performance</li>
                        <li>• Ensure you have a stable internet connection</li>
                        <li>• Close other apps that might be using the microphone</li>
                      </ul>
                    </div>
                  </details>

                  <details className="border border-gray-200 dark:border-gray-600 rounded-lg">
                    <summary className="p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                      💾 Data not saving or disappearing
                    </summary>
                    <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                      <ul className="space-y-2 text-sm">
                        <li>• Check if your browser is in incognito/private mode</li>
                        <li>• Ensure you haven't disabled local storage in browser settings</li>
                        <li>• Try clearing browser cache and cookies, then reload</li>
                        <li>• Make sure you're using the same browser and device</li>
                        <li>• Export your data regularly as backup</li>
                      </ul>
                    </div>
                  </details>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8">
                <h2 className="mt-0 text-gray-900 dark:text-white">💡 Tips & Best Practices</h2>
                
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🎯 For Better Accuracy</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Speak in complete sentences</li>
                      <li>• Use natural, conversational language</li>
                      <li>• Pause briefly between different topics</li>
                      <li>• Include context when mentioning dates/times</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">⚡ For Maximum Productivity</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Use specific action words for tasks</li>
                      <li>• Organize thoughts before speaking</li>
                      <li>• Review and edit generated content</li>
                      <li>• Export important data regularly</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                <h2 className="mt-0 text-gray-900 dark:text-white">❓ Still Need Help?</h2>
                <p className="text-gray-700 dark:text-gray-300">Can't find what you're looking for? We're here to help!</p>
                <div className="not-prose flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                  <Link href="/bug-report" className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium">
                    Report a Bug
                  </Link>
                  <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                    Contact Support
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
