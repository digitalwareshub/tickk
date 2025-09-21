import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'

export default function SpanishLanding() {
  const [mounted, setMounted] = useState(false)
  const [demoText, setDemoText] = useState('')
  const [demoCategory, setDemoCategory] = useState<'tasks' | 'notes' | 'calendar' | null>(null)
  // const [isPlaying, setIsPlaying] = useState(false)

  const demoExamples = [
    { text: "Necesito llamar a Juan mañana a las 3pm sobre la reunión del proyecto", category: 'calendar' as const },
    { text: "Recordar comprar comestibles y recoger la tintorería", category: 'tasks' as const },
    { text: "Excelente idea para el nuevo diseño de producto usando interfaces de voz", category: 'notes' as const },
    { text: "Programar una cita con el dentista la próxima semana", category: 'calendar' as const },
    { text: "No olvidar enviar el reporte trimestral antes del viernes", category: 'tasks' as const },
  ]

  useEffect(() => {
    setMounted(true)
    
    // Mark as visited for returning user detection
    localStorage.setItem('tickk_has_visited', 'true');
  }, [])

  const handleDemoExample = (text: string, category: 'tasks' | 'notes' | 'calendar') => {
    setDemoText(text)
    setDemoCategory(category)
    // setIsPlaying(true)
    
    // Simulate processing
    setTimeout(() => {
      // setIsPlaying(false)
    }, 2000)
  }

  const handleHeroCTA = () => {
    // Analytics tracking removed for Spanish version
  };

  // const handleUseCaseCTA = () => {
  //   // Analytics tracking removed for Spanish version
  // };

  // const handleFaqCTA = () => {
  //   // Analytics tracking removed for Spanish version
  // };

  const handleFinalCTA = () => {
    // Analytics tracking removed for Spanish version
  };

  if (!mounted) {
    return null
  }

  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Aplicación Gratuita de Productividad por Voz | tickk - Gestor de Tareas por Reconocimiento de Voz</title>
        <meta name="description" content="Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas, notas y eventos de calendario usando procesamiento avanzado de lenguaje natural. Sin registro requerido, funciona completamente offline, protección completa de privacidad. 99% de precisión en reconocimiento de voz." />
        <meta name="keywords" content="aplicación de productividad por voz, app de voz a texto, gestor de tareas por voz, notas de voz, organización por voz, productividad sin teclado, app gratuita de voz, reconocimiento de voz, procesamiento de lenguaje natural, PWA de voz, app offline de voz, privacidad de voz, sin registro, ADHD, neurodivergente, accesibilidad, estudiantes, profesionales, padres, creativos, español" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="tickk Team" />
        <meta name="language" content="es-ES" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Aplicación Gratuita de Productividad por Voz | tickk - Gestor de Tareas por Reconocimiento de Voz" />
        <meta property="og:description" content="Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas, notas y eventos de calendario usando procesamiento avanzado de lenguaje natural. Sin registro requerido, funciona completamente offline, protección completa de privacidad. 99% de precisión en reconocimiento de voz." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tickk.app/es/landing" />
        <meta property="og:image" content="https://tickk.app/og-image.svg" />
        <meta property="og:image:alt" content="tickk - Aplicación de Voz a Productividad" />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="tickk" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tickkapp" />
        <meta name="twitter:creator" content="@tickkapp" />
        <meta name="twitter:title" content="Aplicación Gratuita de Productividad por Voz | tickk - Gestor de Tareas por Reconocimiento de Voz" />
        <meta name="twitter:description" content="Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas, notas y eventos de calendario usando procesamiento avanzado de lenguaje natural. Sin registro requerido, funciona completamente offline, protección completa de privacidad. 99% de precisión en reconocimiento de voz." />
        <meta name="twitter:image" content="https://tickk.app/og-image.svg" />
        <meta name="twitter:image:alt" content="tickk - Aplicación de Voz a Productividad" />
        
        {/* Canonical and hreflang */}
        <link rel="canonical" href="https://tickk.app/es/landing" />
        <link rel="alternate" hrefLang="en" href="https://tickk.app/landing" />
        <link rel="alternate" hrefLang="es" href="https://tickk.app/es/landing" />
        <link rel="alternate" hrefLang="x-default" href="https://tickk.app/landing" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="hero-section py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Finalmente, una app que se calla y escucha.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas, notas y eventos de calendario usando procesamiento avanzado de lenguaje natural.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/es" 
                className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-700 transition-colors"
                onClick={handleHeroCTA}
              >
                Comenzar Gratis
              </Link>
              <Link 
                href="/es#demo" 
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                Ver Demo
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Cómo Funciona
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎙️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Habla</h3>
                <p className="text-gray-600">Simplemente toca el micrófono y comienza a hablar. Nuestro reconocimiento de voz de 99% de precisión captura cada palabra.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Procesa</h3>
                <p className="text-gray-600">Nuestro algoritmo de IA analiza tu habla y categoriza automáticamente en tareas, notas y eventos de calendario.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Organiza</h3>
                <p className="text-gray-600">Revisa y ajusta la categorización, luego aplica para tener todo organizado y listo para usar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section id="demo" className="demo-section py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Prueba Nuestro Demo Interactivo
            </h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-4">Haz clic en cualquier ejemplo para ver cómo funciona:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {demoExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleDemoExample(example.text, example.category)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-orange-300 hover:bg-orange-50 transition-colors"
                    >
                      {example.text}
                    </button>
                  ))}
                </div>
              </div>
              
              {demoText && (
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Procesando...</span>
                  </div>
                  <p className="text-gray-900 mb-4">&ldquo;{demoText}&rdquo;</p>
                  {demoCategory && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Categorizado como:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        demoCategory === 'tasks' ? 'bg-blue-100 text-blue-700' :
                        demoCategory === 'notes' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {demoCategory === 'tasks' ? '📋 Tarea' :
                         demoCategory === 'notes' ? '📝 Nota' :
                         '📅 Evento de Calendario'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="use-cases py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Perfecto Para
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🧠 ADHD y Neurodivergentes</h3>
                <p className="text-gray-600">Captura pensamientos rápidos y organiza ideas sin la fricción de escribir. Perfecto para mentes que piensan rápido.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">💼 Profesionales Ocupados</h3>
                <p className="text-gray-600">Toma notas en reuniones, captura ideas mientras caminas, y mantén todo organizado sin interrumpir tu flujo de trabajo.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🎓 Estudiantes e Investigadores</h3>
                <p className="text-gray-600">Graba ideas durante conferencias, organiza pensamientos de investigación, y mantén notas estructuradas automáticamente.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">♿ Campeones de Accesibilidad</h3>
                <p className="text-gray-600">Interfaz completamente accesible con soporte para lectores de pantalla y navegación por teclado.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🎨 Profesionales Creativos</h3>
                <p className="text-gray-600">Captura inspiración instantánea, organiza ideas de proyectos, y mantén un flujo creativo sin interrupciones.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">👨‍👩‍👧‍👦 Padres Multitarea</h3>
                <p className="text-gray-600">Mantén listas de compras, recordatorios familiares, y organiza la vida familiar con comandos de voz simples.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="blog-section py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Blog de Productividad
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Braindump Primero, Organiza Después: La Filosofía de Productividad que Cambia Todo
              </h3>
              <p className="text-gray-600 mb-6">
                Descubre cómo el enfoque de &quot;capturar primero, organizar después&quot; puede revolucionar tu productividad y reducir la ansiedad mental.
              </p>
              <Link 
                href="/es/blog/braindump-first-organize-later-productivity"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
              >
                Leer Artículo Completo
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-500">Más artículos próximamente...</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Es tickk realmente gratis?</h3>
                <p className="text-gray-600">Sí, tickk es completamente gratis. No hay planes de pago, no hay límites de uso, y no hay trampas. Creemos que la productividad debería ser accesible para todos.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Cómo maneja tickk mis pensamientos rápidos e hiperfoco?</h3>
                <p className="text-gray-600">tickk está diseñado específicamente para mentes neurodivergentes. Puedes hablar tan rápido como pienses, y nuestra IA organizará todo automáticamente. No necesitas pausar para categorizar.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Cómo se compara tickk con Notion o TickTick?</h3>
                <p className="text-gray-600">A diferencia de Notion (complejo) o TickTick (enfocado en tareas), tickk es puramente de voz. No hay formularios, no hay campos, solo habla y organiza. Es la diferencia entre escribir y pensar.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Funciona tickk para tomar notas en conferencias?</h3>
                <p className="text-gray-600">¡Absolutamente! tickk es perfecto para estudiantes. Puedes susurrar notas durante conferencias, y la app las organizará automáticamente en tareas y notas estructuradas.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Es tickk accesible para usuarios con discapacidades de movilidad?</h3>
                <p className="text-gray-600">Sí, tickk está diseñado con accesibilidad en mente. Funciona completamente con comandos de voz y es compatible con lectores de pantalla. No necesitas usar las manos para nada.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Cómo ayuda tickk a profesionales y padres ocupados?</h3>
                <p className="text-gray-600">tickk te permite capturar pensamientos mientras conduces, cocinas, o cuidas niños. Simplemente habla y organiza más tarde. Es productividad sin fricción.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¿Listo para Revolucionar tu Productividad?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Únete a miles de usuarios que ya están transformando sus pensamientos en acción organizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/es" 
                className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-700 transition-colors"
                onClick={handleFinalCTA}
              >
                Comenzar Gratis Ahora
              </Link>
              <Link 
                href="/es/support" 
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                Obtener Ayuda
              </Link>
            </div>
            <div className="mt-8 text-sm text-gray-500">
              <p>✅ Sin registro requerido • ✅ Funciona offline • ✅ 100% privado • ✅ Código abierto</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
