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
  icon,
  format = 'number',
}: StatsCardProps) {
  const icons = {
    cup: (
      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
        <span className="text-2xl">🥤</span>
      </div>
    ),
    beer: (
      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
        <span className="text-2xl">🍺</span>
      </div>
    ),
    won: (
      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
        <span className="text-2xl">💰</span>
      </div>
    ),
    users: (
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
        <span className="text-2xl">👥</span>
      </div>
    ),
    star: (
      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
        <span className="text-2xl">⭐</span>
      </div>
    ),
  }

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
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        {icons[icon]}
        {change !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg',
              change >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
            )}
          >
            {change >= 0 ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">
          {formatValue(value)}
          {unit && <span className="text-lg font-normal text-gray-500 ml-1">{unit}</span>}
        </p>
        {changeLabel && change !== undefined && (
          <p className="text-xs text-gray-400 mt-1">{changeLabel}</p>
        )}
      </div>
    </div>
  )
}
