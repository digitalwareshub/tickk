/**
 * OrganizedView Component
 * Enhanced dashboard that preserves legacy functionality while integrating with new data structure
 */

import { useState } from 'react'
import Analytics from './Analytics'
import type { AppData, UserPreferences } from '@/types/braindump'

interface OrganizedViewProps {
  appData: AppData
  preferences: UserPreferences | null
  onDataUpdate: (data: AppData) => void
}

export default function OrganizedView({ 
  appData, 
  onDataUpdate 
}: OrganizedViewProps) {
  const [filter, setFilter] = useState<'all' | 'tasks' | 'notes' | 'analytics'>('all')
  
  // Get organized items (tasks and notes)
  const organizedTasks = appData.tasks || []
  const organizedNotes = appData.notes || []
  const unprocessedCount = appData.braindump?.filter(item => !item.processed).length || 0
  
  const handleToggleTask = async (taskId: string) => {
    const updatedTasks = organizedTasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    )
    
    const updatedData = {
      ...appData,
      tasks: updatedTasks
    }
    
    onDataUpdate(updatedData)
  }
  
  const handleDeleteItem = async (itemId: string, type: 'task' | 'note') => {
    const updatedData = {
      ...appData,
      tasks: type === 'task' ? organizedTasks.filter(t => t.id !== itemId) : organizedTasks,
      notes: type === 'note' ? organizedNotes.filter(n => n.id !== itemId) : organizedNotes
    }
    
    onDataUpdate(updatedData)
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-2">
            Your Workspace
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
            Everything organized and actionable.
          </p>
        </div>

        {/* Clean Stats Summary */}
        <div className="flex justify-center items-center space-x-8 mb-8 text-sm text-gray-600">
          <span><strong className="text-gray-900">{organizedTasks.length}</strong> tasks</span>
          <span className="text-gray-300">•</span>
          <span><strong className="text-gray-900">{organizedNotes.length}</strong> notes</span>
          <span className="text-gray-300">•</span>
          <span><strong className="text-gray-900">{organizedTasks.filter(t => t.completed).length}</strong> completed</span>
          {unprocessedCount > 0 && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-orange-600"><strong>{unprocessedCount}</strong> unprocessed</span>
            </>
          )}
        </div>

        {/* Clean Navigation */}
        <div className="flex items-center justify-center space-x-8 mb-12">
          <button
            onClick={() => setFilter('tasks')}
            className={`text-sm font-medium transition-colors duration-200 relative ${
              filter === 'tasks'
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tasks ({organizedTasks.length})
            {filter === 'tasks' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setFilter('notes')}
            className={`text-sm font-medium transition-colors duration-200 relative ${
              filter === 'notes'
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Notes ({organizedNotes.length})
            {filter === 'notes' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setFilter('analytics')}
            className={`text-sm font-medium transition-colors duration-200 relative ${
              filter === 'analytics'
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Analytics
            {filter === 'analytics' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setFilter('all')}
            className={`text-sm font-medium transition-colors duration-200 relative ${
              filter === 'all'
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Items
            {filter === 'all' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
        </div>
        
        {/* Content Area */}
        {filter === 'analytics' ? (
          <div data-analytics>
            <Analytics appData={appData} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Clean Task List */}
            {(filter === 'all' || filter === 'tasks') && organizedTasks.length > 0 && (
              <div className="space-y-4">
                {organizedTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${
                        task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {task.text}
                      </p>
                      {((task.tags && task.tags.length > 0) || task.priority) && (
                        <div className="flex items-center gap-2 mt-1">
                          {task.priority && (
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              task.priority === 'high' ? 'bg-red-100 text-red-600' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {task.priority}
                            </span>
                          )}
                          {task.tags && task.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{new Date(task.timestamp).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleDeleteItem(task.id, 'task')}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Delete task"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Clean Notes List */}
            {(filter === 'all' || filter === 'notes') && organizedNotes.length > 0 && (
              <div className="space-y-4">
                {organizedNotes.map((note) => (
                  <div key={note.id} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="w-4 h-4 mt-1 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{note.text}</p>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          {note.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleDeleteItem(note.id, 'note')}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Delete note"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {((filter === 'tasks' && organizedTasks.length === 0) || 
              (filter === 'notes' && organizedNotes.length === 0) || 
              (filter === 'all' && organizedTasks.length === 0 && organizedNotes.length === 0)) && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-sm mb-2">No {filter === 'all' ? 'items' : filter} yet</p>
                <p className="text-xs text-gray-400">
                  Switch to Braindump mode to start capturing your thoughts
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Unprocessed Items Alert */}
        {filter !== 'analytics' && unprocessedCount > 0 && (
          <div className="mt-8 text-center bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-orange-900 mb-2">
              {unprocessedCount} unprocessed items
            </h3>
            <p className="text-orange-700 mb-4 text-sm">
              Switch to Braindump mode to organize them into tasks and notes.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
