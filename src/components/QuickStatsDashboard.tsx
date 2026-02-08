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
  // Category ratings (used to derive RGS Wallet categories)
  travelRating?: string
  groceryRating?: string
  gasRating?: string
  diningRating?: string
  pharmacyRating?: string
  otherRating?: string
}

interface QuickStatsDashboardProps {
  card: CardStats
}

// Map category names for display
const categoryLabels: Record<string, string> = {
  travel: 'Travel',
  grocery: 'Groceries',
  gas: 'Gas',
  dining: 'Dining',
  pharmacy: 'Pharmacy',
  other: 'Other',
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

  // Derive RGS Wallet categories from ratings where value is 'rgs-wallet'
  const rgsWalletCategories: string[] = []
  if (card.travelRating === 'rgs-wallet') rgsWalletCategories.push(categoryLabels.travel)
  if (card.groceryRating === 'rgs-wallet') rgsWalletCategories.push(categoryLabels.grocery)
  if (card.gasRating === 'rgs-wallet') rgsWalletCategories.push(categoryLabels.gas)
  if (card.diningRating === 'rgs-wallet') rgsWalletCategories.push(categoryLabels.dining)
  if (card.pharmacyRating === 'rgs-wallet') rgsWalletCategories.push(categoryLabels.pharmacy)
  if (card.otherRating === 'rgs-wallet') rgsWalletCategories.push(categoryLabels.other)

  // Build cards array - conditionally include RGS Wallet if categories exist
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

  // Add RGS Wallet bubble if any categories have rgs-wallet rating
  if (rgsWalletCategories.length > 0) {
    cards.push({
      title: 'RGS Wallet',
      value: rgsWalletCategories.slice(0, 3).join(', '),
      subtitle: 'We use this card for',
      gradient: 'from-amber-50 to-orange-50',
      border: 'border border-amber-200',
    })
  }

  // Dynamic grid based on number of cards
  const gridCols = cards.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`my-10 grid ${gridCols} gap-6`}>
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
          <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 break-words leading-tight">
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


