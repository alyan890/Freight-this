'use client'

import { motion } from 'framer-motion'
import { fadeInUpVariants } from '@/lib/animations'
import { useScrollReveal } from '@/lib/useAnimations'

// Sample partner logos (in real app, these would be images)
const partners = [
  { id: 1, name: 'Oway.io', logo: 'TF' },
  { id: 2, name: 'Carrier1.com', logo: 'LH' },
  { id: 3, name: 'Envoy.ai', logo: 'CE' },
  { id: 4, name: 'Verified Carrier', logo: 'SM' },
  { id: 5, name: 'Oway.io', logo: 'TN' },
  { id: 6, name: 'Carrier1.com', logo: 'FC' },
  { id: 7, name: 'Envoy.ai', logo: 'RL' },
  { id: 8, name: 'Verified Carrier', logo: 'DH' },
]

export default function PartnersSection() {
  const [sectionRef, sectionVisible] = useScrollReveal(0.15)

  return (
    <section className="py-24 bg-linear-to-br from-[#f5f0e6] to-[#faf8f3] relative overflow-hidden">
      {/* Subtle background parallax */}
      <motion.div
        initial={{ opacity: 0.05 }}
        animate={{ opacity: 0.08 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-20" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={sectionVisible ? 'visible' : 'hidden'}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leading transportation and logistics companies trust FreightThis to find their next great team members.
          </p>
        </motion.div>

        {/* Logo Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: -1200 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            }}
            className="flex gap-8 min-w-max"
          >
            {/* First set of logos */}
            {partners.map((partner) => (
              <motion.div
                key={`${partner.id}-1`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="shrink-0 group cursor-pointer"
              >
                <div className="bg-white rounded-lg border border-[#e0d9c7] p-8 h-20 w-32 flex items-center justify-center hover:shadow-lg hover:border-amber-300 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-linear-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent group-hover:from-amber-700 group-hover:to-amber-800 transition-all">
                      {partner.logo}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{partner.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {partners.map((partner) => (
              <motion.div
                key={`${partner.id}-2`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="shrink-0 group cursor-pointer"
              >
                <div className="bg-white rounded-lg border border-[#e0d9c7] p-8 h-20 w-32 flex items-center justify-center hover:shadow-lg hover:border-amber-300 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-linear-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent group-hover:from-amber-700 group-hover:to-amber-800 transition-all">
                      {partner.logo}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{partner.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient fade on edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#f5f0e6] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#f5f0e6] to-transparent pointer-events-none" />
        </div>

        {/* Trust stats below carousel */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {[
            { stat: '500+', label: 'Partner Companies' },
            { stat: '98%', label: 'Satisfaction Rate' },
            { stat: '10K+', label: 'Placements Made' },
          ].map((item, i) => (
            <div key={i} className="group">
              <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2 group-hover:text-amber-800 transition-colors">
                {item.stat}
              </div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          ))}
        </motion.div> */}
      </div>
    </section>
  )
}
