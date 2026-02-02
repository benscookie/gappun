import { badRequest, serverError, validateEmail, validateRange, validateRequired } from '@/lib/api-utils'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        tasteData: {
          orderBy: { date: 'desc' },
          take: 1,
        },
      },
    })
    return NextResponse.json(users)
  } catch (error) {
    return serverError('Failed to fetch users', error)
  }
}

interface CreateUserBody {
  email: string
  name: string
  type?: 'CONSUMER' | 'PARTNER'
  tasteScore?: number
  subscriptionTier?: 'BASIC' | 'PREMIUM'
}

export async function POST(request: Request) {
  try {
    const body: CreateUserBody = await request.json()

    const requiredError = validateRequired(body, ['email', 'name'])
    if (requiredError) {
      return badRequest(requiredError)
    }

    if (!validateEmail(body.email)) {
      return badRequest('Invalid email format')
    }

    if (body.tasteScore !== undefined && !validateRange(body.tasteScore, 0, 100)) {
      return badRequest('Taste score must be between 0 and 100')
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })
    if (existingUser) {
      return badRequest('User with this email already exists')
    }

    const validTypes = ['CONSUMER', 'PARTNER']
    if (body.type && !validTypes.includes(body.type)) {
      return badRequest(`Type must be one of: ${validTypes.join(', ')}`)
    }

    const validTiers = ['BASIC', 'PREMIUM']
    if (body.subscriptionTier && !validTiers.includes(body.subscriptionTier)) {
      return badRequest(`Subscription tier must be one of: ${validTiers.join(', ')}`)
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        type: body.type || 'CONSUMER',
        tasteScore: body.tasteScore,
        subscriptionTier: body.subscriptionTier,
      },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return serverError('Failed to create user', error)
  }
}
