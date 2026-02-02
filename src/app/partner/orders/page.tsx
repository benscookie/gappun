'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockPartner, mockPartnerOrders } from '@/data/mockData'
import { useState } from 'react'

export default function OrdersPage() {
  const partner = mockPartner
  const orders = mockPartnerOrders
  const [filter, setFilter] = useState<'all' | 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED'>('all')

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700'
      case 'PROCESSING': return 'bg-blue-100 text-blue-700'
      case 'SHIPPED': return 'bg-purple-100 text-purple-700'
      case 'DELIVERED': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return '주문 대기'
      case 'PROCESSING': return '처리 중'
      case 'SHIPPED': return '배송 중'
      case 'DELIVERED': return '배송 완료'
      default: return status
    }
  }

  return (
    <>
      <PartnerHeader title="맥주 주문" partnerName={partner.name} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {(['all', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? '전체' : getStatusText(status)}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            새 주문
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">주문번호</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">상품</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">수량</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">금액</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">상태</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">주문일</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">예상 배송일</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">#{order.id.slice(0, 8)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.map(item => item.product.name).join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)}개
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {order.totalAmount.toLocaleString()}원
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {order.estimatedDelivery
                        ? new Date(order.estimatedDelivery).toLocaleDateString('ko-KR')
                        : '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">해당 상태의 주문이 없습니다.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
