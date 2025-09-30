import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Changelog() {
  return (
    <>
      <Head>
        <title>Registro de Cambios | tickk - Historial de Versiones y Actualizaciones</title>
        <meta name="description" content="Rastrea las actualizaciones de tickk, nuevas funciones y mejoras. Ve qué hay de nuevo en cada versión de nuestra app de productividad por voz." />
        <meta name="keywords" content="registro de cambios tickk, historial de versiones, actualizaciones, nuevas funciones, actualizaciones app de voz, registro de cambios app productividad" />
        <link rel="canonical" href="https://tickk.app/es/changelog" />
        <link rel="alternate" hrefLang="en" href="https://tickk.app/changelog" />
        <link rel="alternate" hrefLang="es" href="https://tickk.app/es/changelog" />
      </Head>

      <Layout className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="heading-primary text-gray-900 mb-4">
              Registro de Cambios
            </h1>
            <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
              Rastrea todas las actualizaciones, nuevas funciones y mejoras de tickk. Mantente informado sobre qué hay de nuevo en cada versión.
            </p>
          </div>

          {/* Current Version - Featured */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-8 mb-8">
            <div className="flex items-center gap-2 text-sm text-orange-600 mb-4">
              <span>🚀 Última Versión</span>
              <span>•</span>
              <span>Septiembre 2024</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">V1.9.1</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">✨ Nuevas Funciones</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Funcionalidad de editar y eliminar para tareas y notas</li>
                  <li>• Casillas de verificación para reemplazar círculos y mejor experiencia &quot;tickk&quot;</li>
                  <li>• Página de reseñas con sección de testimonios de usuarios</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔧 Mejoras</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Mejor consistencia visual en toda la aplicación</li>
                  <li>• Visibilidad y estilo mejorados de las casillas de verificación</li>
                  <li>• Navegación mejorada con nueva sección de Reseñas</li>
                  <li>• Información de compatibilidad del navegador actualizada</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🐛 Correcciones de Errores</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Corregidos varios problemas de visualización</li>
                  <li>• Mejorada la experiencia móvil</li>
                  <li>• Mayor estabilidad general</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Previous Versions */}
          <div className="space-y-8">
            {/* V1.9.0 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span>📅 Septiembre 2024</span>
                <span>•</span>
                <span>Lanzamiento Inicial</span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-4">V1.9.0</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎉 Funciones Principales</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Visualización completa de fecha y hora en vistas de lluvia de ideas y organizadas</li>
                    <li>• Soporte de idioma español con localización completa</li>
                    <li>• Integración de reconocimiento de voz usando Web Speech API</li>
                    <li>• Organización automática de tareas y notas usando PLN</li>
                    <li>• Funcionalidad de Aplicación Web Progresiva (PWA)</li>
                    <li>• Almacenamiento local con protección completa de privacidad</li>
                    <li>• Compatibilidad multiplataforma (Chrome, Edge, Safari)</li>
                    <li>• Atajos de teclado para mejor accesibilidad</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🔒 Privacidad y Seguridad</h3>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• Cero recopilación de datos - todo permanece en tu dispositivo</li>
                    <li>• No se requiere cuenta - comienza a usar inmediatamente</li>
                    <li>• Funcionalidad offline para transcripción de voz</li>
                    <li>• Código fuente abierto para transparencia</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Future Roadmap */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mt-8">
            <h2 className="heading-secondary text-gray-900 mb-6">Qué Viene</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">V1.10.0 - Octubre 2024</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Finalización del soporte de Mozilla Firefox</li>
                  <li>• Soporte de idiomas adicionales (Francés, Alemán)</li>
                  <li>• Precisión mejorada de reconocimiento de voz</li>
                  <li>• Experiencia móvil mejorada</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">V1.11.0 - Noviembre 2024</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Categorización avanzada de tareas</li>
                  <li>• Exportación a aplicaciones populares de productividad</li>
                  <li>• Atajos de comandos de voz</li>
                  <li>• Soporte de modo oscuro</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">V2.0.0 - Diciembre 2024</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Versión de aplicación móvil (iOS/Android)</li>
                  <li>• Funciones de colaboración en equipo</li>
                  <li>• Panel de análisis avanzado</li>
                  <li>• Integración con aplicaciones de calendario</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white border border-gray-200 rounded-lg p-8 mt-8">
            <h2 className="heading-secondary text-gray-900 mb-4">Mantente Actualizado</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              ¿Quieres ser notificado sobre nuevas versiones? Síguenos en redes sociales o revisa regularmente para actualizaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://x.com/TheTickkApp" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-responsive bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                Seguir en Twitter
              </a>
              <Link 
                href="/es" 
                className="btn-responsive bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors"
              >
                Probar tickk Ahora
              </Link>
            </div>
          </div>

        </div>
      </Layout>
    </>
  )
}
