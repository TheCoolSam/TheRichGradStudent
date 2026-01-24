import { PortableTextBlock } from 'next-sanity'

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
  _updatedAt?: string
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
  body: PortableTextBlock[]
  category?: 'new' | 'everyday' | 'travel' | 'pro'
  categories?: string[]
  tags?: Array<{ _id: string }>
  manualRecommendations?: string[]
  featured?: boolean
  metaDescription?: string
  excerpt?: string
}

export interface Article {
  _id: string
  _type: 'article'
  _updatedAt?: string
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
  body: PortableTextBlock[]
  categories?: string[]
  tags?: Array<{ _id: string }>
  manualRecommendations?: string[]
  mainArticleType?: 'already-in' | 'new' | 'everyday' | 'travel' | 'pro'
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
  showInCarousel?: boolean
}

export interface CreditCard {
  _id: string
  _type: 'creditCard'
  _updatedAt?: string
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
  issuer?: string
  affiliateLink: string
  introContent?: PortableTextBlock[]
  spendRequirement?: string
  aprOffer?: string
  hasSpendingCap: boolean
  pointsProgram?: string | {
    _id: string;
    name: string;
    baseValue?: number;
    bestRedemption?: number;
  }
  category?: 'new' | 'everyday' | 'travel' | 'pro'
  categories?: string[]
  tags?: Array<{ _id: string }>
  manualRecommendations?: string[]
  rewardType?: 'points' | 'cashback'
  rating?: number

  // Value table data
  signupBonusValue?: string
  signupBonusRating?: Rating
  annualFee: number
  annualCredits: number
  annualCreditsNotes?: string
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

  additionalInfo?: PortableTextBlock[]

  author?: Author
  publishedAt: string
  featured?: boolean
  metaDescription?: string
}
