/**
 * OrganizedView Component
 * Enhanced dashboard that preserves legacy functionality while integrating with new data structure
 */

import { useState } from 'react'
import Analytics from './Analytics'
import BraindumpInterface from './BraindumpInterface'
import type { AppData, UserPreferences } from '@/types/braindump'

interface OrganizedViewProps {
  appData: AppData
  preferences: UserPreferences | null
  onDataUpdate: (data: AppData) => void
}

export default function OrganizedView({ 
  appData, 
  preferences,
  onDataUpdate 
}: OrganizedViewProps) {
  const [filter, setFilter] = useState<'all' | 'tasks' | 'notes' | 'analytics'>('all')
  const [showQuickRecord, setShowQuickRecord] = useState(false)
  
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
            📊 Your Organized Thoughts
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-600">
            Everything organized and ready for action.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {organizedTasks.length}
            </div>
            <div className="text-xs text-gray-600">Tasks</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {organizedNotes.length}
            </div>
            <div className="text-xs text-gray-600">Notes</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {unprocessedCount}
            </div>
            <div className="text-xs text-gray-600">Unprocessed</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {organizedTasks.filter(t => t.completed).length}
            </div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-50 border border-gray-200 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilter('tasks')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                filter === 'tasks'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Tasks Only
            </button>
            <button
              onClick={() => setFilter('notes')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                filter === 'notes'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Notes Only
            </button>
            <button
              onClick={() => setFilter('analytics')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                filter === 'analytics'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              📊 Analytics
            </button>
          </div>
        </div>
        
        {/* Content Area */}
        {filter === 'analytics' ? (
          <Analytics appData={appData} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Tasks Section */}
            {(filter === 'all' || filter === 'tasks') && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="text-xl mr-2">✅</span>
                    Tasks ({organizedTasks.length})
                  </h2>
                </div>
                
                {organizedTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-3">📋</div>
                    <p className="text-base font-medium mb-2">No tasks yet</p>
                    <p className="text-sm">Switch to braindump mode to add some!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {organizedTasks.map((task) => (
                      <div 
                        key={task.id} 
                        className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
                          task.completed
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => handleToggleTask(task.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              task.completed
                                ? 'bg-gray-600 border-gray-600 text-white'
                                : 'border-gray-300 hover:border-gray-500'
                            }`}
                          >
                            {task.completed && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className={`font-medium text-sm leading-relaxed ${
                              task.completed 
                                ? 'line-through text-gray-500'
                                : 'text-gray-900'
                            }`}>
                              {task.text}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                              <span>⏰ {new Date(task.timestamp).toLocaleDateString()}</span>
                              {task.priority && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                                  {task.priority}
                                </span>
                              )}
                              {task.source === 'braindump' && (
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                                  from braindump
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteItem(task.id, 'task')}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-gray-100"
                            aria-label="Delete task"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Notes Section */}
            {(filter === 'all' || filter === 'notes') && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="text-xl mr-2">📝</span>
                    Notes ({organizedNotes.length})
                  </h2>
                </div>
                
                {organizedNotes.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-3">💭</div>
                    <p className="text-base font-medium mb-2">No notes yet</p>
                    <p className="text-sm">Switch to braindump mode to capture your thoughts!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {organizedNotes.map((note) => (
                      <div 
                        key={note.id} 
                        className="p-4 rounded-lg border bg-white border-gray-200 hover:border-gray-300 transition-all hover:shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900 leading-relaxed mb-2">
                              {note.text}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>⏰ {new Date(note.timestamp).toLocaleDateString()}</span>
                              {note.tags && note.tags.length > 0 && (
                                <div className="flex gap-1">
                                  {note.tags.map((tag, index) => (
                                    <span 
                                      key={index}
                                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {note.source === 'braindump' && (
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                                  from braindump
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteItem(note.id, 'note')}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-gray-100"
                            aria-label="Delete note"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Unprocessed Items Alert */}
        {filter !== 'analytics' && unprocessedCount > 0 && (
          <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4 shadow-sm">
            <div className="text-center">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="text-base font-semibold text-orange-900 mb-2">
                You have {unprocessedCount} unprocessed braindump items
              </h3>
              <p className="text-orange-700 mb-3 text-sm">
                Organize them into tasks and notes now, or switch to braindump mode.
              </p>
              <button
                onClick={() => {
                  // TODO: Add processing functionality here
                  alert(`Ready to process ${unprocessedCount} items! This will open the processing modal.`)
                }}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors mr-3 text-sm"
              >
                Process Now ({unprocessedCount})
              </button>
              <span className="text-sm text-orange-600">
                or switch to Braindump tab above
              </span>
            </div>
          </div>
        )}

        {/* Floating Voice Recording Button */}
        <div className="fixed bottom-6 right-6 z-50">
          {!showQuickRecord ? (
            <button
              onClick={() => setShowQuickRecord(true)}
              className="w-14 h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
              aria-label="Start voice recording"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[320px] max-w-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">Quick Voice Input</h3>
                <button
                  onClick={() => setShowQuickRecord(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close voice recording"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <BraindumpInterface
                appData={appData}
                preferences={preferences}
                onDataUpdate={onDataUpdate}
                onRecordingStateChange={() => {}}
                onRecordingControls={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
