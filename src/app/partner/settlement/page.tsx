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
      <PartnerHeader title="정산 내역" partnerName={partner.name} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">이번 달 예상 정산</p>
            <p className="text-2xl font-bold text-gray-900">{pendingAmount.toLocaleString()}원</p>
            <p className="text-xs text-gray-400 mt-1">2월 10일 지급 예정</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">누적 정산 금액</p>
            <p className="text-2xl font-bold text-gray-900">{totalNet.toLocaleString()}원</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">수수료율</p>
            <p className="text-2xl font-bold text-gray-900">10%</p>
            <p className="text-xs text-amber-500 mt-1">Pro 플랜 적용 중</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">정산 계좌</p>
            <p className="text-lg font-bold text-gray-900">신한 ***-***-1234</p>
            <button className="text-xs text-amber-500 mt-1 hover:underline">변경</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">정산 내역</h3>
            <div className="flex items-center gap-3">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="2024">2024년</option>
                <option value="2023">2023년</option>
              </select>
              <button className="flex items-center gap-2 text-amber-500 hover:text-amber-600 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                엑셀 다운로드
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">정산 월</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">매출</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">수수료</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">정산 금액</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">상태</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">지급일</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">상세</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((settlement) => (
                <tr key={settlement.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{settlement.month}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-gray-900">{settlement.sales.toLocaleString()}원</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-red-500">-{settlement.commission.toLocaleString()}원</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-gray-900">{settlement.net.toLocaleString()}원</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      settlement.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {settlement.status === 'completed' ? '지급 완료' : '지급 예정'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">{settlement.paymentDate}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-amber-500 hover:text-amber-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-blue-50 rounded-2xl p-5 border border-blue-100">
          <div className="flex items-start gap-3">
            <span className="text-xl">ℹ️</span>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">정산 안내</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 정산은 매월 10일에 진행됩니다.</li>
                <li>• 정산 금액은 전월 1일~말일까지의 매출에서 수수료를 제외한 금액입니다.</li>
                <li>• Pro 플랜 파트너는 10% 수수료율이 적용됩니다. (일반 15%)</li>
                <li>• 세금계산서는 정산일 기준 5영업일 이내 발행됩니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
