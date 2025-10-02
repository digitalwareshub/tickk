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
    'common.delete_warning': 'This action cannot be undone.',
    'common.item_to_delete': 'Item to delete',
    'common.delete_irreversible': 'This action is permanent and cannot be undone.',
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
    'braindump.clear_data': 'Clear All Data',
    'braindump.clear_data_confirm': 'Are you sure you want to clear all data? This will permanently delete all your braindumps, tasks, and notes. This action cannot be undone.',
    'braindump.clear_data_tooltip': 'Permanently delete all your data and start fresh',
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

    // Contact page
    'contact.title': 'Contact Us',
    'contact.subtitle': "We're here to help! Reach out with questions, feedback, or support requests.",
    'contact.get_in_touch': 'Get in Touch',
    'contact.email_description': 'For questions, support, or feedback about tickk:',
    'contact.faq_title': 'Frequently Asked Questions',
    'contact.faq_voice_title': 'How does voice recognition work?',
    'contact.faq_voice_answer': "tickk uses your browser's built-in Web Speech API to convert speech to text. All processing happens locally in your browser - no audio data is sent to external servers.",
    'contact.faq_security_title': 'Is my data secure?',
    'contact.faq_security_answer': "Yes! Your voice recordings and organized content are stored locally in your browser. We don't collect, store, or transmit any personal data. See our Privacy Policy for details.",
    'contact.faq_browsers_title': 'Which browsers are supported?',
    'contact.faq_browsers_answer': 'tickk works best in modern browsers with Web Speech API support: Chrome, Firefox, Safari, and Edge. Chrome provides the most reliable experience.',
    'contact.faq_offline_title': 'Can I use tickk offline?',
    'contact.faq_offline_answer': 'Voice recognition requires an internet connection, but once your content is transcribed, you can view and organize it offline. Your data remains accessible even without internet.',
    'contact.faq_accuracy_title': 'How accurate is the speech recognition?',
    'contact.faq_accuracy_answer': 'Accuracy depends on factors like speech clarity, background noise, and internet connection. For best results, speak clearly in a quiet environment.',
    'contact.response_times_title': 'Response Times',
    'contact.response_times_description': 'We aim to respond to all inquiries within 1-3 business days. Critical issues and security concerns receive priority attention.',
    'contact.before_contact_title': 'Before You Contact Us',
    'contact.help_us_title': 'Help Us Help You',
    'contact.help_us_description': 'To provide the best support, please include:',
    'contact.help_us_browser': 'Your browser name and version',
    'contact.help_us_os': 'Operating system (Windows, macOS, etc.)',
    'contact.help_us_steps': 'Steps to reproduce the issue',
    'contact.help_us_screenshots': 'Screenshots or error messages (if applicable)',
    'contact.help_us_goal': 'What you were trying to accomplish',
    'contact.ready_title': 'Ready to Get in Touch?',
    'contact.ready_description': 'Choose the best way to reach us based on your needs.',
    'contact.email_support': 'Email Support',
    'contact.visit_help': 'Visit Help Center',

    // Bug report page
    'bug.title': 'Report a Bug',
    'bug.subtitle': 'Help us improve tickk by reporting bugs and technical issues you encounter.',
    'bug.categories_title': 'Common Bug Categories',
    'bug.categories_description': 'We track issues in these main areas:',
    'bug.voice_issues': 'Voice Issues: Microphone or speech recognition problems',
    'bug.data_issues': 'Data Issues: Problems with saving or loading content',
    'bug.display_issues': 'Display Issues: Visual glitches or layout problems',
    'bug.performance_issues': 'Performance: Slow loading or unresponsive features',
    'bug.before_reporting_title': 'Before Reporting',
    'bug.troubleshooting_title': 'Quick Troubleshooting',
    'bug.troubleshooting_description': 'Please try these steps first - they resolve most common issues:',
    'bug.refresh_page': 'Refresh the page: Press Ctrl+F5 (or Cmd+R on Mac) to hard refresh',
    'bug.check_permissions': 'Check permissions: Ensure microphone access is granted',
    'bug.try_browser': 'Try another browser: Test in Chrome, Firefox, or Safari',
    'bug.clear_cache': 'Clear cache: Clear browser cache and cookies',
    'bug.check_internet': 'Check internet: Ensure stable internet connection',
    'bug.report_info_title': 'Bug Report Information',
    'bug.what_to_include_title': 'What to Include',
    'bug.what_to_include_description': 'The more details you provide, the faster we can fix the issue. Please include:',
    'bug.description_title': '1. Bug Description',
    'bug.description_what': 'What happened? (brief summary)',
    'bug.description_expected': 'What did you expect to happen?',
    'bug.description_frequency': 'How often does this occur?',
    'bug.steps_title': '2. Steps to Reproduce',
    'bug.steps_1': 'Step 1: What you did first',
    'bug.steps_2': 'Step 2: What you did next',
    'bug.steps_3': 'Step 3: When the bug occurred',
    'bug.technical_title': '3. Technical Information',
    'bug.technical_browser': 'Browser: Chrome, Firefox, Safari, Edge (with version)',
    'bug.technical_os': 'Operating System: Windows, macOS, iOS, Android',
    'bug.technical_device': 'Device: Desktop, tablet, mobile',
    'bug.technical_screen': 'Screen size or resolution (if relevant)',
    'bug.additional_title': '4. Additional Details',
    'bug.additional_screenshots': 'Screenshots or screen recordings (if possible)',
    'bug.additional_errors': 'Error messages (exact text)',
    'bug.additional_console': 'Console errors (for technical users)',
    'bug.additional_workarounds': 'Any workarounds you found',
    'bug.response_times_title': 'Response Times',
    'bug.response_times_description': 'We prioritize bugs based on severity and aim to respond quickly:',
    'bug.critical_issues': 'Critical issues: Within 6 hours (app unusable, data loss)',
    'bug.major_bugs': 'Major bugs: Within 24 hours (key features broken)',
    'bug.minor_issues': 'Minor issues: 2-3 business days (visual glitches, performance)',
    'bug.enhancement_requests': 'Enhancement requests: 1 week (improvements, documentation)',
    'bug.ready_title': 'Ready to Report?',
    'bug.ready_description': 'Send us a detailed bug report and help make tickk better for everyone.',
    'bug.report_email': 'Report Bug via Email',
    'bug.general_contact': 'General Contact',
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
    'common.delete_warning': 'Esta acción no se puede deshacer.',
    'common.item_to_delete': 'Elemento a eliminar',
    'common.delete_irreversible': 'Esta acción es permanente y no se puede deshacer.',
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
    'braindump.clear_data': 'Borrar Todos los Datos',
    'braindump.clear_data_confirm': '¿Estás seguro de que quieres borrar todos los datos? Esto eliminará permanentemente todos tus pensamientos, tareas y notas. Esta acción no se puede deshacer.',
    'braindump.clear_data_tooltip': 'Eliminar permanentemente todos tus datos y empezar de nuevo',
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
