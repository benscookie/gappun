'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PartnerHeaderProps {
  title: string
  partnerName: string
  date?: Date
}

export function PartnerHeader({ title, partnerName, date = new Date() }: PartnerHeaderProps) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null)

  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleDownload = (type: string) => {
    setShowDownloadMenu(false)
    setDownloadSuccess(`${type} 다운로드가 시작되었습니다`)
    setTimeout(() => setDownloadSuccess(null), 2000)
  }

  return (
    <>
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1"
              >
                다운로드
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showDownloadMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDownloadMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-1">
                    <button
                      onClick={() => handleDownload('일별 리포트')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      일별 리포트
                    </button>
                    <button
                      onClick={() => handleDownload('주별 리포트')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      주별 리포트
                    </button>
                    <button
                      onClick={() => handleDownload('월별 리포트')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      월별 리포트
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={() => handleDownload('재고 현황')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      재고 현황
                    </button>
                    <button
                      onClick={() => handleDownload('주문 내역')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      주문 내역
                    </button>
                  </div>
                </>
              )}
            </div>
            <Link
              href="/partner/orders"
              className="px-3 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              주문하기
            </Link>
          </div>
        </div>
      </header>

      {downloadSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl text-sm">
          {downloadSuccess}
        </div>
      )}
    </>
  )
}
