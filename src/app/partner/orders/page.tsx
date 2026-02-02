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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return '대기'
      case 'PROCESSING': return '처리중'
      case 'SHIPPED': return '배송중'
      case 'DELIVERED': return '완료'
      default: return status
    }
  }

  return (
    <>
      <PartnerHeader title="주문" partnerName={partner.name} />

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

          <button className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm">
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
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50">
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
    </>
  )
}
