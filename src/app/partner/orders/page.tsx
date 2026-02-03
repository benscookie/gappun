'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockPartner, mockPartnerOrders } from '@/data/mockData'
import { useState } from 'react'

interface LocalOrderItem {
  product: {
    id: string
    name: string
    price: number
  }
  quantity: number
}

interface LocalOrder {
  id: string
  partnerId: string
  items: LocalOrderItem[]
  totalAmount: number
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED'
  createdAt: Date
}

const availableProducts = [
  { id: '1', name: '클라우드 제로', price: 2500 },
  { id: '2', name: '하이네켄 0.0', price: 3200 },
  { id: '3', name: '호가든 제로', price: 3500 },
  { id: '4', name: '기네스 0.0', price: 4000 },
  { id: '5', name: '버드와이저 제로', price: 2800 },
]

export default function OrdersPage() {
  const partner = mockPartner
  const [orders, setOrders] = useState<LocalOrder[]>(mockPartnerOrders.map(o => ({
    id: o.id,
    partnerId: o.partnerId,
    items: o.items.map(i => ({
      product: { id: i.product.id, name: i.product.name, price: i.product.price },
      quantity: i.quantity,
    })),
    totalAmount: o.totalAmount,
    status: o.status as 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED',
    createdAt: o.createdAt,
  })))
  const [filter, setFilter] = useState<'all' | 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED'>('all')
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [showOrderDetailModal, setShowOrderDetailModal] = useState<LocalOrder | null>(null)
  const [newOrderItems, setNewOrderItems] = useState<{ productId: string; quantity: number }[]>([])
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter)

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return '대기'
      case 'PROCESSING': return '처리중'
      case 'SHIPPED': return '배송중'
      case 'DELIVERED': return '완료'
      default: return status
    }
  }

  const handleAddProduct = () => {
    setNewOrderItems(prev => [...prev, { productId: availableProducts[0].id, quantity: 1 }])
  }

  const handleRemoveProduct = (index: number) => {
    setNewOrderItems(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpdateProduct = (index: number, field: 'productId' | 'quantity', value: string | number) => {
    setNewOrderItems(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ))
  }

  const calculateTotal = () => {
    return newOrderItems.reduce((sum, item) => {
      const product = availableProducts.find(p => p.id === item.productId)
      return sum + (product?.price || 0) * item.quantity
    }, 0)
  }

  const handleCreateOrder = () => {
    if (newOrderItems.length === 0) return

    const newOrder: LocalOrder = {
      id: `order-${Date.now()}`,
      partnerId: partner.id,
      items: newOrderItems.map(item => {
        const product = availableProducts.find(p => p.id === item.productId)!
        return {
          product: { id: product.id, name: product.name, price: product.price },
          quantity: item.quantity,
        }
      }),
      totalAmount: calculateTotal(),
      status: 'PENDING',
      createdAt: new Date(),
    }

    setOrders(prev => [newOrder, ...prev])
    setNewOrderItems([])
    setShowNewOrderModal(false)
    setActionSuccess('주문이 생성되었습니다')
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const handleUpdateStatus = (orderId: string, newStatus: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED') => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    setShowOrderDetailModal(null)
    setActionSuccess(`주문 상태가 '${getStatusText(newStatus)}'(으)로 변경되었습니다`)
    setTimeout(() => setActionSuccess(null), 2000)
  }

  return (
    <>
      <PartnerHeader title="주문" partnerName={partner.name} />

      {actionSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl text-sm">
          {actionSuccess}
        </div>
      )}

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {(['all', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filter === status
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {status === 'all' ? '전체' : getStatusText(status)}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setNewOrderItems([{ productId: availableProducts[0].id, quantity: 1 }])
              setShowNewOrderModal(true)
            }}
            className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-teal-700 transition-colors"
          >
            새 주문
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">주문번호</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">상품</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">수량</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">금액</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">상태</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">주문일</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">#{order.id.slice(0, 8)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">
                      {order.items.map(item => item.product.name).join(', ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)}개
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">
                      {order.totalAmount.toLocaleString()}원
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.status === 'DELIVERED' ? 'bg-gray-100 text-gray-600' :
                      order.status === 'SHIPPED' ? 'bg-gray-200 text-gray-700' :
                      'bg-gray-900 text-white'
                    }`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setShowOrderDetailModal(order)}
                      className="text-sm text-teal-600 hover:text-teal-700"
                    >
                      상세
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">주문 내역이 없습니다</p>
            </div>
          )}
        </div>
      </main>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">새 주문</h2>
              <button
                onClick={() => setShowNewOrderModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-auto">
              <div className="space-y-3 mb-4">
                {newOrderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <select
                      value={item.productId}
                      onChange={(e) => handleUpdateProduct(index, 'productId', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      {availableProducts.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {product.price.toLocaleString()}원
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateProduct(index, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <button
                      onClick={() => handleRemoveProduct(index)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddProduct}
                className="w-full py-2 border border-dashed border-gray-300 text-gray-500 rounded-xl text-sm hover:border-gray-400 hover:text-gray-600 transition-colors mb-4"
              >
                + 상품 추가
              </button>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">총 금액</span>
                  <span className="text-lg font-semibold text-gray-900">{calculateTotal().toLocaleString()}원</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleCreateOrder}
                disabled={newOrderItems.length === 0}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                주문 생성
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {showOrderDetailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">주문 상세</h2>
              <button
                onClick={() => setShowOrderDetailModal(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">주문번호</p>
                <p className="font-medium text-gray-900">#{showOrderDetailModal.id.slice(0, 8)}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">주문 상품</p>
                <div className="space-y-2">
                  {showOrderDetailModal.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-900">{item.product.name}</span>
                      <span className="text-sm text-gray-600">{item.quantity}개</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">총 금액</p>
                <p className="font-semibold text-gray-900">{showOrderDetailModal.totalAmount.toLocaleString()}원</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">주문 상태</p>
                <div className="flex gap-2">
                  {(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(showOrderDetailModal.id, status)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        showOrderDetailModal.status === status
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {getStatusText(status)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
