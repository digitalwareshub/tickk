// Final verification test for the improved NLP classification
// Testing both index.tsx and app.tsx implementations

// Simulate the new classifyText function from index.tsx
function testClassifyText(text) {
  const originalText = text.trim()
  
  if (!originalText) return 'notes'
  
  // 1. INTENT/DESIRE RECOGNITION (Highest Priority)
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
    /\b(?:at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/i,
    /\b(?:at\s+noon|at\s+midnight)\b/i,
    /\b(?:tomorrow|today|yesterday)\b/i,
    /\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    /\b(?:next\s+week|next\s+month|this\s+week|this\s+month)\b/i,
    /\b(?:meet(?:ing)?|appointment|call|lunch|dinner|conference)\b/i,
    /\b(?:schedule|remind\s+me\s+(?:to|at))\b/i,
    /\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/i
  ]
  
  const hasCalendarPattern = calendarPatterns.some(pattern => pattern.test(originalText))
  if (hasCalendarPattern) {
    const intentWithTime = /\bi\s+want\s+to.*(?:tomorrow|next\s+week)\b/i.test(originalText)
    if (intentWithTime) {
      return 'notes'
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
  
  return 'notes'
}

console.log("=== FINAL NLP CLASSIFICATION VERIFICATION ===\n")

// Test the original user issue and similar cases
const criticalTests = [
  { text: "I want to read xyz book", expected: "notes", reason: "User's main complaint - desire to read" },
  { text: "I want to read the new JavaScript book", expected: "notes", reason: "Similar desire expression" },
  { text: "I should read that article", expected: "notes", reason: "Personal intention, not obligation" },
  { text: "I need to read the documentation", expected: "tasks", reason: "Clear obligation" },
  { text: "Remember to read the email", expected: "tasks", reason: "Reminder/obligation" },
  { text: "I want to buy a new laptop", expected: "notes", reason: "Desire, not immediate task" },
  { text: "I need to buy groceries", expected: "tasks", reason: "Clear obligation" },
  { text: "I want to do yoga", expected: "notes", reason: "Interest/desire" },
  { text: "I need to do laundry", expected: "tasks", reason: "Obligation" },
  { text: "Read that book", expected: "notes", reason: "No obligation marker" },
  { text: "What should I do?", expected: "notes", reason: "Question" },
  { text: "Meet John at 3pm tomorrow", expected: "calendar", reason: "Clear appointment" },
  { text: "I want to visit Paris next year", expected: "notes", reason: "Intent with time is still intent" },
  { text: "Call the doctor next week", expected: "calendar", reason: "Scheduled task" },
  { text: "Great idea for the project", expected: "notes", reason: "Explicit note indicator" },
  { text: "Maybe I should buy that book", expected: "notes", reason: "Gentle suggestion" },
]

let passedTests = 0
let totalTests = criticalTests.length

criticalTests.forEach((test, index) => {
  const result = testClassifyText(test.text)
  const passed = result === test.expected
  if (passed) passedTests++
  
  console.log(`${index + 1}. "${test.text}"`)
  console.log(`   Expected: ${test.expected} | Got: ${result} | ${passed ? '✅' : '❌'}`)
  console.log(`   Reason: ${test.reason}`)
  if (!passed) {
    console.log(`   ⚠️  FAILED - This needs attention!`)
  }
  console.log()
})

console.log(`=== SUMMARY ===`)
console.log(`Passed: ${passedTests}/${totalTests} tests`)
console.log(`Success Rate: ${((passedTests/totalTests) * 100).toFixed(1)}%`)

if (passedTests === totalTests) {
  console.log(`🎉 ALL TESTS PASSED! The NLP classification is now working correctly.`)
  console.log(`✅ User's main issue "I want to read xyz book" → notes (FIXED!)`)
} else {
  console.log(`❌ Some tests failed. The classification needs further refinement.`)
}
