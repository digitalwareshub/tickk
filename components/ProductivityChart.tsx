/**
 * ProductivityChart Component
 * Line chart showing task completion over time
 */

interface DataPoint {
  label: string
  completed: number
  total: number
}

interface ProductivityChartProps {
  data: DataPoint[]
  height?: number
}

export default function ProductivityChart({ data, height = 200 }: ProductivityChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        No data available
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.total), 1)
  const chartWidth = 100 // percentage

  const getY = (value: number): number => {
    return height - (value / maxValue) * (height - 20)
  }

  const getX = (index: number): number => {
    return (index / (data.length - 1 || 1)) * chartWidth
  }

  // Generate path for completed tasks
  const completedPath = data
    .map((d, i) => {
      const x = getX(i)
      const y = getY(d.completed)
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(' ')

  // Generate path for total tasks
  const totalPath = data
    .map((d, i) => {
      const x = getX(i)
      const y = getY(d.total)
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(' ')

  return (
    <div className="relative">
      <svg
        className="w-full"
        style={{ height: `${height}px` }}
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
          const y = height - fraction * (height - 20)
          return (
            <line
              key={fraction}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="0.2"
            />
          )
        })}

        {/* Total tasks line (light blue) */}
        <path
          d={totalPath}
          fill="none"
          stroke="#93c5fd"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Completed tasks line (green) */}
        <path
          d={completedPath}
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const x = getX(i)
          const yCompleted = getY(d.completed)
          const yTotal = getY(d.total)

          return (
            <g key={i}>
              {/* Total point */}
              <circle
                cx={x}
                cy={yTotal}
                r="1.5"
                fill="#93c5fd"
                vectorEffect="non-scaling-stroke"
              />
              {/* Completed point */}
              <circle
                cx={x}
                cy={yCompleted}
                r="1.5"
                fill="#22c55e"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center">
            {d.label}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-green-500"></div>
          <span className="text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-blue-300"></div>
          <span className="text-gray-600">Total</span>
        </div>
      </div>
    </div>
  )
}
