import React from 'react'

type DisclaimerVariant = 'standard' | 'warning' | 'info' | 'compact'

interface DisclaimerProps {
  variant?: DisclaimerVariant
  className?: string
  children?: React.ReactNode
}

const variantStyles = {
  standard: {
    container: 'bg-gray-50 border-gray-200',
    text: 'text-gray-600',
    icon: null
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-300',
    text: 'text-yellow-800',
    icon: (
      <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mr-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    )
  },
  info: {
    container: 'bg-blue-50 border-blue-300',
    text: 'text-blue-800',
    icon: (
      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mr-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    )
  },
  compact: {
    container: 'bg-gray-50 border-gray-200',
    text: 'text-gray-600',
    icon: null
  }
}

const defaultMessages = {
  standard: `Personal advice only. We are not a bank, lender, or financial advisor. 
        Offers change, and banks do not endorse this content. Always read your 
        cardmember agreement and fee schedule before applying or using any card. 
        Use these recommendations at your own risk. You must be 21 years or older, 
        and this website is not intended for undergraduate students. When you choose 
        to apply (and are approved) for a credit card through our site, we may receive 
        compensation from our partners, which may influence how or where these products 
        appear. We only recommend products we genuinely believe benefit graduate students 
        and decline offers that do not align with that goal.`,
  compact: `We earn commission from approved applications. Always read terms before applying. 21+ only.`,
  warning: `Important: Credit card recommendations require careful consideration. Apply only if you can pay your balance in full each month.`,
  info: `This content contains affiliate links. We may earn commission from approved applications at no cost to you.`
}

export default function Disclaimer({ 
  variant = 'standard', 
  className = '', 
  children 
}: DisclaimerProps) {
  const styles = variantStyles[variant]
  const padding = variant === 'compact' ? 'p-4' : 'p-6'
  const textSize = variant === 'compact' ? 'text-xs' : 'text-sm'
  
  return (
    <div 
      className={`mt-16 mb-8 ${padding} ${styles.container} border rounded-lg ${className}`}
      role={variant === 'warning' ? 'alert' : 'note'}
      aria-label="Disclaimer"
    >
      <div className={`flex ${styles.icon ? 'items-start' : ''}`}>
        {styles.icon}
        <p className={`${textSize} ${styles.text} italic leading-relaxed`}>
          {children || defaultMessages[variant]}
        </p>
      </div>
    </div>
  )
}
