// /app/components/ProductCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const avgRating =
    product.reviews.length > 0
      ? (
        product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      ).toFixed(1)
      : '0'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="bg-[#0a0a0c] rounded-2xl overflow-hidden border border-white/[0.03] hover:border-brand-accent/30 transition-all duration-700 relative h-full">
          {/* Subtle gradient glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/0 to-brand-accent/0 group-hover:from-brand-accent/5 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Image Container */}
          <div className="relative h-[340px] w-full overflow-hidden bg-brand-dark-secondary/50 flex items-center justify-center p-8">
            {product.images && product.images[0]?.url ? (
              <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-[0.16,1,0.3,1]">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.name}
                  fill
                  className="object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center opacity-50">
                <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center mb-4">
                  <span className="text-4xl text-white/40">🎧</span>
                </div>
                <p className="text-white/40 text-sm tracking-widest uppercase font-display">Premium Audio</p>
              </div>
            )}

            {/* Badge */}
            {product.color && (
              <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 z-10">
                <p className="text-[10px] text-white/90 uppercase tracking-widest font-medium">{product.color}</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 relative z-10 bg-gradient-to-b from-transparent to-[#0a0a0c]">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-display font-medium text-white/90 group-hover:text-white transition-colors line-clamp-2 pr-4 leading-tight">
                {product.name}
              </h3>
              <p className="text-lg font-light text-white whitespace-nowrap">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Specs & Rating container */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                {product.batteryLife && (
                  <p className="text-xs text-white/50 tracking-wide font-light flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/80"></span>
                    {product.batteryLife}H
                  </p>
                )}
                {product.batteryLife && <span className="text-white/20 text-xs">|</span>}
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-accent text-xs">★</span>
                  <span className="text-xs text-white/70 font-light">{avgRating}</span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all duration-300">
                <span className="text-sm transform group-hover:translate-x-0.5 transition-transform duration-300">→</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
