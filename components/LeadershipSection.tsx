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
                <div
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 border-4 border-[#e0d9c7] group hover:shadow-lg transition-shadow duration-300 flex items-center justify-center p-4"
                >
                  {/* FreightThis Logo as profile image */}
                  <img 
                    src="/PNG-1.png" 
                    alt="FreightThis Logo"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover accent */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
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
                    With over 30 years of experience in the transportation and logistics industry, Bob Houston founded FreightThis with a clear vision: to transform how buyers and sellers connect in the freight marketplace.
                  </p>

                  <p>
                    Throughout his career, Bob witnessed firsthand the inefficiencies and frustrations that plague both service seekers and providers—endless cold calls, mismatched solutions, and a lack of transparency that wastes everyone's time and resources.
                  </p>

                  <p>
                    FreightThis was born from Bob's commitment to create a better way. A platform built on integrity, where buyers find vetted, quality solutions at no cost, and sellers reach genuine prospects without high-pressure tactics.
                  </p>

                  <p>
                    "Our goal is simple," Bob explains. "Connect the right people with the right solutions through transparency, respect, and genuine value. Every interaction should build trust, not erode it."
                  </p>
                </div>

                {/* LinkedIn Button */}
                <div className="mt-6">
                  <a
                    href="https://www.linkedin.com/in/bob-houston-a1a589/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-colors shadow-md hover:shadow-lg"
                    aria-label="Bob Houston's LinkedIn Profile"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
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
            <div className="text-lg text-gray-700 space-y-4 max-w-3xl mx-auto">
              <p>
                Complete the short request for services and we'll be in touch to get more details. Then it's up to us.
              </p>
              <p>
                FreightThis is constantly vetting and updating reputable service providers in the transportation space. We're gathering data which includes service offering, years in business, reputation, leadership and customer testimonials. Let us be the first line of defense as you look to better your business processes.
              </p>
              <p>
                After understanding your inquiry, we'll provide recommendations. And even schedule discovery meetings with those vendors of interest.
              </p>
              <p className="font-semibold text-amber-700">
                We look forward to serving you.
              </p>
            </div>
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
