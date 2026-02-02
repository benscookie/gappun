import { badRequest, notFound, serverError, validateRange, validateRequired } from '@/lib/api-utils'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const partner = await prisma.partner.findUnique({ where: { id } })
    if (!partner) {
      return notFound('Partner not found')
    }

    const equipment = await prisma.equipment.findMany({
      where: { partnerId: id },
      orderBy: { stockLevel: 'asc' },
    })
    return NextResponse.json(equipment)
  } catch (error) {
    return serverError('Failed to fetch equipment', error)
  }
}

interface CreateEquipmentBody {
  name: string
  style?: string
  category: string
  stockLevel?: number
}

const validCategories = ['LAGER', 'PILSNER', 'WHEAT', 'IPA', 'STOUT', 'ALE', 'OTHER']

function getStockStatus(stockLevel: number): 'NORMAL' | 'LOW' | 'URGENT' {
  if (stockLevel <= 20) return 'URGENT'
  if (stockLevel <= 40) return 'LOW'
  return 'NORMAL'
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: CreateEquipmentBody = await request.json()

    const partner = await prisma.partner.findUnique({ where: { id } })
    if (!partner) {
      return notFound('Partner not found')
    }

    const requiredError = validateRequired(body, ['name', 'category'])
    if (requiredError) {
      return badRequest(requiredError)
    }

    if (!validCategories.includes(body.category)) {
      return badRequest(`Category must be one of: ${validCategories.join(', ')}`)
    }

    const stockLevel = body.stockLevel ?? 100
    if (!validateRange(stockLevel, 0, 100)) {
      return badRequest('Stock level must be between 0 and 100')
    }

    const status = getStockStatus(stockLevel)

    const equipment = await prisma.equipment.create({
      data: {
        name: body.name,
        style: body.style,
        category: body.category,
        stockLevel,
        status,
        partnerId: id,
      },
    })
    return NextResponse.json(equipment, { status: 201 })
  } catch (error) {
    return serverError('Failed to create equipment', error)
  }
}

interface UpdateEquipmentBody {
  equipmentId: string
  stockLevel: number
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: UpdateEquipmentBody = await request.json()

    const partner = await prisma.partner.findUnique({ where: { id } })
    if (!partner) {
      return notFound('Partner not found')
    }

    const requiredError = validateRequired(body, ['equipmentId', 'stockLevel'])
    if (requiredError) {
      return badRequest(requiredError)
    }

    if (!validateRange(body.stockLevel, 0, 100)) {
      return badRequest('Stock level must be between 0 and 100')
    }

    const existingEquipment = await prisma.equipment.findUnique({
      where: { id: body.equipmentId },
    })

    if (!existingEquipment) {
      return notFound('Equipment not found')
    }

    if (existingEquipment.partnerId !== id) {
      return badRequest('Equipment does not belong to this partner')
    }

    const status = getStockStatus(body.stockLevel)

    const equipment = await prisma.equipment.update({
      where: { id: body.equipmentId },
      data: {
        stockLevel: body.stockLevel,
        status,
        lastRefillDate: body.stockLevel > existingEquipment.stockLevel ? new Date() : undefined,
      },
    })
    return NextResponse.json(equipment)
  } catch (error) {
    return serverError('Failed to update equipment', error)
  }
}
