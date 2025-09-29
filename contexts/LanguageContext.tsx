import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'

export type Language = 'en' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isSpanish: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation keys
const translations = {
  en: {
    // Navigation
    'nav.braindump': 'Braindump',
    'nav.organized': 'Organized',
    'nav.braindump_description': 'Record your thoughts',
    'nav.organized_description': 'View tasks & notes',
    'nav.back_to_app': 'Back to App',
    'nav.language': 'Language',
    
    // Common
    'common.free': 'FREE',
    'common.start_recording': 'Start Recording',
    'common.stop_recording': 'Stop Recording',
    'common.recording': 'Recording...',
    'common.processing': 'Processing...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.search': 'Search',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.confirm': 'Confirm',
    'common.edit_item': 'Edit Item',
    'common.delete_item': 'Delete Item',
    'common.delete_confirm': 'Are you sure you want to delete this item?',
    'common.item_updated': 'Item updated successfully',
    'common.item_deleted': 'Item deleted successfully',
    
    // Landing page
    'landing.hero.title': 'Organized Productivity',
    'landing.hero.subtitle': 'Just speak your thoughts and watch your words become perfectly organized tasks, notes, and calendar events using pure browser technology. Complete privacy protection with zero data collection.',
    'landing.hero.cta': 'Start Recording',
    'landing.hero.trust.privacy': 'Complete Privacy',
    'landing.hero.trust.accuracy': '99% Accuracy',
    'landing.hero.trust.free': 'Free Forever',
    'landing.hero.trust.offline': 'Works Offline',
    'landing.hero.trust.no_ai': 'No AI Used',
    'landing.hero.trust.all_devices': 'All Devices',
    
    // MicroLanding
    'microlanding.headline': 'Speak. Save. Sort it later.',
    'microlanding.subheadline': 'Voice-first brain dump → auto-organized into tasks & notes. Free, open-source, local storage.',
    'microlanding.got_it': 'Got it',
    'microlanding.try_saying': 'Try saying',
    'microlanding.example1': 'Buy groceries tomorrow',
    'microlanding.example2': 'Great idea for the project',
    'microlanding.example3': 'Call dentist about appointment',
    'microlanding.example4': 'What if we tried a different approach',
    'microlanding.private': 'Private',
    'microlanding.works_offline': 'Works Offline',
    'microlanding.no_account': 'No Account Needed',
    
    // BraindumpInterface
    'braindump.clear_data': 'Reset',
    'braindump.session_info': 'Session: {count} items',
    'braindump.added_item': 'Added: "{text}"',
    'braindump.click_organize_below': 'Click "Organize" below to categorize',
    'braindump.record': 'Record',
    'braindump.stop': 'Stop',
    'braindump.recording': 'Recording...',
    'braindump.processing': 'Processing...',
    'braindump.click_to_record': 'Click to record',
    'braindump.spacebar_shortcut': 'Spacebar shortcut',
    'braindump.recording_help': 'Press spacebar to start or stop recording. Speak clearly after clicking record. Your speech will be transcribed and organized automatically.',
    'braindump.transcript': 'Transcript:',
    'braindump.speech_not_supported': 'Speech recognition not supported in this browser.',
    'braindump.recent': 'Recent ({count})',
    'braindump.click_organize_arrow': 'Click Organize →',
    'braindump.organize': 'Organize',
    'braindump.organize_with_count': 'Organize ({count})',
    'braindump.organize_help': 'This will categorize your thoughts into tasks and notes. You can review and adjust the categorization before applying.',
    'braindump.recent_thoughts': 'Recent thoughts',
    'braindump.edit_item': 'Edit item',
    'braindump.delete_item': 'Delete item',
    
    // ReturningUserInterface
    'returning.welcome_back': 'Welcome back to tickk',
    'returning.ready_to_continue': 'Ready to continue where you left off?',
    'returning.quick_actions': 'Quick Actions',
    'returning.record_new': 'Record New Item',
    'returning.review_items': 'Review Items',
    'returning.view_progress': 'View Progress',
    'returning.learn_more': 'Learn More',
    'returning.total_items': '{count} total items',
  },
  es: {
    // Navigation
    'nav.braindump': 'Lluvia de Ideas',
    'nav.organized': 'Organizado',
    'nav.braindump_description': 'Graba tus pensamientos',
    'nav.organized_description': 'Ver tareas y notas',
    'nav.back_to_app': 'Volver a la App',
    'nav.language': 'Idioma',
    
    // Common
    'common.free': 'GRATIS',
    'common.start_recording': 'Comenzar a Grabar',
    'common.stop_recording': 'Detener Grabación',
    'common.recording': 'Grabando...',
    'common.processing': 'Procesando...',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.search': 'Buscar',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.confirm': 'Confirmar',
    'common.edit_item': 'Editar Elemento',
    'common.delete_item': 'Eliminar Elemento',
    'common.delete_confirm': '¿Estás seguro de que quieres eliminar este elemento?',
    'common.item_updated': 'Elemento actualizado exitosamente',
    'common.item_deleted': 'Elemento eliminado exitosamente',
    
    // Landing page
    'landing.hero.title': 'Productividad Organizada',
    'landing.hero.subtitle': 'Simplemente habla tus pensamientos y observa cómo tus palabras se convierten en tareas, notas y eventos de calendario perfectamente organizados usando tecnología de navegador pura. Protección completa de privacidad con cero recopilación de datos.',
    'landing.hero.cta': 'Comenzar a Grabar',
    'landing.hero.trust.privacy': 'Privacidad Completa',
    'landing.hero.trust.accuracy': '99% Precisión',
    'landing.hero.trust.free': 'Gratis Para Siempre',
    'landing.hero.trust.offline': 'Funciona Sin Internet',
    'landing.hero.trust.no_ai': 'Sin IA',
    'landing.hero.trust.all_devices': 'Todos los Dispositivos',
    
    // MicroLanding
    'microlanding.headline': 'Habla. Guarda. Ordénalo después.',
    'microlanding.subheadline': 'Volcado mental por voz → auto-organizado en tareas y notas. Gratis, código abierto, almacenamiento local.',
    'microlanding.got_it': 'Entendido',
    'microlanding.try_saying': 'Prueba diciendo',
    'microlanding.example1': 'Comprar comestibles mañana',
    'microlanding.example2': 'Buena idea para el proyecto',
    'microlanding.example3': 'Llamar al dentista para cita',
    'microlanding.example4': 'Probar un enfoque diferente',
    'microlanding.private': 'Privado',
    'microlanding.works_offline': 'Funciona Sin Internet',
    'microlanding.no_account': 'Sin Cuenta Necesaria',
    
    // BraindumpInterface
    'braindump.clear_data': 'Reiniciar',
    'braindump.session_info': 'Sesión: {count} elementos',
    'braindump.added_item': 'Agregado: "{text}"',
    'braindump.click_organize_below': 'Haz clic en "Organizar" abajo para categorizar',
    'braindump.record': 'Grabar',
    'braindump.stop': 'Detener',
    'braindump.recording': 'Grabando...',
    'braindump.processing': 'Procesando...',
    'braindump.click_to_record': 'Haz clic para grabar',
    'braindump.spacebar_shortcut': 'Atajo de barra espaciadora',
    'braindump.recording_help': 'Presiona la barra espaciadora para comenzar o detener la grabación. Habla claramente después de hacer clic en grabar. Tu habla será transcrita y organizada automáticamente.',
    'braindump.transcript': 'Transcripción:',
    'braindump.speech_not_supported': 'Reconocimiento de voz no compatible con este navegador.',
    'braindump.recent': 'Recientes ({count})',
    'braindump.click_organize_arrow': 'Haz clic en Organizar →',
    'braindump.organize': 'Organizar',
    'braindump.organize_with_count': 'Organizar ({count})',
    'braindump.organize_help': 'Esto categorizará tus pensamientos en tareas y notas. Puedes revisar y ajustar la categorización antes de aplicar.',
    'braindump.recent_thoughts': 'Pensamientos recientes',
    'braindump.edit_item': 'Editar elemento',
    'braindump.delete_item': 'Eliminar elemento',
    
    // ReturningUserInterface
    'returning.welcome_back': 'Bienvenido de vuelta a tickk',
    'returning.ready_to_continue': '¿Listo para continuar donde lo dejaste?',
    'returning.quick_actions': 'Acciones Rápidas',
    'returning.record_new': 'Grabar Nuevo Elemento',
    'returning.review_items': 'Revisar Elementos',
    'returning.view_progress': 'Ver Progreso',
    'returning.learn_more': 'Aprender Más',
    'returning.total_items': '{count} elementos en total',
  }
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const router = useRouter()
  const [language, setLanguageState] = useState<Language>('en')

  // Detect language from URL path and localStorage
  useEffect(() => {
    const path = router.asPath
    
    // First priority: URL path
    if (path.startsWith('/es/') || path === '/es') {
      setLanguageState('es')
      localStorage.setItem('tickk_language', 'es')
    } else if (path === '/' || !path.startsWith('/es')) {
      setLanguageState('en')
      localStorage.setItem('tickk_language', 'en')
    }
  }, [router.asPath])

  // Auto-detect browser language on first visit (only if no saved preference)
  useEffect(() => {
    const savedLanguage = localStorage.getItem('tickk_language') as Language
    if (!savedLanguage) {
      // Auto-detect browser language only if no saved preference
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('es')) {
        setLanguageState('es')
        localStorage.setItem('tickk_language', 'es')
      } else {
        setLanguageState('en')
        localStorage.setItem('tickk_language', 'en')
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('tickk_language', lang)
    
    // Navigate to appropriate language path
    const currentPath = router.asPath
    if (lang === 'es') {
      if (!currentPath.startsWith('/es')) {
        router.push(`/es${currentPath}`)
      }
    } else {
      if (currentPath.startsWith('/es')) {
        router.push(currentPath.replace('/es', ''))
      }
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  const isSpanish = language === 'es'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isSpanish }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
