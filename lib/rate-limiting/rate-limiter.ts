/**
 * Rate Limiting System - Phase 6 Implementation
 * Controls recording frequency, duration, and session quotas
 */

export interface RateLimitConfig {
  maxRecordingLength: number  // Milliseconds
  minTimeBetween: number      // Milliseconds between recordings
  maxPerSession: number       // Max items per braindump session
  maxPerHour: number         // Max items per hour
  maxPerDay: number          // Max items per day
}

export interface RateLimitHistory {
  timestamp: number
  duration: number
  mode: 'braindump' | 'organized'
  sessionId?: string
}

export interface RateLimitStatus {
  canRecord: boolean
  reason?: string
  waitTime?: number
  usage: {
    currentSession: number
    lastHour: number
    lastDay: number
  }
}

export class RateLimiter {
  private static instance: RateLimiter
  private history: RateLimitHistory[] = []
  
  private readonly limits: Record<'braindump' | 'organized', RateLimitConfig> = {
    braindump: {
      maxRecordingLength: 180_000, // 3 minutes
      minTimeBetween: 500,         // 0.5 seconds
      maxPerSession: 100,          // Max items per session
      maxPerHour: 500,            // High limit for braindump
      maxPerDay: 2000             // Daily limit
    },
    organized: {
      maxRecordingLength: 60_000,  // 1 minute
      minTimeBetween: 1_000,       // 1 second
      maxPerSession: 50,           // Lower for organized mode
      maxPerHour: 200,            // More conservative
      maxPerDay: 1000             // Daily limit
    }
  }
  
  static getInstance(): RateLimiter {
    if (!this.instance) {
      this.instance = new RateLimiter()
      this.instance.loadHistory()
    }
    return this.instance
  }
  
  /**
   * Check if recording is allowed
   */
  canRecord(mode: 'braindump' | 'organized', sessionId?: string): RateLimitStatus {
    const limits = this.limits[mode]
    const now = Date.now()
    
    // Clean old history (older than 24 hours)
    this.cleanHistory()
    
    // Check time since last recording
    const lastRecording = this.getLastRecording()
    if (lastRecording && (now - lastRecording.timestamp) < limits.minTimeBetween) {
      return {
        canRecord: false,
        reason: 'Too soon since last recording',
        waitTime: limits.minTimeBetween - (now - lastRecording.timestamp),
        usage: this.getUsageStats(sessionId)
      }
    }
    
    // Check session limits
    if (sessionId) {
      const sessionCount = this.getSessionCount(sessionId)
      if (sessionCount >= limits.maxPerSession) {
        return {
          canRecord: false,
          reason: `Session limit reached (${limits.maxPerSession} items)`,
          usage: this.getUsageStats(sessionId)
        }
      }
    }
    
    // Check hourly limits
    const hourCount = this.getHourlyCount()
    if (hourCount >= limits.maxPerHour) {
      return {
        canRecord: false,
        reason: `Hourly limit reached (${limits.maxPerHour} recordings)`,
        usage: this.getUsageStats(sessionId)
      }
    }
    
    // Check daily limits
    const dayCount = this.getDailyCount()
    if (dayCount >= limits.maxPerDay) {
      return {
        canRecord: false,
        reason: `Daily limit reached (${limits.maxPerDay} recordings)`,
        usage: this.getUsageStats(sessionId)
      }
    }
    
    return {
      canRecord: true,
      usage: this.getUsageStats(sessionId)
    }
  }
  
  /**
   * Record a new recording session
   */
  recordSession(mode: 'braindump' | 'organized', duration: number, sessionId?: string): void {
    const record: RateLimitHistory = {
      timestamp: Date.now(),
      duration,
      mode,
      sessionId
    }
    
    this.history.push(record)
    this.saveHistory()
  }
  
  /**
   * Get maximum allowed recording length for mode
   */
  getMaxRecordingLength(mode: 'braindump' | 'organized'): number {
    return this.limits[mode].maxRecordingLength
  }
  
  /**
   * Get minimum time between recordings
   */
  getMinTimeBetween(mode: 'braindump' | 'organized'): number {
    return this.limits[mode].minTimeBetween
  }
  
  /**
   * Get usage statistics
   */
  getUsageStats(sessionId?: string): { currentSession: number; lastHour: number; lastDay: number } {
    const now = Date.now()
    const oneHour = 60 * 60 * 1000
    const oneDay = 24 * oneHour
    
    return {
      currentSession: sessionId ? this.getSessionCount(sessionId) : 0,
      lastHour: this.history.filter(h => now - h.timestamp < oneHour).length,
      lastDay: this.history.filter(h => now - h.timestamp < oneDay).length
    }
  }
  
  /**
   * Reset session limits (for new session)
   */
  resetSessionLimits(): void {
    // Keep history but allow new session to start fresh
    // This is automatically handled by sessionId tracking
  }
  
  /**
   * Get rate limit info for UI display
   */
  getLimitInfo(mode: 'braindump' | 'organized'): RateLimitConfig {
    return { ...this.limits[mode] }
  }
  
  /**
   * Private methods
   */
  private loadHistory(): void {
    try {
      const stored = localStorage.getItem('tickk_rate_limit_history')
      if (stored) {
        this.history = JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load rate limit history:', error)
      this.history = []
    }
  }
  
  private saveHistory(): void {
    try {
      localStorage.setItem('tickk_rate_limit_history', JSON.stringify(this.history))
    } catch (error) {
      console.warn('Failed to save rate limit history:', error)
    }
  }
  
  private cleanHistory(): void {
    const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000)
    this.history = this.history.filter(record => record.timestamp > twentyFourHoursAgo)
    this.saveHistory()
  }
  
  private getLastRecording(): RateLimitHistory | null {
    if (this.history.length === 0) return null
    return this.history[this.history.length - 1]
  }
  
  private getSessionCount(sessionId: string): number {
    return this.history.filter(h => h.sessionId === sessionId).length
  }
  
  private getHourlyCount(): number {
    const oneHourAgo = Date.now() - (60 * 60 * 1000)
    return this.history.filter(h => h.timestamp > oneHourAgo).length
  }
  
  private getDailyCount(): number {
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000)
    return this.history.filter(h => h.timestamp > oneDayAgo).length
  }
  
  /**
   * Emergency rate limit bypass (for debugging/admin)
   */
  bypassLimits(): void {
    if (process.env.NODE_ENV === 'development') {
      this.history = []
      this.saveHistory()
      console.warn('Rate limits bypassed (development mode only)')
    }
  }
  
  /**
   * Get detailed analytics
   */
  getAnalytics(): {
    totalRecordings: number
    averageDuration: number
    busiestHour: string
    modeDistribution: Record<string, number>
    recentTrends: Array<{ date: string; count: number }>
  } {
    if (this.history.length === 0) {
      return {
        totalRecordings: 0,
        averageDuration: 0,
        busiestHour: 'No data',
        modeDistribution: {},
        recentTrends: []
      }
    }
    
    // Calculate average duration
    const avgDuration = this.history.reduce((sum, h) => sum + h.duration, 0) / this.history.length
    
    // Find busiest hour
    const hourCounts: Record<number, number> = {}
    this.history.forEach(h => {
      const hour = new Date(h.timestamp).getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })
    
    const busiestHour = Object.entries(hourCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '0'
    
    // Mode distribution
    const modeDistribution: Record<string, number> = {}
    this.history.forEach(h => {
      modeDistribution[h.mode] = (modeDistribution[h.mode] || 0) + 1
    })
    
    // Recent trends (last 7 days)
    const recentTrends: Array<{ date: string; count: number }> = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
      const dayEnd = dayStart + (24 * 60 * 60 * 1000)
      
      const count = this.history.filter(h => h.timestamp >= dayStart && h.timestamp < dayEnd).length
      recentTrends.push({ date: dateStr, count })
    }
    
    return {
      totalRecordings: this.history.length,
      averageDuration: Math.round(avgDuration),
      busiestHour: `${busiestHour}:00`,
      modeDistribution,
      recentTrends
    }
  }
}
