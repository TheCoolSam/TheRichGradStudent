'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to detect if user prefers reduced motion
 * Respects the prefers-reduced-motion media query
 * Returns true if user prefers reduced motion, false otherwise
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Get animation duration based on reduced motion preference
 * @param normalDuration - Normal animation duration in seconds
 * @param reducedDuration - Reduced animation duration in seconds (default: 0.01)
 * @returns The appropriate duration based on user preference
 */
export function getAnimationDuration(normalDuration: number, reducedDuration: number = 0.01): number {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return prefersReducedMotion ? reducedDuration : normalDuration
}

/**
 * Get transition configuration for framer-motion
 * Respects reduced motion preferences
 */
export function getTransition(config: {
  duration?: number
  delay?: number
  type?: 'spring' | 'tween'
  stiffness?: number
  damping?: number
}) {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) {
    return {
      duration: 0.01,
      delay: 0,
      type: 'tween' as const
    }
  }

  return config
}
