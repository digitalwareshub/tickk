/**
 * Admin Analytics Dashboard Page
 * Accessible at /admin/analytics
 */

import { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export default function AdminAnalytics() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      <Head>
        <title>Analytics Dashboard - tickk Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                📊 Analytics Dashboard
              </h1>
              <p className="text-gray-600 mb-8">
                Real-time insights into user behavior, conversions, and content performance
              </p>
              
              <button
                onClick={() => setShowDashboard(true)}
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Open Analytics Dashboard
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  🎯 What You&apos;ll See
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Real-time user activity</li>
                  <li>• User segment breakdown (ADHD, Students, etc.)</li>
                  <li>• Conversion funnel analysis</li>
                  <li>• Content engagement metrics</li>
                  <li>• Performance insights</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  📈 Key Metrics
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Page views and unique visitors</li>
                  <li>• Conversion rates by segment</li>
                  <li>• FAQ engagement patterns</li>
                  <li>• Use case card performance</li>
                  <li>• CTA click-through rates</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-orange-50 border border-orange-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">
                🔒 Admin Access Only
              </h3>
              <p className="text-orange-800">
                This dashboard is only accessible to you as the site administrator. 
                It provides detailed insights into user behavior and helps optimize 
                the landing page for better conversions.
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard Modal */}
        <AnalyticsDashboard 
          isVisible={showDashboard} 
          onClose={() => setShowDashboard(false)} 
        />
      </Layout>
    </>
  );
}
