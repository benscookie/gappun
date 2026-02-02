'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  color?: 'green' | 'yellow' | 'red' | 'pink'
  showLabel?: boolean
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  color = 'green',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const colors = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    pink: 'bg-pink-500',
  }

  const getAutoColor = (pct: number) => {
    if (pct <= 20) return 'bg-red-500'
    if (pct <= 40) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const barColor = color === 'green' && percentage <= 40 ? getAutoColor(percentage) : colors[color]

  return (
    <div className={cn('w-full', className)}>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', barColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm text-gray-600 mt-1">{Math.round(percentage)}%</span>
      )}
    </div>
  )
}
