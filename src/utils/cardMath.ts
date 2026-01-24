/**
 * Math Helper Utilities for Credit Card Value Calculations
 * These functions calculate the points value at different cent-per-point (cpp) rates
 */

/**
 * Calculate points value at 2 cents per point with proper error handling
 * @param multiplier - The cash back multiplier (e.g., 3 for 3%)
 * @returns The value at 2cpp as a percentage, or 0 if invalid
 */
export function calculateAt2cpp(multiplier: number | null | undefined): number {
  if (typeof multiplier !== 'number' || isNaN(multiplier) || multiplier < 0) {
    return 0
  }
  // Use toFixed to avoid floating point precision errors
  return Number((multiplier * 2).toFixed(2))
}

/**
 * Calculate points value dynamically based on a custom cents-per-point rate
 * @param multiplier - The cash back multiplier (e.g., 3 for 3%)
 * @param cpp - The cents per point value (e.g., 2.2 for 2.2cpp)
 * @returns The value as a percentage
 */
export function calculateDynamicValue(multiplier: number | null | undefined, cpp: number): number {
  if (typeof multiplier !== 'number' || isNaN(multiplier) || multiplier < 0) {
    return 0
  }
  return Number((multiplier * cpp).toFixed(2))
}

/**
 * Calculate points value at 7 cents per point with proper error handling
 * @param multiplier - The cash back multiplier (e.g., 3 for 3%)
 * @returns The value at 7cpp as a percentage, or 0 if invalid
 */
export function calculateAt7cpp(multiplier: number | null | undefined): number {
  if (typeof multiplier !== 'number' || isNaN(multiplier) || multiplier < 0) {
    return 0
  }
  return Number((multiplier * 7).toFixed(2))
}

/**
 * Format a number as a percentage string with proper handling
 * @param value - The numeric value
 * @returns Formatted percentage string (e.g., "6%") or 'N/A' if invalid
 */
export function formatAsPercentage(value: number | null | undefined): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'N/A'
  }
  // Remove unnecessary decimal places (6.00% -> 6%)
  return value % 1 === 0 ? `${value}%` : `${value.toFixed(2)}%`
}

/**
 * Format earning rate based on reward type
 * @param value - The numeric value (multiplier)
 * @param rewardType - 'points' or 'cashback'
 * @returns Formatted string with proper suffix (e.g., "2x" or "2%")
 */
export function formatEarningRate(value: number | null | undefined, rewardType: 'points' | 'cashback'): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'N/A'
  }
  const formattedValue = value % 1 === 0 ? `${value}` : `${value.toFixed(2)}`
  return rewardType === 'points' ? `${formattedValue}x` : `${formattedValue}%`
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
