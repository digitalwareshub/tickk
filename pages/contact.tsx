/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

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
        
        {/* Breadcrumbs */}
        <Breadcrumb />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
            We're here to help! Reach out with questions, feedback, or support requests.
          </p>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-4">
              For questions, support, or feedback about tickk:
            </p>
            <a 
              href="mailto:write@digiwares.xyz" 
              className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              write@digiwares.xyz
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* FAQ Section */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-200 pl-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">How does voice recognition work?</h3>
                <p className="text-gray-600">
                  tickk uses your browser's built-in Web Speech API to convert speech to text. All processing happens locally in your browser - no audio data is sent to external servers.
                </p>
              </div>

              <div className="border-l-4 border-gray-200 pl-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
                <p className="text-gray-600">
                  Yes! Your voice recordings and organized content are stored locally in your browser. We don't collect, store, or transmit any personal data. See our <Link href="/privacy" className="text-orange-600 hover:text-orange-700">Privacy Policy</Link> for details.
                </p>
              </div>

              <div className="border-l-4 border-gray-200 pl-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Which browsers are supported?</h3>
                <p className="text-gray-600">
                  tickk works best in modern browsers with Web Speech API support: Chrome, Firefox, Safari, and Edge. Chrome provides the most reliable experience.
                </p>
              </div>

              <div className="border-l-4 border-gray-200 pl-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Can I use tickk offline?</h3>
                <p className="text-gray-600">
                  Voice recognition requires an internet connection, but once your content is transcribed, you can view and organize it offline. Your data remains accessible even without internet.
                </p>
              </div>

              <div className="border-l-4 border-gray-200 pl-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">How accurate is the speech recognition?</h3>
                <p className="text-gray-600">
                  Accuracy depends on factors like speech clarity, background noise, and internet connection. For best results, speak clearly in a quiet environment.
                </p>
              </div>
            </div>
          </section>

          {/* Response Times */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Response Times</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <p className="text-gray-600 mb-4">
                We aim to respond to all inquiries within 1-3 business days. Critical issues and security concerns receive priority attention.
              </p>
            </div>
          </section>

          {/* Before You Contact Us */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Before You Contact Us</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <h3 className="font-semibold text-gray-900 mb-3">Help Us Help You</h3>
              <p className="text-gray-600 mb-3">
                To provide the best support, please include:
              </p>
              <ul className="text-gray-600 space-y-1 ml-4">
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
              href="mailto:write@digiwares.xyz?subject=tickk Support Request"
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