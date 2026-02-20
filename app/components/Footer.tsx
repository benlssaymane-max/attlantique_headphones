'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-accent transition-colors duration-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/10 transition-colors duration-500" />
                <span className="text-white font-display font-medium tracking-wider text-sm relative z-10">SONY</span>
              </div>
              <span className="text-white tracking-widest text-sm font-medium uppercase opacity-90 group-hover:opacity-100 transition-opacity">
                WH-1000XM6
              </span>
            </Link>
            <p className="text-brand-steel text-sm leading-relaxed max-w-sm font-light">
              Experience the pinnacle of audio engineering. Redefining high-fidelity sound with uncompromising adaptive noise cancellation.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Products */}
            <div>
              <h4 className="font-display text-sm font-medium text-white mb-6 tracking-widest uppercase">Products</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/products" className="text-brand-steel hover:text-brand-accent transition-colors text-sm font-light tracking-wide">
                    The Collection
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=headphones" className="text-brand-steel hover:text-brand-accent transition-colors text-sm font-light tracking-wide">
                    Headphones
                  </Link>
                </li>
                <li>
                  <Link href="#specs" className="text-brand-steel hover:text-brand-accent transition-colors text-sm font-light tracking-wide">
                    Specifications
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-display text-sm font-medium text-white mb-6 tracking-widest uppercase">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-brand-steel hover:text-brand-accent transition-colors text-sm font-light tracking-wide">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-brand-steel hover:text-brand-accent transition-colors text-sm font-light tracking-wide">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display text-sm font-medium text-white mb-6 tracking-widest uppercase">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-brand-steel hover:text-brand-accent transition-colors text-sm font-light tracking-wide">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-brand-steel hover:text-brand-accent transition-colors text-sm font-light tracking-wide">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-brand-steel text-xs font-light tracking-wide">
              © {currentYear} Sony Electronics Inc. All rights reserved.
            </p>
            <div className="flex gap-8">
              {['Twitter', 'Facebook', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-brand-steel hover:text-brand-accent transition-colors text-xs font-medium tracking-widest uppercase"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
