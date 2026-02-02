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
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm opacity-90">현재 구독</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
            {user.subscriptionTier === 'PREMIUM' ? '프리미엄' : '베이직'}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-1">{user.name}님의 맞춤 맥주 박스</h2>
        <p className="text-sm opacity-90">취향 점수 {user.tasteScore}점 기반 큐레이션</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">다음 배송</h2>
          <span className="text-amber-500 font-medium">{formatDate(deliveryDate)}</span>
        </div>

        <div className="space-y-3">
          {recommendations.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.amount}</p>
              </div>
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                {item.occasion}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">구독 관리</h2>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <span className="text-gray-700">배송 주기 변경</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <span className="text-gray-700">배송지 관리</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <span className="text-gray-700">맥주 취향 재설정</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <span className="text-gray-700">구독 일시정지</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-2">플랜 업그레이드</h2>
        <p className="text-sm text-gray-500 mb-4">프리미엄으로 업그레이드하고 더 다양한 맥주를 만나보세요</p>

        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">👑</span>
            <span className="font-bold text-amber-800">프리미엄 혜택</span>
          </div>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 한정판 논알콜 맥주 우선 제공</li>
            <li>• 무료 배송</li>
            <li>• 맥주 소믈리에 1:1 상담</li>
            <li>• 신제품 테이스팅 이벤트 초대</li>
          </ul>
          <button className="w-full mt-4 bg-amber-500 text-white py-3 rounded-xl font-medium hover:bg-amber-600 transition-colors">
            프리미엄 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}
