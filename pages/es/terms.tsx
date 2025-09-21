/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Terms() {
  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Términos de Servicio | tickk - Términos y Condiciones de App de Productividad por Voz</title>
        <meta name="description" content="Términos de Servicio de tickk: Términos simples y justos para usar nuestra app de productividad por voz. Sin cláusulas ocultas, lenguaje claro, políticas amigables para el usuario." />
        <meta name="keywords" content="términos de servicio, términos app de voz, términos reconocimiento de voz, política de uso de app, acuerdo de usuario, términos app productividad" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/es/terms" />
        <link rel="alternate" hrefLang="en" href="https://tickk.app/terms" />
        <link rel="alternate" hrefLang="es" href="https://tickk.app/es/terms" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            Términos de Servicio
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto mb-2">
            Términos simples y justos para usar tickk.
          </p>
          <p className="text-sm text-gray-500">
            Última actualización: 15 de enero de 2024
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gratuito</h3>
              <p className="text-gray-600 text-sm">Sin tarifas de suscripción ni costos ocultos</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tus Datos</h3>
              <p className="text-gray-600 text-sm">Eres dueño y controlas todo tu contenido</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Basado en Navegador</h3>
              <p className="text-gray-600 text-sm">Funciona completamente en tu navegador web</p>
            </div>
          </div>

          {/* Terms Details */}
          <div className="space-y-6">
            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Aceptación de Términos</h2>
              <p className="text-gray-600 mb-4">
                Al acceder y usar tickk, aceptas y te comprometes a cumplir con los términos y disposiciones de este acuerdo.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Uso del Servicio</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  tickk es una herramienta de productividad por voz diseñada para ayudarte a organizar tus pensamientos y tareas. Puedes usar el servicio para:
                </p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li>• Productividad personal y gestión de tareas</li>
                  <li>• Toma de notas por voz y organización</li>
                  <li>• Convertir voz a texto organizado</li>
                  <li>• Cualquier propósito personal o comercial lícito</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Tu Contenido</h2>
              <p className="text-gray-600 mb-4">
                Mantienes la propiedad completa de cualquier contenido que crees usando tickk. Tus grabaciones de voz y texto organizado siguen siendo tu propiedad y se almacenan localmente en tu dispositivo.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Disponibilidad del Servicio</h2>
              <p className="text-gray-600 mb-4">
                Nos esforzamos por mantener alta disponibilidad, pero no podemos garantizar un servicio ininterrumpido. El servicio se proporciona "tal como está" sin garantías de ningún tipo.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Usos Prohibidos</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">No puedes usar tickk para:</p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li>• Cualquier propósito ilegal o no autorizado</li>
                  <li>• Violar cualquier ley en tu jurisdicción</li>
                  <li>• Transmitir código o contenido malicioso</li>
                  <li>• Intentar obtener acceso no autorizado a nuestros sistemas</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Limitación de Responsabilidad</h2>
              <p className="text-gray-600 mb-4">
                tickk no será responsable de ningún daño indirecto, incidental, especial, consecuencial o punitivo resultante de tu uso del servicio.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Cambios en los Términos</h2>
              <p className="text-gray-600 mb-4">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en esta página.
              </p>
            </section>
          </div>

          {/* Contact Section */}
          <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h3 className="heading-secondary text-gray-900 mb-4">¿Preguntas Sobre Estos Términos?</h3>
            <p className="text-gray-600 mb-4">
              Si tienes alguna pregunta sobre estos términos de servicio, no dudes en contactarnos.
            </p>
            <Link 
              href="/es/contact" 
              className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            >
              Contáctanos Sobre los Términos
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
