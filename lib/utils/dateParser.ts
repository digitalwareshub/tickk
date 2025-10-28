/**
 * Date Parsing Utility
 * Converts extracted date strings (from NLP) into actual Date objects for sorting
 */

export interface ParsedDate {
  originalText: string
  date: Date | null
  isRelative: boolean
  displayText: string
}

/**
 * Parse extracted date/time strings into Date objects
 */
export function parseDateString(dateStr: string): ParsedDate {
  const normalizedDate = dateStr.toLowerCase().trim()
  const now = new Date()

  // Relative dates
  if (normalizedDate === 'today') {
    return {
      originalText: dateStr,
      date: new Date(now.setHours(23, 59, 59, 999)), // End of today
      isRelative: true,
      displayText: 'Today'
    }
  }

  if (normalizedDate === 'tomorrow') {
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(23, 59, 59, 999)
    return {
      originalText: dateStr,
      date: tomorrow,
      isRelative: true,
      displayText: 'Tomorrow'
    }
  }

  if (normalizedDate === 'yesterday') {
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(23, 59, 59, 999)
    return {
      originalText: dateStr,
      date: yesterday,
      isRelative: true,
      displayText: 'Yesterday'
    }
  }

  // Days of week (next occurrence)
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const dayIndex = daysOfWeek.indexOf(normalizedDate)
  if (dayIndex !== -1) {
    const targetDate = new Date(now)
    const currentDay = targetDate.getDay()
    const daysUntilTarget = (dayIndex - currentDay + 7) % 7 || 7
    targetDate.setDate(targetDate.getDate() + daysUntilTarget)
    targetDate.setHours(23, 59, 59, 999)
    return {
      originalText: dateStr,
      date: targetDate,
      isRelative: true,
      displayText: dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
    }
  }

  // "Next week/month/year"
  if (/^next week$/i.test(normalizedDate)) {
    const nextWeek = new Date(now)
    nextWeek.setDate(nextWeek.getDate() + 7)
    nextWeek.setHours(23, 59, 59, 999)
    return {
      originalText: dateStr,
      date: nextWeek,
      isRelative: true,
      displayText: 'Next Week'
    }
  }

  if (/^next month$/i.test(normalizedDate)) {
    const nextMonth = new Date(now)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    nextMonth.setHours(23, 59, 59, 999)
    return {
      originalText: dateStr,
      date: nextMonth,
      isRelative: true,
      displayText: 'Next Month'
    }
  }

  if (/^next year$/i.test(normalizedDate)) {
    const nextYear = new Date(now)
    nextYear.setFullYear(nextYear.getFullYear() + 1)
    nextYear.setHours(23, 59, 59, 999)
    return {
      originalText: dateStr,
      date: nextYear,
      isRelative: true,
      displayText: 'Next Year'
    }
  }

  // "This week/month/year"
  if (/^this week$/i.test(normalizedDate)) {
    const endOfWeek = new Date(now)
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()))
    endOfWeek.setHours(23, 59, 59, 999)
    return {
      originalText: dateStr,
      date: endOfWeek,
      isRelative: true,
      displayText: 'This Week'
    }
  }

  // Specific date formats (MM/DD/YYYY, MM-DD-YYYY, Month DD)
  const slashDate = normalizedDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/)
  if (slashDate) {
    const [, month, day, year] = slashDate
    const fullYear = year.length === 2 ? 2000 + parseInt(year) : parseInt(year)
    const date = new Date(fullYear, parseInt(month) - 1, parseInt(day))
    return {
      originalText: dateStr,
      date,
      isRelative: false,
      displayText: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const dashDate = normalizedDate.match(/^(\d{1,2})-(\d{1,2})-(\d{2,4})$/)
  if (dashDate) {
    const [, month, day, year] = dashDate
    const fullYear = year.length === 2 ? 2000 + parseInt(year) : parseInt(year)
    const date = new Date(fullYear, parseInt(month) - 1, parseInt(day))
    return {
      originalText: dateStr,
      date,
      isRelative: false,
      displayText: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  // Month day (e.g., "Jan 15", "January 15")
  const monthDayMatch = normalizedDate.match(/^(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|september|oct|october|nov|november|dec|december)\s+(\d{1,2})$/i)
  if (monthDayMatch) {
    const [, monthStr, day] = monthDayMatch
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

    let monthIndex = months.findIndex(m => m.startsWith(monthStr.toLowerCase()))
    if (monthIndex === -1) {
      monthIndex = shortMonths.indexOf(monthStr.toLowerCase())
    }

    if (monthIndex !== -1) {
      const year = now.getFullYear()
      const date = new Date(year, monthIndex, parseInt(day))

      // If the date is in the past, assume next year
      if (date < now) {
        date.setFullYear(year + 1)
      }

      return {
        originalText: dateStr,
        date,
        isRelative: false,
        displayText: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }
    }
  }

  // Time of day (approximate to today)
  if (/^(morning|afternoon|evening|night)$/i.test(normalizedDate)) {
    const timeOfDay = normalizedDate
    const timeDate = new Date(now)

    // Set approximate times
    if (timeOfDay === 'morning') timeDate.setHours(9, 0, 0, 0)
    else if (timeOfDay === 'afternoon') timeDate.setHours(14, 0, 0, 0)
    else if (timeOfDay === 'evening') timeDate.setHours(18, 0, 0, 0)
    else if (timeOfDay === 'night') timeDate.setHours(21, 0, 0, 0)

    return {
      originalText: dateStr,
      date: timeDate,
      isRelative: true,
      displayText: `Today ${timeOfDay}`
    }
  }

  // Specific times (e.g., "3pm", "3:30pm", "15:00")
  const timeMatch = normalizedDate.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i)
  if (timeMatch) {
    const [, hours, minutes = '00', meridian] = timeMatch
    let hour = parseInt(hours)

    if (meridian) {
      if (meridian.toLowerCase() === 'pm' && hour < 12) hour += 12
      if (meridian.toLowerCase() === 'am' && hour === 12) hour = 0
    }

    const timeDate = new Date(now)
    timeDate.setHours(hour, parseInt(minutes), 0, 0)

    // If time is in the past today, assume tomorrow
    if (timeDate < now) {
      timeDate.setDate(timeDate.getDate() + 1)
    }

    return {
      originalText: dateStr,
      date: timeDate,
      isRelative: true,
      displayText: timeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    }
  }

  // Couldn't parse - return null
  return {
    originalText: dateStr,
    date: null,
    isRelative: false,
    displayText: dateStr
  }
}

/**
 * Parse dateInfo string (may contain multiple dates/times) and return the earliest
 */
export function parseEarliestDate(dateInfo: string | undefined): Date | null {
  if (!dateInfo) return null

  const parts = dateInfo.split(',').map(s => s.trim())
  const parsedDates = parts
    .map(parseDateString)
    .filter(pd => pd.date !== null)
    .sort((a, b) => (a.date!.getTime() - b.date!.getTime()))

  return parsedDates.length > 0 ? parsedDates[0].date : null
}

/**
 * Get display text for date info (shows first date/time)
 */
export function getDateDisplayText(dateInfo: string | undefined): string | null {
  if (!dateInfo) return null

  const parts = dateInfo.split(',').map(s => s.trim())
  if (parts.length === 0) return null

  const parsed = parseDateString(parts[0])

  // Add time if exists
  if (parts.length > 1) {
    const timePart = parts[1]
    if (/\d{1,2}:\d{2}|am|pm|morning|afternoon|evening|night/i.test(timePart)) {
      return `${parsed.displayText} ${timePart}`
    }
  }

  return parsed.displayText
}

/**
 * Categorize date into groups for UI
 */
export function categorizeDateGroup(date: Date | null): 'overdue' | 'today' | 'tomorrow' | 'this-week' | 'later' | 'no-date' {
  if (!date) return 'no-date'

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const endOfWeek = new Date(today)
  endOfWeek.setDate(endOfWeek.getDate() + (6 - today.getDay()))

  if (date < today) return 'overdue'
  if (date < tomorrow) return 'today'
  if (date < new Date(tomorrow.getTime() + 86400000)) return 'tomorrow'
  if (date <= endOfWeek) return 'this-week'
  return 'later'
}

/**
 * Check if a date is overdue
 */
export function isOverdue(date: Date | null): boolean {
  if (!date) return false
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return date < today
}
