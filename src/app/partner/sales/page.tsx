'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockPartner } from '@/data/mockData'
import { useState } from 'react'

const monthlySalesData = [
  { month: '1월', sales: 2400000, beers: 480 },
  { month: '2월', sales: 2800000, beers: 560 },
  { month: '3월', sales: 3200000, beers: 640 },
  { month: '4월', sales: 2900000, beers: 580 },
  { month: '5월', sales: 3500000, beers: 700 },
  { month: '6월', sales: 3800000, beers: 760 },
]

const productSales = [
  { name: '클라우드 제로', sales: 32, revenue: 160000, trend: 15 },
  { name: '하이네켄 0.0', sales: 28, revenue: 168000, trend: 8 },
  { name: '호가든 제로', sales: 24, revenue: 96000, trend: -5 },
  { name: '기네스 0.0', sales: 18, revenue: 126000, trend: 22 },
  { name: '버드와이저 제로', sales: 15, revenue: 75000, trend: 3 },
]

export default function SalesPage() {
  const partner = mockPartner
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month')

  const maxSales = Math.max(...monthlySalesData.map(d => d.sales))

  return (
    <>
      <PartnerHeader title="판매 분석" partnerName={partner.name} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex gap-2 mb-6">
          {(['week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                period === p
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {p === 'week' ? '주간' : p === 'month' ? '월간' : '연간'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">총 매출</p>
            <p className="text-xl font-semibold text-gray-900">
              {(partner.monthlyRevenue).toLocaleString()}원
            </p>
            <p className="text-xs text-gray-500 mt-1">+12%</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">판매량</p>
            <p className="text-xl font-semibold text-gray-900">{partner.monthlyBeersSold}잔</p>
            <p className="text-xs text-gray-500 mt-1">+18%</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">평균 객단가</p>
            <p className="text-xl font-semibold text-gray-900">
              {Math.round(partner.monthlyRevenue / partner.monthlyBeersSold).toLocaleString()}원
            </p>
            <p className="text-xs text-gray-400 mt-1">-3%</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">신규 고객</p>
            <p className="text-xl font-semibold text-gray-900">47명</p>
            <p className="text-xs text-gray-500 mt-1">+24%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white border border-gray-100 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">월별 매출 추이</h3>
            <div className="flex items-end justify-between h-40 gap-4">
              {monthlySalesData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <span className="text-xs text-gray-400 mb-2">
                    {(data.sales / 10000).toFixed(0)}만
                  </span>
                  <div
                    className="w-full bg-gray-900 rounded-t transition-all"
                    style={{ height: `${(data.sales / maxSales) * 120}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">판매 순위</h3>
            <div className="space-y-3">
              {productSales.map((product, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-gray-100 text-gray-600 rounded flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales}잔</p>
                  </div>
                  <span className={`text-xs ${product.trend > 0 ? 'text-gray-600' : 'text-gray-400'}`}>
                    {product.trend > 0 ? '+' : ''}{product.trend}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
