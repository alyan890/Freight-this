"use client"

import { useState, useEffect } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  initialType: 'Find' | 'Sell' | null
}

const GROUPS: { title: string; items: string[] }[] = [
  {
    title: 'Core Freight & Logistics Services',
    items: [
      'Truckload (TL/LTL)',
      'Intermodal',
      'Air Cargo',
      'Freight Forwarding',
      'Bulk or Specialized Equipment',
      'Ocean Transport',
      'Drayage',
      'Dedicated Trucking',
      'Parcel & Courier Services',
    ],
  },
  {
    title: 'Technology Solutions',
    items: [
      'Transportation Management Systems (TMS)',
      'Warehouse Management Systems (WMS)',
      'Fleet Management Software',
      'On-Demand Apps',
      'Yard Management Systems',
      'Procurement Solutions',
      'Telematics',
      'GPS & Asset Tracking',
      'Electronic Logging Devices (ELDs)',
      'Digital Freight Platforms',
      'AI / Predictive Analytics',
      'EDI / API Solutions',
      'Route & Load Planning / Optimization',
      'Financial / Invoice Management Software',
      'Tracking Solutions',
    ],
  },
  {
    title: 'Managed & Specialized Services',
    items: [
      'Managed Transportation (3PL / 4PL)',
      'Cold Chain Logistics',
      'Government Contracts (GSA)',
      'Other',
    ],
  },
]

export default function SolutionRequestModal({ open, onClose, initialType }: Props) {
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [otherText, setOtherText] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState<'Find' | 'Sell' | null>(initialType || null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setType(initialType || null)
  }, [initialType])

  if (!open) return null

  const toggle = (key: string) => {
    setSelected((s) => ({ ...s, [key]: !s[key] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const selectedItems = Object.keys(selected).filter((k) => selected[k])

    try {
      const res = await fetch('/api/solutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: type || 'Find',
          selectedItems,
          otherText,
          contact: { fullName, companyName, email, phone },
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data?.error || 'Failed to send request')
      }

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 2500)
    } catch (err: any) {
      setError(err.message || 'Failed to send request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-w-4xl w-full my-8 bg-[#faf8f3] rounded-2xl shadow-2xl border border-[#e0d9c7]">
        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-700 rounded-t-2xl">
          <h3 className="text-xl font-bold text-white">Request a Solution</h3>
          <button 
            onClick={onClose} 
            className="text-white hover:text-amber-100 transition-colors p-2 hover:bg-white/10 rounded-lg"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 py-6">
          {success ? (
            <div className="p-6 bg-green-50 border-2 border-green-200 text-green-800 rounded-lg text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-lg font-semibold">Thank you! Your request has been sent successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white border border-[#e0d9c7] rounded-lg p-5">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="fullName"
                      type="text"
                      required 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      className="w-full px-4 py-2.5 border border-[#e0d9c7] rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-[#faf8f3] transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input 
                      id="companyName"
                      type="text"
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                      className="w-full px-4 py-2.5 border border-[#e0d9c7] rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-[#faf8f3] transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="email"
                      type="email"
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full px-4 py-2.5 border border-[#e0d9c7] rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-[#faf8f3] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input 
                      id="phone"
                      type="tel"
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="w-full px-4 py-2.5 border border-[#e0d9c7] rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-[#faf8f3] transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Request Type */}
              <div className="bg-white border border-[#e0d9c7] rounded-lg p-5">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Request Type</h4>
                <div className="flex items-center gap-3">
                  <button 
                    type="button" 
                    onClick={() => setType('Find')} 
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                      type === 'Find' 
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                        : 'bg-[#f5f0e6] text-gray-700 hover:bg-[#e0d9c7]'
                    }`}
                  >
                    Find a Solution
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setType('Sell')} 
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                      type === 'Sell' 
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                        : 'bg-[#f5f0e6] text-gray-700 hover:bg-[#e0d9c7]'
                    }`}
                  >
                    Sell a Solution
                  </button>
                </div>
              </div>

              {/* Services Selection */}
              {GROUPS.map((g) => (
                <div key={g.title} className="bg-white border border-[#e0d9c7] rounded-lg p-5">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{g.title}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {g.items.map((item) => (
                      <label key={item} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#faf8f3] cursor-pointer transition-colors">
                        <input 
                          type="checkbox" 
                          checked={!!selected[item]} 
                          onChange={() => toggle(item)}
                          className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Other Description */}
              <div className="bg-white border border-[#e0d9c7] rounded-lg p-5">
                <label htmlFor="otherText" className="block text-sm font-medium text-gray-700 mb-2">
                  Other — Please describe
                </label>
                <textarea 
                  id="otherText"
                  value={otherText} 
                  onChange={(e) => setOtherText(e.target.value)} 
                  rows={4} 
                  className="w-full px-4 py-3 border border-[#e0d9c7] rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-[#faf8f3] transition-all resize-none"
                  placeholder="Tell us more about your specific needs..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-[#e0d9c7] text-gray-700 rounded-lg font-semibold hover:bg-[#f5f0e6] transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
