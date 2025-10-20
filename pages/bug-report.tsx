/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

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
        
        {/* Breadcrumbs */}
        <Breadcrumb />
        
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
        <div className="mb-8">
          <h2 className="heading-secondary text-gray-900 mb-4">Common Bug Categories</h2>
          <div className="border-l-4 border-gray-200 pl-4">
            <p className="text-gray-600 mb-3">We track issues in these main areas:</p>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• <strong>Voice Issues:</strong> Microphone or speech recognition problems</li>
              <li>• <strong>Data Issues:</strong> Problems with saving or loading content</li>
              <li>• <strong>Display Issues:</strong> Visual glitches or layout problems</li>
              <li>• <strong>Performance:</strong> Slow loading or unresponsive features</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Quick Checks */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Before Reporting</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Troubleshooting</h3>
              <p className="text-gray-600 mb-3">
                Please try these steps first - they resolve most common issues:
              </p>
              <ul className="text-gray-600 space-y-2 ml-4">
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
            <div className="border-l-4 border-gray-200 pl-4">
              <h3 className="font-semibold text-gray-900 mb-3">What to Include</h3>
              <p className="text-gray-600 mb-4">
                The more details you provide, the faster we can fix the issue. Please include:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">1. Bug Description</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• What happened? (brief summary)</li>
                    <li>• What did you expect to happen?</li>
                    <li>• How often does this occur?</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">2. Steps to Reproduce</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Step 1: What you did first</li>
                    <li>• Step 2: What you did next</li>
                    <li>• Step 3: When the bug occurred</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">3. Technical Information</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Browser: Chrome, Firefox, Safari, Edge (with version)</li>
                    <li>• Operating System: Windows, macOS, iOS, Android</li>
                    <li>• Device: Desktop, tablet, mobile</li>
                    <li>• Screen size or resolution (if relevant)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">4. Additional Details</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Screenshots or screen recordings (if possible)</li>
                    <li>• Error messages (exact text)</li>
                    <li>• Console errors (for technical users)</li>
                    <li>• Any workarounds you found</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Response Times */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Response Times</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <p className="text-gray-600 mb-4">
                We prioritize bugs based on severity and aim to respond quickly:
              </p>
              <ul className="text-gray-600 space-y-1 ml-4">
                <li>• <strong>Critical issues:</strong> Within 6 hours (app unusable, data loss)</li>
                <li>• <strong>Major bugs:</strong> Within 24 hours (key features broken)</li>
                <li>• <strong>Minor issues:</strong> 2-3 business days (visual glitches, performance)</li>
                <li>• <strong>Enhancement requests:</strong> 1 week (improvements, documentation)</li>
              </ul>
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
              href="mailto:write@digiwares.xyz?subject=Bug Report: [Brief Description]&body=Bug Description:%0A[Describe what happened]%0A%0ASteps to Reproduce:%0A1. %0A2. %0A3. %0A%0ATechnical Information:%0ABrowser: %0AOS: %0ADevice: %0A%0AAdditional Details:%0A[Screenshots, error messages, etc.]"
              className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
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