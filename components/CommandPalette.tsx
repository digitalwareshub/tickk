/**
 * CommandPalette Component
 * VS Code-style command palette for quick actions (Cmd+K / Ctrl+K)
 */

import { useState, useEffect, useRef } from 'react'

export interface Command {
  id: string
  label: string
  description?: string
  icon?: string
  action: () => void
  keywords?: string[]
}

interface CommandPaletteProps {
  isOpen: boolean
  commands: Command[]
  onClose: () => void
}

export default function CommandPalette({
  isOpen,
  commands,
  onClose
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Filter commands based on query
  const filteredCommands = commands.filter(cmd => {
    const searchText = query.toLowerCase()
    const labelMatch = cmd.label.toLowerCase().includes(searchText)
    const descMatch = cmd.description?.toLowerCase().includes(searchText)
    const keywordMatch = cmd.keywords?.some(k => k.toLowerCase().includes(searchText))
    return labelMatch || descMatch || keywordMatch
  })

  // Reset selection when filtered commands change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action()
          onClose()
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex, onClose])

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full pl-10 pr-4 py-3 text-base border-none focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        {/* Command List */}
        <div
          ref={listRef}
          className="max-h-[400px] overflow-y-auto overscroll-contain"
        >
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-sm">No commands found</p>
              <p className="text-xs mt-1">Try a different search</p>
            </div>
          ) : (
            filteredCommands.map((cmd, index) => (
              <button
                key={cmd.id}
                onClick={() => {
                  cmd.action()
                  onClose()
                }}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  index === selectedIndex
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'border-l-4 border-transparent hover:bg-gray-50'
                }`}
              >
                {/* Icon */}
                {cmd.icon && (
                  <span className="text-xl flex-shrink-0">{cmd.icon}</span>
                )}

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {cmd.label}
                  </p>
                  {cmd.description && (
                    <p className="text-xs text-gray-500 truncate">
                      {cmd.description}
                    </p>
                  )}
                </div>

                {/* Keyboard hint for selected */}
                {index === selectedIndex && (
                  <div className="flex-shrink-0 flex items-center gap-1">
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-300 rounded">
                      ↵
                    </kbd>
                  </div>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded">↵</kbd> Execute
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded">ESC</kbd> Close
            </span>
          </div>
          <div>
            {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
