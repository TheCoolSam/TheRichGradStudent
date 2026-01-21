import { client } from './sanity'

export interface RecommendedContent {
  _id: string
  _type: 'article' | 'post' | 'creditCard'
  title: string
  name?: string // for credit cards
  slug: string // Already extracted as string from slug.current in queries
  excerpt?: string
  description?: string // for credit cards
  mainImage?: any
  image?: any // for credit cards
  categories?: string[]
  tags?: Array<{ _id: string }>
  publishedAt?: string
}

interface GetRecommendationsParams {
  currentDocId: string
  currentType: 'article' | 'post' | 'creditCard'
  currentTags?: Array<{ _id: string }>
  currentCategories?: string[]
  currentPointsProgram?: { _id: string }
  manualRecommendations?: string[]
}

/**
 * Get recommended content for an article, post, or credit card
 * Priority:
 * 1. Manual recommendations if set
 * 2. Content with shared tags/categories/points program (scored by relevance + recency)
 * 3. Random content to fill up to 3 items
 */
export async function getRecommendedContent({
  currentDocId,
  currentType,
  currentTags = [],
  currentCategories = [],
  currentPointsProgram,
  manualRecommendations = [],
}: GetRecommendationsParams): Promise<RecommendedContent[]> {
  try {
    // Step 1: If manual recommendations exist, fetch them
    if (manualRecommendations.length > 0) {
      const manualContent = await client.fetch<RecommendedContent[]>(
        `*[_id in $ids]{
          _id,
          _type,
          title,
          name,
          "slug": slug.current,
          excerpt,
          description,
          mainImage,
          image,
          categories,
          tags[]->{ _id },
          publishedAt
        }`,
        { ids: manualRecommendations }
      )

      // If we have 3+ manual recommendations, return them
      if (manualContent.length >= 3) {
        return manualContent.slice(0, 3)
      }

      // Otherwise, continue to fill remaining slots
      const remainingSlots = 3 - manualContent.length
      const autoContent = await getAutoRecommendations({
        currentDocId,
        currentType,
        currentTags,
        currentCategories,
        currentPointsProgram,
        limit: remainingSlots,
        excludeIds: [...manualRecommendations, currentDocId],
      })

      return [...manualContent, ...autoContent]
    }

    // Step 2: No manual recommendations - get automatic recommendations
    return await getAutoRecommendations({
      currentDocId,
      currentType,
      currentTags,
      currentCategories,
      currentPointsProgram,
      limit: 3,
      excludeIds: [currentDocId],
    })
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return []
  }
}

interface AutoRecommendationsParams {
  currentDocId: string
  currentType: 'article' | 'post' | 'creditCard'
  currentTags: Array<{ _id: string }>
  currentCategories: string[]
  currentPointsProgram?: { _id: string }
  limit: number
  excludeIds: string[]
}

async function getAutoRecommendations({
  currentDocId,
  currentType,
  currentTags,
  currentCategories,
  currentPointsProgram,
  limit,
  excludeIds,
}: AutoRecommendationsParams): Promise<RecommendedContent[]> {
  const tagIds = currentTags.map((t) => t._id)
  
  // Fetch all potential recommendations (articles, posts, cards)
  const allContent = await client.fetch<RecommendedContent[]>(
    `*[_type in ["article", "post", "creditCard"] && !(_id in $excludeIds)]{
      _id,
      _type,
      title,
      name,
      "slug": slug.current,
      excerpt,
      description,
      mainImage,
      image,
      categories,
      tags[]->{ _id },
      publishedAt,
      pointsProgram->{ _id }
    }`,
    { excludeIds }
  )

  // Score each piece of content
  const scored = allContent.map((content) => {
    let score = 0

    // Score by shared categories (weight: 3 points each)
    const sharedCategories = (content.categories || []).filter((cat) =>
      currentCategories.includes(cat)
    )
    score += sharedCategories.length * 3

    // Score by shared tags (weight: 2 points each)
    const contentTagIds = (content.tags || []).map((t) => t._id)
    const sharedTags = contentTagIds.filter((tagId) => tagIds.includes(tagId))
    score += sharedTags.length * 2

    // Score by same points program for credit cards (weight: 5 points)
    if (
      currentPointsProgram &&
      content._type === 'creditCard' &&
      (content as any).pointsProgram?._id === currentPointsProgram._id
    ) {
      score += 5
    }

    // Recency bonus: content published in last 90 days gets +1 point
    if (content.publishedAt) {
      const publishedDate = new Date(content.publishedAt)
      const daysSincePublished =
        (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60 * 24)
      if (daysSincePublished <= 90) {
        score += 1
      }
    }

    return { content, score }
  })

  // Sort by score descending, then by recency
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }
    // If same score, prefer more recent
    const dateA = a.content.publishedAt ? new Date(a.content.publishedAt).getTime() : 0
    const dateB = b.content.publishedAt ? new Date(b.content.publishedAt).getTime() : 0
    return dateB - dateA
  })

  // Get top scored items
  const recommendations = scored.slice(0, limit).map((s) => s.content)

  // If we don't have enough recommendations, fill with random content
  if (recommendations.length < limit) {
    const remainingCount = limit - recommendations.length
    const usedIds = [...excludeIds, ...recommendations.map((r) => r._id)]
    
    const randomContent = await client.fetch<RecommendedContent[]>(
      `*[_type in ["article", "post", "creditCard"] && !(_id in $usedIds)] | order(_createdAt desc) [0...$count]{
        _id,
        _type,
        title,
        name,
        "slug": slug.current,
        excerpt,
        description,
        mainImage,
        image,
        categories,
        publishedAt
      }`,
      { usedIds, count: remainingCount - 1 }
    )

    recommendations.push(...randomContent)
  }

  return recommendations.slice(0, limit)
}
