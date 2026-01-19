'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import PointsValueSection from '@/components/PointsValueSection'

const levelCards = [
  {
    title: "I'm new here",
    bullets: [
      'Build your credit score',
      'Learn to responsibly use credit cards',
      'Get student credit cards'
    ],
    gradient: 'from-emerald-600 to-green-700',
    category: 'new'
  },
  {
    title: 'Every Day Earning',
    bullets: [
      'Maximise points and cashback on no-fee cards',
      'The Chase ecosystem',
      '5% cashback'
    ],
    gradient: 'from-green-600 to-emerald-700',
    category: 'everyday'
  },
  {
    title: 'Travel Cards',
    bullets: [
      "Don't fear the annual fee",
      'Maximize benefits',
      'Travel in style'
    ],
    gradient: 'from-teal-600 to-cyan-700',
    category: 'travel'
  },
  {
    title: 'Credit Card Pro',
    bullets: [
      'Business and luxury credit cards',
      'Add luxury to everyday life',
      'Earn large bonuses'
    ],
    gradient: 'from-cyan-600 to-blue-700',
    category: 'pro'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with elegant dark design */}
      <section className="relative bg-gradient-to-br from-rgs-black via-rgs-off-black to-rgs-dark-green min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Millionaire Style Travel,</span>
              <br />
              <span className="text-rgs-light-green">GRAD STUDENT BUDGET</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
              We believe graduate students have the most to gain from mastering the points 
              travel game. As a community, we often operate on limited budgets, making every 
              point and discount incredibly valuable.
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="px-6 py-4 bg-white/10 backdrop-blur-md border-2 border-rgs-light-green rounded-full shadow-lg"
              >
                <span className="text-white font-bold text-lg">YOU'RE ALREADY IN THE CREDIT CARD GAME.</span>
                <span className="text-white font-bold text-lg ml-2">DON'T LET IT PLAY YOU.</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="px-8 py-5 bg-gradient-to-r from-rgs-green to-rgs-light-green rounded-full shadow-xl border-2 border-white/30"
              >
                <span className="text-white font-bold text-xl">ULTIMATE MILLIONAIRE GUIDE</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Level Selector Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-rgs-black"
          >
            Choose Your Level
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 mb-12 text-lg"
          >
            Start where you are, grow to where you want to be
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {levelCards.map((card, index) => (
              <motion.div
                key={card.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 40px rgba(6, 95, 70, 0.2)',
                }}
                className="cursor-pointer"
              >
                <Link href={`/blog?category=${card.category}`}>
                  <div className={`h-full p-8 rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-xl relative overflow-hidden group`}>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <h3 className="text-2xl font-bold mb-6 relative z-10">
                      {card.title}
                    </h3>
                    <ul className="space-y-3 relative z-10">
                      {card.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex items-start">
                          <span className="mr-2 text-white/80">•</span>
                          <span className="text-sm">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Points Value Section */}
      <PointsValueSection />

      {/* Buy Us a Coffee Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 bg-gradient-to-br from-rgs-green to-rgs-dark-green rounded-full mb-6"
          >
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 21h19v-3H2v3zM20 8H4V6h16v2zm0-4H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2h1c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
            </svg>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rgs-black">
            Support Our Work
          </h2>
          
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            We built this site specifically for fellow grad students like you. 
            Your support helps us maintain and improve the site without needing annoying ads 
            or sponsored content. Every coffee keeps us independent and focused on what matters most: helping you.
          </p>
          
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766z"/>
            </svg>
            Buy Us a Coffee
          </motion.a>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-rgs-off-black text-white">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Meet The Experts
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: 'Karan',
                role: 'Business and Personal Credit Card Expert',
                school: 'PhD Student at Rice University',
                initial: 'K'
              },
              {
                name: 'Giorgio',
                role: 'Personal Credit Card Expert, Hotel/Airfare Redemption Expert',
                school: 'PhD Student at UChicago',
                initial: 'G'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-rgs-green to-rgs-light-green flex items-center justify-center shadow-2xl relative overflow-hidden"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 30px 60px rgba(16, 185, 129, 0.4)'
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-6xl text-white font-bold">
                    {member.initial}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-white">{member.name}</h3>
                <p className="text-rgs-light-green font-medium mb-1">{member.school}</p>
                <p className="text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rgs-green to-rgs-dark-green text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of grad students traveling the world on points
          </p>
          <Link
            href="/blog"
            className="inline-block px-10 py-4 bg-white text-rgs-green font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Start Learning Now
          </Link>
        </div>
      </section>
    </main>
  )
}
