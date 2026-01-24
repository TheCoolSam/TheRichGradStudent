import { defineType, defineField } from 'sanity'

const ratingOptions = [
  { title: 'Great', value: 'great' },
  { title: 'Good', value: 'good' },
  { title: 'Poor', value: 'poor' },
  { title: 'RGS Wallet', value: 'rgs-wallet' },
]

export default defineType({
  name: 'creditCard',
  title: 'Credit Card Review',
  type: 'document',
  fieldsets: [
    {
      name: 'basic',
      title: 'Basic Information',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'intro',
      title: 'Introduction Section',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'bonusFees',
      title: 'Signup Bonus & Fees',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'earning',
      title: 'Points Earning Categories',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'benefits',
      title: 'Card Benefits',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'additional',
      title: 'Additional Information',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'metadata',
      title: 'Metadata & SEO',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Card Name',
      type: 'string',
      description: 'Full name of the credit card (e.g., "Chase Sapphire Preferred")',
      validation: (Rule) => Rule.required(),
      fieldset: 'basic',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'URL-friendly version (auto-generated from card name)',
      validation: (Rule) => Rule.required(),
      fieldset: 'basic',
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/png, image/jpeg, image/webp',
      },
      description: '📐 IMPORTANT: Use images with 16:10 aspect ratio (e.g., 800x500px, 1600x1000px). Credit card images work best at this ratio. Minimum 800px wide for best quality.',
      validation: (Rule) => Rule.required(),
      fieldset: 'basic',
      fields: [
        {
          name: 'size',
          type: 'string',
          title: 'Image Size',
          description: 'Choose how large this image should display',
          options: {
            list: [
              { title: 'Small (25%)', value: 'small' },
              { title: 'Medium (50%)', value: 'medium' },
              { title: 'Large (75%)', value: 'large' },
              { title: 'Full Width (100%)', value: 'full' },
            ],
            layout: 'radio',
          },
          initialValue: 'medium',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'pointsProgram',
      title: 'Points Program',
      type: 'reference',
      to: [{ type: 'pointsProgram' }],
      description: 'Which points program does this card earn? (skip for pure cash-back cards)',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const rewardType = (context?.document as any)?.rewardType
          if (rewardType === 'cashback') return true
          return value ? true : 'Required for points-earning cards'
        }),
      fieldset: 'basic',
    }),
    defineField({
      name: 'issuer',
      title: 'Card Issuer/Bank',
      type: 'string',
      options: {
        list: [
          { title: 'Chase', value: 'Chase' },
          { title: 'American Express', value: 'American Express' },
          { title: 'Citi', value: 'Citi' },
          { title: 'Capital One', value: 'Capital One' },
          { title: 'Discover', value: 'Discover' },
          { title: 'Barclays', value: 'Barclays' },
          { title: 'Wells Fargo', value: 'Wells Fargo' },
          { title: 'US Bank', value: 'US Bank' },
          { title: 'Bank of America', value: 'Bank of America' },
        ],
      },
      description: 'Which bank or issuer provides this card?',
      validation: (Rule) => Rule.required(),
      fieldset: 'basic',
    }),
    defineField({
      name: 'rewardType',
      title: 'Reward Type',
      type: 'string',
      options: {
        list: [
          { title: 'Points', value: 'points' },
          { title: 'Cash Back', value: 'cashback' },
        ],
        layout: 'radio',
      },
      description: 'Does this card earn points or cash back? (Affects display: 2x vs 2%)',
      validation: (Rule) => Rule.required(),
      initialValue: 'points',
      fieldset: 'basic',
    }),
    defineField({
      name: 'canConvertToPoints',
      title: 'Can Convert to Points?',
      type: 'boolean',
      description: 'Check if this cashback card can be converted to points (e.g. Chase Freedom -> Ultimate Rewards)',
      initialValue: false,
      hidden: ({ document }) => document?.rewardType !== 'cashback',
      fieldset: 'basic',
    }),
    // NOTE: RGS Wallet categories are now derived from category ratings with 'rgs-wallet' value
    defineField({
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
      description: 'Your affiliate/referral link for this card',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
      fieldset: 'basic',
    }),
    defineField({
      name: 'introContent',
      title: 'Why We Opened It',
      type: 'blockContent',
      description: 'Tell your story - why did you choose this card?',
      fieldset: 'intro',
    }),
    defineField({
      name: 'spendRequirement',
      title: 'Spend Requirement',
      type: 'string',
      description: 'Minimum spend to earn signup bonus (e.g., "Spend $4,000 in 3 months")',
      fieldset: 'intro',
    }),
    defineField({
      name: 'aprOffer',
      title: 'APR Offer',
      type: 'string',
      description: 'Introductory APR details (e.g., "0% APR for first 12 months")',
      fieldset: 'intro',
    }),
    defineField({
      name: 'hasSpendingCap',
      title: 'Has Spending Cap?',
      type: 'boolean',
      description: 'Enable if bonus categories have spending limits (adds ** footnote)',
      initialValue: false,
      fieldset: 'intro',
    }),

    // VALUE TABLE DATA FIELDS
    defineField({
      name: 'signupBonusValue',
      title: 'Signup Bonus Value',
      type: 'string',
      description: 'Display value (e.g., "$750" or "100,000 points")',
      validation: (Rule) => Rule.required(),
      fieldset: 'bonusFees',
    }),
    defineField({
      name: 'signupBonusRating',
      title: 'Signup Bonus Rating',
      type: 'string',
      options: { list: ratingOptions },
      validation: (Rule) => Rule.required(),
      fieldset: 'bonusFees',
    }),
    defineField({
      name: 'annualFee',
      title: 'Annual Fee ($)',
      type: 'number',
      description: 'Enter as dollar amount (e.g., 95 for $95)',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
      fieldset: 'bonusFees',
    }),
    defineField({
      name: 'annualCredits',
      title: 'Annual Credits ($)',
      type: 'number',
      description: 'Total value of annual credits/benefits (e.g., 300 for $300)',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
      fieldset: 'bonusFees',
    }),
    defineField({
      name: 'annualCreditsNotes',
      title: 'Annual Credits Notes',
      type: 'string',
      description: 'Optional note to appear below the Annual Credits value (e.g. "Includes Free Night Award")',
      fieldset: 'bonusFees',
    }),

    // TRAVEL
    defineField({
      name: 'travelMultiplier',
      title: 'Travel Earning (%)',
      type: 'number',
      description: 'Points per dollar on travel (e.g., 3 for 3x points = 3%)',
      validation: (Rule) => Rule.required().min(0).max(100),
      initialValue: 0,
      fieldset: 'earning',
    }),
    defineField({
      name: 'travelRating',
      title: 'Travel Rating',
      type: 'string',
      options: { list: ratingOptions },
      fieldset: 'earning',
    }),

    // GROCERY
    defineField({
      name: 'groceryMultiplier',
      title: 'Grocery Earning (%)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
      initialValue: 0,
      fieldset: 'earning',
    }),
    defineField({
      name: 'groceryRating',
      title: 'Grocery Rating',
      type: 'string',
      options: { list: ratingOptions },
      fieldset: 'earning',
    }),

    // GAS
    defineField({
      name: 'gasMultiplier',
      title: 'Gas Earning (%)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
      initialValue: 0,
      fieldset: 'earning',
    }),
    defineField({
      name: 'gasRating',
      title: 'Gas Rating',
      type: 'string',
      options: { list: ratingOptions },
      fieldset: 'earning',
    }),

    // DINING
    defineField({
      name: 'diningMultiplier',
      title: 'Dining Earning (%)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
      initialValue: 0,
      fieldset: 'earning',
    }),
    defineField({
      name: 'diningRating',
      title: 'Dining Rating',
      type: 'string',
      options: { list: ratingOptions },
      fieldset: 'earning',
    }),

    // PHARMACY
    defineField({
      name: 'pharmacyMultiplier',
      title: 'Pharmacy Earning (%)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
      initialValue: 0,
      fieldset: 'earning',
    }),
    defineField({
      name: 'pharmacyRating',
      title: 'Pharmacy Rating',
      type: 'string',
      options: { list: ratingOptions },
      fieldset: 'earning',
    }),

    // OTHER
    defineField({
      name: 'otherMultiplier',
      title: 'Other Purchases Earning (%)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
      initialValue: 0,
      fieldset: 'earning',
    }),
    defineField({
      name: 'otherRating',
      title: 'Other Purchases Rating',
      type: 'string',
      options: { list: ratingOptions },
      fieldset: 'earning',
    }),

    // BENEFITS
    defineField({
      name: 'loungeBenefits',
      title: 'Lounge Benefits',
      type: 'text',
      rows: 3,
      description: 'Airport lounge access details (e.g., "Priority Pass Select with unlimited visits")',
      fieldset: 'benefits',
    }),
    defineField({
      name: 'loungeRating',
      title: 'Lounge Benefits Rating',
      type: 'string',
      options: { list: ratingOptions },
      fieldset: 'benefits',
    }),
    defineField({
      name: 'partnerBenefits',
      title: 'Partner Benefits',
      type: 'text',
      rows: 3,
      description: 'Transfer partners and redemption options (e.g., "1:1 transfers to Hyatt, United")',
      fieldset: 'benefits',
    }),
    defineField({
      name: 'partnerRating',
      title: 'Partner Benefits Rating',
      type: 'string',
      options: { list: ratingOptions },
      fieldset: 'benefits',
    }),
    defineField({
      name: 'miscBenefits',
      title: 'Miscellaneous Benefits',
      type: 'text',
      rows: 3,
      description: 'Other perks (e.g., "Trip delay insurance, no foreign transaction fees")',
      fieldset: 'benefits',
    }),
    defineField({
      name: 'miscRating',
      title: 'Miscellaneous Benefits Rating',
      type: 'string',
      options: { list: ratingOptions },
      fieldset: 'benefits',
    }),

    // ADDITIONAL INFORMATION
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'blockContent',
      description: 'Extra details, tips, or important notes about this card',
      fieldset: 'additional',
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'New Here', value: 'new' },
          { title: 'Every Day Earning', value: 'everyday' },
          { title: 'Travel Cards', value: 'travel' },
          { title: 'Credit Card Pro', value: 'pro' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
      fieldset: 'metadata',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      description: 'Add relevant tags for better organization',
      fieldset: 'metadata',
    }),
    defineField({
      name: 'category',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          { title: "I'm New Here", value: 'new' },
          { title: 'Everyday Earning', value: 'everyday' },
          { title: 'Travel Cards', value: 'travel' },
          { title: 'Credit Card Pro', value: 'pro' }
        ]
      },
      description: 'Which level does this card best fit?',
      validation: (Rule) => Rule.required(),
      fieldset: 'metadata',
    }),
    defineField({
      name: 'subCategory',
      title: 'Pro Sub-Category (Optional)',
      type: 'string',
      options: {
        list: [
          { title: 'Business', value: 'business' },
          { title: 'Luxury', value: 'luxury' }
        ]
      },
      description: 'For Pro-level cards only: Is this a business or luxury card?',
      hidden: ({ document }) => document?.category !== 'pro',
      fieldset: 'metadata',
    }),
    defineField({
      name: 'relatedCards',
      title: 'Related Cards (Progression Path)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'creditCard' }] }],
      description: 'Cards that come before or after this one in a recommended path (same issuer/program)',
      fieldset: 'metadata',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Card',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false,
      fieldset: 'metadata',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for search engines (150-160 characters)',
      validation: (Rule) => Rule.max(160),
      fieldset: 'metadata',
    }),
    defineField({
      name: 'recommendedPosts',
      title: 'Recommended Content',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'article' }, { type: 'post' }, { type: 'creditCard' }] }
      ],
      description: '📌 Manually select 1-3 related articles or cards. If empty, automatically shows content with shared tags and points program. Note: "Related Cards" field is separate and shows card progression paths.',
      validation: (Rule) => Rule.max(3),
      fieldset: 'metadata',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
      fieldset: 'metadata',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      fieldset: 'metadata',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
