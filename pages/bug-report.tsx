import Head from 'next/head'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { useTheme } from 'next-themes'

export default function BugReport() {
  const [copied, setCopied] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const bugReportTemplate = `**Bug Description:**
A clear and concise description of what the bug is.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '....'
3. Speak the following: '....'
4. See error

**Expected Behavior:**
A clear and concise description of what you expected to happen.

**Actual Behavior:**
What actually happened instead.

**Browser Information:**
- Browser: [e.g. Chrome, Safari, Firefox]
- Version: [e.g. 118.0.0.0]
- Operating System: [e.g. Windows 11, macOS 14, iOS 17]

**Device Information (if mobile):**
- Device: [e.g. iPhone 15, Samsung Galaxy S23]
- Screen Size: [e.g. Mobile, Tablet, Desktop]

**Voice Recognition Details:**
- Was microphone permission granted? [Yes/No]
- What did you say? [Exact words spoken]
- What was transcribed? [What appeared in the text box]
- Which category did it go to? [Tasks/Notes/Calendar/None]

**Additional Context:**
Add any other context about the problem here, including screenshots if possible.`

  return (
    <>
      <Head>
        <title>Bug Report | OnePageOS - Report Issues and Get Help</title>
        <meta name="description" content="Report bugs and issues with OnePageOS Voice Productivity App. Get help with speech recognition problems, app functionality, and technical issues." />
        <meta name="keywords" content="bug report, technical support, voice app issues, speech recognition problems, OnePageOS help" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://onepageos.com/bug-report" />
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
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="rounded-full p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="Toggle theme"
                  title={`Current: ${theme === 'dark' ? 'Dark' : 'Light'} mode • Click to switch`}
                >
                  {theme === 'dark' ? '💡' : '🔅'}
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                <span className="text-2xl">🐛</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Report a Bug
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Found an issue with OnePageOS? We appreciate your help in making our voice productivity app better for everyone.
              </p>
            </div>

            {/* Quick Help Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8 border border-blue-200 dark:border-blue-800">
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
                🚀 Before Reporting a Bug
              </h2>
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Try refreshing the page or restarting your browser</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Check if microphone permissions are granted in your browser</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Test in a different browser (Chrome recommended for best experience)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Make sure you're in a quiet environment for voice recognition</span>
                </div>
              </div>
            </div>

            {/* Reporting Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              {/* GitHub Issues (For Developers) */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
                    <span className="text-white dark:text-gray-900 font-bold text-lg">G</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">GitHub Issues</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">For developers and technical users</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Report bugs directly on our GitHub repository. Best for developers who want to contribute or track technical issues.
                </p>
                <a
                  href="https://github.com/digitalwareshub/opos-voice/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  Open GitHub Issue
                  <span className="ml-2">↗</span>
                </a>
              </div>

              {/* Email Support */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">For general users and detailed reports</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Send us a detailed bug report via email. We'll respond personally and help resolve your issue.
                </p>
                <a
                  href="mailto:write@digiwares.xyz?subject=OnePageOS Bug Report&body=Please describe the issue you encountered..."
                  className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  Send Email Report
                  <span className="ml-2">📧</span>
                </a>
              </div>
            </div>

            {/* Bug Report Template */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  🔍 Bug Report Template
                </h3>
                <button
                  onClick={() => copyToClipboard(bugReportTemplate, 'template')}
                  className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {copied === 'template' ? '✓ Copied!' : '📋 Copy Template'}
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Use this template to provide all the necessary information for a quick resolution:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{bugReportTemplate}</pre>
              </div>
            </div>

            {/* Common Issues */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🔧 Common Issues & Solutions
              </h3>
              <div className="space-y-4">
                <details className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    Voice recognition not working
                  </summary>
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <p>• Check if microphone permissions are granted in your browser</p>
                    <p>• Try using Chrome browser for best compatibility</p>
                    <p>• Ensure you're in a quiet environment</p>
                    <p>• Check if your microphone is working in other applications</p>
                  </div>
                </details>

                <details className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    Text going to wrong category
                  </summary>
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <p>• Our classification system is constantly improving</p>
                    <p>• Try being more specific with your language</p>
                    <p>• Use phrases like "I need to..." for tasks or "Meeting at..." for calendar</p>
                    <p>• You can manually move items between categories</p>
                  </div>
                </details>

                <details className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    App not loading or crashing
                  </summary>
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <p>• Try refreshing the page (Ctrl+F5 or Cmd+Shift+R)</p>
                    <p>• Clear your browser cache and cookies</p>
                    <p>• Disable browser extensions temporarily</p>
                    <p>• Try incognito/private browsing mode</p>
                  </div>
                </details>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Need immediate help? Email us at{' '}
                <a href="mailto:write@digiwares.xyz" className="text-orange-600 dark:text-orange-400 hover:underline">
                  write@digiwares.xyz
                </a>
                {' '}and we'll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>

        <Footer showHomeLink={true} />
      </div>
    </>
  )
}
