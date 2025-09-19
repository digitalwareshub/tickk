import { ReactNode } from 'react'
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
}

export default function Layout({ 
  children, 
  showHomeLink = false, 
  title,
  className = "min-h-screen bg-gray-50 dark:bg-slate-800",
  seoTitle,
  seoDescription,
  seoImage
}: LayoutProps) {
  return (
    <>
      <SEOMeta 
        title={seoTitle || title}
        description={seoDescription}
        image={seoImage}
      />
      <div className={className}>
        {/* Header */}
        <Header />

        {/* Page Title for non-home pages */}
        {title && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          </div>
        )}

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <Footer showHomeLink={showHomeLink} />
      </div>
    </>
  )
}
