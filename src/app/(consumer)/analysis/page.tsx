'use client'

import { mockUser, mockTasteData } from '@/data/mockData'

export default function AnalysisPage() {
  const user = mockUser
  const taste = mockTasteData
  const tasteScore = user.tasteScore ?? 0

  const weeklyData = [
    { day: '월', beers: 2, favorite: '라거' },
    { day: '화', beers: 1, favorite: '필스너' },
    { day: '수', beers: 0, favorite: '-' },
    { day: '목', beers: 3, favorite: '밀맥주' },
    { day: '금', beers: 2, favorite: '라거' },
    { day: '토', beers: 4, favorite: 'IPA' },
    { day: '일', beers: 2, favorite: '스타우트' },
  ]

  const maxBeers = Math.max(...weeklyData.map(d => d.beers))

  const tasteProfile = [
    { name: '쓴맛', value: taste.bitterness || 0, color: 'bg-green-500' },
    { name: '단맛', value: taste.sweetness || 0, color: 'bg-amber-500' },
    { name: '향', value: taste.aroma || 0, color: 'bg-purple-500' },
    { name: '바디감', value: taste.body || 0, color: 'bg-blue-500' },
  ]

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">주간 음용 기록</h2>

        <div className="flex items-end justify-between h-40 gap-2">
          {weeklyData.map((data, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className="w-full flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">{data.beers}잔</span>
                <div
                  className="w-full bg-amber-400 rounded-t-lg transition-all"
                  style={{
                    height: maxBeers > 0 ? `${(data.beers / maxBeers) * 100}px` : '4px',
                    minHeight: data.beers > 0 ? '8px' : '4px',
                    backgroundColor: data.beers === 0 ? '#e5e7eb' : undefined,
                  }}
                />
              </div>
              <span className="text-xs text-gray-600 mt-2 font-medium">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">나의 맥주 취향 점수</h2>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#f59e0b"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(tasteScore / 100) * 352} 352`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{tasteScore}</span>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-4">
          {tasteScore >= 80 ? '맥주 마스터! 다양한 맛을 즐기고 있어요' :
           tasteScore >= 50 ? '좋아요! 새로운 맛에 도전해볼까요?' :
           '취향을 찾아가는 중이에요!'}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">나의 맛 프로필</h2>
        <div className="space-y-4">
          {tasteProfile.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">{item.name}</span>
                <span className="font-medium text-gray-900">{item.value}/5</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all`}
                  style={{ width: `${(item.value / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">이번 주 요약</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-amber-50 rounded-xl">
            <p className="text-2xl font-bold text-amber-600">
              {weeklyData.reduce((sum, d) => sum + d.beers, 0)}잔
            </p>
            <p className="text-sm text-gray-600">총 음용량</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <p className="text-2xl font-bold text-green-600">0.0%</p>
            <p className="text-sm text-gray-600">알코올 섭취</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">
              {weeklyData.filter(d => d.beers > 0).length}일
            </p>
            <p className="text-sm text-gray-600">음용한 날</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-xl">
            <p className="text-2xl font-bold text-purple-600">라거</p>
            <p className="text-sm text-gray-600">최애 스타일</p>
          </div>
        </div>
      </div>
    </div>
  )
}
