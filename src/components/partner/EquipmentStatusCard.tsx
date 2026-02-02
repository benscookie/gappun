'use client'

import { Equipment } from '@/types'
import { StatusBadge } from '../shared/Badge'
import { ProgressBar } from '../shared/ProgressBar'

interface EquipmentStatusCardProps {
  equipment: Equipment
}

const categoryIcons: Record<string, string> = {
  LAGER: '🍺',
  PILSNER: '🍻',
  WHEAT: '🌾',
  IPA: '🧡',
  STOUT: '🖤',
  ALE: '🍯',
}

export function EquipmentStatusCard({ equipment }: EquipmentStatusCardProps) {
  const icon = categoryIcons[equipment.category] || '🍺'
  const displayName = equipment.style
    ? `${equipment.name} (${equipment.style})`
    : equipment.name

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
        <StatusBadge status={equipment.status} />
      </div>

      <h4 className="font-semibold text-gray-800 mb-1">{displayName}</h4>

      <div className="flex items-center gap-2">
        <ProgressBar value={equipment.stockLevel} className="flex-1" />
        <span className="text-sm font-medium text-gray-600">{equipment.stockLevel}%</span>
      </div>
    </div>
  )
}

interface EquipmentGridProps {
  equipment: Equipment[]
  title?: string
  onViewAll?: () => void
}

export function EquipmentGrid({ equipment, title = '논알콜 맥주 재고', onViewAll }: EquipmentGridProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🍺</span>
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-amber-500 hover:text-amber-600 flex items-center gap-1"
          >
            전체 보기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">실시간 맥주 재고 모니터링</p>

      <div className="grid grid-cols-3 gap-3">
        {equipment.map((item) => (
          <EquipmentStatusCard key={item.id} equipment={item} />
        ))}
      </div>
    </div>
  )
}
