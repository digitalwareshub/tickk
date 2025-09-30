import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BraindumpInterface from '../components/BraindumpInterface'
import { LanguageProvider } from '../contexts/LanguageContext'
import type { AppData, UserPreferences } from '../types/braindump'

// Mock the speech recognition and other browser APIs
const mockSpeechRecognition = {
  start: jest.fn(),
  stop: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  continuous: false,
  interimResults: false,
  lang: 'en-US',
}

// Mock classification service
const mockClassifier = {
  classify: jest.fn().mockImplementation((text: string) => {
    // Simple mock classification logic
    const isTask = /\b(buy|call|meeting|schedule|finish)\b/i.test(text)
    return {
      category: isTask ? 'tasks' : 'notes',
      confidence: 0.85,
      reasoning: 'Mock classification',
      metadata: isTask ? { urgency: 'medium' } : undefined
    }
  })
}

jest.mock('../lib/classification/classifier', () => ({
  VoiceClassifier: {
    getInstance: jest.fn(() => mockClassifier)
  }
}))

// Mock storage service
jest.mock('../lib/storage/storage-service', () => ({
  StorageService: {
    getInstance: jest.fn().mockReturnValue({
      saveBraindumpItem: jest.fn(),
      getUnprocessedBraindumps: jest.fn().mockResolvedValue([]),
      processBraindumpItems: jest.fn(),
      createSession: jest.fn().mockResolvedValue({
        id: 'test-session-1',
        startTime: new Date().toISOString(),
        itemCount: 0,
        processed: false
      })
    })
  }
}))

// Mock announcer service
jest.mock('../lib/services/announcer.service', () => ({
  AccessibilityAnnouncer: {
    getInstance: jest.fn().mockReturnValue({
      announce: jest.fn(),
      announceRecordingStatus: jest.fn(),
      announceBraindumpAction: jest.fn(),
      announceProgress: jest.fn()
    })
  }
}))

// Mock analytics
jest.mock('../lib/analytics', () => ({
  trackPageInteraction: jest.fn()
}))

// Helper to simulate voice input
const simulateVoiceInput = async (text: string) => {
  // Simulate speech recognition result
  const event = new CustomEvent('result', {
    detail: {
      results: [[{ transcript: text }]]
    }
  })
  
  // Trigger the speech recognition result handler
  const addEventListenerCalls = mockSpeechRecognition.addEventListener.mock.calls
  const resultHandler = addEventListenerCalls.find(call => call[0] === 'result')?.[1]
  if (resultHandler) {
    resultHandler(event)
  }
}

const defaultAppData: AppData = {
  tasks: [],
  notes: [],
  braindump: [],
  sessions: [],
  version: '3.0.0'
}

const defaultPreferences: UserPreferences = {
  defaultMode: 'braindump',
  showOnboarding: false,
  enableKeyboardShortcuts: true,
  recordingTimeout: 60000,
  enableContinuousRecording: false,
  confidenceThreshold: 0.7,
  enableManualReview: true,
  enableScreenReader: false,
  highContrast: false,
  reducedMotion: false
}

const setup = (appData = defaultAppData, preferences = defaultPreferences) => {
  const mockOnDataUpdate = jest.fn()
  const mockOnRecordingStateChange = jest.fn()
  const mockOnRecordingControls = jest.fn()

  const utils = render(
    <LanguageProvider>
      <BraindumpInterface
        appData={appData}
        preferences={preferences}
        onDataUpdate={mockOnDataUpdate}
        onRecordingStateChange={mockOnRecordingStateChange}
        onRecordingControls={mockOnRecordingControls}
      />
    </LanguageProvider>
  )

  return {
    user: userEvent.setup(),
    mockOnDataUpdate,
    mockOnRecordingStateChange,
    mockOnRecordingControls,
    ...utils
  }
}

describe('Braindump Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Reset speech recognition mock
    mockSpeechRecognition.start.mockClear()
    mockSpeechRecognition.stop.mockClear()
    mockSpeechRecognition.addEventListener.mockClear()
    mockSpeechRecognition.removeEventListener.mockClear()
  })

  test.skip('complete braindump to organized flow', async () => {
    const { user, mockOnDataUpdate } = setup()
    
    // Should show braindump interface
    expect(screen.getByText(/Press the microphone to record/i)).toBeInTheDocument()
    
    // Find and click microphone button
    const micButton = screen.getByRole('button', { name: /start voice recording/i })
    expect(micButton).toBeInTheDocument()
    
    await user.click(micButton)
    
    // Verify recording started
    expect(mockSpeechRecognition.start).toHaveBeenCalled()
    
    // Add multiple items
    const items = [
      'Buy groceries tomorrow',
      'Interesting article about productivity',
      'Call dentist for appointment',
      'What if we changed the design',
      'Meeting with team at 2pm'
    ]
    
    for (const item of items) {
      await simulateVoiceInput(item)
      // Wait for item to be processed and displayed
      await waitFor(() => {
        expect(screen.getByText(`"${item}"`)).toBeInTheDocument()
      })
    }
    
    // Should show multiple items in the interface
    expect(screen.getByText('"Buy groceries tomorrow"')).toBeInTheDocument()
    expect(screen.getByText('"Interesting article about productivity"')).toBeInTheDocument()
    expect(screen.getByText('"Call dentist for appointment"')).toBeInTheDocument()
    expect(screen.getByText('"What if we changed the design"')).toBeInTheDocument()
    expect(screen.getByText('"Meeting with team at 2pm"')).toBeInTheDocument()

    // Process braindump - look for organize button
    const organizeButton = screen.getByRole('button', { name: /organize|process/i })
    await user.click(organizeButton)
    
    // Should trigger data update with organized items
    await waitFor(() => {
      expect(mockOnDataUpdate).toHaveBeenCalled()
    })
  })

  test.skip('recording controls work correctly', async () => {
    const { user, mockOnRecordingStateChange } = setup()
    
    const micButton = screen.getByRole('button', { name: /start voice recording/i })
    
    // Start recording
    await user.click(micButton)
    expect(mockSpeechRecognition.start).toHaveBeenCalled()
    expect(mockOnRecordingStateChange).toHaveBeenCalledWith(true)
    
    // Stop recording
    await user.click(micButton)
    expect(mockSpeechRecognition.stop).toHaveBeenCalled()
    expect(mockOnRecordingStateChange).toHaveBeenCalledWith(false)
  })

  test.skip('displays classification confidence', async () => {
    const { user } = setup()
    
    const micButton = screen.getByRole('button', { name: /start voice recording/i })
    await user.click(micButton)
    
    await simulateVoiceInput('Buy milk')
    
    await waitFor(() => {
      expect(screen.getByText('"Buy milk"')).toBeInTheDocument()
      // Should show confidence score (85% from our mock)
      expect(screen.getByText('85%')).toBeInTheDocument()
    })
  })

  test('handles empty braindump list', () => {
    setup()
    
    // Should show empty state message
    expect(screen.getByText(/0 braindumps/i)).toBeInTheDocument()
  })

  test.skip('keyboard shortcuts work', async () => {
    const { user } = setup()
    
    // Focus the document to enable keyboard shortcuts
    document.body.focus()
    
    // Test space key for recording
    await user.keyboard(' ')
    expect(mockSpeechRecognition.start).toHaveBeenCalled()
    
    // Test escape key to stop recording
    await user.keyboard('{Escape}')
    expect(mockSpeechRecognition.stop).toHaveBeenCalled()
  })

  test('respects user preferences', () => {
    const customPreferences: UserPreferences = {
      ...defaultPreferences,
      enableKeyboardShortcuts: false,
      confidenceThreshold: 0.9
    }
    
    setup(defaultAppData, customPreferences)
    
    // With keyboard shortcuts disabled, should not show hint
    expect(screen.queryByText(/space to record/i)).not.toBeInTheDocument()
  })

  test.skip('handles accessibility announcements', async () => {
    const { user } = setup()
    
    const micButton = screen.getByRole('button', { name: /start voice recording/i })
    await user.click(micButton)
    
    // Should have proper ARIA labels
    expect(micButton).toHaveAttribute('aria-label')
    
    // Should have live regions for announcements
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('log')).toBeInTheDocument()
  })
})
