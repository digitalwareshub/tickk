/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function BugReport() {
  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Report a Bug | tickk - Voice Productivity App Bug Reporting</title>
        <meta name="description" content="Report bugs and technical issues with tickk voice productivity app. Help us improve by sharing your experience and technical problems." />
        <meta name="keywords" content="bug report, voice app bugs, speech recognition issues, technical problems, app feedback, error reporting" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/bug-report" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            Report a Bug
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
            Help us improve tickk by reporting bugs and technical issues you encounter.
          </p>
        </div>

        {/* Bug Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🎤</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Issues</h3>
            <p className="text-gray-600 text-sm">Microphone or speech recognition problems</p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">💾</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Issues</h3>
            <p className="text-gray-600 text-sm">Problems with saving or loading content</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Display Issues</h3>
            <p className="text-gray-600 text-sm">Visual glitches or layout problems</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
            <p className="text-gray-600 text-sm">Slow loading or unresponsive features</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Quick Checks */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Before Reporting</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">🔍 Quick Troubleshooting</h3>
              <p className="text-gray-600 text-sm mb-3">
                Please try these steps first - they resolve most common issues:
              </p>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• <strong>Refresh the page:</strong> Press Ctrl+F5 (or Cmd+R on Mac) to hard refresh</li>
                <li>• <strong>Check permissions:</strong> Ensure microphone access is granted</li>
                <li>• <strong>Try another browser:</strong> Test in Chrome, Firefox, or Safari</li>
                <li>• <strong>Clear cache:</strong> Clear browser cache and cookies</li>
                <li>• <strong>Check internet:</strong> Ensure stable internet connection</li>
              </ul>
            </div>
          </section>

          {/* Bug Report Template */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Bug Report Information</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">📝 What to Include</h3>
              <p className="text-gray-600 text-sm mb-4">
                The more details you provide, the faster we can fix the issue. Please include:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Bug Description</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• What happened? (brief summary)</li>
                    <li>• What did you expect to happen?</li>
                    <li>• How often does this occur?</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Steps to Reproduce</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Step 1: What you did first</li>
                    <li>• Step 2: What you did next</li>
                    <li>• Step 3: When the bug occurred</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Technical Information</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Browser: Chrome, Firefox, Safari, Edge (with version)</li>
                    <li>• Operating System: Windows, macOS, iOS, Android</li>
                    <li>• Device: Desktop, tablet, mobile</li>
                    <li>• Screen size or resolution (if relevant)</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Additional Details</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Screenshots or screen recordings (if possible)</li>
                    <li>• Error messages (exact text)</li>
                    <li>• Console errors (for technical users)</li>
                    <li>• Any workarounds you found</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Priority Levels */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Bug Priority Levels</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    Critical
                  </h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• App completely unusable</li>
                    <li>• Data loss or corruption</li>
                    <li>• Security vulnerabilities</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                    High
                  </h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Major features not working</li>
                    <li>• Voice recognition fails</li>
                    <li>• Frequent crashes</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    Medium
                  </h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Features work but with issues</li>
                    <li>• Visual glitches</li>
                    <li>• Performance problems</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    Low
                  </h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Minor visual issues</li>
                    <li>• Enhancement requests</li>
                    <li>• Documentation errors</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Response Times */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Expected Response Times</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-2">🚨</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Critical</h3>
                  <p className="text-gray-600 text-sm">Within 6 hours</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">⚡</div>
                  <h3 className="font-semibold text-gray-900 mb-1">High</h3>
                  <p className="text-gray-600 text-sm">Within 24 hours</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">📋</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Medium</h3>
                  <p className="text-gray-600 text-sm">2-3 business days</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">📝</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Low</h3>
                  <p className="text-gray-600 text-sm">1 week</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Submit Bug Report */}
        <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="heading-secondary text-gray-900 mb-4">Ready to Report?</h3>
          <p className="text-gray-600 mb-6">
            Send us a detailed bug report and help make tickk better for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:bugs@tickk.app?subject=Bug Report: [Brief Description]&body=Bug Description:%0A[Describe what happened]%0A%0ASteps to Reproduce:%0A1. %0A2. %0A3. %0A%0ATechnical Information:%0ABrowser: %0AOS: %0ADevice: %0A%0AAdditional Details:%0A[Screenshots, error messages, etc.]"
              className="btn-responsive bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              Report Bug via Email
            </a>
            <Link 
              href="/contact" 
              className="btn-responsive bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors"
            >
              General Contact
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}