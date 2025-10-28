/**
 * Enhanced Type Definitions for Braindump-First Architecture
 * This file defines the new data models for tickk's transformation
 */

export type CategoryType = 'tasks' | 'notes' | 'braindump'
export type UrgencyLevel = 'immediate' | 'soon' | 'future' | 'none'
export type ProcessingStage = 'processing' | 'review' | 'complete'

/**
 * Enhanced VoiceItem interface supporting braindump workflow
 */
export interface VoiceItem {
  id: string                              // UUID instead of timestamp-based ID
  text: string                           // Original transcribed text
  timestamp: string                      // ISO string of creation time
  category?: CategoryType                // Current category (includes braindump state)
  
  // Session Management
  sessionId?: string                     // Groups items from same braindump session
  processed?: boolean                    // Whether item has been organized from braindump
  
  // Classification Results
  suggestedCategory?: 'tasks' | 'notes'  // AI/NLP suggested category
  confidence?: number                    // Classification confidence (0-1)
  classification?: Classification        // Full classification result
  
  // Task/Note specific fields (when organized)
  completed?: boolean                    // For tasks - completion status
  priority?: 'low' | 'medium' | 'high'   // For tasks - priority level
  tags?: string[]                        // For notes - tags
  source?: string                        // Source of the item
  
  // Enhanced Metadata
  metadata?: {
    // Task-specific metadata
    hasDate?: boolean                    // Contains date references
    hasTime?: boolean                    // Contains time references
    dateInfo?: string                    // Extracted date/time info
    urgency?: UrgencyLevel              // Extracted urgency level
    completed?: boolean                  // Task completion status
    pinned?: boolean                     // Pinned to top in Focus mode

    // Classification context
    reasoning?: string                   // Why it was classified this way
    patterns?: string[]                  // Detected patterns in text

    // User adjustments
    userCorrected?: boolean             // User manually changed category
    originalSuggestion?: 'tasks' | 'notes' // Original classification if corrected

    // Recording metadata
    source?: string                      // Source of recording
    duration?: number                    // Recording duration
    retryCount?: number                  // Number of retries
  }
}

/**
 * Braindump session tracking
 */
export interface BraindumpSession {
  id: string                            // Session UUID
  startTime: string                     // When session began (ISO string)
  endTime?: string                      // When session ended (ISO string, if completed)
  itemCount: number                     // Number of items in session
  processed: boolean                    // Whether session has been organized
  processedAt?: string                  // When session was processed (ISO string)
  
  // Session analytics
  stats?: {
    totalWords: number                  // Total words captured
    duration: number                    // Session duration in seconds
    tasksCreated: number               // Tasks created from this session
    notesCreated: number               // Notes created from this session
    averageConfidence: number          // Average classification confidence
  }
}

/**
 * Enhanced app data structure
 */
export interface AppData {
  tasks: VoiceItem[]                    // Organized tasks
  notes: VoiceItem[]                    // Organized notes
  braindump: VoiceItem[]                // Unprocessed braindump items
  sessions: BraindumpSession[]          // Session history
  
  // Metadata
  version: string                       // Data structure version
  lastMigration?: string               // Last migration timestamp
  preferences?: UserPreferences        // User settings
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  // UI Preferences
  defaultMode: 'braindump' | 'organized' | 'focus'     // Default app mode
  showOnboarding: boolean                    // Whether to show onboarding
  enableKeyboardShortcuts: boolean           // Keyboard shortcuts enabled
  
  // Recording Preferences
  recordingTimeout: number                   // Auto-stop recording timeout
  enableContinuousRecording: boolean         // Allow continuous recording
  
  // Classification Preferences
  confidenceThreshold: number                // Minimum confidence for auto-classification
  enableManualReview: boolean               // Always show review step
  
  // Accessibility
  enableScreenReader: boolean               // Screen reader optimizations
  highContrast: boolean                    // High contrast mode
  reducedMotion: boolean                   // Reduced motion for animations
}

/**
 * Classification result from NLP engine
 */
export interface Classification {
  category: 'tasks' | 'notes'           // Classified category
  confidence: number                    // Confidence score (0-1)
  reasoning: string                     // Human-readable explanation
  metadata?: {                         // Additional extracted data
    hasDate?: boolean
    hasTime?: boolean
    urgency?: UrgencyLevel
    dateInfo?: string
    patterns?: string[]
  }
}

/**
 * Processing modal state
 */
export interface ProcessingState {
  stage: ProcessingStage               // Current processing stage
  currentIndex: number                 // Item being processed
  totalItems: number                   // Total items to process
  processed: VoiceItem[]              // Items that have been processed
  errors: string[]                    // Any processing errors
}

/**
 * Legacy data structure for migration
 */
export interface LegacyVoiceData {
  tasks: Array<{
    id: number
    text: string
    timestamp: string
    category: 'tasks'
    completed?: boolean
  }>
  notes: Array<{
    id: number
    text: string
    timestamp: string
    category: 'notes'
    completed?: boolean
  }>
}

/**
 * Migration result tracking
 */
export interface MigrationResult {
  success: boolean
  itemsMigrated: number
  sessionsCreated: number
  errors: string[]
  backupCreated: boolean
  backupLocation?: string
}

/**
 * Analytics data (privacy-first, local only)
 */
export interface AnalyticsData {
  // Usage patterns
  totalSessions: number
  totalItems: number
  averageSessionLength: number
  mostProductiveTime: string
  
  // Classification accuracy
  classificationAccuracy: number
  userCorrections: number
  
  // Feature usage
  shortcutsUsed: number
  exportCount: number
  modesSwitched: number
  
  // Performance metrics
  averageProcessingTime: number
  errorRate: number
}

/**
 * Export/Import data structure
 */
export interface ExportData {
  data: AppData
  analytics?: AnalyticsData
  exportDate: string
  version: string
  format: 'json' | 'markdown'
}

/**
 * Task Template for recurring tasks
 */
export interface TaskTemplate {
  id: string                           // UUID
  text: string                         // Template text
  category: 'tasks' | 'notes'          // Template type
  priority?: 'low' | 'medium' | 'high' // Default priority
  tags?: string[]                      // Default tags
  createdAt: string                    // ISO timestamp
  usageCount: number                   // How many times used
  lastUsed?: string                    // ISO timestamp of last use
  metadata?: {
    description?: string               // Template description
    icon?: string                      // Optional emoji icon
  }
}
