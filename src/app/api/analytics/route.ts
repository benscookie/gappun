import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const partnerId = searchParams.get('partnerId')

    if (userId) {
      const tasteData = await prisma.tasteData.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 30,
      })

      const avgScore =
        tasteData.length > 0
          ? tasteData.reduce((sum, d) => sum + d.tasteScore, 0) / tasteData.length
          : 0

      const avgBitterness = tasteData.reduce((sum, d) => sum + (d.bitterness || 0), 0) / (tasteData.length || 1)
      const avgSweetness = tasteData.reduce((sum, d) => sum + (d.sweetness || 0), 0) / (tasteData.length || 1)
      const avgAroma = tasteData.reduce((sum, d) => sum + (d.aroma || 0), 0) / (tasteData.length || 1)
      const avgBody = tasteData.reduce((sum, d) => sum + (d.body || 0), 0) / (tasteData.length || 1)

      return NextResponse.json({
        averageScore: Math.round(avgScore),
        avgBitterness: Math.round(avgBitterness * 10) / 10,
        avgSweetness: Math.round(avgSweetness * 10) / 10,
        avgAroma: Math.round(avgAroma * 10) / 10,
        avgBody: Math.round(avgBody * 10) / 10,
        tastingCount: tasteData.length,
        recentTastings: tasteData.slice(0, 7),
      })
    }

    if (partnerId) {
      const partner = await prisma.partner.findUnique({
        where: { id: partnerId },
        include: {
          equipment: true,
          orders: {
            include: {
              items: true,
            },
            orderBy: { createdAt: 'desc' },
          },
        },
      })

      if (!partner) {
        return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
      }

      const lowStockEquipment = partner.equipment.filter((e) => e.stockLevel <= 40)
      const urgentEquipment = partner.equipment.filter((e) => e.stockLevel <= 20)

      const pendingOrders = partner.orders.filter(
        (o) => o.status === 'PENDING' || o.status === 'PROCESSING'
      )

      return NextResponse.json({
        partner: {
          id: partner.id,
          name: partner.name,
          monthlyBeersSold: partner.monthlyBeersSold,
          monthlyRevenue: partner.monthlyRevenue,
          customerCount: partner.customerCount,
          rating: partner.rating,
        },
        equipment: {
          total: partner.equipment.length,
          lowStock: lowStockEquipment.length,
          urgent: urgentEquipment.length,
          items: partner.equipment,
        },
        orders: {
          pending: pendingOrders.length,
          recent: partner.orders.slice(0, 5),
        },
      })
    }

    return NextResponse.json({ error: 'userId or partnerId required' }, { status: 400 })
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
