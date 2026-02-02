export type UserType = 'CONSUMER' | 'PARTNER'
export type SubscriptionTier = 'BASIC' | 'PREMIUM'
export type PartnerType = 'BAR' | 'RESTAURANT' | 'PUB' | 'CAFE' | 'HOTEL' | 'OTHER'
export type EquipmentStatus = 'NORMAL' | 'LOW' | 'URGENT'
export type BeerCategory = 'LAGER' | 'PILSNER' | 'WHEAT' | 'IPA' | 'STOUT' | 'ALE' | 'OTHER'
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface User {
  id: string
  email: string
  name: string
  type: UserType
  tasteScore?: number
  subscriptionTier?: SubscriptionTier
}

export interface Partner {
  id: string
  name: string
  type: string
  monthlyBeersSold: number
  monthlyRevenue: number
  customerCount: number
  rating: number
  isPro: boolean
}

export interface Equipment {
  id: string
  name: string
  style?: string
  category: string
  stockLevel: number
  status: EquipmentStatus
  partnerId: string
  lastRefillDate?: Date
}

export interface Product {
  id: string
  name: string
  category: string
  style?: string
  volume: string
  price: number
  abv?: string
  imageUrl?: string
}

export interface PartnerOrder {
  id: string
  partnerId: string
  status: OrderStatus
  totalAmount: number
  estimatedDelivery?: Date
  items: OrderItem[]
  createdAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  product: Product
  quantity: number
  price: number
}

export interface TasteData {
  id: string
  userId: string
  date: Date
  bitterness?: number
  sweetness?: number
  aroma?: number
  body?: number
  tasteScore: number
}

export interface MetricCardData {
  label: string
  value: string | number
  unit?: string
  icon: string
  color: string
}

export interface RecommendationItem {
  id: string
  name: string
  amount: string
  icon?: string
  occasion?: string
  imageUrl?: string
}
