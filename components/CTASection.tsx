'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUpVariants, buttonHoverVariants } from '@/lib/animations'
import { useScrollReveal } from '@/lib/useAnimations'

export default function CTASection() {
  const [sectionRef, sectionVisible] = useScrollReveal(0.2)

  return (
    <section
      className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Freight Background Image */}
      <div className="absolute inset-0" style={{ backgroundAttachment: 'fixed' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2076&auto=format&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/95" />
      </div>

      {/* Static Background Accents */}
      <div
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600 rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-700 rounded-full blur-3xl opacity-10" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={sectionVisible ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeInUpVariants}
            custom={0}
            className="inline-block mb-4"
          >
            <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
              Ready to Transform Your Career?
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            variants={fadeInUpVariants}
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Get Started Today with FreightThis
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={fadeInUpVariants}
            custom={2}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of professionals in the transportation industry who are advancing their careers with opportunities found on our platform. Post a partnership, find talent, or discover your next great opportunity now.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUpVariants}
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <motion.div
              variants={buttonHoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-amber-600/50 transition-all duration-300"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div
              variants={buttonHoverVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/contact"
                className="inline-block border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                Contact Sales
              </Link>
            </motion.div>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            variants={fadeInUpVariants}
            custom={4}
          >
            <p className="text-gray-400 mb-4">
              Not sure where to start?
            </p>
            <Link
              href="/about"
              className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-2 transition-colors duration-300 group"
            >
              Learn more about our mission
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-12 border-t border-gray-700 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { label: 'Industry Leaders', icon: '✓' },
            { label: 'Verified Partners', icon: '◆' },
            { label: '24/7 Support', icon: '⊕' },
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-2xl mb-2 text-amber-400">{badge.icon}</div>
              <div className="text-sm text-gray-400">{badge.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
