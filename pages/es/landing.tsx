import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { 
  useSectionTracking, 
  useCTATracking, 
  usePerformanceTracking,
  useUserSegmentation
} from '@/hooks/useAnalytics'
import { trackPageView, enhancedAnalytics } from '@/lib/analytics/enhanced-analytics'

export default function LandingES() {
  const [mounted, setMounted] = useState(false)
  const [demoText, setDemoText] = useState('')
  const [demoCategory, setDemoCategory] = useState<'tasks' | 'notes' | null>(null)

  // Analytics hooks
  const heroSectionRef = useSectionTracking('hero_es');
  const howItWorksSectionRef = useSectionTracking('how_it_works_es');
  const useCasesSectionRef = useSectionTracking('use_cases_es');
  const comparisonSectionRef = useSectionTracking('comparison_es');
  const demoSectionRef = useSectionTracking('interactive_demo_es');
  const blogSectionRef = useSectionTracking('blog_es');
  const faqSectionRef = useSectionTracking('faq_es');
  const finalCtaSectionRef = useSectionTracking('final_cta_es');

  // CTA tracking
  const { trackClick: trackHeroCTA } = useCTATracking('hero_cta_es', 'hero');
  const { trackClick: trackFinalCTA } = useCTATracking('final_cta_es', 'final_cta');

  // User segmentation
  const { identifySegment } = useUserSegmentation();

  // Performance tracking
  usePerformanceTracking('landing_page_es');
  const [isPlaying, setIsPlaying] = useState(false)

  const demoExamples = [
    { text: "Recordar comprar comestibles y recoger la tintorería", category: 'tasks' as const },
    { text: "Excelente idea para el nuevo diseño de producto usando interfaces de voz", category: 'notes' as const },
    { text: "Programar una cita con el dentista la próxima semana", category: 'tasks' as const },
    { text: "No olvidar enviar el reporte trimestral antes del viernes", category: 'tasks' as const },
    { text: "Perspectivas interesantes sobre patrones de comportamiento del usuario", category: 'notes' as const },
  ]

  useEffect(() => {
    setMounted(true)
    
    // Track page view with Spanish locale
    trackPageView('landing_page_es');

    // Identify user segment for Spanish users  
    identifySegment('spanish_users', 0.8, 'visited_spanish_landing');
    
    // Mark as visited for returning user detection
    localStorage.setItem('tickk_has_visited', 'true');
  }, [identifySegment])

    const handleDemoExample = (text: string, category: 'tasks' | 'notes') => {
    setDemoText(text)
    setDemoCategory(category)
    
    // Simulate processing
    setTimeout(() => {
      setIsPlaying(false)
    }, 2000)
  }

  const classifyText = (text: string): 'tasks' | 'notes' => {
    const originalText = text.trim()
    
    // Early return for empty text
    if (!originalText) return 'notes'
    
    // Task patterns in Spanish
    const taskPatterns = [
      /\b(?:necesito|tengo que|debo|recordar|no olvidar)\b/i,
      /\b(?:programar|agendar|cita|reunión)\b/i,
      /\b(?:comprar|hacer|enviar|llamar)\b/i,
    ]
    
    const hasTaskPattern = taskPatterns.some(pattern => pattern.test(originalText))
    if (hasTaskPattern) {
      return 'tasks'
    }
    
    // Default to notes for ideas, thoughts, etc.
    return 'notes'
  }

  const playDemo = async () => {
    if (isPlaying) return
    
    setIsPlaying(true)
    setDemoText('')
    setDemoCategory(null)
    
    // Pick a random example
    const example = demoExamples[Math.floor(Math.random() * demoExamples.length)]
    
    // Simulate typing the text
    for (let i = 0; i <= example.text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50))
      setDemoText(example.text.slice(0, i))
    }
    
    // Wait a moment, then show classification
    await new Promise(resolve => setTimeout(resolve, 500))
    const predictedCategory = classifyText(example.text)
    setDemoCategory(predictedCategory)
    
    // Reset after showing result
    setTimeout(() => {
      setIsPlaying(false)
    }, 3000)
  }

  const handleFinalCTA = () => {
    trackFinalCTA('Comenzar Gratis Ahora');
    enhancedAnalytics.trackEvent({
      action: 'final_cta_click',
      category: 'conversion',
      label: 'comenzar_gratis_ahora',
      custom_parameters: { 
        button_text: 'Comenzar Gratis Ahora', 
        context: 'final_cta',
        language: 'es'
      }
    });
  };

  if (!mounted) {
    return null
  }

  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Aplicación Gratuita de Productividad por Voz | tickk - Gestor de Tareas por Reconocimiento de Voz</title>
        <meta name="description" content="Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas y notas usando procesamiento avanzado de lenguaje natural. Sin registro requerido, funciona completamente offline, protección completa de privacidad. 99% de precisión en reconocimiento de voz." />
        <meta name="keywords" content="aplicación de productividad por voz, app de voz a texto, gestor de tareas por voz, notas de voz, organización por voz, productividad sin teclado, app gratuita de voz, reconocimiento de voz, procesamiento de lenguaje natural, PWA de voz, app offline de voz, privacidad de voz, sin registro, ADHD, neurodivergente, accesibilidad, estudiantes, profesionales, padres, creativos, español" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="tickk Team" />
        <meta name="language" content="es-ES" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Aplicación Gratuita de Productividad por Voz | tickk - Gestor de Tareas por Reconocimiento de Voz" />
        <meta property="og:description" content="Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas y notas usando procesamiento avanzado de lenguaje natural. Sin registro requerido, funciona completamente offline, protección completa de privacidad. 99% de precisión en reconocimiento de voz." />
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
        <meta name="twitter:site" content="@TheTickkApp" />
        <meta name="twitter:creator" content="@TheTickkApp" />
        <meta name="twitter:title" content="Aplicación Gratuita de Productividad por Voz | tickk - Gestor de Tareas por Reconocimiento de Voz" />
        <meta name="twitter:description" content="Aplicación revolucionaria gratuita de productividad por voz que transforma el habla en tareas organizadas y notas usando procesamiento avanzado de lenguaje natural. Sin registro requerido, funciona completamente offline, protección completa de privacidad. 99% de precisión en reconocimiento de voz." />
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
        <section ref={heroSectionRef} className="hero-section py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="mx-auto max-w-4xl text-center">
              {/* PWA Indicator */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  🔄 PWA • Funciona Offline • Sin IA • 100% Gratis
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="heading-primary text-gray-900 mb-6">
                Transforma Tu Voz En
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent block">
                  Productividad Organizada
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mx-auto max-w-2xl text-responsive text-gray-600 mb-8 text-center">
                Solo habla tus pensamientos y obsérvalos convertirse en tareas y notas organizadas. 
                Sin configuración compleja, sin suscripciones, sin recopilación de datos. <Link href="/es/privacy" className="text-orange-600 hover:text-orange-700 underline">Tu privacidad está protegida</Link> - todo permanece en tu dispositivo.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-sm font-medium text-gray-700">Privacidad Completa</div>
                  <div className="text-xs text-gray-500">Sin recopilación de datos</div>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm font-medium text-gray-700">99% de Precisión</div>
                  <div className="text-xs text-gray-500">Reconocimiento de voz avanzado</div>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">🆓</div>
                  <div className="text-sm font-medium text-gray-700">Gratis Para Siempre</div>
                  <div className="text-xs text-gray-500">Sin suscripción requerida</div>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-sm font-medium text-gray-700">Funciona Offline</div>
                  <div className="text-xs text-gray-500">Tecnología PWA</div>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">🧠</div>
                  <div className="text-sm font-medium text-gray-700">Sin IA Utilizada</div>
                  <div className="text-xs text-gray-500">Tecnología pura del navegador</div>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="text-2xl mb-2">🌐</div>
                  <div className="text-sm font-medium text-gray-700">Todos los Dispositivos</div>
                  <div className="text-xs text-gray-500">Cualquier navegador</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/es" 
                  className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
                  onClick={() => trackHeroCTA('🚀 Pruébalo Gratis Ahora')}
                >
                  🚀 Pruébalo Gratis Ahora
                </Link>
                <button 
                  onClick={() => {
                    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                    enhancedAnalytics.trackEvent({
                      action: 'demo_scroll_click',
                      category: 'engagement',
                      label: 'hero_demo_button',
                      custom_parameters: { button_text: '👀 Ver Demo', context: 'hero', language: 'es' }
                    });
                  }}
                  className="btn-responsive bg-gray-200 hover:bg-gray-300 text-gray-900 transition-colors"
                >
                  👀 Ver Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section ref={howItWorksSectionRef} className="how-it-works py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="heading-secondary text-gray-900 mb-4">
                Cómo Funciona tickk
              </h2>
              <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
                Tres pasos simples para transformar tu voz en productividad organizada
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
              {/* Step 1: Speak Naturally */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-900 rounded-lg text-xl font-bold">
                    1
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  Habla Naturalmente
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Haz clic en el micrófono y comienza a hablar. Di cualquier cosa - tareas, ideas, citas o notas.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start space-x-2">
                    <div className="text-base sm:text-lg">🎤</div>
                    <div className="text-xs sm:text-sm text-gray-700 italic flex-1">
                      &quot;Necesito llamar a Juan mañana a las 3pm sobre la reunión del proyecto&quot;
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Smart Processing */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-900 rounded-lg text-xl font-bold">
                    2
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  Procesamiento Inteligente
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  El procesamiento de lenguaje natural analiza tu habla y determina automáticamente si es una tarea o nota.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm text-gray-600">Procesando habla...</span>
                    <div className="text-base sm:text-lg">🧠</div>
                  </div>
                  <div className="p-2 bg-white rounded border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">� Tarea</span>
                      <span className="text-green-600 font-bold text-xs">✓ DETECTADO</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Referencias de tiempo: &quot;mañana&quot;, &quot;3pm&quot;
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Auto-Organized */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-900 rounded-lg text-xl font-bold">
                    3
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  Auto-Organizado
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Tu voz se organiza instantáneamente en la categoría correcta, listo para la acción.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Organizado Exitosamente</span>
                    <div className="text-base sm:text-lg">✨</div>
                  </div>
                  
                  <div className="p-2 bg-white rounded border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-green-600">✓</div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Añadido a Tareas</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">�</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Listo para gestionar y completar
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section ref={demoSectionRef} id="demo" className="relative py-20 bg-gray-50">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid-gray-100 opacity-30"></div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ve el Reconocimiento de Voz en Acción
              </h2>
              <p className="text-responsive text-gray-600 max-w-3xl mx-auto">
                Observa cómo el procesamiento de lenguaje natural categoriza instantáneamente tu habla en tareas y notas
              </p>
            </div>

            {/* Demo Interface */}
            <div className="max-w-4xl mx-auto px-4 sm:px-0">
              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
                {/* Demo Header */}
                <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Demo de Clasificación en Vivo</h3>
                    <button 
                      onClick={playDemo}
                      disabled={isPlaying}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-colors font-medium ${
                        isPlaying 
                          ? 'bg-gray-400 text-white cursor-not-allowed' 
                          : 'bg-gray-900 hover:bg-black text-white'
                      }`}
                    >
                      {isPlaying ? '⏳ Reproduciendo...' : '▶ Reproducir Demo'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {demoExamples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => handleDemoExample(example.text, example.category)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
                      >
                        {example.text.slice(0, 20)}...
                      </button>
                    ))}
                  </div>
                </div>

                {/* Demo Content */}
                <div className="p-4 sm:p-8">
                  <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                    {/* Input Side */}
                    <div className="order-2 lg:order-1">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Entrada de Voz</h4>
                      <div className="bg-white rounded-lg border border-gray-200 p-4 min-h-[100px] sm:min-h-[120px] flex items-center">
                        <div className="text-gray-900 font-mono text-sm sm:text-lg w-full">
                          {demoText ? (
                            <span>&quot;{demoText}&quot;</span>
                          ) : (
                            <span className="text-gray-400 italic text-sm">
                              Haz clic en un ejemplo arriba para ver la clasificación en acción...
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 text-xs sm:text-sm text-orange-600">
                        <span className="mr-2">🧠</span>
                        <span>
                          {demoText && !demoCategory 
                            ? 'Analizando palabras clave y patrones...' 
                            : 'NLP analiza gramática, verbos y referencias temporales'
                          }
                        </span>
                      </div>
                    </div>

                    {/* Output Side */}
                    <div className="order-1 lg:order-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Clasificación Inteligente</h4>
                      <div className="space-y-3">
                        <div className={`bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg transition-all duration-500 ${
                          demoCategory === 'tasks' ? 'opacity-100 ring-2 ring-blue-400' : 'opacity-50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-blue-500">📋</span>
                            <span className="font-medium text-blue-700">Tareas</span>
                            {demoCategory === 'tasks' && (
                              <span className="text-blue-600 text-xs ml-auto animate-pulse">✓ SELECCIONADO</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">Elementos de acción para completar</div>
                          {demoCategory === 'tasks' && (
                            <div className="text-xs text-blue-600 mt-1 font-medium">
                              Palabras de acción detectadas: &quot;necesito&quot;, &quot;recordar&quot;, &quot;no olvidar&quot;
                            </div>
                          )}
                        </div>
                        
                        <div className={`bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg transition-all duration-500 ${
                          demoCategory === 'notes' ? 'opacity-100 ring-2 ring-green-400' : 'opacity-50'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-green-500">📝</span>
                            <span className="font-medium text-green-700">Notas</span>
                            {demoCategory === 'notes' && (
                              <span className="text-green-600 text-xs ml-auto animate-pulse">✓ SELECCIONADO</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">Ideas e información</div>
                          {demoCategory === 'notes' && (
                            <div className="text-xs text-green-600 mt-1 font-medium">
                              Contenido informativo detectado
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section ref={useCasesSectionRef} className="use-cases py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="heading-secondary text-gray-900 mb-12">
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

        {/* Competitor Comparison Section */}
        <section ref={comparisonSectionRef} className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ¿Por qué tickk vs Las Demás Apps?
              </h2>
              <p className="text-responsive text-gray-600 max-w-3xl mx-auto">
                La mayoría de las apps de productividad están diseñadas para computadoras, no para cómo funciona realmente tu mente
              </p>
            </div>

            {/* Problem Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Notion</h3>
                <p className="text-gray-600 text-sm mb-4">Poderoso pero abrumador. Configurar páginas, bases de datos y plantillas toma más tiempo que el trabajo real.</p>
                <div className="text-xs text-gray-500">
                  ❌ Curva de aprendizaje empinada<br/>
                  ❌ Requiere configuración compleja<br/>
                  ❌ Solo texto, sin entrada por voz
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Obsidian</h3>
                <p className="text-gray-600 text-sm mb-4">Excelente para vincular notas, pero requiere disciplina para mantener la estructura. No hay entrada por voz ni categorización automática.</p>
                <div className="text-xs text-gray-500">
                  ❌ Mantenimiento manual de enlaces<br/>
                  ❌ Sin procesamiento de voz<br/>
                  ❌ Requiere organización manual
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🍎</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Apple Notes</h3>
                <p className="text-gray-600 text-sm mb-4">Simple pero limitado. Las notas por voz se guardan como audio sin procesar - no hay organización inteligente.</p>
                <div className="text-xs text-gray-500">
                  ❌ Solo grabación de audio<br/>
                  ❌ Sin categorización automática<br/>
                  ❌ Funciones limitadas de organización
                </div>
              </div>
            </div>

            {/* Solution Highlight */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-16">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Lo Que Cambia Todo: Primero la Voz
                </h3>
                <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                  Una app diseñada para cómo funciona realmente tu cerebro. Captura primero, organiza después.
                </p>
                
                {/* Feature Comparison Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎤</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Entrada Primero por Voz</h4>
                    <p className="text-sm text-gray-600">Habla natural, no requiere escribir</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Categorización Instantánea</h4>
                    <p className="text-sm text-gray-600">NLP sin IA ordena tareas de notas automáticamente</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Privacidad Completa</h4>
                    <p className="text-sm text-gray-600">Todo queda en tu navegador, nada se sube</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Configuración Cero</h4>
                    <p className="text-sm text-gray-600">Funciona al instante, sin cuentas ni configuración</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Comparison Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Comparación de Características</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Característica</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">tickk</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Notion</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Obsidian</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Apple Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Entrada por Voz</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600 text-lg">📱</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Categorización Automática</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 text-lg">✗</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Privacidad (Sin Subir)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600 text-lg">⚠️</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Configuración Cero</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Funciona Offline</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400 text-lg">✗</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Gratis Para Siempre</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600 text-lg">💰</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 text-lg font-semibold">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ¿Listo para Experimentar la Productividad Primero por Voz?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Deja de luchar con herramientas complejas. Comienza con la forma más simple y natural de capturar tus pensamientos.
              </p>
              <Link 
                href="/es"
                className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
                onClick={handleFinalCTA}
              >
                Prueba tickk Ahora - Es Gratis
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section ref={blogSectionRef} className="blog-section py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="heading-secondary text-gray-900 mb-12">
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
        <section ref={faqSectionRef} className="faq-section py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="heading-secondary text-gray-900 mb-12">
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
        <section ref={finalCtaSectionRef} className="final-cta py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="heading-secondary text-gray-900 mb-6">
              ¿Listo para Revolucionar tu Productividad?
            </h2>
            <p className="text-responsive text-gray-600 mb-8">
              Únete a miles de usuarios que ya están transformando sus pensamientos en acción organizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/es" 
                className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
                onClick={handleFinalCTA}
              >
                Comenzar Gratis Ahora
              </Link>
              <Link 
                href="/es/support" 
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:border-gray-400 hover:text-gray-800 transition-colors"
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
