import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import SEOMeta from './SEOMeta'

interface LayoutProps {
  children: ReactNode
  showHomeLink?: boolean
  title?: string
  className?: string
  seoTitle?: string
  seoDescription?: string
  seoImage?: string
  mode?: 'braindump' | 'organized'
  onModeChange?: (mode: 'braindump' | 'organized') => void
}

export default function Layout({ 
  children, 
  showHomeLink, 
  title,
  className = "min-h-screen bg-white",
  seoTitle,
  seoDescription,
  seoImage,
  mode,
  onModeChange
}: LayoutProps) {
  const router = useRouter()
  
  // Auto-determine if we should show home link based on current page
  const isHomePage = router.pathname === '/'
  const shouldShowHomeLink = showHomeLink !== undefined ? showHomeLink : !isHomePage

  return (
    <>
      <SEOMeta 
        title={seoTitle || title}
        description={seoDescription}
        image={seoImage}
      />
      <div className={className}>
        {/* Header */}
        <Header mode={mode} onModeChange={onModeChange} />

        {/* Page Title for non-home pages */}
        {title && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
        )}

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <Footer showHomeLink={shouldShowHomeLink} />
      </div>
    </>
  )
}
