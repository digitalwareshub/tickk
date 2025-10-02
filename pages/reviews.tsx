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
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 mb-8">
            <h2 className="heading-secondary text-gray-900 mb-6">Community Feedback</h2>
            
            <div className="space-y-6">
              {/* Reddit Section */}
              <div className="border-l-4 border-orange-400 pl-4">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-semibold text-gray-900">From Reddit r/InternetIsBeautiful</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    75 upvotes
                  </span>
                </div>
                
                {/* Reddit Reviews Grid - Mobile First */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Review 1 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                    <a 
                      href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative">
                        <img 
                          src="/reviews/reddit/review-1.webp" 
                          alt="Reddit review 1" 
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-gray-900">View on Reddit</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Review 2 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                    <a 
                      href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative">
                        <img 
                          src="/reviews/reddit/review-2.webp" 
                          alt="Reddit review 2" 
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-gray-900">View on Reddit</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Review 3 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                    <a 
                      href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative">
                        <img 
                          src="/reviews/reddit/review-3.webp" 
                          alt="Reddit review 3" 
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-gray-900">View on Reddit</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Review 4 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                    <a 
                      href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative">
                        <img 
                          src="/reviews/reddit/review-4.webp" 
                          alt="Reddit review 4" 
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-gray-900">View on Reddit</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Reddit Link */}
                <div className="text-center">
                  <a 
                    href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                    View full discussion on Reddit
                  </a>
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

          {/* Community Stats Section */}
          <div className="mb-8">
            <h2 className="heading-secondary text-gray-900 mb-6">Community Impact</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">75</div>
                <div className="text-sm text-gray-600">Reddit Upvotes</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">4+</div>
                <div className="text-sm text-gray-600">Positive Reviews</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Privacy Focused</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">Free</div>
                <div className="text-sm text-gray-600">Forever</div>
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
                href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
                Share on Reddit
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