'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockPartner } from '@/data/mockData'
import { useState } from 'react'

export default function SettingsPage() {
  const partner = mockPartner
  const [partnerInfo, setPartnerInfo] = useState({
    name: partner.name,
    type: 'GYM',
    businessNumber: '123-45-67890',
    address: '서울시 강남구 테헤란로 123',
    managerName: '홍길동',
    phone: '010-1234-5678',
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    stockAlert: true,
    orderAlert: true,
    settlementAlert: true,
  })
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<'BASIC' | 'PRO'>('PRO')
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })

  const handleSaveInfo = () => {
    setActionSuccess('정보가 저장되었습니다')
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const handleChangePlan = (plan: 'BASIC' | 'PRO') => {
    setCurrentPlan(plan)
    setShowPlanModal(false)
    setActionSuccess(`${plan === 'PRO' ? 'Pro' : 'Basic'} 플랜으로 변경되었습니다`)
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const handleChangePassword = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      setActionSuccess('새 비밀번호가 일치하지 않습니다')
      setTimeout(() => setActionSuccess(null), 2000)
      return
    }
    if (passwordForm.new.length < 8) {
      setActionSuccess('비밀번호는 8자 이상이어야 합니다')
      setTimeout(() => setActionSuccess(null), 2000)
      return
    }
    setShowPasswordModal(false)
    setPasswordForm({ current: '', new: '', confirm: '' })
    setActionSuccess('비밀번호가 변경되었습니다')
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const handleLogout = () => {
    setShowLogoutModal(false)
    setActionSuccess('로그아웃되었습니다')
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const handleDeleteAccount = () => {
    setShowDeleteModal(false)
    setActionSuccess('계정이 탈퇴 처리되었습니다')
    setTimeout(() => setActionSuccess(null), 2000)
  }

  return (
    <>
      <PartnerHeader title="설정" partnerName={partner.name} />

      {actionSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl text-sm">
          {actionSuccess}
        </div>
      )}

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
                    value={partnerInfo.name}
                    onChange={(e) => setPartnerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">사업자 유형</label>
                  <select
                    value={partnerInfo.type}
                    onChange={(e) => setPartnerInfo(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
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
                  value={partnerInfo.businessNumber}
                  onChange={(e) => setPartnerInfo(prev => ({ ...prev, businessNumber: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">사업장 주소</label>
                <input
                  type="text"
                  value={partnerInfo.address}
                  onChange={(e) => setPartnerInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">담당자명</label>
                  <input
                    type="text"
                    value={partnerInfo.managerName}
                    onChange={(e) => setPartnerInfo(prev => ({ ...prev, managerName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">연락처</label>
                  <input
                    type="tel"
                    value={partnerInfo.phone}
                    onChange={(e) => setPartnerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveInfo}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
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
                    notifications.email ? 'bg-teal-600' : 'bg-gray-200'
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
                    notifications.push ? 'bg-teal-600' : 'bg-gray-200'
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
                    notifications.sms ? 'bg-teal-600' : 'bg-gray-200'
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
                      className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <span className="text-gray-700">재고 부족 알림</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={notifications.orderAlert}
                      onChange={() => setNotifications(prev => ({ ...prev, orderAlert: !prev.orderAlert }))}
                      className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <span className="text-gray-700">주문 상태 변경 알림</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={notifications.settlementAlert}
                      onChange={() => setNotifications(prev => ({ ...prev, settlementAlert: !prev.settlementAlert }))}
                      className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <span className="text-gray-700">정산 완료 알림</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">플랜 정보</h3>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{currentPlan === 'PRO' ? '⭐' : '📦'}</span>
                  <span className="font-bold text-gray-900">{currentPlan === 'PRO' ? 'Pro' : 'Basic'} 플랜</span>
                </div>
                <p className="text-sm text-gray-600">
                  {currentPlan === 'PRO'
                    ? '수수료 10% · 우선 고객 지원 · 마케팅 크레딧'
                    : '수수료 15% · 기본 고객 지원'}
                </p>
              </div>
              <button
                onClick={() => setShowPlanModal(true)}
                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
              >
                플랜 변경
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">계정</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-700">비밀번호 변경</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-700">로그아웃</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
              >
                <span className="text-red-600">계정 탈퇴</span>
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Plan Change Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md mx-4">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">플랜 변경</h2>
              <button
                onClick={() => setShowPlanModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-3">
              <button
                onClick={() => handleChangePlan('BASIC')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                  currentPlan === 'BASIC' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>📦</span>
                  <span className="font-bold text-gray-900">Basic 플랜</span>
                  {currentPlan === 'BASIC' && (
                    <span className="text-xs bg-teal-600 text-white px-2 py-0.5 rounded">현재</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">수수료 15% · 기본 고객 지원</p>
                <p className="text-lg font-semibold text-gray-900 mt-2">무료</p>
              </button>
              <button
                onClick={() => handleChangePlan('PRO')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                  currentPlan === 'PRO' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>⭐</span>
                  <span className="font-bold text-gray-900">Pro 플랜</span>
                  {currentPlan === 'PRO' && (
                    <span className="text-xs bg-teal-600 text-white px-2 py-0.5 rounded">현재</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">수수료 10% · 우선 고객 지원 · 마케팅 크레딧</p>
                <p className="text-lg font-semibold text-gray-900 mt-2">월 29,900원</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md mx-4">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">비밀번호 변경</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
                <input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호 확인</label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors"
              >
                비밀번호 변경
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-sm mx-4">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="font-semibold text-gray-900 mb-2">로그아웃</h2>
              <p className="text-sm text-gray-500 mb-6">정말 로그아웃 하시겠습니까?</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleLogout}
                  className="py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-sm mx-4">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="font-semibold text-gray-900 mb-2">계정 탈퇴</h2>
              <p className="text-sm text-gray-500 mb-2">정말 계정을 탈퇴하시겠습니까?</p>
              <p className="text-sm text-red-500 mb-6">이 작업은 되돌릴 수 없으며, 모든 데이터가 삭제됩니다.</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  탈퇴하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
