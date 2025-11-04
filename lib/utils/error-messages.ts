/**
 * Standardized Error Messages
 * Consistent, user-friendly error messages used throughout the application
 */

export const ErrorMessages = {
  // Storage errors
  STORAGE_SAVE_FAILED: 'Failed to save your data. Please try again.',
  STORAGE_LOAD_FAILED: 'Failed to load your data. Please refresh the page.',
  STORAGE_DELETE_FAILED: 'Failed to delete item. Please try again.',
  STORAGE_UPDATE_FAILED: 'Failed to update item. Please try again.',
  STORAGE_QUOTA_EXCEEDED: 'Storage limit reached. Please delete some items to free up space.',
  
  // Recording errors
  RECORDING_START_FAILED: 'Failed to start recording. Please check your microphone and try again.',
  RECORDING_PERMISSION_DENIED: 'Microphone access denied. Please enable microphone permissions in your browser settings.',
  RECORDING_NOT_SUPPORTED: 'Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.',
  RECORDING_NO_SPEECH: 'No speech detected. Please speak clearly and try again.',
  RECORDING_AUDIO_CAPTURE_FAILED: 'Failed to capture audio. Please check your microphone and try again.',
  RECORDING_NETWORK_ERROR: 'Network error during recording. Please check your connection and try again.',
  
  // Processing errors
  PROCESSING_FAILED: 'Failed to process your recording. Please try again.',
  CLASSIFICATION_FAILED: 'Failed to organize your items. Please try again.',
  TRANSCRIPT_PROCESSING_FAILED: 'Failed to process transcript. Please try again.',
  
  // Export errors
  EXPORT_FAILED: 'Failed to export. Please try again.',
  EXPORT_NO_ITEMS: 'No items to export. Please add some items first.',
  EXPORT_CALENDAR_FAILED: 'Failed to export calendar. Please try again.',
  EXPORT_NO_DATES: 'No tasks with dates found to export to calendar.',
  
  // Template errors
  TEMPLATE_SAVE_FAILED: 'Failed to save template. Please try again.',
  TEMPLATE_LOAD_FAILED: 'Failed to load templates. Please refresh the page.',
  TEMPLATE_DELETE_FAILED: 'Failed to delete template. Please try again.',
  TEMPLATE_UPDATE_FAILED: 'Failed to update template. Please try again.',
  TEMPLATE_APPLY_FAILED: 'Failed to apply template. Please try again.',
  
  // Analytics errors
  ANALYTICS_LOAD_FAILED: 'Failed to load analytics. Please refresh the page.',
  ANALYTICS_SAVE_FAILED: 'Failed to save analytics. Your statistics may not be accurate.',
  
  // Migration errors
  MIGRATION_FAILED: 'Failed to migrate your data. Your data is safe, but some features may not work correctly.',
  MIGRATION_BACKUP_FAILED: 'Failed to create backup. Migration cancelled for safety.',
  MIGRATION_ROLLBACK_FAILED: 'Failed to rollback migration. Please refresh the page.',
  
  // Copy/Clipboard errors
  COPY_FAILED: 'Failed to copy to clipboard. Please try selecting and copying manually.',
  COPY_NOT_SUPPORTED: 'Clipboard access not supported in your browser.',
  
  // General errors
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  OPERATION_FAILED: 'Operation failed. Please try again.',
  INVALID_DATA: 'Invalid data format. Please check your input and try again.',
  
  // Session/State errors
  SESSION_EXPIRED: 'Your session has expired. Please refresh the page.',
  STATE_SYNC_FAILED: 'Failed to sync state. Some changes may not be saved.',
  
  // Browser compatibility
  BROWSER_NOT_SUPPORTED: 'Some features may not work in your browser. Please try Chrome, Edge, or Safari for the best experience.',
  INDEXEDDB_NOT_AVAILABLE: 'Advanced storage not available. Falling back to basic storage.',
} as const

export const SuccessMessages = {
  // Save operations
  SAVE_SUCCESS: 'Saved successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  
  // Recording
  RECORDING_STARTED: 'Recording started',
  RECORDING_STOPPED: 'Recording stopped',
  RECORDING_COMPLETE: 'Recording complete!',
  
  // Processing
  PROCESSING_COMPLETE: 'Processing complete!',
  CLASSIFICATION_SUCCESS: 'Items organized successfully!',
  
  // Export
  EXPORT_SUCCESS: 'Exported successfully!',
  CALENDAR_EXPORTED: 'Calendar file downloaded!',
  
  // Templates
  TEMPLATE_SAVED: 'Template saved!',
  TEMPLATE_APPLIED: 'Template applied!',
  TEMPLATE_DELETED: 'Template deleted!',
  
  // Copy
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
  
  // Migration
  MIGRATION_SUCCESS: 'Data migrated successfully!',
  
  // General
  OPERATION_SUCCESS: 'Operation completed successfully!',
} as const

/**
 * Get user-friendly error message from an Error object
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Check if it's a known error message
    const message = error.message.toLowerCase()
    
    if (message.includes('quota') || message.includes('storage')) {
      return ErrorMessages.STORAGE_QUOTA_EXCEEDED
    }
    if (message.includes('network') || message.includes('fetch')) {
      return ErrorMessages.NETWORK_ERROR
    }
    if (message.includes('permission') || message.includes('denied')) {
      return ErrorMessages.RECORDING_PERMISSION_DENIED
    }
    if (message.includes('not supported')) {
      return ErrorMessages.RECORDING_NOT_SUPPORTED
    }
    
    return error.message
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  return ErrorMessages.UNKNOWN_ERROR
}

/**
 * Format error for logging while showing user-friendly message
 */
export function handleError(error: unknown, context: string): string {
  const userMessage = getErrorMessage(error)
  console.error(`Error in ${context}:`, error)
  return userMessage
}

export type ErrorMessageKey = keyof typeof ErrorMessages
export type SuccessMessageKey = keyof typeof SuccessMessages
