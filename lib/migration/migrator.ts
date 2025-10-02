/**
 * Data Migration System for Braindump-First Architecture
 * Handles migration from legacy VoiceData to new AppData structure
 */

import { v4 as uuidv4 } from 'uuid'
import type { 
  AppData, 
  VoiceItem, 
  BraindumpSession, 
  LegacyVoiceData, 
  MigrationResult,
  UserPreferences 
} from '@/types/braindump'
import { logError, logInfo } from '@/lib/logger'

const CURRENT_VERSION = '2.0.0'
const LEGACY_STORAGE_KEY = 'voiceAppData'
const NEW_STORAGE_KEY = 'tickk_app_data'
const BACKUP_STORAGE_KEY = 'tickk_backup_data'

export class DataMigrator {
  private static instance: DataMigrator
  
  // Private constructor to prevent direct instantiation
  private constructor() {}
  
  static getInstance(): DataMigrator {
    if (!this.instance) {
      this.instance = new DataMigrator()
    }
    return this.instance
  }
  
  // Reset instance for testing
  static resetInstance(): void {
    this.instance = undefined as unknown as DataMigrator
  }
  
  /**
   * Check if migration is needed
   */
  async needsMigration(): Promise<boolean> {
    try {
      // Check if new data exists
      const newData = localStorage.getItem(NEW_STORAGE_KEY)
      if (newData) {
        const parsed = JSON.parse(newData) as AppData
        return parsed.version !== CURRENT_VERSION
      }
      
      // Check if legacy data exists
      const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY)
      return !!legacyData
    } catch (error) {
      logError('Error checking migration status', error, 'migrator')
      return false
    }
  }
  
  /**
   * Perform complete migration from legacy to new structure
   */
  async migrate(): Promise<MigrationResult> {
    logInfo('Starting data migration', 'migrator')
    
    const result: MigrationResult = {
      success: false,
      itemsMigrated: 0,
      sessionsCreated: 0,
      errors: [],
      backupCreated: false
    }
    
    try {
      // Step 1: Create backup of existing data
      await this.createBackup()
      result.backupCreated = true
      
      // Step 2: Load legacy data
      const legacyData = this.loadLegacyData()
      if (!legacyData) {
        // No legacy data, create fresh structure
        await this.createFreshAppData()
        result.success = true
        return result
      }
      
      // Step 3: Transform legacy data
      const newData = await this.transformLegacyData(legacyData)
      result.itemsMigrated = newData.tasks.length + newData.notes.length
      result.sessionsCreated = newData.sessions.length
      
      // Step 4: Validate migrated data
      const validation = this.validateMigratedData(newData)
      if (!validation.isValid) {
        result.errors.push(...validation.errors)
        throw new Error('Data validation failed')
      }
      
      // Step 5: Save new data structure
      await this.saveNewData(newData)
      
      // Step 6: Clean up legacy data (keep backup)
      this.archiveLegacyData()
      
      result.success = true
      logInfo('Migration completed successfully', 'migrator')
      
    } catch (error) {
      logError('Migration failed', error, 'migrator')
      result.errors.push(error instanceof Error ? error.message : 'Unknown error')
      
      // Attempt rollback
      await this.rollbackMigration()
    }
    
    return result
  }
  
  /**
   * Create backup of existing data
   */
  private async createBackup(): Promise<void> {
    try {
      const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY)
      if (legacyData) {
        const backup = {
          data: legacyData,
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        }
        localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backup))
        logInfo('Backup created successfully', 'migrator')
      }
    } catch (error) {
      logError('Failed to create backup', error, 'migrator')
      throw new Error('Backup creation failed')
    }
  }
  
  /**
   * Load legacy data from localStorage
   */
  private loadLegacyData(): LegacyVoiceData | null {
    try {
      const rawData = localStorage.getItem(LEGACY_STORAGE_KEY)
      if (!rawData) return null
      
      const parsed = JSON.parse(rawData)
      
      // Validate legacy structure
      if (!parsed.tasks || !parsed.notes) {
        throw new Error('Invalid legacy data structure')
      }
      
      return parsed as LegacyVoiceData
    } catch (error) {
      logError('Failed to load legacy data', error, 'migrator')
      return null
    }
  }
  
  /**
   * Transform legacy data to new structure
   */
  private async transformLegacyData(legacyData: LegacyVoiceData): Promise<AppData> {
    logInfo('Transforming legacy data', 'migrator')
    
    // Create a session for existing items
    const migrationSession: BraindumpSession = {
      id: uuidv4(),
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      itemCount: legacyData.tasks.length + legacyData.notes.length,
      processed: true,
      processedAt: new Date().toISOString(),
      stats: {
        totalWords: this.calculateTotalWords(legacyData),
        duration: 0, // Unknown for legacy data
        tasksCreated: legacyData.tasks.length,
        notesCreated: legacyData.notes.length,
        averageConfidence: 1.0 // Assume high confidence for migrated data
      }
    }
    
    // Transform tasks
    const transformedTasks: VoiceItem[] = legacyData.tasks.map(task => ({
      id: uuidv4(),
      text: task.text,
      timestamp: task.timestamp,
      category: 'tasks' as const,
      sessionId: migrationSession.id,
      processed: true,
      suggestedCategory: 'tasks' as const,
      confidence: 1.0,
      metadata: {
        completed: task.completed || false,
        reasoning: 'Migrated from legacy data',
        userCorrected: false
      }
    }))
    
    // Transform notes
    const transformedNotes: VoiceItem[] = legacyData.notes.map(note => ({
      id: uuidv4(),
      text: note.text,
      timestamp: note.timestamp,
      category: 'notes' as const,
      sessionId: migrationSession.id,
      processed: true,
      suggestedCategory: 'notes' as const,
      confidence: 1.0,
      metadata: {
        completed: note.completed || false,
        reasoning: 'Migrated from legacy data',
        userCorrected: false
      }
    }))
    
    // Create default preferences
    const defaultPreferences: UserPreferences = {
      defaultMode: 'organized', // Existing users default to familiar mode
      showOnboarding: false,    // Don't show onboarding to existing users
      enableKeyboardShortcuts: true,
      recordingTimeout: 30000,
      enableContinuousRecording: false,
      confidenceThreshold: 0.7,
      enableManualReview: true,
      enableScreenReader: false,
      highContrast: false,
      reducedMotion: false
    }
    
    return {
      tasks: transformedTasks,
      notes: transformedNotes,
      braindump: [], // No braindump items in legacy
      sessions: [migrationSession],
      version: CURRENT_VERSION,
      lastMigration: new Date().toISOString(),
      preferences: defaultPreferences
    }
  }
  
  /**
   * Create fresh app data for new users
   */
  private async createFreshAppData(): Promise<AppData> {
    const defaultPreferences: UserPreferences = {
      defaultMode: 'braindump',  // New users default to braindump mode
      showOnboarding: true,      // Show onboarding to new users
      enableKeyboardShortcuts: true,
      recordingTimeout: 30000,
      enableContinuousRecording: false,
      confidenceThreshold: 0.7,
      enableManualReview: true,
      enableScreenReader: false,
      highContrast: false,
      reducedMotion: false
    }
    
    const freshData: AppData = {
      tasks: [],
      notes: [],
      braindump: [],
      sessions: [],
      version: CURRENT_VERSION,
      lastMigration: new Date().toISOString(),
      preferences: defaultPreferences
    }
    
    await this.saveNewData(freshData)
    return freshData
  }
  
  /**
   * Validate migrated data integrity
   */
  private validateMigratedData(data: AppData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    // Check required fields
    if (!data.version) errors.push('Missing version')
    if (!Array.isArray(data.tasks)) errors.push('Invalid tasks array')
    if (!Array.isArray(data.notes)) errors.push('Invalid notes array')
    if (!Array.isArray(data.braindump)) errors.push('Invalid braindump array')
    if (!Array.isArray(data.sessions)) errors.push('Invalid sessions array')
    
    // Validate items structure
    const allItems = [...data.tasks, ...data.notes, ...data.braindump]
    allItems.forEach((item, index) => {
      if (!item.id) errors.push(`Item ${index}: Missing ID`)
      if (!item.text) errors.push(`Item ${index}: Missing text`)
      if (!item.timestamp) errors.push(`Item ${index}: Missing timestamp`)
      if (!item.category) errors.push(`Item ${index}: Missing category`)
    })
    
    // Validate sessions
    data.sessions.forEach((session, index) => {
      if (!session.id) errors.push(`Session ${index}: Missing ID`)
      if (!session.startTime) errors.push(`Session ${index}: Missing start time`)
    })
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  /**
   * Save new data structure
   */
  private async saveNewData(data: AppData): Promise<void> {
    try {
      localStorage.setItem(NEW_STORAGE_KEY, JSON.stringify(data))
      logInfo('New data structure saved', 'migrator')
    } catch (error) {
      logError('Failed to save new data', error, 'migrator')
      throw new Error('Failed to save migrated data')
    }
  }
  
  /**
   * Archive legacy data (don't delete, just rename)
   */
  private archiveLegacyData(): void {
    try {
      const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY)
      if (legacyData) {
        localStorage.setItem(`${LEGACY_STORAGE_KEY}_archived`, legacyData)
        localStorage.removeItem(LEGACY_STORAGE_KEY)
        logInfo('Legacy data archived', 'migrator')
      }
    } catch (error) {
      logError('Failed to archive legacy data', error, 'migrator')
      // Don't throw - this is not critical
    }
  }
  
  /**
   * Rollback migration in case of failure
   */
  private async rollbackMigration(): Promise<void> {
    try {
      logInfo('Rolling back migration', 'migrator')
      
      // Remove failed new data
      localStorage.removeItem(NEW_STORAGE_KEY)
      
      // Restore from backup if available
      const backup = localStorage.getItem(BACKUP_STORAGE_KEY)
      if (backup) {
        const backupData = JSON.parse(backup)
        localStorage.setItem(LEGACY_STORAGE_KEY, backupData.data)
        logInfo('Rollback completed', 'migrator')
      }
    } catch (error) {
      logError('Rollback failed', error, 'migrator')
    }
  }
  
  /**
   * Helper: Calculate total words in legacy data
   */
  private calculateTotalWords(data: LegacyVoiceData): number {
    const allTexts = [
      ...data.tasks.map(t => t.text),
      ...data.notes.map(n => n.text)
    ]
    
    return allTexts.reduce((total, text) => {
      return total + text.split(/\s+/).length
    }, 0)
  }
  
  /**
   * Get current app data
   */
  async getCurrentData(): Promise<AppData | null> {
    try {
      const rawData = localStorage.getItem(NEW_STORAGE_KEY)
      if (!rawData) return null
      
      return JSON.parse(rawData) as AppData
    } catch (error) {
      logError('Failed to load current data', error, 'migrator')
      return null
    }
  }
  
  /**
   * Check if backup exists
   */
  hasBackup(): boolean {
    return !!localStorage.getItem(BACKUP_STORAGE_KEY)
  }
  
  /**
   * Restore from backup
   */
  async restoreFromBackup(): Promise<boolean> {
    try {
      const backup = localStorage.getItem(BACKUP_STORAGE_KEY)
      if (!backup) return false
      
      const backupData = JSON.parse(backup)
      localStorage.setItem(LEGACY_STORAGE_KEY, backupData.data)
      localStorage.removeItem(NEW_STORAGE_KEY)
      
      return true
    } catch (error) {
      logError('Failed to restore from backup', error, 'migrator')
      return false
    }
  }
}
