/**
 * SaveTemplateModal Component
 * Modal for saving a task/note as a reusable template
 */

import { useState } from 'react'
import type { VoiceItem, TaskTemplate } from '@/types/braindump'

interface SaveTemplateModalProps {
  isOpen: boolean
  item: VoiceItem | null
  onSave: (template: Omit<TaskTemplate, 'id' | 'createdAt' | 'usageCount'>) => Promise<void>
  onClose: () => void
}

export default function SaveTemplateModal({
  isOpen,
  item,
  onSave,
  onClose
}: SaveTemplateModalProps) {
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [saving, setSaving] = useState(false)

  if (!isOpen || !item) return null

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave({
        text: item.text,
        category: item.category === 'braindump' ? 'tasks' : (item.category as 'tasks' | 'notes'),
        priority: item.priority,
        tags: item.tags,
        metadata: {
          description: description.trim() || undefined,
          icon: icon.trim() || undefined
        }
      })
      onClose()
      setDescription('')
      setIcon('')
    } catch (err) {
      console.error('Failed to save template:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleClose = () => {
    if (!saving) {
      onClose()
      setDescription('')
      setIcon('')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Save as Template</h2>
          <button
            onClick={handleClose}
            disabled={saving}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Template Text Preview */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Template text:</p>
          <p className="text-sm text-gray-900 font-medium">{item.text}</p>
        </div>

        {/* Icon Input */}
        <div>
          <label htmlFor="template-icon" className="block text-sm font-medium text-gray-700 mb-1">
            Icon (optional emoji)
          </label>
          <input
            id="template-icon"
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value.slice(0, 2))}
            placeholder="📝"
            maxLength={2}
            className="w-full px-3 py-2 text-2xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="template-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            id="template-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this template for?"
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Metadata Display */}
        {(item.priority || (item.tags && item.tags.length > 0)) && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-xs text-blue-600 mb-2">Template will include:</p>
            <div className="flex flex-wrap gap-2">
              {item.priority && (
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.priority === 'high' ? 'bg-red-100 text-red-700' :
                  item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {item.priority} priority
                </span>
              )}
              {item.tags && item.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleClose}
            disabled={saving}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              'Save Template'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
