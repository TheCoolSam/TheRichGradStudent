'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface HeroSectionClientProps {
  alreadyInSlug: string
}

export default function HeroSectionClient({ alreadyInSlug }: HeroSectionClientProps) {
  const { scrollY } = useScroll()
  const [count, setCount] = useState(0)
  const targetPoints = 500000

  // Parallax depth effects
  const taglineY = useTransform(scrollY, [0, 400], [0, 60])
  const taglineOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const bgY = useTransform(scrollY, [0, 500], [0, 150])

  // Smooth spring for counter
  const smoothCount = useSpring(0, { stiffness: 50, damping: 20 })

  // Counter visibility based on scroll
  const [showCounter, setShowCounter] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      const progress = Math.min(latest / 400, 1)
      smoothCount.set(Math.floor(progress * targetPoints))
      setShowCounter(latest > 50)
    })

    const unsubCount = smoothCount.on('change', (v) => setCount(Math.floor(v)))

    return () => {
      unsubscribe()
      unsubCount()
    }
  }, [scrollY, smoothCount])

  return (
    <section className="relative bg-gradient-to-br from-rgs-black via-rgs-off-black to-rgs-dark-green min-h-[600px] flex items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"
        style={{ y: bgY }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Parallax tagline */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-8"
            style={{ y: taglineY, opacity: taglineOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-white drop-shadow-[0_5px_15px_rgba(255,255,255,0.3)] mb-2">Millionaire Style Travel,</span>
            <span className="block bg-gradient-to-r from-rgs-light-green via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_5px_20px_rgba(0,255,136,0.5)]">GRAD STUDENT BUDGET</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-lg leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto px-4"
            style={{ y: useTransform(scrollY, [0, 400], [0, 30]) }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            We believe graduate students have the most to gain from mastering the points
            travel game. As a community, we often operate on limited budgets, making every
            point and discount incredibly valuable.
          </motion.p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center max-w-4xl mx-auto px-4">
            <Link href={`/articles/${alreadyInSlug}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="px-4 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-md border-2 border-rgs-light-green rounded-full shadow-lg hover:shadow-[0_10px_30px_rgba(0,255,136,0.3)] text-center w-full sm:w-auto cursor-pointer transition-shadow duration-300"
              >
                <span className="text-white font-bold text-sm sm:text-base md:text-lg">YOU&apos;RE ALREADY IN THE CREDIT CARD GAME.</span>
                <span className="text-white font-bold text-sm sm:text-base md:text-lg sm:ml-2 block sm:inline">DON&apos;T LET IT PLAY YOU.</span>
              </motion.div>
            </Link>

            <Link href="/millionaire-guide">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-rgs-green to-rgs-light-green rounded-full shadow-xl hover:shadow-[0_15px_40px_rgba(0,255,136,0.4)] border-2 border-white/30 w-full sm:w-auto text-center cursor-pointer transition-shadow duration-300"
              >
                <span className="text-white font-bold text-base sm:text-lg md:text-xl">ULTIMATE MILLIONAIRE GUIDE</span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll-linked Points Counter */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: showCounter ? 1 : 0, x: showCounter ? 0 : 100 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="bg-rgs-green/90 backdrop-blur-md px-5 py-3 rounded-full shadow-2xl border border-white/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tabular-nums">
                {count.toLocaleString()}
              </span>
              <span className="text-white/70 text-xs font-medium">
                points saved by readers
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

