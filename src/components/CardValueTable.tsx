import React from 'react'
import { CreditCard } from '@/types/sanity'
import { calculateAt2cpp, calculateAt7cpp, calculateDynamicValue, formatAsPercentage, formatEarningRate, getRatingColor } from '@/utils/cardMath'
import RatingBadge from './RatingBadge'

interface CardValueTableProps {
  card: CreditCard | null | undefined
  isLoading?: boolean
  error?: Error | string | null
  spendingCapAmount?: number
  spendingCapPeriod?: 'annually' | 'quarterly' | 'monthly' | 'per year' | 'total'
}

interface TableRow {
  category: string
  cashBack: string
  points2cpp: string
  points7cpp: string
  rating?: string
  hasAsterisk?: boolean
  note?: string
}



export default function CardValueTable({
  card,
  isLoading = false,
  error = null,
  spendingCapAmount = 25000,
  spendingCapPeriod = 'annually'
}: CardValueTableProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">RGS Value Table</h2>
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-rgs-green border-r-transparent" role="status" aria-label="Loading">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600">Loading card details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    const errorMessage = typeof error === 'string' ? error : error.message
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">RGS Value Table</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6" role="alert">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-red-800 font-semibold mb-1">Unable to load card data</h3>
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Missing card state
  if (!card) {
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">RGS Value Table</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6" role="alert">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-yellow-800 font-semibold mb-1">No card data available</h3>
              <p className="text-yellow-700 text-sm">Card information is currently unavailable.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // Calculate net annual fee
  const netAnnualFee = card.annualFee - card.annualCredits
  const rewardType = card.rewardType || 'points' // Default to points if not specified

  // Get point values from program or defaults
  const pp = typeof card.pointsProgram === 'object' ? card.pointsProgram : null
  const baseCpp = pp?.baseValue || 2
  const maxCpp = pp?.bestRedemption || 7

  // Calculate value strings dynamically
  const getValueAtBase = (multiplier: number) => {
    if (rewardType === 'cashback') return 'N/A'
    return formatAsPercentage(calculateDynamicValue(multiplier, baseCpp))
  }

  const getValueAtMax = (multiplier: number) => {
    if (rewardType === 'cashback') return 'N/A'
    return formatAsPercentage(calculateDynamicValue(multiplier, maxCpp))
  }

  const rows: TableRow[] = [
    {
      category: 'Signup Bonus',
      cashBack: card.signupBonusValue || 'N/A',
      points2cpp: 'N/A',
      points7cpp: 'N/A',
      rating: card.signupBonusRating,
    },
    {
      category: 'Annual Fee',
      cashBack: `$${card.annualFee}`,
      points2cpp: 'N/A',
      points7cpp: 'N/A',
    },
    {
      category: 'Annual Credits',
      cashBack: `$${card.annualCredits}`,
      points2cpp: 'N/A',
      points7cpp: 'N/A',
      note: card.annualCreditsNotes,
    },
    {
      category: 'Net Annual Fee',
      cashBack: `$${netAnnualFee}`,
      points2cpp: 'N/A',
      points7cpp: 'N/A',
      rating: netAnnualFee <= 0 ? 'great' : netAnnualFee < 100 ? 'good' : undefined,
    },
    {
      category: 'Travel',
      cashBack: formatEarningRate(card.travelMultiplier, rewardType),
      points2cpp: getValueAtBase(card.travelMultiplier),
      points7cpp: getValueAtMax(card.travelMultiplier),
      rating: card.travelRating,
    },
    {
      category: 'Grocery',
      cashBack: formatEarningRate(card.groceryMultiplier, rewardType),
      points2cpp: getValueAtBase(card.groceryMultiplier),
      points7cpp: getValueAtMax(card.groceryMultiplier),
      rating: card.groceryRating,
    },
    {
      category: 'Gas',
      cashBack: formatEarningRate(card.gasMultiplier, rewardType),
      points2cpp: getValueAtBase(card.gasMultiplier),
      points7cpp: getValueAtMax(card.gasMultiplier),
      rating: card.gasRating,
      hasAsterisk: card.hasSpendingCap,
    },
    {
      category: 'Dining',
      cashBack: formatEarningRate(card.diningMultiplier, rewardType),
      points2cpp: getValueAtBase(card.diningMultiplier),
      points7cpp: getValueAtMax(card.diningMultiplier),
      rating: card.diningRating,
    },
    {
      category: 'Pharmacy',
      cashBack: formatEarningRate(card.pharmacyMultiplier, rewardType),
      points2cpp: getValueAtBase(card.pharmacyMultiplier),
      points7cpp: getValueAtMax(card.pharmacyMultiplier),
      rating: card.pharmacyRating,
    },
    {
      category: 'Other Purchases',
      cashBack: formatEarningRate(card.otherMultiplier, rewardType),
      points2cpp: getValueAtBase(card.otherMultiplier),
      points7cpp: getValueAtMax(card.otherMultiplier),
      rating: card.otherRating,
      hasAsterisk: card.hasSpendingCap,
    },
    {
      category: 'Lounge Benefits',
      cashBack: card.loungeBenefits || 'None',
      points2cpp: 'N/A',
      points7cpp: 'N/A',
      rating: card.loungeRating,
    },
    {
      category: 'Partner Benefits',
      cashBack: card.partnerBenefits || 'None',
      points2cpp: 'N/A',
      points7cpp: 'N/A',
      rating: card.partnerRating,
    },
    {
      category: 'Misc Benefits',
      cashBack: card.miscBenefits || 'None',
      points2cpp: 'N/A',
      points7cpp: 'N/A',
      rating: card.miscRating,
    },
  ]

  const showPointsColumns = rewardType === 'points'

  return (
    <div className="my-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">RGS Value Table</h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full bg-white border border-gray-300 shadow-sm table-fixed">
            <colgroup>
              <col style={{ width: showPointsColumns ? '20%' : '40%' }} />
              <col style={{ width: showPointsColumns ? '28%' : '60%' }} />
              {showPointsColumns && <col style={{ width: '26%' }} />}
              {showPointsColumns && <col style={{ width: '26%' }} />}
            </colgroup>
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b align-top">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b align-top">
                  <span className="inline-flex items-center gap-1">
                    {rewardType === 'cashback' ? 'Cash Back' : 'Points'}
                  </span>
                </th>
                {showPointsColumns && (
                  <>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b align-top">
                      <div className="flex flex-col gap-0.5">
                        <span>Value ({baseCpp}cpp)</span>
                        <span className="text-[10px] font-normal normal-case text-gray-500 leading-tight">
                          Base travel value
                        </span>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b align-top">
                      <div className="flex flex-col gap-0.5">
                        <span>Max Value ({maxCpp}cpp)</span>
                        <span className="text-[10px] font-normal normal-case text-gray-500 leading-tight">
                          Optimized redemption
                        </span>
                      </div>
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {row.category}
                    {row.hasAsterisk && <span className="text-blue-600">**</span>}
                  </td>
                  <td className={`px-4 py-3 text-sm`}>
                    {row.rating ? (
                      <div className="flex items-center gap-2">
                        {row.cashBack}
                        <RatingBadge rating={row.rating} size="sm" />
                      </div>
                    ) : (
                      row.cashBack
                    )}
                  </td>
                  {showPointsColumns && (
                    <>
                      <td className={`px-4 py-3 text-sm ${getRatingColor(row.rating)}`}>
                        {row.points2cpp}
                      </td>
                      <td className={`px-4 py-3 text-sm ${getRatingColor(row.rating)}`}>
                        {row.points7cpp}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 -mx-4 px-4 sm:mx-0 sm:px-0">
        {rows.map((row, index) => {
          // Determine if this is a key metric row
          const isKeyMetric = ['Signup Bonus', 'Net Annual Fee', 'Travel', 'Dining'].includes(row.category)

          return (
            <div
              key={index}
              className={`bg-white border-2 rounded-xl p-3 shadow-sm transition-all hover:shadow-md ${isKeyMetric ? 'border-rgs-green/30 bg-gradient-to-br from-white to-green-50/30' : 'border-gray-200'
                }`}
            >
              {/* Header Row */}
              <div className="flex items-start justify-between mb-2.5 pb-2.5 border-b border-gray-100">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-gray-900 truncate ${isKeyMetric ? 'text-base' : 'text-sm'}`}>
                    {row.category}
                    {row.hasAsterisk && <span className="text-blue-600 ml-1">**</span>}
                  </h3>
                  {isKeyMetric && <span className="text-xs text-green-600 font-medium">Key Metric</span>}
                </div>
                {row.rating && (
                  <div className="flex-shrink-0 ml-2">
                    <RatingBadge rating={row.rating} size="sm" />
                  </div>
                )}
              </div>

              {/* Data Grid */}
              <div className="space-y-2">
                {/* Cash Back / Points Value */}
                <div className="flex items-center justify-between py-1.5 px-2.5 bg-gray-50 rounded-lg">
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    {rewardType === 'cashback' ? 'Cash Back' : 'Points'}
                  </span>
                  <div className={`flex flex-col ml-2 truncate`}>
                    <span className={`font-bold text-sm ${getRatingColor(row.rating)} ${isKeyMetric ? 'text-base' : ''} text-right`}>
                      {row.cashBack}
                    </span>
                    {row.note && <span className="text-[10px] text-gray-500 font-medium text-right mt-0.5">{row.note}</span>}
                  </div>
                </div>

                {/* 2cpp Value */}
                {showPointsColumns && row.points2cpp !== 'N/A' && (
                  <div className="flex items-center justify-between py-1.5 px-2.5 bg-blue-50 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-700">Value ({baseCpp}cpp)</span>
                      <span className="text-[10px] text-gray-500">Base travel value</span>
                    </div>
                    <span className={`font-semibold text-sm ${getRatingColor(row.rating)} truncate ml-2`}>
                      {row.points2cpp}
                    </span>
                  </div>
                )}

                {/* 7cpp Max Value */}
                {showPointsColumns && row.points7cpp !== 'N/A' && (
                  <div className="flex items-center justify-between py-1.5 px-2.5 bg-green-50 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-700">Max Value ({maxCpp}cpp)</span>
                      <span className="text-[10px] text-gray-500">Optimized redemption</span>
                    </div>
                    <span className={`font-semibold text-sm ${getRatingColor(row.rating)} truncate ml-2`}>
                      {row.points7cpp}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend / Key */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-bold text-sm mb-3 text-gray-900">Table Key:</h3>
        <div className="space-y-2 text-xs sm:text-sm text-gray-700">
          <div>
            <strong className="text-gray-900">Points Value:</strong> Average value of points. This applies when points are transferred to a partner hotel or airline for travel
          </div>
          <div>
            <strong className="text-gray-900">Max Points Value:</strong> Our best redemption of points!
          </div>
          <div>
            <strong className="text-gray-900">RGS Wallet:</strong> To indicate why we keep this card in our wallet and what we use it for. It is the highest cash back you can earn across all cards for that specific category.
          </div>
        </div>
      </div>

      {card.hasSpendingCap && (
        <p className="mt-4 text-xs sm:text-sm text-gray-600 italic px-4 sm:px-0">
          ** Spending cap applies on these categories
        </p>
      )}
    </div>
  )
}
