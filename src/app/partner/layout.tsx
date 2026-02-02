import { Sidebar } from '@/components/partner/Sidebar'
import { mockPartner } from '@/data/mockData'

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar partnerName={mockPartner.name} isPro={mockPartner.isPro} />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}
