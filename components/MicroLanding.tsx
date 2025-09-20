/**
 * MicroLanding - Smart contextual hints that appear for new users
 * Disappears as users engage with the app
 */

import { useState } from 'react'

interface MicroLandingProps {
  itemCount: number
  onExampleClick?: (text: string) => void
}

export default function MicroLanding({ itemCount, onExampleClick }: MicroLandingProps) {
  const [showContext, setShowContext] = useState(true)

  // Only hide micro-landing if user has actual data/content
  // Show the rich interface for all users, regardless of previous usage
  if (itemCount > 0 || !showContext) return null

  return (
    <div className="micro-landing">
      {/* Smart Context Bar - For all users */}
      <div className="context-bar bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center py-6 px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Finally, an app that shuts up and listens.
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Just tap the mic and start talking. We&apos;ll organize everything into tasks and notes.
          </p>
          <button 
            onClick={() => setShowContext(false)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Got it ×
          </button>
        </div>
      </div>

      {/* Example Prompts - For all users */}
      <div className="example-prompts py-8">
        <div className="max-w-2xl mx-auto text-center px-4">
          <p className="text-gray-600 text-sm mb-4">
            Try saying:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ExampleChip 
              text="Buy groceries tomorrow"
              emoji="📋"
              type="task"
              onClick={onExampleClick}
            />
            <ExampleChip 
              text="Great idea for the project"
              emoji="📝"
              type="note"
              onClick={onExampleClick}
            />
            <ExampleChip 
              text="Call dentist about appointment"
              emoji="📋"
              type="task"
              onClick={onExampleClick}
            />
            <ExampleChip 
              text="What if we tried a different approach"
              emoji="📝"
              type="note"
              onClick={onExampleClick}
            />
          </div>
        </div>
      </div>

      {/* Trust Signals - Subtle */}
      <div className="trust-signals text-center py-4 border-t border-gray-100">
        <div className="flex justify-center items-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span>🔒</span>
            <span>Private</span>
          </span>
          <span className="flex items-center gap-1">
            <span>🌐</span>
            <span>Works Offline</span>
          </span>
          <span className="flex items-center gap-1">
            <span>✨</span>
            <span>No Account Needed</span>
          </span>
        </div>
      </div>
    </div>
  )
}

interface ExampleChipProps {
  text: string
  emoji: string
  type: 'task' | 'note'
  onClick?: (text: string) => void
}

function ExampleChip({ text, emoji, type, onClick }: ExampleChipProps) {
  return (
    <button
      onClick={() => onClick?.(text)}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
        border transition-all hover:scale-105 hover:shadow-md
        ${type === 'task' 
          ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100' 
          : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
        }
      `}
    >
      <span>{emoji}</span>
      <span>&ldquo;{text}&rdquo;</span>
      <span className="text-xs opacity-60">→ {type}</span>
    </button>
  )
}
