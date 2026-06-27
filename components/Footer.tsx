import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface FooterProps {
  showHomeLink?: boolean
}

interface MobileFooterLink {
  label: string
  href: string
  badge?: string
  external?: boolean
}

interface MobileFooterSection {
  id: string
  title: string
  links: MobileFooterLink[]
}

export default function Footer({ showHomeLink = false }: FooterProps) {
  const router = useRouter()
  const currentYear = new Date().getFullYear()
  const [openMobileSection, setOpenMobileSection] = useState('product')

  const mobileFooterSections: MobileFooterSection[] = [
    {
      id: 'product',
      title: 'Product',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Transform Notes', href: '/transform', badge: 'new' },
        { label: 'Mind Map', href: '/mindmap', badge: 'new' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
    {
      id: 'support',
      title: 'Support',
      links: [
        { label: 'Support & Help', href: '/support' },
        { label: 'Donate', href: '/donate' },
        { label: 'Contact', href: '/contact' },
        { label: 'Bug Reports', href: '/bug-report' },
      ],
    },
    {
      id: 'legal',
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Changelog', href: '/changelog' },
      ],
    },
    {
      id: 'community',
      title: 'Community',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Reviews', href: '/reviews' },
        { label: 'Open Source', href: 'https://github.com/digitalwareshub/tickk', external: true },
      ],
    },
  ]

  return (
    <footer className="tickk-shrp-footer bg-[#1a1b26] border-t border-[#333333]">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Mobile Simple Layout */}
        <div className="block md:hidden">
          <div className="py-3">
          {/* Brand Section */}
          <div className="mb-6 rounded-md border border-[#333333] bg-white/[0.02] p-5 text-center">
            <Link href="/" className="mb-2 inline-flex font-mono text-xl font-semibold text-orange-500 no-underline">
              ~/tickk
            </Link>
            <p className="mx-auto mb-4 max-w-xs text-sm leading-6 text-[#a0a0a0]">
              Private voice brain dump app for fast thinkers.
            </p>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-orange-600 px-5 py-3 font-mono text-sm font-semibold lowercase text-white no-underline transition-colors hover:bg-orange-500"
            >
              start brain dump
            </Link>
          </div>

          {/* Mobile Accordion Navigation */}
          <div className="mb-6 overflow-hidden rounded-md border border-[#333333] bg-white/[0.02]">
            {mobileFooterSections.map((section) => {
              const isOpen = openMobileSection === section.id

              return (
                <div key={section.id} className="border-b border-[#333333] last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpenMobileSection(isOpen ? '' : section.id)}
                    className="flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-white">
                      {section.title}
                    </span>
                    <span className={`text-lg text-orange-400 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="space-y-2 px-3 pb-3">
                      {section.links.map((link) => {
                        const content = (
                          <>
                            <span>{link.label}</span>
                            <span className="flex items-center gap-2">
                              {link.badge && (
                                <span className="rounded-full border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-300">
                                  {link.badge}
                                </span>
                              )}
                              <span className="text-[#737373]">&gt;</span>
                            </span>
                          </>
                        )

                        const className = "flex min-h-[44px] items-center justify-between rounded-md bg-[#101116] px-3 py-2 text-sm text-[#d4d4d4] no-underline transition-colors hover:bg-[#151722] hover:text-white"

                        return link.external ? (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={className}
                          >
                            {content}
                          </a>
                        ) : (
                          <Link key={link.href} href={link.href} className={className}>
                            {content}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <p className="mb-4 text-center text-sm text-[#a0a0a0]">
            Part of the <a href="https://digiwares.xyz" target="_blank" rel="noopener noreferrer" className="font-medium text-orange-400 transition-colors hover:text-orange-300">Digiwares</a> ecosystem.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-5">
            <a 
              href="https://x.com/tickkdotapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
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
              className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
              aria-label="View tickk Voice App on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.374-12-12-12z"/>
              </svg>
            </a>
          </div>

          {/* Mobile Tech Stack Credits */}
          <div className="border-t border-[#333333] pt-5 text-center space-y-2">
            <div className="text-xs text-[#a0a0a0]">
              © {currentYear} tickk. Built with ❤️ for daily productivity.
            </div>
            <div className="text-xs text-[#737373] space-x-2">
              <span>Next.js</span>
              <span>•</span>
              <span>Web Speech API</span>
              <span>•</span>
              <span>compromise.js</span>
            </div>
          </div>

          </div>
        </div>

      {/* Desktop Full Layout */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-1">
          {/* Centered Tagline */}
          <div className="text-center mb-4">
            <p className="text-responsive text-gray-500 dark:text-slate-400">
              Part of the <a href="https://digiwares.xyz" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors font-medium">Digiwares</a> ecosystem.
            </p>
          </div>

          {/* Five Column Layout */}
          <div className="grid grid-cols-5 gap-4 mb-1 max-w-6xl mx-auto">
            {/* Product Column */}
            <div>
              <h3 className="text-xs font-semibold text-orange-300 uppercase tracking-[0.18em] mb-3 border-l-2 border-orange-500 pl-3">
                Product
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/transform" className="flex items-center space-x-1 group">
                    <span className="text-gray-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      Transform Notes
                    </span>
                    <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 px-1.5 py-0.5 rounded-full">
                      NEW
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/mindmap" className="flex items-center space-x-1 group">
                    <span className="text-gray-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      Mind Map
                    </span>
                    <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 px-1.5 py-0.5 rounded-full">
                      NEW
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Column */}
            <div>
              <h3 className="text-xs font-semibold text-orange-300 uppercase tracking-[0.18em] mb-3 border-l-2 border-orange-500 pl-3">
                Community
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Reviews
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/digitalwareshub/tickk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    Open Source
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="text-xs font-semibold text-orange-300 uppercase tracking-[0.18em] mb-3 border-l-2 border-orange-500 pl-3">
                Support
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/support" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Support & Help
                  </Link>
                </li>
                <li>
                  <Link
                    href="/donate"
                    className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/bug-report" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Bug Reports
                  </Link>
                </li>
              </ul>
            </div>

            {/* Collections Column */}
            <div>
              <h3 className="text-xs font-semibold text-orange-300 uppercase tracking-[0.18em] mb-3 border-l-2 border-orange-500 pl-3">
                Collections
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/voice-productivity-apps" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Voice Productivity Apps
                  </Link>
                </li>
                <li>
                  <Link href="/adhd-productivity-tools" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    ADHD Productivity Tools
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Info Column */}
            <div>
              <h3 className="text-xs font-semibold text-orange-300 uppercase tracking-[0.18em] mb-3 border-l-2 border-orange-500 pl-3">
                Legal & Info
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-gray-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
          </div>



        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-slate-700 mt-8">
          {/* Mobile Bottom */}
          <div className="block md:hidden text-center pt-6 pb-4">
            <div className="text-xs text-gray-600 dark:text-slate-400 mb-2">
              © {currentYear} tickk. Built with ❤️ for daily productivity.
            </div>
            {showHomeLink && (
              <button
                onClick={() => router.push('/')}
                className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors flex items-center justify-center gap-1 mx-auto mb-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Back to Homepage
              </button>
            )}
            <div className="text-xs text-gray-500 dark:text-slate-500">
              Next.js • Web Speech API • compromise.js
            </div>
          </div>

          {/* Desktop Bottom */}
          <div className="hidden md:flex flex-col md:flex-row justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-slate-400">
                © {currentYear} tickk. Built with ❤️ for daily productivity enthusiasts.
              </div>
              
              {/* Social Links */}
              <div className="flex items-center justify-center space-x-3">
                <a 
                  href="https://x.com/tickkdotapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-bold"
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
                  className="text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 transition-colors font-bold"
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
                className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Back to Homepage
              </button>
            )}

            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-slate-500">
              <span>Made with Next.js</span>
              <span>•</span>
              <span>Powered by Web Speech API</span>
              <span>•</span>
              <span>NLP by compromise.js</span>
            </div>
          </div>
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
          <li>Your notes are stored locally in your browser. Tickk does not upload your brain dumps to our servers.</li>
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
          Our commitment to user privacy means your notes are stored locally in your browser. Tickk does not upload your brain dumps to our servers.
        </p>
      </div>
    </footer>
  )
}
