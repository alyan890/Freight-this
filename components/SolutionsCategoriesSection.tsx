'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/lib/useAnimations'

const categories = [
  {
    title: 'Domestic Transportation',
    description: 'Comprehensive solutions for domestic freight, logistics, and supply chain management across the United States.',
    icon: (
      <svg className="w-12 h-12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    href: '/contact?category=domestic',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'International Transportation',
    description: 'Global freight solutions including ocean, air, and cross-border logistics with customs expertise.',
    icon: (
      <svg className="w-12 h-12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: '/contact?category=international',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Technology',
    description: 'Cutting-edge tech solutions for fleet management, route optimization, and digital transformation.',
    icon: (
      <svg className="w-12 h-12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    href: '/contact?category=technology',
    gradient: 'from-amber-500 to-orange-600',
  },
]

export default function SolutionsCategoriesSection() {
  const [sectionRef, sectionVisible] = useScrollReveal(0.15)

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Solutions Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our specialized services across transportation and technology sectors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                href={category.href}
                className="group block h-full"
              >
                <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:-translate-y-2">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative p-8 flex flex-col h-full">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`inline-flex items-center justify-center w-20 h-20 mb-6 rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}
                    >
                      {category.icon}
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                      {category.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {category.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center text-amber-700 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>Learn More</span>
                      <svg className="w-5 h-5 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
