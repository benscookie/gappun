'use client'

import { PartnerOrder } from '@/types'
import { cn } from '@/lib/utils'

interface OrderStatusListProps {
  orders: PartnerOrder[]
  title?: string
  onViewAll?: () => void
}

const statusLabels: Record<string, string> = {
  PENDING: '대기',
  PROCESSING: '처리중',
  SHIPPED: '배송중',
  DELIVERED: '완료',
  CANCELLED: '취소',
}

export function OrderStatusList({ orders, title = '최근 주문', onViewAll }: OrderStatusListProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    })
  }

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

      <div className="space-y-2">
        {orders.map((order) => {
          const firstItem = order.items[0]
          const productName = firstItem?.product.name || '상품'

          return (
            <div
              key={order.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{productName}</p>
                <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
              </div>
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded',
                  order.status === 'DELIVERED' ? 'bg-gray-100 text-gray-600' :
                  order.status === 'SHIPPED' ? 'bg-gray-200 text-gray-700' :
                  order.status === 'CANCELLED' ? 'bg-gray-100 text-gray-400' :
                  'bg-gray-900 text-white'
                )}
              >
                {statusLabels[order.status]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
