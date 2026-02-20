// /app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET all products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const skip = parseInt(searchParams.get('skip') || '0')
    const take = parseInt(searchParams.get('take') || '10')
    const category = searchParams.get('category')

    const where = category ? { category } : {}

    const products = await prisma.product.findMany({
      where,
      skip,
      take,
      include: {
        images: true,
        reviews: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const total = await prisma.product.count({ where })

    return NextResponse.json({
      products,
      pagination: {
        total,
        skip,
        take,
        pages: Math.ceil(total / take)
      }
    })
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// POST create product (admin only)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category,
        color: data.color,
        batteryLife: data.batteryLife,
        weight: data.weight,
        warranty: data.warranty
      },
      include: {
        images: true
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
