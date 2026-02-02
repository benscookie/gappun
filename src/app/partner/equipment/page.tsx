'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockEquipments, mockPartner } from '@/data/mockData'
import { useState } from 'react'

const categoryIcons: Record<string, string> = {
  LAGER: '🍺',
  PILSNER: '🍻',
  WHEAT: '🌾',
  IPA: '🧡',
  STOUT: '🖤',
  ALE: '🍯',
}

export default function EquipmentPage() {
  const partner = mockPartner
  const equipment = mockEquipments
  const [filter, setFilter] = useState<'all' | 'normal' | 'low' | 'urgent'>('all')

  const filteredEquipment = filter === 'all'
    ? equipment
    : equipment.filter(e => e.status.toLowerCase() === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NORMAL': return 'bg-green-100 text-green-700'
      case 'LOW': return 'bg-yellow-100 text-yellow-700'
      case 'URGENT': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'NORMAL': return '정상'
      case 'LOW': return '부족'
      case 'URGENT': return '긴급'
      default: return status
    }
  }

  return (
    <>
      <PartnerHeader title="재고 관리" partnerName={partner.name} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'normal', 'low', 'urgent'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? '전체' : getStatusText(status.toUpperCase())}
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {status === 'all'
                    ? equipment.length
                    : equipment.filter(e => e.status.toLowerCase() === status).length}
                </span>
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            맥주 주문
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredEquipment.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{categoryIcons[item.category] || '🍺'}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.style}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">재고량</span>
                  <span className="font-medium text-gray-900">{item.stockLevel}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.stockLevel > 50 ? 'bg-green-500' :
                      item.stockLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.stockLevel}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">마지막 입고</span>
                <span className="text-gray-700">
                  {item.lastRefillDate ? new Date(item.lastRefillDate).toLocaleDateString('ko-KR') : '-'}
                </span>
              </div>

              {item.status === 'URGENT' && (
                <button className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                  긴급 주문
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
