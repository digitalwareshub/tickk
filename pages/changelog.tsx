import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

export default function Changelog() {
  return (
    <>
      <Head>
        <title>Changelog | tickk - Version History and Updates</title>
        <meta name="description" content="Track tickk updates, new features, and improvements. See what's new in each version of our voice productivity app." />
        <meta name="keywords" content="tickk changelog, version history, updates, new features, voice app updates, productivity app changelog" />
        <link rel="canonical" href="https://tickk.app/changelog" />
      </Head>

      <Layout className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Breadcrumbs */}
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="heading-primary text-gray-900 mb-4">
              Changelog
            </h1>
            <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
              Track all updates, new features, and improvements to tickk. Stay informed about what&apos;s new in each version.
            </p>
          </div>

          {/* Current Version - Featured */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-8 mb-8">
            <div className="flex items-center gap-2 text-sm text-orange-600 mb-4">
              <span>🚀 Latest Release</span>
              <span>•</span>
              <span>October 2025</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">V1.10.2 - Major Feature Update</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🎯 Major New Features</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• <strong>English-Only Architecture</strong> - Removed Spanish localization for simplified, focused experience</li>
                  <li>• <strong>Focus Mode</strong> - New dedicated tab for today&apos;s priorities and focused productivity, especially helpful for ADHD users</li>
                  <li>• <strong>Command Palette (⌘K / Ctrl+K)</strong> - VS Code-style quick actions with fuzzy search</li>
                  <li>• <strong>Advanced Analytics Dashboard</strong> - Activity heatmaps, productivity charts, and comprehensive insights</li>
                  <li>• <strong>Streak Tracking System</strong> - Daily activity calendar with current and longest streak counters</li>
                  <li>• <strong>ICS Calendar Export</strong> - Export tasks with dates to Google Calendar, Outlook, and other calendar apps</li>
                  <li>• <strong>Interactive Onboarding Tour</strong> - Step-by-step guidance for new users with contextual highlights</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">⚡ Enhanced User Experience</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• <strong>English-Only Focus</strong> - Simplified to English-only interface for better performance and user focus</li>
                  <li>• <strong>Faster App Performance</strong> - Pages load quicker and navigation is more responsive</li>
                  <li>• <strong>Enhanced Keyboard Shortcuts</strong> - Complete keyboard navigation with new shortcut combinations</li>
                  <li>• <strong>Professional UI Improvements</strong> - Consistent design language and better responsive design</li>
                  <li>• <strong>Activity Heatmap</strong> - GitHub-style visual showing productivity patterns by hour and day</li>
                  <li>• <strong>Productivity Charts</strong> - Line graphs showing task completion trends over time</li>
                  <li>• <strong>Smart Calendar Export</strong> - Seamlessly add your tasks to any calendar app (Google, Outlook, Apple)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Previous Versions */}
          <div className="space-y-8">
            {/* V1.10.1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span>📅 October 2025</span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-4">V1.10.1</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">✨ New Features</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• <strong>Bulk Delete Operations</strong> - Select multiple completed items for efficient deletion</li>
                    <li>• Comprehensive keyboard shortcuts accessible via ⌘K / Ctrl+K command palette</li>
                    <li>• Multi-select functionality with checkbox controls</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🔧 Improvements</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Streamlined footer design with better navigation</li>
                    <li>• Enhanced user experience for managing completed tasks</li>
                    <li>• Improved accessibility with proper keyboard navigation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* V1.10.0 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span>📅 October 2025</span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-4">V1.10.0</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🚀 New Features</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Custom delete confirmation modals</li>
                    <li>• Clear all data option to reset and restart</li>
                    <li>• Tag system for organizing tasks and notes in edit mode</li>
                    <li>• Unified view: All English and Spanish braindumps visible together</li>
                    <li>• Improved voice recording experience</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🔧 Major Improvements</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Faster performance with optimized loading times</li>
                    <li>• Better accessibility with enhanced screen reader support</li>
                    <li>• Improved reliability and stability across all features</li>
                    <li>• Enhanced user interface with cleaner design</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🐛 Critical Bug Fixes</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Fixed voice recording issues where notes weren&apos;t saving properly</li>
                    <li>• Fixed language switching data loss between English and Spanish</li>
                    <li>• Fixed loading problems where pages would get stuck</li>
                    <li>• Fixed Ctrl+Enter keyboard shortcut inconsistency</li>
                    <li>• Fixed data synchronization issues in the interface</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🏗️ Technical Improvements</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Better code quality and app stability</li>
                    <li>• Enhanced error handling and user feedback</li>
                    <li>• Improved data management and synchronization</li>
                    <li>• More reliable voice recognition processing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* V1.9.1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span>📅 September 2025</span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-4">V1.9.1</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">✨ New Features</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Edit and delete functionality for tasks and notes</li>
                    <li>• Checkboxes to replace circles for better &quot;tickk&quot; experience</li>
                    <li>• Reviews page with user testimonials section</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🔧 Improvements</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Better visual consistency across the app</li>
                    <li>• Improved checkbox visibility and styling</li>
                    <li>• Enhanced navigation with new Reviews section</li>
                    <li>• Updated browser compatibility information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🐛 Bug Fixes</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Fixed various display issues</li>
                    <li>• Improved mobile experience</li>
                    <li>• Enhanced overall stability</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* V1.9.0 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span>📅 September 2025</span>
                <span>•</span>
                <span>Initial Release</span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-4">V1.9.0</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎉 Core Features</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Complete date and time display in braindump and organized views</li>
                    <li>• Spanish language support with full localization</li>
                    <li>• Voice recognition integration using Web Speech API</li>
                    <li>• Automatic task and note organization using NLP</li>
                    <li>• Progressive Web App (PWA) functionality</li>
                    <li>• Local storage with complete privacy protection</li>
                    <li>• Cross-platform compatibility (Chrome, Edge, Safari)</li>
                    <li>• Keyboard shortcuts for improved accessibility</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🔒 Privacy & Security</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Zero data collection - everything stays on your device</li>
                    <li>• No account required - start using immediately</li>
                    <li>• Offline functionality for voice transcription</li>
                    <li>• Open source codebase for transparency</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Future Roadmap */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mt-8">
            <h2 className="heading-secondary text-gray-900 mb-6">What&apos;s Next</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">V1.12.0 - December 2025</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Mozilla Firefox support completion</li>
                  <li>• Enhanced voice command shortcuts for hands-free operation</li>
                  <li>• Advanced productivity insights and goal setting</li>
                  <li>• Team collaboration features (Pro tier)</li>
                  <li>• Cloud backup and sync capabilities</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">V1.13.0 - January 2026</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• AI-powered task prioritization and suggestions</li>
                  <li>• Integration with popular productivity tools</li>
                  <li>• Advanced export formats (PDF, Markdown, CSV)</li>
                  <li>• Custom themes and personalization options</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white border border-gray-200 rounded-lg p-8 mt-8">
            <h2 className="heading-secondary text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Want to be notified about new releases? Follow us on social media or check back regularly for updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://x.com/TheTickkApp" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-responsive bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                Follow on Twitter
              </a>
              <Link 
                href="/" 
                className="btn-responsive bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors"
              >
                Try tickk Now
              </Link>
            </div>
          </div>

        </div>
      </Layout>
    </>
  )
}
