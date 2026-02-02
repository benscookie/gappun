'use client'

interface PartnerHeaderProps {
  title: string
  partnerName: string
  date?: Date
}

export function PartnerHeader({ title, partnerName, date = new Date() }: PartnerHeaderProps) {
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            다운로드
          </button>
          <button className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            주문하기
          </button>
        </div>
      </div>
    </header>
  )
}
