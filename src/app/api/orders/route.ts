import { badRequest, notFound, serverError, validatePositiveNumber, validateRequired } from '@/lib/api-utils'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const partnerId = searchParams.get('partnerId')

    if (partnerId) {
      const partner = await prisma.partner.findUnique({ where: { id: partnerId } })
      if (!partner) {
        return notFound('Partner not found')
      }
    }

    const where = partnerId ? { partnerId } : {}

    const orders = await prisma.partnerOrder.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        partner: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(orders)
  } catch (error) {
    return serverError('Failed to fetch orders', error)
  }
}

interface OrderItem {
  productId: string
  quantity: number
  price: number
}

interface CreateOrderBody {
  partnerId: string
  items: OrderItem[]
  estimatedDate?: string
}

export async function POST(request: Request) {
  try {
    const body: CreateOrderBody = await request.json()

    const requiredError = validateRequired(body, ['partnerId', 'items'])
    if (requiredError) {
      return badRequest(requiredError)
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return badRequest('Items must be a non-empty array')
    }

    const partner = await prisma.partner.findUnique({ where: { id: body.partnerId } })
    if (!partner) {
      return notFound('Partner not found')
    }

    let totalAmount = 0
    const validatedItems: OrderItem[] = []

    for (const item of body.items) {
      if (!item.productId) {
        return badRequest('Each item must have a productId')
      }

      if (!validatePositiveNumber(item.quantity)) {
        return badRequest('Each item quantity must be a positive number')
      }

      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        return notFound(`Product with id ${item.productId} not found`)
      }

      const itemPrice = item.price || product.price
      totalAmount += itemPrice * item.quantity

      validatedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: itemPrice,
      })
    }

    const order = await prisma.partnerOrder.create({
      data: {
        partnerId: body.partnerId,
        totalAmount,
        estimatedDelivery: body.estimatedDate ? new Date(body.estimatedDate) : null,
        items: {
          create: validatedItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return serverError('Failed to create order', error)
  }
}
