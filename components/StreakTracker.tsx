/**
 * StreakTracker Component
 * Shows daily activity streak and calendar
 */

interface StreakData {
  currentStreak: number
  longestStreak: number
  activeDays: string[] // ISO date strings
}

interface StreakTrackerProps {
  data: StreakData
}

export default function StreakTracker({ data }: StreakTrackerProps) {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Generate calendar grid
  const calendarDays: (number | null)[] = []

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const isActiveDay = (day: number | null): boolean => {
    if (!day) return false
    const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0]
    return data.activeDays.includes(dateStr)
  }

  const isToday = (day: number | null): boolean => {
    if (!day) return false
    return day === today.getDate() &&
           currentMonth === today.getMonth() &&
           currentYear === today.getFullYear()
  }

  return (
    <div className="space-y-4">
      {/* Streak Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700/50">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {data.currentStreak}
            <span className="text-lg ml-1">🔥</span>
          </div>
          <div className="text-sm text-gray-700 dark:text-slate-300 mt-1">
            Current Streak
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700/50">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {data.longestStreak}
            <span className="text-lg ml-1">🏆</span>
          </div>
          <div className="text-sm text-gray-700 dark:text-slate-300 mt-1">
            Longest Streak
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div>
        <div className="text-sm font-semibold text-gray-900 dark:text-slate-50 mb-2">
          {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-xs font-medium text-gray-500 dark:text-slate-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, i) => (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center text-xs rounded ${
                !day
                  ? ''
                  : isToday(day)
                    ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-300 dark:ring-blue-500'
                    : isActiveDay(day)
                      ? 'bg-green-500 dark:bg-green-600 text-white font-semibold'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500'
              }`}
            >
              {day || ''}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-3 text-xs text-gray-600 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 dark:bg-green-600 rounded"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-100 dark:bg-slate-700 rounded"></div>
            <span>Inactive</span>
          </div>
        </div>
      </div>
    </div>
  )
}
