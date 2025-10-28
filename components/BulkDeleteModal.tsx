/**
 * BulkDeleteModal Component
 * Modal for confirming bulk deletion operations
 */

interface BulkDeleteModalProps {
  isOpen: boolean
  itemCount: number
  itemType: 'selected' | 'completed'
  onConfirm: () => void
  onCancel: () => void
}

export default function BulkDeleteModal({
  isOpen,
  itemCount,
  itemType,
  onConfirm,
  onCancel
}: BulkDeleteModalProps) {

  if (!isOpen) return null

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel()
    } else if (e.key === 'Enter') {
      onConfirm()
    }
  }

  const getConfirmMessage = () => {
    if (itemType === 'completed') {
      return 'Are you sure you want to delete all completed tasks? This action cannot be undone.'
    }
    return `Are you sure you want to delete ${itemCount} selected item${itemCount > 1 ? 's' : ''}? This action cannot be undone.`
  }

  const getTitle = () => {
    if (itemType === 'completed') {
      return 'Delete Completed'
    }
    return 'Delete Selected'
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bulk-delete-modal-title"
      onKeyDown={handleKeyPress}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        
        <h2 id="bulk-delete-modal-title" className="text-xl font-semibold text-gray-900 text-center mb-3">
          {getTitle()}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          {getConfirmMessage()}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            autoFocus
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}