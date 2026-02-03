'use client'

import { cn, formatCurrency, formatNumber } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: number
  unit?: string
  change?: number
  changeLabel?: string
  icon: 'cup' | 'beer' | 'won' | 'users' | 'star'
  format?: 'number' | 'currency' | 'decimal'
}

export function StatsCard({
  title,
  value,
  unit,
  change,
  changeLabel = '전월 대비',
  format = 'number',
}: StatsCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val)
      case 'decimal':
        return val.toFixed(1)
      default:
        return formatNumber(val)
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">{title}</p>
        {change !== undefined && (
          <span
            className={cn(
              'text-xs',
              change >= 0 ? 'text-teal-600' : 'text-gray-400'
            )}
          >
            {change >= 0 ? '+' : ''}{Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold text-gray-900">
        {formatValue(value)}
        {unit && <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>}
      </p>
      {changeLabel && change !== undefined && (
        <p className="text-xs text-gray-400 mt-1">{changeLabel}</p>
      )}
    </div>
  )
}
