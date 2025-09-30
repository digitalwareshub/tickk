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
            </div>
            <div className="space-y-2 text-center">
              <Link href={getLocalizedUrl('/terms')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                {language === 'es' ? 'Términos' : 'Terms'}
              </Link>
              <Link href={getLocalizedUrl('/blog')} className="block text-sm text-gray-600 hover:text-orange-600 transition-colors">
                Blog
              </Link>
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
            <a 
              href="https://twitter.com/tickkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Follow tickk on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>
            <a 
              href="https://github.com/digitalwareshub/tickk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600  transition-colors"
              aria-label="View tickk Voice App on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.374-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/tickkapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700  transition-colors"
              aria-label="Connect with tickk on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
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
              <a 
                href="https://twitter.com/tickkapp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500  transition-colors"
                aria-label="Follow tickk on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a 
                href="https://github.com/digitalwareshub/tickk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600  transition-colors"
                aria-label="View tickk Voice App on GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.374-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/tickkapp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700  transition-colors"
                aria-label="Connect with tickk on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
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

          {/* Use Cases Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {language === 'es' ? 'Casos de Uso' : 'Use Cases'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-gray-600">
                  {language === 'es' ? 'Notas de Reuniones' : 'Meeting Notes'}
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  {language === 'es' ? 'Gestión de Tareas' : 'Task Management'}
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  {language === 'es' ? 'Recordatorios por Voz' : 'Voice Reminders'}
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  {language === 'es' ? 'Lluvia de Ideas' : 'Brainstorming'}
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  {language === 'es' ? 'Planificación de Proyectos' : 'Project Planning'}
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  {language === 'es' ? 'Accesibilidad' : 'Accessibility'}
                </span>
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
