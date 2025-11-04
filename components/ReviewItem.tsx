/**
 * ReviewItem Component - Phase 2.4 Implementation
 * Individual item review for categorization corrections and metadata adjustment
 */

import { useState } from 'react'
import toast from 'react-hot-toast'
import { ErrorMessages, SuccessMessages } from '@/lib/utils/error-messages'
import { VoiceClassifier } from '@/lib/classification/classifier'
import { trackPageInteraction } from '@/lib/analytics'
import type { VoiceItem, Classification } from '@/types/braindump'

interface ReviewItemProps {
  item: VoiceItem & {
    suggestedCategory: 'tasks' | 'notes'
    confidence: number
    classification: Classification
  }
  onUpdate: (itemId: string, updates: Partial<VoiceItem>) => void
  onCategoryChange: (itemId: string, category: 'tasks' | 'notes') => void
  showExpanded?: boolean
  isEditing?: boolean
}

export default function ReviewItem({
  item,
  onUpdate,
  onCategoryChange,
  showExpanded = false,
  isEditing = false
}: ReviewItemProps) {
  const [category, setCategory] = useState(item.suggestedCategory)
  const [isExpanded, setIsExpanded] = useState(showExpanded)
  const [isEditingText, setIsEditingText] = useState(isEditing)
  const [editedText, setEditedText] = useState(item.text)
  const [priority, setPriority] = useState(item.priority || 'medium')
  const [tags, setTags] = useState(item.tags || [])
  const [newTag, setNewTag] = useState('')
  const [dueDate, setDueDate] = useState(
    item.metadata?.dateInfo || ''
  )
  
  const classifier = VoiceClassifier.getInstance()
  
  /**
   * Handle category change with analytics
   */
  const handleCategoryChange = (newCategory: 'tasks' | 'notes') => {
    setCategory(newCategory)
    onCategoryChange(item.id, newCategory)
    
    trackPageInteraction('category_changed', `${item.suggestedCategory}_to_${newCategory}`)
    
    // Re-classify if user changes category to update metadata
    if (newCategory !== item.suggestedCategory) {
      reclassifyItem(newCategory)
    }
  }
  
  /**
   * Re-classify item based on new category
   */
  const reclassifyItem = async (newCategory: 'tasks' | 'notes') => {
    try {
      const newClassification = await classifier.classify(editedText)
      
      // Update item with new classification and metadata
      onUpdate(item.id, {
        classification: {
          ...newClassification,
          category: newCategory // Override category with user choice
        }
      })
      toast.success(SuccessMessages.UPDATE_SUCCESS)
    } catch (error) {
      console.error('Re-classification failed:', error)
      toast.error(ErrorMessages.CLASSIFICATION_FAILED)
    }
  }
  
  /**
   * Save text changes
   */
  const saveTextChanges = () => {
    if (editedText.trim() !== item.text) {
      onUpdate(item.id, { text: editedText.trim() })
      trackPageInteraction('item_text_edited', 'manual_edit')
    }
    setIsEditingText(false)
  }
  
  /**
   * Cancel text editing
   */
  const cancelTextEdit = () => {
    setEditedText(item.text)
    setIsEditingText(false)
  }
  
  /**
   * Handle priority change
   */
  const handlePriorityChange = (newPriority: 'low' | 'medium' | 'high') => {
    setPriority(newPriority)
    onUpdate(item.id, { priority: newPriority })
    trackPageInteraction('priority_changed', newPriority)
  }
  
  /**
   * Add a new tag
   */
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()]
      setTags(updatedTags)
      onUpdate(item.id, { tags: updatedTags })
      setNewTag('')
      trackPageInteraction('tag_added', 'manual')
    }
  }
  
  /**
   * Remove a tag
   */
  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove)
    setTags(updatedTags)
    onUpdate(item.id, { tags: updatedTags })
    trackPageInteraction('tag_removed', 'manual')
  }
  
  /**
   * Handle due date change
   */
  const handleDueDateChange = (dateString: string) => {
    setDueDate(dateString)
    onUpdate(item.id, { 
      metadata: {
        ...item.metadata,
        dateInfo: dateString || undefined
      }
    })
    trackPageInteraction('due_date_set', dateString ? 'set' : 'cleared')
  }
  
  /**
   * Get confidence color for UI
   */
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 '
    if (confidence >= 0.6) return 'text-yellow-600 '
    return 'text-red-600 '
  }
  
  /**
   * Get priority color for UI
   */
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100  text-red-700 '
      case 'medium': return 'bg-yellow-100  text-yellow-700 '
      case 'low': return 'bg-green-100  text-green-700 '
      default: return 'bg-gray-100  text-gray-700 '
    }
  }
  
  return (
    <div className={`
      rounded-lg border-2 transition-all duration-200
      ${category === 'tasks' 
        ? 'border-blue-300 bg-blue-50  ' 
        : 'border-green-300 bg-green-50  '}
      ${isExpanded ? 'shadow-lg' : 'hover:shadow-md'}
    `}>
      {/* Main Content Area */}
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Item Content */}
          <div className="flex-1">
            {/* Text Content */}
            <div className="mb-3">
              {isEditingText ? (
                <div className="space-y-2">
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full p-2 border border-gray-300  rounded-md bg-white  text-gray-900  resize-none"
                    rows={3}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveTextChanges}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelTextEdit}
                      className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p 
                  className="text-gray-800  font-medium cursor-pointer hover:bg-white/50  p-2 rounded transition-colors"
                  onClick={() => setIsEditingText(true)}
                  title="Click to edit"
                >
                  &quot;{item.text}&quot;
                </p>
              )}
            </div>
            
            {/* Confidence Indicator */}
            <div className="mb-3">
              <div className="flex items-center gap-2 text-xs text-gray-500  mb-1">
                <span>AI Confidence:</span>
                <span className={getConfidenceColor(item.confidence)}>
                  {Math.round(item.confidence * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200  rounded-full h-1">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-1 rounded-full transition-all"
                  style={{ width: `${item.confidence * 100}%` }}
                />
              </div>
            </div>
            
            {/* Quick Actions Row */}
            <div className="flex items-center gap-2 mb-3">
              {/* Category Toggle */}
              <div className="flex gap-1">
                <button
                  onClick={() => handleCategoryChange('tasks')}
                  className={`
                    px-3 py-1 rounded-full transition-all text-xs font-medium
                    ${category === 'tasks' 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-200  text-gray-600  hover:bg-gray-300 '}
                  `}
                >
                  📋 Task
                </button>
                
                <button
                  onClick={() => handleCategoryChange('notes')}
                  className={`
                    px-3 py-1 rounded-full transition-all text-xs font-medium
                    ${category === 'notes' 
                      ? 'bg-green-500 text-white shadow-md' 
                      : 'bg-gray-200  text-gray-600  hover:bg-gray-300 '}
                  `}
                >
                  📝 Note
                </button>
              </div>
              
              {/* Expand/Collapse Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-2 py-1 text-gray-500 hover:text-gray-700  transition-colors"
                title={isExpanded ? 'Show less' : 'Show more options'}
              >
                {isExpanded ? '▼' : '▶'}
              </button>
            </div>
            
            {/* Classification Reasoning */}
            <div className="text-xs text-gray-500  mb-2">
              {item.classification.reasoning}
            </div>
          </div>
        </div>
        
        {/* Expanded Options */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200  space-y-4">
            {/* Priority (for tasks only) */}
            {category === 'tasks' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 ">
                  Priority
                </label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePriorityChange(p)}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all
                        ${priority === p 
                          ? getPriorityColor(p) + ' shadow-md' 
                          : 'bg-gray-200  text-gray-600  hover:bg-gray-300 '}
                      `}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Due Date (for tasks only) */}
            {category === 'tasks' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 ">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => handleDueDateChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300  rounded-md bg-white  text-gray-900  text-sm"
                />
              </div>
            )}
            
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 ">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100  text-purple-700  rounded-full text-xs"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-purple-500 hover:text-purple-700  ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-1 border border-gray-300  rounded-md bg-white  text-gray-900  text-sm"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-1 bg-purple-500 text-white rounded-md text-sm hover:bg-purple-600 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Metadata from Classification */}
            {item.classification.metadata && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 ">
                  AI Detected
                </label>
                <div className="flex flex-wrap gap-2">
                  {item.classification.metadata.hasDate && (
                    <span className="px-2 py-1 bg-blue-100  text-blue-700  rounded-full text-xs">
                      📅 {item.classification.metadata.dateInfo}
                    </span>
                  )}
                  {item.classification.metadata.urgency && item.classification.metadata.urgency !== 'none' && (
                    <span className="px-2 py-1 bg-orange-100  text-orange-700  rounded-full text-xs">
                      ⚡ {item.classification.metadata.urgency}
                    </span>
                  )}
                  {item.classification.metadata.patterns && item.classification.metadata.patterns.length > 0 && (
                    <span className="px-2 py-1 bg-green-100  text-green-700  rounded-full text-xs">
                      🎯 {item.classification.metadata.patterns.join(', ')}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
