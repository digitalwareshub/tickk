/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useState } from 'react'

export default function BugReport() {
  const [copied, setCopied] = useState(false)

  const bugReportTemplate = `OnePageOS Bug Report

**What happened?**
[Describe the issue you encountered]

**What did you expect to happen?**
[Describe what you thought should happen]

**Steps to reproduce:**
1. 
2. 
3. 

**Browser & System:**
- Browser: [e.g., Chrome, Firefox, Safari]
- Operating System: [e.g., Windows 10, macOS, Linux]
- Device: [e.g., Desktop, Mobile]

**Additional context:**
[Add any other context about the problem here]`

  const copyTemplate = () => {
    navigator.clipboard.writeText(bugReportTemplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Head>
        <title>Bug Report | OnePageOS - Report Issues and Get Help</title>
        <meta name="description" content="Report bugs and issues with OnePageOS Voice Productivity App. Get help with speech recognition problems, app functionality, and technical issues." />
        <meta name="keywords" content="bug report, technical support, voice app issues, speech recognition problems, OnePageOS help" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://onepageos.com/bug-report" />
      </Head>

      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🐛</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Report a Bug
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Found an issue? Help us improve OnePageOS by reporting bugs and problems.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Quick Troubleshooting */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">🔍 Try This First</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Refresh the page</h3>
              <p className="text-gray-600 dark:text-gray-300">Many issues can be resolved by simply refreshing your browser.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Check microphone permissions</h3>
              <p className="text-gray-600 dark:text-gray-300">Ensure your browser has permission to access your microphone.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Try a different browser</h3>
              <p className="text-gray-600 dark:text-gray-300">Test if the issue occurs in Chrome, Firefox, or Safari.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Check our help center</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Visit our <Link href="/support" className="text-orange-600 dark:text-orange-400 hover:underline">Support Center</Link> for common solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Report Methods */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">📧 Report the Bug</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Email Method */}
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Report</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Send us a detailed email with your bug report. We'll respond within 24 hours.
              </p>
              <a
                href="mailto:write@digiwares.xyz?subject=OnePageOS Bug Report&body=Please describe the issue you're experiencing with OnePageOS..."
                className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
              >
                Send Email Report
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* GitHub Method */}
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">GitHub Issue</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                For developers and detailed technical reports. Create an issue on our GitHub repository.
              </p>
              <a
                href="https://github.com/digitalwareshub/opos-voice/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium"
              >
                Create GitHub Issue
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Bug Report Template */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">📝 Bug Report Template</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Use this template to provide all the necessary information for a quick resolution:
          </p>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Template</h3>
              <button
                onClick={copyTemplate}
                className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Template
                  </>
                )}
              </button>
            </div>
            <pre className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap">
{bugReportTemplate}
            </pre>
          </div>
        </section>

        {/* Common Issues */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">🔧 Common Issues</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Voice recognition not working</h3>
              <p className="text-gray-600 dark:text-gray-300">Check microphone permissions, try a different browser, or test your microphone in other apps.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Items not categorizing correctly</h3>
              <p className="text-gray-600 dark:text-gray-300">Try using more specific language with action words for tasks and time references for calendar events.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">App not loading</h3>
              <p className="text-gray-600 dark:text-gray-300">Clear your browser cache, disable extensions, or try an incognito/private browsing window.</p>
            </div>
          </div>
        </section>

        {/* Contact Alternative */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Need immediate help?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            For urgent issues or general questions, you can also reach out through our contact form.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors font-medium"
          >
            Contact Support
          </Link>
        </section>

      </div>
    </Layout>
  )
}