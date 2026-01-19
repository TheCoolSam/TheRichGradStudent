'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CreditCardImage {
  image: any
  name: string
}

interface PointValueCard {
  _id: string
  name: string
  logo?: any
  baseValue: number
  bestRedemption: number
  order: number
  topCards?: CreditCardImage[]
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
  { _id: 'mock-1', name: 'Chase', baseValue: 2, bestRedemption: 7, order: 1 },
  { _id: 'mock-2', name: 'Bilt', baseValue: 2, bestRedemption: 4, order: 2 },
  { _id: 'mock-3', name: 'Capital One', baseValue: 1.5, bestRedemption: 6, order: 3 },
  { _id: 'mock-4', name: 'Amex', baseValue: 1.5, bestRedemption: 5, order: 4 },
  { _id: 'mock-5', name: 'American Airlines', baseValue: 1.5, bestRedemption: 4.5, order: 5 },
  { _id: 'mock-6', name: 'United', baseValue: 1.3, bestRedemption: 4, order: 6 },
  { _id: 'mock-7', name: 'Southwest', baseValue: 1.4, bestRedemption: 1.5, order: 7 },
  { _id: 'mock-8', name: 'Hilton', baseValue: 0.5, bestRedemption: 0.8, order: 8 },
  { _id: 'mock-9', name: 'Marriott', baseValue: 0.8, bestRedemption: 1.2, order: 9 },
  { _id: 'mock-10', name: 'Hyatt', baseValue: 1.5, bestRedemption: 2.5, order: 10 },
]

export default function PointsValueSection() {
  const [data, setData] = useState<PointValueData>({
    title: 'Maximize Your Points Value',
    cards: mockPointValues
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    async function fetchPointValues() {
      try {
        // First get the pointValue document
        const pointValueDoc = await client.fetch<any>(
          `*[_type == "pointValue"][0]`
        )
        
        if (!pointValueDoc) {
          console.log('No pointValue document found')
          return
        }
        
        // For each card in the pointValue, fetch related credit cards
        const cardsWithTopRated = await Promise.all(
          (pointValueDoc.cards || []).map(async (card: any) => {
            // Find credit cards that reference this specific point program
            // We need to match by name since we don't have the nested document ID
            const topCards = await client.fetch<CreditCardImage[]>(
              `*[_type == "creditCard" && pointsProgram->name == $programName] | order(
                select(
                  signupBonusRating == "great" => 4,
                  signupBonusRating == "rgs-wallet" => 4,
                  signupBonusRating == "good" => 3,
                  signupBonusRating == "poor" => 2,
                  true => 1
                ) desc,
                publishedAt desc
              )[0..2]{
                name,
                image
              }`,
              { programName: card.name }
            )
            
            return {
              ...card,
              _id: card.name, // Use name as ID for carousel key
              topCards
            }
          })
        )
        
        setData({
          title: pointValueDoc.title || 'Maximize Your Points Value',
          cards: cardsWithTopRated
        })
      } catch (error) {
        console.log('Error fetching point values:', error)
        console.log('Using mock data for points values')
      }
    }

    fetchPointValues()
  }, [])

  const sortedCards = [...data.cards].sort((a, b) => (a.order || 0) - (b.order || 0))

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % sortedCards.length)
  }

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + sortedCards.length) % sortedCards.length)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

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
            aria-label={`Previous cards, currently showing ${sortedCards[activeIndex]?.name}`}
            aria-controls="points-carousel"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-rgs-green p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label={`Next cards, currently showing ${sortedCards[activeIndex]?.name}`}
            aria-controls="points-carousel"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div 
            id="points-carousel"
            role="region"
            aria-label="Points value comparison carousel"
            className="relative h-[440px] w-full overflow-hidden"
          >
            {sortedCards.map((card, i) => (
              <Card
                key={card._id || card.name}
                card={card}
                index={i}
                activeIndex={activeIndex}
                totalCards={sortedCards.length}
                prefersReducedMotion={prefersReducedMotion}
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
  prefersReducedMotion: boolean
}

const Card: React.FC<CardProps> = ({ card, index, activeIndex, totalCards, prefersReducedMotion }) => {
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
      layout
      layoutId={`card-${card.name}`}
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
      }}
      initial={false}
      animate={{
        translateX: x,
        translateY: '-50%',
        scale,
        opacity,
        zIndex,
      }}
      transition={{
        layout: { 
          type: prefersReducedMotion ? 'tween' : 'spring', 
          stiffness: prefersReducedMotion ? undefined : 260, 
          damping: prefersReducedMotion ? undefined : 20,
          duration: prefersReducedMotion ? 0.01 : undefined
        },
        opacity: { duration: prefersReducedMotion ? 0.01 : 0.2 },
        type: prefersReducedMotion ? 'tween' : 'spring',
        stiffness: prefersReducedMotion ? undefined : 260,
        damping: prefersReducedMotion ? undefined : 20,
        duration: prefersReducedMotion ? 0.01 : undefined
      }}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 w-64 min-h-[360px] flex flex-col">
        {card.logo && (
          <div className="relative h-12 mb-4">
            <Image
              src={urlFor(card.logo).width(100).height(50).url()}
              alt={card.name}
              fill
              sizes="100px"
              quality={90}
              className="object-contain"
            />
          </div>
        )}
        <h3 className="font-bold text-lg mb-2 text-rgs-black">{card.name}</h3>
        <div className="space-y-1 text-sm mb-4">
          <p className="text-gray-600">
            Value: <span className="font-bold text-rgs-green">{card.baseValue}¢</span>
          </p>
          <p className="text-gray-600">
            Our Best Redemption:{' '}
            <span className="font-bold text-rgs-green">{card.bestRedemption}¢</span>
          </p>
        </div>
        
        {/* Pyramid of Top 3 Credit Cards */}
        {card.topCards && card.topCards.length > 0 && (
          <div className="mt-auto">
            <p className="text-xs text-gray-500 mb-2 font-semibold">Top Rated Cards:</p>
            <div className="flex flex-col items-center gap-1">
              {/* Top card (centered) */}
              {card.topCards[0] && (
                <div className="relative w-16 h-10 rounded shadow-sm overflow-hidden">
                  <Image
                    src={urlFor(card.topCards[0].image).width(64).height(40).url()}
                    alt={card.topCards[0].name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* Bottom two cards (side by side) */}
              <div className="flex gap-1 justify-center">
                {card.topCards[1] && (
                  <div className="relative w-14 h-9 rounded shadow-sm overflow-hidden">
                    <Image
                      src={urlFor(card.topCards[1].image).width(56).height(36).url()}
                      alt={card.topCards[1].name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                )}
                {card.topCards[2] && (
                  <div className="relative w-14 h-9 rounded shadow-sm overflow-hidden">
                    <Image
                      src={urlFor(card.topCards[2].image).width(56).height(36).url()}
                      alt={card.topCards[2].name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
