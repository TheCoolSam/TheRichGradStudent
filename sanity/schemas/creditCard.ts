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
      },
      description: 'High-quality image of the credit card (recommend 800x500px)',
      validation: (Rule) => Rule.required(),
      fieldset: 'basic',
    }),
    defineField({
      name: 'pointsProgram',
      title: 'Points Program',
      type: 'reference',
      to: [{type: 'pointValue'}],
      description: 'Which points program does this card earn? (Links to Points Value carousel)',
      validation: (Rule) => Rule.required(),
      fieldset: 'basic',
    }),
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
      type: 'array',
      of: [{ type: 'block' }],
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
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Blog Post', value: 'blog-post'},
          {title: 'Credit Card Review', value: 'credit-card-review'},
          {title: 'Article', value: 'article'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
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
    
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'New Here', value: 'new'},
          {title: 'Every Day Earning', value: 'everyday'},
          {title: 'Travel Cards', value: 'travel'},
          {title: 'Credit Card Pro', value: 'pro'},
        ],
      },
      validation: (Rule) => Rule.required().min(1),
      fieldset: 'metadata',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      description: 'Add relevant tags for better organization',
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
