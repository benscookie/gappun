import { BottomNav } from '@/components/consumer/BottomNav'
import { ConsumerHeader } from '@/components/consumer/Header'

export default function ConsumerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ConsumerHeader />
      <main className="pb-20 max-w-md mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
