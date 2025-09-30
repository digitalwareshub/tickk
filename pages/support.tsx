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

        {/* Quick Help Overview */}
        <div className="mb-8">
          <div className="border-l-4 border-gray-200 pl-4">
            <p className="text-gray-600">
              Find help with voice recording, task organization, troubleshooting, and common questions about tickk.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Getting Started */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Getting Started</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <h3 className="font-semibold text-gray-900 mb-3">First Time Using tickk?</h3>
              <p className="text-gray-600 mb-3">
                Welcome! Here's how to get started with voice productivity:
              </p>
              <ol className="text-gray-600 space-y-1 ml-4">
                <li>1. Allow microphone access when prompted</li>
                <li>2. Click the microphone button to start recording</li>
                <li>3. Speak naturally about your tasks and thoughts</li>
                <li>4. Review and organize the transcribed content</li>
              </ol>
            </div>
          </section>

          {/* Common Issues */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Common Issues</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Microphone Not Working</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <ul className="text-gray-600 space-y-1">
                    <li>• <strong>Check permissions:</strong> Ensure your browser has microphone access</li>
                    <li>• <strong>Try refreshing:</strong> Reload the page and grant permissions again</li>
                    <li>• <strong>Check hardware:</strong> Test your microphone in other applications</li>
                    <li>• <strong>Browser support:</strong> Use Chrome, Firefox, or Safari for best results</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Speech Recognition Issues</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <ul className="text-gray-600 space-y-1">
                    <li>• <strong>Speak clearly:</strong> Use a normal pace and clear pronunciation</li>
                    <li>• <strong>Reduce noise:</strong> Find a quiet environment for better accuracy</li>
                    <li>• <strong>Check language:</strong> Ensure your browser language matches your speech</li>
                    <li>• <strong>Internet connection:</strong> Speech recognition requires an active connection</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Not Saving</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <ul className="text-gray-600 space-y-1">
                    <li>• <strong>Browser storage:</strong> Ensure local storage is enabled</li>
                    <li>• <strong>Private browsing:</strong> Data may not persist in incognito mode</li>
                    <li>• <strong>Clear cache:</strong> Try clearing browser cache and cookies</li>
                    <li>• <strong>Storage space:</strong> Check if your device has sufficient storage</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Features Guide */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Feature Guide</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Voice Recording</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <p className="text-gray-600">
                    Click the microphone button and speak naturally. The app will automatically transcribe your speech and organize it into actionable items.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Task Organization</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <p className="text-gray-600">
                    Your spoken content is automatically categorized into tasks, events, notes, and ideas. You can review and adjust these categories as needed.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Keyboard Shortcuts</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <p className="text-gray-600 mb-2">
                    Use these shortcuts for faster navigation:
                  </p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Space</kbd> - Start/stop recording</li>
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Escape</kbd> - Cancel recording</li>
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">?</kbd> - Show keyboard shortcuts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Browser Compatibility */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Browser Compatibility</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Fully Supported</h3>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Google Chrome (recommended)</li>
                  <li>• Microsoft Edge</li>
                  <li>• Mozilla Firefox (<strong>Work in Progress</strong>)</li>
                  <li>• Safari (macOS/iOS)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Limited Support</h3>
                <ul className="text-gray-600 space-y-1 ml-4">
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