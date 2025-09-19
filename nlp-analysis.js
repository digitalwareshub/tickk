// NLP Classification Analysis
// Testing the current classification logic with problematic examples

function classifyText(text) {
  const lowerText = text.toLowerCase()
  
  // Current logic from app.tsx
  const timeWords = ['tomorrow', 'today', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'next week', 'next month', 'at', 'pm', 'am', 'o\'clock']
  const meetingWords = ['meet', 'meeting', 'appointment', 'call', 'lunch', 'dinner', 'schedule', 'remind me']
  
  const hasTimeWords = timeWords.some(word => lowerText.includes(word))
  const hasMeetingWords = meetingWords.some(word => lowerText.includes(word))
  
  // Note indicators (ideas, thoughts, etc.)
  const noteIndicators = ['idea', 'ideas', 'thought', 'thoughts', 'note', 'notes', 'insight', 'inspiration', 'concept', 'brainstorm']
  const hasNoteIndicators = noteIndicators.some(word => lowerText.includes(word))
  
  // Task indicators (split into strong phrases and actions)
  const strongTaskPhrases = ['need to', 'have to', 'must', 'should', 'todo', 'task', 'remember to', 'don\'t forget']
  const taskActions = ['buy', 'get', 'pick up', 'finish', 'complete', 'do', 'make', 'create', 'build', 'write', 'send', 'email', 'fix', 'repair']
  
  const hasStrongTaskPhrases = strongTaskPhrases.some(phrase => lowerText.includes(phrase))
  const hasTaskActions = taskActions.some(word => lowerText.includes(word))
  
  // CURRENT PRIORITY LOGIC:
  
  // 1. Clear note indicators always go to notes
  if (hasNoteIndicators) {
    return 'notes'
  }
  
  // 2. Meeting context with time = calendar (even with "have to")
  if (hasMeetingWords && hasTimeWords) {
    return 'calendar'
  }
  
  // 3. Meeting words without specific time = calendar
  if (hasMeetingWords) {
    return 'calendar'
  }
  
  // 4. Time words with task phrases = need to analyze context
  if (hasTimeWords && hasStrongTaskPhrases) {
    // If it's clearly a meeting ("meet", "call", etc.), go to calendar
    if (lowerText.includes('meet') || lowerText.includes('call') || lowerText.includes('appointment')) {
      return 'calendar'
    }
    // Otherwise it's a task with a deadline
    return 'tasks'
  }
  
  // 5. Strong task phrases without meeting context = tasks
  if (hasStrongTaskPhrases) {
    return 'tasks'
  }
  
  // 6. Task actions without meeting context = tasks
  if (hasTaskActions) {
    return 'tasks'
  }
  
  // 7. Time words alone = calendar
  if (hasTimeWords) {
    return 'calendar'
  }
  
  // Default to notes for everything else
  return 'notes'
}

// Test cases
const testCases = [
  // User's specific issue
  "I want to read xyz book",
  "I want to read the new JavaScript book",
  "I'd like to read Harry Potter",
  
  // Similar desire/want phrases that should be notes
  "I want to learn French",
  "I want to visit Paris",
  "I want to try that new restaurant",
  "I want to understand quantum physics",
  
  // Reading-related examples
  "Read the design patterns book",
  "I should read that article",
  "Need to read the documentation",
  "Remember to read the email",
  
  // Clear tasks (should stay as tasks)
  "I need to buy groceries",
  "Remember to pick up the dry cleaning", 
  "I have to finish the report",
  "Must complete the project",
  
  // Clear notes (should stay as notes)
  "Great idea for the new feature",
  "Interesting thought about AI",
  "Note: check the user feedback",
  "Insight about customer behavior",
  
  // Clear calendar (should stay as calendar)
  "Meet John tomorrow at 3pm",
  "Call the doctor next week",
  "Lunch with team on Friday",
  "Schedule a meeting for Monday"
]

console.log("=== NLP CLASSIFICATION ANALYSIS ===\n")

testCases.forEach((text, index) => {
  const result = classifyText(text)
  const expected = getExpectedCategory(text)
  const isCorrect = result === expected
  
  console.log(`${index + 1}. "${text}"`)
  console.log(`   Result: ${result} | Expected: ${expected} | ${isCorrect ? '✅' : '❌'}`)
  
  if (!isCorrect) {
    analyzeWhy(text, result, expected)
  }
  console.log()
})

function getExpectedCategory(text) {
  const lower = text.toLowerCase()
  
  // Desires/wants/interests should be notes
  if (lower.includes('i want to') || lower.includes("i'd like to")) {
    return 'notes'
  }
  
  // Clear time-based should be calendar
  if (lower.includes('tomorrow') || lower.includes('next week') || lower.includes('friday') || 
      lower.includes('pm') || lower.includes('meet') || lower.includes('call') || 
      lower.includes('lunch') || lower.includes('schedule')) {
    return 'calendar'
  }
  
  // Action items with obligation should be tasks
  if (lower.includes('need to') || lower.includes('have to') || lower.includes('must') || 
      lower.includes('remember to') || lower.includes("don't forget")) {
    return 'tasks'
  }
  
  // Ideas, thoughts, notes should be notes
  if (lower.includes('idea') || lower.includes('thought') || lower.includes('note:') || 
      lower.includes('insight') || lower.includes('interesting')) {
    return 'notes'
  }
  
  // Default assumption for analysis
  return 'notes'
}

function analyzeWhy(text, actual, expected) {
  const lower = text.toLowerCase()
  
  console.log(`   🔍 Analysis:`)
  
  // Check what triggered the classification
  const strongTaskPhrases = ['need to', 'have to', 'must', 'should', 'todo', 'task', 'remember to', 'don\'t forget']
  const taskActions = ['buy', 'get', 'pick up', 'finish', 'complete', 'do', 'make', 'create', 'build', 'write', 'send', 'email', 'fix', 'repair']
  
  const triggeredTaskPhrases = strongTaskPhrases.filter(phrase => lower.includes(phrase))
  const triggeredTaskActions = taskActions.filter(word => lower.includes(word))
  
  if (triggeredTaskPhrases.length > 0) {
    console.log(`   📝 Triggered task phrases: ${triggeredTaskPhrases.join(', ')}`)
  }
  
  if (triggeredTaskActions.length > 0) {
    console.log(`   🎯 Triggered task actions: ${triggeredTaskActions.join(', ')}`)
  }
  
  if (actual === 'tasks' && expected === 'notes') {
    console.log(`   💡 Issue: This expresses a desire/interest, not an actionable task`)
  }
}
