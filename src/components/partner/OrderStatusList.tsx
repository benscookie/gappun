'use client'

import { PartnerOrder } from '@/types'
import { OrderStatusBadge } from '../shared/Badge'

interface OrderStatusListProps {
  orders: PartnerOrder[]
  title?: string
  onViewAll?: () => void
}

const categoryIcons: Record<string, string> = {
  LAGER: '🍺',
  PILSNER: '🍻',
  WHEAT: '🌾',
  IPA: '🧡',
  STOUT: '🖤',
  ALE: '🍯',
}

export function OrderStatusList({ orders, title = '맥주 주문 현황', onViewAll }: OrderStatusListProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📦</span>
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-amber-500 hover:text-amber-600 flex items-center gap-1"
          >
            주문 내역
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">최근 주문 및 배송 상태</p>

      <div className="space-y-3">
        {orders.map((order) => {
          const firstItem = order.items[0]
          const productName = firstItem?.product.name || '상품'
          const icon = categoryIcons[firstItem?.product.category] || '🍺'

          return (
            <div
              key={order.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{productName}</p>
                <p className="text-sm text-gray-500">주문일: {formatDate(order.createdAt)}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <OrderStatusBadge status={order.status} />
                {order.estimatedDelivery && (
                  <p className="text-xs text-gray-400">
                    도착 예정: {formatDate(order.estimatedDelivery)}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
