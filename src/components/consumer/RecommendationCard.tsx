'use client'

import { RecommendationItem } from '@/types'

interface RecommendationCardProps {
  recommendations: RecommendationItem[]
  message?: string
  onOrder?: () => void
}

export function RecommendationCard({ recommendations, message, onOrder }: RecommendationCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">오늘의 추천</h3>
        <button className="text-xs text-gray-500">전체보기</button>
      </div>

      <div className="space-y-3 mb-4">
        {recommendations.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
          >
            <div className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-400">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{item.name}</p>
              <p className="text-sm text-gray-500">{item.amount}</p>
            </div>
            {item.occasion && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {item.occasion}
              </span>
            )}
          </div>
        ))}
      </div>

      {message && (
        <p className="text-sm text-gray-500 mb-4">{message}</p>
      )}

      <button
        onClick={onOrder}
        className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors"
      >
        주문하기
      </button>
    </div>
  )
}
