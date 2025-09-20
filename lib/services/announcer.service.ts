/**
 * Accessibility Announcer Service
 * Manages screen reader announcements and ARIA live regions
 */

export class AccessibilityAnnouncer {
  private static instance: AccessibilityAnnouncer
  
  static getInstance(): AccessibilityAnnouncer {
    if (!this.instance) {
      this.instance = new AccessibilityAnnouncer()
    }
    return this.instance
  }
  
  // Announce general updates
  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const element = document.getElementById(`live-${priority}`)
    if (element) {
      // Clear and set to ensure announcement
      element.textContent = ''
      setTimeout(() => {
        element.textContent = message
      }, 100)
      
      // Clear after announcement
      setTimeout(() => {
        element.textContent = ''
      }, 2000)
    }
  }
  
  // Announce recording status
  announceRecordingStatus(status: 'started' | 'stopped' | 'listening') {
    const messages = {
      started: 'Recording started. Speak now.',
      stopped: 'Recording stopped. Processing your speech.',
      listening: 'Listening...'
    }
    
    this.announce(messages[status], 'assertive')
  }
  
  // Announce braindump actions
  announceBraindumpAction(action: string, details?: Record<string, unknown>) {
    const messages: Record<string, string> = {
      'item-added': `Thought captured. Total: ${details?.count} items`,
      'session-started': 'Braindump session started. Just speak freely.',
      'session-ended': `Session ended. ${details?.count} thoughts captured.`,
      'processing-start': `Processing ${details?.count} thoughts...`,
      'processing-item': `Processing: ${details?.current} of ${details?.total}`,
      'processing-complete': `All organized! ${details?.tasks} tasks, ${details?.notes} notes.`,
      'category-changed': `Changed to ${details?.category}`,
      'item-deleted': 'Item removed',
      'all-cleared': 'All items cleared'
    }
    
    const message = messages[action] || action
    this.announce(message, action.includes('start') ? 'assertive' : 'polite')
  }
  
  // Announce progress
  announceProgress(current: number, total: number, label: string = 'Processing') {
    const element = document.getElementById('processing-progress')
    if (element) {
      element.setAttribute('aria-valuenow', current.toString())
      element.setAttribute('aria-valuemax', total.toString())
      element.setAttribute('aria-valuetext', `${label}: ${current} of ${total}`)
    }
    
    this.announce(`${label}: ${current} of ${total}`, 'polite')
  }
}
