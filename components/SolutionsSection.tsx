'use client'

import { motion } from 'framer-motion'
import { fadeInUpVariants, staggerContainerVariants, hoverLiftVariants, iconHoverVariants } from '@/lib/animations'
import { useScrollReveal } from '@/lib/useAnimations'

const solutions = [
  {
    icon: (
      <svg className="w-8 h-8 text-amber-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    title: 'Quality Partnerships',
    description: 'All partnership postings are verified and approved by our team to ensure quality, legitimacy, and relevance to the transportation industry.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-amber-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    ),
    title: 'Connect with Supporters',
    description: 'Connect with supporter partners through our streamlined process. Share requirements and collaborate with vetted professionals in the transportation industry.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-amber-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    title: 'Real-Time Updates',
    description: 'Get instant notifications when new partnership opportunities are posted on our platform.',
  },
]

export default function SolutionsSection() {
  const [sectionRef, sectionVisible] = useScrollReveal(0.15)

  return (
    <section className="py-24 bg-[#faf8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={sectionVisible ? 'visible' : 'hidden'}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose FreightThis?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides everything you need to discover and build quality partnerships in the transportation and logistics industry.
          </p>
        </motion.div>

        <motion.div
          ref={sectionRef}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={sectionVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {solutions.map((solution, i) => (
            <motion.div
              key={i}
              variants={fadeInUpVariants}
              whileHover="hover"
              initial="initial"
              className="group"
            >
              <motion.div
                variants={hoverLiftVariants}
                className="bg-white border border-[#e0d9c7] rounded-xl p-8 h-full shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <motion.div
                  variants={iconHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  className="w-14 h-14 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg flex items-center justify-center mb-6 group-hover:from-amber-100 group-hover:to-amber-200 transition-colors duration-300"
                >
                  {solution.icon}
                </motion.div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {solution.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {solution.description}
                </p>

                {/* Animated bottom border accent */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: 40 }}
                  transition={{ duration: 0.3 }}
                  className="h-1 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full mt-6"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
