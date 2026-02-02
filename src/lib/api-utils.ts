import { NextResponse } from 'next/server'

export type ApiError = {
  error: string
  details?: string
}

export function apiError(message: string, status: number, details?: string): NextResponse<ApiError> {
  return NextResponse.json({ error: message, details }, { status })
}

export function badRequest(message: string, details?: string) {
  return apiError(message, 400, details)
}

export function notFound(message: string) {
  return apiError(message, 404)
}

export function serverError(message: string, error?: unknown) {
  console.error(message, error)
  return apiError(message, 500)
}

export function validateRequired<T>(data: T, fields: (keyof T)[]): string | null {
  for (const field of fields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return `${String(field)} is required`
    }
  }
  return null
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePositiveNumber(value: number): boolean {
  return typeof value === 'number' && value > 0
}

export function validateNonNegativeNumber(value: number): boolean {
  return typeof value === 'number' && value >= 0
}

export function validateRange(value: number, min: number, max: number): boolean {
  return typeof value === 'number' && value >= min && value <= max
}
