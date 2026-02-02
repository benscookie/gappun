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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'ended': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '진행 중'
      case 'scheduled': return '예정'
      case 'ended': return '종료'
      default: return status
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'discount': return '🏷️'
      case 'bundle': return '📦'
      case 'event': return '🎉'
      case 'reward': return '🎁'
      default: return '📢'
    }
  }

  return (
    <>
      <PartnerHeader title="공동 마케팅" partnerName={partner.name} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white">
            <p className="text-sm opacity-90 mb-1">진행 중인 캠페인</p>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">총 참여 고객</p>
            <p className="text-2xl font-bold text-gray-900">450명</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">전환율</p>
            <p className="text-2xl font-bold text-gray-900">34.6%</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">마케팅 크레딧</p>
            <p className="text-2xl font-bold text-amber-500">150,000P</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">캠페인 현황</h3>
                <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  새 캠페인
                </button>
              </div>

              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{getTypeIcon(campaign.type)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                          <p className="text-sm text-gray-500">
                            {campaign.startDate} ~ {campaign.endDate}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {getStatusText(campaign.status)}
                      </span>
                    </div>

                    {campaign.status !== 'scheduled' && (
                      <div className="mt-4 flex gap-6">
                        <div>
                          <p className="text-xs text-gray-500">참여자</p>
                          <p className="font-medium text-gray-900">{campaign.participants}명</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">전환</p>
                          <p className="font-medium text-gray-900">{campaign.conversions}명</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">전환율</p>
                          <p className="font-medium text-amber-500">
                            {campaign.participants > 0
                              ? ((campaign.conversions / campaign.participants) * 100).toFixed(1)
                              : 0}%
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">마케팅 자료</h3>
              <div className="space-y-3">
                {marketingAssets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {asset.type === 'print' ? '🖨️' : asset.type === 'digital' ? '📱' : '🎬'}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                        <p className="text-xs text-gray-500">{asset.downloads}회 다운로드</p>
                      </div>
                    </div>
                    <button className="text-amber-500 hover:text-amber-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💡</span>
                <h3 className="font-semibold text-amber-800">마케팅 팁</h3>
              </div>
              <p className="text-sm text-amber-700 mb-3">
                논알콜 맥주는 건강을 중시하는 고객에게 어필하기 좋습니다.
                &quot;맛은 그대로, 알코올은 제로&quot; 메시지를 강조해보세요.
              </p>
              <button className="text-sm text-amber-600 font-medium hover:text-amber-700">
                자세히 보기 →
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
