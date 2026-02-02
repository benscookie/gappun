import { badRequest, serverError, validateNonNegativeNumber, validateRange, validateRequired } from '@/lib/api-utils'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      include: {
        equipment: true,
        orders: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    })
    return NextResponse.json(partners)
  } catch (error) {
    return serverError('Failed to fetch partners', error)
  }
}

interface CreatePartnerBody {
  name: string
  type: string
  monthlyBeersSold?: number
  monthlyRevenue?: number
  customerCount?: number
  rating?: number
  isPro?: boolean
}

const validPartnerTypes = ['BAR', 'RESTAURANT', 'PUB', 'CAFE', 'HOTEL', 'OTHER']

export async function POST(request: Request) {
  try {
    const body: CreatePartnerBody = await request.json()

    const requiredError = validateRequired(body, ['name', 'type'])
    if (requiredError) {
      return badRequest(requiredError)
    }

    if (!validPartnerTypes.includes(body.type)) {
      return badRequest(`Type must be one of: ${validPartnerTypes.join(', ')}`)
    }

    if (body.monthlyBeersSold !== undefined && !validateNonNegativeNumber(body.monthlyBeersSold)) {
      return badRequest('Monthly beers sold must be a non-negative number')
    }

    if (body.monthlyRevenue !== undefined && !validateNonNegativeNumber(body.monthlyRevenue)) {
      return badRequest('Monthly revenue must be a non-negative number')
    }

    if (body.customerCount !== undefined && !validateNonNegativeNumber(body.customerCount)) {
      return badRequest('Customer count must be a non-negative number')
    }

    if (body.rating !== undefined && !validateRange(body.rating, 0, 5)) {
      return badRequest('Rating must be between 0 and 5')
    }

    const partner = await prisma.partner.create({
      data: {
        name: body.name,
        type: body.type,
        monthlyBeersSold: body.monthlyBeersSold || 0,
        monthlyRevenue: body.monthlyRevenue || 0,
        customerCount: body.customerCount || 0,
        rating: body.rating || 0,
        isPro: body.isPro || false,
      },
    })
    return NextResponse.json(partner, { status: 201 })
  } catch (error) {
    return serverError('Failed to create partner', error)
  }
}
