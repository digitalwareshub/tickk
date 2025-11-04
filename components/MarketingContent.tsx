/**
 * MarketingContent - Features, Reviews, and FAQ sections
 * Displayed at the bottom of the page for SEO and new user conversion
 * Updated: Nov 5, 2025 - Added Hide/Show toggle for better UX
 * Testing webhook deployment trigger
 */

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function MarketingContent() {
  // State management for collapsible marketing section
  const [isVisible, setIsVisible] = useState(true)
  
  // Load preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tickk_show_marketing')
    if (saved !== null) {
      setIsVisible(JSON.parse(saved))
    }
  }, [])
  
  // Save preference to localStorage
  const toggleVisibility = () => {
    const newState = !isVisible
    setIsVisible(newState)
    localStorage.setItem('tickk_show_marketing', JSON.stringify(newState))
  }

  return (
    <>
      {/* Visual Divider with Hide/Show Toggle */}
      <div className="max-w-4xl mx-auto w-full px-6 py-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-between items-center">
            <div className="flex-1"></div>
            <span className="bg-white px-4 text-sm text-gray-500">
              📚 Learn more about tickk
            </span>
            <div className="flex-1 flex justify-end">
              <button
                onClick={toggleVisibility}
                className="bg-white pl-4 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors flex items-center gap-1"
                aria-label={isVisible ? "Hide marketing content" : "Show marketing content"}
              >
                {isVisible ? 'Hide' : 'Show'}
                <span className="text-xs">{isVisible ? '▲' : '▼'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Marketing Content - Collapsible */}
      {isVisible && (
        <div className="max-w-4xl mx-auto w-full px-6 pb-12">
          {/* Key Features - Icon Grid */}
          <div className="mt-8 mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all bg-white">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold text-gray-900 text-sm">ADHD Friendly</div>
              <div className="text-xs text-gray-600 mt-1">Focus Mode built-in</div>
            </div>
            <div className="text-center p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all bg-white">
              <div className="text-3xl mb-2">🔒</div>
              <div className="font-semibold text-gray-900 text-sm">100% Private</div>
              <div className="text-xs text-gray-600 mt-1">Data stays on device</div>
            </div>
            <div className="text-center p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all bg-white">
              <div className="text-3xl mb-2">📱</div>
              <div className="font-semibold text-gray-900 text-sm">Works Offline</div>
              <div className="text-xs text-gray-600 mt-1">PWA technology</div>
            </div>
            <div className="text-center p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all bg-white">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-semibold text-gray-900 text-sm">Lightning Fast</div>
              <div className="text-xs text-gray-600 mt-1">No AI delays</div>
            </div>
          </div>

          {/* User Testimonials - Real Reddit Reviews */}
          <div className="my-12 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Loved by Productivity Enthusiasts</h2>
            <p className="text-sm text-gray-600 mb-6 text-center">Real reviews from Reddit</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <Image 
                  src="/reviews/reddit/review-1.webp" 
                  alt="Real Reddit review" 
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <Image 
                  src="/reviews/reddit/review-2.webp" 
                  alt="Real Reddit review" 
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <Image 
                  src="/reviews/reddit/review-5.webp" 
                  alt="Real Reddit review" 
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="my-12 max-w-3xl mx-auto text-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="p-5 border border-gray-200 rounded-xl bg-white hover:border-orange-200 transition-colors group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Is my data safe and private?</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">Yes! Everything stays on YOUR device. We don&apos;t store your data on any server. No account, no tracking, 100% private. Your thoughts remain yours.</p>
              </details>
              <details className="p-5 border border-gray-200 rounded-xl bg-white hover:border-orange-200 transition-colors group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Do I need to create an account?</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">Nope! Just open the app and start using it. No email, no password, no signup required. We respect your time and privacy.</p>
              </details>
              <details className="p-5 border border-gray-200 rounded-xl bg-white hover:border-orange-200 transition-colors group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Does it work offline?</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">Yes! tickk is a PWA (Progressive Web App). Once loaded, core features work without internet. Your data is always available.</p>
              </details>
              <details className="p-5 border border-gray-200 rounded-xl bg-white hover:border-orange-200 transition-colors group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Which browsers support voice recording?</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">Chrome, Edge, and Safari on iOS/Mac. We use your browser&apos;s built-in speech recognition - no external services!</p>
              </details>
              <details className="p-5 border border-gray-200 rounded-xl bg-white hover:border-orange-200 transition-colors group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>Is it really free?</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">Absolutely! Core features are free forever. We&apos;re building advanced features for a Pro tier, but the free version will always be powerful and useful.</p>
              </details>
              <details className="p-5 border border-gray-200 rounded-xl bg-white hover:border-orange-200 transition-colors group">
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  <span>What languages are supported?</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">Currently English and Spanish. Voice recognition uses your browser&apos;s built-in capabilities, so accuracy is excellent!</p>
              </details>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
