/**
 * ICS (iCalendar) Export Utility
 * Exports tasks with dates to .ics format for calendar apps
 */

import type { VoiceItem } from '@/types/braindump'
import { parseEarliestDate } from './dateParser'

interface ICSEvent {
  uid: string
  summary: string
  description?: string
  start: Date
  end: Date
  created: Date
  status: 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED'
  priority?: number
}

/**
 * Format date for ICS format (YYYYMMDDTHHMMSSZ)
 */
function formatICSDate(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

/**
 * Escape special characters for ICS format
 */
function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

/**
 * Convert VoiceItem to ICS event
 */
function taskToICSEvent(task: VoiceItem): ICSEvent | null {
  const dateInfo = task.metadata?.dateInfo as string | undefined
  const date = parseEarliestDate(dateInfo)

  if (!date) return null

  const endDate = new Date(date)
  endDate.setHours(endDate.getHours() + 1) // 1 hour duration

  const priority = task.priority === 'high' ? 1 : task.priority === 'medium' ? 5 : 9

  return {
    uid: task.id,
    summary: task.text,
    description: task.tags?.map(t => `#${t}`).join(' '),
    start: date,
    end: endDate,
    created: new Date(task.timestamp),
    status: task.completed ? 'CANCELLED' : 'CONFIRMED',
    priority
  }
}

/**
 * Generate ICS file content from events
 */
function generateICS(events: ICSEvent[]): string {
  const lines: string[] = []

  // Header
  lines.push('BEGIN:VCALENDAR')
  lines.push('VERSION:2.0')
  lines.push('PRODID:-//tickk.app//Voice Productivity//EN')
  lines.push('CALSCALE:GREGORIAN')
  lines.push('METHOD:PUBLISH')
  lines.push('X-WR-CALNAME:Tickk Tasks')
  lines.push('X-WR-TIMEZONE:UTC')

  // Events
  events.forEach(event => {
    lines.push('BEGIN:VEVENT')
    lines.push(`UID:${event.uid}`)
    lines.push(`DTSTAMP:${formatICSDate(new Date())}`)
    lines.push(`DTSTART:${formatICSDate(event.start)}`)
    lines.push(`DTEND:${formatICSDate(event.end)}`)
    lines.push(`CREATED:${formatICSDate(event.created)}`)
    lines.push(`SUMMARY:${escapeICSText(event.summary)}`)

    if (event.description) {
      lines.push(`DESCRIPTION:${escapeICSText(event.description)}`)
    }

    lines.push(`STATUS:${event.status}`)
    lines.push(`PRIORITY:${event.priority || 5}`)
    lines.push('END:VEVENT')
  })

  // Footer
  lines.push('END:VCALENDAR')

  return lines.join('\r\n')
}

/**
 * Export tasks to ICS file and trigger download
 */
export function exportToCalendar(tasks: VoiceItem[]): void {
  // Filter tasks with dates and convert to events
  const events = tasks
    .map(task => taskToICSEvent(task))
    .filter((event): event is ICSEvent => event !== null)

  if (events.length === 0) {
    throw new Error('No tasks with dates found to export')
  }

  // Generate ICS content
  const icsContent = generateICS(events)

  // Create blob and download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `tickk-tasks-${new Date().toISOString().split('T')[0]}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

/**
 * Get count of tasks that can be exported to calendar
 */
export function getExportableTasksCount(tasks: VoiceItem[]): number {
  return tasks.filter(task => {
    const dateInfo = task.metadata?.dateInfo as string | undefined
    return parseEarliestDate(dateInfo) !== null
  }).length
}
