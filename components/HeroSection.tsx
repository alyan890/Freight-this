'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUpVariants, slideDownVariants, buttonHoverVariants } from '@/lib/animations'
import { useScrollReveal } from '@/lib/useAnimations'

export default function HeroSection() {
  const [contentRef, contentVisible] = useScrollReveal(0.1)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#08111d] via-[#0c1f35] to-[#08111d]"
    >
      {/* Parallax background freight image */}
      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            opacity: 0.35,
            backgroundImage: 'url(https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2070&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08111d]/88 via-[#0c1f35]/72 to-[#08111d]/88" />
      </motion.div>

      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0.25, scale: 1.2 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-300/40 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.18, scale: 1 }}
          animate={{ opacity: 0.1, scale: 1.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
          className="absolute bottom-32 left-1/3 w-96 h-96 bg-blue-300/35 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          ref={contentRef}
          initial="hidden"
          animate={contentVisible ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Eyebrow text */}
          <motion.div variants={fadeInUpVariants} custom={0} className="inline-block mb-6">
            <span className="text-amber-200 font-semibold text-sm tracking-wider uppercase">
              Welcome to the Future of Hiring
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={slideDownVariants}
            custom={1}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Where Transportation Buyers and{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Sellers Meet
            </span>
          </motion.h1>

          {/* Subheading */}
          <div className="space-y-6 mb-10 max-w-4xl mx-auto">
            <motion.div
              variants={fadeInUpVariants}
              custom={2}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
            >
              <h3 className="text-amber-300 font-bold text-lg mb-3">For Buyers:</h3>
              <p className="text-gray-200 leading-relaxed">
                Eliminate the endless stream of emails and phone calls from sales people. Get real solutions vetted for you that meet your needs. Let us do the work at no charge!!
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUpVariants}
              custom={3}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
            >
              <h3 className="text-amber-300 font-bold text-lg mb-3">For Sellers:</h3>
              <p className="text-gray-200 leading-relaxed">
                Are you interested in finding customers without bothering them with a constant barrage of emails/phone calls?
              </p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUpVariants} custom={4} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div variants={buttonHoverVariants} initial="initial" whileHover="hover" whileTap="tap">
              <Link
                href="/contact?type=buy-solution"
                className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 relative group"
              >
                <span className="relative z-10">Buy a Solution</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>

            <motion.div variants={buttonHoverVariants} initial="initial" whileHover="hover" whileTap="tap">
              <Link
                href="/contact?type=sell-solution"
                className="inline-block bg-white/10 text-amber-200 border-2 border-amber-500 px-8 py-4 rounded-lg text-lg font-semibold backdrop-blur hover:bg-white/20 hover:shadow-lg transition-all duration-300"
              >
                Sell a Solution
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section Below Hero */}
          <motion.div variants={fadeInUpVariants} custom={4} className="mt-16 grid grid-cols-3 gap-8 text-center">
            {[{ number: '1000+', label: 'Active Jobs' }, { number: '500+', label: 'Companies' }, { number: '5000+', label: 'Job Seekers' }].map((stat, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05, y: -5 }} className="group cursor-pointer">
                <motion.div className="text-3xl md:text-4xl font-bold text-amber-300 mb-2 group-hover:text-amber-200 transition-colors">
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
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
      </motion.div>
    </section>
  )
}
