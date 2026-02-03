'use client'

import { useState } from 'react'
import { mockUser, mockRecommendations, mockDeliveryDate } from '@/data/mockData'

type ModalType = 'delivery-cycle' | 'address' | 'taste' | 'pause' | 'premium' | null

export default function SubscriptionPage() {
  const [user, setUser] = useState(mockUser)
  const recommendations = mockRecommendations
  const deliveryDate = mockDeliveryDate
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [deliveryCycle, setDeliveryCycle] = useState(2)
  const [isPaused, setIsPaused] = useState(false)
  const [address, setAddress] = useState('서울시 강남구 테헤란로 123')
  const [addressDetail, setAddressDetail] = useState('456호')
  const [tastePreferences, setTastePreferences] = useState({
    bitter: 3,
    sweet: 4,
    aroma: 5,
    body: 3,
  })
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`
  }

  const handleSave = (type: ModalType) => {
    let message = ''
    switch (type) {
      case 'delivery-cycle':
        message = `배송 주기가 ${deliveryCycle}주로 변경되었습니다`
        break
      case 'address':
        message = '배송지가 변경되었습니다'
        break
      case 'taste':
        message = '취향이 재설정되었습니다'
        break
      case 'pause':
        setIsPaused(!isPaused)
        message = isPaused ? '구독이 재개되었습니다' : '구독이 일시정지되었습니다'
        break
      case 'premium':
        setUser(prev => ({ ...prev, subscriptionTier: 'PREMIUM' }))
        message = '프리미엄 구독이 시작되었습니다!'
        break
    }
    setActiveModal(null)
    setActionSuccess(message)
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const menuItems = [
    { key: 'delivery-cycle' as const, label: '배송 주기 변경' },
    { key: 'address' as const, label: '배송지 관리' },
    { key: 'taste' as const, label: '취향 재설정' },
    { key: 'pause' as const, label: isPaused ? '구독 재개하기' : '구독 일시정지' },
  ]

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Success Toast */}
      {actionSuccess && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl text-sm text-center">
          {actionSuccess}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">현재 구독</p>
            <h2 className="text-lg font-semibold text-gray-900">
              {user.subscriptionTier === 'PREMIUM' ? '프리미엄' : '베이직'}
              {isPaused && <span className="text-sm text-gray-400 ml-2">(일시정지)</span>}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">취향 점수</p>
            <p className="text-lg font-semibold text-gray-900">{user.tasteScore}</p>
          </div>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-600 rounded-full" style={{ width: '60%' }} />
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
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveModal(item.key)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-700 text-sm">{item.label}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {user.subscriptionTier !== 'PREMIUM' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h2 className="font-semibold text-gray-900 mb-2">플랜 업그레이드</h2>
          <p className="text-sm text-gray-500 mb-4">프리미엄으로 더 다양한 맥주를 만나보세요</p>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="font-medium text-gray-900 mb-3">프리미엄 혜택</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                한정판 논알콜 맥주 우선 제공
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                무료 배송
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1:1 맥주 소믈리에 상담
              </li>
            </ul>
            <button
              onClick={() => setActiveModal('premium')}
              className="w-full mt-4 bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors"
            >
              프리미엄 시작하기
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">
                {activeModal === 'delivery-cycle' && '배송 주기 변경'}
                {activeModal === 'address' && '배송지 관리'}
                {activeModal === 'taste' && '취향 재설정'}
                {activeModal === 'pause' && (isPaused ? '구독 재개' : '구독 일시정지')}
                {activeModal === 'premium' && '프리미엄 구독'}
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              {activeModal === 'delivery-cycle' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">배송 받을 주기를 선택하세요</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 4].map((weeks) => (
                      <button
                        key={weeks}
                        onClick={() => setDeliveryCycle(weeks)}
                        className={`py-3 rounded-xl text-sm font-medium transition-colors ${
                          deliveryCycle === weeks
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {weeks}주마다
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handleSave('delivery-cycle')}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium"
                  >
                    저장
                  </button>
                </div>
              )}

              {activeModal === 'address' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">주소</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">상세 주소</label>
                    <input
                      type="text"
                      value={addressDetail}
                      onChange={(e) => setAddressDetail(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <button
                    onClick={() => handleSave('address')}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium"
                  >
                    저장
                  </button>
                </div>
              )}

              {activeModal === 'taste' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">선호하는 맛의 강도를 조절하세요</p>
                  {[
                    { key: 'bitter', label: '쓴맛' },
                    { key: 'sweet', label: '단맛' },
                    { key: 'aroma', label: '향' },
                    { key: 'body', label: '바디감' },
                  ].map((item) => (
                    <div key={item.key}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="text-gray-900">{tastePreferences[item.key as keyof typeof tastePreferences]}/5</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={tastePreferences[item.key as keyof typeof tastePreferences]}
                        onChange={(e) => setTastePreferences(prev => ({
                          ...prev,
                          [item.key]: parseInt(e.target.value)
                        }))}
                        className="w-full accent-teal-600"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => handleSave('taste')}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium"
                  >
                    저장
                  </button>
                </div>
              )}

              {activeModal === 'pause' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    {isPaused
                      ? '구독을 재개하시면 다음 배송일부터 정상적으로 배송됩니다.'
                      : '구독을 일시정지하면 다음 배송이 중단됩니다. 언제든 다시 시작할 수 있습니다.'}
                  </p>
                  <button
                    onClick={() => handleSave('pause')}
                    className={`w-full py-3 rounded-xl font-medium ${
                      isPaused
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'bg-gray-900 text-white'
                    }`}
                  >
                    {isPaused ? '구독 재개하기' : '일시정지'}
                  </button>
                </div>
              )}

              {activeModal === 'premium' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="font-medium text-gray-900 mb-2">프리미엄 플랜</p>
                    <p className="text-2xl font-bold text-gray-900">월 29,900원</p>
                    <p className="text-sm text-gray-500 mt-1">첫 달 50% 할인</p>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      한정판 논알콜 맥주 우선 제공
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      무료 배송
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      1:1 맥주 소믈리에 상담
                    </li>
                  </ul>
                  <button
                    onClick={() => handleSave('premium')}
                    className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors"
                  >
                    프리미엄 시작하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
