/**
 * StatCard Component
 * Displays individual statistics in the analytics dashboard
 */

interface StatCardProps {
  icon: string
  label: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export default function StatCard({ 
  icon, 
  label, 
  value, 
  subtitle, 
  trend,
  className = '' 
}: StatCardProps) {
  const trendIcon = {
    up: '↗️',
    down: '↘️',
    neutral: '→'
  }

  return (
    <div className={`bg-white dark:bg-slate-800/90 rounded-lg p-4 border border-gray-200 dark:border-slate-700 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl" role="img" aria-label={label}>
          {icon}
        </span>
        {trend && (
          <span className="text-sm opacity-60">
            {trendIcon[trend]}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-bold text-gray-900 dark:text-slate-50">
          {value}
        </div>
        <div className="text-sm text-gray-600 dark:text-slate-300">
          {label}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-500 dark:text-slate-400">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}
