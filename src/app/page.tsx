import React from 'react'
import Link from 'next/link'
import PointsValueSection from '@/components/PointsValueSection'
import LevelCardsClient from '@/components/LevelCardsClient'
import HeroSectionClient from '@/components/HeroSectionClient'
import TeamSectionClient from '@/components/TeamSectionClient'
import CTASectionClient from '@/components/CTASectionClient'
import SupportSectionClient from '@/components/SupportSectionClient'

const levelCards = [
  {
    title: "I'm new here",
    bullets: [
      'Build your credit score',
      'Learn to responsibly use credit cards',
      'Get student credit cards'
    ],
    gradient: 'from-emerald-600 to-green-700',
    category: 'new'
  },
  {
    title: 'Every Day Earning',
    bullets: [
      'Maximise points and cashback on no-fee cards',
      'The Chase ecosystem',
      '5% cashback'
    ],
    gradient: 'from-green-600 to-emerald-700',
    category: 'everyday'
  },
  {
    title: 'Travel Cards',
    bullets: [
      "Don't fear the annual fee",
      'Maximize benefits',
      'Travel in style'
    ],
    gradient: 'from-teal-600 to-cyan-700',
    category: 'travel'
  },
  {
    title: 'Credit Card Pro',
    bullets: [
      'Business and luxury credit cards',
      'Add luxury to everyday life',
      'Earn large bonuses'
    ],
    gradient: 'from-cyan-600 to-blue-700',
    category: 'pro'
  }
]

export default function HomePage() {
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
      <PointsValueSection />

      {/* Buy Us a Coffee Section */}
      <SupportSectionClient />

      {/* Team Section */}
      <TeamSectionClient />

      {/* CTA Section */}
      <CTASectionClient />
    </main>
  )
}
