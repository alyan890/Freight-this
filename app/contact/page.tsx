'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ContactForm() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    requestType: '',
    category: '',
  })

  // Pre-fill form based on query parameters
  useEffect(() => {
    const type = searchParams.get('type')
    const category = searchParams.get('category')
    const subjectParam = searchParams.get('subject')
    
    let subject = formData.subject
    let message = formData.message
    
    if (subjectParam) {
      subject = subjectParam
      message = `I would like to ${subjectParam.toLowerCase()}.`
    } else if (type === 'buy-solution') {
      subject = 'Interested in Buying a Solution'
      message = 'I am interested in finding a solution for my transportation needs. Please help me find the right option.'
    } else if (type === 'sell-solution') {
      subject = 'Interested in Selling a Solution'
      message = 'I would like to connect with potential customers without the usual sales pressure. Please tell me more about how I can be featured.'
    } else if (category) {
      subject = `Inquiry about ${category.charAt(0).toUpperCase() + category.slice(1)} Transportation`
      message = `I would like to learn more about your ${category} transportation solutions.`
    }
    
    setFormData(prev => ({
      ...prev,
      subject,
      message,
      requestType: type || '',
      category: category || '',
    }))
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '', requestType: '', category: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const infoCards = [
    {
      title: 'Phone',
      value: 'xxx xxx xxxx',
      icon: (
        <svg className="w-8 h-8 text-amber-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
      ),
    },
    {
      title: 'Location',
      value: 'Tarpon Springs, Florida',
      icon: (
        <svg className="w-8 h-8 text-amber-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1a2e] via-[#0b1324] to-[#0c1a2e] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.08),transparent_42%)]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80 mb-2">We are here to help</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
            <p className="text-lg text-gray-200/80 max-w-3xl mx-auto">Questions, partnerships, or support—drop us a note and our team will respond quickly.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Info cards */}
            <div className="space-y-4">
              {infoCards.map((item) => (
                <div key={item.title} className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-lg shadow-black/20">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-200/80">{item.title}</p>
                      <p className="text-lg font-semibold text-white">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white/10 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl shadow-black/30">
              <h2 className="text-2xl font-semibold mb-6 text-white">Send us a Message</h2>

              {success && (
                <div className="mb-6 bg-green-50/90 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-50/90 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-100 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-100 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-100 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-100 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-400/90 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>}>
      <ContactForm />
    </Suspense>
  )
}
