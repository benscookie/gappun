'use client'

interface CharacterAvatarProps {
  score: number
  name: string
}

export function CharacterAvatar({ score, name }: CharacterAvatarProps) {
  const percentile = score >= 90 ? 5 : score >= 80 ? 10 : score >= 70 ? 20 : 30

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-amber-400 to-amber-500 rounded-3xl p-6 text-white">
      <div className="relative mb-4">
        <div className="w-24 h-24 bg-amber-300 rounded-full flex items-center justify-center relative">
          <div className="text-5xl">
            🍺
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs">✦</span>
          </div>
        </div>
      </div>

      <p className="text-sm opacity-90 mb-1">오늘 {name}님의 취향 점수는?</p>

      <div className="text-5xl font-bold mb-2">
        {score}<span className="text-2xl ml-1">점</span>
      </div>

      <div className="bg-amber-600/50 rounded-full px-3 py-1 text-sm flex items-center gap-1">
        <span>🏆</span>
        <span>상위 {percentile}% 맥주 애호가</span>
      </div>
    </div>
  )
}
