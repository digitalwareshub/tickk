/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Contact() {
  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Contáctanos | tickk - Ponte en Contacto con el Soporte de la App de Productividad por Voz</title>
        <meta name="description" content="Contacta al equipo de soporte de tickk. Obtén ayuda con la app de productividad por voz, reporta errores, sugiere funciones o haz preguntas sobre nuestra herramienta de reconocimiento de voz." />
        <meta name="keywords" content="contacto soporte, contacto app de voz, ayuda reconocimiento de voz, soporte app productividad, servicio al cliente, soporte técnico" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/es/contact" />
        <link rel="alternate" hrefLang="en" href="https://tickk.app/contact" />
        <link rel="alternate" hrefLang="es" href="https://tickk.app/es/contact" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            Contáctanos
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
            ¡Estamos aquí para ayudar! Ponte en contacto con preguntas, comentarios o solicitudes de soporte.
          </p>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ponte en Contacto</h3>
            <p className="text-gray-600 mb-4">
              Para preguntas, soporte o comentarios sobre tickk:
            </p>
            <a 
              href="mailto:write@digiwares.xyz" 
              className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              write@digiwares.xyz
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* FAQ Section */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-6">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-200 pl-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">¿Cómo funciona el reconocimiento de voz?</h3>
                <p className="text-gray-600">
                  tickk usa la API de Web Speech integrada en tu navegador para convertir voz a texto. Todo el procesamiento ocurre localmente en tu navegador - no se envían datos de audio a servidores externos.
                </p>
              </div>

              <div className="border-l-4 border-gray-200 pl-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">¿Están seguros mis datos?</h3>
                <p className="text-gray-600">
                  ¡Sí! Tus grabaciones de voz y contenido organizado se almacenan localmente en tu navegador. No recopilamos, almacenamos ni transmitimos ningún dato personal. Consulta nuestra <Link href="/es/privacy" className="text-orange-600 hover:text-orange-700">Política de Privacidad</Link> para más detalles.
                </p>
              </div>

              <div className="border-l-4 border-gray-200 pl-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">¿Qué navegadores son compatibles?</h3>
                <p className="text-gray-600">
                  tickk funciona mejor en navegadores modernos con soporte para la API de Web Speech: Chrome, Firefox, Safari y Edge. Chrome proporciona la experiencia más confiable.
                </p>
              </div>

              <div className="border-l-4 border-gray-200 pl-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">¿Puedo usar tickk sin conexión?</h3>
                <p className="text-gray-600">
                  El reconocimiento de voz requiere una conexión a internet, pero una vez que tu contenido está transcrito, puedes verlo y organizarlo sin conexión. Tus datos permanecen accesibles incluso sin internet.
                </p>
              </div>

              <div className="border-l-4 border-gray-200 pl-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">¿Qué tan preciso es el reconocimiento de voz?</h3>
                <p className="text-gray-600">
                  La precisión depende de factores como la claridad del habla, el ruido de fondo y la conexión a internet. Para mejores resultados, habla claramente en un ambiente silencioso.
                </p>
              </div>
            </div>
          </section>

          {/* Response Times */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Tiempos de Respuesta</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <p className="text-gray-600 mb-4">
                Nuestro objetivo es responder a todas las consultas dentro de 1-3 días hábiles. Los problemas críticos y las preocupaciones de seguridad reciben atención prioritaria.
              </p>
            </div>
          </section>

          {/* Before You Contact Us */}
          <section>
            <h2 className="heading-secondary text-gray-900 mb-4">Antes de Contactarnos</h2>
            <div className="border-l-4 border-gray-200 pl-4">
              <h3 className="font-semibold text-gray-900 mb-3">Ayúdanos a Ayudarte</h3>
              <p className="text-gray-600 mb-3">
                Para brindar el mejor soporte, por favor incluye:
              </p>
              <ul className="text-gray-600 space-y-1 ml-4">
                <li>• El nombre y versión de tu navegador</li>
                <li>• Sistema operativo (Windows, macOS, etc.)</li>
                <li>• Pasos para reproducir el problema</li>
                <li>• Capturas de pantalla o mensajes de error (si aplica)</li>
                <li>• Lo que estabas tratando de lograr</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Contact Form Alternative */}
        <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="heading-secondary text-gray-900 mb-4">¿Listo para Ponte en Contacto?</h3>
          <p className="text-gray-600 mb-6">
            Elige la mejor manera de contactarnos según tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:write@digiwares.xyz?subject=tickk Solicitud de Soporte"
              className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            >
              Email de Soporte
            </a>
            <Link 
              href="/es/support" 
              className="btn-responsive bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors"
            >
              Visitar Centro de Ayuda
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
