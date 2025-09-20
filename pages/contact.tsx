/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Contact() {
  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Contact Us | tickk - Get in Touch with Voice Productivity App Support</title>
        <meta name="description" content="Contact tickk support team. Get help with voice productivity app, report bugs, suggest features, or ask questions about our speech recognition tool." />
        <meta name="keywords" content="contact support, voice app contact, speech recognition help, productivity app support, customer service, technical support" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/contact" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
            We're here to help! Reach out with questions, feedback, or support requests.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">General Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Questions about using tickk or need help getting started?
            </p>
            <a 
              href="mailto:support@tickk.app" 
              className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
            >
              support@tickk.app
            </a>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">🐛</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bug Reports</h3>
            <p className="text-gray-600 text-sm mb-4">
              Found a bug or experiencing technical issues?
            </p>
            <Link 
              href="/bug-report" 
              className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
            >
              Report a Bug →
            </Link>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature Ideas</h3>
            <p className="text-gray-600 text-sm mb-4">
              Have suggestions for improving tickk?
            </p>
            <a 
              href="mailto:feedback@tickk.app" 
              className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
            >
              feedback@tickk.app
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* FAQ Section */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">How does voice recognition work?</h3>
                <p className="text-gray-600 text-sm">
                  tickk uses your browser's built-in Web Speech API to convert speech to text. All processing happens locally in your browser - no audio data is sent to external servers.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! Your voice recordings and organized content are stored locally in your browser. We don't collect, store, or transmit any personal data. See our <Link href="/privacy" className="text-orange-600 hover:text-orange-700">Privacy Policy</Link> for details.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Which browsers are supported?</h3>
                <p className="text-gray-600 text-sm">
                  tickk works best in modern browsers with Web Speech API support: Chrome, Firefox, Safari, and Edge. Chrome provides the most reliable experience.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Can I use tickk offline?</h3>
                <p className="text-gray-600 text-sm">
                  Voice recognition requires an internet connection, but once your content is transcribed, you can view and organize it offline. Your data remains accessible even without internet.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">How accurate is the speech recognition?</h3>
                <p className="text-gray-600 text-sm">
                  Accuracy depends on factors like speech clarity, background noise, and internet connection. For best results, speak clearly in a quiet environment.
                </p>
              </div>
            </div>
          </section>

          {/* Response Times */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Response Times</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🚀 Priority Support</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Critical bugs: Within 24 hours</li>
                  <li>• Security issues: Within 12 hours</li>
                  <li>• Data loss reports: Within 6 hours</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">📝 General Inquiries</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• General questions: 1-3 business days</li>
                  <li>• Feature requests: 3-5 business days</li>
                  <li>• Documentation: 2-4 business days</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Before You Contact Us */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Before You Contact Us</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Help Us Help You</h3>
              <p className="text-gray-600 text-sm mb-3">
                To provide the best support, please include:
              </p>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Your browser name and version</li>
                <li>• Operating system (Windows, macOS, etc.)</li>
                <li>• Steps to reproduce the issue</li>
                <li>• Screenshots or error messages (if applicable)</li>
                <li>• What you were trying to accomplish</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Contact Form Alternative */}
        <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="heading-secondary text-gray-900 mb-4">Ready to Get in Touch?</h3>
          <p className="text-gray-600 mb-6">
            Choose the best way to reach us based on your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@tickk.app?subject=tickk Support Request"
              className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            >
              Email Support
            </a>
            <Link 
              href="/support" 
              className="btn-responsive bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors"
            >
              Visit Help Center
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}