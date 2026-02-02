'use client'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  description?: string
}

export function MetricCard({ label, value, unit, description }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-semibold text-gray-900">
        {value}
        {unit && <span className="text-sm font-normal text-gray-500 ml-0.5">{unit}</span>}
      </p>
      {description && (
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      )}
    </div>
  )
}
