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

  const generateReport = (type: string) => {
    const today = new Date()
    const dateStr = today.toISOString().split('T')[0]

    let content = ''
    let filename = ''

    switch (type) {
      case '일별 리포트':
        content = `일별 리포트 - ${dateStr}\n\n판매량,매출,주문수\n150,450000,25`
        filename = `일별리포트_${dateStr}.csv`
        break
      case '주별 리포트':
        content = `주별 리포트 - ${dateStr}\n\n주차,판매량,매출,주문수\n1주차,1050,3150000,175\n2주차,980,2940000,163`
        filename = `주별리포트_${dateStr}.csv`
        break
      case '월별 리포트':
        content = `월별 리포트 - ${dateStr}\n\n월,판매량,매출,주문수\n1월,4200,12600000,700\n2월,3800,11400000,633`
        filename = `월별리포트_${dateStr}.csv`
        break
      case '재고 현황':
        content = `재고 현황 - ${dateStr}\n\n상품명,현재고,상태\n클라우드 제로,85%,정상\n하이네켄 0.0,45%,부족\n호가든 제로,15%,긴급`
        filename = `재고현황_${dateStr}.csv`
        break
      case '주문 내역':
        content = `주문 내역 - ${dateStr}\n\n주문번호,상품,수량,금액,상태\nORD-001,클라우드 제로,10,25000,배송완료\nORD-002,하이네켄 0.0,5,16000,배송중`
        filename = `주문내역_${dateStr}.csv`
        break
      default:
        content = `리포트 - ${dateStr}`
        filename = `리포트_${dateStr}.csv`
    }

    return { content, filename }
  }

  const handleDownload = (type: string) => {
    setShowDownloadMenu(false)

    const { content, filename } = generateReport(type)

    // Create and download file
    const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setDownloadSuccess(`${type} 다운로드 완료`)
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
