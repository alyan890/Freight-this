'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeInUpVariants, scaleInVariants } from '@/lib/animations'
import { useScrollReveal } from '@/lib/useAnimations'

export default function LeadershipSection() {
  const [sectionRef, sectionVisible] = useScrollReveal(0.15)

  return (
    <section className="py-24 bg-[#faf8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={sectionVisible ? 'visible' : 'hidden'}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About FreightThis
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connecting transportation buyers and sellers with integrity and transparency
          </p>
        </motion.div>

        {/* Bob Houston Leadership Profile */}
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={sectionVisible ? 'visible' : 'hidden'}
          variants={fadeInUpVariants}
          custom={1}
        >
          <div className="bg-white border border-[#e0d9c7] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Avatar Section */}
              <motion.div
                variants={scaleInVariants}
                className="flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 border-4 border-[#e0d9c7] group"
                >
                  {/* FreightThis Logo as profile image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: 'url(/WhatsApp_Image_2025-12-12_at_1.36.44_AM-removebg-preview.png)',
                    }}
                  />
                  
                  {/* Hover accent */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent"
                  />
                </motion.div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                variants={fadeInUpVariants}
                custom={2}
                className="flex flex-col justify-center"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Our Mission
                </h3>

                <p className="text-amber-700 font-semibold text-lg mb-6">
                  Revolutionizing Transportation Connections
                </p>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    FreightThis is dedicated to transforming how transportation buyers and sellers connect. We eliminate the noise of endless sales calls and emails, creating a trusted platform where real solutions meet genuine needs.
                  </p>

                  <p>
                    For buyers, we provide a curated marketplace of vetted solutions tailored to your specific requirements—at no charge. For sellers, we offer a dignified way to reach potential customers without the traditional high-pressure tactics.
                  </p>

                  <p>
                    Our commitment is simple: connect the right people with the right solutions through transparency, integrity, and respect for everyone's time.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Core Values Below Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: '✓', title: 'Integrity', desc: 'Vetted, reputable service and solutions providers' },
              { icon: '◉', title: 'Community', desc: 'Building a community where professionals support each other\'s growth' },
              { icon: '↗', title: 'Innovation', desc: 'Continuously improving our platform with new features; kindly share feedback' },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {value.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-8 md:p-12 border border-amber-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
              How It Works
            </h3>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
              Tell us what you're looking for along with timeframe and budget (if you know), and we'll present the best options for you to explore.
            </p>
            <div className="flex justify-center mt-8">
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-amber-800 hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
