'use client'

import { mockUser, mockTasteData } from '@/data/mockData'

export default function AnalysisPage() {
  const user = mockUser
  const taste = mockTasteData
  const tasteScore = user.tasteScore ?? 0

  const weeklyData = [
    { day: '월', beers: 2 },
    { day: '화', beers: 1 },
    { day: '수', beers: 0 },
    { day: '목', beers: 3 },
    { day: '금', beers: 2 },
    { day: '토', beers: 4 },
    { day: '일', beers: 2 },
  ]

  const maxBeers = Math.max(...weeklyData.map(d => d.beers))

  const tasteProfile = [
    { name: '쓴맛', value: taste.bitterness || 0 },
    { name: '단맛', value: taste.sweetness || 0 },
    { name: '향', value: taste.aroma || 0 },
    { name: '바디감', value: taste.body || 0 },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">취향 점수</p>
            <p className="text-3xl font-bold text-gray-900">{tasteScore}</p>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#f3f4f6"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#0d9488"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(tasteScore / 100) * 176} 176`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {tasteScore >= 80 ? '다양한 맛을 즐기고 있어요' :
           tasteScore >= 50 ? '새로운 맛에 도전해볼까요?' :
           '취향을 찾아가는 중이에요'}
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <h2 className="text-sm font-medium text-gray-900 mb-4">주간 기록</h2>
        <div className="flex items-end justify-between h-24 gap-2">
          {weeklyData.map((data, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1 gap-1">
              <span className="text-xs text-gray-400">{data.beers}</span>
              <div
                className="w-full bg-gray-900 rounded transition-all"
                style={{
                  height: maxBeers > 0 ? `${(data.beers / maxBeers) * 56}px` : '2px',
                  minHeight: data.beers > 0 ? '4px' : '2px',
                  backgroundColor: data.beers === 0 ? '#e5e7eb' : '#0d9488',
                }}
              />
              <span className="text-xs text-gray-500">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <h2 className="text-sm font-medium text-gray-900 mb-4">맛 프로필</h2>
        <div className="space-y-4">
          {tasteProfile.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">{item.name}</span>
                <span className="text-gray-900">{item.value}/5</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full transition-all"
                  style={{ width: `${(item.value / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <h2 className="text-sm font-medium text-gray-900 mb-4">이번 주 요약</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-xl font-bold text-gray-900">
              {weeklyData.reduce((sum, d) => sum + d.beers, 0)}
            </p>
            <p className="text-xs text-gray-500">총 음용량</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-xl font-bold text-gray-900">0.0%</p>
            <p className="text-xs text-gray-500">알코올 섭취</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-xl font-bold text-gray-900">
              {weeklyData.filter(d => d.beers > 0).length}일
            </p>
            <p className="text-xs text-gray-500">음용한 날</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-xl font-bold text-gray-900">라거</p>
            <p className="text-xs text-gray-500">최애 스타일</p>
          </div>
        </div>
      </div>
    </div>
  )
}
