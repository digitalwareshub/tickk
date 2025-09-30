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
            <div className="flex items-center justify-center space-x-2 mb-3">
              <span className="heading-secondary text-gray-900">tickk</span>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">FREE</span>
            </div>
            <p className="text-responsive text-gray-600 mb-4 px-4">
              {language === 'es' ? 'Háblalo. Guárdalo. Ordénalo después.' : 'Speak it. Save it. Sort it later.'}
            </p>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2 text-center">
              <Link href={getLocalizedUrl('/landing')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium">
                {language === 'es' ? 'Acerca de' : 'About'}
              </Link>
              <Link href={getLocalizedUrl('/contact')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Contacto' : 'Contact'}
              </Link>
              <Link href={getLocalizedUrl('/support')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Soporte' : 'Support'}
              </Link>
              <Link href={getLocalizedUrl('/privacy')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Privacidad' : 'Privacy'}
              </Link>
              <Link href={getLocalizedUrl('/changelog')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                Changelog
              </Link>
            </div>
            <div className="space-y-2 text-center">
              <Link href={getLocalizedUrl('/terms')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Términos' : 'Terms'}
              </Link>
              <Link href={getLocalizedUrl('/blog')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                Blog
              </Link>
              <span className="block text-sm text-gray-400 cursor-not-allowed">
                Reviews
              </span>
              <Link href={getLocalizedUrl('/bug-report')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Reportar Error' : 'Bug Report'}
              </Link>
              <a 
                href="https://github.com/digitalwareshub/tickk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-4">
            {/* Temporarily commented out to test Twitter flash issue
            <a 
              href="https://x.com/TheTickkApp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors text-sm font-medium"
              aria-label="Follow tickk on Twitter"
            >
              X
            </a>
            */}
            <a 
              href="https://github.com/digitalwareshub/tickk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
              aria-label="View tickk Voice App on GitHub"
            >
              GitHub
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
                      : 'Speak it. Save it. Sort it later. Voice-first brain dump → auto-organized into tasks & notes. Free, open-source, local storage.'
                    }
                  </p>
            <div className="flex space-x-4">
              {/* Temporarily commented out to test Twitter flash issue
              <a 
                href="https://x.com/TheTickkApp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors text-sm font-medium"
                aria-label="Follow tickk on Twitter"
              >
                X
              </a>
              */}
              <a 
                href="https://github.com/digitalwareshub/tickk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
                aria-label="View tickk Voice App on GitHub"
              >
                GitHub
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
                <span className="text-gray-400 cursor-not-allowed">
                  Reviews
                </span>
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
                  Changelog
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
              © {currentYear} tickk. {language === 'es' ? 'Hecho con ❤️ para la productividad.' : 'Built with ❤️ for productivity.'}
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
              © {currentYear} tickk. {language === 'es' ? 'Hecho con ❤️ para entusiastas de la productividad.' : 'Built with ❤️ for productivity enthusiasts.'}
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
