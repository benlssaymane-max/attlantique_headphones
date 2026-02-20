#!/usr/bin/env node

/**
 * This script runs migrations and seeds the database
 * Used for initial setup
 */

import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('🌱 Starting database initialization...')

  try {
    // Clear existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.review.deleteMany()
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.user.deleteMany()

    console.log('✓ Cleared existing data')

    // Create admin user
    const adminPassword = await bcrypt.hash('Admin123!', 10)
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@aymane6.com',
        username: 'admin',
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN'
      }
    })
    console.log('✓ Created admin user:', adminUser.email)

    // Create regular user
    const userPassword = await bcrypt.hash('User123!', 10)
    const regularUser = await prisma.user.create({
      data: {
        email: 'user@aymane6.com',
        username: 'johndoe',
        password: userPassword,
        firstName: 'John',
        lastName: 'Doe',
        role: 'USER'
      }
    })
    console.log('✓ Created regular user:', regularUser.email)

    // Create products
    const products = [
      {
        name: 'Sony WH-1000XM6 - Matte Black',
        slug: 'wh-1000xm6-matte-black',
        description: 'Best-in-class noise cancelling headphones with premium sound quality. 30-hour battery life, premium build quality, and industry-leading ANC technology.',
        price: 379.99,
        stock: 50,
        category: 'Headphones',
        color: 'Matte Black',
        batteryLife: 30,
        weight: 250,
        warranty: '2 Years'
      },
      {
        name: 'Sony WH-1000XM6 - Silver',
        slug: 'wh-1000xm6-silver',
        description: 'Best-in-class noise cancelling headphones with premium sound quality. 30-hour battery life, premium build quality, and industry-leading ANC technology.',
        price: 379.99,
        stock: 45,
        category: 'Headphones',
        color: 'Silver',
        batteryLife: 30,
        weight: 250,
        warranty: '2 Years'
      }
    ]

    for (const productData of products) {
      const product = await prisma.product.create({
        data: {
          ...productData,
          images: {
            create: [
              {
                url: '/images/products/placeholder.jpg',
                altText: `${productData.name} - Front View`
              }
            ]
          }
        }
      })
      console.log('✓ Created product:', product.name)
    }

    console.log('\n✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
