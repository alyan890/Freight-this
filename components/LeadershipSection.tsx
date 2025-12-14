'use client'

import { motion } from 'framer-motion'
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
            Our Leadership
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guided by industry veterans with decades of experience in transportation and logistics.
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
                  {/* Professional photo - replace with actual Bob Houston image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop)',
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
                  Bob Houston
                </h3>

                <p className="text-amber-700 font-semibold text-lg mb-6">
                  Founder & CEO
                </p>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Bob Houston brings over 25 years of experience in transportation, logistics, and talent recruitment. As founder and CEO of FreightThis, he's revolutionizing how companies connect with top talent in the industry.
                  </p>

                  <p>
                    With a deep understanding of the unique challenges faced by transportation professionals, Bob envisioned a platform that prioritizes transparency, integrity, and real connections. His commitment to excellence has made FreightThis a trusted name in freight logistics recruitment.
                  </p>

                  <p>
                    A thought leader in the industry, Bob regularly speaks at transportation conferences and contributes to discussions on workforce innovation and supply chain excellence.
                  </p>
                </div>

                {/* Social Links (if needed) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={sectionVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4 mt-8"
                >
                  {['LinkedIn', 'Twitter', 'Industry Blog'].map((link) => (
                    <button
                      key={link}
                      className="px-4 py-2 text-sm font-medium text-amber-700 border border-amber-700 rounded-lg hover:bg-amber-50 transition-colors duration-300"
                    >
                      {link}
                    </button>
                  ))}
                </motion.div>
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '✓', title: 'Integrity', desc: 'Verified jobs, honest practices' },
              { icon: '◆', title: 'Transparency', desc: 'Clear communication always' },
              { icon: '↗', title: 'Innovation', desc: 'Continuous improvement mindset' },
              { icon: '◉', title: 'Community', desc: 'Supporting professional growth' },
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
        </motion.div>
      </div>
    </section>
  )
}
