/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function BugReport() {
  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Reportar un Error | tickk - Reporte de Errores de App de Productividad por Voz</title>
        <meta name="description" content="Reporta errores y problemas técnicos con la app de productividad por voz tickk. Ayúdanos a mejorar compartiendo tu experiencia y problemas técnicos." />
        <meta name="keywords" content="reporte de errores, errores app de voz, problemas reconocimiento de voz, problemas técnicos, comentarios de app, reporte de errores" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/es/bug-report" />
        <link rel="alternate" hrefLang="en" href="https://tickk.app/bug-report" />
        <link rel="alternate" hrefLang="es" href="https://tickk.app/es/bug-report" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            Reportar un Error
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
            Ayúdanos a mejorar tickk reportando errores y problemas técnicos que encuentres.
          </p>
        </div>

        {/* Bug Categories */}
        <div className="mb-8">
          <h2 className="heading-secondary text-gray-900 mb-4">Categorías Comunes de Errores</h2>
          <div className="border-l-4 border-gray-200 pl-4">
            <p className="text-gray-600 mb-3">Rastreamos problemas en estas áreas principales:</p>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• <strong>Problemas de Voz:</strong> Problemas con micrófono o reconocimiento de voz</li>
              <li>• <strong>Problemas de Datos:</strong> Problemas con guardar o cargar contenido</li>
              <li>• <strong>Problemas de Visualización:</strong> Glitches visuales o problemas de diseño</li>
              <li>• <strong>Rendimiento:</strong> Carga lenta o funciones que no responden</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Quick Checks */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Antes de Reportar</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <h3 className="font-semibold text-gray-900 mb-3">Solución Rápida de Problemas</h3>
              <p className="text-gray-600 mb-3">
                Por favor intenta estos pasos primero - resuelven la mayoría de problemas comunes:
              </p>
              <ul className="text-gray-600 space-y-2 ml-4">
                <li>• <strong>Actualiza la página:</strong> Presiona Ctrl+F5 (o Cmd+R en Mac) para actualización forzada</li>
                <li>• <strong>Verifica permisos:</strong> Asegúrate de que el acceso al micrófono esté otorgado</li>
                <li>• <strong>Prueba otro navegador:</strong> Prueba en Chrome, Firefox o Safari</li>
                <li>• <strong>Limpiar caché:</strong> Limpia la caché y cookies del navegador</li>
                <li>• <strong>Verifica internet:</strong> Asegúrate de tener una conexión estable a internet</li>
              </ul>
            </div>
          </section>

          {/* Bug Report Template */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Información del Reporte de Error</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <h3 className="font-semibold text-gray-900 mb-3">Qué Incluir</h3>
              <p className="text-gray-600 mb-4">
                Mientras más detalles proporciones, más rápido podremos solucionar el problema. Por favor incluye:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">1. Descripción del Error</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• ¿Qué pasó? (resumen breve)</li>
                    <li>• ¿Qué esperabas que pasara?</li>
                    <li>• ¿Con qué frecuencia ocurre esto?</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">2. Pasos para Reproducir</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Paso 1: Lo que hiciste primero</li>
                    <li>• Paso 2: Lo que hiciste después</li>
                    <li>• Paso 3: Cuándo ocurrió el error</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">3. Información Técnica</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Navegador: Chrome, Firefox, Safari, Edge (con versión)</li>
                    <li>• Sistema Operativo: Windows, macOS, iOS, Android</li>
                    <li>• Dispositivo: Escritorio, tableta, móvil</li>
                    <li>• Tamaño o resolución de pantalla (si es relevante)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">4. Detalles Adicionales</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Capturas de pantalla o grabaciones de pantalla (si es posible)</li>
                    <li>• Mensajes de error (texto exacto)</li>
                    <li>• Errores de consola (para usuarios técnicos)</li>
                    <li>• Cualquier solución alternativa que hayas encontrado</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Response Times */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Tiempos de Respuesta</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <p className="text-gray-600 mb-4">
                Priorizamos errores según su gravedad y nos esforzamos por responder rápidamente:
              </p>
              <ul className="text-gray-600 space-y-1 ml-4">
                <li>• <strong>Problemas críticos:</strong> Dentro de 6 horas (app inutilizable, pérdida de datos)</li>
                <li>• <strong>Errores mayores:</strong> Dentro de 24 horas (funciones clave rotas)</li>
                <li>• <strong>Problemas menores:</strong> 2-3 días hábiles (glitches visuales, rendimiento)</li>
                <li>• <strong>Solicitudes de mejora:</strong> 1 semana (mejoras, documentación)</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Submit Bug Report */}
        <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="heading-secondary text-gray-900 mb-4">¿Listo para Reportar?</h3>
          <p className="text-gray-600 mb-6">
            Envíanos un reporte detallado de error y ayuda a hacer tickk mejor para todos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:write@digiwares.xyz?subject=Reporte de Error: [Descripción Breve]&body=Descripción del Error:%0A[Describe qué pasó]%0A%0APasos para Reproducir:%0A1. %0A2. %0A3. %0A%0AInformación Técnica:%0ANavegador: %0ASO: %0ADispositivo: %0A%0ADetalles Adicionales:%0A[Capturas de pantalla, mensajes de error, etc.]"
              className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            >
              Reportar Error por Email
            </a>
            <Link 
              href="/es/contact" 
              className="btn-responsive bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors"
            >
              Contacto General
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
