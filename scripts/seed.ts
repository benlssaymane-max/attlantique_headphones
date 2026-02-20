// /scripts/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.pageView.deleteMany()
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

  // Create WH-1000XM6 products
  const matteBlack = await prisma.product.create({
    data: {
      name: 'Sony WH-1000XM6 - Matte Black',
      slug: 'wh-1000xm6-matte-black',
      description: 'Best-in-class noise cancelling headphones with premium sound quality. 30-hour battery life, premium build quality, and industry-leading ANC technology.',
      price: 379.99,
      stock: 50,
      category: 'Headphones',
      color: 'Matte Black',
      batteryLife: 30,
      weight: 250,
      warranty: '2 Years',
      images: {
        create: [
          {
            url: '/images/products/wh1000xm6-black-1.jpg',
            altText: 'Sony WH-1000XM6 Matte Black - Front View'
          },
          {
            url: '/images/products/wh1000xm6-black-2.jpg',
            altText: 'Sony WH-1000XM6 Matte Black - Side View'
          }
        ]
      }
    }
  })

  const silver = await prisma.product.create({
    data: {
      name: 'Sony WH-1000XM6 - Silver',
      slug: 'wh-1000xm6-silver',
      description: 'Best-in-class noise cancelling headphones with premium sound quality. 30-hour battery life, premium build quality, and industry-leading ANC technology.',
      price: 379.99,
      stock: 45,
      category: 'Headphones',
      color: 'Silver',
      batteryLife: 30,
      weight: 250,
      warranty: '2 Years',
      images: {
        create: [
          {
            url: '/images/products/wh1000xm6-silver-1.jpg',
            altText: 'Sony WH-1000XM6 Silver - Front View'
          },
          {
            url: '/images/products/wh1000xm6-silver-2.jpg',
            altText: 'Sony WH-1000XM6 Silver - Side View'
          }
        ]
      }
    }
  })

  console.log('✓ Created WH-1000XM6 products')

  // Create iPhone products
  const iphone15Pro = await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
      description: 'Latest Apple flagship with A17 Pro chip, titanium design, and advanced camera system. 6.7" Dynamic Island display with ProMotion.',
      price: 1099.99,
      stock: 35,
      category: 'Smartphones',
      color: 'Titanium',
      batteryLife: 29,
      weight: 203,
      warranty: '1 Year',
      images: {
        create: [
          {
            url: '/images/products/iphone15-pro-1.jpg',
            altText: 'iPhone 15 Pro Max - Front View'
          }
        ]
      }
    }
  })

  const iphone15 = await prisma.product.create({
    data: {
      name: 'iPhone 15',
      slug: 'iphone-15',
      description: 'New iPhone with A16 Bionic chip, advanced dual camera, and USB-C. Beautiful 6.1" display with Dynamic Island.',
      price: 799.99,
      stock: 40,
      category: 'Smartphones',
      color: 'Black',
      batteryLife: 20,
      weight: 171,
      warranty: '1 Year',
      images: {
        create: [
          {
            url: '/images/products/iphone15-1.jpg',
            altText: 'iPhone 15 - Front View'
          }
        ]
      }
    }
  })

  const samsung24 = await prisma.product.create({
    data: {
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      description: 'Premium Android flagship with Snapdragon 8 Gen 3, titanium frame, and AI-powered camera with 200MP main sensor.',
      price: 1299.99,
      stock: 30,
      category: 'Smartphones',
      color: 'Gray',
      batteryLife: 25,
      weight: 232,
      warranty: '1 Year',
      images: {
        create: [
          {
            url: '/images/products/samsung-s24-1.jpg',
            altText: 'Samsung Galaxy S24 Ultra - Front View'
          }
        ]
      }
    }
  })

  console.log('✓ Created Smartphone products')

  // Create PC products
  const macbookPro = await prisma.product.create({
    data: {
      name: 'MacBook Pro 16" M3 Max',
      slug: 'macbook-pro-16-m3-max',
      description: 'Powerful laptop with M3 Max chip, 36GB unified memory, 1TB SSD, 16-core GPU. Perfect for professionals and creators.',
      price: 3499.99,
      stock: 15,
      category: 'Computers',
      color: 'Space Black',
      weight: 2170,
      warranty: '1 Year AppleCare+',
      images: {
        create: [
          {
            url: '/images/products/macbook-pro-16-1.jpg',
            altText: 'MacBook Pro 16" M3 Max'
          }
        ]
      }
    }
  })

  const dellXPS = await prisma.product.create({
    data: {
      name: 'Dell XPS 15 Plus',
      slug: 'dell-xps-15-plus',
      description: 'Sleek and powerful Windows laptop with Intel Core i7, NVIDIA RTX 4060, 16GB RAM. Stunning 15.6" OLED display.',
      price: 1999.99,
      stock: 20,
      category: 'Computers',
      color: 'Titanium',
      weight: 1680,
      warranty: '2 Years',
      images: {
        create: [
          {
            url: '/images/products/dell-xps-15-1.jpg',
            altText: 'Dell XPS 15 Plus'
          }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'HP Pavilion 15',
      slug: 'hp-pavilion-15',
      description: 'Affordable and reliable laptop with Intel Core i5, 8GB RAM, 512GB SSD. Great for everyday computing and productivity.',
      price: 499.99,
      stock: 25,
      category: 'Computers',
      color: 'Silver',
      weight: 1650,
      warranty: '1 Year',
      images: {
        create: [
          {
            url: '/images/products/hp-pavilion-15-1.jpg',
            altText: 'HP Pavilion 15'
          }
        ]
      }
    }
  })

  console.log('✓ Created Computer products')

  // Create AirPods products
  const airpodsPro = await prisma.product.create({
    data: {
      name: 'Apple AirPods Pro (2nd gen)',
      slug: 'airpods-pro-2nd-gen',
      description: 'Premium wireless earbuds with active noise cancellation, transparency mode, and spatial audio. USB-C charging.',
      price: 249.99,
      stock: 50,
      category: 'Earbuds',
      color: 'White',
      batteryLife: 6,
      weight: 5.3,
      warranty: '1 Year',
      images: {
        create: [
          {
            url: '/images/products/airpods-pro-2-1.jpg',
            altText: 'Apple AirPods Pro 2nd gen'
          }
        ]
      }
    }
  })

  const airpodsMax = await prisma.product.create({
    data: {
      name: 'Apple AirPods Max',
      slug: 'airpods-max',
      description: 'Premium over-ear headphones with spatial audio, active noise cancellation, and seamless Apple ecosystem integration.',
      price: 549.99,
      stock: 20,
      category: 'Headphones',
      color: 'Silver',
      batteryLife: 20,
      weight: 384,
      warranty: '1 Year',
      images: {
        create: [
          {
            url: '/images/products/airpods-max-1.jpg',
            altText: 'Apple AirPods Max'
          }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Apple AirPods (3rd generation)',
      slug: 'airpods-3rd-gen',
      description: 'Popular wireless earbuds with spatial audio, active noise cancellation, and great battery life at an affordable price.',
      price: 129.99,
      stock: 60,
      category: 'Earbuds',
      color: 'White',
      batteryLife: 6,
      weight: 4.3,
      warranty: '1 Year',
      images: {
        create: [
          {
            url: '/images/products/airpods-3-1.jpg',
            altText: 'Apple AirPods 3rd gen'
          }
        ]
      }
    }
  })

  // Create reviews for all products
  await prisma.review.create({
    data: {
      productId: matteBlack.id,
      userId: regularUser.id,
      rating: 5,
      title: 'Best headphones I have ever owned',
      comment: 'The noise cancellation is incredible. The 30-hour battery life means I can go weeks without charging. Highly recommended!'
    }
  })

  await prisma.review.create({
    data: {
      productId: silver.id,
      userId: regularUser.id,
      rating: 4,
      title: 'Excellent sound quality',
      comment: 'Great product overall. The color is beautiful and the sound is crystal clear. A bit pricey but worth it.'
    }
  })

  // Reviews for iPhones
  await prisma.review.create({
    data: {
      productId: iphone15Pro.id,
      userId: regularUser.id,
      rating: 5,
      title: 'Incredible camera system',
      comment: 'The 48MP main sensor and zoom capabilities are outstanding. Battery life easily lasts all day.'
    }
  })

  await prisma.review.create({
    data: {
      productId: iphone15.id,
      userId: regularUser.id,
      rating: 4,
      title: 'Great value flagship',
      comment: 'Excellent upgrade from iPhone 14. USB-C is a game changer. Battery life is solid.'
    }
  })

  // Reviews for Samsung
  await prisma.review.create({
    data: {
      productId: samsung24.id,
      userId: regularUser.id,
      rating: 5,
      title: 'Best Android phone ever',
      comment: 'The AI features are amazing. Camera quality rivals the Pro Max. Highly recommended.'
    }
  })

  // Reviews for computers
  await prisma.review.create({
    data: {
      productId: macbookPro.id,
      userId: regularUser.id,
      rating: 5,
      title: 'Professional powerhouse',
      comment: 'M3 Max is a beast. No lag, lightning fast performance. Perfect for video editing and 3D work.'
    }
  })

  await prisma.review.create({
    data: {
      productId: dellXPS.id,
      userId: regularUser.id,
      rating: 4,
      title: 'Solid Windows alternative',
      comment: 'Great build quality. OLED display is stunning. Good value for the specs.'
    }
  })

  // Reviews for AirPods
  await prisma.review.create({
    data: {
      productId: airpodsPro.id,
      userId: regularUser.id,
      rating: 5,
      title: 'Best wireless earbuds',
      comment: 'Noise cancellation is excellent. Spatial audio with Apple Watch support is fantastic.'
    }
  })

  await prisma.review.create({
    data: {
      productId: airpodsMax.id,
      userId: regularUser.id,
      rating: 5,
      title: 'Worth every penny',
      comment: 'Premium design and sound quality. Spatial audio is mind-blowing. Best headphones I own alongside WH-1000XM6.'
    }
  })

  console.log('✓ Created reviews')

  // Create sample orders
  await prisma.order.create({
    data: {
      userId: regularUser.id,
      status: 'DELIVERED',
      totalPrice: 379.99,
      shippingAddress: '123 Main Street, Apt 4B',
      shippingCity: 'New York',
      shippingZip: '10001',
      shippingCountry: 'USA',
      items: {
        create: [
          {
            productId: matteBlack.id,
            quantity: 1,
            price: 379.99
          }
        ]
      }
    }
  })

  await prisma.order.create({
    data: {
      userId: regularUser.id,
      status: 'SHIPPED',
      totalPrice: 759.98,
      shippingAddress: '456 Oak Avenue',
      shippingCity: 'Los Angeles',
      shippingZip: '90001',
      shippingCountry: 'USA',
      items: {
        create: [
          {
            productId: silver.id,
            quantity: 2,
            price: 379.99
          }
        ]
      }
    }
  })

  console.log('✓ Created sample orders')

  // Create contact submissions
  await prisma.contact.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Question about WH-1000XM6',
      message: 'What is the warranty period for your headphones? Do you ship internationally?'
    }
  })

  console.log('✓ Created contact submissions')

  // Create page view analytics
  await prisma.pageView.create({
    data: {
      path: '/products/wh-1000xm6-matte-black',
      timestamp: new Date()
    }
  })

  console.log('✓ Created page view analytics')

  console.log('\n✅ Database seeded successfully!')
  console.log('\nSummary:')
  console.log('- Created 2 users (1 admin, 1 regular)')
  console.log('- Created 2 WH-1000XM6 products (Matte Black, Silver)')
  console.log('- Created 2 product reviews')
  console.log('- Created 2 sample orders')
  console.log('- Created 1 contact submission')
  console.log('- Created page analytics data')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
