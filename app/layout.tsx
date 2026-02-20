import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'Sony WH-1000XM6 - Premium Noise Cancelling Headphones',
  description: 'Experience the finest noise cancelling technology with our premium Sony WH-1000XM6 collection.',
  keywords: 'headphones, noise cancelling, sony, wh-1000xm6, premium audio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-brand-dark text-white font-sans antialiased selection:bg-brand-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  )
}
