/**
 * Breadcrumb Navigation Component
 * SEO-friendly breadcrumbs with JSON-LD structured data
 */

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLanguage } from '@/contexts/LanguageContext'
import Head from 'next/head'

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
  showStructuredData?: boolean
}

export default function Breadcrumb({ 
  items = [], 
  className = "mb-6", 
  showStructuredData = true 
}: BreadcrumbProps) {
  const router = useRouter()
  const { language } = useLanguage()
  
  // Auto-generate breadcrumbs if none provided
  const breadcrumbItems = items.length > 0 ? items : generateAutoBreadcrumbs(router.pathname, language)
  
  // Generate JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `https://tickk.app${item.href}` })
    }))
  }

  if (breadcrumbItems.length <= 1) {
    return null // Don't show breadcrumbs for homepage or single-level pages
  }

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      {showStructuredData && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        </Head>
      )}
      
      {/* Breadcrumb Navigation */}
      <nav className={className} aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              
              {item.href && !item.active ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-700 transition-colors"
                  aria-current={item.active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={item.active ? 'text-gray-900 font-medium' : 'text-gray-500'}
                  aria-current={item.active ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

// Auto-generate breadcrumbs based on current path
function generateAutoBreadcrumbs(pathname: string, language: string): BreadcrumbItem[] {
  const isSpanish = language === 'es'
  const homeLabel = isSpanish ? 'Inicio' : 'Home'
  const homeHref = isSpanish ? '/es' : '/'
  
  // Always start with Home
  const breadcrumbs: BreadcrumbItem[] = [
    { label: homeLabel, href: homeHref }
  ]
  
  // Handle Spanish routes
  if (pathname.startsWith('/es/')) {
    pathname = pathname.replace('/es', '')
  }
  
  // Route mappings
  const routeMap: Record<string, string> = {
    '/shortcuts': isSpanish ? 'Atajos' : 'Shortcuts',
    '/support': isSpanish ? 'Soporte' : 'Support',
    '/contact': isSpanish ? 'Contacto' : 'Contact',
    '/privacy': isSpanish ? 'Política de Privacidad' : 'Privacy Policy',
    '/terms': isSpanish ? 'Términos de Servicio' : 'Terms of Service',
    '/changelog': isSpanish ? 'Registro de Cambios' : 'Changelog',
    '/reviews': isSpanish ? 'Reseñas' : 'Reviews',
    '/landing': isSpanish ? 'Acerca de' : 'About',
    '/blog': 'Blog',
    '/bug-report': isSpanish ? 'Reportar Errores' : 'Bug Reports'
  }
  
  // Handle blog posts
  if (pathname.startsWith('/blog/')) {
    breadcrumbs.push({
      label: 'Blog',
      href: isSpanish ? '/es/blog' : '/blog'
    })
    
    // Extract article title from pathname
    const slug = pathname.replace('/blog/', '')
    const articleTitle = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      label: articleTitle,
      active: true
    })
  } else if (routeMap[pathname]) {
    // Handle other pages
    breadcrumbs.push({
      label: routeMap[pathname],
      active: true
    })
  }
  
  return breadcrumbs
}