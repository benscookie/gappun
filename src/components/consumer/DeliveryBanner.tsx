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
    <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
          <span className="text-xl">🍺</span>
        </div>
        <div>
          <p className="font-medium text-gray-800">
            {month}월 {boxName} 배송
          </p>
          <p className="text-sm text-gray-500">배송 상품 확인 및 변경하기 {'>'}</p>
        </div>
      </div>
      <div className="bg-amber-500 text-white font-bold px-3 py-1.5 rounded-lg">
        D-{daysUntil}
      </div>
    </div>
  )
}
