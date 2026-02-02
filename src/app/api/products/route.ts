import { badRequest, serverError, validatePositiveNumber, validateRequired } from '@/lib/api-utils'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    return serverError('Failed to fetch products', error)
  }
}

interface CreateProductBody {
  name: string
  category: string
  style?: string
  volume: string
  price: number
  abv?: string
  imageUrl?: string
}

export async function POST(request: Request) {
  try {
    const body: CreateProductBody = await request.json()

    const requiredError = validateRequired(body, ['name', 'category', 'volume', 'price'])
    if (requiredError) {
      return badRequest(requiredError)
    }

    if (!validatePositiveNumber(body.price)) {
      return badRequest('Price must be a positive number')
    }

    const existingProduct = await prisma.product.findFirst({
      where: { name: body.name, category: body.category },
    })
    if (existingProduct) {
      return badRequest('Product with this name and category already exists')
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        category: body.category,
        style: body.style,
        volume: body.volume,
        price: body.price,
        abv: body.abv,
        imageUrl: body.imageUrl,
      },
    })
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return serverError('Failed to create product', error)
  }
}
