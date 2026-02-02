'use client'

import { mockUser, mockRecommendations, mockDeliveryDate } from '@/data/mockData'

export default function SubscriptionPage() {
  const user = mockUser
  const recommendations = mockRecommendations
  const deliveryDate = mockDeliveryDate

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">현재 구독</p>
            <h2 className="text-lg font-semibold text-gray-900">
              {user.subscriptionTier === 'PREMIUM' ? '프리미엄' : '베이직'}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">취향 점수</p>
            <p className="text-lg font-semibold text-gray-900">{user.tasteScore}</p>
          </div>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gray-900 rounded-full" style={{ width: '60%' }} />
        </div>
        <p className="text-xs text-gray-500 mt-2">다음 등급까지 40% 남았어요</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">다음 배송</h2>
          <span className="text-sm text-gray-500">{formatDate(deliveryDate)}</span>
        </div>

        <div className="space-y-3">
          {recommendations.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <h2 className="font-semibold text-gray-900 mb-4">구독 관리</h2>

        <div className="space-y-2">
          {['배송 주기 변경', '배송지 관리', '취향 재설정', '구독 일시정지'].map((item) => (
            <button
              key={item}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <span className="text-gray-700 text-sm">{item}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <h2 className="font-semibold text-gray-900 mb-2">플랜 업그레이드</h2>
        <p className="text-sm text-gray-500 mb-4">프리미엄으로 더 다양한 맥주를 만나보세요</p>

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="font-medium text-gray-900 mb-3">프리미엄 혜택</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              한정판 논알콜 맥주 우선 제공
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              무료 배송
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              1:1 맥주 소믈리에 상담
            </li>
          </ul>
          <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl font-medium">
            프리미엄 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}
