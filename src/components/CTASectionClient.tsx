'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTASectionClient() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rgs-green to-rgs-dark-green text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Start Your Journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl mb-8 text-white/90"
        >
          Join thousands of grad students traveling the world on points
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/blog">
            <motion.div
              whileHover={{ 
                scale: 1.08, 
                y: -3,
                boxShadow: '0 20px 50px rgba(255, 255, 255, 0.3)'
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block px-10 py-4 bg-white text-rgs-green font-bold rounded-lg shadow-lg cursor-pointer"
            >
              Start Learning Now
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
