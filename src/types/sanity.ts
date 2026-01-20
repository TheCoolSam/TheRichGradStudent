// TypeScript interfaces for Sanity data

export interface Author {
  _id: string
  name: string
  role: string
  school?: string
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  bio?: string
  email?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    instagram?: string
    website?: string
  }
}

export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: {
    current: string
  }
  mainImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  author: Author
  publishedAt: string
  body: any[]
  category?: 'new' | 'everyday' | 'travel' | 'pro'
  featured?: boolean
  metaDescription?: string
  excerpt?: string
}

export interface Article {
  _id: string
  _type: 'article'
  title: string
  slug: {
    current: string
  }
  mainImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  author?: Author
  publishedAt: string
  body: any[]
  categories?: string[]
  featured?: boolean
  metaDescription?: string
  excerpt?: string
}

export type Rating = 'great' | 'good' | 'poor' | 'rgs-wallet'

export interface PointsProgram {
  _id: string
  _type: 'pointsProgram'
  name: string
  slug: {
    current: string
  }
  logo: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  baseValue: number
  bestRedemption: number
  order: number
  description?: string
}

export interface CreditCard {
  _id: string
  _type: 'creditCard'
  name: string
  slug: {
    current: string
  }
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  affiliateLink: string
  introContent?: any[]
  spendRequirement?: string
  aprOffer?: string
  hasSpendingCap: boolean
  pointsProgram?: string
  category?: 'new' | 'everyday' | 'travel' | 'pro'
  
  // Value table data
  signupBonusValue?: string
  signupBonusRating?: Rating
  annualFee: number
  annualCredits: number
  
  travelMultiplier: number
  travelRating?: Rating
  
  groceryMultiplier: number
  groceryRating?: Rating
  
  gasMultiplier: number
  gasRating?: Rating
  
  diningMultiplier: number
  diningRating?: Rating
  
  pharmacyMultiplier: number
  pharmacyRating?: Rating
  
  otherMultiplier: number
  otherRating?: Rating
  
  loungeBenefits?: string
  loungeRating?: Rating
  
  partnerBenefits?: string
  partnerRating?: Rating
  
  miscBenefits?: string
  miscRating?: Rating
  
  additionalInfo?: any[]
  
  author?: Author
  publishedAt: string
  featured?: boolean
  metaDescription?: string
}
