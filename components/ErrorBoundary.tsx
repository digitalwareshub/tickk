/**
 * ErrorBoundary Component
 * Catches React component errors and displays a fallback UI
 * Prevents entire app from crashing when a component throws an error
 */

'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // Track error in analytics if available
    if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
      const w = window as Window & { gtag: (...args: unknown[]) => void }
      w.gtag('event', 'exception', {
        description: error.message,
        fatal: false
      })
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We&apos;re sorry, but something unexpected happened. Your data is safe. Please try refreshing the page.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>

            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer font-medium text-sm text-gray-700 hover:text-gray-900">
                  Error Details (Development Only)
                </summary>
                <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
                  <p className="text-xs font-mono text-red-800 mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </p>
                  {this.state.error.stack && (
                    <pre className="text-xs overflow-auto text-red-700 whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                  )}
                  {this.state.errorInfo && (
                    <pre className="text-xs overflow-auto text-red-700 whitespace-pre-wrap mt-2">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className="mt-6 text-sm text-gray-500">
              <p>If this problem persists, please contact support.</p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
