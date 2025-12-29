'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import SolutionRequestModal from './SolutionRequestModal'
import { fadeInUpVariants, slideDownVariants, buttonHoverVariants } from '@/lib/animations'
import { useScrollReveal } from '@/lib/useAnimations'

export default function HeroSection() {
  const [contentRef, contentVisible] = useScrollReveal(0.1)
    const heroRef = useRef<HTMLDivElement | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [requestType, setRequestType] = useState<'Find' | 'Sell' | null>(null)

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#08111d] via-[#0c1f35] to-[#08111d]"
    >
      {/* Static background freight image - CSS fixed instead of parallax */}
      <div className="absolute inset-0" style={{ backgroundAttachment: 'fixed' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            opacity: 0.35,
            backgroundImage: 'url(https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2070&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08111d]/88 via-[#0c1f35]/72 to-[#08111d]/88" />
      </div>

      {/* Subtle animated background elements - DISABLED for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-300/15 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-1/3 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          ref={contentRef}
          initial="hidden"
          animate={contentVisible ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Main Headline */}
          <motion.h1
            variants={slideDownVariants}
            custom={1}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
              Where transportation buyers and sellers meet
          </motion.h1>

          {/* Subheading */}
          <div className="space-y-6 mb-10 max-w-4xl mx-auto">
            <div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              <h3 className="text-amber-300 font-bold text-lg mb-3">For Buyers:</h3>
              <p className="text-gray-200 leading-relaxed">
                For Buyers — Eliminate the guesswork and vast search for reputable vendors. Forget the endless stream of emails and phone calls from salespeople. Get real solutions vetted for you that meet your needs. Let us do the work — no charge.
              </p>
            </div>
            <div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <h3 className="text-amber-300 font-bold text-lg mb-3">For Sellers:</h3>
              <p className="text-gray-200 leading-relaxed">
                Are you interested in finding customers without bothering them with a constant barrage of emails and phone calls?
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setRequestType('Find'); setIsModalOpen(true) }}
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 relative group"
            >
              <span className="relative z-10">I am looking for solutions</span>
            </button>

            <button
              onClick={() => { setRequestType('Sell'); setIsModalOpen(true) }}
              className="inline-block bg-white/10 text-amber-200 border-2 border-amber-500 px-8 py-4 rounded-lg text-lg font-semibold backdrop-blur hover:bg-white/20 hover:shadow-lg hover:border-amber-400 transition-all duration-200"
            >
              I'd like to be a vetted solutions provider
            </button>
          </div>

            {isModalOpen && (
              <SolutionRequestModal
                open={isModalOpen}
                onCloseAction={() => setIsModalOpen(false)}
                initialType={requestType}
              />
            )}

          {/* Stats Section Below Hero */}
          {/* <motion.div variants={fadeInUpVariants} custom={4} className="mt-16 grid grid-cols-3 gap-8 text-center">
            {[{ number: '1000+', label: 'Active Partnerships' }, { number: '500+', label: 'Companies' }, { number: '5000+', label: 'Partnership Seekers' }].map((stat, i) => (
              <div key={i} className="group cursor-pointer hover:scale-105 transition-transform duration-200">
                <div className="text-3xl md:text-4xl font-bold text-amber-300 mb-2 group-hover:text-amber-200 transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div> */}
        </motion.div>
      </div>

      {/* Scroll indicator - CSS animation only */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-0 animate-bounce"
      >
        <svg
          className="w-6 h-6 text-amber-300"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}

