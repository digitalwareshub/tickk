/**
 * Analytics Service for Braindump Insights
 * Provides statistical analysis and pattern recognition for user braindump data
 * Integrated with Enhanced Analytics for user behavior tracking
 */

import type { VoiceItem, BraindumpSession, AppData } from '@/types/braindump'
import { enhancedAnalytics } from '@/lib/analytics/enhanced-analytics'

export interface BraindumpStats {
  totalSessions: number
  totalItems: number
  avgItemsPerSession: number
  avgSessionDuration: number
  organizationAccuracy: number
  mostProductiveTime: string
  topPatterns: Pattern[]
  weeklyStats: WeeklyStats[]
  categoryBreakdown: CategoryBreakdown
  productivityTrends: ProductivityTrend[]
}

export interface Pattern {
  theme: string
  count: number
  confidence: number
  category: 'tasks' | 'notes'
}

export interface WeeklyStats {
  week: string
  itemCount: number
  sessionCount: number
  accuracy: number
}

export interface CategoryBreakdown {
  tasks: number
  notes: number
  tasksPercentage: number
  notesPercentage: number
}

export interface ProductivityTrend {
  hour: number
  itemCount: number
  label: string
}

export class AnalyticsService {
  /**
   * Track user braindump behavior and patterns
   */
  static trackBraindumpUsage(appData: AppData) {
    const stats = this.calculateStats(appData);
    
    // Track user segment based on usage patterns
    const userSegment = this.identifyUserSegment(stats);
    enhancedAnalytics.identifyUserSegment(userSegment, 0.8);
    
    // Track productivity patterns
    enhancedAnalytics.trackEvent({
      action: 'productivity_analysis',
      category: 'user_behavior',
      label: 'braindump_patterns',
      custom_parameters: {
        most_productive_time: stats.mostProductiveTime,
        avg_items_per_session: stats.avgItemsPerSession,
        organization_accuracy: stats.organizationAccuracy,
        top_theme: stats.topPatterns[0]?.theme || 'none'
      }
    });
  }

  /**
   * Identify user segment based on braindump patterns
   */
  static identifyUserSegment(stats: BraindumpStats): string {
    // High frequency, short sessions = ADHD-like patterns
    if (stats.avgItemsPerSession > 8 && stats.avgSessionDuration < 3) {
      return 'adhd_focused';
    }
    
    // Work-related patterns during business hours
    if (stats.topPatterns.some(p => p.theme === 'Work') && stats.mostProductiveTime === 'Afternoon') {
      return 'professional';
    }
    
    // Learning patterns
    if (stats.topPatterns.some(p => p.theme === 'Learning')) {
      return 'student';
    }
    
    // Creative patterns
    if (stats.topPatterns.some(p => p.theme === 'Creative')) {
      return 'creative';
    }
    
    // Family/Home patterns
    if (stats.topPatterns.some(p => ['Family', 'Home', 'Social'].includes(p.theme))) {
      return 'parent';
    }
    
    return 'general';
  }

  /**
   * Track voice recording events
   */
  static trackVoiceRecording(duration: number, wordCount: number, classification: string) {
    enhancedAnalytics.trackEvent({
      action: 'voice_recording',
      category: 'core_feature',
      label: classification,
      value: Math.round(duration),
      custom_parameters: {
        recording_duration: duration,
        word_count: wordCount,
        words_per_second: wordCount / duration,
        classification_result: classification
      }
    });
  }

  /**
   * Track organization events
   */
  static trackOrganization(itemCount: number, accuracy: number, timeSpent: number) {
    enhancedAnalytics.trackEvent({
      action: 'organization_session',
      category: 'core_feature',
      label: 'braindump_to_organized',
      value: itemCount,
      custom_parameters: {
        items_organized: itemCount,
        organization_accuracy: accuracy,
        time_spent_organizing: timeSpent,
        items_per_minute: itemCount / (timeSpent / 60000)
      }
    });
  }

  /**
   * Calculate comprehensive analytics from app data
   */
  static calculateStats(appData: AppData): BraindumpStats {
    const { braindump, sessions, tasks, notes } = appData
    
    // Combine all items for time analysis
    const allItems = [...braindump, ...tasks, ...notes]
    
    return {
      totalSessions: sessions.length,
      totalItems: braindump.length,
      avgItemsPerSession: this.calculateAvgItemsPerSession(sessions),
      avgSessionDuration: this.calculateAvgDuration(sessions),
      organizationAccuracy: this.calculateAccuracy(braindump),
      mostProductiveTime: this.findMostProductiveTime(sessions, allItems),
      topPatterns: this.findPatterns(braindump),
      weeklyStats: this.calculateWeeklyStats(sessions, braindump),
      categoryBreakdown: this.calculateCategoryBreakdown(tasks, notes),
      productivityTrends: this.calculateProductivityTrends(allItems)
    }
  }

  /**
   * Calculate average items per session
   */
  private static calculateAvgItemsPerSession(sessions: BraindumpSession[]): number {
    if (sessions.length === 0) return 0
    
    const totalItems = sessions.reduce((sum, session) => sum + session.itemCount, 0)
    return Math.round((totalItems / sessions.length) * 10) / 10
  }

  /**
   * Calculate average session duration in minutes
   */
  private static calculateAvgDuration(sessions: BraindumpSession[]): number {
    const completedSessions = sessions.filter(s => s.endTime && s.stats?.duration)
    if (completedSessions.length === 0) return 0
    
    const totalDuration = completedSessions.reduce((sum, session) => 
      sum + (session.stats?.duration || 0), 0
    )
    
    return Math.round((totalDuration / completedSessions.length) / 60 * 10) / 10 // Convert to minutes
  }

  /**
   * Calculate organization accuracy percentage
   */
  private static calculateAccuracy(items: VoiceItem[]): number {
    const classifiedItems = items.filter(item => item.classification && item.confidence)
    if (classifiedItems.length === 0) return 0
    
    const highConfidenceItems = classifiedItems.filter(item => 
      (item.confidence || 0) > 0.7
    )
    
    return Math.round((highConfidenceItems.length / classifiedItems.length) * 100)
  }

  /**
   * Find most productive time of day
   */
  private static findMostProductiveTime(sessions: BraindumpSession[], items: VoiceItem[]): string {
    const timeSlotCounts = {
      Morning: 0,   // 5-11
      Afternoon: 0, // 12-16
      Evening: 0,   // 17-20
      Night: 0      // 21-4
    }
    
    items.forEach(item => {
      const hour = new Date(item.timestamp).getUTCHours()
      if (hour >= 5 && hour < 12) timeSlotCounts.Morning++
      else if (hour >= 12 && hour < 17) timeSlotCounts.Afternoon++
      else if (hour >= 17 && hour < 21) timeSlotCounts.Evening++
      else timeSlotCounts.Night++
    })
    
    const maxTimeSlot = Object.entries(timeSlotCounts)
      .reduce((max, [timeSlot, count]) => 
        count > max.count ? { timeSlot, count } : max, 
        { timeSlot: 'Morning', count: 0 }
      )
    
    return maxTimeSlot.timeSlot
  }

  /**
   * Extract common patterns and themes
   */
  private static findPatterns(items: VoiceItem[]): Pattern[] {
    const themes: Record<string, { count: number; category: 'tasks' | 'notes'; confidenceSum: number }> = {}
    
    // Common theme patterns
    const themePatterns = [
      { pattern: /\b(work|job|office|meeting|deadline|project|client)\b/i, theme: 'Work' },
      { pattern: /\b(grocery|groceries|food|cooking|restaurant|eat|meal)\b/i, theme: 'Food' },
      { pattern: /\b(exercise|gym|workout|run|fitness|health)\b/i, theme: 'Health' },
      { pattern: /\b(family|mom|dad|parent|child|kids|spouse)\b/i, theme: 'Family' },
      { pattern: /\b(travel|trip|vacation|flight|hotel|book)\b/i, theme: 'Travel' },
      { pattern: /\b(money|budget|pay|bill|expense|finance)\b/i, theme: 'Finance' },
      { pattern: /\b(learn|study|course|skill|education|read)\b/i, theme: 'Learning' },
      { pattern: /\b(idea|innovation|creative|design|art)\b/i, theme: 'Creative' },
      { pattern: /\b(home|house|clean|repair|fix|maintenance)\b/i, theme: 'Home' },
      { pattern: /\b(friend|social|party|event|birthday)\b/i, theme: 'Social' }
    ]
    
    items.forEach(item => {
      if (!item.classification) return
      
      themePatterns.forEach(({ pattern, theme }) => {
        if (pattern.test(item.text)) {
          if (!themes[theme]) {
            themes[theme] = { 
              count: 0, 
              category: item.classification!.category, 
              confidenceSum: 0 
            }
          }
          themes[theme].count++
          themes[theme].confidenceSum += (item.confidence || 0.5)
        }
      })
    })
    
    return Object.entries(themes)
      .map(([theme, data]) => ({
        theme,
        count: data.count,
        confidence: Math.round((data.confidenceSum / data.count) * 100) / 100,
        category: data.category
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8) // Top 8 patterns
  }

  /**
   * Calculate weekly statistics
   */
  private static calculateWeeklyStats(sessions: BraindumpSession[], items: VoiceItem[]): WeeklyStats[] {
    const weeks: Record<string, { itemCount: number; sessionCount: number; accuracySum: number }> = {}
    
    // Group by week
    sessions.forEach(session => {
      const weekKey = this.getWeekKey(new Date(session.startTime))
      if (!weeks[weekKey]) {
        weeks[weekKey] = { itemCount: 0, sessionCount: 0, accuracySum: 0 }
      }
      weeks[weekKey].sessionCount++
      weeks[weekKey].itemCount += session.itemCount
    })
    
    // Add accuracy data from items
    items.forEach(item => {
      const weekKey = this.getWeekKey(new Date(item.timestamp))
      if (weeks[weekKey] && item.confidence) {
        // Ensure confidence is treated as decimal (0-1), not percentage
        const confidenceValue = item.confidence > 1 ? item.confidence / 100 : item.confidence
        weeks[weekKey].accuracySum += confidenceValue
      }
    })
    
    return Object.entries(weeks)
      .map(([week, data]) => ({
        week,
        itemCount: data.itemCount,
        sessionCount: data.sessionCount,
        accuracy: data.itemCount > 0 ? (data.accuracySum / data.itemCount) : 0  // Return as decimal (0-1)
      }))
      .sort((a, b) => a.week.localeCompare(b.week))
      .slice(-8) // Last 8 weeks
  }

  /**
   * Calculate category breakdown
   */
  private static calculateCategoryBreakdown(tasks: VoiceItem[], notes: VoiceItem[]): CategoryBreakdown {
    const totalItems = tasks.length + notes.length
    
    return {
      tasks: tasks.length,
      notes: notes.length,
      tasksPercentage: totalItems > 0 ? Math.round((tasks.length / totalItems) * 100) : 0,
      notesPercentage: totalItems > 0 ? Math.round((notes.length / totalItems) * 100) : 0
    }
  }

  /**
   * Calculate productivity trends by hour
   */
  private static calculateProductivityTrends(items: VoiceItem[]): ProductivityTrend[] {
    const hourCounts: Record<number, number> = {}
    
    items.forEach(item => {
      const hour = new Date(item.timestamp).getUTCHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })
    
    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      itemCount: hourCounts[hour] || 0,
      label: this.formatHour(hour)
    })).filter(trend => trend.itemCount > 0)
  }

  /**
   * Get week key for grouping (YYYY-WW format)
   */
  private static getWeekKey(date: Date): string {
    const year = date.getFullYear()
    const startOfYear = new Date(year, 0, 1)
    const weekNumber = Math.ceil(((date.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7)
    return `${year}-${weekNumber.toString().padStart(2, '0')}`
  }

  /**
   * Format hour for display
   */
  private static formatHour(hour: number): string {
    if (hour === 0) return '12 AM'
    if (hour < 12) return `${hour} AM`
    if (hour === 12) return '12 PM'
    return `${hour - 12} PM`
  }
}
