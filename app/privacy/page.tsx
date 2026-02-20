'use client'

import { Navbar, Footer } from '@/app/components'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Introduction
            </h2>
            <p className="text-white/80 leading-relaxed">
              We are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Information We Collect
            </h2>
            <p className="text-white/80 leading-relaxed">
              We may collect information about you in a variety of ways. The
              information we may collect on the site includes:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 mt-4">
              <li>Personal Data: name, email address, password</li>
              <li>
                Payment Information: credit card numbers and billing address
              </li>
              <li>Device Information: browser type, IP address</li>
              <li>Usage Data: pages visited, time spent on pages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Use of Your Information
            </h2>
            <p className="text-white/80 leading-relaxed">
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customized experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-white/80 leading-relaxed">
              If you have questions or comments about this Privacy Policy,
              please contact us at: privacy@aymane6.com
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
