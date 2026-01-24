'use client'

import { motion } from 'framer-motion'
import EmailSignup from './EmailSignup'

export default function CTASectionClient() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rgs-green to-rgs-dark-green text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <EmailSignup />
        </motion.div>
      </div>
    </section>
  )
}
