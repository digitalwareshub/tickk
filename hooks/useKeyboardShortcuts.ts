/**
 * Keyboard Shortcuts Hook
 * Implements global keyboard shortcuts for the app
 */

import { useEffect } from 'react'

interface KeyboardShortcutsConfig {
  onStartRecording?: () => void
  onStopRecording?: () => void
  onProcessBraindump?: () => void
  onExport?: () => void
  onShowHelp?: () => void
  onCloseModal?: () => void
  onShowCommandPalette?: () => void
  isRecording?: boolean
  canProcess?: boolean
  isModalOpen?: boolean
}

export function useKeyboardShortcuts({
  onStartRecording,
  onStopRecording,
  onProcessBraindump,
  onExport,
  onShowHelp,
  onCloseModal,
  onShowCommandPalette,
  isRecording = false,
  canProcess = false,
  isModalOpen = false
}: KeyboardShortcutsConfig) {
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInputElement = target.tagName === 'INPUT' || 
                            target.tagName === 'TEXTAREA' || 
                            target.contentEditable === 'true' ||
                            target.isContentEditable ||
                            target.closest('textarea') !== null ||
                            target.closest('input') !== null ||
                            target.closest('[contenteditable]') !== null
      
      // Modal-specific shortcuts
      if (isModalOpen) {
        if (e.key === 'Escape' && onCloseModal) {
          e.preventDefault()
          onCloseModal()
        }
        return
      }
      
      // Don't trigger shortcuts when typing in input fields or when any input is focused
      if (isInputElement || document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'INPUT') return
      
      // Spacebar: Start/stop recording
      if (e.code === 'Space' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        if (isRecording && onStopRecording) {
          onStopRecording()
        } else if (!isRecording && onStartRecording) {
          onStartRecording()
        }
      }
      
      // Ctrl/Cmd + Enter: Process braindump
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && canProcess && onProcessBraindump) {
        e.preventDefault()
        onProcessBraindump()
      }
      
      // Ctrl/Cmd + S: Export data
      if ((e.metaKey || e.ctrlKey) && e.key === 's' && onExport) {
        e.preventDefault()
        onExport()
      }

      // Ctrl/Cmd + K: Show command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && onShowCommandPalette) {
        e.preventDefault()
        onShowCommandPalette()
      }

      // ?: Show keyboard shortcuts help
      if (e.key === '?' && e.shiftKey && onShowHelp) {
        e.preventDefault()
        onShowHelp()
      }
      
      // Escape: Stop recording
      if (e.key === 'Escape' && isRecording && onStopRecording) {
        e.preventDefault()
        onStopRecording()
      }
    }
    
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [
    onStartRecording,
    onStopRecording,
    onProcessBraindump,
    onExport,
    onShowHelp,
    onCloseModal,
    onShowCommandPalette,
    isRecording,
    canProcess,
    isModalOpen
  ])
}

export const KEYBOARD_SHORTCUTS = {
  startStopRecording: 'Space',
  processBraindump: 'Ctrl+Enter',
  exportData: 'Ctrl+S',
  showHelp: 'Shift+?',
  closeModal: 'Escape',
  stopRecording: 'Escape'
} as const
