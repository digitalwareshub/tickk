/**
 * OrganizedView Component
 * Enhanced dashboard that preserves legacy functionality while integrating with new data structure
 */

import { useState, useEffect, useRef } from 'react'
import Analytics from './Analytics'
import type { AppData, UserPreferences } from '@/types/braindump'

interface OrganizedViewProps {
  appData: AppData
  preferences: UserPreferences | null
  onDataUpdate: (data: AppData) => void
  language?: 'en' | 'es'
}

export default function OrganizedView({ 
  appData, 
  onDataUpdate,
  language = 'en'
}: OrganizedViewProps) {
  const [filter, setFilter] = useState<'all' | 'tasks' | 'notes' | 'analytics'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showExportMenu, setShowExportMenu] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Translations
  const translations = {
    en: {
      yourWorkspace: 'Your Workspace',
      everythingOrganized: 'Everything organized and actionable.',
      tasks: 'tasks',
      notes: 'notes', 
      completed: 'completed',
      unprocessed: 'unprocessed',
      search: 'Search...',
      found: 'Found',
      results: 'results',
      export: 'Export',
      exportAsCSV: 'Export as CSV',
      exportAsJSON: 'Export as JSON',
      tasksFilter: 'Tasks',
      notesFilter: 'Notes',
      analytics: 'Analytics',
      allItems: 'All Items',
      keyboardShortcuts: 'Keyboard shortcuts',
      exportData: 'Export data',
      focusSearch: 'Focus search',
      clearSearch: 'Clear search'
    },
    es: {
      yourWorkspace: 'Tu Espacio de Trabajo',
      everythingOrganized: 'Todo organizado y accionable.',
      tasks: 'tareas',
      notes: 'notas',
      completed: 'completadas',
      unprocessed: 'sin procesar',
      search: 'Buscar...',
      found: 'Encontrado',
      results: 'resultados',
      export: 'Exportar',
      exportAsCSV: 'Exportar como CSV',
      exportAsJSON: 'Exportar como JSON',
      tasksFilter: 'Tareas',
      notesFilter: 'Notas',
      analytics: 'Analíticas',
      allItems: 'Todos los Elementos',
      keyboardShortcuts: 'Atajos de teclado',
      exportData: 'Exportar datos',
      focusSearch: 'Enfocar búsqueda',
      clearSearch: 'Limpiar búsqueda'
    }
  }
  
  const t = translations[language]
  
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

  // Export functionality
  const exportToCSV = () => {
    const allItems = [
      ...organizedTasks.map(task => ({
        type: 'Task',
        content: task.text,
        completed: task.completed,
        priority: task.priority || '',
        tags: task.tags?.join(', ') || '',
        timestamp: new Date(task.timestamp).toISOString()
      })),
      ...organizedNotes.map(note => ({
        type: 'Note',
        content: note.text,
        completed: '',
        priority: '',
        tags: note.tags?.join(', ') || '',
        timestamp: new Date(note.timestamp).toISOString()
      }))
    ]

    const headers = ['Type', 'Content', 'Completed', 'Priority', 'Tags', 'Timestamp']
    const csvContent = [
      headers.join(','),
      ...allItems.map(item => 
        headers.map(header => {
          const value = item[header.toLowerCase() as keyof typeof item]
          return `"${String(value).replace(/"/g, '""')}"`
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `tickk-export-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const exportToJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      tasks: organizedTasks,
      notes: organizedNotes,
      summary: {
        totalTasks: organizedTasks.length,
        completedTasks: organizedTasks.filter(t => t.completed).length,
        totalNotes: organizedNotes.length
      }
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `tickk-export-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  // Search functionality
  const filteredTasks = organizedTasks.filter(task => 
    task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredNotes = organizedNotes.filter(note => 
    note.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + E - Export menu
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault()
        setShowExportMenu(!showExportMenu)
      }
      
      // Ctrl/Cmd + F - Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      
      // Escape - Clear search
      if (e.key === 'Escape') {
        setSearchQuery('')
        setShowExportMenu(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showExportMenu])
  
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 mb-2">
            {t.yourWorkspace}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t.everythingOrganized}
          </p>
        </div>

        {/* Clean Stats Summary - Mobile Optimized */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 sm:gap-x-8 mb-8 text-sm text-gray-600 px-4">
          <span><strong className="text-gray-900">{organizedTasks.length}</strong> {t.tasks}</span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span><strong className="text-gray-900">{organizedNotes.length}</strong> {t.notes}</span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span><strong className="text-gray-900">{organizedTasks.filter(t => t.completed).length}</strong> {t.completed}</span>
          {unprocessedCount > 0 && (
            <>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-orange-600"><strong>{unprocessedCount}</strong> {t.unprocessed}</span>
            </>
          )}
        </div>

        {/* Search and Export Bar - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-8 gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-full sm:max-w-md">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white min-h-[44px]"
              />
              <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 hover:text-gray-600 min-h-[44px] flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-xs text-gray-500 mt-1 px-1">
                {t.found} {filteredTasks.length + filteredNotes.length} {t.results}
              </p>
            )}
          </div>

          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[44px] w-full sm:w-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t.export}
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    exportToCSV()
                    setShowExportMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg min-h-[44px] flex items-center"
                >
                  {t.exportAsCSV}
                </button>
                <button
                  onClick={() => {
                    exportToJSON()
                    setShowExportMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-lg min-h-[44px] flex items-center"
                >
                  {t.exportAsJSON}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Clean Navigation - Mobile Optimized */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-8 mb-12">
          <button
            onClick={() => setFilter('tasks')}
            className={`text-xs sm:text-sm font-medium transition-colors duration-200 relative px-2 py-1 rounded-lg min-h-[44px] flex items-center ${
              filter === 'tasks'
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {t.tasksFilter} ({organizedTasks.length})
            {filter === 'tasks' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <button
            onClick={() => setFilter('notes')}
            className={`text-xs sm:text-sm font-medium transition-colors duration-200 relative px-2 py-1 rounded-lg min-h-[44px] flex items-center ${
              filter === 'notes'
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {t.notesFilter} ({organizedNotes.length})
            {filter === 'notes' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <button
            onClick={() => setFilter('analytics')}
            className={`text-xs sm:text-sm font-medium transition-colors duration-200 relative px-2 py-1 rounded-lg min-h-[44px] flex items-center ${
              filter === 'analytics'
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {t.analytics}
            {filter === 'analytics' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <button
            onClick={() => setFilter('all')}
            className={`text-xs sm:text-sm font-medium transition-colors duration-200 relative px-2 py-1 rounded-lg min-h-[44px] flex items-center ${
              filter === 'all'
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {t.allItems}
            {filter === 'all' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="text-center mb-8">
          <details className="inline-block">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
              {t.keyboardShortcuts}
            </summary>
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <div><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl/Cmd + E</kbd> {t.exportData}</div>
              <div><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl/Cmd + F</kbd> {t.focusSearch}</div>
              <div><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> {t.clearSearch}</div>
            </div>
          </details>
        </div>
        
        {/* Content Area */}
        {filter === 'analytics' ? (
          <div data-analytics>
            <Analytics appData={appData} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Clean Task List - Mobile Optimized */}
            {(filter === 'all' || filter === 'tasks') && (searchQuery ? filteredTasks : organizedTasks).length > 0 && (
              <div className="space-y-4">
                {(searchQuery ? filteredTasks : organizedTasks).map((task) => (
                  <div key={task.id} className="flex items-start gap-3 sm:gap-4 py-4 border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 min-h-[44px] min-w-[44px] ${
                        task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className={`text-sm break-words ${
                        task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {task.text}
                      </p>
                      {((task.tags && task.tags.length > 0) || task.priority) && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {task.priority && (
                            <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${
                              task.priority === 'high' ? 'bg-red-100 text-red-600' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {task.priority}
                            </span>
                          )}
                          {task.tags && task.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs flex-shrink-0">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 text-xs text-gray-500 flex-shrink-0">
                      <span className="text-right">{new Date(task.timestamp).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleDeleteItem(task.id, 'task')}
                        className="text-gray-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px]"
                        aria-label="Delete task"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Clean Notes List - Mobile Optimized */}
            {(filter === 'all' || filter === 'notes') && (searchQuery ? filteredNotes : organizedNotes).length > 0 && (
              <div className="space-y-4">
                {(searchQuery ? filteredNotes : organizedNotes).map((note) => (
                  <div key={note.id} className="flex items-start gap-3 sm:gap-4 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="w-5 h-5 mt-1 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="text-sm text-gray-900 break-words">{note.text}</p>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {note.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs flex-shrink-0">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 text-xs text-gray-500 flex-shrink-0">
                      <span className="text-right">{new Date(note.timestamp).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleDeleteItem(note.id, 'note')}
                        className="text-gray-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px]"
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
            {((filter === 'tasks' && (searchQuery ? filteredTasks : organizedTasks).length === 0) || 
              (filter === 'notes' && (searchQuery ? filteredNotes : organizedNotes).length === 0) || 
              (filter === 'all' && (searchQuery ? filteredTasks : organizedTasks).length === 0 && (searchQuery ? filteredNotes : organizedNotes).length === 0)) && (
              <div className="text-center py-12 text-gray-500">
                {searchQuery ? (
                  <>
                    <p className="text-sm mb-2">No results found for &quot;{searchQuery}&quot;</p>
                    <p className="text-xs text-gray-400">
                      Try a different search term or clear the search
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm mb-2">No {filter === 'all' ? 'items' : filter} yet</p>
                    <p className="text-xs text-gray-400">
                      Switch to Braindump mode to start capturing your thoughts
                    </p>
                  </>
                )}
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
