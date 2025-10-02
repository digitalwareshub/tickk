/**
 * DeleteConfirmationModal Component
 * Custom modal for confirming item deletion with better UX
 */

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface DeleteConfirmModalProps {
  isOpen: boolean
  itemText?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmModal({
  isOpen,
  itemText,
  onConfirm,
  onCancel
}: DeleteConfirmModalProps) {
  const { t } = useLanguage()

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel()
      } else if (e.key === 'Enter') {
        onConfirm()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onConfirm, onCancel])

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const confirmButton = document.getElementById('delete-confirm-button')
      confirmButton?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h2 id="delete-modal-title" className="text-lg font-semibold text-gray-900">
              {t('common.delete_item')}
            </h2>
            <p id="delete-modal-description" className="text-sm text-gray-600">
              {t('common.delete_warning')}
            </p>
          </div>
        </div>

        {/* Item preview */}
        {itemText && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-700 font-medium mb-1">
              {t('common.item_to_delete')}:
            </p>
            <p className="text-sm text-gray-600 line-clamp-2">
              &ldquo;{itemText}&rdquo;
            </p>
          </div>
        )}

        {/* Warning message */}
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            {t('common.delete_irreversible')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            id="delete-confirm-button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            {t('common.delete')}
          </button>
        </div>
      </div>
    </div>
  )
}
