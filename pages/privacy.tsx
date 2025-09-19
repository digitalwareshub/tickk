import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Privacy() {
  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Head>
        <title>Privacy Policy | OnePageOS - Complete Privacy Protection for Voice Productivity App</title>
        <meta name="description" content="OnePageOS Privacy Policy: Learn how we protect your privacy with zero data collection. All voice processing happens locally in your browser. GDPR, CCPA compliant voice productivity app." />
        <meta name="keywords" content="privacy policy, voice app privacy, speech recognition privacy, data protection, GDPR compliance, CCPA compliance, zero data collection, browser-based privacy, voice data security" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://onepageos.com/privacy" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy | OnePageOS - Complete Privacy Protection" />
        <meta property="og:description" content="Zero data collection policy for our voice productivity app. All processing happens locally in your browser for maximum privacy." />
        <meta property="og:url" content="https://onepageos.com/privacy" />
        <meta property="og:type" content="website" />
        
        {/* Schema.org structured data for Privacy Policy */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Privacy Policy",
              "description": "OnePageOS Privacy Policy outlining our commitment to user privacy and data protection",
              "url": "https://onepageos.com/privacy",
              "isPartOf": {
                "@type": "WebSite",
                "name": "OnePageOS",
                "url": "https://onepageos.com"
              },
              "about": {
                "@type": "PrivacyPolicy",
                "name": "OnePageOS Privacy Policy",
                "description": "Comprehensive privacy policy covering voice data processing, browser-based privacy, and user rights",
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
                Privacy Policy
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  How OnePageOS protects your privacy and handles your data
                </p>
                <div className="mt-4 sm:mt-0 text-sm text-gray-500 dark:text-gray-400">
                  Last updated: September 19, 2024
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🔒</div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Zero Data Collection Guarantee
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                OnePageOS is designed with privacy-first principles. We do not collect, store, transmit, or have access to any of your voice data, personal information, or usage patterns. All processing happens entirely within your browser.
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              
              {/* Information We Collect */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Information We Collect
                </h2>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    The Short Answer: None
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    OnePageOS does not collect any personal information, voice data, or usage analytics. We have no servers, no databases, and no tracking mechanisms.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What We Don&apos;t Collect:</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Voice recordings or audio data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Transcribed text or speech content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Personal information (name, email, phone number)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Device information or browser fingerprinting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Usage analytics or behavioral tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>IP addresses or location data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">❌</span>
                    <span>Cookies for tracking or analytics</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Local Storage Only:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your tasks, notes, and calendar items are stored exclusively in your browser&apos;s local storage on your device. This data never leaves your device and is not accessible to OnePageOS or any third parties.
                </p>
              </section>

              {/* How We Process Data */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">⚙️</span>
                  How Voice Processing Works
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Voice Input</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your browser&apos;s Web Speech API captures and processes your voice entirely within your device.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Local Processing</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Natural language processing happens in your browser using compromise.js library.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Local Storage</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Results are saved only to your device&apos;s local storage, never transmitted anywhere.
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Third-Party Speech Recognition
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    While OnePageOS itself doesn&apos;t collect any data, your browser&apos;s speech recognition feature may be provided by your operating system or browser vendor (Google, Apple, Microsoft). Please review their privacy policies for information about how they handle voice data during speech recognition.
                  </p>
                </div>
              </section>

              {/* Third-Party Services */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">🔗</span>
                  Third-Party Services
                </h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Content Delivery Network (CDN):</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use CDN services to deliver static assets (CSS, JavaScript libraries) for performance optimization. These services may log basic technical information like IP addresses for security and performance monitoring, but they do not have access to your voice data or personal information.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">JavaScript Libraries:</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <span><strong>compromise.js:</strong> Client-side natural language processing (no data transmission)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <span><strong>Tailwind CSS:</strong> Styling framework (no data collection)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <span><strong>Font Awesome:</strong> Icon library (no data collection)</span>
                  </li>
                </ul>
              </section>

              {/* User Rights */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">🛡️</span>
                  Your Rights and Control
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Complete Control</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• Clear all data anytime with one click</li>
                      <li>• No account deletion needed (no accounts exist)</li>
                      <li>• All data stays on your device</li>
                      <li>• Use offline without any data transmission</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Privacy Protection</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• No data requests needed (we have no data)</li>
                      <li>• No marketing emails or communications</li>
                      <li>• No behavioral tracking or profiling</li>
                      <li>• Complete anonymity guaranteed</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* GDPR Compliance */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">🇪🇺</span>
                  GDPR Compliance (European Users)
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  OnePageOS fully complies with the General Data Protection Regulation (GDPR) through our privacy-by-design approach:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">GDPR Principles Met:</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✅</span>
                        <span><strong>Data Minimization:</strong> We collect zero data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✅</span>
                        <span><strong>Purpose Limitation:</strong> No data collection = no secondary use</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✅</span>
                        <span><strong>Storage Limitation:</strong> All data stays on your device</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✅</span>
                        <span><strong>Transparency:</strong> Complete openness about our practices</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Your GDPR Rights:</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✅</span>
                        <span><strong>Right to Access:</strong> N/A (no data collected)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✅</span>
                        <span><strong>Right to Erasure:</strong> Clear local data anytime</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✅</span>
                        <span><strong>Right to Portability:</strong> Export your local data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✅</span>
                        <span><strong>Right to Object:</strong> Simply stop using the app</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* CCPA Compliance */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">🇺🇸</span>
                  CCPA Compliance (California Users)
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Under the California Consumer Privacy Act (CCPA), OnePageOS provides complete transparency:
                </p>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    CCPA Disclosure Statement
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Categories of Personal Information:</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">None collected in the past 12 months</p>
                      
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sources of Information:</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">No sources (no data collection)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Business Purpose:</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">N/A (no personal information processed)</p>
                      
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Third-Party Sharing:</h4>
                      <p className="text-gray-700 dark:text-gray-300">None (no data to share)</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Children's Privacy */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">👶</span>
                  Children&apos;s Privacy (COPPA Compliance)
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  OnePageOS is safe for users of all ages, including children under 13, because we do not collect any personal information from any users. Our zero-data collection approach means we are inherently compliant with the Children&apos;s Online Privacy Protection Act (COPPA).
                </p>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Safe for All Ages
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Parents can feel confident letting their children use OnePageOS for educational or personal productivity purposes, as no personal information is ever collected, stored, or transmitted.
                  </p>
                </div>
              </section>

              {/* Security */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">🔐</span>
                  Security Measures
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technical Security:</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🔒</span>
                        <span>HTTPS encryption for all communications</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🔒</span>
                        <span>Content Security Policy (CSP) headers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🔒</span>
                        <span>No server-side data storage</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🔒</span>
                        <span>Client-side only processing</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Privacy Security:</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🛡️</span>
                        <span>No tracking scripts or analytics</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🛡️</span>
                        <span>No third-party data sharing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🛡️</span>
                        <span>Local storage only architecture</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🛡️</span>
                        <span>Open source transparency</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Changes to Privacy Policy */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">📝</span>
                  Changes to This Privacy Policy
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. Any changes will be posted on this page with an updated &quot;Last modified&quot; date.
                </p>
                
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Our Commitment
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    We commit to never implementing any form of data collection without making it extremely clear to users and providing easy opt-out mechanisms. Our privacy-first approach is a core principle, not a marketing feature.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-2xl mr-3">📧</span>
                  Contact Us
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">General Inquiries:</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                        Email: <a href="mailto:write@digiwares.xyz" className="text-orange-600 dark:text-orange-400 hover:underline">write@digiwares.xyz</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Response time: Within 48 hours
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Legal Requests:</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                        Email: <a href="mailto:write@digiwares.xyz" className="text-orange-600 dark:text-orange-400 hover:underline">write@digiwares.xyz</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        For GDPR, CCPA, or other privacy law inquiries
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
    </Layout>
  )
}
