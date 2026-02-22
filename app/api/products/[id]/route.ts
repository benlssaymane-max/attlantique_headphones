// /app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

// GET single product
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt((await context.params).id) },
      include: {
        images: true,
        reviews: {
          include: {
            user: {
              select: {
                username: true,
                firstName: true
              }
            }
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Get product error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// UPDATE product
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json()

    const product = await prisma.product.update({
      where: { id: parseInt((await context.params).id) },
      data
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// DELETE product
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await prisma.product.delete({
      where: { id: parseInt((await context.params).id) }
    })

    return NextResponse.json({ message: 'Product deleted' })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
