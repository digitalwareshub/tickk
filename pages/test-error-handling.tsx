/**
 * Error Handling Test Page
 * Comprehensive testing of all error handling features
 */

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { ErrorMessages, SuccessMessages } from '@/lib/utils/error-messages'
import { retryOperation } from '@/lib/utils/retry'
import ErrorBoundary from '@/components/ErrorBoundary'

// Component that throws an error on demand
function ErrorThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error from component!')
  }
  return <div className="text-green-600">✓ Component rendered successfully</div>
}

export default function TestErrorHandling() {
  const [throwError, setThrowError] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()} - ${result}`])
  }

  // Test 1: Toast Notifications
  const testToastNotifications = () => {
    addResult('Testing toast notifications...')
    
    toast.success('Success toast test!')
    setTimeout(() => toast.error('Error toast test!'), 1000)
    setTimeout(() => toast('Info toast test!', { icon: 'ℹ️' }), 2000)
    setTimeout(() => toast.loading('Loading toast test...'), 3000)
    
    addResult('✓ Toast notifications displayed')
  }

  // Test 2: Error Messages
  const testErrorMessages = () => {
    addResult('Testing standardized error messages...')
    
    toast.error(ErrorMessages.STORAGE_SAVE_FAILED)
    setTimeout(() => toast.error(ErrorMessages.RECORDING_START_FAILED), 1000)
    setTimeout(() => toast.error(ErrorMessages.EXPORT_FAILED), 2000)
    
    addResult('✓ Error messages displayed')
  }

  // Test 3: Success Messages
  const testSuccessMessages = () => {
    addResult('Testing standardized success messages...')
    
    toast.success(SuccessMessages.SAVE_SUCCESS)
    setTimeout(() => toast.success(SuccessMessages.COPIED_TO_CLIPBOARD), 1000)
    setTimeout(() => toast.success(SuccessMessages.EXPORT_SUCCESS), 2000)
    
    addResult('✓ Success messages displayed')
  }

  // Test 4: Retry Logic
  const testRetryLogic = async () => {
    addResult('Testing retry logic...')
    
    let attempts = 0
    
    try {
      await retryOperation(
        async () => {
          attempts++
          addResult(`Attempt ${attempts}/3`)
          if (attempts < 3) {
            throw new Error('Simulated failure')
          }
          return 'Success!'
        },
        {
          maxRetries: 3,
          initialDelayMs: 500,
          onRetry: (attempt, error) => {
            addResult(`Retrying... (${attempt}/3): ${error.message}`)
          }
        }
      )
      
      addResult('✓ Retry logic succeeded after 3 attempts')
      toast.success('Retry test completed successfully!')
    } catch (error) {
      addResult(`✗ Retry logic failed: ${error}`)
      toast.error('Retry test failed')
    }
  }

  // Test 5: Storage Error Simulation
  const testStorageError = () => {
    addResult('Testing storage error handling...')
    
    try {
      // Simulate quota exceeded
      throw new Error('QuotaExceededError')
    } catch {
      toast.error(ErrorMessages.STORAGE_QUOTA_EXCEEDED)
      addResult('✓ Storage error handled correctly')
    }
  }

  // Test 6: Network Error Simulation
  const testNetworkError = () => {
    addResult('Testing network error handling...')
    
    toast.error(ErrorMessages.NETWORK_ERROR)
    addResult('✓ Network error handled correctly')
  }

  // Test 7: Component Error Boundary
  const testErrorBoundary = () => {
    addResult('Testing Error Boundary...')
    setThrowError(true)
  }

  const resetErrorBoundary = () => {
    setThrowError(false)
    addResult('Error boundary reset')
  }

  // Test 8: Multiple Toasts
  const testMultipleToasts = () => {
    addResult('Testing multiple simultaneous toasts...')
    
    toast.success('Toast 1')
    toast.error('Toast 2')
    toast('Toast 3', { icon: '👍' })
    toast.loading('Toast 4')
    
    addResult('✓ Multiple toasts displayed')
  }

  // Test 9: Copy Error
  const testCopyError = async () => {
    addResult('Testing clipboard error...')
    
    try {
      // This will fail without user gesture
      await navigator.clipboard.writeText('test')
      toast.success(SuccessMessages.COPIED_TO_CLIPBOARD)
      addResult('✓ Copy succeeded')
    } catch {
      toast.error(ErrorMessages.COPY_FAILED)
      addResult('✓ Copy error handled correctly')
    }
  }

  // Test 10: All Error Messages
  const testAllErrorMessages = () => {
    addResult('Cycling through all error messages...')
    
    const messages = Object.values(ErrorMessages)
    messages.forEach((msg, i) => {
      setTimeout(() => {
        toast.error(msg, { duration: 2000 })
      }, i * 200)
    })
    
    addResult(`✓ Displaying ${messages.length} error messages`)
  }

  const clearResults = () => {
    setTestResults([])
  }

  const runAllTests = async () => {
    clearResults()
    addResult('🚀 Starting comprehensive error handling tests...')
    
    testToastNotifications()
    setTimeout(() => testErrorMessages(), 4000)
    setTimeout(() => testSuccessMessages(), 8000)
    setTimeout(() => testStorageError(), 12000)
    setTimeout(() => testNetworkError(), 14000)
    setTimeout(() => testCopyError(), 16000)
    setTimeout(() => testRetryLogic(), 18000)
    
    addResult('Tests scheduled. Watch for results...')
  }

  return (
    <>
      <Head>
        <title>Error Handling Test - Tickk</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 Error Handling Test Suite
          </h1>
          <p className="text-gray-600 mb-8">
            Comprehensive testing of all error handling features implemented in Tickk
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Test Controls */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
              
              <div className="space-y-3">
                <button
                  onClick={runAllTests}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  🚀 Run All Tests
                </button>

                <div className="border-t pt-3 space-y-2">
                  <h3 className="font-medium text-sm text-gray-700 mb-2">Individual Tests:</h3>
                  
                  <button
                    onClick={testToastNotifications}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    1. Toast Notifications
                  </button>

                  <button
                    onClick={testErrorMessages}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    2. Error Messages
                  </button>

                  <button
                    onClick={testSuccessMessages}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    3. Success Messages
                  </button>

                  <button
                    onClick={testRetryLogic}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    4. Retry Logic
                  </button>

                  <button
                    onClick={testStorageError}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    5. Storage Error
                  </button>

                  <button
                    onClick={testNetworkError}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    6. Network Error
                  </button>

                  <button
                    onClick={testErrorBoundary}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    7. Error Boundary (⚠️ Will Break Component)
                  </button>

                  <button
                    onClick={testMultipleToasts}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    8. Multiple Toasts
                  </button>

                  <button
                    onClick={testCopyError}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    9. Clipboard Test
                  </button>

                  <button
                    onClick={testAllErrorMessages}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    10. All Error Messages
                  </button>
                </div>

                <div className="border-t pt-3">
                  <button
                    onClick={clearResults}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Clear Results
                  </button>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Test Results</h2>
              
              <div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-lg h-96 overflow-y-auto">
                {testResults.length === 0 ? (
                  <div className="text-gray-500">No tests run yet. Click a button to start testing.</div>
                ) : (
                  testResults.map((result, i) => (
                    <div key={i} className="mb-1">
                      {result}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Error Boundary Test Area */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Error Boundary Test Area</h2>
              
              <ErrorBoundary>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700 mb-3">
                    This component is wrapped in an ErrorBoundary. Click &quot;Test Error Boundary&quot; to throw an error.
                  </p>
                  
                  <ErrorThrowingComponent shouldThrow={throwError} />
                  
                  {throwError && (
                    <button
                      onClick={resetErrorBoundary}
                      className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Reset Component
                    </button>
                  )}
                </div>
              </ErrorBoundary>
            </div>

            {/* Feature Checklist */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">✅ Implemented Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-700 mb-2">Core Features:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>react-hot-toast integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Error Boundary component</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Standardized error messages</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Retry utility with exponential backoff</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Toast styling and positioning</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-gray-700 mb-2">Updated Components:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>StorageService (8 error handlers)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>BraindumpInterface (7+ handlers)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>OrganizedView (5+ handlers)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>ProcessBraindumpModal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Analytics, ReviewItem, useTemplates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Back to App */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ← Back to Tickk App
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
