// NLP Classification Analysis - Testing index.tsx logic
// This is the simpler logic used on the homepage

function classifyTextIndex(text) {
  const lowerText = text.toLowerCase()
  
  // Calendar/appointment indicators
  const timeWords = ['tomorrow', 'today', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'next week', 'next month', 'at', 'pm', 'am', 'o\'clock', 'meeting', 'appointment', 'call', 'lunch', 'dinner', 'schedule', 'remind me']
  const hasTimeWords = timeWords.some(word => lowerText.includes(word))
  
  if (hasTimeWords) {
    return 'calendar'
  }
  
  // Task indicators
  const taskWords = ['need to', 'have to', 'must', 'should', 'todo', 'task', 'remember to', 'don\'t forget', 'buy', 'get', 'pick up', 'finish', 'complete', 'do', 'submit']
  const hasTaskWords = taskWords.some(phrase => lowerText.includes(phrase))
  
  if (hasTaskWords) {
    return 'tasks'
  }
  
  return 'notes'
}

// Test cases focused on the user's issue
const problemCases = [
  // Main issue reported
  "I want to read xyz book",
  "I want to read the new JavaScript book", 
  "I want to read that article",
  
  // Intent vs Action distinction
  "I should read that book",          // This is intent/desire -> should be notes
  "I need to read the manual",        // This is obligation/task -> should be tasks
  "Remember to read the email",       // This is reminder/task -> should be tasks
  
  // Different forms of reading
  "Read the documentation",           // Imperative -> could be task
  "Reading about machine learning",   // Present continuous -> notes
  "I enjoy reading science fiction",  // Preference -> notes
  
  // Want/desire patterns
  "I want to learn Python",           // Desire -> notes
  "I want to visit Japan",            // Desire -> notes  
  "I want to buy a new laptop",       // Desire that could become task -> notes initially
  
  // Context matters
  "I want to do this project",        // Desire -> notes
  "I need to do this project",        // Obligation -> tasks
  "I have to do this project",        // Obligation -> tasks
  
  // Tricky cases with 'do'
  "I want to do yoga",                // Desire -> notes
  "I need to do laundry",             // Task -> tasks
  "What should I do?",                // Question -> notes
]

console.log("=== INDEX.TSX CLASSIFICATION ANALYSIS ===\n")
console.log("Testing the simpler homepage classification logic\n")

problemCases.forEach((text, index) => {
  const result = classifyTextIndex(text)
  const expected = getExpectedCategory(text)
  const isCorrect = result === expected
  
  console.log(`${index + 1}. "${text}"`)
  console.log(`   Result: ${result} | Expected: ${expected} | ${isCorrect ? '✅' : '❌'}`)
  
  if (!isCorrect) {
    analyzeClassificationIndex(text, result, expected)
  }
  console.log()
})

function getExpectedCategory(text) {
  const lower = text.toLowerCase()
  
  // INTENT vs ACTION analysis
  
  // Desires/wants/interests should be notes (expressing thoughts/preferences)
  if (lower.includes('i want to') || lower.includes("i'd like to") || lower.includes('i enjoy')) {
    return 'notes'
  }
  
  // Questions should be notes
  if (lower.includes('what should') || lower.includes('how do') || lower.includes('?')) {
    return 'notes'
  }
  
  // Present continuous (ongoing activities) should be notes
  if (lower.includes('reading about') || lower.includes('learning about')) {
    return 'notes'
  }
  
  // Clear obligations/reminders should be tasks
  if (lower.includes('need to') || lower.includes('have to') || lower.includes('must') || 
      lower.includes('remember to') || lower.includes("don't forget")) {
    return 'tasks'
  }
  
  // Time-specific should be calendar
  if (lower.includes('tomorrow') || lower.includes('next week') || lower.includes('friday') || 
      lower.includes('pm') || lower.includes('meet') || lower.includes('call') || 
      lower.includes('lunch') || lower.includes('schedule') || lower.includes('appointment')) {
    return 'calendar'
  }
  
  // Special case: "should" is tricky
  // "I should read X" = intention/thought -> notes
  // "Should I do X?" = question -> notes  
  // "This should be done" = task (but rare in voice input)
  if (lower.includes('should')) {
    if (lower.includes('i should')) {
      return 'notes'  // Personal intention/reflection
    }
    return 'tasks'  // Default for other should cases
  }
  
  // Default for analysis
  return 'notes'
}

function analyzeClassificationIndex(text, actual, expected) {
  const lower = text.toLowerCase()
  
  console.log(`   🔍 Analysis:`)
  
  // Check what triggered the classification in index.tsx logic
  const timeWords = ['tomorrow', 'today', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'next week', 'next month', 'at', 'pm', 'am', 'o\'clock', 'meeting', 'appointment', 'call', 'lunch', 'dinner', 'schedule', 'remind me']
  const taskWords = ['need to', 'have to', 'must', 'should', 'todo', 'task', 'remember to', 'don\'t forget', 'buy', 'get', 'pick up', 'finish', 'complete', 'do', 'submit']
  
  const triggeredTimeWords = timeWords.filter(word => lower.includes(word))
  const triggeredTaskWords = taskWords.filter(word => lower.includes(word))
  
  if (triggeredTimeWords.length > 0) {
    console.log(`   📅 Triggered time words: ${triggeredTimeWords.join(', ')}`)
  }
  
  if (triggeredTaskWords.length > 0) {
    console.log(`   📝 Triggered task words: ${triggeredTaskWords.join(', ')}`)
  }
  
  // Provide specific insights
  if (actual === 'tasks' && expected === 'notes') {
    if (lower.includes('i want to') || lower.includes('i should')) {
      console.log(`   💡 Issue: This expresses intention/desire, not an actionable obligation`)
    }
  }
  
  if (actual === 'calendar' && expected === 'notes') {
    console.log(`   💡 Issue: Time word detected but this isn't a scheduled event`)
  }
}
