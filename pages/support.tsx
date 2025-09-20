/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Support() {
  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Support & Help | tickk - Voice Productivity App Help Center</title>
        <meta name="description" content="tickk Support Center: Get help with voice recognition, task organization, troubleshooting, and frequently asked questions for our productivity app." />
        <meta name="keywords" content="support, help center, voice app help, speech recognition troubleshooting, productivity app support, FAQ, user guide" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/support" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            Support & Help Center
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
            Get help with tickk and make the most of your voice productivity experience.
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🎤</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Issues</h3>
            <p className="text-gray-600 text-sm">Microphone and speech recognition help</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Organization</h3>
            <p className="text-gray-600 text-sm">Task management and categorization</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-600 text-sm">Customizing your experience</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🔧</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Troubleshooting</h3>
            <p className="text-gray-600 text-sm">Common issues and solutions</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Getting Started */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Getting Started</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🚀 First Time Using tickk?</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Welcome! Here's how to get started with voice productivity:
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>1. Allow microphone access when prompted</li>
                  <li>2. Click the microphone button to start recording</li>
                  <li>3. Speak naturally about your tasks and thoughts</li>
                  <li>4. Review and organize the transcribed content</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Issues */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Common Issues</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🎤 Microphone Not Working</h3>
                <div className="text-gray-600 text-sm space-y-2">
                  <p><strong>Check permissions:</strong> Ensure your browser has microphone access</p>
                  <p><strong>Try refreshing:</strong> Reload the page and grant permissions again</p>
                  <p><strong>Check hardware:</strong> Test your microphone in other applications</p>
                  <p><strong>Browser support:</strong> Use Chrome, Firefox, or Safari for best results</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🔄 Speech Recognition Issues</h3>
                <div className="text-gray-600 text-sm space-y-2">
                  <p><strong>Speak clearly:</strong> Use a normal pace and clear pronunciation</p>
                  <p><strong>Reduce noise:</strong> Find a quiet environment for better accuracy</p>
                  <p><strong>Check language:</strong> Ensure your browser language matches your speech</p>
                  <p><strong>Internet connection:</strong> Speech recognition requires an active connection</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">💾 Data Not Saving</h3>
                <div className="text-gray-600 text-sm space-y-2">
                  <p><strong>Browser storage:</strong> Ensure local storage is enabled</p>
                  <p><strong>Private browsing:</strong> Data may not persist in incognito mode</p>
                  <p><strong>Clear cache:</strong> Try clearing browser cache and cookies</p>
                  <p><strong>Storage space:</strong> Check if your device has sufficient storage</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Guide */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Feature Guide</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">📝 Voice Recording</h3>
                <p className="text-gray-600 text-sm">
                  Click the microphone button and speak naturally. The app will automatically transcribe your speech and organize it into actionable items.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🗂️ Task Organization</h3>
                <p className="text-gray-600 text-sm">
                  Your spoken content is automatically categorized into tasks, events, notes, and ideas. You can review and adjust these categories as needed.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">⌨️ Keyboard Shortcuts</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Use these shortcuts for faster navigation:
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Space</kbd> - Start/stop recording</li>
                  <li>• <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Escape</kbd> - Cancel recording</li>
                  <li>• <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">?</kbd> - Show keyboard shortcuts</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Browser Compatibility */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Browser Compatibility</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Fully Supported</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Google Chrome (recommended)</li>
                  <li>• Microsoft Edge</li>
                  <li>• Mozilla Firefox</li>
                  <li>• Safari (macOS/iOS)</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">⚠️ Limited Support</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Older browser versions</li>
                  <li>• Some mobile browsers</li>
                  <li>• Browsers without Web Speech API</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="heading-secondary text-gray-900 mb-4">Still Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? We're here to help you get the most out of tickk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              href="/bug-report" 
              className="btn-responsive bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors"
            >
              Report a Bug
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}