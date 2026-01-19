'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
  tiltStrength?: number
}

/**
 * Magnetic cursor component with 3D tilt effect
 * Elements are attracted to cursor when it's nearby
 * Includes perspective tilt for award-winning polish
 */
export default function Magnetic({ 
  children, 
  className = '', 
  strength = 0.3,
  tiltStrength = 15 
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Spring values for smooth animations
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })

  // Transform to rotation for 3D tilt effect
  const rotateX = useTransform(y, [-100, 100], [tiltStrength, -tiltStrength])
  const rotateY = useTransform(x, [-100, 100], [-tiltStrength, tiltStrength])

  useEffect(() => {
    if (prefersReducedMotion) return

    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from center
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      // Apply magnetic effect (pull towards cursor)
      x.set(deltaX * strength)
      y.set(deltaY * strength)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      x.set(0)
      y.set(0)
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isHovered, x, y, strength, prefersReducedMotion])

  // If reduced motion is preferred, just render children without effects
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    >
      {children}
    </motion.div>
  )
}
