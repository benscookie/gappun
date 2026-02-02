'use client'

import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  icon: 'running' | 'heart' | 'fire' | 'clock' | 'hop' | 'honey' | 'nose' | 'glass'
  color?: 'blue' | 'red' | 'orange' | 'purple' | 'green' | 'amber'
}

export function MetricCard({ label, value, unit, icon, color = 'blue' }: MetricCardProps) {
  const icons = {
    running: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
      </svg>
    ),
    heart: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    fire: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 1.6-1.21 1.6-1.21s1.04 1.96 1.04 3.33c0 .61-.16 1.18-.46 1.66-.59.97-1.63 1.48-1.77 2.48zm1.29-9c0-2.5-2.49-3-2.49-3s.65 2.61-1.42 4.41c-2.07 1.8-2.48 4.59-2.48 4.59s-.32-3.89 3.49-6.86c1.67-1.31 2.9-2.16 2.9-3.14z" />
      </svg>
    ),
    clock: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
      </svg>
    ),
    hop: (
      <span className="text-lg">🌿</span>
    ),
    honey: (
      <span className="text-lg">🍯</span>
    ),
    nose: (
      <span className="text-lg">👃</span>
    ),
    glass: (
      <span className="text-lg">🍺</span>
    ),
  }

  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-500',
    orange: 'bg-orange-100 text-orange-500',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600',
  }

  return (
    <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm">
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colors[color])}>
        {icons[icon]}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-800">
          {value}
          {unit && <span className="text-sm font-normal text-gray-500 ml-0.5">{unit}</span>}
        </p>
      </div>
    </div>
  )
}
