/**
 * Math Helper Utilities for Credit Card Value Calculations
 * These functions calculate the points value at different cent-per-point (cpp) rates
 */

/**
 * Calculate points value at 2 cents per point
 * @param multiplier - The cash back multiplier (e.g., 3 for 3%)
 * @returns The value at 2cpp as a percentage
 */
export function calculateAt2cpp(multiplier: number): number {
  return multiplier * 2
}

/**
 * Calculate points value at 7 cents per point
 * @param multiplier - The cash back multiplier (e.g., 3 for 3%)
 * @returns The value at 7cpp as a percentage
 */
export function calculateAt7cpp(multiplier: number): number {
  return multiplier * 7
}

/**
 * Format a number as a percentage string
 * @param value - The numeric value
 * @returns Formatted percentage string (e.g., "6%")
 */
export function formatAsPercentage(value: number): string {
  return `${value}%`
}

/**
 * Get the CSS color class based on rating
 * @param rating - The rating value
 * @returns Tailwind CSS color class
 */
export function getRatingColor(rating?: string): string {
  if (!rating) return 'text-gray-700'
  
  const lowerRating = rating.toLowerCase()
  
  if (lowerRating === 'great' || lowerRating === 'rgs-wallet') {
    return 'text-green-600 font-semibold'
  }
  
  if (lowerRating === 'poor') {
    return 'text-red-500'
  }
  
  return 'text-gray-700'
}
