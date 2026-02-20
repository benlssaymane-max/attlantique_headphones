'use client'

import { Navbar, Footer } from '@/app/components'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-white mb-8">About Us</h1>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Premium Audio Experience
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              We are dedicated to bringing the world&apos;s finest noise cancelling
              headphones to audiophiles everywhere. The Sony WH-1000XM6
              represents the pinnacle of audio engineering, combining
              cutting-edge technology with premium comfort.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Our mission is to provide customers with access to the world&apos;s
              best audio equipment at competitive prices. We believe that
              everyone deserves to experience premium sound quality.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us?</h2>
            <ul className="space-y-4">
              {[
                'Official authorized retailer of Sony products',
                '100% authentic products with full warranty',
                'Expert customer support and after-sales service',
                'Competitive pricing and regular promotions',
                'Fast and reliable shipping',
                '30-day money-back guarantee',
              ].map((item, idx) => (
                <li key={idx} className="text-white/80 text-lg flex gap-4">
                  <span className="text-brand-cyan flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Quality Assurance
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Every product undergoes rigorous quality testing before shipment.
              We work directly with Sony to ensure authentic products and
              provide comprehensive warranty coverage for all purchases.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
