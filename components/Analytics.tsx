/**
 * Analytics Component - Phase 7 Implementation
 * Comprehensive braindump analytics and insights dashboard
 */

import { useState, useEffect, useCallback } from 'react'
import { AnalyticsService, type BraindumpStats } from '@/lib/services/analytics.service'
import StatCard from './StatCard'
import type { AppData } from '@/types/braindump'

interface AnalyticsProps {
  appData: AppData
}

export default function Analytics({ appData }: AnalyticsProps) {
  const [stats, setStats] = useState<BraindumpStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month')

  const loadStats = useCallback(async () => {
    setLoading(true)
    try {
      // Calculate comprehensive stats
      const analyticsStats = AnalyticsService.calculateStats(appData)
      setStats(analyticsStats)
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [appData])

  useEffect(() => {
    loadStats()
  }, [loadStats, timeRange])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading insights...</span>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          No data available for analysis
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics & Insights
        </h2>
        <div className="flex space-x-2">
          {(['week', 'month', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {range === 'all' ? 'All Time' : `Last ${range.charAt(0).toUpperCase() + range.slice(1)}`}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Sessions"
          value={stats.totalSessions}
          trend="neutral"
          icon="📝"
        />
        <StatCard
          label="Total Items"
          value={stats.totalItems}
          trend="neutral"
          icon="�"
        />
        <StatCard
          label="Avg Items/Session"
          value={stats.avgItemsPerSession.toFixed(1)}
          trend="neutral"
          icon="📊"
        />
        <StatCard
          label="Organization Accuracy"
          value={`${Math.round(stats.organizationAccuracy * 100)}%`}
          trend={stats.organizationAccuracy > 0.8 ? 'up' : stats.organizationAccuracy > 0.6 ? 'neutral' : 'down'}
          icon="🎯"
        />
      </div>

      {/* Category Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Category Breakdown
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600 dark:text-gray-400 capitalize">
              Tasks
            </div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.categoryBreakdown.tasksPercentage}%` }}
                />
              </div>
            </div>
            <div className="w-16 text-sm text-gray-600 dark:text-gray-400 text-right">
              {stats.categoryBreakdown.tasks} ({stats.categoryBreakdown.tasksPercentage.toFixed(1)}%)
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600 dark:text-gray-400 capitalize">
              Notes
            </div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.categoryBreakdown.notesPercentage}%` }}
                />
              </div>
            </div>
            <div className="w-16 text-sm text-gray-600 dark:text-gray-400 text-right">
              {stats.categoryBreakdown.notes} ({stats.categoryBreakdown.notesPercentage.toFixed(1)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Productivity Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Productivity by Time of Day
        </h3>
        <div className="text-center mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Most Productive Time: <span className="font-semibold">{stats.mostProductiveTime}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {stats.productivityTrends.map((trend) => (
            <div key={trend.hour} className="text-center">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {trend.itemCount}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {trend.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Patterns */}
      {stats.topPatterns && stats.topPatterns.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Patterns Detected
          </h3>
          <div className="space-y-3">
            {stats.topPatterns.slice(0, 5).map((pattern, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {pattern.theme}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Category: {pattern.category} • Confidence: {Math.round(pattern.confidence * 100)}%
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {pattern.count} occurrences
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Performance */}
      {stats.weeklyStats && stats.weeklyStats.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Weekly Performance
          </h3>
          <div className="space-y-3">
            {stats.weeklyStats.map((week, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Week of {week.week}
                </div>
                <div className="flex space-x-4 text-sm">
                  <span className="text-blue-600 dark:text-blue-400">
                    {week.itemCount} items
                  </span>
                  <span className="text-green-600 dark:text-green-400">
                    {week.sessionCount} sessions
                  </span>
                  <span className="text-purple-600 dark:text-purple-400">
                    {Math.round(week.accuracy * 100)}% accuracy
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}