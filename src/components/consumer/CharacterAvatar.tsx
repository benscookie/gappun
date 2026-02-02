'use client'

interface CharacterAvatarProps {
  score: number
  name: string
}

export function CharacterAvatar({ score, name }: CharacterAvatarProps) {
  const percentile = score >= 90 ? 5 : score >= 80 ? 10 : score >= 70 ? 20 : 30

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">안녕하세요, {name}님</p>
          <h2 className="text-lg font-semibold text-gray-900">나의 취향 점수</h2>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{score}</div>
          <p className="text-xs text-gray-500">상위 {percentile}%</p>
        </div>
      </div>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-900 rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
