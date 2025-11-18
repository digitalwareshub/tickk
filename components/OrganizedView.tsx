/**
 * OrganizedView Component
 * Enhanced dashboard that preserves legacy functionality while integrating with new data structure
 */

import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { ErrorMessages, SuccessMessages } from '@/lib/utils/error-messages'
import Analytics from './Analytics'
import EditItemModal from './EditItemModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import BulkDeleteModal from './BulkDeleteModal'
import ImportModal from './ImportModal'
import DateBadge from './DateBadge'
import ContextMenu, { type ContextMenuAction } from './ContextMenu'
import ActionButtons from './ActionButtons'
import SaveTemplateModal from './SaveTemplateModal'
import TemplateLibrary from './TemplateLibrary'
import ProjectGroupView from './ProjectGroupView'
import { useContextMenu } from '@/hooks/useContextMenu'
import { useTemplates } from '@/hooks/useTemplates'
import { StorageService } from '@/lib/storage/storage-service'
import type { AppData, UserPreferences, VoiceItem, TaskTemplate } from '@/types/braindump'
import { parseEarliestDate } from '@/lib/utils/dateParser'
import { exportToCalendar as exportICS, getExportableTasksCount } from '@/lib/utils/icsExport'

interface OrganizedViewProps {
  appData: AppData
  preferences: UserPreferences | null
  onDataUpdate: (data: AppData) => void
}

export default function OrganizedView({
  appData,
  onDataUpdate
}: OrganizedViewProps) {
  const [filter, setFilter] = useState<'all' | 'tasks' | 'notes' | 'projects' | 'analytics'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'created' | 'none'>('none')
  const [searchQuery, setSearchQuery] = useState('')
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const sortMenuRef = useRef<HTMLDivElement>(null)
  
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
  const [itemToTemplateType, setItemToTemplateType] = useState<'task' | 'note'>('task')
  
  // Get organized items (tasks and notes)
  const organizedTasks = appData.tasks || []
  const organizedNotes = appData.notes || []
  const unprocessedCount = appData.braindump?.filter(item => !item.processed).length || 0
  
  const handleToggleTask = async (taskId: string) => {
    // If user clicks a checkbox while not in bulk mode, just toggle completion
    const task = organizedTasks.find(t => t.id === taskId)
    const wasCompleted = task?.completed
    
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
    
    // Remove from selected items if in bulk mode
    if (bulkMode && selectedItems.has(taskId)) {
      const newSelected = new Set(selectedItems)
      newSelected.delete(taskId)
      setSelectedItems(newSelected)
    }
    
    toast.success(wasCompleted ? 'Marked as incomplete!' : 'Marked as complete! ✓')
  }

  const handleToggleNote = async (noteId: string) => {
    const note = organizedNotes.find(n => n.id === noteId)
    const wasCompleted = note?.completed
    
    const updatedNotes = organizedNotes.map(note => 
      note.id === noteId 
        ? { ...note, completed: !note.completed }
        : note
    )
    
    const updatedData = {
      ...appData,
      notes: updatedNotes
    }
    
    onDataUpdate(updatedData)
    
    // Remove from selected items if in bulk mode
    if (bulkMode && selectedItems.has(noteId)) {
      const newSelected = new Set(selectedItems)
      newSelected.delete(noteId)
      setSelectedItems(newSelected)
    }
    
    toast.success(wasCompleted ? 'Note unmarked!' : 'Note marked! ✓')
  }
  
  const handleDeleteItem = (item: VoiceItem, type: 'task' | 'note') => {
    setItemToDelete(item)
    setDeleteType(type)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return
    
    try {
      const updatedData = {
        ...appData,
        tasks: deleteType === 'task' ? organizedTasks.filter(t => t.id !== itemToDelete.id) : organizedTasks,
        notes: deleteType === 'note' ? organizedNotes.filter(n => n.id !== itemToDelete.id) : organizedNotes
      }
      
      onDataUpdate(updatedData)
      toast.success(SuccessMessages.DELETE_SUCCESS)
    } catch (error) {
      console.error('Failed to delete item:', error)
      toast.error(ErrorMessages.STORAGE_DELETE_FAILED)
    } finally {
      setShowDeleteModal(false)
      setItemToDelete(null)
    }
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
      toast.success(SuccessMessages.UPDATE_SUCCESS)
      
    } catch (error) {
      console.error('Failed to update item:', error)
      toast.error(ErrorMessages.STORAGE_UPDATE_FAILED)
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
      toast.success('Category changed successfully')
      
    } catch (error) {
      console.error('Failed to change category:', error)
      toast.error(ErrorMessages.STORAGE_UPDATE_FAILED)
    }
  }

  /**
   * Copy item text to clipboard
   */
  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(SuccessMessages.COPIED_TO_CLIPBOARD)
    } catch (error) {
      console.error('Failed to copy text:', error)
      toast.error(ErrorMessages.COPY_FAILED)
    }
  }

  /**
   * Pin/unpin item
   */
  const handlePinItem = (itemId: string, type: 'task' | 'note') => {
    const items = type === 'task' ? organizedTasks : organizedNotes
    const isPinned = items.find(item => item.id === itemId)?.metadata?.pinned
    
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
    
    toast.success(isPinned ? 'Unpinned successfully!' : 'Pinned to top!')
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
      
      toast.success('Converted to note!')
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
      
      toast.success('Converted to task!')
    }
  }

  /**
   * Open save template modal for an item
   */
  const handleSaveAsTemplate = (item: VoiceItem, type: 'task' | 'note') => {
    setItemToTemplate(item)
    setItemToTemplateType(type)
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
   * Handle adding item to Focus with custom timer
   */
  const handleAddToFocus = (item: VoiceItem, type: 'task' | 'note') => {
    console.log('Add to Focus clicked for:', item.text, type)
    // TODO: Implement custom timer modal
    // For now, just add a focus metadata flag
    const updatedItem = {
      ...item,
      metadata: {
        ...item.metadata,
        focusAdded: true,
        focusTimer: 25 // Default timer for now
      }
    }
    
    // Update the item in the appropriate array
    let updatedData: AppData
    if (type === 'task') {
      const updatedTasks = organizedTasks.map(task => 
        task.id === item.id ? updatedItem : task
      )
      updatedData = { ...appData, tasks: updatedTasks }
    } else {
      const updatedNotes = organizedNotes.map(note => 
        note.id === item.id ? updatedItem : note
      )
      updatedData = { ...appData, notes: updatedNotes }
    }
    
    onDataUpdate(updatedData)
    toast.success('Added to Focus mode!')
    
    // TODO: Show confirmation or navigate to Focus mode
    console.log('Item added to Focus:', updatedItem)
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

    // Add to Focus
    actions.push({
      label: 'Add to Focus',
      icon: '🎯',
      onClick: () => handleAddToFocus(item, type)
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
      onClick: () => handleSaveAsTemplate(item, type)
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
    toast.success(SuccessMessages.EXPORT_SUCCESS)
  }

  const exportToCalendar = () => {
    try {
      const totalTasks = organizedTasks.length
      const exportableCount = getExportableTasksCount(organizedTasks)
      
      if (exportableCount === 0) {
        toast.error(ErrorMessages.EXPORT_NO_DATES)
        return
      }

      exportICS(organizedTasks)
      
      // Show different success messages based on what was exported
      if (exportableCount < totalTasks) {
        const skipped = totalTasks - exportableCount
        toast.success(
          `Calendar exported with ${exportableCount} task${exportableCount !== 1 ? 's' : ''}. ` +
          `${skipped} task${skipped !== 1 ? 's' : ''} without dates were skipped.`,
          { duration: 6000 }
        )
      } else {
        toast.success(SuccessMessages.CALENDAR_EXPORTED)
      }
    } catch (error) {
      console.error('Failed to export calendar:', error)
      toast.error(ErrorMessages.EXPORT_CALENDAR_FAILED)
    }
  }

  // Import handler
  const handleImport = async (importedData: AppData): Promise<{ success: boolean; error?: string }> => {
    try {
      const storageService = StorageService.getInstance()
      const result = await storageService.importData(importedData)
      
      if (result.success) {
        // Reload the page to show imported data
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
      
      return result
    } catch (error) {
      console.error('Import failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Import failed'
      }
    }
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
    try {
      let deletedCount = 0
      
      if (bulkDeleteType === 'selected') {
        deletedCount = selectedItems.size
        
        const updatedTasks = (appData.tasks || []).filter(task => !selectedItems.has(task.id))
        const updatedNotes = (appData.notes || []).filter(note => !selectedItems.has(note.id))
        
        // Log for debugging if needed
        const tasksDeleted = (appData.tasks?.length || 0) - updatedTasks.length
        const notesDeleted = (appData.notes?.length || 0) - updatedNotes.length
        console.log(`Bulk delete: ${tasksDeleted} tasks, ${notesDeleted} notes (${deletedCount} total selected)`)
        
        onDataUpdate({
          ...appData,
          tasks: updatedTasks,
          notes: updatedNotes
        })
        
        setSelectedItems(new Set())
      } else if (bulkDeleteType === 'completed') {
        deletedCount = getCompletedTasksCount()
        const updatedTasks = (appData.tasks || []).filter(task => !task.completed)
        
        onDataUpdate({
          ...appData,
          tasks: updatedTasks
        })
      }
      
      toast.success(`${deletedCount} item${deletedCount !== 1 ? 's' : ''} deleted successfully!`)
      setShowBulkDeleteModal(false)
      setBulkMode(false)
    } catch (error) {
      console.error('Failed to delete items:', error)
      toast.error(ErrorMessages.STORAGE_DELETE_FAILED)
    }
  }

  const handleBulkDeleteCancel = () => {
    setShowBulkDeleteModal(false)
  }

  const getCompletedTasksCount = () => {
    return organizedTasks.filter(task => task.completed).length
  }

  // Sorting function
  const sortItems = (items: VoiceItem[]) => {
    return [...items].sort((a, b) => {
      // ALWAYS prioritize pinned items first, regardless of other sorting
      const aPinned = a.metadata?.pinned || false
      const bPinned = b.metadata?.pinned || false
      
      if (aPinned && !bPinned) return -1
      if (!aPinned && bPinned) return 1
      
      // If both are pinned or both are not pinned, apply secondary sorting
      if (sortBy === 'none') {
        // For 'none', maintain creation order (newer first) after pinned sorting
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }

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

  // Combined and sorted list for "All Items" view
  const allItemsCombined = (() => {
    const combined = [
      ...filteredTasks.map(task => ({ ...task, itemType: 'task' as const })),
      ...filteredNotes.map(note => ({ ...note, itemType: 'note' as const }))
    ]
    
    // Sort the combined list with pinned items first
    return combined.sort((a, b) => {
      // ALWAYS prioritize pinned items first
      const aPinned = a.metadata?.pinned || false
      const bPinned = b.metadata?.pinned || false
      
      if (aPinned && !bPinned) return -1
      if (!aPinned && bPinned) return 1
      
      // If both are pinned or both are not pinned, apply secondary sorting
      if (sortBy === 'none') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }

      if (sortBy === 'date') {
        const dateA = parseEarliestDate(a.metadata?.dateInfo as string)
        const dateB = parseEarliestDate(b.metadata?.dateInfo as string)

        if (dateA && !dateB) return -1
        if (!dateA && dateB) return 1
        if (dateA && dateB) return dateA.getTime() - dateB.getTime()

        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      }

      if (sortBy === 'created') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }

      return 0
    })
  })()

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
      
      // Escape - Clear search and close menus
      if (e.key === 'Escape') {
        setSearchQuery('')
        setShowExportMenu(false)
        setShowSortMenu(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showExportMenu])

  // Click outside handler for sort menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setShowSortMenu(false)
      }
    }

    if (showSortMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSortMenu])
  
  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-violet-950">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="heading-primary text-gray-900 dark:text-slate-50 mb-2">
            {'Your Workspace'}
          </h1>
          <p className="text-responsive text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            {'Everything organized and actionable.'}
          </p>
        </div>

        {/* Clean Stats Summary - Mobile Optimized */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 sm:gap-x-8 mb-8 text-sm text-gray-600 dark:text-slate-300 px-4">
          <span><strong className="text-gray-900 dark:text-slate-100">{organizedTasks.length}</strong> {'tasks'}</span>
          <span className="text-gray-300 dark:text-slate-600 hidden sm:inline">•</span>
          <span><strong className="text-gray-900 dark:text-slate-100">{organizedNotes.length}</strong> notes</span>
          <span className="text-gray-300 dark:text-slate-600 hidden sm:inline">•</span>
          <span><strong className="text-gray-900 dark:text-slate-100">{organizedTasks.filter(t => t.completed).length}</strong> {'completed'}</span>
          {unprocessedCount > 0 && (
            <>
              <span className="text-gray-300 dark:text-slate-600 hidden sm:inline">•</span>
              <span className="text-orange-600 dark:text-orange-400"><strong>{unprocessedCount}</strong> {'unprocessed'}</span>
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
                placeholder={'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 text-sm bg-gray-50 dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600 focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 min-h-[44px]"
              />
              <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 min-h-[44px] flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 px-1">
                {'Found'} {filteredTasks.length + filteredNotes.length} {'results'}
              </p>
            )}
          </div>

          {/* Export & Import Buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Export Button */}
            <div className="relative flex-1 sm:flex-initial">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-800/90 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[44px] w-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {'Export'}
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      exportToCSV()
                      setShowExportMenu(false)
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 first:rounded-t-lg min-h-[44px] flex items-center"
                  >
                    Export as CSV
                  </button>
                  <button
                    onClick={() => {
                      exportToJSON()
                      setShowExportMenu(false)
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 min-h-[44px] flex items-center"
                  >
                    Export as JSON
                  </button>
                  <button
                    onClick={() => {
                      exportToCalendar()
                      setShowExportMenu(false)
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 last:rounded-b-lg min-h-[44px] flex items-center"
                  >
                    Export as Calendar (.ics)
                  </button>
                </div>
              )}
            </div>

            {/* Import Button */}
            <div className="flex-1 sm:flex-initial">
              <button
                onClick={() => setShowImportModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-800/90 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[44px] w-full"
                title="Import data from JSON file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {'Import'}
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Operations Bar */}
        {filter !== 'analytics' && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-4 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleBulkMode}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    bulkMode
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-white dark:bg-slate-800/90 text-gray-700 dark:text-slate-200 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {bulkMode ? 'Exit Bulk Mode' : 'Bulk Actions'}
                </button>

                {!bulkMode && (
                  <button
                    onClick={() => setShowTemplateLibrary(true)}
                    className="px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-white dark:bg-slate-800/90 text-gray-700 dark:text-slate-200 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <span>📝</span>
                    Templates
                    {templates.length > 0 && (
                      <span className="px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full">
                        {templates.length}
                      </span>
                    )}
                  </button>
                )}
              </div>

              {!bulkMode && getCompletedTasksCount() > 0 && (
                <button
                  onClick={deleteCompletedItems}
                  className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-slate-800/90 border border-red-300 dark:border-red-700/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Delete Completed ({getCompletedTasksCount()})
                </button>
              )}

              {!bulkMode && (
                <span className="text-xs text-gray-500 dark:text-slate-400 italic">
                  💡 Tip: Enable Bulk Mode to select items for deletion using trash icons
                </span>
              )}

              {bulkMode && (
                <>
                  <span className="text-sm text-gray-600 dark:text-slate-400">
                    {selectedItems.size} selected
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={selectAllItems}
                      className="px-3 py-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Select All
                    </button>
                    <button
                      onClick={selectNoneItems}
                      className="px-3 py-1 text-xs text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-300"
                    >
                      Select None
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {bulkMode && selectedItems.size > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={deleteSelectedItems}
                  className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-slate-800/90 border border-red-300 dark:border-red-700/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Delete Selected ({selectedItems.size})
                </button>
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
                ? 'text-gray-900 dark:text-slate-50 bg-gray-100 dark:bg-slate-800/90'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Tasks ({organizedTasks.length})
            {filter === 'tasks' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 dark:bg-orange-400 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300 dark:text-slate-600 hidden sm:inline">|</span>
          <button
            onClick={() => setFilter('notes')}
            className={`text-xs sm:text-sm font-medium transition-colors duration-200 relative px-2 py-1 rounded-lg min-h-[44px] flex items-center ${
              filter === 'notes'
                ? 'text-gray-900 dark:text-slate-50 bg-gray-100 dark:bg-slate-800/90'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Notes ({organizedNotes.length})
            {filter === 'notes' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 dark:bg-orange-400 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300 dark:text-slate-600 hidden sm:inline">|</span>
          <button
            onClick={() => setFilter('projects')}
            className={`text-xs sm:text-sm font-medium transition-colors duration-200 relative px-2 py-1 rounded-lg min-h-[44px] flex items-center ${
              filter === 'projects'
                ? 'text-gray-900 dark:text-slate-50 bg-gray-100 dark:bg-slate-800/90'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/50'
            }`}
          >
            {'Projects'}
            {filter === 'projects' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 dark:bg-orange-400 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300 dark:text-slate-600 hidden sm:inline">|</span>
          <button
            onClick={() => setFilter('all')}
            className={`text-xs sm:text-sm font-medium transition-colors duration-200 relative px-2 py-1 rounded-lg min-h-[44px] flex items-center ${
              filter === 'all'
                ? 'text-gray-900 dark:text-slate-50 bg-gray-100 dark:bg-slate-800/90'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/50'
            }`}
          >
            {'All Items'}
            {filter === 'all' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 dark:bg-orange-400 rounded-full"></span>
            )}
          </button>
          <span className="text-gray-300 dark:text-slate-600 hidden sm:inline">|</span>
          <button
            onClick={() => setFilter('analytics')}
            className={`text-xs sm:text-sm font-medium transition-colors duration-200 relative px-2 py-1 rounded-lg min-h-[44px] flex items-center ${
              filter === 'analytics'
                ? 'text-gray-900 dark:text-slate-50 bg-gray-100 dark:bg-slate-800/90'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/50'
            }`}
          >
            {'Analytics'}
            {filter === 'analytics' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 dark:bg-orange-400 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Sort Options */}
        {filter !== 'analytics' && (
          <div className="flex justify-center items-center gap-3 mb-6">
            <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 dark:text-slate-300">
              Sort by:
            </label>
            <div className="relative" ref={sortMenuRef}>
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="appearance-none text-sm pl-4 pr-10 py-2.5 border-2 border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800/90 text-gray-700 dark:text-slate-200 hover:border-orange-300 dark:hover:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 cursor-pointer font-medium shadow-sm min-h-[44px] flex items-center"
              >
                {sortBy === 'none' && 'Default Order'}
                {sortBy === 'date' && '📅 Date (earliest first)'}
                {sortBy === 'created' && '🆕 Recently Created'}
              </button>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Custom Dropdown Menu */}
              {showSortMenu && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      setSortBy('none')
                      setShowSortMenu(false)
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors min-h-[44px] flex items-center ${
                      sortBy === 'none'
                        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-medium'
                        : 'text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {sortBy === 'none' && <span className="mr-2">✓</span>}
                    Default Order
                  </button>
                  <button
                    onClick={() => {
                      setSortBy('date')
                      setShowSortMenu(false)
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors min-h-[44px] flex items-center ${
                      sortBy === 'date'
                        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-medium'
                        : 'text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {sortBy === 'date' && <span className="mr-2">✓</span>}
                    📅 Date (earliest first)
                  </button>
                  <button
                    onClick={() => {
                      setSortBy('created')
                      setShowSortMenu(false)
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors min-h-[44px] flex items-center ${
                      sortBy === 'created'
                        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-medium'
                        : 'text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {sortBy === 'created' && <span className="mr-2">✓</span>}
                    🆕 Recently Created
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="text-center mb-8">
          <details className="inline-block">
            <summary className="text-xs text-gray-500 dark:text-slate-400 cursor-pointer hover:text-gray-700 dark:hover:text-slate-300">
              Keyboard shortcuts
            </summary>
            <div className="mt-2 text-xs text-gray-500 dark:text-slate-400 space-y-1">
              <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-slate-200 rounded text-xs">Ctrl/Cmd + E</kbd> Export Data</div>
              <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-slate-200 rounded text-xs">Ctrl/Cmd + F</kbd> Focus search</div>
              <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-slate-200 rounded text-xs">Esc</kbd> Clear search</div>
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
            {filter === 'all' ? (
              /* Combined All Items List - Properly sorted with pinned items first */
              allItemsCombined.length > 0 ? (
                <div className="space-y-4">
                  {allItemsCombined.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 sm:gap-4 py-4 border-b border-gray-100 dark:border-slate-800 last:border-b-0"
                      onContextMenu={(e) => handleContextMenu(e, item.id)}
                      onTouchStart={(e) => handleTouchStart(e, item.id)}
                      onTouchEnd={handleTouchEnd}
                      onTouchMove={handleTouchMove}
                    >
                      {/* Checkbox in normal mode, Trash icon in bulk mode */}
                      {!bulkMode ? (
                        <input
                          type="checkbox"
                          checked={item.completed || false}
                          onChange={() => {
                            if (item.itemType === 'task') {
                              handleToggleTask(item.id)
                            } else {
                              handleToggleNote(item.id)
                            }
                          }}
                          className={`mt-1 w-4 h-4 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 rounded focus:ring-2 flex-shrink-0 ${
                            item.itemType === 'task'
                              ? 'text-green-600 focus:ring-green-500'
                              : 'text-purple-600 focus:ring-purple-500'
                          }`}
                          aria-label={
                            item.itemType === 'task' 
                              ? `Mark task as ${item.completed ? 'incomplete' : 'complete'}`
                              : `Mark note as ${item.completed ? 'unmarked' : 'marked'}`
                          }
                        />
                      ) : (
                        <button
                          onClick={() => toggleItemSelection(item.id)}
                          className={`mt-1 w-8 h-8 flex items-center justify-center rounded-lg border-2 transition-all flex-shrink-0 ${
                            selectedItems.has(item.id)
                              ? 'bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-600 text-red-600 dark:text-red-400'
                              : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-400 dark:hover:border-red-700'
                          }`}
                          aria-label={`${selectedItems.has(item.id) ? 'Deselect' : 'Select'} ${item.itemType} for deletion`}
                          title={`Click to ${selectedItems.has(item.id) ? 'deselect' : 'select'} for deletion`}
                        >
                          🗑️
                        </button>
                      )}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm break-words flex-1 ${
                            item.completed ? 'text-gray-500 dark:text-slate-500 line-through' : 'text-gray-900 dark:text-slate-100'
                          }`}>
                            {item.text}
                          </p>
                          {/* Item type badge */}
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                            item.itemType === 'task' 
                              ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' 
                              : 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400'
                          }`}>
                            {item.itemType === 'task' ? 'Task' : 'Note'}
                          </span>
                          {item.metadata?.pinned && (
                            <span 
                              className="text-yellow-600 text-sm flex-shrink-0" 
                              aria-label="Pinned item"
                              title="This item is pinned to the top"
                            >
                              📌
                            </span>
                          )}
                        </div>
                        {((item.tags && item.tags.length > 0) || (item.itemType === 'task' && item.priority) || item.metadata?.dateInfo) && (
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {item.metadata?.dateInfo && (
                              <DateBadge dateInfo={item.metadata.dateInfo as string} />
                            )}
                            {item.itemType === 'task' && item.priority && (
                              <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${
                                item.priority === 'high' ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' :
                                item.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400' :
                                'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300'
                              }`}>
                                {item.priority}
                              </span>
                            )}
                            {item.tags && item.tags.map((tag, index) => (
                              <span key={index} className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${
                                item.itemType === 'task' 
                                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' 
                                  : 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400'
                              }`}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 text-xs text-gray-500 dark:text-slate-400 flex-shrink-0">
                        <span className="text-right">{new Date(item.timestamp).toLocaleString()}</span>
                        
                        {/* New Action Buttons Component */}
                        <ActionButtons
                          actions={getContextMenuActions(item, item.itemType)}
                          onTriggerContextMenu={(e) => handleContextMenu(e, item.id)}
                          itemId={item.id}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null
            ) : (
              <>
                {/* Clean Task List - Mobile Optimized */}
                {filter === 'tasks' && filteredTasks.length > 0 && (
                  <div className="space-y-4">
                    {filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-3 sm:gap-4 py-4 border-b border-gray-100 dark:border-slate-800 last:border-b-0"
                        onContextMenu={(e) => handleContextMenu(e, task.id)}
                        onTouchStart={(e) => handleTouchStart(e, task.id)}
                        onTouchEnd={handleTouchEnd}
                        onTouchMove={handleTouchMove}
                      >
                        {/* Checkbox in normal mode, Trash icon in bulk mode */}
                        {!bulkMode ? (
                          <input
                            type="checkbox"
                            checked={task.completed || false}
                            onChange={() => handleToggleTask(task.id)}
                            className="mt-1 w-4 h-4 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 rounded focus:ring-2 flex-shrink-0 text-green-600 focus:ring-green-500"
                            aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
                          />
                        ) : (
                          <button
                            onClick={() => toggleItemSelection(task.id)}
                            className={`mt-1 w-8 h-8 flex items-center justify-center rounded-lg border-2 transition-all flex-shrink-0 ${
                              selectedItems.has(task.id)
                                ? 'bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-600 text-red-600 dark:text-red-400'
                                : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-400 dark:hover:border-red-700'
                            }`}
                            aria-label={`${selectedItems.has(task.id) ? 'Deselect' : 'Select'} task for deletion`}
                            title={`Click to ${selectedItems.has(task.id) ? 'deselect' : 'select'} for deletion`}
                          >
                            🗑️
                          </button>
                        )}
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm break-words flex-1 ${
                              task.completed ? 'text-gray-500 dark:text-slate-500 line-through' : 'text-gray-900 dark:text-slate-100'
                            }`}>
                              {task.text}
                            </p>
                            {task.metadata?.pinned && (
                              <span 
                                className="text-yellow-600 text-sm flex-shrink-0" 
                                aria-label="Pinned item"
                                title="This item is pinned to the top"
                              >
                                📌
                              </span>
                            )}
                          </div>
                          {((task.tags && task.tags.length > 0) || task.priority || task.metadata?.dateInfo) && (
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {task.metadata?.dateInfo && (
                                <DateBadge dateInfo={task.metadata.dateInfo as string} />
                              )}
                              {task.priority && (
                                <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${
                                  task.priority === 'high' ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' :
                                  task.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400' :
                                  'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300'
                                }`}>
                                  {task.priority}
                                </span>
                              )}
                              {task.tags && task.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full text-xs flex-shrink-0">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 text-xs text-gray-500 dark:text-slate-400 flex-shrink-0">
                          <span className="text-right">{new Date(task.timestamp).toLocaleString()}</span>
                          
                          {/* New Action Buttons Component */}
                          <ActionButtons
                            actions={getContextMenuActions(task, 'task')}
                            onTriggerContextMenu={(e) => handleContextMenu(e, task.id)}
                            itemId={task.id}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Clean Notes List - Mobile Optimized */}
                {filter === 'notes' && filteredNotes.length > 0 && (
                  <div className="space-y-4">
                    {filteredNotes.map((note) => (
                      <div
                        key={note.id}
                        className="flex items-start gap-3 sm:gap-4 py-4 border-b border-gray-100 dark:border-slate-800 last:border-b-0"
                        onContextMenu={(e) => handleContextMenu(e, note.id)}
                        onTouchStart={(e) => handleTouchStart(e, note.id)}
                        onTouchEnd={handleTouchEnd}
                        onTouchMove={handleTouchMove}
                      >
                        {/* Checkbox in normal mode, Trash icon in bulk mode */}
                        {!bulkMode ? (
                          <input
                            type="checkbox"
                            checked={note.completed || false}
                            onChange={() => handleToggleNote(note.id)}
                            className="mt-1 w-4 h-4 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 rounded focus:ring-2 flex-shrink-0 text-purple-600 focus:ring-purple-500"
                            aria-label={`Mark note as ${note.completed ? 'unmarked' : 'marked'}`}
                          />
                        ) : (
                          <button
                            onClick={() => toggleItemSelection(note.id)}
                            className={`mt-1 w-8 h-8 flex items-center justify-center rounded-lg border-2 transition-all flex-shrink-0 ${
                              selectedItems.has(note.id)
                                ? 'bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-600 text-red-600 dark:text-red-400'
                                : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-400 dark:hover:border-red-700'
                            }`}
                            aria-label={`${selectedItems.has(note.id) ? 'Deselect' : 'Select'} note for deletion`}
                            title={`Click to ${selectedItems.has(note.id) ? 'deselect' : 'select'} for deletion`}
                          >
                            🗑️
                          </button>
                        )}
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm text-gray-900 dark:text-slate-100 break-words flex-1 ${
                              note.completed ? 'text-gray-500 dark:text-slate-500 line-through' : ''
                            }`}>{note.text}</p>
                            {note.metadata?.pinned && (
                              <span 
                                className="text-yellow-600 text-sm flex-shrink-0" 
                                aria-label="Pinned item"
                                title="This item is pinned to the top"
                              >
                                📌
                              </span>
                            )}
                          </div>
                          {((note.tags && note.tags.length > 0) || note.metadata?.dateInfo) && (
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {note.metadata?.dateInfo && (
                                <DateBadge dateInfo={note.metadata.dateInfo as string} />
                              )}
                              {note.tags && note.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full text-xs flex-shrink-0">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 text-xs text-gray-500 dark:text-slate-400 flex-shrink-0">
                          <span className="text-right">{new Date(note.timestamp).toLocaleString()}</span>
                          
                          {/* New Action Buttons Component */}
                          <ActionButtons
                            actions={getContextMenuActions(note, 'note')}
                            onTriggerContextMenu={(e) => handleContextMenu(e, note.id)}
                            itemId={note.id}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {((filter === 'tasks' && filteredTasks.length === 0) ||
              (filter === 'notes' && filteredNotes.length === 0) ||
              (filter === 'all' && allItemsCombined.length === 0)) && (
              <div className="text-center py-12 text-gray-500 dark:text-slate-400">
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

      {/* Import Modal */}
      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
      />

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
        itemType={itemToTemplateType}
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
