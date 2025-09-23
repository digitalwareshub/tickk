/**
 * Enhanced language detection with geographic and browser intelligence
 */

export type Language = 'en' | 'es'

interface LanguageDetectionResult {
  language: Language
  confidence: 'high' | 'medium' | 'low'
  source: 'url' | 'saved' | 'geographic' | 'browser' | 'default'
  shouldPromptUser: boolean
}

/**
 * Get user's approximate region based on timezone
 */
function getRegionFromTimezone(): string | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    // Spanish-speaking regions
    const spanishRegions = [
      'America/Mexico_City', 'America/Cancun', 'America/Merida', // Mexico
      'America/Argentina/Buenos_Aires', 'America/Argentina/Cordoba', // Argentina
      'America/Bogota', // Colombia
      'America/Lima', // Peru
      'America/Santiago', // Chile
      'America/Caracas', // Venezuela
      'America/La_Paz', // Bolivia
      'America/Asuncion', // Paraguay
      'America/Montevideo', // Uruguay
      'America/Guayaquil', // Ecuador
      'America/Guatemala', // Guatemala
      'America/Tegucigalpa', // Honduras
      'America/Managua', // Nicaragua
      'America/San_Jose', // Costa Rica
      'America/Panama', // Panama
      'America/Havana', // Cuba
      'America/Santo_Domingo', // Dominican Republic
      'America/Puerto_Rico', // Puerto Rico
      'Europe/Madrid', // Spain
      'Africa/Ceuta', // Spanish territories in Africa
      'Atlantic/Canary', // Canary Islands
    ]
    
    if (spanishRegions.some(region => timezone.includes(region.split('/')[1]))) {
      return 'spanish-speaking'
    }
    
    return 'other'
  } catch {
    return null
  }
}

/**
 * Enhanced language detection with multiple signals
 */
export function detectUserLanguage(): LanguageDetectionResult {
  // 1. Check URL (highest priority)
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/es')) {
      return {
        language: 'es',
        confidence: 'high',
        source: 'url',
        shouldPromptUser: false
      }
    }
  }
  
  // 2. Check saved preference
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tickk_language') as Language
    if (saved) {
      return {
        language: saved,
        confidence: 'high',
        source: 'saved',
        shouldPromptUser: false
      }
    }
  }
  
  // 3. For new users, combine signals
  const browserLang = typeof navigator !== 'undefined' ? 
    navigator.language.toLowerCase() : 'en'
  const region = getRegionFromTimezone()
  
  // Strong Spanish indicators
  if (browserLang.startsWith('es') && region === 'spanish-speaking') {
    return {
      language: 'es',
      confidence: 'high',
      source: 'geographic',
      shouldPromptUser: false
    }
  }
  
  // Mixed signals - prompt user
  if (browserLang.startsWith('es') && region !== 'spanish-speaking') {
    return {
      language: 'en', // Default to English, but prompt
      confidence: 'low',
      source: 'browser',
      shouldPromptUser: true
    }
  }
  
  if (!browserLang.startsWith('es') && region === 'spanish-speaking') {
    return {
      language: 'es', // Default to Spanish, but prompt
      confidence: 'medium',
      source: 'geographic',
      shouldPromptUser: true
    }
  }
  
  // Default to English
  return {
    language: 'en',
    confidence: 'high',
    source: 'default',
    shouldPromptUser: false
  }
}

/**
 * Check if user should see language selector on first visit
 */
export function shouldShowLanguagePrompt(): boolean {
  const detection = detectUserLanguage()
  return detection.shouldPromptUser && !localStorage.getItem('tickk_language_prompted')
}

/**
 * Mark that user has been prompted about language
 */
export function markLanguagePrompted(): void {
  localStorage.setItem('tickk_language_prompted', 'true')
}
