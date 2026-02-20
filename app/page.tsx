'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar, Footer, ProductCard, Lightning } from '@/app/components'
import { motion } from 'framer-motion'

interface Product {
  id: number
  name: string
  slug: string
  price: number
  images?: Array<{ url: string; altText?: string }>
  reviews?: Array<{ rating: number }>
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?take=6')
        const data = await res.json()
        setFeaturedProducts(data.products || [])
      } catch (err) {
        console.error('Failed to fetch products', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-brand-dark relative">
      <div className="bg-noise mix-blend-overlay"></div>
      <Navbar />

      <main className="flex-1 relative z-10">
        {/* HERO SECTION - Premium Minimal */}
        <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen mix-blend-luminosity filter contrast-125">
              <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark/80" />
          </div>

          <Lightning />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col items-center text-center mt-20">
            <motion.div initial="initial" animate="animate" variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}>
              <motion.div
                variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                className="mb-8 inline-flex items-center gap-3"
              >
                <span className="w-8 h-[1px] bg-brand-accent"></span>
                <span className="text-xs font-display font-medium tracking-[0.3em] text-brand-accent uppercase">The New Standard</span>
                <span className="w-8 h-[1px] bg-brand-accent"></span>
              </motion.div>

              <motion.h1
                variants={{ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="text-6xl md:text-8xl lg:text-[140px] font-display font-light text-white mb-6 leading-[0.9] tracking-tighter"
              >
                Absolute
                <span className="block italic font-serif opacity-90 text-transparent flex-col flex bg-clip-text bg-gradient-to-b from-white to-white/40">
                  Silence.
                </span>
              </motion.h1>

              <motion.p
                variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="text-lg md:text-xl text-brand-steel max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide"
              >
                Experience the pinnacle of audio engineering. The Sony WH-1000XM6 redefines high-fidelity sound with uncompromising adaptive noise cancellation.
              </motion.p>

              <motion.div
                variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                className="flex flex-col sm:flex-row justify-center gap-6 items-center"
              >
                <Link href="/products" className="brand-button-primary w-full sm:w-auto">
                  Discover the XM6
                </Link>
                <Link href="#specs" className="group flex items-center gap-2 text-white/70 hover:text-brand-accent transition-colors text-sm font-medium tracking-wide uppercase">
                  Explore Specs
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 cursor-pointer">
            <Link href="#specs">
              <div className="w-8 h-12 border border-white/20 rounded-full flex justify-center p-2 hover:border-brand-accent/50 transition-colors">
                <div className="w-1 h-2 rounded-full bg-white/50" />
              </div>
            </Link>
          </motion.div>
        </section>

        {/* STATS SECTION - Refined Grid */}
        <section className="py-24 bg-brand-dark border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 divide-x divide-white/5">
              {[
                { value: '30H', label: 'Battery Life', desc: 'Continuous playback' },
                { value: 'V2', label: 'Processor', desc: 'Integrated HD Noise Cancelling' },
                { value: '8', label: 'Microphones', desc: 'Precise voice pickup' },
                { value: 'Hi-Res', label: 'Audio', desc: 'LDAC codec support' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center px-4"
                >
                  <div className="text-4xl md:text-5xl font-display font-light text-white mb-4 tracking-tight">{stat.value}</div>
                  <h3 className="text-sm font-medium text-brand-accent tracking-widest uppercase mb-2">{stat.label}</h3>
                  <p className="text-brand-steel text-sm font-light">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION - Asymmetrical Layout */}
        <section id="specs" className="py-32 relative z-10 bg-[#08080a]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-24 md:w-2/3"
            >
              <h2 className="text-sm font-display font-medium text-brand-accent uppercase tracking-[0.2em] mb-4">Engineering</h2>
              <h3 className="text-5xl md:text-7xl font-display font-light text-white leading-[1.1] tracking-tight">Crafted for<br />Audiophiles.</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Large Feature Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-8 p-10 md:p-16 rounded-[2rem] bg-gradient-to-br from-brand-dark-secondary to-brand-dark border border-white/5 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mb-8 border border-brand-accent/20">
                    <span className="text-xl">〰️</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-medium text-white mb-6">Unrivaled Noise Cancellation</h3>
                  <p className="text-brand-steel text-lg leading-relaxed max-w-xl font-light">
                    Multiple microphones and the new Integrated Processor V2 precisely cancel out more high and mid-frequency noise than ever before. From airplane noise to people&apos;s voices, experience true isolation.
                  </p>
                </div>
              </motion.div>

              {/* Small Feature Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-4 p-10 rounded-[2rem] bg-brand-dark-secondary border border-white/5 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <span className="text-xl">🎵</span>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white mb-4">Exceptional Sound</h3>
                  <p className="text-brand-steel font-light leading-relaxed">
                    A specially designed 30mm driver unit with a light and rigid dome ensures natural, uncolored audio.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-4 p-10 rounded-[2rem] bg-brand-dark-secondary border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <span className="text-xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white mb-4">Supreme Comfort</h3>
                  <p className="text-brand-steel font-light leading-relaxed">
                    Luxurious soft fit leather conforms perfectly to your head, minimizing pressure for all-day wearability.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-8 p-10 md:p-16 rounded-[2rem] bg-brand-dark border border-white/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">Multipoint Connection</h3>
                    <p className="text-brand-steel text-lg font-light leading-relaxed max-w-md">
                      Pair with two Bluetooth devices simultaneously. When a call comes in, your headphones know which device is ringing and connects to the right one automatically.
                    </p>
                  </div>
                  <div className="flex -space-x-4">
                    <div className="w-16 h-16 rounded-full bg-[#111] border-2 border-brand-dark flex items-center justify-center shadow-lg"><span className="text-xl">📱</span></div>
                    <div className="w-16 h-16 rounded-full bg-[#1a1a1c] border-2 border-brand-dark flex items-center justify-center shadow-lg"><span className="text-xl">💻</span></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION - Curated Gallery */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
            >
              <div>
                <h2 className="text-sm font-display font-medium text-brand-accent uppercase tracking-[0.2em] mb-4">Collection</h2>
                <h3 className="text-4xl md:text-5xl font-display font-light text-white tracking-tight">The Lineup</h3>
              </div>
              <Link href="/products" className="text-white/60 hover:text-white uppercase tracking-widest text-sm font-medium flex items-center gap-2 group transition-colors">
                View All <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => <div key={i} className="h-[500px] bg-brand-dark-secondary rounded-[2rem] animate-pulse" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProducts.map((p, idx) => <ProductCard key={p.id} product={p as any} index={idx} />)}
              </div>
            )}

            {featuredProducts.length === 0 && !loading && (
              <div className="text-center py-20 border border-white/5 rounded-[2rem] bg-brand-dark-secondary">
                <p className="text-brand-steel text-lg">No products available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA SECTION - Full width statement */}
        <section className="py-40 relative z-10 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-light text-white mb-8 tracking-tighter leading-[1.1]">
                Master Your<br />
                <span className="italic font-serif text-brand-accent">Environment.</span>
              </h2>
              <p className="text-xl text-brand-steel mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Step into a world where absolute silence meets premium fidelity.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/products" className="brand-button-primary">
                  Order Now
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
