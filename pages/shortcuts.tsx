/**
 * Shortcuts Reference Page
 * Comprehensive list of all keyboard and voice shortcuts in tickk
 */

import Head from 'next/head'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'

interface ShortcutItem {
  key: string
  description: string
  category: string
}

export default function ShortcutsPage() {
  const { t, language } = useLanguage()

  const keyboardShortcuts: ShortcutItem[] = [
    // Recording shortcuts
    {
      key: 'Space',
      description: t('shortcuts.recording.start_stop'),
      category: language === 'es' ? 'Grabación' : 'Recording'
    },
    {
      key: 'Escape',
      description: t('shortcuts.recording.stop'),
      category: language === 'es' ? 'Grabación' : 'Recording'
    },
    
    // Organization shortcuts
    {
      key: 'Ctrl+Enter',
      description: t('shortcuts.organization.process'),
      category: language === 'es' ? 'Organización' : 'Organization'
    },
    
    // Navigation shortcuts
    {
      key: 'Shift+?',
      description: t('shortcuts.navigation.help'),
      category: language === 'es' ? 'Navegación' : 'Navigation'
    },
    {
      key: 'Escape',
      description: t('shortcuts.navigation.close_modal'),
      category: language === 'es' ? 'Navegación' : 'Navigation'
    },
    
    // Organized View shortcuts
    {
      key: 'Ctrl+F',
      description: t('shortcuts.organized.focus_search'),
      category: language === 'es' ? 'Vista Organizada' : 'Organized View'
    },
    {
      key: 'Escape',
      description: t('shortcuts.organized.clear_search'),
      category: language === 'es' ? 'Vista Organizada' : 'Organized View'
    },
    {
      key: 'Ctrl+E',
      description: t('shortcuts.organized.export_menu'),
      category: language === 'es' ? 'Vista Organizada' : 'Organized View'
    },
    
    // Data shortcuts
    {
      key: 'Ctrl+S',
      description: t('shortcuts.data.export'),
      category: language === 'es' ? 'Datos' : 'Data'
    }
  ]

  const voiceShortcuts = [
    {
      phrase: language === 'es' ? '"Empezar a grabar"' : '"Start recording"',
      description: language === 'es' ? 'Inicia la grabación de voz' : 'Starts voice recording',
      category: language === 'es' ? 'Control de Voz' : 'Voice Control'
    },
    {
      phrase: language === 'es' ? '"Parar grabación"' : '"Stop recording"',
      description: language === 'es' ? 'Detiene la grabación actual' : 'Stops current recording',
      category: language === 'es' ? 'Control de Voz' : 'Voice Control'
    },
    {
      phrase: language === 'es' ? '"Procesar pensamientos"' : '"Process thoughts"',
      description: language === 'es' ? 'Organiza automáticamente el contenido' : 'Automatically organizes content',
      category: language === 'es' ? 'Organización por Voz' : 'Voice Organization'
    },
    {
      phrase: language === 'es' ? '"Exportar datos"' : '"Export data"',
      description: language === 'es' ? 'Exporta el contenido organizado' : 'Exports organized content',
      category: language === 'es' ? 'Acciones por Voz' : 'Voice Actions'
    },
    {
      phrase: language === 'es' ? '"Mostrar ayuda"' : '"Show help"',
      description: language === 'es' ? 'Muestra la ayuda de atajos' : 'Shows shortcuts help',
      category: language === 'es' ? 'Navegación por Voz' : 'Voice Navigation'
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
        <title>{language === 'es' ? 'Atajos' : 'Shortcuts'} | tickk</title>
        <meta 
          name="description" 
          content={language === 'es' 
            ? 'Lista completa de atajos de teclado y voz disponibles en tickk para una productividad mejorada'
            : 'Complete list of keyboard and voice shortcuts available in tickk for enhanced productivity'
          } 
        />
      </Head>

      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          
          {/* Breadcrumbs */}
          <Breadcrumb />
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              {language === 'es' ? 'Atajos' : 'Shortcuts'}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Domina tickk con estos atajos de teclado y voz para una experiencia más rápida y eficiente.'
                : 'Master tickk with these keyboard and voice shortcuts for a faster, more efficient experience.'
              }
            </p>
          </div>

          {/* Keyboard Shortcuts Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
              {language === 'es' ? '⌨️ Atajos de Teclado' : '⌨️ Keyboard Shortcuts'}
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
              {language === 'es' ? '🎤 Comandos de Voz' : '🎤 Voice Commands'}
            </h2>
            <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
              {language === 'es' 
                ? 'Los comandos de voz están planificados para una próxima actualización'
                : 'Voice commands are planned for a future update'
              }
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
              {language === 'es' ? '💡 Consejos' : '💡 Tips'}
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-yellow-800 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>
                  {language === 'es' 
                    ? 'Los atajos funcionan globalmente excepto cuando estás escribiendo en campos de texto'
                    : 'Shortcuts work globally except when typing in text fields'
                  }
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>
                  {language === 'es' 
                    ? 'Usa Ctrl en Windows/Linux y Cmd en Mac para atajos de sistema'
                    : 'Use Ctrl on Windows/Linux and Cmd on Mac for system shortcuts'
                  }
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>
                  {language === 'es' 
                    ? 'Los comandos de voz están planificados para una próxima actualización'
                    : 'Voice commands are planned for a future update'
                  }
                </span>
              </li>
            </ul>
          </div>

          {/* Back to App */}
          <div className="text-center">
            <Link 
              href={language === 'es' ? '/es' : '/'}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
            >
              <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {language === 'es' ? 'Volver a la App' : 'Back to App'}
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}