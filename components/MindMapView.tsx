/**
 * MindMapView Component
 * Interactive visualization of tasks/notes over time
 */

import { useState, useMemo } from 'react'
import type { AppData } from '@/types/braindump'
import type { TimeframePeriod, MindMapData, MindMapNode } from '@/types/mindmap'
import MindMapService from '@/lib/services/mindmap.service'

interface MindMapViewProps {
  appData: AppData
}

export default function MindMapView({ appData }: MindMapViewProps) {
  const [timeframe, setTimeframe] = useState<TimeframePeriod>('1month')
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null)
  const [viewMode, setViewMode] = useState<'tree' | 'stats'>('tree')
  
  const mindMapService = MindMapService.getInstance()

  // Generate mind map data
  const mindMapData: MindMapData = useMemo(() => {
    return mindMapService.generateMindMap(appData, timeframe)
  }, [appData, timeframe, mindMapService]) // Fixed: Added mindMapService to deps

  const { rootNode, stats, insights } = mindMapData

  /**
   * Render a mind map node
   */
  const renderNode = (node: MindMapNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const indent = level * 24

    return (
      <div key={node.id} className="mb-2">
        <button
          onClick={() => setSelectedNode(node)}
          className={`
            w-full text-left px-4 py-3 rounded-lg transition-all
            hover:scale-[1.02] hover:shadow-md
            ${selectedNode?.id === node.id 
              ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700'
            }
          `}
          style={{ marginLeft: `${indent}px` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {/* Icon */}
              <span className="text-2xl">{node.metadata?.icon || '📊'}</span>
              
              {/* Label and count */}
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-slate-100">
                  {node.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-slate-400">
                  {node.value} {node.value === 1 ? 'item' : 'items'}
                </div>
              </div>

              {/* Expand indicator */}
              {hasChildren && (
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </div>
          </div>
        </button>

        {/* Render children */}
        {hasChildren && (
          <div className="mt-1">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Timeframe selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Time Period
            </label>
            <div className="flex gap-2">
              {(['1week', '1month', '3months', '6months', '1year'] as TimeframePeriod[]).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${timeframe === period
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }
                  `}
                >
                  {period === '1week' && '1 Week'}
                  {period === '1month' && '1 Month'}
                  {period === '3months' && '3 Months'}
                  {period === '6months' && '6 Months'}
                  {period === '1year' && '1 Year'}
                </button>
              ))}
            </div>
          </div>

          {/* View mode toggle */}
          <div className="ml-auto">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              View
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('tree')}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${viewMode === 'tree'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200'
                  }
                `}
              >
                🌳 Tree
              </button>
              <button
                onClick={() => setViewMode('stats')}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${viewMode === 'stats'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200'
                  }
                `}
              >
                📊 Stats
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold">{stats.totalCreated}</div>
          <div className="text-blue-100 text-sm mt-1">Total Items</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold">{stats.completedCount}</div>
          <div className="text-green-100 text-sm mt-1">Completed</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold">{stats.dailyAverage.toFixed(1)}</div>
          <div className="text-purple-100 text-sm mt-1">Daily Average</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold">{(stats.completionRate * 100).toFixed(0)}%</div>
          <div className="text-orange-100 text-sm mt-1">Completion Rate</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tree View / Stats View */}
        <div className="lg:col-span-2">
          {viewMode === 'tree' ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                Hierarchy View
              </h2>
              <div className="space-y-2">
                {renderNode(rootNode)}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Category Breakdown */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                  Category Breakdown
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-slate-300">Tasks</span>
                      <span className="font-semibold text-gray-900 dark:text-slate-100">
                        {stats.tasksCreated} ({((stats.tasksCreated / stats.totalCreated) * 100).toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${(stats.tasksCreated / stats.totalCreated) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-slate-300">Notes</span>
                      <span className="font-semibold text-gray-900 dark:text-slate-100">
                        {stats.notesCreated} ({((stats.notesCreated / stats.totalCreated) * 100).toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                      <div
                        className="bg-purple-500 h-3 rounded-full transition-all"
                        style={{ width: `${(stats.notesCreated / stats.totalCreated) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Tags */}
              {stats.topTags.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                    Top Tags
                  </h2>
                  <div className="space-y-3">
                    {stats.topTags.slice(0, 5).map(({ tag, count }) => (
                      <div key={tag} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-slate-300 flex items-center gap-2">
                          <span className="text-lg">🏷️</span>
                          {tag}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-slate-100">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Projects */}
              {stats.topProjects.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                    Top Projects
                  </h2>
                  <div className="space-y-3">
                    {stats.topProjects.slice(0, 5).map(({ project, count }) => (
                      <div key={project} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-slate-300 flex items-center gap-2">
                          <span className="text-lg">📁</span>
                          {project}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-slate-100">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Insights */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">
              💡 Insights
            </h2>
            {insights.length > 0 ? (
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`
                      p-4 rounded-lg border-l-4
                      ${insight.type === 'achievement' && 'bg-green-50 dark:bg-green-900/20 border-green-500'}
                      ${insight.type === 'trend' && 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'}
                      ${insight.type === 'pattern' && 'bg-purple-50 dark:bg-purple-900/20 border-purple-500'}
                      ${insight.type === 'anomaly' && 'bg-red-50 dark:bg-red-900/20 border-red-500'}
                    `}
                  >
                    <div className="font-semibold text-gray-900 dark:text-slate-100 mb-1">
                      {insight.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">
                      {insight.description}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-slate-400 text-sm">
                Not enough data for insights yet. Keep tracking!
              </p>
            )}
          </div>

          {/* Selected Node Details */}
          {selectedNode && selectedNode.items && (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                {selectedNode.label}
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {selectedNode.items.slice(0, 10).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg text-sm"
                  >
                    <div className={`text-gray-900 dark:text-slate-100 ${item.completed ? 'line-through' : ''}`}>
                      {item.text}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {selectedNode.items.length > 10 && (
                  <div className="text-sm text-center text-gray-500 dark:text-slate-400 pt-2">
                    +{selectedNode.items.length - 10} more items
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Peak Performance */}
          {stats.peakDay && (
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white shadow-lg">
              <div className="text-sm font-medium mb-2">🏆 Peak Day</div>
              <div className="text-2xl font-bold mb-1">{stats.peakDay.count} items</div>
              <div className="text-yellow-100 text-sm">{stats.peakDay.date}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
