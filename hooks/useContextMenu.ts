/**
 * useContextMenu Hook
 * Handles right-click and long-press for context menu
 */

import { useState, useCallback, useRef, useEffect } from 'react'

interface ContextMenuState {
  x: number
  y: number
  itemId: string | null
}

export function useContextMenu() {
  const [menuState, setMenuState] = useState<ContextMenuState | null>(null)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const longPressTriggered = useRef(false)

  const handleContextMenu = useCallback((e: React.MouseEvent, itemId: string) => {
    e.preventDefault()
    e.stopPropagation()

    setMenuState({
      x: e.clientX,
      y: e.clientY,
      itemId
    })
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent, itemId: string) => {
    longPressTriggered.current = false

    // Start long-press timer
    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true
      const touch = e.touches[0]

      setMenuState({
        x: touch.clientX,
        y: touch.clientY,
        itemId
      })

      // Provide haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }
    }, 500) // 500ms long press
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }, [])

  const handleTouchMove = useCallback(() => {
    // Cancel long press if user moves finger
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }, [])

  const closeMenu = useCallback(() => {
    setMenuState(null)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
    }
  }, [])

  return {
    menuState,
    handleContextMenu,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    closeMenu,
    isMenuOpen: menuState !== null
  }
}
