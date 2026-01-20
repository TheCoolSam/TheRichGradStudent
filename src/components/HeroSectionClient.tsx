'use client'

import { motion } from 'framer-motion'

export default function HeroSectionClient() {
  return (
    <section className="relative bg-gradient-to-br from-rgs-black via-rgs-off-black to-rgs-dark-green min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Millionaire Style Travel,</span>
            <br />
            <span className="text-rgs-light-green">GRAD STUDENT BUDGET</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-lg leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
            We believe graduate students have the most to gain from mastering the points 
            travel game. As a community, we often operate on limited budgets, making every 
            point and discount incredibly valuable.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="px-4 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-md border-2 border-rgs-light-green rounded-full shadow-lg text-center w-full sm:w-auto"
            >
              <span className="text-white font-bold text-sm sm:text-base md:text-lg">YOU'RE ALREADY IN THE CREDIT CARD GAME.</span>
              <span className="text-white font-bold text-sm sm:text-base md:text-lg sm:ml-2 block sm:inline">DON'T LET IT PLAY YOU.</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-rgs-green to-rgs-light-green rounded-full shadow-xl border-2 border-white/30 w-full sm:w-auto text-center"
            >
              <span className="text-white font-bold text-base sm:text-lg md:text-xl">ULTIMATE MILLIONAIRE GUIDE</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
