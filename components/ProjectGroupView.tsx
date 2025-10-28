/**
 * ProjectGroupView Component
 * Displays tasks organized by detected projects
 */

import { useState } from 'react'
import DateBadge from './DateBadge'
import type { VoiceItem } from '@/types/braindump'

interface ProjectGroup {
  projectName: string
  tasks: VoiceItem[]
  completedCount: number
  totalCount: number
}

interface ProjectGroupViewProps {
  tasks: VoiceItem[]
  onToggleTask: (taskId: string) => void
  onEditTask: (task: VoiceItem) => void
  onDeleteTask: (task: VoiceItem) => void
  onContextMenu?: (e: React.MouseEvent, taskId: string) => void
  onTouchStart?: (e: React.TouchEvent, taskId: string) => void
  onTouchEnd?: () => void
  onTouchMove?: () => void
}

export default function ProjectGroupView({
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onContextMenu,
  onTouchStart,
  onTouchEnd,
  onTouchMove
}: ProjectGroupViewProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())

  // Group tasks by project
  const groups: ProjectGroup[] = []
  const projectMap = new Map<string, VoiceItem[]>()

  // Separate tasks with and without projects
  const tasksWithProjects: VoiceItem[] = []
  const tasksWithoutProjects: VoiceItem[] = []

  tasks.forEach(task => {
    const project = task.classification?.metadata?.project as string | undefined
    if (project) {
      tasksWithProjects.push(task)
      if (!projectMap.has(project)) {
        projectMap.set(project, [])
      }
      projectMap.get(project)!.push(task)
    } else {
      tasksWithoutProjects.push(task)
    }
  })

  // Create project groups
  projectMap.forEach((projectTasks, projectName) => {
    const completedCount = projectTasks.filter(t => t.completed).length
    groups.push({
      projectName,
      tasks: projectTasks,
      completedCount,
      totalCount: projectTasks.length
    })
  })

  // Sort groups by name
  groups.sort((a, b) => a.projectName.localeCompare(b.projectName))

  // Add "No Project" group if there are ungrouped tasks
  if (tasksWithoutProjects.length > 0) {
    groups.push({
      projectName: 'No Project',
      tasks: tasksWithoutProjects,
      completedCount: tasksWithoutProjects.filter(t => t.completed).length,
      totalCount: tasksWithoutProjects.length
    })
  }

  const toggleProject = (projectName: string) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(projectName)) {
      newExpanded.delete(projectName)
    } else {
      newExpanded.add(projectName)
    }
    setExpandedProjects(newExpanded)
  }

  if (groups.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-sm mb-2">No tasks found</p>
        <p className="text-xs text-gray-400">
          Switch to Braindump mode to start capturing tasks
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => {
        const isExpanded = expandedProjects.has(group.projectName)
        const progress = group.totalCount > 0 ? (group.completedCount / group.totalCount) * 100 : 0

        return (
          <div
            key={group.projectName}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            {/* Project Header */}
            <button
              onClick={() => toggleProject(group.projectName)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Expand/Collapse Icon */}
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform flex-shrink-0 ${
                    isExpanded ? 'transform rotate-90' : ''
                  }`}
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

                {/* Project Name */}
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {group.projectName === 'No Project' ? (
                    <span className="text-gray-500">📋 {group.projectName}</span>
                  ) : (
                    <span>📁 {group.projectName}</span>
                  )}
                </h3>

                {/* Task Count */}
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {group.completedCount}/{group.totalCount} completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden ml-3 flex-shrink-0">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </button>

            {/* Task List */}
            {isExpanded && (
              <div className="divide-y divide-gray-100">
                {group.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 sm:gap-4 px-4 py-3 hover:bg-gray-50"
                    onContextMenu={onContextMenu ? (e) => onContextMenu(e, task.id) : undefined}
                    onTouchStart={onTouchStart ? (e) => onTouchStart(e, task.id) : undefined}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={task.completed || false}
                      onChange={() => onToggleTask(task.id)}
                      className="mt-1 w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-green-500 flex-shrink-0"
                      aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
                    />

                    {/* Task Content */}
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p
                        className={`text-sm break-words ${
                          task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}
                      >
                        {task.text}
                      </p>

                      {/* Metadata */}
                      {((task.tags && task.tags.length > 0) || task.priority || task.metadata?.dateInfo) && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {task.metadata?.dateInfo && (
                            <DateBadge dateInfo={task.metadata.dateInfo as string} />
                          )}
                          {task.priority && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${
                                task.priority === 'high'
                                  ? 'bg-red-100 text-red-600'
                                  : task.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {task.priority}
                            </span>
                          )}
                          {task.tags &&
                            task.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs flex-shrink-0"
                              >
                                #{tag}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => onEditTask(task)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label="Edit task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDeleteTask(task)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        aria-label="Delete task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium mb-1">💡 Project Detection</p>
        <p className="text-xs text-blue-700">
          Projects are automatically detected from your task text using patterns like <code className="bg-blue-100 px-1 rounded">#project</code>,{' '}
          <code className="bg-blue-100 px-1 rounded">for ProjectName</code>, or{' '}
          <code className="bg-blue-100 px-1 rounded">ProjectName:</code>
        </p>
      </div>
    </div>
  )
}
