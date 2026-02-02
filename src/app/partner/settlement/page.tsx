'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockPartner } from '@/data/mockData'
import { useState } from 'react'

const settlements = [
  { id: '1', month: '2024년 1월', sales: 3800000, commission: 380000, net: 3420000, status: 'pending', paymentDate: '2024-02-10' },
  { id: '2', month: '2023년 12월', sales: 3500000, commission: 350000, net: 3150000, status: 'completed', paymentDate: '2024-01-10' },
  { id: '3', month: '2023년 11월', sales: 3200000, commission: 320000, net: 2880000, status: 'completed', paymentDate: '2023-12-10' },
  { id: '4', month: '2023년 10월', sales: 2900000, commission: 290000, net: 2610000, status: 'completed', paymentDate: '2023-11-10' },
  { id: '5', month: '2023년 9월', sales: 2800000, commission: 280000, net: 2520000, status: 'completed', paymentDate: '2023-10-10' },
]

export default function SettlementPage() {
  const partner = mockPartner
  const [selectedYear, setSelectedYear] = useState('2024')

  const totalNet = settlements.filter(s => s.status === 'completed').reduce((sum, s) => sum + s.net, 0)
  const pendingAmount = settlements.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.net, 0)

  return (
    <>
      <PartnerHeader title="정산" partnerName={partner.name} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">예상 정산</p>
            <p className="text-xl font-semibold text-gray-900">{pendingAmount.toLocaleString()}원</p>
            <p className="text-xs text-gray-400 mt-1">2월 10일 지급</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">누적 정산</p>
            <p className="text-xl font-semibold text-gray-900">{totalNet.toLocaleString()}원</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">수수료율</p>
            <p className="text-xl font-semibold text-gray-900">10%</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">정산 계좌</p>
            <p className="text-sm font-medium text-gray-900">신한 ***-***-1234</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">정산 내역</h3>
            <div className="flex items-center gap-3">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none"
              >
                <option value="2024">2024년</option>
                <option value="2023">2023년</option>
              </select>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                엑셀 다운로드
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">정산월</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">매출</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">수수료</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">정산액</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">상태</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">지급일</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((settlement) => (
                <tr key={settlement.id} className="border-b border-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">{settlement.month}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-gray-900">{settlement.sales.toLocaleString()}원</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-gray-500">-{settlement.commission.toLocaleString()}원</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-medium text-gray-900">{settlement.net.toLocaleString()}원</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded ${
                      settlement.status === 'completed'
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-gray-900 text-white'
                    }`}>
                      {settlement.status === 'completed' ? '완료' : '예정'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm text-gray-500">{settlement.paymentDate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <h4 className="font-medium text-gray-900 mb-2">정산 안내</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>정산은 매월 10일에 진행됩니다.</li>
            <li>정산 금액은 전월 매출에서 수수료를 제외한 금액입니다.</li>
            <li>Pro 플랜 파트너는 10% 수수료율이 적용됩니다.</li>
          </ul>
        </div>
      </main>
    </>
  )
}
