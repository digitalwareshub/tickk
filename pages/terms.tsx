/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

export default function Terms() {
  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Terms of Service | tickk - Voice Productivity App Terms & Conditions</title>
        <meta name="description" content="tickk Terms of Service: Simple, fair terms for using our voice productivity app. No hidden clauses, clear language, user-friendly policies." />
        <meta name="keywords" content="terms of service, voice app terms, speech recognition terms, app usage policy, user agreement, productivity app terms" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/terms" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Breadcrumbs */}
        <Breadcrumb />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto mb-2">
            Simple, fair terms for using tickk.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free to Use</h3>
              <p className="text-gray-600 text-sm">No subscription fees or hidden costs</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Data</h3>
              <p className="text-gray-600 text-sm">You own and control all your content</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Browser-Based</h3>
              <p className="text-gray-600 text-sm">Works entirely in your web browser</p>
            </div>
          </div>

          {/* Terms Details */}
          <div className="space-y-6">
            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using tickk, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Use of the Service</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  tickk is a voice productivity tool designed to help you organize your thoughts and tasks. You may use the service for:
                </p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li>• Personal productivity and task management</li>
                  <li>• Voice note-taking and organization</li>
                  <li>• Converting speech to organized text</li>
                  <li>• Any lawful personal or business purpose</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Your Content</h2>
              <p className="text-gray-600 mb-4">
                You retain full ownership of any content you create using tickk. Your voice recordings and organized text remain your property and are stored locally on your device.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Service Availability</h2>
              <p className="text-gray-600 mb-4">
                We strive to maintain high availability, but cannot guarantee uninterrupted service. The service is provided "as is" without warranties of any kind.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Prohibited Uses</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">You may not use tickk for:</p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li>• Any illegal or unauthorized purpose</li>
                  <li>• Violating any laws in your jurisdiction</li>
                  <li>• Transmitting malicious code or content</li>
                  <li>• Attempting to gain unauthorized access to our systems</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                tickk shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.
              </p>
            </section>
          </div>

          {/* Contact Section */}
          <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h3 className="heading-secondary text-gray-900 mb-4">Questions About These Terms?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about these terms of service, please don't hesitate to contact us.
            </p>
            <Link 
              href="/contact" 
              className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            >
              Contact Us About Terms
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}