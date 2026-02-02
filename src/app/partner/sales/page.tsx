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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p === 'week' ? '주간' : p === 'month' ? '월간' : '연간'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">총 매출</p>
            <p className="text-2xl font-bold text-gray-900">
              {(partner.monthlyRevenue).toLocaleString()}원
            </p>
            <p className="text-sm text-green-500 flex items-center gap-1 mt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              12% 증가
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">논알콜 맥주 판매</p>
            <p className="text-2xl font-bold text-gray-900">{partner.monthlyBeersSold}잔</p>
            <p className="text-sm text-green-500 flex items-center gap-1 mt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              18% 증가
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">평균 객단가</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(partner.monthlyRevenue / partner.monthlyBeersSold).toLocaleString()}원
            </p>
            <p className="text-sm text-red-500 flex items-center gap-1 mt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              3% 감소
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">신규 고객</p>
            <p className="text-2xl font-bold text-gray-900">47명</p>
            <p className="text-sm text-green-500 flex items-center gap-1 mt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              24% 증가
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">월별 매출 추이</h3>
            <div className="flex items-end justify-between h-48 gap-4">
              {monthlySalesData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <span className="text-xs text-gray-500 mb-2">
                    {(data.sales / 10000).toFixed(0)}만
                  </span>
                  <div
                    className="w-full bg-amber-400 rounded-t-lg transition-all hover:bg-amber-500"
                    style={{ height: `${(data.sales / maxSales) * 160}px` }}
                  />
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">맥주별 판매 순위</h3>
            <div className="space-y-4">
              {productSales.map((product, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales}잔 · {product.revenue.toLocaleString()}원</p>
                  </div>
                  <span className={`text-xs font-medium ${product.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
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
