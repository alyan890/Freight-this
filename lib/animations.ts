import { Variants } from 'framer-motion'

// Optimized Fade & Scale - Reduced duration and delays
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.05,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
}

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
}

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
}

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.05,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
}

// Optimized Stagger Container - Reduced stagger delay
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

// Optimized Hover Effects - Reduced animation distance and duration
export const hoverLiftVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
}

export const iconHoverVariants: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 3,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
}

// Optimized Button Variants - Reduced duration
export const buttonHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.97,
  },
}

// Lightweight parallax using GPU acceleration
export const parallaxVariants = (offset: number = 30): Variants => ({
  initial: { y: 0 },
  animate: (scrollProgress: number) => ({
    y: scrollProgress * offset,
    transition: {
      type: 'tween',
      ease: 'linear',
      duration: 0,
    },
  }),
})
