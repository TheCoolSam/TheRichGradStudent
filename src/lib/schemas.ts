import { z } from 'zod'

// Base Sanity types
const sanityImageSchema = z.object({
  _type: z.literal('image'),
  asset: z.object({
    _ref: z.string(),
    _type: z.literal('reference')
  }),
  alt: z.string().optional(),
  caption: z.string().optional(),
  size: z.enum(['small', 'medium', 'large']).optional()
})

const sanitySlugSchema = z.object({
  _type: z.literal('slug'),
  current: z.string()
})

const sanityReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.literal('reference')
})

const sanityBlockSchema = z.object({
  _type: z.string(),
  _key: z.string(),
  children: z.array(z.any()).optional(),
  markDefs: z.array(z.any()).optional(),
  style: z.string().optional()
})

// Author schema
export const authorSchema = z.object({
  _id: z.string(),
  _type: z.literal('author'),
  name: z.string(),
  role: z.string(),
  image: sanityImageSchema.optional()
})

// Post schema
export const postSchema = z.object({
  _id: z.string(),
  _type: z.literal('post'),
  title: z.string(),
  slug: sanitySlugSchema,
  author: z.union([sanityReferenceSchema, authorSchema]).optional(),
  mainImage: sanityImageSchema.optional(),
  categories: z.array(z.string()).default([]),
  tags: z.array(sanityReferenceSchema).optional(),
  publishedAt: z.string(),
  excerpt: z.string().optional(),
  body: z.array(sanityBlockSchema).optional()
})

// Credit Card schema
export const creditCardSchema = z.object({
  _id: z.string(),
  _type: z.literal('creditCard'),
  name: z.string(),
  slug: sanitySlugSchema,
  image: sanityImageSchema.optional(),
  author: z.union([sanityReferenceSchema, authorSchema]).optional(),
  publishedAt: z.string(),
  annualFee: z.number().nullable().optional(),
  signUpBonus: z.number().nullable().optional(),
  body: z.array(sanityBlockSchema).optional(),
  categoryBonuses: z.array(z.object({
    _key: z.string(),
    category: z.string(),
    points: z.number().nullable(),
    cap: z.number().nullable().optional()
  })).optional()
})

// Points Value schema
export const pointsValueSchema = z.object({
  _id: z.string(),
  _type: z.literal('pointsValue'),
  name: z.string(),
  logo: sanityImageSchema.optional(),
  baseValue: z.number(),
  bestRedemption: z.number(),
  transferPartners: z.array(z.string()).optional()
})

// Tag schema
export const tagSchema = z.object({
  _id: z.string(),
  _type: z.literal('tag'),
  name: z.string(),
  slug: sanitySlugSchema,
  description: z.string().optional()
})

// Export TypeScript types inferred from Zod schemas
export type Author = z.infer<typeof authorSchema>
export type Post = z.infer<typeof postSchema>
export type CreditCard = z.infer<typeof creditCardSchema>
export type PointsValue = z.infer<typeof pointsValueSchema>
export type Tag = z.infer<typeof tagSchema>
export type SanityImage = z.infer<typeof sanityImageSchema>
export type SanitySlug = z.infer<typeof sanitySlugSchema>
export type SanityBlock = z.infer<typeof sanityBlockSchema>

// Validation helpers
export function validatePost(data: unknown): Post {
  return postSchema.parse(data)
}

export function validateCreditCard(data: unknown): CreditCard {
  return creditCardSchema.parse(data)
}

export function validatePointsValue(data: unknown): PointsValue {
  return pointsValueSchema.parse(data)
}

export function validateAuthor(data: unknown): Author {
  return authorSchema.parse(data)
}

export function validateTag(data: unknown): Tag {
  return tagSchema.parse(data)
}

// Safe parse helpers that don't throw
export function safeParsePost(data: unknown) {
  return postSchema.safeParse(data)
}

export function safeParseCreditCard(data: unknown) {
  return creditCardSchema.safeParse(data)
}

export function safeParsePointsValue(data: unknown) {
  return pointsValueSchema.safeParse(data)
}
