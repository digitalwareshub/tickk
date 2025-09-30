/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Support() {
  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Soporte y Ayuda | tickk - Centro de Ayuda de App de Productividad por Voz</title>
        <meta name="description" content="Centro de Soporte de tickk: Obtén ayuda con reconocimiento de voz, organización de tareas, solución de problemas y preguntas frecuentes para nuestra app de productividad." />
        <meta name="keywords" content="soporte, centro de ayuda, ayuda app de voz, solución de problemas reconocimiento de voz, soporte app productividad, FAQ, guía de usuario" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/es/support" />
        <link rel="alternate" hrefLang="en" href="https://tickk.app/support" />
        <link rel="alternate" hrefLang="es" href="https://tickk.app/es/support" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            Centro de Soporte y Ayuda
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
            Obtén ayuda con tickk y aprovecha al máximo tu experiencia de productividad por voz.
          </p>
        </div>

        {/* Quick Help Overview */}
        <div className="mb-8">
          <div className="border-l-4 border-gray-200 pl-4">
            <p className="text-gray-600">
              Encuentra ayuda con grabación de voz, organización de tareas, solución de problemas y preguntas comunes sobre tickk.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Getting Started */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Primeros Pasos</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <h3 className="font-semibold text-gray-900 mb-3">¿Primera vez usando tickk?</h3>
              <p className="text-gray-600 mb-3">
                ¡Bienvenido! Aquí te explicamos cómo comenzar con la productividad por voz:
              </p>
              <ol className="text-gray-600 space-y-1 ml-4">
                <li>1. Permite el acceso al micrófono cuando se solicite</li>
                <li>2. Haz clic en el botón del micrófono para comenzar a grabar</li>
                <li>3. Habla naturalmente sobre tus tareas y pensamientos</li>
                <li>4. Revisa y organiza el contenido transcrito</li>
              </ol>
            </div>
          </section>

          {/* Common Issues */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Problemas Comunes</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">El Micrófono No Funciona</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <ul className="text-gray-600 space-y-1">
                    <li>• <strong>Verifica permisos:</strong> Asegúrate de que tu navegador tenga acceso al micrófono</li>
                    <li>• <strong>Intenta actualizar:</strong> Recarga la página y otorga permisos nuevamente</li>
                    <li>• <strong>Verifica hardware:</strong> Prueba tu micrófono en otras aplicaciones</li>
                    <li>• <strong>Soporte del navegador:</strong> Usa Chrome, Firefox o Safari para mejores resultados</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Problemas de Reconocimiento de Voz</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <ul className="text-gray-600 space-y-1">
                    <li>• <strong>Habla claramente:</strong> Usa un ritmo normal y pronunciación clara</li>
                    <li>• <strong>Reduce el ruido:</strong> Busca un ambiente silencioso para mejor precisión</li>
                    <li>• <strong>Verifica idioma:</strong> Asegúrate de que el idioma de tu navegador coincida con tu habla</li>
                    <li>• <strong>Conexión a internet:</strong> El reconocimiento de voz requiere una conexión activa</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Los Datos No Se Guardan</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <ul className="text-gray-600 space-y-1">
                    <li>• <strong>Almacenamiento del navegador:</strong> Asegúrate de que el almacenamiento local esté habilitado</li>
                    <li>• <strong>Navegación privada:</strong> Los datos pueden no persistir en modo incógnito</li>
                    <li>• <strong>Limpiar caché:</strong> Intenta limpiar la caché y cookies del navegador</li>
                    <li>• <strong>Espacio de almacenamiento:</strong> Verifica si tu dispositivo tiene suficiente almacenamiento</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Features Guide */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Guía de Funciones</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Grabación de Voz</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <p className="text-gray-600">
                    Haz clic en el botón del micrófono y habla naturalmente. La app transcribirá automáticamente tu habla y la organizará en elementos accionables.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Organización de Tareas</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <p className="text-gray-600">
                    Tu contenido hablado se categoriza automáticamente en tareas, eventos, notas e ideas. Puedes revisar y ajustar estas categorías según sea necesario.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Atajos de Teclado</h3>
                <div className="border-l-4 border-gray-200 pl-4">
                  <p className="text-gray-600 mb-2">
                    Usa estos atajos para navegación más rápida:
                  </p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Espacio</kbd> - Iniciar/detener grabación</li>
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Escape</kbd> - Cancelar grabación</li>
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">?</kbd> - Mostrar atajos de teclado</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Browser Compatibility */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Compatibilidad del Navegador</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Totalmente Compatible</h3>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Google Chrome (recomendado)</li>
                  <li>• Microsoft Edge</li>
                  <li>• Mozilla Firefox (<strong>En Desarrollo</strong>)</li>
                  <li>• Safari (macOS/iOS)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Soporte Limitado</h3>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Versiones antiguas de navegadores</li>
                  <li>• Algunos navegadores móviles</li>
                  <li>• Navegadores sin API de Web Speech</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="heading-secondary text-gray-900 mb-4">¿Aún Necesitas Ayuda?</h3>
          <p className="text-gray-600 mb-4">
            ¿No encuentras lo que buscas? Estamos aquí para ayudarte a aprovechar al máximo tickk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/es/contact" 
              className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            >
              Contactar Soporte
            </Link>
            <Link 
              href="/es/bug-report" 
              className="btn-responsive bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors"
            >
              Reportar un Error
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
