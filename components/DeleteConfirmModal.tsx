/**
 * DeleteConfirmModal Component
 * Custom delete confirmation modal with better UX than system confirm dialog
 */

import { useLanguage } from '@/contexts/LanguageContext'

interface DeleteConfirmModalProps {
  isOpen: boolean
  itemText: string
  itemType: 'task' | 'note' | 'braindump'
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmModal({ 
  isOpen, 
  itemText, 
  itemType,
  onConfirm, 
  onCancel 
}: DeleteConfirmModalProps) {
  const { t } = useLanguage()

  if (!isOpen) return null

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel()
    } else if (e.key === 'Enter') {
      onConfirm()
    }
  }

  const getItemTypeText = () => {
    switch (itemType) {
      case 'task':
        return t('common.task')
      case 'note':
        return t('common.note')
      case 'braindump':
        return t('common.braindump')
      default:
        return t('common.item')
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      onKeyDown={handleKeyPress}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 id="delete-modal-title" className="text-lg font-semibold text-gray-900">
            {t('common.delete_item')}
          </h2>
          <button
            onClick={onCancel}
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
          {/* Warning Icon */}
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* Message */}
          <div className="text-center">
            <p className="text-gray-700 mb-2">
              {t('common.delete_confirm_message')}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              <strong>{getItemTypeText()}:</strong>
            </p>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border max-h-20 overflow-y-auto">
              &ldquo;{itemText.length > 100 ? `${itemText.substring(0, 100)}...` : itemText}&rdquo;
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {t('common.delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
