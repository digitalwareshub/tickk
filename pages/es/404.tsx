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
          router.push('/es')
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
        <title>404 - Página No Encontrada | tickk</title>
        <meta name="description" content="Lo sentimos, la página que buscas no existe. Redirigiendo de vuelta a la app de productividad por voz tickk." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-lg mx-auto">
          {/* Large 404 Display */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-bold text-gray-200 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎤</div>
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Ups! Página No Encontrada
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Parece que esta página tomó un camino equivocado. ¡No te preocupes, nuestra app de productividad por voz sigue aquí para ayudarte a mantenerte organizado!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link 
              href="/es" 
              className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              🏠 Ir al Inicio
            </Link>
            <Link 
              href="/es" 
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
            >
              🚀 Probar App de Voz
            </Link>
          </div>

          {/* Auto-redirect Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-700">
              ⏱️ Redirigiendo automáticamente a la página de inicio en{' '}
              <span className="font-bold text-orange-600">{countdown}</span> segundos
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Enlaces Rápidos:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/es" className="text-orange-600 hover:underline">
                Página de Inicio
              </Link>
              <Link href="/es" className="text-orange-600 hover:underline">
                App de Voz
              </Link>
              <Link href="/es/privacy" className="text-orange-600 hover:underline">
                Política de Privacidad
              </Link>
              <Link href="/es/terms" className="text-orange-600 hover:underline">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
