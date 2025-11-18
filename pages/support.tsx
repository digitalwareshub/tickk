/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

export default function Support() {
  return (
    <Layout className="min-h-screen bg-white dark:bg-slate-900">
      <Head>
        <title>Support & Help | tickk - Voice Productivity App Help Center</title>
        <meta name="description" content="tickk Support Center: Get help with voice recognition, task organization, troubleshooting, and frequently asked questions for our productivity app." />
        <meta name="keywords" content="support, help center, voice app help, speech recognition troubleshooting, productivity app support, FAQ, user guide" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/support" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Breadcrumbs */}
        <Breadcrumb />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 dark:text-slate-50 mb-4">
            Support & Help Center
          </h1>
          <p className="text-responsive text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get help with tickk and make the most of your voice productivity experience.
          </p>
        </div>

        {/* Quick Help Overview */}
        <div className="mb-8">
          <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
            <p className="text-gray-600 dark:text-slate-400">
              Find help with voice recording, task organization, troubleshooting, and common questions about tickk.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Getting Started */}
          <section>
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">Getting Started</h2>
            <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-3">First Time Using tickk?</h3>
              <p className="text-gray-600 dark:text-slate-400 mb-3">
                Welcome! Here's how to get started with voice productivity:
              </p>
              <ol className="text-gray-600 dark:text-slate-400 space-y-1 ml-4">
                <li>1. Allow microphone access when prompted</li>
                <li>2. Click the microphone button to start recording</li>
                <li>3. Speak naturally about your tasks and thoughts</li>
                <li>4. Review and organize the transcribed content</li>
              </ol>
            </div>
          </section>

          {/* Common Issues */}
          <section>
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">Common Issues</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Microphone Not Working</h3>
                <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
                  <ul className="text-gray-600 dark:text-slate-400 space-y-1">
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Check permissions:</strong> Ensure your browser has microphone access</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Try refreshing:</strong> Reload the page and grant permissions again</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Check hardware:</strong> Test your microphone in other applications</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Browser support:</strong> Use Chrome, Firefox, or Safari for best results</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Speech Recognition Issues</h3>
                <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
                  <ul className="text-gray-600 dark:text-slate-400 space-y-1">
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Speak clearly:</strong> Use a normal pace and clear pronunciation</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Reduce noise:</strong> Find a quiet environment for better accuracy</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Check language:</strong> Ensure your browser language matches your speech</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Internet connection:</strong> Speech recognition requires an active connection</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Data Not Saving</h3>
                <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
                  <ul className="text-gray-600 dark:text-slate-400 space-y-1">
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Browser storage:</strong> Ensure local storage is enabled</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Private browsing:</strong> Data may not persist in incognito mode</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Clear cache:</strong> Try clearing browser cache and cookies</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Storage space:</strong> Check if your device has sufficient storage</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Data Management & Import/Export */}
          <section>
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">Data Management</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Exporting Your Data</h3>
                <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
                  <p className="text-gray-600 dark:text-slate-400 mb-2">
                    Go to the <strong className="text-gray-900 dark:text-slate-200">Organized</strong> tab and click the <strong className="text-gray-900 dark:text-slate-200">Export</strong> button to download your data:
                  </p>
                  <ul className="text-gray-600 dark:text-slate-400 space-y-1">
                    <li>• <strong className="text-gray-900 dark:text-slate-200">JSON format:</strong> Full backup with all data (recommended for backups)</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">CSV format:</strong> Spreadsheet compatible for analysis</li>
                    <li>• <strong className="text-gray-900 dark:text-slate-200">Calendar (.ics):</strong> Import tasks with dates into your calendar app</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Importing Data (Multi-Device)</h3>
                <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
                  <p className="text-gray-600 dark:text-slate-400 mb-2">
                    Transfer your data between devices or restore from a backup:
                  </p>
                  <ol className="text-gray-600 dark:text-slate-400 space-y-1 ml-4">
                    <li>1. Export your data as JSON from Device A</li>
                    <li>2. Transfer the JSON file to Device B (email, USB, cloud, etc.)</li>
                    <li>3. On Device B, go to <strong className="text-gray-900 dark:text-slate-200">Organized</strong> tab</li>
                    <li>4. Click the blue <strong className="text-gray-900 dark:text-slate-200">Import</strong> button</li>
                    <li>5. Upload your JSON file or drag it into the modal</li>
                    <li>6. Review the preview and click <strong className="text-gray-900 dark:text-slate-200">Import Data</strong></li>
                  </ol>
                  <p className="text-gray-600 dark:text-slate-400 mt-2">
                    ⚠️ <strong className="text-gray-900 dark:text-slate-200">Note:</strong> Import will replace your current data. A backup is automatically created before import.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Automatic Backup Protection</h3>
                <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
                  <p className="text-gray-600 dark:text-slate-400 mb-2">
                    Every time you import data, your current data is automatically backed up to <code className="bg-gray-200 dark:bg-slate-700 px-1 rounded text-xs">tickk_import_backup</code> in browser storage.
                  </p>
                  <p className="text-gray-600 dark:text-slate-400 mb-2">
                    <strong className="text-gray-900 dark:text-slate-200">To manually restore from backup:</strong>
                  </p>
                  <ol className="text-gray-600 dark:text-slate-400 space-y-1 ml-4">
                    <li>1. Open browser console (Mac: Cmd+Option+J, Windows: Ctrl+Shift+J)</li>
                    <li>2. Run this command:</li>
                  </ol>
                  <pre className="bg-gray-900 dark:bg-slate-950 text-green-400 p-3 rounded mt-2 text-xs overflow-x-auto">
{`const backup = JSON.parse(localStorage.getItem('tickk_import_backup'))
localStorage.setItem('tickk_app_data', JSON.stringify(backup.data))
location.reload()`}
                  </pre>
                  <p className="text-gray-600 dark:text-slate-400 mt-2">
                    💡 <strong className="text-gray-900 dark:text-slate-200">Pro tip:</strong> Regular exports are your best protection. Export before major changes!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Guide */}
          <section>
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">Feature Guide</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Voice Recording</h3>
                <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
                  <p className="text-gray-600 dark:text-slate-400">
                    Click the microphone button and speak naturally. The app will automatically transcribe your speech and organize it into actionable items.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Task Organization</h3>
                <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
                  <p className="text-gray-600 dark:text-slate-400">
                    Your spoken content is automatically categorized into tasks, events, notes, and ideas. You can review and adjust these categories as needed.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Keyboard Shortcuts</h3>
                <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
                  <p className="text-gray-600 dark:text-slate-400 mb-2">
                    Use these shortcuts for faster navigation:
                  </p>
                  <ul className="text-gray-600 dark:text-slate-400 space-y-1">
                    <li>• <kbd className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded text-xs">Space</kbd> - Start/stop recording</li>
                    <li>• <kbd className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded text-xs">Escape</kbd> - Cancel recording</li>
                    <li>• <kbd className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded text-xs">?</kbd> - Show keyboard shortcuts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Browser Compatibility */}
          <section>
            <h2 className="heading-secondary text-gray-900 dark:text-slate-50 mb-4">Browser Compatibility</h2>
            <div className="border-l-4 border-gray-200 dark:border-slate-700 pl-4">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Fully Supported</h3>
                <ul className="text-gray-600 dark:text-slate-400 space-y-1 ml-4">
                  <li>• Google Chrome (recommended)</li>
                  <li>• Microsoft Edge</li>
                  <li>• Mozilla Firefox (<strong className="text-gray-900 dark:text-slate-200">Work in Progress</strong>)</li>
                  <li>• Safari (macOS/iOS)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Limited Support</h3>
                <ul className="text-gray-600 dark:text-slate-400 space-y-1 ml-4">
                  <li>• Older browser versions</li>
                  <li>• Some mobile browsers</li>
                  <li>• Browsers without Web Speech API</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 mt-8">
          <h3 className="heading-secondary text-gray-900 dark:text-slate-100 mb-4">Still Need Help?</h3>
          <p className="text-gray-600 dark:text-slate-400 mb-4">
            Can't find what you're looking for? We're here to help you get the most out of tickk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="btn-responsive bg-gray-900 dark:bg-slate-700 hover:bg-gray-800 dark:hover:bg-slate-600 text-white transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              href="/bug-report" 
              className="btn-responsive bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-900 dark:text-slate-100 border border-gray-300 dark:border-slate-600 transition-colors"
            >
              Report a Bug
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}