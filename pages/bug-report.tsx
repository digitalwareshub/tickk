import Head from 'next/head'
import Layout from '@/components/Layout'
import { useState } from 'react'

export default function BugReport() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const bugReportTemplate = `**Bug Report**

**Describe the Bug:**
A clear and concise description of what the bug is.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior:**
A clear and concise description of what you expected to happen.

**Actual Behavior:**
What actually happened instead.

**Browser Information:**
- Browser: [e.g. Chrome, Safari, Firefox]
- Version: [e.g. 118.0.0.0]
- Operating System: [e.g. Windows 11, macOS 14, Ubuntu 22.04]

**Device Information:**
- Device: [e.g. iPhone 15, MacBook Pro, Desktop PC]
- Screen Resolution: [e.g. 1920x1080, 2560x1440]

**Voice Settings (if applicable):**
- Microphone permissions granted: [Yes/No]
- Browser used for voice input: [Chrome/Safari/Firefox/Other]
- Any error messages related to microphone access: [Yes/No - describe]

**Additional Context:**
Add any other context about the problem here, including screenshots if possible.`

  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Head>
        <title>Bug Report | OnePageOS - Report Issues and Get Help</title>
        <meta name="description" content="Report bugs and issues with OnePageOS Voice Productivity App. Get help with speech recognition problems, app functionality, and technical issues." />
        <meta name="keywords" content="bug report, technical support, voice app issues, speech recognition problems, OnePageOS help" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://onepageos.com/bug-report" />
      </Head>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-8 lg:p-12">
          
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
                <span>Make sure you&apos;re in a quiet environment for voice recognition</span>
              </div>
            </div>
          </div>

          {/* Reporting Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            
            {/* GitHub Issues (For Developers) */}
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
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
                Create Issue on GitHub
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Email Support (For General Users) */}
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-600 dark:bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">@</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">For general users and detailed reports</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Send us a detailed email with your bug report. We&apos;ll respond within 24 hours with troubleshooting steps or fixes.
              </p>
              <a
                href="mailto:write@digiwares.xyz?subject=OnePageOS Bug Report&body=Please describe the issue you're experiencing with OnePageOS..."
                className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                Send Email Report
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bug Report Template */}
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📋 Bug Report Template</h3>
              <button
                onClick={() => copyToClipboard(bugReportTemplate, 'template')}
                className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-md transition-colors"
              >
                {copied === 'template' ? 'Copied!' : 'Copy Template'}
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Use this template for detailed bug reports. Copy and fill out the information to help us understand and fix the issue faster.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-600">
              <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                {bugReportTemplate}
              </pre>
            </div>
          </div>

          {/* Footer Message */}
          <div className="text-center mt-8 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-300 mb-2">
              🙏 Thank You for Your Help!
            </h3>
            <p className="text-sm text-orange-800 dark:text-orange-200">
              Your bug reports help us improve OnePageOS for everyone. We appreciate your time and effort in making our voice productivity app better.
              Need immediate help? Email us at{' '}
              <a href="mailto:write@digiwares.xyz" className="text-orange-600 dark:text-orange-400 hover:underline">
                write@digiwares.xyz
              </a>
              {' '}and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
