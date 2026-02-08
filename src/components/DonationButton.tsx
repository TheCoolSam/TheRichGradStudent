'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function DonationButton() {
  return (
    <motion.a
      href="https://buy.stripe.com/00wdRb0BD5adg0Y283eAg00"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg shadow-lg cursor-pointer relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.08,
        y: -3,
        boxShadow: '0 20px 50px rgba(245, 158, 11, 0.5)'
      }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="relative z-10">☕ Buy us a coffee</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.a>
  )
}
