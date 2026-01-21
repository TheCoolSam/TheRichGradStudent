'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

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
        <motion.div
          key={card.category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1]
          }}
          whileHover={{
            y: -8,
            scale: 1.02,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }}
          className="cursor-pointer h-full"
          role="article"
          aria-label={`${card.title} credit card category`}
        >
          <Link 
            href={`/articles/${card.slug}`}
            aria-label={`Read about ${card.title}`}
          >
            <div className={`h-full p-8 rounded-3xl bg-gradient-to-br ${card.gradient} text-white shadow-xl hover:shadow-2xl relative overflow-hidden group border border-white/20 transition-shadow duration-300`}>
              {/* Animated background */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              
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
        </motion.div>
      ))}
    </div>
  )
}
