'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockPartner } from '@/data/mockData'
import { useState } from 'react'

const customerData = [
  { id: '1', name: '김민수', visits: 24, totalSpent: 156000, lastVisit: '2024-01-15', favoriteBeer: '클라우드 제로' },
  { id: '2', name: '이지은', visits: 18, totalSpent: 122000, lastVisit: '2024-01-14', favoriteBeer: '하이네켄 0.0' },
  { id: '3', name: '박준혁', visits: 32, totalSpent: 245000, lastVisit: '2024-01-15', favoriteBeer: '기네스 0.0' },
  { id: '4', name: '최서연', visits: 15, totalSpent: 89000, lastVisit: '2024-01-12', favoriteBeer: '호가든 제로' },
  { id: '5', name: '정다은', visits: 28, totalSpent: 198000, lastVisit: '2024-01-15', favoriteBeer: '버드와이저 제로' },
  { id: '6', name: '한승우', visits: 21, totalSpent: 134000, lastVisit: '2024-01-13', favoriteBeer: '클라우드 제로' },
  { id: '7', name: '윤하늘', visits: 12, totalSpent: 67000, lastVisit: '2024-01-10', favoriteBeer: '브루독 펑크 AF' },
  { id: '8', name: '강도윤', visits: 45, totalSpent: 312000, lastVisit: '2024-01-15', favoriteBeer: '하이네켄 0.0' },
]

const ageDistribution = [
  { age: '10대', count: 15, percentage: 8 },
  { age: '20대', count: 68, percentage: 36 },
  { age: '30대', count: 72, percentage: 38 },
  { age: '40대', count: 28, percentage: 15 },
  { age: '50대+', count: 6, percentage: 3 },
]

export default function CustomersPage() {
  const partner = mockPartner
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customerData.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <PartnerHeader title="고객" partnerName={partner.name} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">총 고객</p>
            <p className="text-xl font-semibold text-gray-900">{partner.customerCount}명</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">신규 고객</p>
            <p className="text-xl font-semibold text-gray-900">47명</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">재방문율</p>
            <p className="text-xl font-semibold text-gray-900">68%</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">방문 주기</p>
            <p className="text-xl font-semibold text-gray-900">4.2일</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">고객 목록</h3>
              <input
                type="text"
                placeholder="검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-xs font-medium text-gray-500">고객명</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500">방문</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500">구매액</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500">선호 맥주</th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500">마지막 방문</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-50">
                    <td className="py-3">
                      <span className="text-sm text-gray-900">{customer.name}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-gray-600">{customer.visits}회</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-gray-900">{customer.totalSpent.toLocaleString()}원</span>
                    </td>
                    <td className="py-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {customer.favoriteBeer}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-gray-500">{customer.lastVisit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">연령대 분포</h3>
            <div className="space-y-3">
              {ageDistribution.map((item) => (
                <div key={item.age}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.age}</span>
                    <span className="text-gray-900">{item.count}명</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-600 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-900 mb-3">인기 스타일</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">라거 42%</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">밀맥주 28%</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">필스너 18%</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">스타우트 12%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
