'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockPartner } from '@/data/mockData'
import { useState } from 'react'

export default function SettingsPage() {
  const partner = mockPartner
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    stockAlert: true,
    orderAlert: true,
    settlementAlert: true,
  })

  return (
    <>
      <PartnerHeader title="설정" partnerName={partner.name} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">파트너 정보</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">상호명</label>
                  <input
                    type="text"
                    defaultValue={partner.name}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">사업자 유형</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="GYM">헬스장</option>
                    <option value="CROSSFIT">크로스핏</option>
                    <option value="PILATES">필라테스</option>
                    <option value="YOGA">요가</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">사업자 등록번호</label>
                <input
                  type="text"
                  defaultValue="123-45-67890"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">사업장 주소</label>
                <input
                  type="text"
                  defaultValue="서울시 강남구 테헤란로 123"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">담당자명</label>
                  <input
                    type="text"
                    defaultValue="홍길동"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">연락처</label>
                  <input
                    type="tel"
                    defaultValue="010-1234-5678"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                  정보 저장
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">알림 설정</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">이메일 알림</p>
                  <p className="text-sm text-gray-500">중요 알림을 이메일로 받습니다</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.email ? 'bg-pink-500' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications.email ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">푸시 알림</p>
                  <p className="text-sm text-gray-500">앱 푸시 알림을 받습니다</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.push ? 'bg-pink-500' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications.push ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">SMS 알림</p>
                  <p className="text-sm text-gray-500">긴급 알림을 문자로 받습니다</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.sms ? 'bg-pink-500' : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications.sms ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="pt-4">
                <h4 className="font-medium text-gray-900 mb-3">알림 유형</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={notifications.stockAlert}
                      onChange={() => setNotifications(prev => ({ ...prev, stockAlert: !prev.stockAlert }))}
                      className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                    />
                    <span className="text-gray-700">재고 부족 알림</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={notifications.orderAlert}
                      onChange={() => setNotifications(prev => ({ ...prev, orderAlert: !prev.orderAlert }))}
                      className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                    />
                    <span className="text-gray-700">주문 상태 변경 알림</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={notifications.settlementAlert}
                      onChange={() => setNotifications(prev => ({ ...prev, settlementAlert: !prev.settlementAlert }))}
                      className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                    />
                    <span className="text-gray-700">정산 완료 알림</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">플랜 정보</h3>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">⭐</span>
                  <span className="font-bold text-gray-900">Pro 플랜</span>
                </div>
                <p className="text-sm text-gray-600">수수료 10% · 우선 고객 지원 · 마케팅 크레딧</p>
              </div>
              <button className="text-pink-500 hover:text-pink-600 font-medium text-sm">
                플랜 변경
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">계정</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <span className="text-gray-700">비밀번호 변경</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <span className="text-gray-700">로그아웃</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                <span className="text-red-600">계정 탈퇴</span>
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
