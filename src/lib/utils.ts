import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num)
}

export function getStockStatus(level: number): 'NORMAL' | 'LOW' | 'URGENT' {
  if (level <= 20) return 'URGENT'
  if (level <= 40) return 'LOW'
  return 'NORMAL'
}

export function getStatusColor(status: 'NORMAL' | 'LOW' | 'URGENT'): string {
  switch (status) {
    case 'NORMAL':
      return 'bg-green-100 text-green-800'
    case 'LOW':
      return 'bg-orange-100 text-orange-800'
    case 'URGENT':
      return 'bg-red-100 text-red-800'
  }
}

export function getStatusLabel(status: 'NORMAL' | 'LOW' | 'URGENT'): string {
  switch (status) {
    case 'NORMAL':
      return '정상'
    case 'LOW':
      return '주문필요'
    case 'URGENT':
      return '긴급주문'
  }
}

export function getDaysUntil(date: Date): number {
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
