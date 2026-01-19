'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'
import Image from 'next/image'

interface PointValueCard {
  name: string
  logo?: any
  baseValue: number
  bestRedemption: number
  order: number
}

interface PointValueData {
  title: string
  cards: PointValueCard[]
}

// Configuration
const CARD_WIDTH = 256
const CARD_GAP = 32
const SPACING = CARD_WIDTH + CARD_GAP // 288px

// Mock data fallback
const mockPointValues: PointValueCard[] = [
  { name: 'Chase', baseValue: 2, bestRedemption: 7, order: 1 },
  { name: 'Bilt', baseValue: 2, bestRedemption: 4, order: 2 },
  { name: 'Capital One', baseValue: 1.5, bestRedemption: 6, order: 3 },
  { name: 'Amex', baseValue: 1.5, bestRedemption: 5, order: 4 },
  { name: 'American Airlines', baseValue: 1.5, bestRedemption: 4.5, order: 5 },
  { name: 'United', baseValue: 1.3, bestRedemption: 4, order: 6 },
  { name: 'Southwest', baseValue: 1.4, bestRedemption: 1.5, order: 7 },
  { name: 'Hilton', baseValue: 0.5, bestRedemption: 0.8, order: 8 },
  { name: 'Marriott', baseValue: 0.8, bestRedemption: 1.2, order: 9 },
  { name: 'Hyatt', baseValue: 1.5, bestRedemption: 2.5, order: 10 },
]

export default function PointsValueSection() {
  const [data, setData] = useState<PointValueData>({
    title: 'Maximize Your Points Value',
    cards: mockPointValues
  })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    async function fetchPointValues() {
      try {
        const result = await client.fetch<PointValueData>(
          `*[_type == "pointValue"][0]{
            title,
            cards[]{
              name,
              logo,
              baseValue,
              bestRedemption,
              order
            }
          }`
        )
        if (result && result.cards) {
          setData(result)
        }
      } catch (error) {
        console.log('Using mock data for points values')
      }
    }

    fetchPointValues()
  }, [])

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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-rgs-green p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Previous cards"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-rgs-green p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Next cards"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="relative h-[400px] w-full overflow-hidden">
            {sortedCards.map((card, i) => (
              <Card
                key={card.name}
                card={card}
                index={i}
                activeIndex={activeIndex}
                totalCards={sortedCards.length}
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
}

const Card: React.FC<CardProps> = ({ card, index, activeIndex, totalCards }) => {
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
  
  const x = offset * SPACING
  const scale = isCenter ? 1.1 : 0.95
  const opacity = isCenter ? 1 : isVisible ? 0.7 : 0
  const zIndex = isCenter ? 10 : 1

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
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 w-64 h-[320px] flex flex-col">
        {card.logo && (
          <div className="relative h-12 mb-4">
            <Image
              src={urlFor(card.logo).width(100).height(50).url()}
              alt={card.name}
              fill
              className="object-contain"
            />
          </div>
        )}
        <h3 className="font-bold text-lg mb-2 text-rgs-black">{card.name}</h3>
        <div className="space-y-1 text-sm flex-grow">
          <p className="text-gray-600">
            Value: <span className="font-bold text-rgs-green">{card.baseValue}┬ó</span>
          </p>
          <p className="text-gray-600">
            Our Best Redemption:{' '}
            <span className="font-bold text-rgs-green">{card.bestRedemption}┬ó</span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
