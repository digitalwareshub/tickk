/**
 * Mind Map Service
 * Generates mind map visualizations from task/note data
 * Handles time-based filtering and hierarchical grouping
 */

import type { 
  VoiceItem, 
  AppData, 
  BraindumpSession 
} from '@/types/braindump'
import type {
  MindMapConfig,
  MindMapData,
  MindMapNode,
  MindMapStats,
  MindMapInsight,
  TimeframePeriod,
  // Removed unused import: TIMEFRAME_PRESETS
} from '@/types/mindmap'

export class MindMapService {
  private static instance: MindMapService

  static getInstance(): MindMapService {
    if (!this.instance) {
      this.instance = new MindMapService()
    }
    return this.instance
  }

  /**
   * Generate mind map data for a given timeframe
   */
  generateMindMap(
    appData: AppData,
    timeframe: TimeframePeriod,
    customStart?: Date,
    customEnd?: Date
  ): MindMapData {
    // Calculate date range
    const { start, end } = this.getDateRange(timeframe, customStart, customEnd)
    
    // Filter items created within timeframe
    const filteredItems = this.filterItemsByTimeframe(
      [...appData.tasks, ...appData.notes],
      start,
      end
    )

    const config: MindMapConfig = {
      timeframe,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      groupBy: 'category',
      showCompleted: true,
      showActive: true
    }

    // Build hierarchical structure
    const rootNode = this.buildHierarchy(filteredItems, config)
    
    // Calculate statistics
    const stats = this.calculateStats(filteredItems, appData.sessions, start, end)
    
    // Generate insights
    const insights = this.generateInsights(filteredItems, stats, timeframe)

    return {
      config,
      rootNode,
      stats,
      insights
    }
  }

  /**
   * Get date range for a timeframe
   */
  private getDateRange(
    timeframe: TimeframePeriod,
    customStart?: Date,
    customEnd?: Date
  ): { start: Date; end: Date } {
    const now = new Date()
    
    if (timeframe === 'custom' && customStart && customEnd) {
      return { start: customStart, end: customEnd }
    }

    switch (timeframe) {
      case '1week':
        return {
          start: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          end: now
        }
      case '1month':
        return {
          start: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
          end: now
        }
      case '3months':
        return {
          start: new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()),
          end: now
        }
      case '6months':
        return {
          start: new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()),
          end: now
        }
      case '1year':
        return {
          start: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
          end: now
        }
      default:
        return {
          start: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
          end: now
        }
    }
  }

  /**
   * Filter items by creation date
   */
  private filterItemsByTimeframe(
    items: VoiceItem[],
    start: Date,
    end: Date
  ): VoiceItem[] {
    return items.filter(item => {
      const itemDate = new Date(item.timestamp)
      return itemDate >= start && itemDate <= end
    })
  }

  /**
   * Build hierarchical node structure
   */
  private buildHierarchy(
    items: VoiceItem[],
    config: MindMapConfig
  ): MindMapNode {
    const rootNode: MindMapNode = {
      id: 'root',
      label: `${this.getTimeframeLabel(config.timeframe)} Overview`,
      type: 'root',
      value: items.length,
      children: []
    }

    switch (config.groupBy) {
      case 'category':
        rootNode.children = this.groupByCategory(items)
        break
      case 'project':
        rootNode.children = this.groupByProject(items)
        break
      case 'tag':
        rootNode.children = this.groupByTag(items)
        break
      case 'priority':
        rootNode.children = this.groupByPriority(items)
        break
      case 'date':
        rootNode.children = this.groupByDate(items, config.timeframe)
        break
    }

    return rootNode
  }

  /**
   * Group items by category (tasks/notes)
   */
  private groupByCategory(items: VoiceItem[]): MindMapNode[] {
    const tasks = items.filter(i => i.category === 'tasks')
    const notes = items.filter(i => i.category === 'notes')

    const nodes: MindMapNode[] = []

    if (tasks.length > 0) {
      nodes.push({
        id: 'tasks',
        label: 'Tasks',
        type: 'category',
        value: tasks.length,
        metadata: {
          color: '#10b981',
          icon: '✓'
        },
        children: this.groupTasksByStatus(tasks),
        items: tasks
      })
    }

    if (notes.length > 0) {
      nodes.push({
        id: 'notes',
        label: 'Notes',
        type: 'category',
        value: notes.length,
        metadata: {
          color: '#8b5cf6',
          icon: '📝'
        },
        children: this.groupNotesByTag(notes),
        items: notes
      })
    }

    return nodes
  }

  /**
   * Group tasks by completion status
   */
  private groupTasksByStatus(tasks: VoiceItem[]): MindMapNode[] {
    const completed = tasks.filter(t => t.completed)
    const active = tasks.filter(t => !t.completed)

    return [
      {
        id: 'completed-tasks',
        label: 'Completed',
        type: 'item',
        value: completed.length,
        metadata: { color: '#22c55e', icon: '✓' },
        items: completed
      },
      {
        id: 'active-tasks',
        label: 'Active',
        type: 'item',
        value: active.length,
        metadata: { color: '#f59e0b', icon: '○' },
        items: active
      }
    ]
  }

  /**
   * Group notes by tags
   */
  private groupNotesByTag(notes: VoiceItem[]): MindMapNode[] {
    const tagMap = new Map<string, VoiceItem[]>()
    const untagged: VoiceItem[] = []

    notes.forEach(note => {
      if (note.tags && note.tags.length > 0) {
        note.tags.forEach(tag => {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, [])
          }
          tagMap.get(tag)!.push(note)
        })
      } else {
        untagged.push(note)
      }
    })

    const nodes: MindMapNode[] = []

    tagMap.forEach((items, tag) => {
      nodes.push({
        id: `tag-${tag}`,
        label: tag,
        type: 'tag',
        value: items.length,
        metadata: { color: '#8b5cf6', icon: '🏷️' },
        items
      })
    })

    if (untagged.length > 0) {
      nodes.push({
        id: 'untagged',
        label: 'Untagged',
        type: 'tag',
        value: untagged.length,
        metadata: { color: '#94a3b8', icon: '○' },
        items: untagged
      })
    }

    // Sort by count descending
    return nodes.sort((a, b) => b.value - a.value)
  }

  /**
   * Group items by project
   */
  private groupByProject(items: VoiceItem[]): MindMapNode[] {
    const projectMap = new Map<string, VoiceItem[]>()
    const noProject: VoiceItem[] = []

    items.forEach(item => {
      const project = item.metadata?.patterns?.find(p => p.startsWith('project:'))?.replace('project:', '')
      
      if (project) {
        if (!projectMap.has(project)) {
          projectMap.set(project, [])
        }
        projectMap.get(project)!.push(item)
      } else {
        noProject.push(item)
      }
    })

    const nodes: MindMapNode[] = []

    projectMap.forEach((projectItems, project) => {
      nodes.push({
        id: `project-${project}`,
        label: project,
        type: 'project',
        value: projectItems.length,
        metadata: { color: '#3b82f6', icon: '📁' },
        items: projectItems
      })
    })

    if (noProject.length > 0) {
      nodes.push({
        id: 'no-project',
        label: 'No Project',
        type: 'project',
        value: noProject.length,
        metadata: { color: '#94a3b8', icon: '○' },
        items: noProject
      })
    }

    return nodes.sort((a, b) => b.value - a.value)
  }

  /**
   * Group items by tag
   */
  private groupByTag(items: VoiceItem[]): MindMapNode[] {
    const tagMap = new Map<string, VoiceItem[]>()

    items.forEach(item => {
      const tags = item.tags || []
      
      if (tags.length === 0) {
        if (!tagMap.has('untagged')) {
          tagMap.set('untagged', [])
        }
        tagMap.get('untagged')!.push(item)
      } else {
        tags.forEach(tag => {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, [])
          }
          tagMap.get(tag)!.push(item)
        })
      }
    })

    const nodes: MindMapNode[] = []

    tagMap.forEach((tagItems, tag) => {
      nodes.push({
        id: `tag-${tag}`,
        label: tag,
        type: 'tag',
        value: tagItems.length,
        metadata: { 
          color: tag === 'untagged' ? '#94a3b8' : '#8b5cf6', 
          icon: tag === 'untagged' ? '○' : '🏷️' 
        },
        items: tagItems
      })
    })

    return nodes.sort((a, b) => b.value - a.value)
  }

  /**
   * Group items by priority
   */
  private groupByPriority(items: VoiceItem[]): MindMapNode[] {
    const high = items.filter(i => i.priority === 'high')
    const medium = items.filter(i => i.priority === 'medium')
    const low = items.filter(i => i.priority === 'low')
    const none = items.filter(i => !i.priority)

    const nodes: MindMapNode[] = [
      {
        id: 'priority-high',
        label: 'High Priority',
        type: 'item' as const,
        value: high.length,
        metadata: { color: '#ef4444', icon: '🔴' },
        items: high
      },
      {
        id: 'priority-medium',
        label: 'Medium Priority',
        type: 'item' as const,
        value: medium.length,
        metadata: { color: '#f59e0b', icon: '🟡' },
        items: medium
      },
      {
        id: 'priority-low',
        label: 'Low Priority',
        type: 'item' as const,
        value: low.length,
        metadata: { color: '#10b981', icon: '🟢' },
        items: low
      },
      {
        id: 'priority-none',
        label: 'No Priority',
        type: 'item' as const,
        value: none.length,
        metadata: { color: '#94a3b8', icon: '⚪' },
        items: none
      }
    ]
    
    return nodes.filter(node => node.value > 0)
  }

  /**
   * Group items by date (timeline view)
   */
  private groupByDate(items: VoiceItem[], timeframe: TimeframePeriod): MindMapNode[] {
    const dateMap = new Map<string, VoiceItem[]>()

    items.forEach(item => {
      const date = new Date(item.timestamp)
      let key: string

      // Group by appropriate time unit based on timeframe
      if (timeframe === '1week') {
        key = date.toLocaleDateString()
      } else if (timeframe === '1month') {
        key = `Week ${this.getWeekNumber(date)}`
      } else {
        key = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }

      if (!dateMap.has(key)) {
        dateMap.set(key, [])
      }
      dateMap.get(key)!.push(item)
    })

    const nodes: MindMapNode[] = []

    dateMap.forEach((dateItems, dateKey) => {
      nodes.push({
        id: `date-${dateKey}`,
        label: dateKey,
        type: 'timespan',
        value: dateItems.length,
        metadata: { color: '#3b82f6', icon: '📅' },
        items: dateItems
      })
    })

    return nodes.sort((a, b) => a.label.localeCompare(b.label))
  }

  /**
   * Calculate comprehensive statistics
   */
  private calculateStats(
    items: VoiceItem[],
    sessions: BraindumpSession[],
    start: Date,
    end: Date
  ): MindMapStats {
    const tasks = items.filter(i => i.category === 'tasks')
    const notes = items.filter(i => i.category === 'notes')
    const completed = tasks.filter(t => t.completed)
    const active = tasks.filter(t => !t.completed)

    // Calculate time-based metrics
    const daysDiff = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
    const dailyAverage = items.length / daysDiff
    const weeklyAverage = dailyAverage * 7

    // Find peak day
    const dayMap = new Map<string, number>()
    items.forEach(item => {
      const day = new Date(item.timestamp).toLocaleDateString()
      dayMap.set(day, (dayMap.get(day) || 0) + 1)
    })

    let peakDay: { date: string; count: number } | undefined
    let maxCount = 0
    dayMap.forEach((count, date) => {
      if (count > maxCount) {
        maxCount = count
        peakDay = { date, count }
      }
    })

    // Category distribution
    const categoryDistribution: Record<string, number> = {
      tasks: tasks.length,
      notes: notes.length
    }

    // Top tags
    const tagMap = new Map<string, number>()
    items.forEach(item => {
      item.tags?.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      })
    })
    const topTags = Array.from(tagMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Top projects
    const projectMap = new Map<string, number>()
    items.forEach(item => {
      const project = item.metadata?.patterns?.find(p => p.startsWith('project:'))?.replace('project:', '')
      if (project) {
        projectMap.set(project, (projectMap.get(project) || 0) + 1)
      }
    })
    const topProjects = Array.from(projectMap.entries())
      .map(([project, count]) => ({ project, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Completion metrics
    const completionRate = tasks.length > 0 
      ? completed.length / (completed.length + active.length) 
      : 0

    // Average completion time (for completed tasks)
    let avgCompletionTime: number | undefined
    const completionTimes = completed
      .filter(t => t.metadata?.completed)
      .map(() => {
        // Fixed: Removed unused 'created' variable
        // We don't have completion timestamp, so this is approximate
        return 24 // Placeholder: assume 24 hours average
      })
    
    if (completionTimes.length > 0) {
      avgCompletionTime = completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length
    }

    return {
      totalCreated: items.length,
      tasksCreated: tasks.length,
      notesCreated: notes.length,
      stillActive: active.length + notes.length,
      completedCount: completed.length,
      estimatedDeleted: 0, // We can't calculate this without history
      dailyAverage,
      weeklyAverage,
      peakDay,
      categoryDistribution,
      topTags,
      topProjects,
      completionRate,
      avgCompletionTime
    }
  }

  /**
   * Generate insights from the data
   */
  private generateInsights(
    items: VoiceItem[],
    stats: MindMapStats,
    timeframe: TimeframePeriod
  ): MindMapInsight[] {
    const insights: MindMapInsight[] = []
    
    // Add timeframe context to insights
    const timeframeLabel = timeframe === '1week' ? 'this week' : 
                          timeframe === '1month' ? 'this month' : 
                          timeframe === '3months' ? 'the last 3 months' : 'this year'

    // Productivity insight
    if (stats.dailyAverage > 5) {
      insights.push({
        type: 'achievement',
        title: 'High Productivity!',
        description: `You're averaging ${stats.dailyAverage.toFixed(1)} items per day ${timeframeLabel}. Great momentum!`,
        confidence: 0.9
      })
    }

    // Completion rate insight
    if (stats.completionRate > 0.7) {
      insights.push({
        type: 'achievement',
        title: 'Excellent Completion Rate',
        description: `${(stats.completionRate * 100).toFixed(0)}% of tasks completed. You're on fire! 🔥`,
        confidence: 0.95
      })
    } else if (stats.completionRate < 0.3) {
      insights.push({
        type: 'trend',
        title: 'Many Active Tasks',
        description: `Only ${(stats.completionRate * 100).toFixed(0)}% completed. Consider focusing on fewer tasks.`,
        confidence: 0.8
      })
    }

    // Peak productivity insight
    if (stats.peakDay) {
      insights.push({
        type: 'pattern',
        title: 'Most Productive Day',
        description: `${stats.peakDay.date} was your peak with ${stats.peakDay.count} items created.`,
        confidence: 0.85
      })
    }

    // Tag usage insight
    if (stats.topTags.length > 0) {
      const topTag = stats.topTags[0]
      insights.push({
        type: 'pattern',
        title: 'Top Focus Area',
        description: `"${topTag.tag}" appears ${topTag.count} times - your main focus area!`,
        confidence: 0.8
      })
    }

    // Category balance insight
    const taskRatio = stats.tasksCreated / (stats.tasksCreated + stats.notesCreated)
    if (taskRatio > 0.8) {
      insights.push({
        type: 'trend',
        title: 'Task-Heavy Period',
        description: `${(taskRatio * 100).toFixed(0)}% tasks vs ${((1 - taskRatio) * 100).toFixed(0)}% notes. Very action-oriented!`,
        confidence: 0.9
      })
    } else if (taskRatio < 0.2) {
      insights.push({
        type: 'trend',
        title: 'Note-Heavy Period',
        description: `${((1 - taskRatio) * 100).toFixed(0)}% notes. Lots of learning and documentation!`,
        confidence: 0.9
      })
    }

    return insights
  }

  /**
   * Get week number of year
   */
  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  }

  /**
   * Get human-readable timeframe label
   */
  private getTimeframeLabel(timeframe: TimeframePeriod): string {
    const labels: Record<TimeframePeriod, string> = {
      '1week': 'Last Week',
      '1month': 'Last Month',
      '3months': 'Last 3 Months',
      '6months': 'Last 6 Months',
      '1year': 'Last Year',
      'custom': 'Custom Period'
    }
    return labels[timeframe]
  }

  /**
   * Export mind map as JSON
   */
  exportAsJSON(mindMapData: MindMapData): string {
    return JSON.stringify(mindMapData, null, 2)
  }

  /**
   * Get data for specific node
   */
  getNodeData(mindMapData: MindMapData, nodeId: string): MindMapNode | null {
    const findNode = (node: MindMapNode): MindMapNode | null => {
      if (node.id === nodeId) return node
      
      if (node.children) {
        for (const child of node.children) {
          const found = findNode(child)
          if (found) return found
        }
      }
      
      return null
    }

    return findNode(mindMapData.rootNode)
  }
}

export default MindMapService
