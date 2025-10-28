/**
 * FocusView Component
 * Clean, minimal view showing only what matters TODAY
 * Perfect for ADHD users who need to reduce overwhelm
 */

import { useState, useEffect } from 'react'
import DateBadge from './DateBadge'
import EditItemModal from './EditItemModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import { parseEarliestDate, categorizeDateGroup } from '@/lib/utils/dateParser'
import type { VoiceItem, AppData } from '@/types/braindump'

interface FocusViewProps {
  appData: AppData
  onDataUpdate: (data: AppData) => void
}

export default function FocusView({
  appData,
  onDataUpdate
}: FocusViewProps) {
  // Edit/Delete modal state
  const [showEditModal, setShowEditModal] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<VoiceItem | null>(null)
  const [editType, setEditType] = useState<'task' | 'note'>('task')

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<VoiceItem | null>(null)
  const [deleteType, setDeleteType] = useState<'task' | 'note'>('task')

  // Pomodoro state
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60) // 25 minutes in seconds
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false)
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work')

  // Get tasks
  const allTasks = appData.tasks || []

  // Filter: Tasks due today or overdue
  const todayTasks = allTasks.filter(task => {
    if (task.completed) return false // Hide completed

    const dateGroup = categorizeDateGroup(
      parseEarliestDate(task.metadata?.dateInfo as string)
    )
    return dateGroup === 'today' || dateGroup === 'overdue'
  })

  // Filter: Recently added tasks (last 3, created in last 24 hours)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const recentTasks = allTasks
    .filter(task => {
      if (task.completed) return false
      const createdDate = new Date(task.timestamp)
      return createdDate > oneDayAgo
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3)

  // Filter: Pinned tasks
  const pinnedTasks = allTasks.filter(
    task => !task.completed && task.metadata?.pinned
  )

  // Combine all focus tasks (remove duplicates)
  const focusTasks = [
    ...pinnedTasks,
    ...todayTasks.filter(t => !pinnedTasks.find(p => p.id === t.id)),
    ...recentTasks.filter(
      t =>
        !pinnedTasks.find(p => p.id === t.id) &&
        !todayTasks.find(td => td.id === t.id)
    )
  ]

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = allTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )

    onDataUpdate({
      ...appData,
      tasks: updatedTasks
    })
  }

  const handlePinTask = (taskId: string) => {
    const updatedTasks = allTasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            metadata: {
              ...task.metadata,
              pinned: !task.metadata?.pinned
            }
          }
        : task
    )

    onDataUpdate({
      ...appData,
      tasks: updatedTasks
    })
  }

  const handleEditItem = (item: VoiceItem, type: 'task' | 'note') => {
    setItemToEdit(item)
    setEditType(type)
    setShowEditModal(true)
  }

  const handleConfirmEdit = async (updatedItem: VoiceItem) => {
    const updatedTasks = editType === 'task'
      ? allTasks.map(t => t.id === updatedItem.id ? updatedItem : t)
      : allTasks

    onDataUpdate({
      ...appData,
      tasks: updatedTasks
    })

    setShowEditModal(false)
    setItemToEdit(null)
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setItemToEdit(null)
  }

  const handleDeleteItem = (item: VoiceItem, type: 'task' | 'note') => {
    setItemToDelete(item)
    setDeleteType(type)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return

    const updatedTasks = deleteType === 'task'
      ? allTasks.filter(t => t.id !== itemToDelete.id)
      : allTasks

    onDataUpdate({
      ...appData,
      tasks: updatedTasks
    })

    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  // Pomodoro timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPomodoroRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => {
          if (prev <= 1) {
            setIsPomodoroRunning(false)
            // Play sound or show notification
            if (typeof window !== 'undefined' && 'Notification' in window) {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  new Notification('Pomodoro Complete!', {
                    body:
                      pomodoroMode === 'work'
                        ? 'Time for a break!'
                        : 'Back to work!',
                    icon: '/icon-192.png'
                  })
                }
              })
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPomodoroRunning, pomodoroTime, pomodoroMode])

  const startPomodoro = (mode: 'work' | 'break') => {
    setPomodoroMode(mode)
    setPomodoroTime(mode === 'work' ? 25 * 60 : 5 * 60)
    setIsPomodoroRunning(true)
  }

  const stopPomodoro = () => {
    setIsPomodoroRunning(false)
  }

  const resetPomodoro = () => {
    setIsPomodoroRunning(false)
    setPomodoroTime(pomodoroMode === 'work' ? 25 * 60 : 5 * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Today's Focus
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {focusTasks.length === 0
              ? 'Nothing on your plate right now'
              : `${focusTasks.length} task${focusTasks.length === 1 ? '' : 's'} need your attention`}
          </p>
        </div>

        {/* Pomodoro Timer */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Focus Timer
            </h2>
            <div className="text-6xl font-mono font-bold text-gray-900 mb-6">
              {formatTime(pomodoroTime)}
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {!isPomodoroRunning ? (
                <>
                  <button
                    onClick={() => startPomodoro('work')}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Start Work (25min)
                  </button>
                  <button
                    onClick={() => startPomodoro('break')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    Start Break (5min)
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={stopPomodoro}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    Pause
                  </button>
                  <button
                    onClick={resetPomodoro}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              {pomodoroMode === 'work' ? 'Work Session' : 'Break Time'}
            </p>
          </div>
        </div>

        {/* Task List */}
        {focusTasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              All clear!
            </h3>
            <p className="text-gray-600 text-sm">
              You have no tasks for today. Time to relax or braindump new ideas!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {focusTasks.map(task => {
              const isPinned = task.metadata?.pinned
              const dateGroup = categorizeDateGroup(
                parseEarliestDate(task.metadata?.dateInfo as string)
              )
              const isOverdue = dateGroup === 'overdue'

              return (
                <div
                  key={task.id}
                  className={`bg-white rounded-xl shadow-sm border-2 p-4 sm:p-6 transition-all hover:shadow-md ${
                    isPinned
                      ? 'border-yellow-300 bg-yellow-50'
                      : isOverdue
                        ? 'border-red-200 bg-red-50'
                        : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={task.completed || false}
                      onChange={() => handleToggleTask(task.id)}
                      className="mt-1 w-6 h-6 text-green-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-green-500 flex-shrink-0"
                      aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
                    />

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-lg sm:text-xl font-medium break-words ${
                          task.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-900'
                        }`}
                      >
                        {task.text}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        {isPinned && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-200 text-yellow-800 rounded">
                            📌 Pinned
                          </span>
                        )}
                        {isOverdue && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-200 text-red-800 rounded">
                            ⚠️ Overdue
                          </span>
                        )}
                        {task.metadata?.dateInfo && (
                          <DateBadge dateInfo={task.metadata.dateInfo as string} />
                        )}
                        {task.priority && (
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              task.priority === 'high'
                                ? 'bg-red-100 text-red-700'
                                : task.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {task.priority}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => handlePinTask(task.id)}
                        className={`p-2 rounded transition-colors ${
                          isPinned
                            ? 'text-yellow-600 hover:text-yellow-700 bg-yellow-100'
                            : 'text-gray-400 hover:text-yellow-600'
                        }`}
                        aria-label={isPinned ? 'Unpin task' : 'Pin task'}
                        title={isPinned ? 'Unpin task' : 'Pin to top'}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78.146 1.617.914 1.91A3.989 3.989 0 008 15a3.989 3.989 0 002.667-1.019c.768-.293 1.164-1.13.914-1.91L10.763 10.3 7.238 10.3z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEditItem(task, 'task')}
                        className="p-2 text-gray-400 hover:text-blue-600 rounded transition-colors"
                        aria-label="Edit task"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteItem(task, 'task')}
                        className="p-2 text-gray-400 hover:text-red-600 rounded transition-colors"
                        aria-label="Delete task"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
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
                </div>
              )
            })}
          </div>
        )}

        {/* Info */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            Showing: Pinned tasks • Due today • Overdue • Recently added (24hrs)
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && itemToEdit && (
        <EditItemModal
          item={itemToEdit}
          type={editType}
          onSave={handleConfirmEdit}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && itemToDelete && (
        <DeleteConfirmModal
          item={itemToDelete}
          type={deleteType}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  )
}
