import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Reviews() {
  return (
    <>
      <Head>
        <title>Reviews | tickk - User Feedback and Testimonials</title>
        <meta name="description" content="Read reviews and testimonials from tickk users. See how our voice productivity app is helping people capture thoughts, organize tasks, and boost productivity." />
        <meta name="keywords" content="tickk reviews, voice app testimonials, productivity app feedback, user reviews, speech recognition reviews, voice productivity testimonials" />
        <link rel="canonical" href="https://tickk.app/reviews" />
      </Head>

      <Layout className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="heading-primary text-gray-900 mb-4">
              User Reviews & Testimonials
            </h1>
            <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
              See what our users are saying about tickk and how it&apos;s transforming their productivity workflow.
            </p>
          </div>

          {/* Community Feedback Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
            <h2 className="heading-secondary text-gray-900 mb-6">Community Feedback</h2>
            
            <div className="space-y-6">
              {/* Reddit Section */}
              <div className="border-l-4 border-orange-400 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">From Reddit r/productivity</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                  <p className="text-gray-600 mb-4">
                    <em>Real user feedback from the Reddit community will be displayed here.</em>
                  </p>
                  <div className="text-sm text-gray-500">
                    Screenshots and testimonials from Reddit users will be added soon.
                  </div>
                </div>
              </div>

              {/* Twitter Section */}
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">From Twitter</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                  <p className="text-gray-600 mb-4">
                    <em>Social media mentions and user testimonials will be featured here.</em>
                  </p>
                  <div className="text-sm text-gray-500">
                    Twitter feedback and mentions will be added soon.
                  </div>
                </div>
              </div>

              {/* GitHub Section */}
              <div className="border-l-4 border-gray-400 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">From GitHub Community</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                  <p className="text-gray-600 mb-4">
                    <em>Open source community feedback and contributions will be highlighted here.</em>
                  </p>
                  <div className="text-sm text-gray-500">
                    GitHub issues, discussions, and contributor feedback will be added soon.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Testimonials Section */}
          <div className="mb-8">
            <h2 className="heading-secondary text-gray-900 mb-6">User Testimonials</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Placeholder for real testimonials */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span>•</span>
                  <span>Real User</span>
                </div>
                
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  <em>Real user testimonials will be displayed here as they come in.</em>
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-sm">?</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">User Name</p>
                    <p className="text-sm text-gray-600">Role/Title</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span>•</span>
                  <span>Real User</span>
                </div>
                
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  <em>More real user testimonials will be added here.</em>
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-sm">?</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">User Name</p>
                    <p className="text-sm text-gray-600">Role/Title</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h2 className="heading-secondary text-gray-900 mb-4">Share Your Experience</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Have you tried tickk? We&apos;d love to hear about your experience and how it&apos;s helping with your productivity workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:write@digiwares.xyz?subject=tickk Review"
                className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
              >
                Share Your Review
              </a>
              <Link 
                href="/" 
                className="btn-responsive bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors"
              >
                Try tickk Now
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">Growing</div>
              <div className="text-sm text-gray-600">User Base</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-sm text-gray-600">Privacy Focused</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
              <div className="text-sm text-gray-600">Data Collected</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">Free</div>
              <div className="text-sm text-gray-600">Forever</div>
            </div>
          </div>

        </div>
      </Layout>
    </>
  )
}