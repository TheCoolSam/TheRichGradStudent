'use client'

import { m, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

interface HeroSectionClientProps {
  alreadyInSlug: string
}

export default function HeroSectionClient({ alreadyInSlug }: HeroSectionClientProps) {
  const { scrollY } = useScroll()

  // Parallax depth effects
  const taglineY = useTransform(scrollY, [0, 400], [0, 60])
  const taglineOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const bgY = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <section className="relative bg-gradient-to-br from-rgs-black via-rgs-off-black to-rgs-dark-green min-h-[600px] flex items-center overflow-hidden">
      {/* Parallax background */}
      <m.div
        className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"
        style={{ y: bgY }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Parallax tagline */}
          <m.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-8"
            style={{ y: taglineY, opacity: taglineOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-white drop-shadow-[0_5px_15px_rgba(255,255,255,0.3)] mb-2">Upgraded Travel,</span>
            <span className="block bg-gradient-to-r from-rgs-light-green via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_5px_20px_rgba(0,255,136,0.5)]">GRAD STUDENT BUDGET</span>
          </m.h1>

          <m.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-lg leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto px-4"
            style={{ y: useTransform(scrollY, [0, 400], [0, 30]) }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            We learned points, miles, and reimbursements maximization the hard way in grad school.<br />Here is the knowledge we wish we had.
          </m.p>

          <div className="flex flex-col gap-6 justify-center items-center max-w-4xl mx-auto px-4 w-full">
            <Link href={`/articles/${alreadyInSlug}`} className="w-full max-w-2xl">
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="px-6 py-4 bg-white/10 backdrop-blur-md border-2 border-rgs-light-green rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(0,255,136,0.3)] text-center w-full cursor-pointer transition-shadow duration-300"
              >
                <span className="text-white font-bold text-sm sm:text-lg md:text-xl block">YOU&apos;RE ALREADY IN THE CREDIT CARD GAME.</span>
                <span className="text-white font-bold text-sm sm:text-lg md:text-xl block mt-1">DON&apos;T LET IT PLAY YOU.</span>
              </m.div>
            </Link>

            <Link href="/millionaire-guide" className="w-full max-w-md">
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="px-8 py-4 bg-gradient-to-r from-rgs-green to-rgs-light-green rounded-full shadow-xl hover:shadow-[0_15px_40px_rgba(0,255,136,0.4)] border-2 border-white/30 w-full text-center cursor-pointer transition-shadow duration-300"
              >
                <span className="text-white font-bold text-base sm:text-lg md:text-xl">POINT MILLIONAIRE GUIDE</span>
              </m.div>
            </Link>

          </div>
        </m.div>
      </div>
    </section>
  )
}
