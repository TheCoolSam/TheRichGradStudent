import React from 'react'

interface RatingBadgeProps {
  rating: string
  size?: 'sm' | 'md' | 'lg'
}

export default function RatingBadge({ rating, size = 'md' }: RatingBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const getBadgeStyles = (rating: string) => {
    switch (rating?.toLowerCase()) {
      case 'great':
        return {
          bg: 'bg-green-100 text-green-800 border-green-300',
          icon: (
            <svg className={iconSizes[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        }
      case 'good':
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: (
            <svg className={iconSizes[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6" />
            </svg>
          )
        }
      case 'poor':
        return {
          bg: 'bg-red-100 text-red-800 border-red-300',
          icon: (
            <svg className={iconSizes[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        }
      case 'rgs-wallet':
        return {
          bg: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 border-amber-400',
          icon: (
            <svg className={iconSizes[size]} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
          )
        }
      default:
        return {
          bg: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: null
        }
    }
  }

  const styles = getBadgeStyles(rating)

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${styles.bg} ${sizeClasses[size]}`}>
      {styles.icon}
      <span className="capitalize">{rating?.replace('-', ' ') || 'N/A'}</span>
    </span>
  )
}
