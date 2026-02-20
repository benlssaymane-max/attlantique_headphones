'use client'

import { useState } from 'react'
import { Navbar, Footer } from '@/app/components'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send the data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white/60">
            We&apos;d love to hear from you. Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {[
            {
              icon: '📧',
              title: 'Email',
              detail: 'support@aymane6.com',
            },
            {
              icon: '📱',
              title: 'Phone',
              detail: '+1 (555) 123-4567',
            },
            {
              icon: '📍',
              title: 'Address',
              detail: '123 Audio Street, Tech City, TC 12345',
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/60">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-dark-secondary rounded-xl p-8 border border-white/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-3">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-brand-dark border border-white/10 text-white focus:border-brand-cyan focus:outline-none transition-colors duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-brand-dark border border-white/10 text-white focus:border-brand-cyan focus:outline-none transition-colors duration-300"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-brand-dark border border-white/10 text-white focus:border-brand-cyan focus:outline-none transition-colors duration-300"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-brand-dark border border-white/10 text-white focus:border-brand-cyan focus:outline-none transition-colors duration-300 resize-none"
                placeholder="Tell us more..."
              ></textarea>
            </div>

            {submitted && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
                ✓ Message sent successfully! We&apos;ll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
