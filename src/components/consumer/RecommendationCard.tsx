'use client'

import { RecommendationItem } from '@/types'
import { Button } from '../shared/Button'

interface RecommendationCardProps {
  recommendations: RecommendationItem[]
  message?: string
  onOrder?: () => void
}

export function RecommendationCard({ recommendations, message, onOrder }: RecommendationCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-amber-500">🍺</span>
        <h3 className="font-semibold text-gray-800">오늘의 추천 논알콜 맥주</h3>
      </div>

      <div className="flex gap-3 mb-4">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
              {item.icon || '🍺'}
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.amount}</p>
              {item.occasion && (
                <p className="text-xs text-amber-600 mt-1">{item.occasion}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {message && (
        <p className="text-sm text-amber-600 mb-4 flex items-center gap-1">
          <span>✨</span>
          {message}
        </p>
      )}

      <Button className="w-full" onClick={onOrder}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        바로 주문하기
      </Button>
    </div>
  )
}
