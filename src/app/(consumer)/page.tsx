'use client'

import { useState } from 'react'
import { CharacterAvatar } from '@/components/consumer/CharacterAvatar'
import { MetricCard } from '@/components/consumer/MetricCard'
import { mockDeliveryDate, mockRecommendations, mockTasteData, mockUser } from '@/data/mockData'
import { getDaysUntil } from '@/lib/utils'

export default function ConsumerHomePage() {
  const user = mockUser
  const taste = mockTasteData
  const recommendations = mockRecommendations
  const deliveryDate = mockDeliveryDate
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const daysUntil = getDaysUntil(deliveryDate)
  const month = deliveryDate.getMonth() + 1

  const handleOrder = () => {
    setOrderComplete(true)
    setTimeout(() => {
      setOrderComplete(false)
      setShowOrderModal(false)
    }, 2000)
  }

  return (
    <div className="p-4 space-y-4 pb-20">
      <CharacterAvatar score={user.tasteScore || 0} name={user.name} />

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">취향 분석</h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="쓴맛"
            value={taste.bitterness || 0}
            unit="/10"
          />
          <MetricCard
            label="단맛"
            value={taste.sweetness || 0}
            unit="/10"
          />
          <MetricCard
            label="향"
            value={taste.aroma || 0}
            unit="/10"
          />
          <MetricCard
            label="바디감"
            value={taste.body || 0}
            unit="/10"
          />
        </div>
      </div>

      {/* Recommendation Card */}
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

        <p className="text-sm text-gray-500 mb-4">취향에 맞춘 논알콜 맥주를 추천해드려요</p>

        <button
          onClick={() => setShowOrderModal(true)}
          className="w-full bg-teal-600 text-white font-medium py-3 rounded-xl hover:bg-teal-700 transition-colors"
        >
          주문하기
        </button>
      </div>

      {/* Delivery Banner */}
      <button
        onClick={() => setShowDeliveryModal(true)}
        className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div>
          <p className="font-medium text-gray-900">
            {month}월 맥주박스 배송
          </p>
          <p className="text-sm text-gray-500">배송 상품 확인 및 변경하기</p>
        </div>
        <div className="bg-teal-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg">
          D-{daysUntil}
        </div>
      </button>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">추천 맥주 주문</h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {orderComplete ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-900">주문이 완료되었습니다</p>
                <p className="text-sm text-gray-500 mt-1">배송 정보는 구독 페이지에서 확인하세요</p>
              </div>
            ) : (
              <div className="p-4">
                <div className="space-y-3 mb-6">
                  {recommendations.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">상품 금액</span>
                    <span className="text-sm text-gray-900">15,900원</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">배송비</span>
                    <span className="text-sm text-gray-900">무료</span>
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
                    <span className="font-medium text-gray-900">총 결제 금액</span>
                    <span className="font-semibold text-gray-900">15,900원</span>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors"
                >
                  결제하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delivery Modal */}
      {showDeliveryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">{month}월 배송 정보</h2>
              <button
                onClick={() => setShowDeliveryModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 flex-1 overflow-auto">
              <div className="bg-teal-50 p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">배송 예정일</p>
                    <p className="text-sm text-teal-600">
                      {deliveryDate.getMonth() + 1}월 {deliveryDate.getDate()}일 (D-{daysUntil})
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-medium text-gray-900 mb-3">배송 상품</h3>
              <div className="space-y-3 mb-6">
                {recommendations.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.amount}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-medium text-gray-900 mb-3">배송지</h3>
              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <p className="text-sm text-gray-900">서울시 강남구 테헤란로 123</p>
                <p className="text-sm text-gray-500">456호</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                  상품 변경
                </button>
                <button className="py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                  배송지 변경
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
