// Improved NLP Classification Algorithm
// Fixes intent vs action confusion and word boundary issues

function improvedClassifyText(text) {
  const originalText = text.trim()
  const lowerText = originalText.toLowerCase()
  
  // Early return for empty text
  if (!originalText) return 'notes'
  
  // 1. INTENT/DESIRE RECOGNITION (Highest Priority)
  // These should always go to Notes regardless of action words
  const intentPatterns = [
    /\bi\s+want\s+to\b/i,
    /\bi'd\s+like\s+to\b/i,
    /\bi\s+wish\s+to\b/i,
    /\bi\s+hope\s+to\b/i,
    /\bi'm\s+thinking\s+about\b/i,
    /\bi'm\s+interested\s+in\b/i,
    /\bi\s+love\s+to\b/i,
    /\bi\s+enjoy\b/i,
    /\bi\s+should\s+(?:read|learn|try|explore|check\s+out|look\s+into)\b/i,
    /\bwould\s+like\s+to\b/i
  ]
  
  const hasIntent = intentPatterns.some(pattern => pattern.test(originalText))
  if (hasIntent) {
    return 'notes'
  }
  
  // 2. QUESTION PATTERNS → Notes
  const questionPatterns = [
    /\bwhat\s+should\s+i\b/i,
    /\bhow\s+(?:do|can)\s+i\b/i,
    /\bwhere\s+(?:should|can)\s+i\b/i,
    /\bwhen\s+should\s+i\b/i,
    /\bwhy\s+(?:should|do)\s+i\b/i,
    /\?$/
  ]
  
  const isQuestion = questionPatterns.some(pattern => pattern.test(originalText))
  if (isQuestion) {
    return 'notes'
  }
  
  // 3. CALENDAR PATTERNS (Time-specific events)
  const calendarPatterns = [
    // Specific time patterns (word boundaries)
    /\b(?:at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/i,
    /\b(?:at\s+noon|at\s+midnight)\b/i,
    
    // Day patterns  
    /\b(?:tomorrow|today|yesterday)\b/i,
    /\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    /\b(?:next\s+week|next\s+month|this\s+week|this\s+month)\b/i,
    
    // Meeting/appointment words
    /\b(?:meet(?:ing)?|appointment|call|lunch|dinner|conference)\b/i,
    /\b(?:schedule|remind\s+me\s+(?:to|at))\b/i,
    
    // Time indicators
    /\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/i
  ]
  
  const hasCalendarPattern = calendarPatterns.some(pattern => pattern.test(originalText))
  if (hasCalendarPattern) {
    // Double-check it's not just an intent with time words
    const intentWithTime = /\bi\s+want\s+to.*(?:tomorrow|next\s+week)\b/i.test(originalText)
    if (intentWithTime) {
      return 'notes'  // "I want to read this tomorrow" = note with time preference
    }
    return 'calendar'
  }
  
  // 4. STRONG OBLIGATION PATTERNS → Tasks
  const obligationPatterns = [
    /\bi\s+need\s+to\b/i,
    /\bi\s+have\s+to\b/i,
    /\bi\s+must\b/i,
    /\bremember\s+to\b/i,
    /\bdon't\s+forget\s+to\b/i,
    /\bmake\s+sure\s+to\b/i,
    /\btodo\b/i,
    /\btask\b/i
  ]
  
  const hasObligation = obligationPatterns.some(pattern => pattern.test(originalText))
  if (hasObligation) {
    return 'tasks'
  }
  
  // 5. ACTION WORDS (only if no intent detected)
  const actionPatterns = [
    /\b(?:buy|purchase|get|obtain|acquire)\b/i,
    /\b(?:pick\s+up|collect)\b/i,
    /\b(?:finish|complete|submit|send)\b/i,
    /\b(?:fix|repair|resolve)\b/i,
    /\b(?:create|make|build|write)\b/i,
    /\b(?:email|contact|text)\b/i
  ]
  
  const hasAction = actionPatterns.some(pattern => pattern.test(originalText))
  if (hasAction) {
    // Check context - if it's a gentle suggestion, it might be a note
    const gentleContext = /\b(?:maybe|perhaps|could|might|should\s+probably)\b/i.test(originalText)
    if (gentleContext) {
      return 'notes'
    }
    return 'tasks'
  }
  
  // 6. NOTE INDICATORS (explicit)
  const notePatterns = [
    /\b(?:idea|ideas|thought|thoughts|note|notes)\b/i,
    /\b(?:insight|inspiration|concept|brainstorm)\b/i,
    /\b(?:interesting|fascinating|cool)\b/i,
    /\b(?:remember\s+(?:this|that)|note\s*:)\b/i
  ]
  
  const hasNoteIndicator = notePatterns.some(pattern => pattern.test(originalText))
  if (hasNoteIndicator) {
    return 'notes'
  }
  
  // 7. DEFAULT: Notes (thoughts, observations, general input)
  return 'notes'
}

// Test the improved algorithm
const testCases = [
  // User's main issue
  "I want to read xyz book",
  "I want to read the new JavaScript book",
  
  // Intent vs obligation
  "I should read that book",        // Intent → notes
  "I need to read the manual",      // Obligation → tasks
  
  // Action words with intent
  "I want to buy a new laptop",     // Intent → notes  
  "I need to buy groceries",        // Obligation → tasks
  "I want to do yoga",              // Intent → notes
  "I need to do laundry",           // Obligation → tasks
  
  // Word boundary issues  
  "Read that article",              // Should be notes (no obligation)
  "What should I do?",              // Question → notes
  "Great idea for the project",     // Note indicator → notes
  
  // Time patterns
  "Meet John at 3pm tomorrow",      // Clear calendar
  "I want to visit Paris next year", // Intent with time → notes
  "Call the doctor next week",      // Calendar
  
  // Mixed cases
  "Maybe I should buy that book",   // Gentle suggestion → notes
  "Don't forget to submit the report", // Strong obligation → tasks
  "Interesting thought about AI",   // Note indicator → notes
]

console.log("=== IMPROVED CLASSIFICATION TESTING ===\n")

testCases.forEach((text, index) => {
  const result = improvedClassifyText(text)
  console.log(`${index + 1}. "${text}"`)
  console.log(`   Result: ${result}`)
  console.log()
})

// Test specific problematic cases
console.log("=== SPECIFIC PROBLEM CASES ===\n")

const problemCases = [
  "I want to read xyz book",           // Should be notes
  "I should read that article",       // Should be notes (intention)
  "I need to read the documentation", // Should be tasks (obligation)
  "Read that book",                   // Should be notes (no obligation marker)
  "What should I do?",                // Should be notes (question)
  "I want to do yoga",                // Should be notes (desire)
  "I need to do laundry",             // Should be tasks (obligation)
]

problemCases.forEach((text, index) => {
  const improved = improvedClassifyText(text)
  console.log(`${index + 1}. "${text}" → ${improved}`)
})

export { improvedClassifyText }
