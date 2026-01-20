'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/image'
import Image from 'next/image'

interface PointValueCard {
  _id: string
  name: string
  logo?: any
  baseValue: number
  bestRedemption: number
  order: number
  topCards?: CreditCardImage[]
}

interface CreditCardImage {
  image: any
  name: string
}

interface PointValueData {
  title: string
  cards: PointValueCard[]
}

interface PointsValueSectionProps {
  data: PointValueData | null
}

// Configuration - responsive card widths
const getCardWidth = () => {
  if (typeof window === 'undefined') return 256
  return window.innerWidth < 640 ? 200 : 256
}
const getCardGap = () => {
  if (typeof window === 'undefined') return 32
  return window.innerWidth < 640 ? 20 : 32
}

export default function PointsValueSection({ data }: PointsValueSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 256, gap: 32 })

  // Update dimensions on mount and resize
  React.useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: getCardWidth(),
        gap: getCardGap()
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Don't render if no data
  if (!data || !data.cards || data.cards.length === 0) {
    return null
  }

  const sortedCards = [...data.cards].sort((a, b) => (a.order || 0) - (b.order || 0))

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setActiveIndex((prev) => prev - 1)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rgs-green to-rgs-dark-green">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
        >
          {data.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-white/90 mb-12 text-lg"
        >
          Updated point valuations for maximum redemption value
        </motion.p>

        <div className="relative max-w-5xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-rgs-green p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Previous cards"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-rgs-green p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Next cards"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="relative h-[360px] sm:h-[400px] w-full overflow-hidden px-2 sm:px-0">
            {sortedCards.map((card, i) => (
              <Card
                key={card.name}
                card={card}
                index={i}
                activeIndex={activeIndex}
                totalCards={sortedCards.length}
                spacing={dimensions.width + dimensions.gap}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Individual Card Component
interface CardProps {
  card: PointValueCard
  index: number
  activeIndex: number
  totalCards: number
  spacing: number
}

const Card: React.FC<CardProps> = ({ card, index, activeIndex, totalCards, spacing }) => {
  // Calculate effective index with proper modulo for negative numbers
  const effectiveIndex = ((activeIndex % totalCards) + totalCards) % totalCards
  
  // Calculate offset from center
  let offset = index - effectiveIndex
  
  // Wrap around logic for shortest path
  if (offset > totalCards / 2) {
    offset -= totalCards
  } else if (offset < -totalCards / 2) {
    offset += totalCards
  }

  // Visual properties based on offset
  const isCenter = offset === 0
  const isVisible = Math.abs(offset) <= 1
  
  const x = offset * spacing
  const scale = isCenter ? 1.1 : 0.95
  const opacity = isCenter ? 1 : isVisible ? 0.7 : 0
  const zIndex = isCenter ? 10 : 1
  
  // Responsive card width
  const cardWidth = typeof window !== 'undefined' && window.innerWidth < 640 ? 'w-[200px]' : 'w-64'

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={false}
      animate={{
        x: `calc(-50% + ${x}px)`,
        y: '-50%',
        scale,
        opacity,
        zIndex,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className={`bg-white rounded-lg p-4 sm:p-6 shadow-lg border border-gray-100 ${cardWidth} h-[300px] sm:h-[320px] flex flex-col`}>
        {card.logo && (
          <div className="relative h-10 sm:h-12 mb-3 sm:mb-4">
            <Image
              src={urlFor(card.logo).width(100).height(50).url()}
              alt={card.name}
              fill
              className="object-contain"
            />
          </div>
        )}
        <h3 className="font-bold text-base sm:text-lg mb-2 text-rgs-black">{card.name}</h3>
        <div className="space-y-1 text-xs sm:text-sm mb-3 sm:mb-4">
          <p className="text-gray-600">
            Value: <span className="font-bold text-rgs-green">{card.baseValue}¢</span>
          </p>
          <p className="text-gray-600">
            Our Best Redemption:{' '}
            <span className="font-bold text-rgs-green">{card.bestRedemption}¢</span>
          </p>
        </div>

        {/* Credit Card Pyramid */}
        {card.topCards && card.topCards.length > 0 && (
          <div className="mt-auto">
            <p className="text-xs text-gray-500 mb-2 text-center">Top Rated Cards</p>
            <div className="flex flex-col items-center gap-1">
              {/* Top card */}
              {card.topCards[0] && (
                <div className="relative w-16 h-10 rounded shadow-sm overflow-hidden">
                  <Image
                    src={urlFor(card.topCards[0].image).width(128).height(80).url()}
                    alt={card.topCards[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {/* Bottom two cards */}
              {card.topCards.length > 1 && (
                <div className="flex gap-1">
                  {card.topCards.slice(1, 3).map((creditCard, idx) => (
                    <div key={idx} className="relative w-16 h-10 rounded shadow-sm overflow-hidden">
                      <Image
                        src={urlFor(creditCard.image).width(128).height(80).url()}
                        alt={creditCard.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
