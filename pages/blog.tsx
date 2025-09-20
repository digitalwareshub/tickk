import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog | tickk - Voice Productivity Insights</title>
        <meta name="description" content="Learn about voice productivity, braindump methods, and thought organization. Expert insights on improving productivity without AI dependencies." />
        <meta name="keywords" content="voice productivity blog, braindump method, productivity insights, voice note taking tips, thought organization, productivity without AI, voice to text productivity" />
        <link rel="canonical" href="https://tickk.app/blog" />
      </Head>

      <Layout className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="heading-primary text-gray-900 mb-4">
              Voice Productivity Blog
            </h1>
            <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
              Insights, tips, and methods for better productivity through voice capture and thought organization.
            </p>
          </div>

          {/* Featured Post */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span>January 2024</span>
              <span>•</span>
              <span>5 min read</span>
              <span>•</span>
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">Featured</span>
            </div>
            
            <Link href="/blog/braindump-first-organize-later-productivity" className="block group">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                Why Your Best Ideas Die in Your Productivity App
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Discover why forcing thoughts into categories while having them kills creativity. Learn the braindump-first approach that captures everything, then organizes later using voice technology.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Voice Notes</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Braindump Method</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Productivity</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">No AI</span>
              </div>
              <span className="inline-flex items-center text-orange-600 font-medium group-hover:text-orange-700">
                Read article
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </Link>
          </div>

          {/* Coming Soon */}
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">More Articles Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              We&apos;re working on more insights about voice productivity, thought capture, and distraction-free workflows.
            </p>
            <Link href="/" className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Try tickk Now
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>

        </div>
      </Layout>
    </>
  )
}
