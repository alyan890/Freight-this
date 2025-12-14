'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const values = [
  {
    title: 'Integrity',
    description: 'We verify every job posting to ensure legitimacy and protect job seekers from fraudulent listings.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Transparency',
    description: 'Clear communication between employers and candidates is key to successful hiring. We facilitate honest conversations.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Innovation',
    description: 'We continuously improve our platform with new features and technologies to make job hunting and hiring easier.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Community',
    description: 'We are building more than a job board - we are creating a community where professionals support each others growth.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2232&auto=format&fit=crop',
  },
]

const stats = [
  { label: 'Active Jobs', value: '500+' },
  { label: 'Companies', value: '100+' },
  { label: 'Job Seekers', value: '10K+' },
  { label: 'Success Rate', value: '95%' },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5])

  return (
    <div className="bg-[#faf8f3]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-[#f5f0e6] to-[#faf8f3] flex items-center">
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: parallaxY }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2787&auto=format&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f3]/95 via-[#faf8f3]/85 to-[#faf8f3]/95" />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0.2, scale: 1 }}
            animate={{ opacity: 0.1, scale: 1.1 }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute top-20 right-1/4 w-96 h-96 bg-amber-200 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0.15, scale: 1.1 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
            className="absolute bottom-20 left-1/4 w-96 h-96 bg-amber-100 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold"
            >
              About FreightThis
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to the{' '}
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Future of Hiring
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're revolutionizing the transportation and logistics industry by building a platform that prioritizes quality, transparency, and meaningful connections.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/jobs"
                className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Jobs
              </a>
              <a
                href="/contact"
                className="inline-block bg-white text-amber-700 border-2 border-amber-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-50 transition-all shadow-sm hover:shadow-md"
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image with Parallax */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ opacity }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Floating badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Trusted by</div>
                    <div className="text-lg font-bold text-gray-900">100+ Companies</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-8 -right-8 w-24 h-24 bg-amber-200 rounded-full opacity-50 blur-xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-amber-100 rounded-full opacity-50 blur-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-[#e0d9c7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                  className="text-4xl md:text-5xl font-bold text-amber-700 mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  At FreightThis, we believe that finding the right job should be simple, transparent, and rewarding. Our mission is to create a platform that connects talented professionals with companies that value their skills and potential.
                </p>
                <p>
                  We're committed to building a job portal that prioritizes quality over quantity, ensuring that every job listing is vetted and every application is treated with respect.
                </p>
                <p>
                  By leveraging technology and maintaining a human touch, we're transforming how the transportation industry approaches hiring and career development.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section with Image Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at FreightThis
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-[#e0d9c7]"
              >
                {/* Image Background */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${value.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Icon with professional background */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center shadow-xl"
                  >
                    {value.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-1 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full mt-4"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-[#f5f0e6] to-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A seamless experience for both job seekers and employers
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainerVariants}
            className="space-y-8"
          >
            {[
              {
                number: '1',
                title: 'For Job Seekers',
                description: 'Browse verified job listings, filter by category and location, and apply with your resume. Get notified when employers review your application.',
                image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
              },
              {
                number: '2',
                title: 'For Employers',
                description: 'Post your job openings with detailed descriptions. Our team reviews and approves listings within 24-48 hours. Receive applications directly and manage candidates efficiently.',
                image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
              },
              {
                number: '3',
                title: 'Quality Assurance',
                description: 'Every job posting is reviewed by our team before going live. Jobs automatically expire after 30 days to keep listings fresh and relevant.',
                image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center bg-white rounded-2xl p-8 shadow-lg border border-[#e0d9c7]`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full lg:w-1/2 h-64 rounded-xl overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${step.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>

                <div className="w-full lg:w-1/2">
                  <div className="flex items-start gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg"
                    >
                      {step.number}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-amber-50 mb-8">
              Join thousands of professionals finding their next opportunity
            </p>
            <motion.a
              href="/jobs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-50 transition-colors shadow-xl"
            >
              Browse Jobs
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
