/**
 * ContextMenu Component
 * Right-click or long-press context menu for quick actions
 */

import { useEffect, useRef } from 'react'

export interface ContextMenuAction {
  label: string
  icon?: string
  onClick: () => void
  variant?: 'default' | 'danger' | 'success'
  hidden?: boolean
}

interface ContextMenuProps {
  x: number
  y: number
  actions: ContextMenuAction[]
  onClose: () => void
}

export default function ContextMenu({ x, y, actions, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Small delay to prevent immediate close
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }, 10)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  // Adjust position if menu goes off screen
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let adjustedX = x
      let adjustedY = y

      // Adjust horizontal position
      if (rect.right > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 10
      }

      // Adjust vertical position
      if (rect.bottom > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 10
      }

      if (adjustedX !== x || adjustedY !== y) {
        menuRef.current.style.left = `${adjustedX}px`
        menuRef.current.style.top = `${adjustedY}px`
      }
    }
  }, [x, y])

  const visibleActions = actions.filter(action => !action.hidden)

  if (visibleActions.length === 0) return null

  return (
    <div
      ref={menuRef}
      className="fixed z-[100] bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[200px] animate-in fade-in zoom-in-95 duration-100"
      style={{ left: x, top: y }}
      role="menu"
      aria-orientation="vertical"
    >
      {visibleActions.map((action, index) => {
        const variantClasses = {
          default: 'text-gray-700 hover:bg-gray-100',
          danger: 'text-red-600 hover:bg-red-50',
          success: 'text-green-600 hover:bg-green-50'
        }

        return (
          <button
            key={index}
            onClick={() => {
              action.onClick()
              onClose()
            }}
            className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
              variantClasses[action.variant || 'default']
            }`}
            role="menuitem"
          >
            {action.icon && <span className="text-base">{action.icon}</span>}
            <span className="flex-1">{action.label}</span>
          </button>
        )
      })}
    </div>
  )
}
