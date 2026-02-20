'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-accent transition-colors duration-500 overflow-hidden relative">
              <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/10 transition-colors duration-500" />
              <span className="text-white font-display font-medium tracking-wider text-sm relative z-10">SONY</span>
            </div>
            <span className="hidden sm:inline text-white tracking-widest text-sm font-medium uppercase opacity-90 group-hover:opacity-100 transition-opacity">
              WH-1000XM6
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="hidden sm:inline-block px-8 py-2.5 rounded-full bg-white text-brand-dark font-medium text-sm hover:bg-brand-accent hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)]"
            >
              Shop Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <div className="flex flex-col gap-1.5 w-4">
                <span className={`h-[1px] bg-white transition-all transform ${isOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                <span className={`h-[1px] bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`h-[1px] bg-white transition-all transform ${isOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-64 opacity-100 mt-4 border-t border-white/5 pt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-4 pb-4 px-2">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-white/70 hover:text-brand-accent transition-colors py-2 text-lg font-light tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
