import { EquipmentGrid } from '@/components/partner/EquipmentStatusCard'
import { PartnerHeader } from '@/components/partner/Header'
import { OrderStatusList } from '@/components/partner/OrderStatusList'
import { StatsCard } from '@/components/partner/StatsCard'
import { mockEquipments, mockPartner, mockPartnerOrders } from '@/data/mockData'

export default function PartnerDashboardPage() {
  const partner = mockPartner
  const equipment = mockEquipments
  const orders = mockPartnerOrders

  return (
    <>
      <PartnerHeader
        title="파트너 대시보드"
        partnerName={partner.name}
      />

      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="이번 달 맥주 판매량"
            value={partner.monthlyBeersSold}
            unit="잔"
            change={18}
            icon="beer"
          />
          <StatsCard
            title="이번 달 매출"
            value={partner.monthlyRevenue}
            change={12}
            icon="won"
            format="currency"
          />
          <StatsCard
            title="방문 고객 수"
            value={partner.customerCount}
            unit="명"
            change={24}
            icon="users"
          />
          <StatsCard
            title="고객 만족도"
            value={partner.rating}
            unit="점"
            change={0.2}
            icon="star"
            format="decimal"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <EquipmentGrid equipment={equipment} />
          </div>
          <div>
            <OrderStatusList orders={orders} />
          </div>
        </div>
      </main>
    </>
  )
}
