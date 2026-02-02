'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-orange-100 text-orange-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: 'NORMAL' | 'LOW' | 'URGENT' }) {
  const config = {
    NORMAL: { variant: 'success' as const, label: '정상' },
    LOW: { variant: 'warning' as const, label: '주문필요' },
    URGENT: { variant: 'error' as const, label: '긴급주문' },
  }

  const { variant, label } = config[status]

  return <Badge variant={variant}>{label}</Badge>
}

export function OrderStatusBadge({ status }: { status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' }) {
  const config = {
    PENDING: { variant: 'default' as const, label: '대기중' },
    PROCESSING: { variant: 'warning' as const, label: '처리중' },
    SHIPPED: { variant: 'info' as const, label: '배송중' },
    DELIVERED: { variant: 'success' as const, label: '배송완료' },
    CANCELLED: { variant: 'error' as const, label: '취소됨' },
  }

  const { variant, label } = config[status]

  return <Badge variant={variant}>{label}</Badge>
}
