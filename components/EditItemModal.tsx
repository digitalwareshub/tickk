/**
 * EditItemModal Component
 * Reusable modal for editing tasks and notes across the app
 */

import { useState, useEffect } from 'react'
import type { VoiceItem } from '@/types/braindump'

interface EditItemModalProps {
  isOpen: boolean
  item: VoiceItem | null
  onClose: () => void
  onSave: (updatedItem: VoiceItem) => void
  onCategoryChange?: (newCategory: 'task' | 'note') => void
  type: 'task' | 'note' | 'braindump'
}

export default function EditItemModal({
  isOpen,
  item,
  onClose,
  onSave,
  onCategoryChange,
  type
}: EditItemModalProps) {
  const [editedText, setEditedText] = useState('')
  const [editedTags, setEditedTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  // Reset form when modal opens/closes or item changes
  useEffect(() => {
    if (isOpen && item) {
      setEditedText(item.text)
      setEditedTags(item.tags || [])
      setTagInput('')
    } else {
      setEditedText('')
      setEditedTags([])
      setTagInput('')
    }
  }, [isOpen, item])

  const handleSave = () => {
    if (!item || !editedText.trim()) return

    const updatedItem: VoiceItem = {
      ...item,
      text: editedText.trim(),
      tags: editedTags,
      metadata: {
        ...item.metadata
      }
    }

    onSave(updatedItem)
    onClose()
  }

  const handleCategoryChange = (newCategory: 'task' | 'note') => {
    if (onCategoryChange && (type === 'task' || type === 'note')) {
      onCategoryChange(newCategory)
    }
  }

  const handleAddTag = () => {
    const tag = tagInput.trim()
    if (tag && !editedTags.includes(tag)) {
      setEditedTags([...editedTags, tag])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedTags(editedTags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Prevent spacebar from triggering global shortcuts
    if (e.key === ' ') {
      e.stopPropagation()
    }
    
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (e.target === document.activeElement && tagInput.trim()) {
        handleAddTag()
      } else {
        handleSave()
      }
    }
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen || !item) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 id="edit-modal-title" className="text-lg font-semibold text-gray-900">
            Edit Item
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Text Input */}
          <div>
            <label htmlFor="edit-text" className="block text-sm font-medium text-gray-700 mb-2">
              {type === 'task' ? 'Task' : type === 'note' ? 'Note' : 'Content'}
            </label>
            <textarea
              id="edit-text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
              rows={4}
              placeholder="Enter your text here..."
              autoFocus
            />
          </div>

          {/* Category Switching (for tasks and notes) */}
          {(type === 'task' || type === 'note') && onCategoryChange && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCategoryChange('task')}
                  className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                    type === 'task'
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Convert to Task
                  </div>
                </button>
                <button
                  onClick={() => handleCategoryChange('note')}
                  className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                    type === 'note'
                      ? 'bg-purple-50 border-purple-200 text-purple-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Convert to Note
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Tags (for tasks and notes) */}
          {(type === 'task' || type === 'note') && (
            <div>
              <label htmlFor="edit-tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              
              {/* Existing Tags */}
              {editedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-blue-400 hover:text-blue-600 transition-colors"
                        aria-label={`Remove tag ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Add New Tag */}
              <div className="flex gap-2">
                <input
                  id="edit-tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    // Prevent spacebar from triggering global shortcuts
                    if (e.key === ' ') {
                      e.stopPropagation()
                    }
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                  placeholder="Add a tag..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                />
                <button
                  onClick={handleAddTag}
                  disabled={!tagInput.trim()}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Item Info */}
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between">
              <span>Type: {type}</span>
              <span>Created: {new Date(item.timestamp).toLocaleString()}</span>
            </div>
            {item.metadata?.source === 'user_edit' && (
              <div className="mt-1 text-orange-600">
                Previously edited by user
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!editedText.trim()}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          <div>Press <kbd className="px-1 py-0.5 bg-gray-100 rounded">Enter</kbd> to save</div>
          <div>Press <kbd className="px-1 py-0.5 bg-gray-100 rounded">Esc</kbd> to cancel</div>
        </div>
      </div>
    </div>
  )
}
