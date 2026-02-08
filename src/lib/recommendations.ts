export interface RecommendedContent {
  _id: string
  _type: 'article' | 'post' | 'creditCard'
  title: string
  name?: string // for credit cards
  slug: string // Already extracted as string from slug.current in queries
  excerpt?: string
  description?: string // for credit cards
  mainImage?: { asset?: { _id: string; url: string } }
  image?: { asset?: { _id: string; url: string } } // for credit cards
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
  const { client } = await import('./sanity')
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
  currentDocId: _currentDocId,
  currentType: _currentType,
  currentTags,
  currentCategories,
  currentPointsProgram,
  limit,
  excludeIds,
}: AutoRecommendationsParams): Promise<RecommendedContent[]> {
  const { client } = await import('./sanity')
  const tagIds = currentTags.map((t) => t._id)

  // Calculate cutoff date for recency bonus (90 days ago)
  const recencyCutoff = new Date()
  recencyCutoff.setDate(recencyCutoff.getDate() - 90)
  const recencyCutoffStr = recencyCutoff.toISOString()

  // PERFORMANCE: Use GROQ server-side scoring instead of downloading all content
  // This replaces fetching 100+ documents with a single query that returns only 3 results
  // Scoring weights match the previous in-memory algorithm:
  // - Categories: 3 points per match
  // - Tags: 2 points per match  
  // - Points program: 5 points if same
  // - Recency: 1 point if within 90 days
  const recommendations = await client.fetch<RecommendedContent[]>(
    `*[_type in ["article", "post", "creditCard"] && !(_id in $excludeIds)] | score(
      // Category matching (3 points per shared category)
      boost(count((categories)[@ in $categories]) > 0, 3),
      // Tag matching (2 points per shared tag)
      boost(count((tags[]->_id)[@ in $tagIds]) > 0, 2),
      // Points program matching for credit cards (5 points)
      boost(pointsProgram._ref == $programId, 5),
      // Recency bonus (1 point if published within 90 days)
      boost(dateTime(publishedAt) > dateTime($recencyCutoff), 1)
    ) | order(_score desc, publishedAt desc)[0...$limitIndex]{
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
    {
      excludeIds,
      categories: currentCategories,
      tagIds,
      programId: currentPointsProgram?._id || '',
      recencyCutoff: recencyCutoffStr,
      limitIndex: limit - 1  // GROQ uses 0-indexed slicing
    }
  )

  // If we don't have enough recommendations, fill with recent content
  if (recommendations.length < limit) {
    const remainingCount = limit - recommendations.length
    const usedIds = [...excludeIds, ...recommendations.map((r) => r._id)]

    const recentContent = await client.fetch<RecommendedContent[]>(
      `*[_type in ["article", "post", "creditCard"] && !(_id in $usedIds)] | order(publishedAt desc)[0...$count]{
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

    recommendations.push(...recentContent)
  }

  return recommendations.slice(0, limit)
}
