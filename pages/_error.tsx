import { NextPageContext } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import { event } from '@/lib/analytics'
import { logError } from '@/lib/logger'

interface ErrorProps {
  statusCode?: number
  err?: Error
}

export default function Error({ statusCode, err }: ErrorProps) {
  const { language } = useLanguage()

  // Track error analytics
  useEffect(() => {
    if (typeof window !== 'undefined') {
      event({
        action: 'error_occurred',
        category: 'error',
        label: `status_${statusCode || 'unknown'}`,
        value: statusCode || 0
      })

      // Log error details for debugging
      logError('Error page rendered', {
        statusCode,
        error: err?.message,
        stack: err?.stack,
        timestamp: new Date().toISOString()
      }, 'error-page')
    }
  }, [statusCode, err])

  const getErrorMessage = () => {
    switch (statusCode) {
      case 404:
        return {
          title: language === 'es' ? 'Página no encontrada' : 'Page Not Found',
          description: language === 'es' 
            ? 'Lo sentimos, la página que buscas no existe.' 
            : 'Sorry, the page you are looking for does not exist.',
          suggestion: language === 'es'
            ? 'Verifica la URL o regresa a la página principal.'
            : 'Please check the URL or return to the home page.'
        }
      case 500:
        return {
          title: language === 'es' ? 'Error del servidor' : 'Server Error',
          description: language === 'es'
            ? 'Algo salió mal en nuestros servidores.'
            : 'Something went wrong on our servers.',
          suggestion: language === 'es'
            ? 'Por favor intenta de nuevo en unos momentos.'
            : 'Please try again in a few moments.'
        }
      default:
        return {
          title: language === 'es' ? 'Error inesperado' : 'Unexpected Error',
          description: language === 'es'
            ? 'Algo salió mal. Estamos trabajando para solucionarlo.'
            : 'Something went wrong. We are working to fix it.',
          suggestion: language === 'es'
            ? 'Por favor intenta de nuevo o contacta soporte si el problema persiste.'
            : 'Please try again or contact support if the problem persists.'
        }
    }
  }

  const errorInfo = getErrorMessage()

  const handleRetry = () => {
    event({
      action: 'error_retry',
      category: 'error',
      label: `status_${statusCode || 'unknown'}`
    })
    window.location.reload()
  }

  const handleReportBug = () => {
    event({
      action: 'error_report_bug',
      category: 'error',
      label: `status_${statusCode || 'unknown'}`
    })
    window.open('/bug-report', '_blank')
  }

  return (
    <>
      <Head>
        <title>{errorInfo.title} | tickk</title>
        <meta name="description" content={errorInfo.description} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://tickk.app/error" />
      </Head>

      <Layout className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Error Icon */}
          <div className="text-center mb-8">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg 
                className="w-12 h-12 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
            
            {/* Error Code */}
            {statusCode && (
              <div className="text-6xl font-bold text-gray-300 mb-4">
                {statusCode}
              </div>
            )}
            
            {/* Error Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {errorInfo.title}
            </h1>
            
            {/* Error Description */}
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              {errorInfo.description}
            </p>
            
            {/* Suggestion */}
            <p className="text-gray-500 mb-8">
              {errorInfo.suggestion}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {/* Retry Button */}
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              aria-label={language === 'es' ? 'Intentar de nuevo' : 'Try Again'}
            >
              {language === 'es' ? 'Intentar de nuevo' : 'Try Again'}
            </button>

            {/* Home Button */}
            <Link
              href={language === 'es' ? '/es' : '/'}
              className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              {language === 'es' ? 'Ir al inicio' : 'Go Home'}
            </Link>

            {/* Report Bug Button */}
            <button
              onClick={handleReportBug}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              {language === 'es' ? 'Reportar problema' : 'Report Bug'}
            </button>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {language === 'es' ? '¿Necesitas ayuda?' : 'Need Help?'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'es' 
                ? 'Si este error persiste, puedes:'
                : 'If this error persists, you can:'
              }
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>
                  {language === 'es' 
                    ? 'Contactar nuestro equipo de soporte'
                    : 'Contact our support team'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>
                  {language === 'es' 
                    ? 'Reportar el problema para que podamos solucionarlo'
                    : 'Report the issue so we can fix it'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>
                  {language === 'es' 
                    ? 'Verificar tu conexión a internet'
                    : 'Check your internet connection'
                  }
                </span>
              </li>
            </ul>
          </div>

          {/* Technical Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && err && (
            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4 max-w-4xl mx-auto">
              <h3 className="text-sm font-semibold text-red-800 mb-2">
                Technical Details (Development Only)
              </h3>
              <pre className="text-xs text-red-700 overflow-auto">
                {err.stack || err.message}
              </pre>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
