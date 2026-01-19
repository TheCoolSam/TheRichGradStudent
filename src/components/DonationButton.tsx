'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function DonationButton() {
  return (
    <motion.a
      href="https://donate.stripe.com/your-stripe-payment-link"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(245, 158, 11, 0.4)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      ☕ Buy us a coffee
    </motion.a>
  )
}
