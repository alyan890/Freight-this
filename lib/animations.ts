import { Variants } from 'framer-motion'

// Fade & Scale
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

// Stagger Container
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Hover Effects
export const hoverLiftVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export const iconHoverVariants: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.15,
    rotate: 6,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

// Button Variants
export const buttonHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
  },
}

// Parallax-like effect using scroll
export const parallaxVariants = (offset: number = 50): Variants => ({
  initial: { y: 0 },
  animate: (scrollProgress: number) => ({
    y: scrollProgress * offset,
    transition: {
      type: 'tween',
      ease: 'easeOut',
    },
  }),
})
