/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Privacy() {
  return (
    <Layout className="min-h-screen bg-white">
      <Head>
        <title>Política de Privacidad | tickk - Protección Completa de Privacidad para App de Productividad por Voz</title>
        <meta name="description" content="Política de Privacidad de tickk: Aprende cómo protegemos tu privacidad con cero recopilación de datos. Todo el procesamiento de voz ocurre localmente en tu navegador. App de productividad por voz compatible con GDPR y CCPA." />
        <meta name="keywords" content="política de privacidad, privacidad de app de voz, privacidad de reconocimiento de voz, protección de datos, cumplimiento GDPR, cumplimiento CCPA, cero recopilación de datos, privacidad basada en navegador, seguridad de datos de voz" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/es/privacy" />
        <link rel="alternate" hrefLang="en" href="https://tickk.app/privacy" />
        <link rel="alternate" hrefLang="es" href="https://tickk.app/es/privacy" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto mb-2">
            Tu privacidad es nuestra prioridad. Aprende cómo protegemos tus datos.
          </p>
          <p className="text-sm text-gray-500">
            Última actualización: 15 de enero de 2024
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Privacy Summary */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cero Recopilación de Datos</h3>
              <p className="text-gray-600 text-sm">No recopilamos, almacenamos ni transmitimos tus datos personales</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💻</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Procesamiento Local</h3>
              <p className="text-gray-600 text-sm">Todo el reconocimiento de voz ocurre en tu navegador</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🚫</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin Cuentas</h3>
              <p className="text-gray-600 text-sm">Usa la app sin crear una cuenta</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">👁️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin Seguimiento</h3>
              <p className="text-gray-600 text-sm">No usamos análisis ni scripts de seguimiento</p>
            </div>
          </div>

          {/* Privacy Details */}
          <div className="space-y-6">
            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Recopilación de Datos</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  tickk está diseñado con la privacidad como principio fundamental. No recopilamos, almacenamos ni transmitimos ningún dato personal o grabación de voz.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• No se envían datos de voz a nuestros servidores</li>
                  <li>• No se recopila información personal</li>
                  <li>• No se requieren cuentas de usuario ni registro</li>
                  <li>• No hay cookies ni scripts de seguimiento</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Cómo Funciona</h2>
              <p className="text-gray-600 mb-4">
                Todo el reconocimiento de voz y procesamiento ocurre completamente dentro de tu navegador web usando la API de Web Speech. 
                Tus datos de voz nunca salen de tu dispositivo.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Almacenamiento Local</h2>
              <p className="text-gray-600 mb-4">
                La app almacena tus tareas y notas organizadas localmente en el almacenamiento de tu navegador. Estos datos permanecen 
                en tu dispositivo y nunca se transmiten a servidores externos.
              </p>
            </section>

            <section>
              <h2 className="heading-secondary text-gray-900 mb-4">Cumplimiento</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🇪🇺 Compatible con GDPR</h4>
                  <p className="text-gray-600 text-sm">
                    Sin procesamiento de datos personales significa cumplimiento total del GDPR por diseño.
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🇺🇸 Compatible con CCPA</h4>
                  <p className="text-gray-600 text-sm">
                    Cumple con los requisitos de la Ley de Privacidad del Consumidor de California al no recopilar información personal.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h3 className="heading-secondary text-gray-900 mb-4">¿Preguntas Sobre Privacidad?</h3>
            <p className="text-gray-600 mb-4">
              Si tienes alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, estamos aquí para ayudar.
            </p>
            <Link 
              href="/es/contact" 
              className="btn-responsive bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            >
              Contáctanos Sobre Privacidad
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
