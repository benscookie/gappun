'use client'

import { Equipment } from '@/types'
import { cn } from '@/lib/utils'

interface EquipmentStatusCardProps {
  equipment: Equipment
}

export function EquipmentStatusCard({ equipment }: EquipmentStatusCardProps) {
  const displayName = equipment.style
    ? `${equipment.name} (${equipment.style})`
    : equipment.name

  const statusColors = {
    NORMAL: 'bg-gray-100',
    LOW: 'bg-gray-200',
    URGENT: 'bg-gray-900',
  }

  const barColors = {
    NORMAL: 'bg-gray-400',
    LOW: 'bg-gray-500',
    URGENT: 'bg-gray-900',
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900 text-sm truncate">{displayName}</h4>
        <span
          className={cn(
            'text-[10px] px-1.5 py-0.5 rounded',
            statusColors[equipment.status],
            equipment.status === 'URGENT' ? 'text-white' : 'text-gray-600'
          )}
        >
          {equipment.status === 'URGENT' ? '긴급' : equipment.status === 'LOW' ? '부족' : '정상'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all', barColors[equipment.status])}
            style={{ width: `${equipment.stockLevel}%` }}
          />
        </div>
        <span className="text-xs text-gray-500">{equipment.stockLevel}%</span>
      </div>
    </div>
  )
}

interface EquipmentGridProps {
  equipment: Equipment[]
  title?: string
  onViewAll?: () => void
}

export function EquipmentGrid({ equipment, title = '재고 현황', onViewAll }: EquipmentGridProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            전체보기
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {equipment.map((item) => (
          <EquipmentStatusCard key={item.id} equipment={item} />
        ))}
      </div>
    </div>
  )
}
