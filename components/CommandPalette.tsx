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
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-md sm:pt-[15vh]">
      <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-[#333333] bg-[#101116] shadow-2xl shadow-black/40">
        {/* Search Input */}
        <div className="border-b border-[#333333] bg-[#1a1b26] p-4">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-orange-300/80"
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
              className="w-full rounded-md border border-[#333333] bg-[#0b0c11] py-3 pl-10 pr-4 text-base text-white placeholder:text-[#737373] outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        </div>

        {/* Command List */}
        <div
          ref={listRef}
          className="max-h-[400px] overflow-y-auto overscroll-contain"
        >
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-[#a0a0a0]">
              <p className="text-sm text-white">No commands found</p>
              <p className="mt-1 text-xs">Try a different search</p>
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
                    ? 'border-l-4 border-orange-500 bg-orange-500/10'
                    : 'border-l-4 border-transparent hover:bg-white/[0.04]'
                }`}
              >
                {/* Icon */}
                {cmd.icon && (
                  <span className="text-xl flex-shrink-0">{cmd.icon}</span>
                )}

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {cmd.label}
                  </p>
                  {cmd.description && (
                    <p className="truncate text-xs text-[#a0a0a0]">
                      {cmd.description}
                    </p>
                  )}
                </div>

                {/* Keyboard hint for selected */}
                {index === selectedIndex && (
                  <div className="flex-shrink-0 flex items-center gap-1">
                    <kbd className="rounded border border-orange-500/40 bg-orange-500/10 px-2 py-1 text-xs font-semibold text-orange-200">
                      ↵
                    </kbd>
                  </div>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#333333] bg-[#1a1b26] px-4 py-2 text-xs text-[#a0a0a0]">
          <div className="flex flex-wrap items-center gap-3">
            <span>
              <kbd className="rounded border border-[#333333] bg-[#0b0c11] px-1 py-0.5 text-[#d4d4d4]">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="rounded border border-[#333333] bg-[#0b0c11] px-1 py-0.5 text-[#d4d4d4]">↵</kbd> Execute
            </span>
            <span>
              <kbd className="rounded border border-[#333333] bg-[#0b0c11] px-1 py-0.5 text-[#d4d4d4]">ESC</kbd> Close
            </span>
          </div>
          <div className="shrink-0">
            {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
