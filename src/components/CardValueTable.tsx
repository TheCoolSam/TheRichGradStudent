import React from 'react'
import { CreditCard } from '@/types/sanity'
import { calculateAt2cpp, calculateAt7cpp, formatAsPercentage, getRatingColor } from '@/utils/cardMath'

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
    },
    {
      category: 'Travel',
      cashBack: formatAsPercentage(card.travelMultiplier),
      points2cpp: formatAsPercentage(calculateAt2cpp(card.travelMultiplier)),
      points7cpp: formatAsPercentage(calculateAt7cpp(card.travelMultiplier)),
      rating: card.travelRating,
    },
    {
      category: 'Grocery',
      cashBack: formatAsPercentage(card.groceryMultiplier),
      points2cpp: formatAsPercentage(calculateAt2cpp(card.groceryMultiplier)),
      points7cpp: formatAsPercentage(calculateAt7cpp(card.groceryMultiplier)),
      rating: card.groceryRating,
    },
    {
      category: 'Gas',
      cashBack: formatAsPercentage(card.gasMultiplier),
      points2cpp: formatAsPercentage(calculateAt2cpp(card.gasMultiplier)),
      points7cpp: formatAsPercentage(calculateAt7cpp(card.gasMultiplier)),
      rating: card.gasRating,
      hasAsterisk: card.hasSpendingCap,
    },
    {
      category: 'Dining',
      cashBack: formatAsPercentage(card.diningMultiplier),
      points2cpp: formatAsPercentage(calculateAt2cpp(card.diningMultiplier)),
      points7cpp: formatAsPercentage(calculateAt7cpp(card.diningMultiplier)),
      rating: card.diningRating,
    },
    {
      category: 'Pharmacy',
      cashBack: formatAsPercentage(card.pharmacyMultiplier),
      points2cpp: formatAsPercentage(calculateAt2cpp(card.pharmacyMultiplier)),
      points7cpp: formatAsPercentage(calculateAt7cpp(card.pharmacyMultiplier)),
      rating: card.pharmacyRating,
    },
    {
      category: 'Other Purchases',
      cashBack: formatAsPercentage(card.otherMultiplier),
      points2cpp: formatAsPercentage(calculateAt2cpp(card.otherMultiplier)),
      points7cpp: formatAsPercentage(calculateAt7cpp(card.otherMultiplier)),
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

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">RGS Value Table</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                Cash Back / Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                Points Value (2cpp)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                Max Points Value (7cpp)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.category}
                  {row.hasAsterisk && <span className="text-blue-600">**</span>}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getRatingColor(row.rating)}`}>
                  {row.cashBack}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getRatingColor(row.rating)}`}>
                  {row.points2cpp}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getRatingColor(row.rating)}`}>
                  {row.points7cpp}
                </td>
              </tr>
            ))}
          </tbody>{spendingCapAmount.toLocaleString()} {spendingCapPeriod}
        </table>
      </div>
      
      {card.hasSpendingCap && (
        <p className="mt-4 text-sm text-gray-600 italic">
          **On the first $25,000 annually
        </p>
      )}
    </div>
  )
}
