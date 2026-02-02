'use client'

import { getDaysUntil } from '@/lib/utils'

interface DeliveryBannerProps {
  deliveryDate: Date
  boxName?: string
}

export function DeliveryBanner({ deliveryDate, boxName = '맥주박스' }: DeliveryBannerProps) {
  const daysUntil = getDaysUntil(deliveryDate)
  const month = deliveryDate.getMonth() + 1

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">
          {month}월 {boxName} 배송
        </p>
        <p className="text-sm text-gray-500">배송 상품 확인 및 변경하기</p>
      </div>
      <div className="bg-gray-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg">
        D-{daysUntil}
      </div>
    </div>
  )
}
