'use client'

import { PartnerHeader } from '@/components/partner/Header'
import { mockPartner } from '@/data/mockData'
import { useState } from 'react'

interface Campaign {
  id: string
  title: string
  status: 'active' | 'scheduled' | 'ended'
  type: string
  startDate: string
  endDate: string
  participants: number
  conversions: number
}

const initialCampaigns: Campaign[] = [
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

const campaignTypes = [
  { value: 'discount', label: '할인' },
  { value: 'bundle', label: '번들' },
  { value: 'event', label: '이벤트' },
  { value: 'reward', label: '리워드' },
]

export default function MarketingPage() {
  const partner = mockPartner
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false)
  const [showCampaignDetailModal, setShowCampaignDetailModal] = useState<Campaign | null>(null)
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null)

  const [newCampaign, setNewCampaign] = useState({
    title: '',
    type: 'discount',
    startDate: '',
    endDate: '',
  })

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '진행중'
      case 'scheduled': return '예정'
      case 'ended': return '종료'
      default: return status
    }
  }

  const getTypeText = (type: string) => {
    return campaignTypes.find(t => t.value === type)?.label || type
  }

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length
  const totalParticipants = campaigns.reduce((sum, c) => sum + c.participants, 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
  const conversionRate = totalParticipants > 0 ? ((totalConversions / totalParticipants) * 100).toFixed(1) : '0'

  const handleCreateCampaign = () => {
    if (!newCampaign.title || !newCampaign.startDate || !newCampaign.endDate) return

    const campaign: Campaign = {
      id: `campaign-${Date.now()}`,
      title: newCampaign.title,
      status: new Date(newCampaign.startDate) > new Date() ? 'scheduled' : 'active',
      type: newCampaign.type,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      participants: 0,
      conversions: 0,
    }

    setCampaigns(prev => [campaign, ...prev])
    setNewCampaign({ title: '', type: 'discount', startDate: '', endDate: '' })
    setShowNewCampaignModal(false)
    setActionSuccess('캠페인이 생성되었습니다')
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const handleEndCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(c =>
      c.id === campaignId ? { ...c, status: 'ended' as const } : c
    ))
    setShowCampaignDetailModal(null)
    setActionSuccess('캠페인이 종료되었습니다')
    setTimeout(() => setActionSuccess(null), 2000)
  }

  const handleDownloadAsset = (assetName: string) => {
    setDownloadSuccess(`${assetName} 다운로드 시작`)
    setTimeout(() => setDownloadSuccess(null), 2000)
  }

  return (
    <>
      <PartnerHeader title="마케팅" partnerName={partner.name} />

      {actionSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl text-sm">
          {actionSuccess}
        </div>
      )}

      {downloadSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-teal-600 text-white px-4 py-3 rounded-xl text-sm">
          {downloadSuccess}
        </div>
      )}

      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-teal-600 rounded-xl p-4 text-white">
            <p className="text-sm opacity-70 mb-1">진행중 캠페인</p>
            <p className="text-2xl font-semibold">{activeCampaigns}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">총 참여</p>
            <p className="text-xl font-semibold text-gray-900">{totalParticipants}명</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">전환율</p>
            <p className="text-xl font-semibold text-gray-900">{conversionRate}%</p>
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
                <button
                  onClick={() => setShowNewCampaignModal(true)}
                  className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-teal-700 transition-colors"
                >
                  새 캠페인
                </button>
              </div>

              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <button
                    key={campaign.id}
                    onClick={() => setShowCampaignDetailModal(campaign)}
                    className="w-full text-left border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        campaign.status === 'active' ? 'bg-teal-600 text-white' :
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
                  </button>
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
                    <button
                      onClick={() => handleDownloadAsset(asset.name)}
                      className="text-gray-500 hover:text-teal-600 transition-colors"
                    >
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

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md mx-4">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">새 캠페인</h2>
              <button
                onClick={() => setShowNewCampaignModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">캠페인 이름</label>
                <input
                  type="text"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="예: 신규 고객 할인"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">캠페인 유형</label>
                <select
                  value={newCampaign.type}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  {campaignTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">시작일</label>
                  <input
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">종료일</label>
                  <input
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleCreateCampaign}
                disabled={!newCampaign.title || !newCampaign.startDate || !newCampaign.endDate}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                캠페인 생성
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Detail Modal */}
      {showCampaignDetailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md mx-4">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">캠페인 상세</h2>
              <button
                onClick={() => setShowCampaignDetailModal(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{showCampaignDetailModal.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    showCampaignDetailModal.status === 'active' ? 'bg-teal-600 text-white' :
                    showCampaignDetailModal.status === 'scheduled' ? 'bg-gray-200 text-gray-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {getStatusText(showCampaignDetailModal.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {getTypeText(showCampaignDetailModal.type)} · {showCampaignDetailModal.startDate} ~ {showCampaignDetailModal.endDate}
                </p>
              </div>

              {showCampaignDetailModal.status !== 'scheduled' && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">참여</p>
                    <p className="font-semibold text-gray-900">{showCampaignDetailModal.participants}명</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">전환</p>
                    <p className="font-semibold text-gray-900">{showCampaignDetailModal.conversions}명</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">전환율</p>
                    <p className="font-semibold text-gray-900">
                      {showCampaignDetailModal.participants > 0
                        ? ((showCampaignDetailModal.conversions / showCampaignDetailModal.participants) * 100).toFixed(1)
                        : 0}%
                    </p>
                  </div>
                </div>
              )}

              {showCampaignDetailModal.status === 'active' && (
                <button
                  onClick={() => handleEndCampaign(showCampaignDetailModal.id)}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  캠페인 종료
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
