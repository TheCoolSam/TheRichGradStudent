import React from 'react'
import { CreditCard } from '@/types/sanity'
import RatingBadge from './RatingBadge'
import { formatEarningRate } from '@/utils/cardMath'

interface QuickStatsDashboardProps {
  card: CreditCard
}

export default function QuickStatsDashboard({ card }: QuickStatsDashboardProps) {
  // Calculate net annual fee
  const netAnnualFee = card.annualFee - card.annualCredits
  const rewardType = card.rewardType || 'points' // Default to points if not specified

  // Find the best earning rate (excluding signup bonus)
  const earningRates = [
    card.travelMultiplier,
    card.groceryMultiplier,
    card.gasMultiplier,
    card.diningMultiplier,
    card.pharmacyMultiplier,
    card.otherMultiplier
  ].filter(rate => rate !== undefined && rate > 0)

  const bestEarnRate = earningRates.length > 0 ? Math.max(...earningRates) : 1

  return (
    <div className="my-10 grid grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp">
      {/* Signup Bonus */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
          Signup Bonus
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {card.signupBonusValue || 'N/A'}
        </div>
        {card.signupBonusRating && (
          <RatingBadge rating={card.signupBonusRating} size="sm" />
        )}
      </div>

      {/* Best Earning Rate */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4 shadow-sm">
        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
          Best Earn Rate
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {formatEarningRate(bestEarnRate, rewardType)}
        </div>
        <div className="text-xs text-gray-600">
          {rewardType === 'points' ? 'Points' : 'Cash Back'}
        </div>
      </div>

      {/* Net Annual Fee */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 shadow-sm">
        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
          Net Annual Fee
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">
          ${netAnnualFee}
        </div>
        <div className="text-xs text-gray-600">
          {netAnnualFee < 0 ? 'Net Credit!' : netAnnualFee === 0 ? 'Free!' : 'After Credits'}
        </div>
      </div>
    </div>
  )
}
