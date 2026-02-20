// /app/products/page.tsx
'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/app/components/ProductCard'
import { Navbar, Footer } from '@/app/components'

interface Product {
  id: number
  name: string
  slug: string
  price: number
  color?: string
  batteryLife?: number
  images?: Array<{
    url: string
    altText?: string
  }>
  reviews: Array<{
    rating: number
  }>
}

interface PaginationData {
  products: Product[]
  pagination: {
    total: number
    skip: number
    take: number
    pages: number
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: 1
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products?skip=0&take=12')

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data: PaginationData = await response.json()
        setProducts(data.products)
        setPagination({
          total: data.pagination.total,
          pages: data.pagination.pages,
          currentPage: 1
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-brand-dark pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Our Products
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              Experience the finest noise cancelling technology with our premium
              Sony WH-1000XM6 collection.
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-brand-dark-secondary rounded-xl h-96 animate-pulse"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              {/* Pagination Info */}
              <div className="text-center">
                <p className="text-white/60">
                  Showing all {pagination.total} products
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No products found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
