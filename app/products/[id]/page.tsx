'use client'

import { useEffect, useState } from 'react'
import { Navbar, Footer } from '@/app/components'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  stock: number
  color?: string
  batteryLife?: number
  weight?: number
  warranty?: string
  images?: Array<{ url: string; altText?: string }>
  reviews: Array<{ rating: number }>
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch product')
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Navbar />
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-96 bg-brand-dark-secondary rounded-xl mb-8"></div>
            <div className="h-12 bg-brand-dark-secondary rounded-lg mb-4 w-1/3"></div>
            <div className="h-8 bg-brand-dark-secondary rounded-lg mb-8 w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Navbar />
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-white/60 mb-8">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-lg font-semibold transition-colors"
          >
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const avgRating =
    product.reviews.length > 0
      ? (
          product.reviews.reduce((sum, r) => sum + r.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : '0'

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-brand-cyan hover:text-brand-cyan/80 mb-8 transition-colors"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="bg-brand-dark-secondary rounded-xl p-8 flex items-center justify-center min-h-96">
            {product.images?.[0]?.url ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎧</div>
                  <p className="text-white/60">{product.images[0].altText}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/60">
                <div className="text-6xl mb-4">📦</div>
                <p>No image available</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.round(parseFloat(avgRating))
                        ? 'text-yellow-400 text-xl'
                        : 'text-white/20 text-xl'
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-white/60">
                {avgRating} ({product.reviews.length} reviews)
              </span>
            </div>

            <div className="text-4xl font-bold text-brand-cyan mb-8">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-white/80 text-lg mb-8">{product.description}</p>

            {/* Specifications */}
            <div className="bg-brand-dark-secondary rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.color && (
                  <div>
                    <p className="text-white/60 text-sm">Color</p>
                    <p className="text-white font-semibold">{product.color}</p>
                  </div>
                )}
                {product.batteryLife && (
                  <div>
                    <p className="text-white/60 text-sm">Battery Life</p>
                    <p className="text-white font-semibold">
                      {product.batteryLife}h
                    </p>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <p className="text-white/60 text-sm">Weight</p>
                    <p className="text-white font-semibold">
                      {product.weight}g
                    </p>
                  </div>
                )}
                {product.warranty && (
                  <div>
                    <p className="text-white/60 text-sm">Warranty</p>
                    <p className="text-white font-semibold">{product.warranty}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-white/60 hover:text-white transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center bg-transparent text-white border-l border-r border-white/20 py-3"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-white/60 hover:text-white transition-colors"
                >
                  +
                </button>
              </div>

              <button
                disabled={product.stock === 0}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  product.stock > 0
                    ? 'bg-brand-blue hover:bg-brand-blue/90 text-white'
                    : 'bg-white/10 text-white/60 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            <p className="text-white/60 text-sm mt-4">
              {product.stock > 0
                ? `${product.stock} in stock`
                : 'Currently out of stock'}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
