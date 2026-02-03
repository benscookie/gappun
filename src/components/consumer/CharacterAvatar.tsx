'use client'

interface CharacterAvatarProps {
  score: number
  name: string
}

export function CharacterAvatar({ score, name }: CharacterAvatarProps) {
  const percentile = score >= 90 ? 5 : score >= 80 ? 10 : score >= 70 ? 20 : 30

  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
      <p className="text-sm opacity-80 mb-1">안녕하세요, {name}님</p>
      <h2 className="text-lg font-semibold mb-4">나의 취향 점수</h2>

      <div className="flex items-end justify-between">
        <div>
          <span className="text-5xl font-bold">{score}</span>
          <span className="text-lg ml-1">점</span>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-80">상위 {percentile}%</p>
        </div>
      </div>

      <div className="mt-4 h-1.5 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
