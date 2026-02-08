import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { client } from '@/lib/sanity'

import HeroSectionClient from '@/components/HeroSectionClient'
import JsonLd from '@/components/JsonLd'

// Dynamic imports for below-the-fold components to reduce initial bundle size
// PERFORMANCE: Added ssr: false for client-only components to avoid hydration overhead
const LevelCardsClient = dynamic(() => import('@/components/LevelCardsClient'), {
  ssr: false,  // Client-only (uses animations)
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-50 rounded-2xl" />,
})
const PointsValueSection = dynamic(() => import('@/components/PointsValueSection'), {
  ssr: false,  // Client-only (uses framer-motion carousel)
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-50" />,
})
const FeaturedContentSection = dynamic(() => import('@/components/FeaturedContentSection').then(mod => mod.FeaturedContentSection), {
  loading: () => <div className="py-20" />,
})
const FeaturedBlogsSection = dynamic(() => import('@/components/FeaturedBlogsSection'), {
  loading: () => <div className="py-24 bg-gray-50" />,
})
const TeamSectionClient = dynamic(() => import('@/components/TeamSectionClient'), {
  ssr: false,  // Client-only (uses animations)
  loading: () => <div className="py-20 bg-gray-50" />,
})
const CTASectionClient = dynamic(() => import('@/components/CTASectionClient'), {
  ssr: false,  // Client-only (uses animations)
  loading: () => <div className="py-20" />,
})
const SupportSectionClient = dynamic(() => import('@/components/SupportSectionClient'), {
  ssr: false,  // Client-only (uses animations)
  loading: () => <div className="py-20" />,
})

export const revalidate = 60

async function getFeaturedBlogs() {
  try {
    // First get featured posts, then fill with most recent
    const featured = await client.fetch<Array<{
      _id: string
      title: string
      slug: { current: string }
      excerpt?: string
      mainImage?: { asset?: { _id: string; url: string }; alt?: string }
      publishedAt: string
      author?: { name: string }
    }>>(
      `*[_type == "post" && featured == true] | order(publishedAt desc)[0...3]{
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        author->{ name }
      }`
    )

    // If we have fewer than 3 featured, fill with recent posts
    if (featured.length < 3) {
      const excludeIds = featured.map(p => p._id)
      const remaining = 3 - featured.length
      const recent = await client.fetch<typeof featured>(
        `*[_type == "post" && !(_id in $excludeIds)] | order(publishedAt desc)[0...$remaining]{
          _id,
          title,
          slug,
          excerpt,
          mainImage,
          publishedAt,
          author->{ name }
        }`,
        { excludeIds, remaining: remaining - 1 }
      )
      return [...featured, ...recent]
    }

    return featured
  } catch (error) {
    console.error('Error fetching featured blogs:', error)
    return []
  }
}

async function getFeaturedContent() {
  try {
    const features = await client.fetch<Array<{
      _id: string
      title: string
      excerpt?: string
      order: number
      content: {
        _type: string
        title: string
        slug: string
        mainImage?: {
          asset?: {
            _id: string
            url: string
          }
        }
        excerpt?: string
        description?: string
      }
    }>>(
      `*[_type == "homepageFeature"] | order(order asc){
        _id,
        title,
        excerpt,
        order,
        content->{
          _type,
          title,
          "slug": slug.current,
          mainImage,
          excerpt,
          description
        }
      }`
    )

    if (!features || features.length === 0) {
      return []
    }

    return features
      .map((feature) => {
        const content = feature.content
        if (!content) return null

        const excerpt = feature.excerpt || content.description || content.excerpt || ''
        const type = content._type as 'article' | 'post' | 'creditCard'

        return {
          title: content.title,
          excerpt: excerpt.substring(0, 150),
          slug: content.slug,
          type,
          mainImage: content.mainImage,
        }
      })
      .filter((item): item is Exclude<typeof item, null> => item !== null)
  } catch (error) {
    console.error('Error fetching featured content:', error)
    return []
  }
}

async function getPointsData() {
  try {
    const pointsPrograms = await client.fetch<Array<{
      _id: string
      name: string
      slug: string
      logo: unknown
      baseValue: number
      bestRedemption: number
      order: number
      bestRedemptionLink?: {
        _type: string
        slug: string
      }
    }>>(
      `*[_type == "pointsProgram" && (showInCarousel != false)] | order(order asc){
        _id,
        name,
        "slug": slug.current,
        logo,
        baseValue,
        bestRedemption,
        order,
        "bestRedemptionLink": bestRedemptionLink->{
          _type,
          "slug": slug.current
        }
      }`
    )

    if (!pointsPrograms || pointsPrograms.length === 0) {
      return null
    }

    // Performance Optimization: Fetch ALL relevant cards in one query instead of N+1 queries
    // This significantly reduces database roundtrips and connection overhead
    const programIds = pointsPrograms.map(p => p._id)
    const allCards = await client.fetch<Array<{
      name: string
      image: { asset?: any }
      slug: string
      signupBonusRating?: string
      publishedAt: string
      pointsProgram?: { _ref: string }
    }>>(
      `*[_type == "creditCard" && references($programIds)] | order(
        select(
          signupBonusRating == "great" => 4,
          signupBonusRating == "rgs-wallet" => 4,
          signupBonusRating == "good" => 3,
          signupBonusRating == "poor" => 2,
          true => 1
        ) desc,
        publishedAt desc
      ){
        name,
        image { asset },
        "slug": slug.current,
        signupBonusRating,
        publishedAt,
        pointsProgram
      }`,
      { programIds }
    )

    // Map cards to their programs in memory
    const cardsWithTopRated = pointsPrograms.map(program => {
      const programCards = allCards
        .filter(card => card.pointsProgram?._ref === program._id)
        .slice(0, 3) // Take top 3

      return {
        ...program,
        topCards: programCards
      }
    })

    return {
      title: 'Maximize Your Points Value',
      cards: cardsWithTopRated as any // Cast to satisfy strict type checking
    }
  } catch {
    console.error('Error fetching point values')
    return null
  }
}

async function getMainArticles() {
  try {
    const articles = await client.fetch<Array<{
      _id: string
      title: string
      slug: string
      mainArticleType: string
      excerpt?: string
    }>>(
      `*[_type == "article" && defined(mainArticleType)]{
        _id,
        title,
        "slug": slug.current,
        mainArticleType,
        excerpt
      }`
    )

    // Create a map of article type to article
    const articleMap: Record<string, { _id: string; title: string; slug: string; mainArticleType: string; excerpt?: string }> = {}
    articles.forEach(article => {
      if (article.mainArticleType) {
        articleMap[article.mainArticleType] = article
      }
    })

    return articleMap
  } catch (error) {
    console.error('Error fetching main articles:', error)
    return {}
  }
}

async function getLevelCards() {
  const mainArticles = await getMainArticles()

  // Fetch top 3 rated cards for each category
  // Fetch top 3 rated cards for each category
  const categories = ['new', 'everyday', 'travel', 'pro']

  // Optimize: Fetch all top cards for all categories in ONE query
  // Fixed GROQ syntax: using select() for proper ordering
  const allCategoryCards = await client.fetch<{
    new: Array<{ name: string; image: { asset?: { _ref?: string; url?: string } }; slug: string }>;
    everyday: Array<{ name: string; image: { asset?: { _ref?: string; url?: string } }; slug: string }>;
    travel: Array<{ name: string; image: { asset?: { _ref?: string; url?: string } }; slug: string }>;
    pro: Array<{ name: string; image: { asset?: { _ref?: string; url?: string } }; slug: string }>;
  }>(
    `{
      "new": *[_type == "creditCard" && category == "new"] | order(
        select(
          signupBonusRating == "great" => 4,
          signupBonusRating == "rgs-wallet" => 4,
          signupBonusRating == "good" => 3,
          signupBonusRating == "poor" => 2,
          true => 1
        ) desc, publishedAt desc)[0..2]{
        name, image { asset }, "slug": slug.current
      },
      "everyday": *[_type == "creditCard" && category == "everyday"] | order(
        select(
          signupBonusRating == "great" => 4,
          signupBonusRating == "rgs-wallet" => 4,
          signupBonusRating == "good" => 3,
          signupBonusRating == "poor" => 2,
          true => 1
        ) desc, publishedAt desc)[0..2]{
        name, image { asset }, "slug": slug.current
      },
      "travel": *[_type == "creditCard" && category == "travel"] | order(
        select(
          signupBonusRating == "great" => 4,
          signupBonusRating == "rgs-wallet" => 4,
          signupBonusRating == "good" => 3,
          signupBonusRating == "poor" => 2,
          true => 1
        ) desc, publishedAt desc)[0..2]{
        name, image { asset }, "slug": slug.current
      },
      "pro": *[_type == "creditCard" && category == "pro"] | order(
        select(
          signupBonusRating == "great" => 4,
          signupBonusRating == "rgs-wallet" => 4,
          signupBonusRating == "good" => 3,
          signupBonusRating == "poor" => 2,
          true => 1
        ) desc, publishedAt desc)[0..2]{
        name, image { asset }, "slug": slug.current
      }
    }`
  )

  const topCardsByCategory = allCategoryCards || { new: [], everyday: [], travel: [], pro: [] }

  return [
    {
      title: "I'm New Here",
      bullets: [
        'Build your credit score',
        'Learn to responsibly use credit cards',
        'Get student credit cards'
      ],
      gradient: 'from-emerald-600 to-green-700',
      category: 'new',
      slug: mainArticles['new']?.slug || 'im-new-here',
      topCards: topCardsByCategory['new'] || []
    },
    {
      title: 'Every Day Earning',
      bullets: [
        'Maximise points and cashback on no-fee cards',
        'The Chase ecosystem',
        '5% cashback'
      ],
      gradient: 'from-green-600 to-emerald-700',
      category: 'everyday',
      slug: mainArticles['everyday']?.slug || 'everyday-earning',
      topCards: topCardsByCategory['everyday'] || []
    },
    {
      title: 'Travel Cards',
      bullets: [
        "Don't fear the annual fee",
        'Maximize benefits',
        'Travel in style'
      ],
      gradient: 'from-teal-600 to-cyan-700',
      category: 'travel',
      slug: mainArticles['travel']?.slug || 'travel-cards',
      topCards: topCardsByCategory['travel'] || []
    },
    {
      title: 'Credit Card Pro',
      bullets: [
        'Business and luxury credit cards',
        'Add luxury to everyday life',
        'Earn large bonuses'
      ],
      gradient: 'from-cyan-600 to-blue-700',
      category: 'pro',
      slug: mainArticles['pro']?.slug || 'credit-card-pro',
      topCards: topCardsByCategory['pro'] || []
    }
  ]
}

export default async function HomePage() {
  const [
    pointsData,
    levelCards,
    mainArticles,
    featuredContent,
    featuredBlogs
  ] = await Promise.all([
    getPointsData(),
    getLevelCards(),
    getMainArticles(),
    getFeaturedContent(),
    getFeaturedBlogs()
  ])

  const alreadyInSlug = mainArticles['already-in']?.slug || 'youre-already-in'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can graduate students really travel for free using credit card points?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! By strategically using credit cards and understanding point valuations, graduate students can earn significant rewards on their existing spending to fund luxury travel.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the best credit card for a grad student starting with travel points?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend starting with Level 1 cards like the Chase Freedom Rise or Discover it Student to build credit, then moving to Level 2 and 3 cards once a solid score is established.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is RGS Wallet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RGS Wallet is our curated selection of top-rated credit cards that provide the best value-to-fee ratio specifically for graduate students and academic professionals.'
        }
      }
    ]
  }

  return (
    <main className="min-h-screen">
      <JsonLd data={faqSchema} />
      {/* Hero Section */}
      <HeroSectionClient alreadyInSlug={alreadyInSlug} />

      {/* Featured Content Section */}
      {featuredContent.length > 0 && (
        <div className="py-8">
          <FeaturedContentSection items={featuredContent} />
        </div>
      )}

      {/* Level Selector Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 font-heading text-rgs-black">
            Choose Your Level
          </h2>
          <p className="text-center text-gray-700 mb-16 text-lg max-w-2xl mx-auto font-light leading-relaxed text-balance">
            Start where you are, grow to where you want to be. <br className="hidden sm:block" />
            We&apos;ve curated the perfect strategy for every stage of your journey.
          </p>

          <LevelCardsClient cards={levelCards} />
        </div>
      </section>

      {/* Featured Blogs Section */}
      <FeaturedBlogsSection posts={featuredBlogs} />

      {/* Points Value Section */}
      <PointsValueSection data={pointsData} />



      {/* Buy Us a Coffee Section */}
      <SupportSectionClient />

      {/* Team Section */}
      <TeamSectionClient />

      {/* CTA Section */}
      <CTASectionClient />
    </main>
  )
}
