/**
 * OrganizedView Component
 * Enhanced dashboard that preserves legacy functionality while integrating with new data structure
 */

import { useState, useEffect, useRef } from 'react'
import Analytics from './Analytics'
import EditItemModal from './EditItemModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import BulkDeleteModal from './BulkDeleteModal'
import DateBadge from './DateBadge'
import ContextMenu, { type ContextMenuAction } from './ContextMenu'
import SaveTemplateModal from './SaveTemplateModal'
import TemplateLibrary from './TemplateLibrary'
import ProjectGroupView from './ProjectGroupView'
import { useContextMenu } from '@/hooks/useContextMenu'
import { useTemplates } from '@/hooks/useTemplates'
import { useLanguage } from '@/contexts/LanguageContext'
import type { AppData, UserPreferences, VoiceItem, TaskTemplate } from '@/types/braindump'
import { parseEarliestDate } from '@/lib/utils/dateParser'

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
  const { t } = useLanguage()
  const [filter, setFilter] = useState<'all' | 'tasks' | 'notes' | 'projects' | 'analytics'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'created' | 'none'>('none')
  const [searchQuery, setSearchQuery] = useState('')
  const [showExportMenu, setShowExportMenu] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<VoiceItem | null>(null)
  const [editType, setEditType] = useState<'task' | 'note'>('task')
  
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<VoiceItem | null>(null)
  const [deleteType, setDeleteType] = useState<'task' | 'note'>('task')
  
  // Bulk operations state
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [bulkMode, setBulkMode] = useState(false)
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false)
  const [bulkDeleteType, setBulkDeleteType] = useState<'selected' | 'completed'>('selected')

  // Context menu state
  const {
    menuState,
    handleContextMenu,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    closeMenu
  } = useContextMenu()

  // Template state
  const {
    templates,
    loading: templatesLoading,
    addTemplate,
    deleteTemplate,
    incrementUsage
  } = useTemplates()

  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false)
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false)
  const [itemToTemplate, setItemToTemplate] = useState<VoiceItem | null>(null)

  // Local translations for this component
  const localTranslations = {
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
      exportAsCalendar: 'Export as Calendar (.ics)',
      tasksFilter: 'Tasks',
      notesFilter: 'Notes',
      projectsFilter: 'Projects',
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
      exportAsCalendar: 'Exportar como Calendario (.ics)',
      tasksFilter: 'Tareas',
      notesFilter: 'Notas',
      projectsFilter: 'Proyectos',
      analytics: 'Analíticas',
      allItems: 'Todos los Elementos',
      keyboardShortcuts: 'Atajos de teclado',
      exportData: 'Exportar datos',
      focusSearch: 'Enfocar búsqueda',
      clearSearch: 'Limpiar búsqueda'
    }
  }
  
  const localT = localTranslations[language]
  
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
  
  const handleDeleteItem = (item: VoiceItem, type: 'task' | 'note') => {
    setItemToDelete(item)
    setDeleteType(type)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return
    
    const updatedData = {
      ...appData,
      tasks: deleteType === 'task' ? organizedTasks.filter(t => t.id !== itemToDelete.id) : organizedTasks,
      notes: deleteType === 'note' ? organizedNotes.filter(n => n.id !== itemToDelete.id) : organizedNotes
    }
    
    onDataUpdate(updatedData)
    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setItemToDelete(null)
  }
  
  /**
   * Handle edit item
   */
  const handleEditItem = (item: VoiceItem, type: 'task' | 'note') => {
    setItemToEdit(item)
    setEditType(type)
    setShowEditModal(true)
  }
  
  /**
   * Handle save edited item
   */
  const handleSaveEditedItem = async (updatedItem: VoiceItem) => {
    try {
      let updatedData: AppData
      
      if (editType === 'task') {
        const updatedTasks = organizedTasks.map(task => 
          task.id === updatedItem.id ? updatedItem : task
        )
        updatedData = {
          ...appData,
          tasks: updatedTasks
        }
      } else {
        const updatedNotes = organizedNotes.map(note => 
          note.id === updatedItem.id ? updatedItem : note
        )
        updatedData = {
          ...appData,
          notes: updatedNotes
        }
      }
      
      onDataUpdate(updatedData)
      setShowEditModal(false)
      
    } catch (error) {
      console.error('Failed to update item:', error)
    }
  }

  /**
   * Handle category change (task ↔ note)
   */
  const handleCategoryChange = (newCategory: 'task' | 'note') => {
    if (!itemToEdit || !editType) return

    try {
      let updatedData: AppData

      if (editType === 'task' && newCategory === 'note') {
        // Move from tasks to notes
        const updatedTasks = organizedTasks.filter(task => task.id !== itemToEdit.id)
        const updatedNotes = [...organizedNotes, { 
          ...itemToEdit, 
          classification: { 
            ...itemToEdit.classification, 
            category: 'notes' as const,
            confidence: itemToEdit.classification?.confidence || 0.5,
            reasoning: itemToEdit.classification?.reasoning || 'Converted from task'
          } 
        }]
        
        updatedData = {
          ...appData,
          tasks: updatedTasks,
          notes: updatedNotes
        }
      } else if (editType === 'note' && newCategory === 'task') {
        // Move from notes to tasks
        const updatedNotes = organizedNotes.filter(note => note.id !== itemToEdit.id)
        const updatedTasks = [...organizedTasks, { 
          ...itemToEdit, 
          classification: { 
            ...itemToEdit.classification, 
            category: 'tasks' as const,
            confidence: itemToEdit.classification?.confidence || 0.5,
            reasoning: itemToEdit.classification?.reasoning || 'Converted from note'
          } 
        }]
        
        updatedData = {
          ...appData,
          tasks: updatedTasks,
          notes: updatedNotes
        }
      } else {
        // No change needed
        return
      }

      onDataUpdate(updatedData)
      // Keep modal open so user can save manually
      // Update editType to reflect the new category
      setEditType(newCategory)
      
    } catch (error) {
      console.error('Failed to change category:', error)
    }
  }

  /**
   * Copy item text to clipboard
   */
  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  /**
   * Pin/unpin item
   */
  const handlePinItem = (itemId: string, type: 'task' | 'note') => {
    const items = type === 'task' ? organizedTasks : organizedNotes
    const updatedItems = items.map(item =>
      item.id === itemId
        ? {
            ...item,
            metadata: {
              ...item.metadata,
              pinned: !item.metadata?.pinned
            }
          }
        : item
    )

    onDataUpdate({
      ...appData,
      [type === 'task' ? 'tasks' : 'notes']: updatedItems
    })
  }

  /**
   * Convert item between task and note
   */
  const handleConvertItem = (item: VoiceItem, fromType: 'task' | 'note') => {
    if (fromType === 'task') {
      const updatedTasks = organizedTasks.filter(t => t.id !== item.id)
      const convertedItem: VoiceItem = {
        ...item,
        classification: item.classification ? {
          category: 'notes' as const,
          confidence: item.classification.confidence || 0,
          reasoning: item.classification.reasoning || '',
          metadata: item.classification.metadata
        } : {
          category: 'notes' as const,
          confidence: 0.5,
          reasoning: 'Converted from task',
        }
      }
      const updatedNotes = [...organizedNotes, convertedItem]

      onDataUpdate({
        ...appData,
        tasks: updatedTasks,
        notes: updatedNotes
      })
    } else {
      const updatedNotes = organizedNotes.filter(n => n.id !== item.id)
      const convertedItem: VoiceItem = {
        ...item,
        classification: item.classification ? {
          category: 'tasks' as const,
          confidence: item.classification.confidence || 0,
          reasoning: item.classification.reasoning || '',
          metadata: item.classification.metadata
        } : {
          category: 'tasks' as const,
          confidence: 0.5,
          reasoning: 'Converted from note',
        }
      }
      const updatedTasks = [...organizedTasks, convertedItem]

      onDataUpdate({
        ...appData,
        tasks: updatedTasks,
        notes: updatedNotes
      })
    }
  }

  /**
   * Open save template modal for an item
   */
  const handleSaveAsTemplate = (item: VoiceItem) => {
    setItemToTemplate(item)
    setShowSaveTemplateModal(true)
    closeMenu()
  }

  /**
   * Use a template to create a new item
   */
  const handleUseTemplate = async (template: TaskTemplate) => {
    const newItem: VoiceItem = {
      id: crypto.randomUUID(),
      text: template.text,
      timestamp: new Date().toISOString(),
      category: template.category,
      processed: true,
      priority: template.priority,
      tags: template.tags,
      completed: false,
      classification: {
        category: template.category,
        confidence: 1.0,
        reasoning: 'Created from template'
      },
      metadata: {
        source: 'template'
      }
    }

    if (template.category === 'tasks') {
      onDataUpdate({
        ...appData,
        tasks: [newItem, ...appData.tasks]
      })
    } else {
      onDataUpdate({
        ...appData,
        notes: [newItem, ...appData.notes]
      })
    }

    // Increment usage count
    await incrementUsage(template.id)

    // Close library
    setShowTemplateLibrary(false)
  }

  /**
   * Get context menu actions for an item
   */
  const getContextMenuActions = (item: VoiceItem | null, type: 'task' | 'note'): ContextMenuAction[] => {
    if (!item) return []

    const actions: ContextMenuAction[] = []

    // Mark complete (tasks only)
    if (type === 'task') {
      actions.push({
        label: item.completed ? 'Mark Incomplete' : 'Mark Complete',
        icon: '✅',
        onClick: () => handleToggleTask(item.id),
        variant: 'success'
      })
    }

    // Pin/Unpin
    actions.push({
      label: item.metadata?.pinned ? 'Unpin' : 'Pin to Top',
      icon: '📌',
      onClick: () => handlePinItem(item.id, type)
    })

    // Edit
    actions.push({
      label: 'Edit',
      icon: '✏️',
      onClick: () => handleEditItem(item, type)
    })

    // Convert
    actions.push({
      label: type === 'task' ? 'Convert to Note' : 'Convert to Task',
      icon: '🔄',
      onClick: () => handleConvertItem(item, type)
    })

    // Copy text
    actions.push({
      label: 'Copy Text',
      icon: '📋',
      onClick: () => handleCopyText(item.text)
    })

    // Save as Template
    actions.push({
      label: 'Save as Template',
      icon: '💾',
      onClick: () => handleSaveAsTemplate(item)
    })

    // Delete
    actions.push({
      label: 'Delete',
      icon: '🗑️',
      onClick: () => handleDeleteItem(item, type),
      variant: 'danger'
    })

    return actions
  }

  // Export functionality
  const exportToCSV = () => {
    const allItems = [
      ...organizedTasks.map(task => ({
        type: 'Task',
        content: task.text,
        completed: task.completed ? 'true' : 'false',
        priority: task.priority || 'none',
        tags: task.tags?.join(', ') || '',
        timestamp: new Date(task.timestamp).toISOString()
      })),
      ...organizedNotes.map(note => ({
        type: 'Note',
        content: note.text,
        completed: 'N/A',
        priority: 'N/A',
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

  const exportToCalendar = () => {
    // Helper function to format date for .ics
    const formatICSDate = (date: Date): string => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    // Helper function to parse date from task text
    const parseTaskDate = (text: string): Date | null => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(now.getDate() + 1)

      const lowerText = text.toLowerCase()
      
      // Check for specific date indicators
      if (lowerText.includes('today')) {
        return now
      } else if (lowerText.includes('tomorrow')) {
        return tomorrow
      } else if (lowerText.includes('morning')) {
        const morningDate = new Date(now)
        morningDate.setHours(9, 0, 0, 0)
        return morningDate
      } else if (lowerText.includes('evening') || lowerText.includes('tonight')) {
        const eveningDate = new Date(now)
        eveningDate.setHours(18, 0, 0, 0)
        return eveningDate
      } else if (lowerText.includes('afternoon')) {
        const afternoonDate = new Date(now)
        afternoonDate.setHours(14, 0, 0, 0)
        return afternoonDate
      }
      
      return null
    }

    // Generate unique ID for each event
    const generateUID = (id: string): string => {
      return `${id}@tickk.app`
    }

    // Create .ics content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//tickk//Voice Productivity App//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ]

    // Add tasks as calendar events
    organizedTasks.forEach(task => {
      const taskDate = parseTaskDate(task.text)
      if (taskDate) {
        const startDate = formatICSDate(taskDate)
        const endDate = formatICSDate(new Date(taskDate.getTime() + 60 * 60 * 1000)) // 1 hour duration
        
        icsContent.push(
          'BEGIN:VEVENT',
          `UID:${generateUID(task.id)}`,
          `DTSTART:${startDate}`,
          `DTEND:${endDate}`,
          `SUMMARY:${task.text.replace(/,/g, '\\,')}`,
          `DESCRIPTION:Imported from tickk voice note\\nPriority: ${task.priority || 'none'}\\nCompleted: ${task.completed ? 'Yes' : 'No'}`,
          `CATEGORIES:TASK${task.priority ? ',' + task.priority.toUpperCase() : ''}`,
          `PRIORITY:${task.priority === 'high' ? '1' : task.priority === 'medium' ? '5' : '9'}`,
          `STATUS:${task.completed ? 'COMPLETED' : 'CONFIRMED'}`,
          `CREATED:${formatICSDate(new Date(task.timestamp))}`,
          `LAST-MODIFIED:${formatICSDate(new Date())}`,
          'END:VEVENT'
        )
      } else {
        // Add as all-day event if no specific time detected
        const today = new Date()
        const dateOnly = today.toISOString().split('T')[0].replace(/-/g, '')
        
        icsContent.push(
          'BEGIN:VEVENT',
          `UID:${generateUID(task.id)}`,
          `DTSTART;VALUE=DATE:${dateOnly}`,
          `SUMMARY:${task.text.replace(/,/g, '\\,')}`,
          `DESCRIPTION:Imported from tickk voice note\\nPriority: ${task.priority || 'none'}\\nCompleted: ${task.completed ? 'Yes' : 'No'}`,
          `CATEGORIES:TASK${task.priority ? ',' + task.priority.toUpperCase() : ''}`,
          `PRIORITY:${task.priority === 'high' ? '1' : task.priority === 'medium' ? '5' : '9'}`,
          `STATUS:${task.completed ? 'COMPLETED' : 'CONFIRMED'}`,
          `CREATED:${formatICSDate(new Date(task.timestamp))}`,
          `LAST-MODIFIED:${formatICSDate(new Date())}`,
          'END:VEVENT'
        )
      }
    })

    icsContent.push('END:VCALENDAR')

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `tickk-calendar-${new Date().toISOString().split('T')[0]}.ics`
    link.click()
  }

  // Bulk operations
  const toggleBulkMode = () => {
    setBulkMode(!bulkMode)
    setSelectedItems(new Set())
  }

  const toggleItemSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId)
    } else {
      newSelected.add(itemId)
    }
    setSelectedItems(newSelected)
  }

  const selectAllItems = () => {
    const currentItems = filter === 'tasks'
      ? filteredTasks
      : filter === 'notes'
      ? filteredNotes
      : [...filteredTasks, ...filteredNotes]

    const allIds = new Set(currentItems.map(item => item.id))
    setSelectedItems(allIds)
  }

  const selectNoneItems = () => {
    setSelectedItems(new Set())
  }

  const deleteSelectedItems = () => {
    setBulkDeleteType('selected')
    setShowBulkDeleteModal(true)
  }

  const deleteCompletedItems = () => {
    setBulkDeleteType('completed')
    setShowBulkDeleteModal(true)
  }

  const handleBulkDeleteConfirm = () => {
    if (bulkDeleteType === 'selected') {
      const updatedTasks = organizedTasks.filter(task => !selectedItems.has(task.id))
      const updatedNotes = organizedNotes.filter(note => !selectedItems.has(note.id))
      
      onDataUpdate({
        ...appData,
        tasks: updatedTasks,
        notes: updatedNotes
      })
      
      setSelectedItems(new Set())
    } else if (bulkDeleteType === 'completed') {
      const updatedTasks = organizedTasks.filter(task => !task.completed)
      
      onDataUpdate({
        ...appData,
        tasks: updatedTasks
      })
    }
    
    setShowBulkDeleteModal(false)
    setBulkMode(false)
  }

  const handleBulkDeleteCancel = () => {
    setShowBulkDeleteModal(false)
  }

  const getCompletedTasksCount = () => {
    return organizedTasks.filter(task => task.completed).length
  }

  // Sorting function
  const sortItems = (items: VoiceItem[]) => {
    if (sortBy === 'none') return items

    return [...items].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = parseEarliestDate(a.metadata?.dateInfo as string)
        const dateB = parseEarliestDate(b.metadata?.dateInfo as string)

        // Items with dates come first
        if (dateA && !dateB) return -1
        if (!dateA && dateB) return 1
        if (dateA && dateB) return dateA.getTime() - dateB.getTime()

        // If no dates, fall back to created time
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      }

      if (sortBy === 'created') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }

      return 0
    })
  }

  // Apply sorting to all items
  const sortedTasks = sortItems(organizedTasks)
  const sortedNotes = sortItems(organizedNotes)

  // Search functionality (applied after sorting)
  const filteredTasks = searchQuery
    ? sortedTasks.filter(task =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : sortedTasks

  const filteredNotes = searchQuery
    ? sortedNotes.filter(note =>
        note.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : sortedNotes

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
            {localT.yourWorkspace}
          </h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
            {localT.everythingOrganized}
          </p>
        </div>

        {/* Clean Stats Summary - Mobile Optimized */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 sm:gap-x-8 mb-8 text-sm text-gray-600 px-4">
          <span><strong className="text-gray-900">{organizedTasks.length}</strong> {localT.tasks}</span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span><strong className="text-gray-900">{organizedNotes.length}</strong> {localT.notes}</span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span><strong className="text-gray-900">{organizedTasks.filter(t => t.completed).length}</strong> {localT.completed}</span>
          {unprocessedCount > 0 && (
            <>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-orange-600"><strong>{unprocessedCount}</strong> {localT.unprocessed}</span>
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
                placeholder={localT.search}
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
                {localT.found} {filteredTasks.length + filteredNotes.length} {localT.results}
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
              {localT.export}
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    exportToCSV()
                    setShowExportMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg min-h-[44px] flex items-center"
                >
                  {localT.exportAsCSV}
                </button>
                <button
                  onClick={() => {
                    exportToJSON()
                    setShowExportMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 min-h-[44px] flex items-center"
                >
                  {localT.exportAsJSON}
                </button>
                <button
                  onClick={() => {
                    exportToCalendar()
                    setShowExportMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-lg min-h-[44px] flex items-center"
                >
                  {localT.exportAsCalendar}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bulk Operations Bar */}
        {filter !== 'analytics' && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleBulkMode}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  bulkMode
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {bulkMode ? 'Exit Bulk Mode' : 'Bulk Actions'}
              </button>

              <button
                onClick={() => setShowTemplateLibrary(true)}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
              >
                <span>📝</span>
                Templates
                {templates.length > 0 && (
                  <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {templates.length}
                  </span>
                )}
              </button>

              {bulkMode && (
                <>
                  <span className="text-sm text-gray-600">
                    {selectedItems.size} {t('common.selected')}
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={selectAllItems}
                      className="px-3 py-1 text-xs text-blue-600 hover:text-blue-800"
                    >
                      {t('common.select_all')}
                    </button>
                    <button
                      onClick={selectNoneItems}
                      className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800"
                    >
                      {t('common.select_none')}
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {bulkMode && (
              <div className="flex gap-2">
                {selectedItems.size > 0 && (
                  <button
                    onClick={deleteSelectedItems}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50"
                  >
                    {t('common.delete_selected')} ({selectedItems.size})
                  </button>
                )}
                
                {getCompletedTasksCount() > 0 && (
                  <button
                    onClick={deleteCompletedItems}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50"
                  >
                    {t('common.delete_completed')} ({getCompletedTasksCount()})
                  </button>
                )}
              </div>
            )}
          </div>
        )}

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
            {localT.tasksFilter} ({organizedTasks.length})
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
            {localT.notesFilter} ({organizedNotes.length})
            {filter === 'notes' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <button
            onClick={() => setFilter('projects')}
            className={`text-xs sm:text-sm font-medium transition-colors duration-200 relative px-2 py-1 rounded-lg min-h-[44px] flex items-center ${
              filter === 'projects'
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {localT.projectsFilter}
            {filter === 'projects' && (
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
            {localT.analytics}
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
            {localT.allItems}
            {filter === 'all' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Sort Options */}
        {filter !== 'analytics' && (
          <div className="flex justify-center items-center gap-2 mb-6">
            <label htmlFor="sort-select" className="text-xs text-gray-600">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'created' | 'none')}
              className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="none">Default</option>
              <option value="date">Date (earliest first)</option>
              <option value="created">Recently Created</option>
            </select>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="text-center mb-8">
          <details className="inline-block">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
              {localT.keyboardShortcuts}
            </summary>
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <div><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl/Cmd + E</kbd> {localT.exportData}</div>
              <div><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl/Cmd + F</kbd> {localT.focusSearch}</div>
              <div><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> {localT.clearSearch}</div>
            </div>
          </details>
        </div>
        
        {/* Content Area */}
        {filter === 'analytics' ? (
          <div data-analytics>
            <Analytics appData={appData} />
          </div>
        ) : filter === 'projects' ? (
          <ProjectGroupView
            tasks={organizedTasks}
            onToggleTask={handleToggleTask}
            onEditTask={(task) => handleEditItem(task, 'task')}
            onDeleteTask={(task) => handleDeleteItem(task, 'task')}
            onContextMenu={handleContextMenu}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          />
        ) : (
          <div className="space-y-8">
            {/* Clean Task List - Mobile Optimized */}
            {(filter === 'all' || filter === 'tasks') && filteredTasks.length > 0 && (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 sm:gap-4 py-4 border-b border-gray-100 last:border-b-0"
                    onContextMenu={(e) => handleContextMenu(e, task.id)}
                    onTouchStart={(e) => handleTouchStart(e, task.id)}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={handleTouchMove}
                  >
                    <input
                      type="checkbox"
                      checked={bulkMode ? selectedItems.has(task.id) : (task.completed || false)}
                      onChange={() => bulkMode ? toggleItemSelection(task.id) : handleToggleTask(task.id)}
                      className={`mt-1 w-4 h-4 bg-white border-gray-300 rounded focus:ring-2 flex-shrink-0 ${
                        bulkMode 
                          ? 'text-orange-600 focus:ring-orange-500' 
                          : 'text-green-600 focus:ring-green-500'
                      }`}
                      aria-label={bulkMode 
                        ? `Select task for bulk operations`
                        : `Mark task as ${task.completed ? 'incomplete' : 'complete'}`
                      }
                    />
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className={`text-sm break-words ${
                        task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {task.text}
                      </p>
                      {((task.tags && task.tags.length > 0) || task.priority || task.metadata?.dateInfo) && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {task.metadata?.dateInfo && (
                            <DateBadge dateInfo={task.metadata.dateInfo as string} />
                          )}
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
                      <span className="text-right">{new Date(task.timestamp).toLocaleString()}</span>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditItem(task, 'task')}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          aria-label={t('common.edit_item')}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteItem(task, 'task')}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          aria-label={t('common.delete_item')}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Clean Notes List - Mobile Optimized */}
            {(filter === 'all' || filter === 'notes') && filteredNotes.length > 0 && (
              <div className="space-y-4">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-start gap-3 sm:gap-4 py-4 border-b border-gray-100 last:border-b-0"
                    onContextMenu={(e) => handleContextMenu(e, note.id)}
                    onTouchStart={(e) => handleTouchStart(e, note.id)}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={handleTouchMove}
                  >
                    <input
                      type="checkbox"
                      checked={bulkMode ? selectedItems.has(note.id) : false}
                      onChange={() => bulkMode ? toggleItemSelection(note.id) : undefined}
                      className={`mt-1 w-4 h-4 bg-white border-gray-300 rounded focus:ring-2 flex-shrink-0 ${
                        bulkMode 
                          ? 'text-orange-600 focus:ring-orange-500' 
                          : 'text-purple-600 focus:ring-purple-500'
                      }`}
                      aria-label={bulkMode 
                        ? "Select note for bulk operations"
                        : "Mark note as completed"
                      }
                    />
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="text-sm text-gray-900 break-words">{note.text}</p>
                      {((note.tags && note.tags.length > 0) || note.metadata?.dateInfo) && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {note.metadata?.dateInfo && (
                            <DateBadge dateInfo={note.metadata.dateInfo as string} />
                          )}
                          {note.tags && note.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs flex-shrink-0">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 text-xs text-gray-500 flex-shrink-0">
                      <span className="text-right">{new Date(note.timestamp).toLocaleString()}</span>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditItem(note, 'note')}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          aria-label={t('common.edit_item')}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteItem(note, 'note')}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          aria-label={t('common.delete_item')}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {((filter === 'tasks' && filteredTasks.length === 0) ||
              (filter === 'notes' && filteredNotes.length === 0) ||
              (filter === 'all' && filteredTasks.length === 0 && filteredNotes.length === 0)) && (
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
      
      {/* Edit Item Modal */}
      {showEditModal && (
        <EditItemModal
          isOpen={showEditModal}
          item={itemToEdit}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEditedItem}
          onCategoryChange={handleCategoryChange}
          type={editType}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          itemText={itemToDelete.text}
          itemType={deleteType}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Bulk Delete Modal */}
      {showBulkDeleteModal && (
        <BulkDeleteModal
          isOpen={showBulkDeleteModal}
          itemCount={bulkDeleteType === 'selected' ? selectedItems.size : getCompletedTasksCount()}
          itemType={bulkDeleteType}
          onConfirm={handleBulkDeleteConfirm}
          onCancel={handleBulkDeleteCancel}
        />
      )}

      {/* Context Menu */}
      {menuState && (
        <ContextMenu
          x={menuState.x}
          y={menuState.y}
          actions={getContextMenuActions(
            [...filteredTasks, ...filteredNotes].find(item => item.id === menuState.itemId) || null,
            filteredTasks.find(t => t.id === menuState.itemId) ? 'task' : 'note'
          )}
          onClose={closeMenu}
        />
      )}

      {/* Save Template Modal */}
      <SaveTemplateModal
        isOpen={showSaveTemplateModal}
        item={itemToTemplate}
        onSave={addTemplate}
        onClose={() => {
          setShowSaveTemplateModal(false)
          setItemToTemplate(null)
        }}
      />

      {/* Template Library Modal */}
      <TemplateLibrary
        isOpen={showTemplateLibrary}
        templates={templates}
        onUseTemplate={handleUseTemplate}
        onDeleteTemplate={deleteTemplate}
        onClose={() => setShowTemplateLibrary(false)}
        loading={templatesLoading}
      />
    </div>
  )
}
