/**
 * Local NLP Classification Service
 * Uses compromise.js for English and es-compromise for Spanish classification without AI dependencies
 */

import nlp from 'compromise'
import type { Classification, UrgencyLevel } from '@/types/braindump'

// Dynamic import for Spanish NLP - temporarily disabled due to TypeScript issues
// Using proper interface for NLP library
interface NLPDocument {
  verbs(): { found: string[] }
  nouns(): { found: string[] }
  adjectives(): { found: string[] }
  topics(): { found: string[] }
}

interface NLPLibrary {
  (text: string): NLPDocument
}

let esNlp: NLPLibrary | null = null
const loadSpanishNLP = async () => {
  if (!esNlp) {
    try {
      // Temporarily use English NLP for Spanish until es-compromise TypeScript issues are resolved
      // The es-compromise library has broken TypeScript definitions that prevent compilation
      console.warn('Spanish NLP temporarily using English NLP - es-compromise has broken TypeScript definitions')
      esNlp = nlp
    } catch {
      console.warn('Spanish NLP not available, falling back to English')
      esNlp = nlp
    }
  }
  return esNlp
}

interface Features {
  hasImperative: boolean
  hasModal: boolean
  hasActionVerb: boolean
  hasQuestion: boolean
  hasThoughtPattern: boolean
  hasIntent: boolean
  dates: string[]
  times: string[]
  actionWords: string[]
  intentWords: string[]
}

export class VoiceClassifier {
  private static instance: VoiceClassifier
  private nlp: typeof nlp
  private currentLanguage: 'en' | 'es' = 'en'
  
  // Private constructor to prevent direct instantiation
  private constructor() {
    this.nlp = nlp
  }
  
  static getInstance(): VoiceClassifier {
    if (!this.instance) {
      this.instance = new VoiceClassifier()
    }
    return this.instance
  }
  
  // Reset instance for testing
  static resetInstance(): void {
    this.instance = undefined as unknown as VoiceClassifier
  }

  /**
   * Set the language for classification
   */
  setLanguage(language: 'en' | 'es') {
    this.currentLanguage = language
  }
  
  /**
   * Main classification method
   */
  async classify(text: string): Promise<Classification> {
    // Use appropriate NLP library based on language
    let doc: ReturnType<typeof nlp>
    if (this.currentLanguage === 'es') {
      const spanishNlp = await loadSpanishNLP()
      doc = spanishNlp(text) as unknown as ReturnType<typeof nlp>
    } else {
      doc = nlp(text)
    }
    
    // Extract linguistic features
    const features = this.extractFeatures(doc, text)
    
    // Determine if this is actionable (task) or informational (note)
    const isTask = this.isActionable(features, text)
    
    return {
      category: isTask ? 'tasks' : 'notes',
      confidence: this.calculateConfidence(features, isTask),
      reasoning: this.explainClassification(features, isTask, text),
      metadata: isTask ? this.extractTaskMetadata(features, text) : undefined
    }
  }
  
  /**
   * Extract linguistic features from text
   */
  private extractFeatures(doc: ReturnType<typeof nlp>, text: string): Features {
    return {
      // Grammar patterns
      hasImperative: doc.has('#Imperative'),
      hasModal: doc.has('#Modal'), // must, should, need to
      hasActionVerb: this.hasActionVerb(text),
      
      // Question patterns
      hasQuestion: doc.has('#QuestionWord') || text.trim().endsWith('?'),
      
      // Thought/idea patterns
      hasThoughtPattern: this.hasThoughtPattern(text),
      
      // Intent/desire patterns
      hasIntent: this.hasIntentPattern(text),
      
      // Time references
      dates: this.extractDates(text),
      times: this.extractTimes(text),
      
      // Extracted words
      actionWords: this.extractActionWords(text),
      intentWords: this.extractIntentWords(text)
    }
  }
  
  /**
   * Determine if text represents an actionable item (task)
   */
  private isActionable(features: Features, text: string): boolean {
    let taskScore = 0
    let noteScore = 0
    
    // STRONG TASK INDICATORS (High Priority)
    
    // Direct commands and imperatives
    if (features.hasImperative) taskScore += 3
    
    // Strong obligation words
    if (/\b(need to|have to|must|should do|remember to|don't forget)\b/i.test(text)) {
      taskScore += 4
    }
    
    // Task-specific words
    if (/\b(meeting|appointment|call|deadline|due|schedule|book|pay|submit)\b/i.test(text)) {
      taskScore += 3
    }
    
    // Action verbs in imperative context
    if (features.hasActionVerb && !features.hasIntent) {
      taskScore += 2
    }
    
    // STRONG NOTE INDICATORS (High Priority)
    
    // Intent/desire patterns (strongest note indicator)
    if (features.hasIntent) {
      noteScore += 5 // This is intentionally high to override most task patterns
    }
    
    // Questions
    if (features.hasQuestion) {
      noteScore += 3
    }
    
    // Thought patterns
    if (features.hasThoughtPattern) {
      noteScore += 3
    }
    
    // Past tense (observations about completed things)
    if (/\b(was|were|had|did|went|saw|heard|read)\b/i.test(text)) {
      noteScore += 2
    }
    
    // Note-specific words
    if (/\b(idea|thought|note|insight|interesting|cool|weird|funny)\b/i.test(text)) {
      noteScore += 2
    }
    
    // MODIFIERS
    
    // Modal verbs can indicate uncertainty (lean towards notes)
    if (features.hasModal && !/\b(must|need to|have to)\b/i.test(text)) {
      noteScore += 1
    }
    
    // Time references can indicate tasks
    if (features.dates.length > 0 || features.times.length > 0) {
      taskScore += 2
    }
    
    // Gentle suggestion words (lean towards notes)
    if (/\b(maybe|perhaps|could|might|possibly)\b/i.test(text)) {
      noteScore += 2
    }
    
    // Future tense without strong obligation (could be either)
    if (/\b(will|going to)\b/i.test(text) && taskScore < 3) {
      noteScore += 1
    }
    
    return taskScore > noteScore
  }
  
  /**
   * Check for action verbs
   */
  private hasActionVerb(text: string): boolean {
    const actionVerbs = /\b(buy|get|pick\s+up|finish|complete|do|make|create|build|write|send|email|fix|call|meet|schedule|book|pay|clean|organize|submit|review|prepare|contact|order|purchase|install|update|delete|remove|add|start|stop|continue)\b/i
    return actionVerbs.test(text)
  }
  
  /**
   * Check for thought/idea patterns
   */
  private hasThoughtPattern(text: string): boolean {
    const thoughtPatterns = this.currentLanguage === 'es' 
      ? /\b(qué tal si|me pregunto|sería|interesante|curioso|extraño|divertido|genial si|imagino|pensando en|se me ocurrió|me di cuenta|noté|creo que|siento que|pienso que|me parece que|tal vez|quizás|supongo que|parece que|noto que|entiendo que|recuerdo que|olvidé que|sé que|no sé|no estoy seguro|estoy pensando|me pregunto|me siento|me parece|me gusta|me molesta|me preocupa)\b/i
      : /\b(what if|I wonder|it would be|interesting|curious|strange|funny|cool if|imagine|thinking about|occurred to me|realized|noticed)\b/i
    return thoughtPatterns.test(text)
  }
  
  /**
   * Check for intent/desire patterns (strongest note indicator)
   */
  private hasIntentPattern(text: string): boolean {
    const intentPatterns = this.currentLanguage === 'es' ? [
      /\bquiero\s+que\b/i,
      /\bme\s+gustaría\s+que\b/i,
      /\bdesearía\s+que\b/i,
      /\bespero\s+que\b/i,
      /\bestoy\s+pensando\s+en\b/i,
      /\bestoy\s+interesado\s+en\b/i,
      /\bme\s+encanta\s+que\b/i,
      /\bdisfruto\s+de\b/i,
      /\bme\s+gustaría\s+que\b/i,
      /\bdesearía\s+poder\b/i,
      /\bespero\s+que\b/i,
      /\bnecesito\s+que\b/i,
      /\btengo\s+que\b/i,
      /\bdebo\s+que\b/i,
      /\bdebería\s+que\b/i
    ] : [
      /\bi\s+want\s+to\b/i,
      /\bi'd\s+like\s+to\b/i,
      /\bi\s+wish\s+to\b/i,
      /\bi\s+hope\s+to\b/i,
      /\bi'm\s+thinking\s+about\b/i,
      /\bi'm\s+interested\s+in\b/i,
      /\bi\s+love\s+to\b/i,
      /\bi\s+enjoy\b/i,
      /\bwould\s+like\s+to\b/i,
      /\bwish\s+I\s+could\b/i,
      /\bhope\s+to\b/i
    ]
    
    return intentPatterns.some(pattern => pattern.test(text))
  }
  
  /**
   * Extract action words from text
   */
  private extractActionWords(text: string): string[] {
    const actionWords = ['buy', 'get', 'pick up', 'finish', 'complete', 'do', 'make', 'create', 'build', 'write', 'send', 'email', 'fix', 'call', 'meet', 'schedule', 'book', 'pay', 'clean', 'organize', 'submit', 'review', 'prepare', 'contact']
    return actionWords.filter(word => new RegExp(`\\b${word}\\b`, 'i').test(text))
  }
  
  /**
   * Extract intent words from text
   */
  private extractIntentWords(text: string): string[] {
    const intentWords = ['want', 'like', 'wish', 'hope', 'thinking', 'interested', 'love', 'enjoy', 'would like']
    return intentWords.filter(word => new RegExp(`\\b${word}\\b`, 'i').test(text))
  }
  
  /**
   * Calculate confidence score based on features
   */
  private calculateConfidence(features: Features, isTask: boolean): number {
    let confidence = 0.5 // Base confidence
    
    if (isTask) {
      // High confidence task indicators
      if (features.hasImperative) confidence += 0.3
      if (/\b(need to|have to|must)\b/i.test(features.actionWords.join(' '))) confidence += 0.3
      if (features.dates.length > 0 || features.times.length > 0) confidence += 0.2
      if (features.hasActionVerb) confidence += 0.1
    } else {
      // High confidence note indicators
      if (features.hasIntent) confidence += 0.4
      if (features.hasQuestion) confidence += 0.3
      if (features.hasThoughtPattern) confidence += 0.2
    }
    
    return Math.min(confidence, 1.0)
  }
  
  /**
   * Generate human-readable explanation
   */
  private explainClassification(features: Features, isTask: boolean, text: string): string {
    if (isTask) {
      const reasons = []
      
      if (features.hasImperative) reasons.push('command form')
      if (/\b(need to|have to|must)\b/i.test(text)) reasons.push('obligation word')
      if (features.hasActionVerb) reasons.push('action verb')
      if (features.dates.length > 0 || features.times.length > 0) reasons.push('has timing')
      if (/\b(meeting|appointment|call|deadline)\b/i.test(text)) reasons.push('task keyword')
      
      return reasons.length > 0 ? `Classified as task: ${reasons.join(', ')}` : 'Seems actionable'
    } else {
      const reasons = []
      
      if (features.hasIntent) reasons.push('expresses desire/intent')
      if (features.hasQuestion) reasons.push('question')
      if (features.hasThoughtPattern) reasons.push('thought/idea pattern')
      if (/\b(idea|thought|interesting)\b/i.test(text)) reasons.push('note keyword')
      if (/\b(was|were|had|did)\b/i.test(text)) reasons.push('past tense observation')
      
      return reasons.length > 0 ? `Classified as note: ${reasons.join(', ')}` : 'Seems informational'
    }
  }
  
  /**
   * Extract task-specific metadata
   */
  private extractTaskMetadata(features: Features, text: string): Record<string, unknown> {
    const metadata: Record<string, unknown> = {}
    
    // Date and time information
    if (features.dates.length > 0 || features.times.length > 0) {
      metadata.hasDate = features.dates.length > 0
      metadata.hasTime = features.times.length > 0
      metadata.dateInfo = [...features.dates, ...features.times].join(', ')
    }
    
    // Urgency detection
    metadata.urgency = this.extractUrgency(text)
    
    // Action patterns
    if (features.actionWords.length > 0) {
      metadata.patterns = features.actionWords
    }
    
    return metadata
  }
  
  /**
   * Extract urgency level from text
   */
  private extractUrgency(text: string): UrgencyLevel {
    // Immediate urgency
    if (/\b(urgent|asap|immediately|now|right away|emergency)\b/i.test(text)) {
      return 'immediate'
    }
    
    // Soon urgency
    if (/\b(today|tomorrow|this week|soon|quickly|fast)\b/i.test(text)) {
      return 'soon'
    }
    
    // Future urgency
    if (/\b(next week|next month|next year|someday|eventually|later)\b/i.test(text)) {
      return 'future'
    }
    
    return 'none'
  }
  
  /**
   * Batch classify multiple items
   */
  async classifyBatch(texts: string[]): Promise<Classification[]> {
    return Promise.all(texts.map(text => this.classify(text)))
  }
  
  /**
   * Extract dates from text using simple patterns
   */
  private extractDates(text: string): string[] {
    const datePatterns = [
      /\b(today|tomorrow|yesterday)\b/gi,
      /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi,
      /\b(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|september|oct|october|nov|november|dec|december)\s+\d{1,2}\b/gi,
      /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g,
      /\b\d{1,2}-\d{1,2}-\d{2,4}\b/g,
      /\bnext\s+(week|month|year)\b/gi,
      /\bthis\s+(week|month|year)\b/gi
    ]
    
    const dates: string[] = []
    datePatterns.forEach(pattern => {
      const matches = text.match(pattern)
      if (matches) {
        dates.push(...matches)
      }
    })
    
    return dates
  }

  /**
   * Extract times from text using simple patterns
   */
  private extractTimes(text: string): string[] {
    const timePatterns = [
      /\b\d{1,2}:\d{2}\s*(am|pm|AM|PM)?\b/g,
      /\b\d{1,2}\s*(am|pm|AM|PM)\b/g,
      /\b(morning|afternoon|evening|night)\b/gi,
      /\bat\s+\d{1,2}\b/gi
    ]
    
    const times: string[] = []
    timePatterns.forEach(pattern => {
      const matches = text.match(pattern)
      if (matches) {
        times.push(...matches)
      }
    })
    
    return times
  }

  /**
   * Get classification statistics for debugging
   */
  getStats(): { version: string; features: string[] } {
    return {
      version: '2.0.0',
      features: ['intent_detection', 'urgency_extraction', 'time_parsing', 'confidence_scoring']
    }
  }
}
