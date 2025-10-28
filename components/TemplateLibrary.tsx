/**
 * TemplateLibrary Component
 * Browse, search, and use saved task templates
 */

import { useState } from 'react'
import type { TaskTemplate } from '@/types/braindump'

interface TemplateLibraryProps {
  isOpen: boolean
  templates: TaskTemplate[]
  onUseTemplate: (template: TaskTemplate) => void
  onDeleteTemplate: (id: string) => void
  onClose: () => void
  loading?: boolean
}

export default function TemplateLibrary({
  isOpen,
  templates,
  onUseTemplate,
  onDeleteTemplate,
  onClose,
  loading = false
}: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'tasks' | 'notes'>('all')

  if (!isOpen) return null

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.metadata?.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Template Library</h2>
            <p className="text-sm text-gray-600 mt-1">
              {templates.length} template{templates.length !== 1 ? 's' : ''} saved
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({templates.length})
            </button>
            <button
              onClick={() => setCategoryFilter('tasks')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                categoryFilter === 'tasks'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tasks ({templates.filter(t => t.category === 'tasks').length})
            </button>
            <button
              onClick={() => setCategoryFilter('notes')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                categoryFilter === 'notes'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Notes ({templates.filter(t => t.category === 'notes').length})
            </button>
          </div>
        </div>

        {/* Template List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              {templates.length === 0 ? (
                <>
                  <div className="text-4xl mb-3">📝</div>
                  <p className="text-sm text-gray-600 mb-1">No templates saved yet</p>
                  <p className="text-xs text-gray-500">
                    Right-click any task/note and select &quot;Save as Template&quot;
                  </p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-sm text-gray-600">No templates match your search</p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group bg-gray-50 rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    {template.metadata?.icon && (
                      <div className="text-2xl flex-shrink-0">
                        {template.metadata.icon}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 break-words">
                        {template.text}
                      </p>
                      {template.metadata?.description && (
                        <p className="text-xs text-gray-600 mt-1">
                          {template.metadata.description}
                        </p>
                      )}

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          template.category === 'tasks'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {template.category === 'tasks' ? '✓ Task' : '📝 Note'}
                        </span>

                        {template.priority && (
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            template.priority === 'high' ? 'bg-red-100 text-red-700' :
                            template.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {template.priority}
                          </span>
                        )}

                        {template.tags && template.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                            #{tag}
                          </span>
                        ))}

                        {template.usageCount > 0 && (
                          <span className="text-xs text-gray-500">
                            Used {template.usageCount}x
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => onUseTemplate(template)}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Use
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this template?')) {
                            onDeleteTemplate(template.id)
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            💡 Tip: Right-click any task/note and select &quot;Save as Template&quot; to add more templates
          </p>
        </div>
      </div>
    </div>
  )
}
