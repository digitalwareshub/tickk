/**
 * EditItemModal Component
 * Reusable modal for editing tasks and notes across the app
 */

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { VoiceItem } from '@/types/braindump'

interface EditItemModalProps {
  isOpen: boolean
  item: VoiceItem | null
  onClose: () => void
  onSave: (updatedItem: VoiceItem) => void
  type: 'task' | 'note' | 'braindump'
}

export default function EditItemModal({ 
  isOpen, 
  item, 
  onClose, 
  onSave, 
  type 
}: EditItemModalProps) {
  const { t } = useLanguage()
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
            {t('common.edit_item')}
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
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={!editedText.trim()}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {t('common.save')}
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
