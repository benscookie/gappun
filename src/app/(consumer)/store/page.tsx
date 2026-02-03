'use client'

import { useState } from 'react'

interface Beer {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  abv: string
  isNew?: boolean
}

const beers: Beer[] = [
  {
    id: '1',
    name: '클라우드 제로',
    description: '청량한 라거 스타일의 논알콜 맥주',
    price: 2500,
    originalPrice: 3000,
    category: 'LAGER',
    abv: '0.0%',
  },
  {
    id: '2',
    name: '하이네켄 0.0',
    description: '프리미엄 필스너 스타일',
    price: 3200,
    category: 'PILSNER',
    abv: '0.0%',
  },
  {
    id: '3',
    name: '호가든 제로',
    description: '상큼한 오렌지 향의 밀맥주',
    price: 3500,
    originalPrice: 4000,
    category: 'WHEAT',
    abv: '0.0%',
  },
  {
    id: '4',
    name: '기네스 0.0',
    description: '깊고 풍부한 스타우트',
    price: 4000,
    category: 'STOUT',
    abv: '0.0%',
  },
  {
    id: '5',
    name: '버드와이저 제로',
    description: '가볍고 깔끔한 아메리칸 라거',
    price: 2800,
    category: 'LAGER',
    abv: '0.0%',
  },
  {
    id: '6',
    name: '브루독 펑크 AF',
    description: '홉의 풍미가 살아있는 IPA 스타일',
    price: 4500,
    originalPrice: 5000,
    category: 'IPA',
    abv: '0.5%',
    isNew: true,
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
  const [showCart, setShowCart] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

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

  const removeFromCart = (beerId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === beerId)
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === beerId ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
      return prev.filter(item => item.id !== beerId)
    })
  }

  const deleteFromCart = (beerId: string) => {
    setCart(prev => prev.filter(item => item.id !== beerId))
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => {
    const beer = beers.find(b => b.id === item.id)
    return sum + (beer?.price || 0) * item.quantity
  }, 0)

  const handleOrder = () => {
    setOrderComplete(true)
    setTimeout(() => {
      setOrderComplete(false)
      setShowCart(false)
      setCart([])
    }, 2000)
  }

  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">스토어</h1>
        <button
          className="relative p-2"
          onClick={() => setShowCart(true)}
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-teal-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredBeers.map(beer => {
          const cartItem = cart.find(item => item.id === beer.id)
          return (
            <div key={beer.id} className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="relative mb-3">
                <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300 text-sm">이미지</span>
                </div>
                {beer.isNew && (
                  <span className="absolute top-2 left-2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded">
                    NEW
                  </span>
                )}
                {beer.originalPrice && (
                  <span className="absolute top-2 right-2 bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded">
                    {Math.round((1 - beer.price / beer.originalPrice) * 100)}%
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-0.5">{beer.abv}</p>
              <h3 className="font-medium text-gray-900 text-sm">{beer.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{beer.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  {beer.originalPrice && (
                    <span className="text-xs text-gray-400 line-through mr-1">
                      {beer.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="font-semibold text-gray-900">{beer.price.toLocaleString()}원</span>
                </div>
                {cartItem ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => removeFromCart(beer.id)}
                      className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-5 text-center text-sm font-medium">{cartItem.quantity}</span>
                    <button
                      onClick={() => addToCart(beer.id)}
                      className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(beer.id)}
                    className="w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Cart Bottom Bar */}
      {cartCount > 0 && !showCart && (
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100">
          <button
            onClick={() => setShowCart(true)}
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors"
          >
            <span>장바구니 보기</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
              {cartTotal.toLocaleString()}원
            </span>
          </button>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">장바구니</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {orderComplete ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-900">주문이 완료되었습니다</p>
                <p className="text-sm text-gray-500 mt-1">배송 정보는 마이페이지에서 확인하세요</p>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12">
                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-500">장바구니가 비어있습니다</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto p-4 space-y-3">
                  {cart.map(item => {
                    const beer = beers.find(b => b.id === item.id)
                    if (!beer) return null
                    return (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-300 text-xs">이미지</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">{beer.name}</p>
                          <p className="text-sm text-gray-500">{beer.price.toLocaleString()}원</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-7 h-7 bg-white border border-gray-200 text-gray-600 rounded-full flex items-center justify-center"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item.id)}
                            className="w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => deleteFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )
                  })}
                </div>

                <div className="p-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">총 {cartCount}개</span>
                    <span className="text-lg font-semibold text-gray-900">{cartTotal.toLocaleString()}원</span>
                  </div>
                  <button
                    onClick={handleOrder}
                    className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors"
                  >
                    주문하기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
