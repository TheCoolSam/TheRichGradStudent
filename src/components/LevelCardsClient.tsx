'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Magnetic from './Magnetic'

interface LevelCard {
  title: string
  bullets: string[]
  gradient: string
  category: string
  slug: string
}

interface LevelCardsClientProps {
  cards: LevelCard[]
}

export default function LevelCardsClient({ cards }: LevelCardsClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Magnetic key={card.category} strength={0.2} tiltStrength={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              y: -10,
              transition: { type: 'spring', stiffness: 300, damping: 30 }
            }}
            className="cursor-pointer h-full"
            role="article"
            aria-label={`${card.title} credit card category`}
          >
          <Link 
            href={`/${card.slug}`}
            aria-label={`Read about ${card.title}`}
          >
            <div className={`h-full p-8 rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-xl relative overflow-hidden group`}>
              {/* Animated background */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              
              <h3 className="text-2xl font-bold mb-6 relative z-10">
                {card.title}
              </h3>
              
              <ul className="space-y-3 relative z-10" role="list">
                {card.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start">
                    <span className="mr-2 text-white/80" aria-hidden="true">•</span>
                    <span className="text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </motion.div>        </Magnetic>      ))}
    </div>
  )
}
