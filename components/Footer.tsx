import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface FooterProps {
  showHomeLink?: boolean
}

export default function Footer({ showHomeLink = false }: FooterProps) {
  const router = useRouter()
  const currentYear = new Date().getFullYear()
  const [isFooterExpanded, setIsFooterExpanded] = useState(true)

  return (
    <footer className="bg-gray-100 border-t border-gray-200 -mt-8">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Mobile Compact Layout */}
        <div className="block md:hidden">
          {/* Toggle Button */}
          <button 
            onClick={() => setIsFooterExpanded(!isFooterExpanded)}
            className="flex items-center justify-center w-full py-3 text-gray-400 hover:text-gray-600 transition-colors border-t border-gray-200"
            aria-label={isFooterExpanded ? 'Collapse footer' : 'Expand footer'}
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${isFooterExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Collapsible Content */}
          <div className={`overflow-hidden transition-all duration-300 ${isFooterExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pt-4">
              {/* Brand Section */}
              <div className="text-center mb-4">
                <p className="text-responsive text-gray-500">
                  Part of the <a href="https://digiwares.xyz" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 transition-colors font-medium">Digiwares</a> ecosystem.
                </p>
              </div>

          {/* Mobile: 2x2 Grid Layout (2 rows, 2 columns each) */}
          <div className="space-y-4 mb-6">
            {/* Top Row - 2 Columns */}
            <div className="grid grid-cols-2 gap-4">
              {/* Product Column */}
              <div className="space-y-2 text-center">
                <h3 className="text-xs font-medium text-gray-900 mb-2">
                  Product
                </h3>
                <Link href="/" className="block text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  Voice Dashboard
                </Link>
                <Link href="/landing" className="block text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  About
                </Link>
                <Link href="/blog" className="block text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  Blog
                </Link>
              </div>

              {/* Community Column */}
              <div className="space-y-2 text-center">
                <h3 className="text-xs font-medium text-gray-900 mb-2">
                  Community
                </h3>
                <Link href="/reviews" className="block text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  Reviews
                </Link>
                <a
                  href="https://github.com/digitalwareshub/tickk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Open Source
                </a>
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-xs text-blue-600 cursor-not-allowed flex items-center">
                    <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Tickk Pro
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-1 py-0.5 rounded-full">
                    Soon
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row - 2 Columns */}
            <div className="grid grid-cols-2 gap-4">
              {/* Support Column */}
              <div className="space-y-2 text-center">
                <h3 className="text-xs font-medium text-gray-900 mb-2">
                  Support
                </h3>
                <Link href="/support" className="block text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  Support & Help
                </Link>
                <Link href="/contact" className="block text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  Contact
                </Link>
                <Link href="/bug-report" className="block text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  Bug Reports
                </Link>
              </div>

              {/* Legal & Info Column */}
              <div className="space-y-2 text-center">
                <h3 className="text-xs font-medium text-gray-900 mb-2">
                  Legal & Info
                </h3>
                <Link href="/privacy" className="block text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/changelog" className="block text-xs text-gray-600 hover:text-orange-600 transition-colors">
                  Changelog
                </Link>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-4">
            <a 
              href="https://x.com/TheTickkApp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Follow tickk on X"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://github.com/digitalwareshub/tickk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="View tickk Voice App on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.374-12-12-12z"/>
              </svg>
            </a>
          </div>


          </div>
        </div>
      </div>

      {/* Desktop Full Layout */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-1">
          {/* Centered Tagline */}
          <div className="text-center mb-4">
            <p className="text-responsive text-gray-500">
              Part of the <a href="https://digiwares.xyz" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 transition-colors font-medium">Digiwares</a> ecosystem.
            </p>
          </div>

          {/* Four Column Layout */}
          <div className="grid grid-cols-4 gap-4 mb-1 max-w-4xl mx-auto">
            {/* Product Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                Product
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Voice Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/landing" className="text-gray-600 hover:text-orange-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                Community
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/reviews" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Reviews
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://github.com/digitalwareshub/tickk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    Open Source
                  </a>
                </li>
                <li>
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-600 cursor-not-allowed flex items-center text-sm">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      Tickk Pro
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                Support
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/support" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Support & Help
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/bug-report" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Bug Reports
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Info Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                Legal & Info
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
          </div>



        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8">
          {/* Mobile Bottom */}
          <div className="block md:hidden text-center pt-6 pb-4">
            <div className="text-xs text-gray-600 mb-2">
              © {currentYear} tickk. Built with ❤️ for daily productivity.
            </div>
            {showHomeLink && (
              <button
                onClick={() => router.push('/')}
                className="text-xs text-orange-600 hover:text-orange-700 transition-colors flex items-center justify-center gap-1 mx-auto mb-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Back to Homepage
              </button>
            )}
            <div className="text-xs text-gray-500">
              Next.js • Web Speech API • compromise.js
            </div>
          </div>

          {/* Desktop Bottom */}
          <div className="hidden md:flex flex-col md:flex-row justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                © {currentYear} tickk. Built with ❤️ for daily productivity enthusiasts.
              </div>
              
              {/* Social Links */}
              <div className="flex items-center justify-center space-x-3">
                <a 
                  href="https://x.com/TheTickkApp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors font-bold"
                  aria-label="Follow tickk on X"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/digitalwareshub/tickk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 transition-colors font-bold"
                  aria-label="View tickk Voice App on GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.374-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {showHomeLink && (
              <button
                onClick={() => router.push('/')}
                className="text-sm text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Back to Homepage
              </button>
            )}

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Made with Next.js</span>
              <span>•</span>
              <span>Powered by Web Speech API</span>
              <span>•</span>
              <span>NLP by compromise.js</span>
            </div>
          </div>
        </div>
        
        {/* Small Support Badge */}
        <div className="text-center py-4 border-t border-gray-100">
          <Link 
            href="/donate" 
            className="inline-flex items-center px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 text-xs font-medium rounded-md transition-colors border border-yellow-200 hover:border-yellow-300"
          >
            <span>Support the project</span>
          </Link>
        </div>
      </div>
      </div>

      {/* SEO Rich Content for Footer */}
      <div className="sr-only">
        <h2>About tickk Voice Productivity Application</h2>
        <p>
          tickk is the world&apos;s most advanced free voice-to-text productivity application, designed specifically for busy professionals, students, entrepreneurs, and anyone seeking to maximize their productivity through hands-free voice interaction. Our revolutionary platform combines cutting-edge browser-based speech recognition technology with sophisticated natural language processing using compromise.js to deliver an unparalleled voice productivity experience.
        </p>
        <h3>Key Features and Benefits:</h3>
        <ul>
          <li>Advanced Voice Recognition: 99% accuracy rate using your browser&apos;s native Web Speech API</li>
          <li>Smart Text Classification: Automatically categorizes speech into tasks, notes, and calendar events</li>
          <li>Complete Privacy Protection: Zero data collection, all processing happens locally in your browser</li>
          <li>Cross-Platform Compatibility: Works seamlessly on desktop, mobile, and tablet devices</li>
          <li>Offline Functionality: Continue working even without an internet connection</li>
          <li>No Account Required: Start using immediately without any registration or sign-up process</li>
          <li>Progressive Web App: Install directly on your device for native app-like experience</li>
          <li>Dark Mode Support: Comfortable viewing in any lighting condition</li>
          <li>Accessibility Features: Designed for users with different abilities and needs</li>
          <li>Export Capabilities: Share and backup your voice-generated content</li>
        </ul>
        <h3>Perfect for These Use Cases:</h3>
        <ul>
          <li>Meeting note-taking and action item capture</li>
          <li>Brainstorming sessions and idea generation</li>
          <li>Task and project management</li>
          <li>Voice-controlled reminders and scheduling</li>
          <li>Hands-free content creation</li>
          <li>Accessibility-focused productivity workflows</li>
          <li>Mobile productivity while commuting or traveling</li>
          <li>Quick voice memos and thought capture</li>
        </ul>
        <p>
          Our commitment to user privacy means that tickk never collects, stores, or transmits your voice data or personal information. All speech processing happens directly in your browser, ensuring your sensitive information remains completely private and secure.
        </p>
      </div>
    </footer>
  )
}
