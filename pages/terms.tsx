import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Terms() {
  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Head>
        <title>Terms of Service | OnePageOS - Free Voice Productivity App Terms and Conditions</title>
        <meta name="description" content="OnePageOS Terms of Service: Understand your rights and responsibilities when using our free voice productivity app. Simple, fair terms for speech recognition software." />
        <meta name="keywords" content="terms of service, voice app terms, speech recognition terms, user agreement, software license, voice productivity app legal terms" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://onepageos.com/terms" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Terms of Service | OnePageOS - Voice Productivity App" />
        <meta property="og:description" content="Fair and transparent terms of service for our free voice productivity application with speech recognition and natural language processing." />
        <meta property="og:url" content="https://onepageos.com/terms" />
        <meta property="og:type" content="website" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Terms of Service",
              "description": "OnePageOS Terms of Service outlining user rights and responsibilities",
              "url": "https://onepageos.com/terms",
              "isPartOf": {
                "@type": "WebSite",
                "name": "OnePageOS",
                "url": "https://onepageos.com"
              },
              "about": {
                "@type": "TermsOfService",
                "name": "OnePageOS Terms of Service",
                "description": "Comprehensive terms of service for voice productivity application",
                "datePublished": "2024-01-01",
                "dateModified": "2024-09-19"
              }
            })
          }}
        />
      </Head>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-8 lg:p-12">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Service
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Terms and conditions for using OnePageOS voice productivity app
                </p>
                <div className="mt-4 sm:mt-0 text-sm text-gray-500 dark:text-gray-400">
                  Last updated: September 19, 2024
                </div>
              </div>
            </div>

            {/* Free Forever Notice */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🆓</div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Free Forever Guarantee
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                OnePageOS is completely free to use, with no hidden costs, premium tiers, or subscription fees. This service is provided as a gift to the productivity community.
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              
              {/* Acceptance of Terms */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">📋</span>
                  Acceptance of Terms
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  By accessing and using OnePageOS (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Simple Agreement
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    These terms are designed to be fair, transparent, and protective of your rights. We believe in keeping legal language simple and understandable.
                  </p>
                </div>
              </section>

              {/* Description of Service */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Description of Service
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  OnePageOS is a free, browser-based voice productivity application that provides:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Core Features:</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• Voice-to-text transcription using browser APIs</li>
                      <li>• Natural language processing and classification</li>
                      <li>• Task, note, and calendar organization</li>
                      <li>• Local data storage (no cloud sync)</li>
                      <li>• Dark/light mode interface</li>
                      <li>• Progressive Web App capabilities</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Technical Requirements:</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• Modern web browser with Web Speech API support</li>
                      <li>• Microphone access for voice input</li>
                      <li>• JavaScript enabled</li>
                      <li>• Internet connection for initial loading</li>
                      <li>• Local storage for data persistence</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Service Availability
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    While we strive for 100% uptime, OnePageOS is provided &quot;as-is&quot; and we cannot guarantee uninterrupted service. The application may be temporarily unavailable due to maintenance, updates, or unforeseen technical issues.
                  </p>
                </div>
              </section>

              {/* User Responsibilities */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">👤</span>
                  User Responsibilities
                </h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Acceptable Use:</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <span>Use the service for personal productivity and legitimate business purposes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <span>Respect the intellectual property rights of others</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <span>Use the service in compliance with applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <span>Provide feedback and bug reports to help improve the service</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Prohibited Uses:</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Attempting to reverse engineer, decompile, or hack the service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Using the service for illegal activities or harmful purposes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Overloading our infrastructure through automated requests or DDoS attacks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Attempting to collect personal information from other users (though none exists)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Violating any applicable local, state, national, or international law</span>
                  </li>
                </ul>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Account Responsibility
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Since OnePageOS requires no account creation, you are responsible for managing your local data. We recommend regularly backing up important information as we cannot recover lost local data.
                  </p>
                </div>
              </section>

              {/* Intellectual Property */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">©️</span>
                  Intellectual Property Rights
                </h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">OnePageOS Rights:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The OnePageOS application, including its original code, design, graphics, and user interface, is protected by copyright and other intellectual property laws. All rights are reserved unless explicitly stated otherwise.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Content Rights:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  You retain full ownership and rights to any content you create using OnePageOS, including voice recordings, transcriptions, tasks, notes, and calendar events. Since all data stays on your device, you maintain complete control over your content.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Open Source Components:</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• Next.js (MIT License)</li>
                      <li>• React (MIT License)</li>
                      <li>• Tailwind CSS (MIT License)</li>
                      <li>• compromise.js (MIT License)</li>
                      <li>• Font Awesome (SIL OFL 1.1 License)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">License Grant to You:</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We grant you a limited, non-exclusive, non-transferable license to use OnePageOS for personal and commercial purposes, subject to these terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Privacy and Data */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">🔒</span>
                  Privacy and Data Handling
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Your privacy is fundamental to our service. Please review our detailed <Link href="/privacy" className="text-orange-600 dark:text-orange-400 hover:underline">Privacy Policy</Link> for complete information.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg text-center">
                    <div className="text-2xl mb-3">🔐</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Zero Collection</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We do not collect, store, or transmit any personal data or voice recordings.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg text-center">
                    <div className="text-2xl mb-3">💻</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Local Processing</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      All voice processing and data storage happens entirely on your device.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg text-center">
                    <div className="text-2xl mb-3">🛡️</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Full Control</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      You can clear all data instantly and use the service completely offline.
                    </p>
                  </div>
                </div>
              </section>

              {/* Disclaimers and Limitations */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  Disclaimers and Limitations
                </h2>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Service Disclaimer
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    OnePageOS is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• We do not guarantee 100% accuracy of speech recognition</li>
                    <li>• Voice recognition quality depends on your browser and device capabilities</li>
                    <li>• Internet connectivity may be required for some browser speech features</li>
                    <li>• Service availability may be affected by maintenance or technical issues</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Limitation of Liability:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  In no event shall OnePageOS, its developers, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Services:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  OnePageOS relies on your browser&apos;s Web Speech API, which may be provided by third parties (Google, Apple, Microsoft). We are not responsible for the privacy practices or availability of these third-party services.
                </p>
              </section>

              {/* Termination */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">🚪</span>
                  Termination
                </h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Right to Terminate:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You may stop using OnePageOS at any time. Since no account is required, simply close your browser or navigate away from the service to terminate your use.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Our Right to Terminate:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  We reserve the right to suspend or discontinue the service for any reason, including maintenance, updates, or if we can no longer provide the service economically. We will provide reasonable notice when possible.
                </p>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Effect of Termination
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Upon termination, your local data will remain on your device unless you choose to clear it. No data is transmitted to our servers, so termination does not affect your stored information.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">📝</span>
                  Changes to Terms
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  We may modify these Terms of Service from time to time. When we do, we will:
                </p>

                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Update the &quot;Last modified&quot; date at the top of this page</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Post the updated terms on this page</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>For significant changes, display a notice in the application</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Provide reasonable notice when possible</span>
                  </li>
                </ul>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Continued Use = Acceptance
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Your continued use of OnePageOS after any changes to these terms constitutes your acceptance of the new terms. If you disagree with any changes, please discontinue using the service.
                  </p>
                </div>
              </section>

              {/* Governing Law */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">⚖️</span>
                  Governing Law and Jurisdiction
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction where OnePageOS is operated, without regard to its conflict of law provisions.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Dispute Resolution:</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• First, contact us directly to resolve issues</li>
                      <li>• We prefer informal resolution when possible</li>
                      <li>• Formal disputes subject to applicable law</li>
                      <li>• Class action waiver applies where legally permissible</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Severability:</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">📧</span>
                  Contact Information
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">General Questions:</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                        Email: <a href="mailto:write@digiwares.xyz" className="text-orange-600 dark:text-orange-400 hover:underline">write@digiwares.xyz</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Response time: Within 48 hours
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Legal Issues:</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                        Email: <a href="mailto:write@digiwares.xyz" className="text-orange-600 dark:text-orange-400 hover:underline">write@digiwares.xyz</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        For legal disputes or compliance issues
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Acknowledgment */}
              <section className="mb-8">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">
                    Acknowledgment
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    By using OnePageOS, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. You also acknowledge that these terms constitute a legally binding agreement between you and OnePageOS.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
    </Layout>
  )
}
