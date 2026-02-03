'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockEquipments, mockPartner } from '@/data/mockData'
import { useState } from 'react'

export default function EquipmentPage() {
  const partner = mockPartner
  const equipment = mockEquipments
  const [filter, setFilter] = useState<'all' | 'normal' | 'low' | 'urgent'>('all')

  const filteredEquipment = filter === 'all'
    ? equipment
    : equipment.filter(e => e.status.toLowerCase() === filter)

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
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filter === status
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {status === 'all' ? '전체' : getStatusText(status.toUpperCase())}
                <span className="ml-1.5 text-xs opacity-70">
                  {status === 'all'
                    ? equipment.length
                    : equipment.filter(e => e.status.toLowerCase() === status).length}
                </span>
              </button>
            ))}
          </div>

          <button className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-teal-700 transition-colors">
            주문하기
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredEquipment.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.style}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.status === 'URGENT' ? 'bg-gray-900 text-white' :
                  item.status === 'LOW' ? 'bg-gray-200 text-gray-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {getStatusText(item.status)}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">재고량</span>
                  <span className="text-gray-900">{item.stockLevel}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-900 rounded-full transition-all"
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
                <button className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg text-sm hover:bg-teal-700 transition-colors">
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
