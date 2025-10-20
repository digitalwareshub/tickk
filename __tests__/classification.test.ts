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
      
      // Edge cases that were previously broken (now fixed)
      ['I want to remember to buy milk', 'tasks'], // Action-oriented "want to"
      ['I want to buy groceries today', 'tasks'], // Action-oriented "want to"
      ['I should call mom tomorrow', 'tasks'], // Strong modal
      ['Yesterday meeting was interesting', 'notes'], // Past temporal
      ['I want to learn more about this', 'notes'], // True intent
      ['I need to think about this more', 'tasks'], // Obligation
      ['What if we scheduled it for Monday', 'notes'], // Hypothetical question
      ['I gotta finish this project', 'tasks'], // Strong modal + action
    ])('classifies "%s" as %s', async (text, expected) => {
      const result = await classifier.classify(text)
      expect(result.category).toBe(expected)
      expect(result.confidence).toBeGreaterThan(0)
      expect(result.confidence).toBeLessThanOrEqual(1)
    })
  })

  describe('Confidence Scoring', () => {
    test('returns higher confidence for clear classifications', async () => {
      const clearTask = await classifier.classify('Buy groceries today')
      const clearNote = await classifier.classify('I wonder what time it is')
      
      expect(clearTask.confidence).toBeGreaterThan(0.7)
      expect(clearNote.confidence).toBeGreaterThan(0.7)
    })

    test('returns lower confidence for ambiguous text', async () => {
      // Use a truly ambiguous single word that should have lower confidence
      const ambiguous = await classifier.classify('Something')
      expect(ambiguous.confidence).toBeLessThan(0.85)
    })
  })

  describe('Feature Detection', () => {
    test('detects action verbs correctly', async () => {
      const actionTexts = [
        'Buy groceries',
        'Call the doctor',
        'Send email to John',
        'Fix the broken door'
      ]
      
      for (const text of actionTexts) {
        const result = await classifier.classify(text)
        expect(result.category).toBe('tasks')
      }
    })

    test('detects thought patterns correctly', async () => {
      const thoughtTexts = [
        'What if we changed the design',
        'I wonder how this works',
        'It would be interesting to try',
        'Imagine if we could do this'
      ]
      
      for (const text of thoughtTexts) {
        const result = await classifier.classify(text)
        expect(result.category).toBe('notes')
      }
    })

    test('detects temporal indicators', async () => {
      const temporalTexts = [
        'Meeting today at 3pm',
        'Call mom tomorrow',
        'Deadline is next Friday',
        'Schedule for this weekend'
      ]
      
      for (const text of temporalTexts) {
        const result = await classifier.classify(text)
        expect(result.category).toBe('tasks')
        // Temporal indicators should increase task confidence
        expect(result.confidence).toBeGreaterThan(0.6)
      }
    })
  })

  describe('Edge Cases', () => {
    test('handles empty or whitespace-only text', async () => {
      const emptyTexts = ['', '   ', '\n\t']
      
      for (const text of emptyTexts) {
        const result = await classifier.classify(text)
        expect(result.category).toBeDefined()
        expect(result.confidence).toBeGreaterThan(0)
      }
    })

    test('handles very long text', async () => {
      const longText = 'I need to buy groceries and pick up milk and eggs and bread and also remember to call mom about the family dinner this weekend and maybe we should discuss the vacation plans for next month'.repeat(5)
      
      const result = await classifier.classify(longText)
      expect(result.category).toBeDefined()
      expect(result.confidence).toBeGreaterThan(0)
    })

    test('handles special characters and emojis', async () => {
      const specialTexts = [
        'Buy groceries 🛒 for dinner tonight!',
        'Meeting @ 3pm w/ John & Sarah',
        'Check out this article: https://example.com',
        'What if we used AI/ML for this? 🤔'
      ]
      
      for (const text of specialTexts) {
        const result = await classifier.classify(text)
        expect(result.category).toBeDefined()
        expect(result.confidence).toBeGreaterThan(0)
      }
    })
  })

  describe('Improved Classifier Features (v2.0)', () => {
    test('distinguishes action-oriented vs learning-oriented intent', async () => {
      // Action-oriented "want to" should be tasks
      const actionIntent = await classifier.classify('I want to remember to buy groceries')
      expect(actionIntent.category).toBe('tasks')
      
      // Learning-oriented "want to" should be notes
      const learningIntent = await classifier.classify('I want to learn more about quantum physics')
      expect(learningIntent.category).toBe('notes')
    })

    test('handles strong vs weak modals correctly', async () => {
      // Strong modals = tasks
      const strongModal = await classifier.classify('I should call mom tomorrow')
      expect(strongModal.category).toBe('tasks')
      
      // Weak modals = notes
      const weakModal = await classifier.classify('Maybe we could try a different approach')
      expect(weakModal.category).toBe('notes')
    })

    test('detects past tense for temporal indicators', async () => {
      // Future temporal = task
      const futureTask = await classifier.classify('Meeting tomorrow at 3pm')
      expect(futureTask.category).toBe('tasks')
      
      // Past temporal = note
      const pastNote = await classifier.classify('Yesterday meeting was very productive')
      expect(pastNote.category).toBe('notes')
    })

    test('has improved confidence scores', async () => {
      // Clear imperative should have very high confidence
      const imperative = await classifier.classify('Buy groceries')
      expect(imperative.confidence).toBeGreaterThanOrEqual(0.90)
      
      // Clear question should have very high confidence
      const question = await classifier.classify('What time is the meeting?')
      expect(question.confidence).toBeGreaterThanOrEqual(0.90)
    })
  })
})
