'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUpVariants } from '@/lib/animations'

interface NewsItem {
  title: string
  summary: string
  link: string
  pubDate: string
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        const data = await response.json()
        
        if (data.success && data.news) {
          setNews(data.news)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error loading news:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Industry & Market News
          </h2>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error || news.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Industry & Market News
          </h2>
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <p className="text-gray-500 text-lg">Market news unavailable</p>
            <p className="text-gray-400 text-sm mt-2">Please check back later</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white border-t border-[#e0d9c7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industry & Market News
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest market trends and logistics industry updates
          </p>
        </motion.div>

        {/* News List - Bullet style */}
        <div className="max-w-3xl mx-auto space-y-3">
          {news.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 py-2 group hover:translate-x-1 transition-transform"
            >
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                <span className="inline-block w-2 h-2 bg-amber-700 rounded-full group-hover:scale-150 transition-transform"></span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {item.summary}
                </p>
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {new Date(item.pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Footer with attribution */}
        <div className="text-center mt-8 pt-4 border-t border-[#e0d9c7]">
          <p className="text-sm text-gray-500">
            News sources: <span className="font-semibold">FreightWaves</span> • Updated every 5 minutes
          </p>
        </div>
      </div>
    </section>
  )
}
