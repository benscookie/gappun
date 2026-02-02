'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockPartner } from '@/data/mockData'

const campaigns = [
  {
    id: '1',
    title: '신규 고객 첫 잔 20% 할인',
    status: 'active',
    type: 'discount',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    participants: 127,
    conversions: 45,
  },
  {
    id: '2',
    title: '논알콜 맥주 2+1 프로모션',
    status: 'active',
    type: 'bundle',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    participants: 89,
    conversions: 32,
  },
  {
    id: '3',
    title: '맥주 테이스팅 이벤트',
    status: 'scheduled',
    type: 'event',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    participants: 0,
    conversions: 0,
  },
  {
    id: '4',
    title: '리뷰 작성 포인트 지급',
    status: 'ended',
    type: 'reward',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    participants: 234,
    conversions: 156,
  },
]

const marketingAssets = [
  { id: '1', name: '매장 POP 배너', type: 'print', downloads: 45 },
  { id: '2', name: 'SNS 홍보 이미지', type: 'digital', downloads: 128 },
  { id: '3', name: '논알콜 맥주 카탈로그', type: 'print', downloads: 67 },
  { id: '4', name: '맥주 소개 영상', type: 'video', downloads: 89 },
]

export default function MarketingPage() {
  const partner = mockPartner

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '진행중'
      case 'scheduled': return '예정'
      case 'ended': return '종료'
      default: return status
    }
  }

  return (
    <>
      <PartnerHeader title="마케팅" partnerName={partner.name} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 rounded-xl p-4 text-white">
            <p className="text-sm opacity-70 mb-1">진행중 캠페인</p>
            <p className="text-2xl font-semibold">2</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">총 참여</p>
            <p className="text-xl font-semibold text-gray-900">450명</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">전환율</p>
            <p className="text-xl font-semibold text-gray-900">34.6%</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">크레딧</p>
            <p className="text-xl font-semibold text-gray-900">150,000P</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">캠페인</h3>
                <button className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm">
                  새 캠페인
                </button>
              </div>

              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        campaign.status === 'active' ? 'bg-gray-900 text-white' :
                        campaign.status === 'scheduled' ? 'bg-gray-200 text-gray-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {getStatusText(campaign.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      {campaign.startDate} ~ {campaign.endDate}
                    </p>

                    {campaign.status !== 'scheduled' && (
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-gray-500">참여 </span>
                          <span className="text-gray-900">{campaign.participants}명</span>
                        </div>
                        <div>
                          <span className="text-gray-500">전환 </span>
                          <span className="text-gray-900">{campaign.conversions}명</span>
                        </div>
                        <div>
                          <span className="text-gray-500">전환율 </span>
                          <span className="text-gray-900">
                            {campaign.participants > 0
                              ? ((campaign.conversions / campaign.participants) * 100).toFixed(1)
                              : 0}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4">마케팅 자료</h3>
              <div className="space-y-2">
                {marketingAssets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">{asset.name}</p>
                      <p className="text-xs text-gray-500">{asset.downloads}회 다운로드</p>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="font-medium text-gray-900 mb-2">마케팅 팁</h3>
              <p className="text-sm text-gray-600">
                논알콜 맥주는 건강을 중시하는 고객에게 어필하기 좋습니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
