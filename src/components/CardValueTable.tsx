import React from 'react'
import { CreditCard } from '@/types/sanity'
import { calculateAt2cpp, calculateAt7cpp, formatAsPercentage, getRatingColor } from '@/utils/cardMath'

interface CardValueTableProps {
  card: CreditCard
}

interface TableRow {
  category: string
  cashBack: string
  points2cpp: string
  points7cpp: string
  rating?: string
  hasAsterisk?: boolean
}

export default function CardValueTable({ card }: CardValueTableProps) {
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
          </tbody>
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
