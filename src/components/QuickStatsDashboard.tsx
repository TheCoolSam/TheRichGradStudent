'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Rating } from '@/types/sanity'
import RatingBadge from './RatingBadge'
import { formatEarningRate } from '@/utils/cardMath'

interface CardStats {
  annualFee: number
  annualCredits: number
  rewardType?: 'points' | 'cashback'
  travelMultiplier?: number
  groceryMultiplier?: number
  gasMultiplier?: number
  diningMultiplier?: number
  pharmacyMultiplier?: number
  otherMultiplier?: number
  signupBonusValue?: string
  signupBonusRating?: Rating
}

interface QuickStatsDashboardProps {
  card: CardStats
}

export default function QuickStatsDashboard({ card }: QuickStatsDashboardProps) {
  // Calculate net annual fee
  const netAnnualFee = card.annualFee - card.annualCredits
  const rewardType: 'points' | 'cashback' = card.rewardType || 'points' // Default to points if not specified

  // Find the best earning rate (excluding signup bonus)
  const earningRates = [
    card.travelMultiplier || 0,
    card.groceryMultiplier || 0,
    card.gasMultiplier || 0,
    card.diningMultiplier || 0,
    card.pharmacyMultiplier || 0,
    card.otherMultiplier || 0
  ].filter(rate => rate > 0)

  const bestEarnRate = earningRates.length > 0 ? Math.max(...earningRates) : 1

  const cards = [
    {
      title: 'Signup Bonus',
      value: card.signupBonusValue || 'N/A',
      gradient: 'from-green-50 to-emerald-50',
      border: 'border-2 border-green-300',
      badge: card.signupBonusRating,
    },
    {
      title: 'Best Earn Rate',
      value: formatEarningRate(bestEarnRate, rewardType),
      subtitle: rewardType === 'points' ? 'Points' : 'Cash Back',
      gradient: 'from-blue-50 to-cyan-50',
      border: 'border border-blue-200',
    },
    {
      title: 'Net Annual Fee',
      value: `$${netAnnualFee}`,
      subtitle: netAnnualFee < 0 ? 'Net Credit!' : netAnnualFee === 0 ? 'Free!' : 'After Credits',
      gradient: 'from-purple-50 to-pink-50',
      border: 'border border-purple-200',
    },
  ]

  return (
    <div className="my-10 grid grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((cardData, index) => (
        <motion.div
          key={cardData.title}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          whileHover={{
            scale: 1.05,
            y: -5,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }}
          className={`bg-gradient-to-br ${cardData.gradient} ${cardData.border} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer`}
        >
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
            {cardData.title}
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {cardData.value}
          </div>
          {cardData.badge && (
            <RatingBadge rating={cardData.badge} size="sm" />
          )}
          {cardData.subtitle && (
            <div className="text-xs text-gray-600">
              {cardData.subtitle}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
