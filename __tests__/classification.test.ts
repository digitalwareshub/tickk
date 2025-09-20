import { VoiceClassifier } from '../lib/classification/classifier'

describe('Voice Classification', () => {
  const classifier = new VoiceClassifier()
  
  describe('Tasks vs Notes', () => {
    test.each([
      // Clear tasks
      ['I need to buy groceries', 'tasks'],
      ['Remember to call mom', 'tasks'],
      ['Meeting tomorrow at 3pm', 'tasks'],
      ['Finish the report by Friday', 'tasks'],
      ['Schedule dentist appointment', 'tasks'],
      ['Buy milk', 'tasks'], // Imperative
      ['Need to think about this', 'tasks'], // Has "need to"
      
      // Clear notes
      ['I want to read that book', 'notes'],
      ['Interesting idea for the app', 'notes'],
      ['What if we tried a different approach', 'notes'],
      ['I wonder why that happened', 'notes'],
      ['Maybe we should consider this', 'notes'],
      ['Milk', 'notes'], // Single word, no context
      ['That meeting was interesting', 'notes'], // Past tense
    ])('classifies "%s" as %s', (text, expected) => {
      const result = classifier.classify(text)
      expect(result.category).toBe(expected)
      expect(result.confidence).toBeGreaterThan(0)
      expect(result.confidence).toBeLessThanOrEqual(1)
    })
  })

  describe('Confidence Scoring', () => {
    test('returns higher confidence for clear classifications', () => {
      const clearTask = classifier.classify('Buy groceries today')
      const clearNote = classifier.classify('I wonder what time it is')
      
      expect(clearTask.confidence).toBeGreaterThan(0.7)
      expect(clearNote.confidence).toBeGreaterThan(0.7)
    })

    test('returns lower confidence for ambiguous text', () => {
      const ambiguous = classifier.classify('Maybe')
      expect(ambiguous.confidence).toBeLessThan(0.7)
    })
  })

  describe('Feature Detection', () => {
    test('detects action verbs correctly', () => {
      const actionTexts = [
        'Buy groceries',
        'Call the doctor',
        'Send email to John',
        'Fix the broken door'
      ]
      
      actionTexts.forEach(text => {
        const result = classifier.classify(text)
        expect(result.category).toBe('tasks')
      })
    })

    test('detects thought patterns correctly', () => {
      const thoughtTexts = [
        'What if we changed the design',
        'I wonder how this works',
        'It would be interesting to try',
        'Imagine if we could do this'
      ]
      
      thoughtTexts.forEach(text => {
        const result = classifier.classify(text)
        expect(result.category).toBe('notes')
      })
    })

    test('detects temporal indicators', () => {
      const temporalTexts = [
        'Meeting today at 3pm',
        'Call mom tomorrow',
        'Deadline is next Friday',
        'Schedule for this weekend'
      ]
      
      temporalTexts.forEach(text => {
        const result = classifier.classify(text)
        expect(result.category).toBe('tasks')
        // Temporal indicators should increase task confidence
        expect(result.confidence).toBeGreaterThan(0.6)
      })
    })
  })

  describe('Edge Cases', () => {
    test('handles empty or whitespace-only text', () => {
      const emptyResults = ['', '   ', '\n\t'].map(text => 
        classifier.classify(text)
      )
      
      emptyResults.forEach(result => {
        expect(result.category).toBeDefined()
        expect(result.confidence).toBeGreaterThan(0)
      })
    })

    test('handles very long text', () => {
      const longText = 'I need to buy groceries and pick up milk and eggs and bread and also remember to call mom about the family dinner this weekend and maybe we should discuss the vacation plans for next month'.repeat(5)
      
      const result = classifier.classify(longText)
      expect(result.category).toBeDefined()
      expect(result.confidence).toBeGreaterThan(0)
    })

    test('handles special characters and emojis', () => {
      const specialTexts = [
        'Buy groceries 🛒 for dinner tonight!',
        'Meeting @ 3pm w/ John & Sarah',
        'Check out this article: https://example.com',
        'What if we used AI/ML for this? 🤔'
      ]
      
      specialTexts.forEach(text => {
        const result = classifier.classify(text)
        expect(result.category).toBeDefined()
        expect(result.confidence).toBeGreaterThan(0)
      })
    })
  })
})
