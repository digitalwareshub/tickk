/**
 * ActionButtons Component
 * Provides Gmail-style three-dot menu for all actions
 */

import type { ContextMenuAction } from './ContextMenu'

interface ActionButtonsProps {
  actions: ContextMenuAction[]
  onTriggerContextMenu: (e: React.MouseEvent) => void
  itemId: string
}

export default function ActionButtons({ onTriggerContextMenu }: ActionButtonsProps) {
  // Simple three-dot menu for all devices - just like Gmail
  return (
    <div className="flex items-center">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onTriggerContextMenu(e)
        }}
        className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="More actions"
        title="More actions"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
      </button>
    </div>
  )
}