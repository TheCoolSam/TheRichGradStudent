import React from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import PointsValueSection from '@/components/PointsValueSection'
import LevelCardsClient from '@/components/LevelCardsClient'
import HeroSectionClient from '@/components/HeroSectionClient'
import TeamSectionClient from '@/components/TeamSectionClient'
import CTASectionClient from '@/components/CTASectionClient'
import SupportSectionClient from '@/components/SupportSectionClient'

export const revalidate = 60

async function getPointsData() {
  try {
    const pointsPrograms = await client.fetch<any[]>(
      `*[_type == "pointsProgram"] | order(order asc){
        _id,
        name,
        "slug": slug.current,
        logo,
        baseValue,
        bestRedemption,
        order
      }`
    )
    
    if (!pointsPrograms || pointsPrograms.length === 0) {
      return null
    }
    
    const cardsWithTopRated = await Promise.all(
      pointsPrograms.map(async (program: any) => {
        const topCards = await client.fetch<any[]>(
          `*[_type == "creditCard" && references($programId)] | order(
            select(
              signupBonusRating == "great" => 4,
              signupBonusRating == "rgs-wallet" => 4,
              signupBonusRating == "good" => 3,
              signupBonusRating == "poor" => 2,
              true => 1
            ) desc,
            publishedAt desc
          )[0..2]{
            name,
            image
          }`,
          { programId: program._id }
        )
        
        return {
          ...program,
          topCards
        }
      })
    )
    
    return {
      title: 'Maximize Your Points Value',
      cards: cardsWithTopRated
    }
  } catch (error) {
    console.error('Error fetching point values:', error)
    return null
  }
}

async function getMainArticles() {
  try {
    const articles = await client.fetch<any[]>(
      `*[_type == "article" && defined(mainArticleType)]{
        _id,
        title,
        "slug": slug.current,
        mainArticleType,
        excerpt
      }`
    )
    
    // Create a map of article type to article
    const articleMap: Record<string, any> = {}
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
  
  return [
    {
      title: "You're Already In",
      bullets: [
        'Understand the game',
        'Why you\'re losing money',
        'The truth about credit cards'
      ],
      gradient: 'from-red-600 to-rose-700',
      category: 'already-in',
      slug: mainArticles['already-in']?.slug || 'youre-already-in',
      isPrimary: true
    },
    {
      title: "I'm New Here",
      bullets: [
        'Build your credit score',
        'Learn to responsibly use credit cards',
        'Get student credit cards'
      ],
      gradient: 'from-emerald-600 to-green-700',
      category: 'new',
      slug: mainArticles['new']?.slug || 'im-new-here'
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
      slug: mainArticles['everyday']?.slug || 'everyday-earning'
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
      slug: mainArticles['travel']?.slug || 'travel-cards'
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
      slug: mainArticles['pro']?.slug || 'credit-card-pro'
    }
  ]
}

export default async function HomePage() {
  const pointsData = await getPointsData()
  const levelCards = await getLevelCards()
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSectionClient />

      {/* Level Selector Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-rgs-black">
            Choose Your Level
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Start where you are, grow to where you want to be
          </p>

          <LevelCardsClient cards={levelCards} />
        </div>
      </section>

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
