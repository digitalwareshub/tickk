import '@testing-library/jest-dom'
import { AnalyticsService } from '../lib/services/analytics.service'
import type { AppData } from '../types/braindump'

describe('Analytics Service', () => {
  const mockAppData: AppData = {
    tasks: [
      {
        id: 'task-1',
        text: 'Buy groceries for dinner',
        timestamp: '2024-01-15T10:30:00.000Z',
        completed: false,
        priority: 'medium',
        source: 'braindump'
      },
      {
        id: 'task-2',
        text: 'Call mom about vacation',
        timestamp: '2024-01-15T14:20:00.000Z',
        completed: true,
        priority: 'high',
        source: 'braindump'
      }
    ],
    notes: [
      {
        id: 'note-1',
        text: 'Interesting article about productivity',
        timestamp: '2024-01-15T16:45:00.000Z',
        tags: ['productivity', 'learning'],
        source: 'braindump'
      }
    ],
    braindump: [
      {
        id: 'braindump-1',
        text: 'Buy groceries for dinner',
        timestamp: '2024-01-15T10:30:00.000Z',
        sessionId: 'session-1',
        processed: true,
        classification: {
          category: 'tasks',
          confidence: 0.85,
          reasoning: 'Contains action verb "buy"'
        },
        confidence: 0.85,
        metadata: { source: 'braindump', duration: 0, retryCount: 0 }
      },
      {
        id: 'braindump-2',
        text: 'Interesting article about productivity',
        timestamp: '2024-01-15T16:45:00.000Z',
        sessionId: 'session-2',
        processed: true,
        classification: {
          category: 'notes',
          confidence: 0.75,
          reasoning: 'Contains thought pattern'
        },
        confidence: 0.75,
        metadata: { source: 'braindump', duration: 0, retryCount: 0 }
      },
      {
        id: 'braindump-3',
        text: 'Meeting with team tomorrow at 2pm',
        timestamp: '2024-01-15T09:15:00.000Z',
        sessionId: 'session-1',
        processed: false,
        classification: {
          category: 'tasks',
          confidence: 0.90,
          reasoning: 'Contains meeting and time'
        },
        confidence: 0.90,
        metadata: { source: 'braindump', duration: 0, retryCount: 0 }
      }
    ],
    sessions: [
      {
        id: 'session-1',
        startTime: '2024-01-15T09:00:00.000Z',
        endTime: '2024-01-15T09:20:00.000Z',
        itemCount: 2,
        processed: true,
        processedAt: '2024-01-15T09:25:00.000Z',
        stats: {
          totalWords: 20,
          duration: 1200, // 20 minutes in seconds
          tasksCreated: 2,
          notesCreated: 0,
          averageConfidence: 0.875
        }
      },
      {
        id: 'session-2',
        startTime: '2024-01-15T16:40:00.000Z',
        endTime: '2024-01-15T16:50:00.000Z',
        itemCount: 1,
        processed: true,
        processedAt: '2024-01-15T16:55:00.000Z',
        stats: {
          totalWords: 8,
          duration: 600, // 10 minutes in seconds
          tasksCreated: 0,
          notesCreated: 1,
          averageConfidence: 0.75
        }
      }
    ],
    version: '3.0.0'
  }

  describe('calculateStats', () => {
    test('calculates basic statistics correctly', () => {
      const stats = AnalyticsService.calculateStats(mockAppData)

      expect(stats.totalSessions).toBe(2)
      expect(stats.totalItems).toBe(3)
      expect(stats.avgItemsPerSession).toBe(1.5) // (2 + 1) / 2
      expect(stats.avgSessionDuration).toBe(15) // (20 + 10) / 2 minutes
    })

    test('calculates organization accuracy', () => {
      const stats = AnalyticsService.calculateStats(mockAppData)
      
      // All items have confidence > 0.7, so accuracy should be 100%
      expect(stats.organizationAccuracy).toBe(100)
    })

    test('identifies most productive time', () => {
      const stats = AnalyticsService.calculateStats(mockAppData)
      
      // Items at 09:15 UTC (h9), 10:30 UTC (h10) = Morning: 2 items
      // Items at 14:20 UTC (h14), 16:45 UTC (h16) = Afternoon: 2 items
      // Should be Morning or Afternoon (whichever is found first in reduce)
      expect(stats.mostProductiveTime).toBe('Morning')
    })

    test('finds patterns in braindump text', () => {
      const stats = AnalyticsService.calculateStats(mockAppData)
      
      expect(stats.topPatterns).toBeDefined()
      expect(Array.isArray(stats.topPatterns)).toBe(true)
      
      // Should detect "Work" pattern from "meeting"
      const workPattern = stats.topPatterns.find(p => p.theme === 'Work')
      expect(workPattern).toBeDefined()
      expect(workPattern?.count).toBe(1)
    })

    test('calculates category breakdown', () => {
      const stats = AnalyticsService.calculateStats(mockAppData)
      
      expect(stats.categoryBreakdown.tasks).toBe(2)
      expect(stats.categoryBreakdown.notes).toBe(1)
      expect(stats.categoryBreakdown.tasksPercentage).toBe(67) // 2/3 * 100
      expect(stats.categoryBreakdown.notesPercentage).toBe(33) // 1/3 * 100
    })

    test('handles empty data gracefully', () => {
      const emptyData: AppData = {
        tasks: [],
        notes: [],
        braindump: [],
        sessions: [],
        version: '3.0.0'
      }

      const stats = AnalyticsService.calculateStats(emptyData)
      
      expect(stats.totalSessions).toBe(0)
      expect(stats.totalItems).toBe(0)
      expect(stats.avgItemsPerSession).toBe(0)
      expect(stats.avgSessionDuration).toBe(0)
      expect(stats.organizationAccuracy).toBe(0)
      expect(stats.topPatterns).toHaveLength(0)
    })
  })

  describe('pattern detection', () => {
    test('detects work-related patterns', () => {
      const workData: AppData = {
        ...mockAppData,
        braindump: [
          {
            id: 'work-1',
            text: 'Meeting with client tomorrow',
            timestamp: '2024-01-15T10:00:00.000Z',
            sessionId: 'session-1',
            processed: true,
            classification: { category: 'tasks', confidence: 0.9, reasoning: 'Work task' },
            confidence: 0.9,
            metadata: { source: 'braindump', duration: 0, retryCount: 0 }
          },
          {
            id: 'work-2',
            text: 'Project deadline next week',
            timestamp: '2024-01-15T11:00:00.000Z',
            sessionId: 'session-1',
            processed: true,
            classification: { category: 'tasks', confidence: 0.85, reasoning: 'Work task' },
            confidence: 0.85,
            metadata: { source: 'braindump', duration: 0, retryCount: 0 }
          }
        ]
      }

      const stats = AnalyticsService.calculateStats(workData)
      const workPattern = stats.topPatterns.find(p => p.theme === 'Work')
      
      expect(workPattern).toBeDefined()
      expect(workPattern?.count).toBe(2)
      expect(workPattern?.category).toBe('tasks')
    })

    test('detects food-related patterns', () => {
      const foodData: AppData = {
        ...mockAppData,
        braindump: [
          {
            id: 'food-1',
            text: 'Buy groceries for dinner',
            timestamp: '2024-01-15T10:00:00.000Z',
            sessionId: 'session-1',
            processed: true,
            classification: { category: 'tasks', confidence: 0.8, reasoning: 'Food task' },
            confidence: 0.8,
            metadata: { source: 'braindump', duration: 0, retryCount: 0 }
          },
          {
            id: 'food-2',
            text: 'Try that new restaurant downtown',
            timestamp: '2024-01-15T11:00:00.000Z',
            sessionId: 'session-1',
            processed: true,
            classification: { category: 'notes', confidence: 0.7, reasoning: 'Food idea' },
            confidence: 0.7,
            metadata: { source: 'braindump', duration: 0, retryCount: 0 }
          }
        ]
      }

      const stats = AnalyticsService.calculateStats(foodData)
      const foodPattern = stats.topPatterns.find(p => p.theme === 'Food')
      
      expect(foodPattern).toBeDefined()
      expect(foodPattern?.count).toBe(2)
    })
  })

  describe('productivity trends', () => {
    test('calculates hourly productivity trends', () => {
      const stats = AnalyticsService.calculateStats(mockAppData)
      
      expect(stats.productivityTrends).toBeDefined()
      expect(Array.isArray(stats.productivityTrends)).toBe(true)
      
      // Should have trends for hours with activity (9, 10, 16 from mock data)
      const activeTrends = stats.productivityTrends.filter(t => t.itemCount > 0)
      expect(activeTrends.length).toBeGreaterThan(0)
    })

    test('formats hours correctly', () => {
      const stats = AnalyticsService.calculateStats(mockAppData)
      
      const trends = stats.productivityTrends
      trends.forEach(trend => {
        expect(trend.label).toMatch(/^\d{1,2} (AM|PM)$|^12 (AM|PM)$/)
      })
    })
  })

  describe('weekly statistics', () => {
    test('groups items by week', () => {
      const stats = AnalyticsService.calculateStats(mockAppData)
      
      expect(stats.weeklyStats).toBeDefined()
      expect(Array.isArray(stats.weeklyStats)).toBe(true)
      
      // Should have at least one week of data
      expect(stats.weeklyStats.length).toBeGreaterThan(0)
      
      stats.weeklyStats.forEach(week => {
        expect(week.week).toMatch(/^\d{4}-\d{2}$/) // YYYY-WW format
        expect(week.itemCount).toBeGreaterThanOrEqual(0)
        expect(week.sessionCount).toBeGreaterThanOrEqual(0)
        expect(week.accuracy).toBeGreaterThanOrEqual(0)
        expect(week.accuracy).toBeLessThanOrEqual(100)
      })
    })
  })
})
