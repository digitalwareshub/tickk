/**
 * Shortcuts Reference Page - Spanish Version
 * Comprehensive list of all keyboard and voice shortcuts in tickk
 */

import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

interface ShortcutItem {
  key: string
  description: string
  category: string
}

export default function ShortcutsPage() {
  // Note: Not using useLanguage since this is the Spanish-specific page

  const keyboardShortcuts: ShortcutItem[] = [
    // Recording shortcuts
    {
      key: 'Espacio',
      description: 'Iniciar/Parar Grabación',
      category: 'Grabación'
    },
    {
      key: 'Escape',
      description: 'Parar Grabación',
      category: 'Grabación'
    },
    
    // Organization shortcuts
    {
      key: 'Ctrl+Enter',
      description: 'Organizar Pensamientos',
      category: 'Organización'
    },
    
    // Navigation shortcuts
    {
      key: 'Shift+?',
      description: 'Mostrar Ayuda de Atajos',
      category: 'Navegación'
    },
    {
      key: 'Escape',
      description: 'Cerrar Modal',
      category: 'Navegación'
    },
    
    // Organized View shortcuts
    {
      key: 'Ctrl+F',
      description: 'Enfocar Búsqueda',
      category: 'Vista Organizada'
    },
    {
      key: 'Escape',
      description: 'Limpiar Búsqueda',
      category: 'Vista Organizada'
    },
    {
      key: 'Ctrl+E',
      description: 'Menú de Exportación',
      category: 'Vista Organizada'
    },
    
    // Data shortcuts
    {
      key: 'Ctrl+S',
      description: 'Exportar Datos',
      category: 'Datos'
    }
  ]

  const voiceShortcuts = [
    {
      phrase: '"Empezar a grabar"',
      description: 'Inicia la grabación de voz',
      category: 'Control de Voz'
    },
    {
      phrase: '"Parar grabación"',
      description: 'Detiene la grabación actual',
      category: 'Control de Voz'
    },
    {
      phrase: '"Procesar pensamientos"',
      description: 'Organiza automáticamente el contenido',
      category: 'Organización por Voz'
    },
    {
      phrase: '"Exportar datos"',
      description: 'Exporta el contenido organizado',
      category: 'Acciones por Voz'
    },
    {
      phrase: '"Mostrar ayuda"',
      description: 'Muestra la ayuda de atajos',
      category: 'Navegación por Voz'
    }
  ]

  // Group shortcuts by category
  const groupedKeyboardShortcuts = keyboardShortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<string, ShortcutItem[]>)

  const groupedVoiceShortcuts = voiceShortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<string, typeof voiceShortcuts>)

  return (
    <>
      <Head>
        <title>Atajos | tickk</title>
        <meta 
          name="description" 
          content="Lista completa de atajos de teclado y voz disponibles en tickk para una productividad mejorada"
        />
      </Head>

      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          
          {/* Breadcrumbs */}
          <Breadcrumb />
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              Atajos
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Domina tickk con estos atajos de teclado y voz para una experiencia más rápida y eficiente.
            </p>
          </div>

          {/* Keyboard Shortcuts Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
              ⌨️ Atajos de Teclado
            </h2>

            <div className="grid gap-4 sm:gap-6">
              {Object.entries(groupedKeyboardShortcuts).map(([category, categoryShortcuts]) => (
                <div key={category} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                    {category}
                  </h3>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {categoryShortcuts.map((shortcut, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-gray-50 last:border-b-0 gap-2">
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                          {shortcut.description}
                        </span>
                        <kbd className="self-start sm:self-auto px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-mono bg-gray-100 text-gray-800 rounded border border-gray-300 shadow-sm">
                          {shortcut.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Commands Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
              🎤 Comandos de Voz
            </h2>
            <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
              Los comandos de voz están planificados para una próxima actualización
            </p>

            <div className="grid gap-4 sm:gap-6">
              {Object.entries(groupedVoiceShortcuts).map(([category, categoryShortcuts]) => (
                <div key={category} className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-4 border-b border-blue-200 pb-2">
                    {category}
                  </h3>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {categoryShortcuts.map((shortcut, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-blue-100 last:border-b-0 gap-2">
                        <span className="text-blue-800 font-medium text-sm sm:text-base">
                          {shortcut.description}
                        </span>
                        <kbd className="self-start sm:self-auto px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-mono bg-blue-100 text-blue-800 rounded border border-blue-300 shadow-sm">
                          {shortcut.phrase}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6 mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-yellow-900 mb-3">
              💡 Consejos
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-yellow-800 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>
                  Los atajos funcionan globalmente excepto cuando estás escribiendo en campos de texto
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>
                  Usa Ctrl en Windows/Linux y Cmd en Mac para atajos de sistema
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>
                  Los comandos de voz están planificados para una próxima actualización
                </span>
              </li>
            </ul>
          </div>

          {/* Back to App */}
          <div className="text-center">
            <Link 
              href="/es"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
            >
              <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver a la App
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}