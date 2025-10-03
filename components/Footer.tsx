import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLanguage } from '@/contexts/LanguageContext'

interface FooterProps {
  showHomeLink?: boolean
}

export default function Footer({ showHomeLink = false }: FooterProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()
  
  // Helper function to get language-aware URLs
  const getLocalizedUrl = (path: string) => {
    if (language === 'es') {
      return `/es${path}`
    }
    return path
  }

  return (
    <footer className="bg-gray-100  border-t border-gray-200 ">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Mobile Compact Layout */}
        <div className="block md:hidden">
          {/* Brand Section */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="heading-secondary text-gray-900">tickk</span>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">FREE</span>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2 text-center">
              <Link href={getLocalizedUrl('/')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Panel de Voz' : 'Voice Dashboard'}
              </Link>
              <Link href={getLocalizedUrl('/landing')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium">
                {language === 'es' ? 'Acerca de' : 'About'}
              </Link>
              <Link href={getLocalizedUrl('/blog')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                Blog
              </Link>
              <Link href={getLocalizedUrl('/reviews')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Reseñas' : 'Reviews'}
              </Link>
              <a 
                href="https://github.com/digitalwareshub/tickk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                {language === 'es' ? 'Código Abierto' : 'Open Source'}
              </a>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-xs text-blue-600 cursor-not-allowed flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  {language === 'es' ? 'Tickk Pro' : 'Tickk Pro'}
                </span>
                <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
                  {language === 'es' ? 'Próximamente' : 'Soon'}
                </span>
              </div>
            </div>
            <div className="space-y-2 text-center">
              <Link href={getLocalizedUrl('/privacy')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Privacidad' : 'Privacy'}
              </Link>
              <Link href={getLocalizedUrl('/terms')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Términos' : 'Terms'}
              </Link>
              <Link href={getLocalizedUrl('/support')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Soporte' : 'Support'}
              </Link>
              <Link href={getLocalizedUrl('/contact')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Contacto' : 'Contact'}
              </Link>
              <Link href={getLocalizedUrl('/bug-report')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Reportar Errores' : 'Bug Reports'}
              </Link>
              <Link href={getLocalizedUrl('/changelog')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Registro de Cambios' : 'Changelog'}
              </Link>
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

          {/* Badges - Mobile */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Vote on</span>
              <a 
                href="https://peerpush.net/p/tickk"
                target="_blank"
                rel="noopener"
                className="inline-block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://peerpush.net/p/tickk/badge"
                  alt="tickk badge"
                  className="h-8 hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
            <a 
              href="https://www.producthunt.com/products/tickk-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-tickk&#0045;2" 
              target="_blank"
              rel="noopener"
              className="inline-block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1022667&theme=light&t=1759502669643" 
                alt="tickk - Speak, save & sort ideas into tasks & notes using voice | Product Hunt" 
                className="h-10 hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>

        {/* Desktop Full Layout */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="heading-secondary text-gray-900">tickk</span>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">FREE</span>
            </div>
                  <p className="text-responsive text-gray-600 mb-4">
                    {language === 'es' 
                      ? 'Una app que se calla y escucha. Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas, notas y recordatorios.'
                      : 'Voice-first brain dump → auto-organized into tasks & notes. Free, open-source, local storage.'
                    }
                  </p>
            <div className="flex space-x-4">
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
            
            {/* Badges */}
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">Vote on</span>
                <a 
                  href="https://peerpush.net/p/tickk"
                  target="_blank"
                  rel="noopener"
                  className="inline-block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://peerpush.net/p/tickk/badge"
                    alt="tickk badge"
                    className="h-15 hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
              <a 
                href="https://www.producthunt.com/products/tickk-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-tickk&#0045;2" 
                target="_blank"
                rel="noopener"
                className="inline-block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1022667&theme=light&t=1759502669643" 
                  alt="tickk - Speak, save & sort ideas into tasks & notes using voice | Product Hunt" 
                  className="h-15 hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {language === 'es' ? 'Producto' : 'Product'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={getLocalizedUrl('/')} className="text-gray-600 hover:text-orange-600 transition-colors">
                  {language === 'es' ? 'Panel de Voz' : 'Voice Dashboard'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/landing')} className="text-gray-600 hover:text-orange-600 transition-colors">
                  {language === 'es' ? 'Acerca de' : 'About'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/blog')} className="text-gray-600 hover:text-orange-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/reviews')} className="text-gray-600 hover:text-orange-600 transition-colors">
                  {language === 'es' ? 'Reseñas' : 'Reviews'}
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/digitalwareshub/tickk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  {language === 'es' ? 'Código Abierto' : 'Open Source'}
                </a>
              </li>
              <li>
                <div className="flex items-center space-x-1">
                  <span className="text-blue-600 cursor-not-allowed flex items-center text-sm">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    {language === 'es' ? 'Tickk Pro' : 'Tickk Pro'}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
                    {language === 'es' ? 'Próximamente' : 'Soon'}
                  </span>
                </div>
              </li>
            </ul>
          </div>


          {/* Legal & Support Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {language === 'es' ? 'Legal y Soporte' : 'Legal & Support'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={getLocalizedUrl('/privacy')} className="text-gray-600 hover:text-orange-600 transition-colors">
                  {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/terms')} className="text-gray-600 hover:text-orange-600 transition-colors">
                  {language === 'es' ? 'Términos de Servicio' : 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/support')} className="text-gray-600 hover:text-orange-600 transition-colors">
                  {language === 'es' ? 'Soporte y Ayuda' : 'Support & Help'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/contact')} className="text-gray-600 hover:text-orange-600 transition-colors">
                  {language === 'es' ? 'Contacto' : 'Contact'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/bug-report')} className="text-gray-600 hover:text-orange-600 transition-colors">
                  {language === 'es' ? 'Reportar Errores' : 'Bug Reports'}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedUrl('/changelog')} className="text-gray-600 hover:text-orange-600 transition-colors">
                  {language === 'es' ? 'Registro de Cambios' : 'Changelog'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 md:mt-12 pt-4 md:pt-8 border-t border-gray-200 ">
          {/* Mobile Bottom */}
          <div className="block md:hidden text-center">
            <div className="text-xs text-gray-600 mb-2">
              © {currentYear} tickk. {language === 'es' ? 'Hecho con ❤️ para la productividad diaria.' : 'Built with ❤️ for daily productivity.'}
            </div>
            {showHomeLink && (
              <button 
                onClick={() => router.push(getLocalizedUrl('/'))}
                className="text-xs text-orange-600 hover:text-orange-700 transition-colors flex items-center justify-center gap-1 mx-auto mb-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                {language === 'es' ? 'Volver al Inicio' : 'Back to Homepage'}
              </button>
            )}
            <div className="text-xs text-gray-500">
              Next.js • Web Speech API • compromise.js
            </div>
          </div>

          {/* Desktop Bottom */}
          <div className="hidden md:flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © {currentYear} tickk. {language === 'es' ? 'Hecho con ❤️ para entusiastas de la productividad diaria.' : 'Built with ❤️ for daily productivity enthusiasts.'}
            </div>
            
            {showHomeLink && (
              <button 
                onClick={() => router.push(getLocalizedUrl('/'))}
                className="text-sm text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                {language === 'es' ? 'Volver al Inicio' : 'Back to Homepage'}
              </button>
            )}

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>{language === 'es' ? 'Hecho con Next.js' : 'Made with Next.js'}</span>
              <span>•</span>
              <span>{language === 'es' ? 'Impulsado por Web Speech API' : 'Powered by Web Speech API'}</span>
              <span>•</span>
              <span>{language === 'es' ? 'PLN por compromise.js' : 'NLP by compromise.js'}</span>
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
