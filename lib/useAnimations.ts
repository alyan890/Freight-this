'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return [ref, isVisible] as const
}

export const useParallax = (offset = 30) => {
  const ref = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Throttle with requestAnimationFrame for better performance
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return
        
        const element = ref.current as HTMLElement
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top
        const elementHeight = rect.height
        const windowHeight = window.innerHeight

        // Calculate progress from 0 to 1 as element enters viewport
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))
        setScrollProgress(progress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return [ref, scrollProgress] as const
}
