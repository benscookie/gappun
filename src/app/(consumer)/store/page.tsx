'use client'

import { useState } from 'react'

interface Beer {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  abv: string
  badge?: string
}

const beers: Beer[] = [
  {
    id: '1',
    name: '클라우드 제로',
    description: '청량한 라거 스타일의 논알콜 맥주',
    price: 2500,
    originalPrice: 3000,
    image: '🍺',
    category: 'LAGER',
    abv: '0.0%',
    badge: '베스트',
  },
  {
    id: '2',
    name: '하이네켄 0.0',
    description: '프리미엄 필스너 스타일',
    price: 3200,
    image: '🍻',
    category: 'PILSNER',
    abv: '0.0%',
  },
  {
    id: '3',
    name: '호가든 제로',
    description: '상큼한 오렌지 향의 밀맥주',
    price: 3500,
    originalPrice: 4000,
    image: '🌾',
    category: 'WHEAT',
    abv: '0.0%',
    badge: '할인',
  },
  {
    id: '4',
    name: '기네스 0.0',
    description: '깊고 풍부한 스타우트',
    price: 4000,
    image: '🖤',
    category: 'STOUT',
    abv: '0.0%',
  },
  {
    id: '5',
    name: '버드와이저 제로',
    description: '가볍고 깔끔한 아메리칸 라거',
    price: 2800,
    image: '🏈',
    category: 'LAGER',
    abv: '0.0%',
  },
  {
    id: '6',
    name: '브루독 펑크 AF',
    description: '홉의 풍미가 살아있는 IPA 스타일',
    price: 4500,
    originalPrice: 5000,
    image: '🧡',
    category: 'IPA',
    abv: '0.5%',
    badge: 'NEW',
  },
]

const categories = ['전체', 'LAGER', 'PILSNER', 'WHEAT', 'STOUT', 'IPA', 'ALE']

const categoryLabels: Record<string, string> = {
  '전체': '전체',
  'LAGER': '라거',
  'PILSNER': '필스너',
  'WHEAT': '밀맥주',
  'STOUT': '스타우트',
  'IPA': 'IPA',
  'ALE': '에일',
}

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([])

  const filteredBeers = selectedCategory === '전체'
    ? beers
    : beers.filter(b => b.category === selectedCategory)

  const addToCart = (beerId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === beerId)
      if (existing) {
        return prev.map(item =>
          item.id === beerId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id: beerId, quantity: 1 }]
    })
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">논알콜 맥주 스토어</h1>
        <button className="relative p-2">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredBeers.map(beer => (
          <div key={beer.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="relative">
              <div className="text-5xl text-center py-4">{beer.image}</div>
              {beer.badge && (
                <span className={`absolute top-0 right-0 px-2 py-1 rounded-full text-xs font-medium ${
                  beer.badge === '베스트' ? 'bg-amber-100 text-amber-600' :
                  beer.badge === '할인' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {beer.badge}
                </span>
              )}
            </div>
            <h3 className="font-medium text-gray-900 mt-2">{beer.name}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{beer.description}</p>
            <p className="text-xs text-amber-600 mt-1">도수: {beer.abv}</p>
            <div className="mt-3 flex items-center justify-between">
              <div>
                {beer.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {beer.originalPrice.toLocaleString()}원
                  </span>
                )}
                <p className="font-bold text-gray-900">{beer.price.toLocaleString()}원</p>
              </div>
              <button
                onClick={() => addToCart(beer.id)}
                className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
