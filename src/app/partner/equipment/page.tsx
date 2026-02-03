'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockEquipments, mockPartner } from '@/data/mockData'
import { useState } from 'react'
import { Equipment } from '@/types'

export default function EquipmentPage() {
  const partner = mockPartner
  const [equipment, setEquipment] = useState(mockEquipments)
  const [filter, setFilter] = useState<'all' | 'normal' | 'low' | 'urgent'>('all')
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showUrgentOrderModal, setShowUrgentOrderModal] = useState<Equipment | null>(null)
  const [orderItems, setOrderItems] = useState<{ id: string; quantity: number }[]>([])
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)

  const filteredEquipment = filter === 'all'
    ? equipment
    : equipment.filter(e => e.status.toLowerCase() === filter)

  const getStatusText = (status: string) => {
    switch (status) {
      case 'NORMAL': return '정상'
      case 'LOW': return '부족'
      case 'URGENT': return '긴급'
      default: return status
    }
  }

  const handleOpenOrderModal = () => {
    const lowStockItems = equipment.filter(e => e.status === 'LOW' || e.status === 'URGENT')
    setOrderItems(lowStockItems.map(item => ({ id: item.id, quantity: 10 })))
    setShowOrderModal(true)
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setOrderItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ))
  }

  const handleToggleItem = (id: string) => {
    const exists = orderItems.find(item => item.id === id)
    if (exists) {
      setOrderItems(prev => prev.filter(item => item.id !== id))
    } else {
      setOrderItems(prev => [...prev, { id, quantity: 10 }])
    }
  }

  const handleSubmitOrder = () => {
    // Update stock levels after order
    setEquipment(prev => prev.map(item => {
      const ordered = orderItems.find(o => o.id === item.id)
      if (ordered) {
        const newStockLevel = Math.min(100, item.stockLevel + ordered.quantity * 5)
        return {
          ...item,
          stockLevel: newStockLevel,
          status: newStockLevel > 50 ? 'NORMAL' : newStockLevel > 20 ? 'LOW' : 'URGENT',
          lastRefillDate: new Date(),
        }
      }
      return item
    }))
    setShowOrderModal(false)
    setOrderItems([])
    setActionSuccess(`${orderItems.length}개 품목 주문이 완료되었습니다`)
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const handleUrgentOrder = (item: Equipment) => {
    setShowUrgentOrderModal(item)
  }

  const handleSubmitUrgentOrder = () => {
    if (!showUrgentOrderModal) return

    setEquipment(prev => prev.map(item => {
      if (item.id === showUrgentOrderModal.id) {
        return {
          ...item,
          stockLevel: 100,
          status: 'NORMAL',
          lastRefillDate: new Date(),
        }
      }
      return item
    }))
    setShowUrgentOrderModal(null)
    setActionSuccess(`${showUrgentOrderModal.name} 긴급 주문이 완료되었습니다`)
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const totalOrderAmount = orderItems.reduce((sum, item) => sum + item.quantity * 5000, 0)

  return (
    <>
      <PartnerHeader title="재고 관리" partnerName={partner.name} />

      {actionSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl text-sm">
          {actionSuccess}
        </div>
      )}

      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'normal', 'low', 'urgent'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filter === status
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {status === 'all' ? '전체' : getStatusText(status.toUpperCase())}
                <span className="ml-1.5 text-xs opacity-70">
                  {status === 'all'
                    ? equipment.length
                    : equipment.filter(e => e.status.toLowerCase() === status).length}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handleOpenOrderModal}
            className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-teal-700 transition-colors"
          >
            주문하기
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredEquipment.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.style}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.status === 'URGENT' ? 'bg-gray-900 text-white' :
                  item.status === 'LOW' ? 'bg-gray-200 text-gray-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {getStatusText(item.status)}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">재고량</span>
                  <span className="text-gray-900">{item.stockLevel}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.status === 'URGENT' ? 'bg-red-500' :
                      item.status === 'LOW' ? 'bg-yellow-500' :
                      'bg-teal-600'
                    }`}
                    style={{ width: `${item.stockLevel}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">마지막 입고</span>
                <span className="text-gray-700">
                  {item.lastRefillDate ? new Date(item.lastRefillDate).toLocaleDateString('ko-KR') : '-'}
                </span>
              </div>

              {item.status === 'URGENT' && (
                <button
                  onClick={() => handleUrgentOrder(item)}
                  className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg text-sm hover:bg-teal-700 transition-colors"
                >
                  긴급 주문
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">재고 주문</h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-auto">
              <p className="text-sm text-gray-500 mb-4">주문할 품목을 선택하세요</p>
              <div className="space-y-2">
                {equipment.map((item) => {
                  const orderItem = orderItems.find(o => o.id === item.id)
                  const isSelected = !!orderItem
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border transition-colors ${
                        isSelected ? 'border-teal-500 bg-teal-50' : 'border-gray-100 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleItem(item.id)}
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">현재 재고: {item.stockLevel}%</p>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, (orderItem?.quantity || 10) - 5)}
                              className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-600"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm">{orderItem?.quantity || 10}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, (orderItem?.quantity || 10) + 5)}
                              className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-600"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500">총 주문 금액</span>
                <span className="text-lg font-semibold text-gray-900">{totalOrderAmount.toLocaleString()}원</span>
              </div>
              <button
                onClick={handleSubmitOrder}
                disabled={orderItems.length === 0}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                주문하기 ({orderItems.length}개 품목)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Urgent Order Modal */}
      {showUrgentOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-sm mx-4">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">긴급 주문</h2>
              <button
                onClick={() => setShowUrgentOrderModal(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="bg-red-50 p-4 rounded-xl mb-4">
                <p className="font-medium text-gray-900 mb-1">{showUrgentOrderModal.name}</p>
                <p className="text-sm text-red-600">현재 재고: {showUrgentOrderModal.stockLevel}% (긴급)</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                긴급 주문 시 익일 배송으로 재고가 100%로 충전됩니다.
                추가 배송비 5,000원이 발생합니다.
              </p>
              <div className="bg-gray-50 p-3 rounded-xl mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">예상 금액</span>
                  <span className="font-medium text-gray-900">55,000원</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleSubmitUrgentOrder}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors"
              >
                긴급 주문 확정
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
