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
    <div className="my-10 grid grid-cols-2 lg:grid-cols-4 gap-6 animate-slideUp">
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

      {/* Overall Rating */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 shadow-sm">
        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
          Our Rating
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const rating = card.rating || 0
              const fillPercentage = rating >= star ? 100 : rating > star - 1 ? (rating - (star - 1)) * 100 : 0
              
              return (
                <div key={star} className="relative w-6 h-6">
                  {/* Background star (gray) */}
                  <svg
                    className="absolute inset-0 w-6 h-6 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {/* Filled star (yellow) with clip-path for partial fill */}
                  {fillPercentage > 0 && (
                    <svg
                      className="absolute inset-0 w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {card.rating ? `${card.rating}/5 Stars` : 'Not Rated'}
        </div>
      </div>
    </div>
  )
}
