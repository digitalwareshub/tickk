/**
 * Accessibility Announcer Service
 * Manages screen reader announcements and ARIA live regions with configurable settings
 */

export interface AnnouncerConfig {
  defaultTimeout: number
  progressTimeout: number
  announcementDelay: number
  respectReducedMotion: boolean
  enableAnnouncements: boolean
  customTimeouts: {
    [key: string]: number
  }
}

export class AccessibilityAnnouncer {
  private static instance: AccessibilityAnnouncer
  private config: AnnouncerConfig
  private reducedMotionPreference: boolean
  
  constructor() {
    this.config = this.loadConfig()
    this.reducedMotionPreference = this.detectReducedMotion()
  }
  
  static getInstance(): AccessibilityAnnouncer {
    if (!this.instance) {
      this.instance = new AccessibilityAnnouncer()
    }
    return this.instance
  }
  
  // Reset instance for testing
  static resetInstance(): void {
    this.instance = undefined as unknown as AccessibilityAnnouncer
  }
  
  // Configuration management
  private loadConfig(): AnnouncerConfig {
    const defaultConfig: AnnouncerConfig = {
      defaultTimeout: 3000, // Increased from 2000ms for better accessibility
      progressTimeout: 1500,
      announcementDelay: 100,
      respectReducedMotion: true,
      enableAnnouncements: true,
      customTimeouts: {
        'recording-status': 2000,
        'progress-update': 1500,
        'error-message': 4000,
        'success-message': 2500
      }
    }

    try {
      const saved = localStorage.getItem('tickk_announcer_config')
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...defaultConfig, ...parsed }
      }
    } catch (error) {
      console.warn('Failed to load announcer config:', error)
    }
    
    return defaultConfig
  }

  private detectReducedMotion(): boolean {
    if (typeof window === 'undefined') return false
    
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      return false
    }
  }

  private getTimeoutForMessage(message: string, type?: string): number {
    if (this.reducedMotionPreference && this.config.respectReducedMotion) {
      return Math.min(this.config.defaultTimeout, 2000) // Shorter timeouts for reduced motion
    }

    if (type && this.config.customTimeouts[type]) {
      return this.config.customTimeouts[type]
    }

    return this.config.defaultTimeout
  }

  // Public configuration methods
  updateConfig(newConfig: Partial<AnnouncerConfig>): void {
    this.config = { ...this.config, ...newConfig }
    try {
      localStorage.setItem('tickk_announcer_config', JSON.stringify(this.config))
    } catch (error) {
      console.warn('Failed to save announcer config:', error)
    }
  }

  getConfig(): AnnouncerConfig {
    return { ...this.config }
  }

  testAnnouncement(message: string = 'Test announcement'): void {
    this.announce(message, 'polite', 'test')
  }

  // Enhanced announce method with configurable timeouts
  announce(message: string, priority: 'polite' | 'assertive' = 'polite', type?: string) {
    if (!this.config.enableAnnouncements || !message.trim()) {
      return
    }

    const element = document.getElementById(`live-${priority}`)
    if (!element) {
      console.warn(`Live region element not found: live-${priority}`)
      return
    }

    const timeout = this.getTimeoutForMessage(message, type)
    
    // Clear and set to ensure announcement
    element.textContent = ''
    setTimeout(() => {
      element.textContent = message
    }, this.config.announcementDelay)
    
    // Clear after configurable timeout
    setTimeout(() => {
      element.textContent = ''
    }, timeout)
  }
  
  // Announce recording status
  announceRecordingStatus(status: 'started' | 'stopped' | 'listening') {
    const messages = {
      started: 'Recording started. Speak now.',
      stopped: 'Recording stopped. Processing your speech.',
      listening: 'Listening...'
    }
    
    this.announce(messages[status], 'assertive', 'recording-status')
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
    const announcementType = action.includes('processing') ? 'progress-update' : 
                           action.includes('complete') ? 'success-message' : 
                           action.includes('error') ? 'error-message' : undefined
    
    this.announce(message, action.includes('start') ? 'assertive' : 'polite', announcementType)
  }
  
  // Announce progress
  announceProgress(current: number, total: number, label: string = 'Processing') {
    const element = document.getElementById('processing-progress')
    if (element) {
      element.setAttribute('aria-valuenow', current.toString())
      element.setAttribute('aria-valuemax', total.toString())
      element.setAttribute('aria-valuetext', `${label}: ${current} of ${total}`)
    }
    
    this.announce(`${label}: ${current} of ${total}`, 'polite', 'progress-update')
  }
}
