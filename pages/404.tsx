import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Custom404() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <>
      <Head>
        <title>404 - Page Not Found | tickk</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist. Redirecting you back to tickk voice productivity app." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-lg mx-auto">
          {/* Large 404 Display */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎤</div>
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Looks like this page took a wrong turn. Don&apos;t worry, our voice productivity app is still here to help you stay organized!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              🏠 Go Home
            </Link>
            <Link 
              href="/app" 
              className="inline-flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              🚀 Try Voice App
            </Link>
          </div>

          {/* Auto-redirect Notice */}
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              ⏱️ Automatically redirecting to homepage in{' '}
              <span className="font-bold text-orange-600 dark:text-orange-400">{countdown}</span> seconds
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/" className="text-orange-600 dark:text-orange-400 hover:underline">
                Homepage
              </Link>
              <Link href="/app" className="text-orange-600 dark:text-orange-400 hover:underline">
                Voice App
              </Link>
              <Link href="/privacy" className="text-orange-600 dark:text-orange-400 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-orange-600 dark:text-orange-400 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
