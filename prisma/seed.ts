import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create user
  const user = await prisma.user.upsert({
    where: { email: 'minho@example.com' },
    update: {},
    create: {
      email: 'minho@example.com',
      name: '민호',
      type: 'CONSUMER',
      tasteScore: 87,
      subscriptionTier: 'PREMIUM',
    },
  })

  // Create taste data
  await prisma.tasteData.create({
    data: {
      userId: user.id,
      bitterness: 3,
      sweetness: 4,
      aroma: 5,
      body: 3,
      tasteScore: 87,
    },
  })

  // Create partner
  const partner = await prisma.partner.upsert({
    where: { id: 'partner-1' },
    update: {},
    create: {
      id: 'partner-1',
      name: '크래프트바 홍대점',
      type: 'BAR',
      monthlyBeersSold: 2340,
      monthlyRevenue: 8520000,
      customerCount: 1250,
      rating: 4.7,
      isPro: true,
    },
  })

  // Create equipment (beer inventory)
  const equipmentData = [
    { name: '클라우드 제로', style: '라거', category: 'LAGER', stockLevel: 72, status: 'NORMAL' as const },
    { name: '하이네켄 0.0', style: '필스너', category: 'PILSNER', stockLevel: 28, status: 'LOW' as const },
    { name: '호가든 제로', style: '밀맥주', category: 'WHEAT', stockLevel: 85, status: 'NORMAL' as const },
    { name: '버드와이저 제로', style: '라거', category: 'LAGER', stockLevel: 12, status: 'URGENT' as const },
    { name: '카스 0.0', style: '라거', category: 'LAGER', stockLevel: 91, status: 'NORMAL' as const },
    { name: '기네스 0.0', style: '스타우트', category: 'STOUT', stockLevel: 65, status: 'NORMAL' as const },
  ]

  for (const eq of equipmentData) {
    await prisma.equipment.create({
      data: {
        ...eq,
        partnerId: partner.id,
      },
    })
  }

  // Create products (beer products)
  const productsData = [
    { name: '클라우드 제로 (24캔)', category: 'LAGER', style: '라거', volume: '355ml x 24', price: 45000, abv: '0.0%' },
    { name: '하이네켄 0.0 (24캔)', category: 'PILSNER', style: '필스너', volume: '330ml x 24', price: 52000, abv: '0.0%' },
    { name: '호가든 제로 (24캔)', category: 'WHEAT', style: '밀맥주', volume: '330ml x 24', price: 58000, abv: '0.0%' },
    { name: '버드와이저 제로 (24캔)', category: 'LAGER', style: '라거', volume: '355ml x 24', price: 42000, abv: '0.0%' },
  ]

  const products = []
  for (const prod of productsData) {
    const product = await prisma.product.create({ data: prod })
    products.push(product)
  }

  // Create orders (using updated OrderStatus enum values)
  const ordersData = [
    { productIndex: 0, status: 'SHIPPED' as const, daysAgo: 2, deliveryDays: 3 },
    { productIndex: 1, status: 'PROCESSING' as const, daysAgo: 1, deliveryDays: 4 },
    { productIndex: 2, status: 'SHIPPED' as const, daysAgo: 4, deliveryDays: 2 },
    { productIndex: 3, status: 'DELIVERED' as const, daysAgo: 3, deliveryDays: 5 },
  ]

  for (const orderData of ordersData) {
    const product = products[orderData.productIndex]
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - orderData.daysAgo)

    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + orderData.deliveryDays)

    await prisma.partnerOrder.create({
      data: {
        partnerId: partner.id,
        status: orderData.status,
        totalAmount: product.price,
        createdAt,
        estimatedDelivery,
        items: {
          create: {
            productId: product.id,
            quantity: 1,
            price: product.price,
          },
        },
      },
    })
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
