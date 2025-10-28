/**
 * DateBadge Component
 * Displays extracted date/time information as a badge on tasks/notes
 */

import { getDateDisplayText, parseEarliestDate, isOverdue } from '@/lib/utils/dateParser'

interface DateBadgeProps {
  dateInfo: string | undefined
  className?: string
}

export default function DateBadge({ dateInfo, className = '' }: DateBadgeProps) {
  if (!dateInfo) return null

  const displayText = getDateDisplayText(dateInfo)
  if (!displayText) return null

  const date = parseEarliestDate(dateInfo)
  const overdue = isOverdue(date)

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${
        overdue
          ? 'bg-red-100 text-red-700 border border-red-200'
          : 'bg-blue-100 text-blue-700 border border-blue-200'
      } ${className}`}
      title={`Extracted date: ${dateInfo}`}
    >
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      {displayText}
      {overdue && ' (overdue)'}
    </span>
  )
}
