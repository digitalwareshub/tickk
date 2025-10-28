/**
 * ActivityHeatmap Component
 * Visual heatmap showing productivity patterns by hour and day
 */

interface ActivityData {
  day: string
  hour: number
  count: number
}

interface ActivityHeatmapProps {
  data: ActivityData[]
  maxCount: number
}

export default function ActivityHeatmap({ data, maxCount }: ActivityHeatmapProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getIntensity = (count: number): string => {
    if (count === 0) return 'bg-gray-100'
    const percentage = (count / maxCount) * 100
    if (percentage >= 75) return 'bg-green-600'
    if (percentage >= 50) return 'bg-green-500'
    if (percentage >= 25) return 'bg-green-400'
    return 'bg-green-300'
  }

  const getCellData = (day: string, hour: number): number => {
    const cell = data.find(d => d.day === day && d.hour === hour)
    return cell?.count || 0
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Hour labels */}
        <div className="flex mb-1">
          <div className="w-12"></div>
          {[0, 6, 12, 18].map(hour => (
            <div key={hour} className="flex-1 text-center text-xs text-gray-500">
              {hour}:00
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="space-y-1">
          {days.map(day => (
            <div key={day} className="flex items-center gap-1">
              {/* Day label */}
              <div className="w-12 text-xs text-gray-600 font-medium">
                {day}
              </div>

              {/* Hour cells */}
              <div className="flex gap-1 flex-1">
                {hours.map(hour => {
                  const count = getCellData(day, hour)
                  return (
                    <div
                      key={hour}
                      className={`h-4 rounded-sm flex-1 transition-colors ${getIntensity(count)}`}
                      title={`${day} ${hour}:00 - ${count} items`}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-3 text-xs text-gray-600">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
