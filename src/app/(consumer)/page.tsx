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

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="쓴맛"
          value={taste.bitterness || 0}
          unit="점"
          icon="hop"
          color="green"
        />
        <MetricCard
          label="단맛"
          value={taste.sweetness || 0}
          unit="점"
          icon="honey"
          color="amber"
        />
        <MetricCard
          label="향"
          value={taste.aroma || 0}
          unit="점"
          icon="nose"
          color="purple"
        />
        <MetricCard
          label="바디감"
          value={taste.body || 0}
          unit="점"
          icon="glass"
          color="blue"
        />
      </div>

      <RecommendationCard
        recommendations={recommendations}
        message="오늘의 기분에 딱 맞는 논알콜 맥주예요!"
      />

      <DeliveryBanner deliveryDate={deliveryDate} />
    </div>
  )
}
