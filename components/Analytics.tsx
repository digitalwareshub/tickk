/**
 * Analytics Component - Phase 7 Implementation
 * Comprehensive braindump analytics and insights dashboard
 */

import { useState, useEffect, useCallback } from 'react'
import { AnalyticsService, type BraindumpStats } from '@/lib/services/analytics.service'
import StatCard from './StatCard'
import ActivityHeatmap from './ActivityHeatmap'
import ProductivityChart from './ProductivityChart'
import StreakTracker from './StreakTracker'
import { useLanguage } from '@/contexts/LanguageContext'
import type { AppData } from '@/types/braindump'

interface AnalyticsProps {
  appData: AppData
}

export default function Analytics({ appData }: AnalyticsProps) {
  const { t } = useLanguage()
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

  // Calculate heatmap data
  const getHeatmapData = () => {
    const allItems = [...appData.tasks, ...appData.notes]
    const heatmapData: { day: string; hour: number; count: number }[] = []
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    allItems.forEach(item => {
      const date = new Date(item.timestamp)
      const day = days[date.getDay()]
      const hour = date.getHours()

      const existing = heatmapData.find(d => d.day === day && d.hour === hour)
      if (existing) {
        existing.count++
      } else {
        heatmapData.push({ day, hour, count: 1 })
      }
    })

    const maxCount = Math.max(...heatmapData.map(d => d.count), 1)
    return { data: heatmapData, maxCount }
  }

  // Calculate productivity chart data (last 7 days)
  const getProductivityData = () => {
    const last7Days = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)

      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)

      const dayTasks = appData.tasks.filter(task => {
        const taskDate = new Date(task.timestamp)
        return taskDate >= date && taskDate < nextDay
      })

      const completed = dayTasks.filter(t => t.completed).length
      const total = dayTasks.length

      last7Days.push({
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed,
        total
      })
    }

    return last7Days
  }

  // Calculate streak data
  const getStreakData = () => {
    const allItems = [...appData.tasks, ...appData.notes, ...appData.braindump]
    const activeDates = new Set<string>()

    allItems.forEach(item => {
      const dateStr = new Date(item.timestamp).toISOString().split('T')[0]
      activeDates.add(dateStr)
    })

    const sortedDates = Array.from(activeDates).sort()

    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0

    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    // Calculate current streak
    if (activeDates.has(today) || activeDates.has(yesterday)) {
      const checkDate = new Date(activeDates.has(today) ? today : yesterday)
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0]
        if (activeDates.has(dateStr)) {
          currentStreak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else {
          break
        }
      }
    }

    // Calculate longest streak
    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0 || new Date(sortedDates[i]).getTime() - new Date(sortedDates[i - 1]).getTime() === 86400000) {
        tempStreak++
        longestStreak = Math.max(longestStreak, tempStreak)
      } else {
        tempStreak = 1
      }
    }

    return {
      currentStreak,
      longestStreak,
      activeDays: sortedDates
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 ">Loading insights...</span>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 ">
          No data available for analysis
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 ">
          {t('analytics.title')}
        </h2>
        <div className="flex space-x-2">
          {(['week', 'month', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300   '
              }`}
            >
              {t(`analytics.time_range.${range}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label={t('analytics.stats.total_sessions')}
          value={stats.totalSessions}
          trend="neutral"
          icon="📝"
        />
        <StatCard
          label={t('analytics.stats.total_items')}
          value={stats.totalItems}
          trend="neutral"
          icon="�"
        />
        <StatCard
          label={t('analytics.stats.avg_items_per_session')}
          value={stats.avgItemsPerSession.toFixed(1)}
          trend="neutral"
          icon="📊"
        />
        <StatCard
          label={t('analytics.stats.organization_accuracy')}
          value={`${Math.round(stats.organizationAccuracy)}%`}
          trend={stats.organizationAccuracy > 80 ? 'up' : stats.organizationAccuracy > 60 ? 'neutral' : 'down'}
          icon="🎯"
        />
      </div>

      {/* Category Distribution */}
      <div className="bg-white  rounded-lg border border-gray-200  p-6">
        <h3 className="text-lg font-semibold text-gray-900  mb-4">
          {t('analytics.category_breakdown')}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600  capitalize">
              {t('analytics.categories.tasks')}
            </div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200  rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.categoryBreakdown.tasksPercentage}%` }}
                />
              </div>
            </div>
            <div className="w-16 text-sm text-gray-600  text-right">
              {stats.categoryBreakdown.tasks} ({stats.categoryBreakdown.tasksPercentage.toFixed(1)}%)
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600  capitalize">
              {t('analytics.categories.notes')}
            </div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200  rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.categoryBreakdown.notesPercentage}%` }}
                />
              </div>
            </div>
            <div className="w-16 text-sm text-gray-600  text-right">
              {stats.categoryBreakdown.notes} ({stats.categoryBreakdown.notesPercentage.toFixed(1)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Productivity Trends */}
      <div className="bg-white  rounded-lg border border-gray-200  p-6">
        <h3 className="text-lg font-semibold text-gray-900  mb-4">
          {t('analytics.productivity_by_time')}
        </h3>
        <div className="text-center mb-4">
          <div className="text-sm text-gray-600 ">
            {t('analytics.most_productive_time')}: <span className="font-semibold">{stats.mostProductiveTime}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {stats.productivityTrends.map((trend) => (
            <div key={trend.hour} className="text-center">
              <div className="text-lg font-bold text-blue-600 ">
                {trend.itemCount}
              </div>
              <div className="text-xs text-gray-600 ">
                {trend.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Patterns */}
      {stats.topPatterns && stats.topPatterns.length > 0 && (
        <div className="bg-white  rounded-lg border border-gray-200  p-6">
          <h3 className="text-lg font-semibold text-gray-900  mb-4">
            Top Patterns Detected
          </h3>
          <div className="space-y-3">
            {stats.topPatterns.slice(0, 5).map((pattern, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100  last:border-b-0">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 ">
                    {pattern.theme}
                  </div>
                  <div className="text-xs text-gray-500 ">
                    Category: {pattern.category} • Confidence: {Math.round(pattern.confidence * 100)}%
                  </div>
                </div>
                <div className="text-sm text-gray-600 ">
                  {pattern.count} occurrences
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Performance */}
      {stats.weeklyStats && stats.weeklyStats.length > 0 && (
        <div className="bg-white  rounded-lg border border-gray-200  p-6">
          <h3 className="text-lg font-semibold text-gray-900  mb-4">
            Weekly Performance
          </h3>
          <div className="space-y-3">
            {stats.weeklyStats.map((week, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="text-sm text-gray-600 ">
                  Week of {week.week}
                </div>
                <div className="flex space-x-4 text-sm">
                  <span className="text-blue-600 ">
                    {week.itemCount} items
                  </span>
                  <span className="text-green-600 ">
                    {week.sessionCount} sessions
                  </span>
                  <span className="text-purple-600 ">
                    {Math.round(week.accuracy * 100)}% accuracy
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Productivity Over Time Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Productivity Trend (Last 7 Days)
        </h3>
        <ProductivityChart data={getProductivityData()} />
      </div>

      {/* Activity Heatmap */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Activity Heatmap
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          See when you&apos;re most productive throughout the week
        </p>
        <ActivityHeatmap {...getHeatmapData()} />
      </div>

      {/* Streak Tracker */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Activity Streak
        </h3>
        <StreakTracker data={getStreakData()} />
      </div>

      {/* Completion Rate Card */}
      {appData.tasks.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Task Completion Rate
          </h3>
          <div className="flex items-end gap-4">
            <div className="text-5xl font-bold text-green-600">
              {Math.round((appData.tasks.filter(t => t.completed).length / appData.tasks.length) * 100)}%
            </div>
            <div className="text-sm text-gray-700 mb-2">
              {appData.tasks.filter(t => t.completed).length} of {appData.tasks.length} tasks completed
            </div>
          </div>
        </div>
      )}
    </div>
  )
}