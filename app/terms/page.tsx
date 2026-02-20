'use client'

import { Navbar, Footer } from '@/app/components'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-white/80 leading-relaxed">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Products and Services
            </h2>
            <p className="text-white/80 leading-relaxed">
              All products and services are provided on an &quot;as is&quot; basis. We
              make no warranties, expressed or implied, regarding the products
              and services offered.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="text-white/80 leading-relaxed">
              In no event shall our company be liable for any damages
              (including, without limitation, damages for loss of data or
              profit, or due to business interruption) arising out of the use
              or inability to use the materials on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Return Policy
            </h2>
            <p className="text-white/80 leading-relaxed">
              We offer a 30-day money-back guarantee on all purchases. Items
              must be returned in original condition with all packaging and
              documentation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-white/80 leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us at: legal@aymane6.com
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
