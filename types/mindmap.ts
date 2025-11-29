/**
 * Mind Map Type Definitions
 * For visualizing tasks/notes over time periods
 */

import type { VoiceItem } from './braindump'

export type TimeframePeriod = '1week' | '1month' | '3months' | '6months' | '1year' | 'custom'

export interface MindMapConfig {
  timeframe: TimeframePeriod
  startDate: string  // ISO string
  endDate: string    // ISO string
  includeDeleted?: boolean  // If soft-delete is implemented
  groupBy: 'category' | 'project' | 'tag' | 'priority' | 'date'
  showCompleted?: boolean
  showActive?: boolean
}

export interface MindMapNode {
  id: string
  label: string
  type: 'root' | 'category' | 'project' | 'tag' | 'item' | 'timespan'
  value: number  // Count or metric
  children?: MindMapNode[]
  metadata?: {
    color?: string
    icon?: string
    description?: string
    trend?: 'up' | 'down' | 'stable'
    percentage?: number
  }
  items?: VoiceItem[]  // Actual items in this node
}

export interface MindMapData {
  config: MindMapConfig
  rootNode: MindMapNode
  stats: MindMapStats
  insights: MindMapInsight[]
}

export interface MindMapStats {
  // Creation stats
  totalCreated: number
  tasksCreated: number
  notesCreated: number
  
  // Current state (what still exists)
  stillActive: number
  completedCount: number
  
  // Estimated deleted (created - stillActive - completed)
  estimatedDeleted: number
  
  // Breakdown by time
  dailyAverage: number
  weeklyAverage: number
  peakDay?: {
    date: string
    count: number
  }
  
  // Category breakdown
  categoryDistribution: Record<string, number>
  
  // Tag/Project analysis
  topTags: Array<{ tag: string; count: number }>
  topProjects: Array<{ project: string; count: number }>
  
  // Completion metrics
  completionRate: number  // completed / (completed + active)
  avgCompletionTime?: number  // hours from creation to completion
}

export interface MindMapInsight {
  type: 'trend' | 'pattern' | 'anomaly' | 'achievement'
  title: string
  description: string
  confidence: number  // 0-1
  data?: any
}

/**
 * Analytics snapshot for historical tracking
 * Store these periodically to maintain history even after deletions
 */
export interface AnalyticsSnapshot {
  id: string
  timestamp: string  // When snapshot was taken
  period: 'daily' | 'weekly' | 'monthly'
  
  // Counts at time of snapshot
  tasksActive: number
  tasksCompleted: number
  notesActive: number
  
  // Activity metrics
  tasksCreatedToday: number
  tasksCompletedToday: number
  notesCreatedToday: number
  
  // Distribution
  categoryBreakdown: Record<string, number>
  priorityBreakdown: Record<string, number>
  tagCloud: Record<string, number>
  projectBreakdown: Record<string, number>
}

/**
 * Time-based filtering utilities
 */
export interface TimeRange {
  start: Date
  end: Date
  label: string
}

export const TIMEFRAME_PRESETS: Record<TimeframePeriod, (from?: Date) => TimeRange> = {
  '1week': (from = new Date()) => ({
    start: new Date(from.getTime() - 7 * 24 * 60 * 60 * 1000),
    end: from,
    label: 'Last 7 days'
  }),
  '1month': (from = new Date()) => ({
    start: new Date(from.getFullYear(), from.getMonth() - 1, from.getDate()),
    end: from,
    label: 'Last 30 days'
  }),
  '3months': (from = new Date()) => ({
    start: new Date(from.getFullYear(), from.getMonth() - 3, from.getDate()),
    end: from,
    label: 'Last 3 months'
  }),
  '6months': (from = new Date()) => ({
    start: new Date(from.getFullYear(), from.getMonth() - 6, from.getDate()),
    end: from,
    label: 'Last 6 months'
  }),
  '1year': (from = new Date()) => ({
    start: new Date(from.getFullYear() - 1, from.getMonth(), from.getDate()),
    end: from,
    label: 'Last 12 months'
  }),
  'custom': (from = new Date()) => ({
    start: from,
    end: new Date(),
    label: 'Custom range'
  })
}
