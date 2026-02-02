import { CharacterAvatar } from '@/components/consumer/CharacterAvatar'
import { DeliveryBanner } from '@/components/consumer/DeliveryBanner'
import { MetricCard } from '@/components/consumer/MetricCard'
import { RecommendationCard } from '@/components/consumer/RecommendationCard'
import { mockDeliveryDate, mockRecommendations, mockTasteData, mockUser } from '@/data/mockData'

export default function ConsumerHomePage() {
  const user = mockUser
  const taste = mockTasteData
  const recommendations = mockRecommendations
  const deliveryDate = mockDeliveryDate

  return (
    <div className="p-4 space-y-4">
      <CharacterAvatar score={user.tasteScore || 0} name={user.name} />

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">취향 분석</h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="쓴맛"
            value={taste.bitterness || 0}
            unit="/10"
          />
          <MetricCard
            label="단맛"
            value={taste.sweetness || 0}
            unit="/10"
          />
          <MetricCard
            label="향"
            value={taste.aroma || 0}
            unit="/10"
          />
          <MetricCard
            label="바디감"
            value={taste.body || 0}
            unit="/10"
          />
        </div>
      </div>

      <RecommendationCard
        recommendations={recommendations}
        message="취향에 맞춘 논알콜 맥주를 추천해드려요"
      />

      <DeliveryBanner deliveryDate={deliveryDate} />
    </div>
  )
}
