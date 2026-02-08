'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/image'

interface TopCard {
  name: string
  image?: {
    asset?: { _ref?: string; url?: string }
  }
  slug: string
}

interface LevelCard {
  title: string
  bullets: string[]
  gradient: string
  category: string
  slug: string
  topCards?: TopCard[]
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
            <div className={`h-full p-6 rounded-3xl bg-gradient-to-br ${card.gradient} text-white shadow-xl hover:shadow-2xl relative overflow-hidden group border border-white/20 transition-shadow duration-300`}>
              {/* Animated background */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

              <h3 className="text-xl font-bold mb-4 relative z-10">
                {card.title}
              </h3>

              <ul className="space-y-2 relative z-10 mb-4" role="list">
                {card.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start">
                    <span className="mr-2 text-white/80" aria-hidden="true">•</span>
                    <span className="text-xs">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Credit Card Pyramid */}
              {card.topCards && card.topCards.length > 0 && (
                <div className="relative z-10 mt-auto pt-4 border-t border-white/20">
                  <p className="text-xs text-white/70 mb-2 text-center">Top Rated Cards</p>
                  <div className="flex flex-col items-center gap-1">
                    {/* Top card */}
                    {card.topCards[0]?.image && (
                      card.topCards[0].slug ? (
                        <Link href={`/${card.topCards[0].slug}`} className="relative w-14 h-9 rounded shadow-sm overflow-hidden transition-transform hover:scale-105">
                          <Image
                            src={urlFor(card.topCards[0].image).width(112).height(72).url()}
                            alt={card.topCards[0].name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </Link>
                      ) : (
                        <div className="relative w-14 h-9 rounded shadow-sm overflow-hidden">
                          <Image
                            src={urlFor(card.topCards[0].image).width(112).height(72).url()}
                            alt={card.topCards[0].name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    )}
                    {/* Bottom two cards */}
                    {card.topCards.length > 1 && (
                      <div className="flex gap-1">
                        {card.topCards.slice(1, 3).map((creditCard, idx) =>
                          creditCard.image ? (
                            creditCard.slug ? (
                              <Link key={idx} href={`/${creditCard.slug}`} className="relative w-14 h-9 rounded shadow-sm overflow-hidden transition-transform hover:scale-105">
                                <Image
                                  src={urlFor(creditCard.image).width(112).height(72).url()}
                                  alt={creditCard.name}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </Link>
                            ) : (
                              <div key={idx} className="relative w-14 h-9 rounded shadow-sm overflow-hidden">
                                <Image
                                  src={urlFor(creditCard.image).width(112).height(72).url()}
                                  alt={creditCard.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

