import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'

export default function SpanishReviews() {
  return (
    <>
      <Head>
        <title>Reseñas | tickk - Comentarios y Testimonios de Usuarios</title>
        <meta name="description" content="Lee reseñas y testimonios de usuarios de tickk. Ve cómo nuestra aplicación de productividad por voz está ayudando a las personas a capturar pensamientos, organizar tareas y aumentar la productividad." />
        <meta name="keywords" content="reseñas de tickk, testimonios de aplicación de voz, comentarios de aplicación de productividad, reseñas de usuarios, reseñas de reconocimiento de voz, testimonios de productividad por voz" />
        <link rel="canonical" href="https://tickk.app/es/reviews" />
      </Head>

      <Layout className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="heading-primary text-gray-900 mb-4">
              Reseñas y Testimonios de Usuarios
            </h1>
            <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
              Ve lo que nuestros usuarios están diciendo sobre tickk y cómo está transformando su flujo de trabajo de productividad.
            </p>
          </div>

          {/* Community Feedback Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 mb-8">
            <h2 className="heading-secondary text-gray-900 mb-6">Comentarios de la Comunidad</h2>
            
            <div className="space-y-6">
              {/* Reddit Section */}
              <div className="border-l-4 border-orange-400 pl-4">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-semibold text-gray-900">De Reddit r/InternetIsBeautiful</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    75 votos positivos
                  </span>
                </div>
                
                {/* Reddit Reviews Grid - Mobile First */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Review 1 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                    <a 
                      href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative">
                        <Image 
                          src="/reviews/reddit/review-1.webp" 
                          alt="Reseña de Reddit 1" 
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-gray-900">Ver en Reddit</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Review 2 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                    <a 
                      href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative">
                        <Image 
                          src="/reviews/reddit/review-2.webp" 
                          alt="Reseña de Reddit 2" 
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-gray-900">Ver en Reddit</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Review 3 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                    <a 
                      href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative">
                        <Image 
                          src="/reviews/reddit/review-3.webp" 
                          alt="Reseña de Reddit 3" 
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-gray-900">Ver en Reddit</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Review 4 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                    <a 
                      href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative">
                        <Image 
                          src="/reviews/reddit/review-4.webp" 
                          alt="Reseña de Reddit 4" 
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-gray-900">Ver en Reddit</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Review 5 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                    <a 
                      href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative">
                        <Image 
                          src="/reviews/reddit/review-5.webp" 
                          alt="Reseña de Reddit 5" 
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-gray-900">Ver en Reddit</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Reddit Link */}
                <div className="text-center">
                  <a 
                    href="https://www.reddit.com/r/InternetIsBeautiful/comments/1nsx1nc/a_voicefirst_todo_app_i_built_for_people_who/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Ver hilo completo en Reddit
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Community Stats Section */}
          <div className="mb-8">
            <h2 className="heading-secondary text-gray-900 mb-6">Impacto en la Comunidad</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">75</div>
                <div className="text-sm text-gray-600">Votos Positivos en Reddit</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">4+</div>
                <div className="text-sm text-gray-600">Reseñas Positivas</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-sm text-gray-600">Enfocado en Privacidad</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Gratis</div>
                <div className="text-sm text-gray-600">Para Siempre</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <h2 className="heading-secondary text-gray-900 mb-4">
              ¿Listo para Experimentar la Productividad por Voz?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete a nuestra creciente comunidad de usuarios que están transformando su productividad con tickk. 
              Sin registro, sin costos ocultos, solo una aplicación que realmente funciona.
            </p>
            <Link href="/es" className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold">
              Probar tickk Gratis
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </div>

          {/* Additional Stats */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Por Qué los Usuarios Eligen tickk</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">Creciente</div>
                <div className="text-sm text-gray-600">Base de Usuarios</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
                <div className="text-sm text-gray-600">Enfocado en Privacidad</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
                <div className="text-sm text-gray-600">Datos Recopilados</div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link href="/es" className="inline-flex items-center text-orange-600 hover:text-orange-700">
              ← Volver al Inicio
            </Link>
          </div>

        </div>
      </Layout>
    </>
  )
}
