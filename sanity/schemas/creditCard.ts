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
  fields: [
    defineField({
      name: 'name',
      title: 'Card Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introContent',
      title: 'Introduction Content (Why we opened it!)',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'spendRequirement',
      title: 'Spend Requirement',
      type: 'string',
      description: 'e.g., "Spend $6,000 in 3 months"',
    }),
    defineField({
      name: 'aprOffer',
      title: 'APR Offer',
      type: 'string',
      description: 'e.g., "0% APR first 12 months"',
    }),
    defineField({
      name: 'hasSpendingCap',
      title: 'Has Spending Cap?',
      type: 'boolean',
      description: 'Toggle to add ** footnote for spending caps',
      initialValue: false,
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
      description: 'e.g., "$750" or "100,000 points"',
    }),
    defineField({
      name: 'signupBonusRating',
      title: 'Signup Bonus Rating',
      type: 'string',
      options: {
        list: ratingOptions,
      },
    }),
    defineField({
      name: 'annualFee',
      title: 'Annual Fee ($)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'annualCredits',
      title: 'Annual Credits ($)',
      type: 'number',
      initialValue: 0,
    }),
    
    // TRAVEL
    defineField({
      name: 'travelMultiplier',
      title: 'Travel Cash Back (%)',
      type: 'number',
      description: 'Enter as percentage (e.g., 3 for 3%)',
      initialValue: 0,
    }),
    defineField({
      name: 'travelRating',
      title: 'Travel Rating',
      type: 'string',
      options: {
        list: ratingOptions,
      },
    }),
    
    // GROCERY
    defineField({
      name: 'groceryMultiplier',
      title: 'Grocery Cash Back (%)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'groceryRating',
      title: 'Grocery Rating',
      type: 'string',
      options: {
        list: ratingOptions,
      },
    }),
    
    // GAS
    defineField({
      name: 'gasMultiplier',
      title: 'Gas Cash Back (%)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'gasRating',
      title: 'Gas Rating',
      type: 'string',
      options: {
        list: ratingOptions,
      },
    }),
    
    // DINING
    defineField({
      name: 'diningMultiplier',
      title: 'Dining Cash Back (%)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'diningRating',
      title: 'Dining Rating',
      type: 'string',
      options: {
        list: ratingOptions,
      },
    }),
    
    // PHARMACY
    defineField({
      name: 'pharmacyMultiplier',
      title: 'Pharmacy Cash Back (%)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'pharmacyRating',
      title: 'Pharmacy Rating',
      type: 'string',
      options: {
        list: ratingOptions,
      },
    }),
    
    // OTHER
    defineField({
      name: 'otherMultiplier',
      title: 'Other Purchases Cash Back (%)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'otherRating',
      title: 'Other Purchases Rating',
      type: 'string',
      options: {
        list: ratingOptions,
      },
    }),
    
    // BENEFITS
    defineField({
      name: 'loungeBenefits',
      title: 'Lounge Benefits',
      type: 'string',
    }),
    defineField({
      name: 'loungeRating',
      title: 'Lounge Benefits Rating',
      type: 'string',
      options: {
        list: ratingOptions,
      },
    }),
    defineField({
      name: 'partnerBenefits',
      title: 'Partner Benefits',
      type: 'string',
    }),
    defineField({
      name: 'partnerRating',
      title: 'Partner Benefits Rating',
      type: 'string',
      options: {
        list: ratingOptions,
      },
    }),
    defineField({
      name: 'miscBenefits',
      title: 'Miscellaneous Benefits',
      type: 'string',
    }),
    defineField({
      name: 'miscRating',
      title: 'Miscellaneous Benefits Rating',
      type: 'string',
      options: {
        list: ratingOptions,
      },
    }),
    
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
