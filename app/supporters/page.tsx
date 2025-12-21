'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUpVariants } from '@/lib/animations'
import { useScrollReveal } from '@/lib/useAnimations'

export default function SupportersPage() {
  const [sectionRef, sectionVisible] = useScrollReveal(0.15)

  const supporters = [
    { id: 1, name: 'Supporter 1' },
    { id: 2, name: 'Supporter 2' },
    { id: 3, name: 'Supporter 3' },
    { id: 4, name: 'Supporter 4' },
    { id: 5, name: 'Supporter 5' },
    { id: 6, name: 'Supporter 6' },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f3] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={sectionVisible ? 'visible' : 'hidden'}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Supporters / Sponsors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're grateful to our supporters who help make FreightThis possible
          </p>
        </motion.div>

        {/* Supporters Grid */}
        <motion.div
          initial="hidden"
          animate={sectionVisible ? 'visible' : 'hidden'}
          variants={fadeInUpVariants}
          custom={1}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16"
        >
          {supporters.map((supporter, index) => (
            <motion.div
              key={supporter.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sectionVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-[#e0d9c7] rounded-xl p-8 flex items-center justify-center aspect-square hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">{supporter.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join the Group CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4 }}
          className="text-center bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-12 border border-amber-200"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Become a Supporter
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join our community of supporters and help us build a better transportation marketplace
          </p>
          <Link
            href="/contact?subject=Join the group"
            className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-amber-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Join the Group
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
