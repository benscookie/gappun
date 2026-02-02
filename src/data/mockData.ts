import { Equipment, Partner, PartnerOrder, Product, RecommendationItem, TasteData, User } from '@/types'

export const mockUser: User = {
  id: 'user-1',
  email: 'minho@example.com',
  name: '민호',
  type: 'CONSUMER',
  tasteScore: 87,
  subscriptionTier: 'PREMIUM',
}

export const mockPartner: Partner = {
  id: 'partner-1',
  name: '크래프트바 홍대점',
  type: 'BAR',
  monthlyBeersSold: 2340,
  monthlyRevenue: 8520000,
  customerCount: 1250,
  rating: 4.7,
  isPro: true,
}

export const mockTasteData: TasteData = {
  id: 'taste-1',
  userId: 'user-1',
  date: new Date(),
  bitterness: 3,
  sweetness: 4,
  aroma: 5,
  body: 3,
  tasteScore: 87,
}

export const mockEquipments: Equipment[] = [
  {
    id: 'eq-1',
    name: '클라우드 제로',
    style: '라거',
    category: 'LAGER',
    stockLevel: 72,
    status: 'NORMAL',
    partnerId: 'partner-1',
  },
  {
    id: 'eq-2',
    name: '하이네켄 0.0',
    style: '필스너',
    category: 'PILSNER',
    stockLevel: 28,
    status: 'LOW',
    partnerId: 'partner-1',
  },
  {
    id: 'eq-3',
    name: '호가든 제로',
    style: '밀맥주',
    category: 'WHEAT',
    stockLevel: 85,
    status: 'NORMAL',
    partnerId: 'partner-1',
  },
  {
    id: 'eq-4',
    name: '버드와이저 제로',
    style: '라거',
    category: 'LAGER',
    stockLevel: 12,
    status: 'URGENT',
    partnerId: 'partner-1',
  },
  {
    id: 'eq-5',
    name: '카스 0.0',
    style: '라거',
    category: 'LAGER',
    stockLevel: 91,
    status: 'NORMAL',
    partnerId: 'partner-1',
  },
  {
    id: 'eq-6',
    name: '기네스 0.0',
    style: '스타우트',
    category: 'STOUT',
    stockLevel: 65,
    status: 'NORMAL',
    partnerId: 'partner-1',
  },
]

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: '클라우드 제로 (24캔)',
    category: 'LAGER',
    style: '라거',
    volume: '355ml x 24',
    price: 45000,
    abv: '0.0%',
  },
  {
    id: 'prod-2',
    name: '하이네켄 0.0 (24캔)',
    category: 'PILSNER',
    style: '필스너',
    volume: '330ml x 24',
    price: 52000,
    abv: '0.0%',
  },
  {
    id: 'prod-3',
    name: '호가든 제로 (24캔)',
    category: 'WHEAT',
    style: '밀맥주',
    volume: '330ml x 24',
    price: 58000,
    abv: '0.0%',
  },
  {
    id: 'prod-4',
    name: '버드와이저 제로 (24캔)',
    category: 'LAGER',
    style: '라거',
    volume: '355ml x 24',
    price: 42000,
    abv: '0.0%',
  },
]

export const mockPartnerOrders: PartnerOrder[] = [
  {
    id: 'order-1',
    partnerId: 'partner-1',
    status: 'SHIPPED',
    totalAmount: 45000,
    estimatedDelivery: new Date('2026-02-13'),
    items: [
      {
        id: 'item-1',
        orderId: 'order-1',
        productId: 'prod-1',
        product: mockProducts[0],
        quantity: 1,
        price: 45000,
      },
    ],
    createdAt: new Date('2026-02-10'),
  },
  {
    id: 'order-2',
    partnerId: 'partner-1',
    status: 'PROCESSING',
    totalAmount: 104000,
    estimatedDelivery: new Date('2026-02-14'),
    items: [
      {
        id: 'item-2',
        orderId: 'order-2',
        productId: 'prod-2',
        product: mockProducts[1],
        quantity: 2,
        price: 104000,
      },
    ],
    createdAt: new Date('2026-02-11'),
  },
  {
    id: 'order-3',
    partnerId: 'partner-1',
    status: 'SHIPPED',
    totalAmount: 58000,
    estimatedDelivery: new Date('2026-02-12'),
    items: [
      {
        id: 'item-3',
        orderId: 'order-3',
        productId: 'prod-3',
        product: mockProducts[2],
        quantity: 1,
        price: 58000,
      },
    ],
    createdAt: new Date('2026-02-08'),
  },
  {
    id: 'order-4',
    partnerId: 'partner-1',
    status: 'DELIVERED',
    totalAmount: 84000,
    estimatedDelivery: new Date('2026-02-15'),
    items: [
      {
        id: 'item-4',
        orderId: 'order-4',
        productId: 'prod-4',
        product: mockProducts[3],
        quantity: 2,
        price: 84000,
      },
    ],
    createdAt: new Date('2026-02-09'),
  },
]

export const mockRecommendations: RecommendationItem[] = [
  {
    id: 'rec-1',
    name: '클라우드 제로',
    amount: '355ml',
    icon: '🍺',
    occasion: '점심 식사',
  },
  {
    id: 'rec-2',
    name: '호가든 제로',
    amount: '330ml',
    icon: '🌾',
    occasion: '저녁 모임',
  },
  {
    id: 'rec-3',
    name: '기네스 0.0',
    amount: '440ml',
    icon: '🖤',
    occasion: '혼술 타임',
  },
]

export const mockDeliveryDate = new Date('2026-02-05')
