'use client'

import Link from 'next/link'
import { useState } from 'react'

export function ConsumerHeader() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, message: '2월 맥주박스가 곧 배송됩니다', time: '1시간 전', read: false },
    { id: 2, message: '새로운 추천 맥주가 있어요', time: '3시간 전', read: false },
    { id: 3, message: '주문이 완료되었습니다', time: '어제', read: true },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <>
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-xl font-bold text-teal-600 tracking-tight">가뿐</span>
        </Link>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu)
              setShowNotifications(false)
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfileMenu(false)
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
            )}
          </button>
        </div>
      </header>

      {/* Profile Menu Dropdown */}
      {showProfileMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowProfileMenu(false)}
          />
          <div className="fixed top-14 right-4 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50">
            <div className="p-3 border-b border-gray-100">
              <p className="font-medium text-gray-900 text-sm">김가뿐</p>
              <p className="text-xs text-gray-500">gappun@email.com</p>
            </div>
            <div className="p-1">
              <Link
                href="/subscription"
                onClick={() => setShowProfileMenu(false)}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                구독 관리
              </Link>
              <Link
                href="/analysis"
                onClick={() => setShowProfileMenu(false)}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                내 분석
              </Link>
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                설정
              </button>
            </div>
            <div className="p-1 border-t border-gray-100">
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg"
              >
                로그아웃
              </button>
            </div>
          </div>
        </>
      )}

      {/* Notifications Dropdown */}
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowNotifications(false)}
          />
          <div className="fixed top-14 right-4 w-72 bg-white border border-gray-100 rounded-xl shadow-lg z-50">
            <div className="p-3 border-b border-gray-100 flex items-center justify-between">
              <p className="font-medium text-gray-900 text-sm">알림</p>
              {unreadCount > 0 && (
                <span className="text-xs text-teal-600">{unreadCount}개 읽지 않음</span>
              )}
            </div>
            <div className="max-h-64 overflow-auto">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-3 border-b border-gray-50 ${!notification.read ? 'bg-teal-50/50' : ''}`}
                >
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
            <div className="p-2">
              <button
                onClick={() => setShowNotifications(false)}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 py-1"
              >
                모두 읽음 처리
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
