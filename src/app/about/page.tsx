'use client'

import React from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'

// Simplified animations for better mobile performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Faster stagger for mobile
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 }, // Reduced movement
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3 // Faster animations
    }
  }
}

// Simplified viewport config for fewer reflows
const viewportConfig = { once: true, margin: '-50px' }

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rgs-black via-rgs-off-black to-rgs-dark-green py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg leading-relaxed">
              Two grad students on a mission to help fellow students travel the world in style
            </p>
          </m.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-8 text-rgs-black"
          >
            Our Story
          </m.h2>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 text-lg text-gray-700 leading-relaxed"
          >
            <p>
              We started The Rich Grad Student after a simple realization: graduate students are
              uniquely positioned to win at points and miles.
            </p>

            <p>
              We felt the problem first. You want to visit family. You want a real break after a
              brutal quarter. You open flight prices, stare at the numbers, and close the tab. Not
              because you don&apos;t deserve the trip, but because it feels irresponsible on a stipend.
            </p>

            <p>
              Then we noticed something most people miss. Grad students live on tight budgets, but
              we also travel more than our bank accounts suggest—for conferences, field work, and
              research. Many of us manage reimbursable university spending for events, labs, and
              student groups. And we&apos;re trained to think like analysts: we love systems, data, and
              puzzles. That combination is rare.
            </p>

            <p>
              So we treated travel like a research problem. We learned the rules, ran the numbers,
              and built a repeatable strategy.
            </p>

            <p>
              What started as a way to afford our own travels quickly turned into a passion for
              helping others. We&apos;ve flown business class to Europe for the price of a Starbucks
              coffee, stayed in luxury hotels for free, and turned our grad student stipends into
              upgraded travel experiences.
            </p>
          </m.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-8 text-rgs-black"
          >
            Our Mission
          </m.h2>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 text-lg text-gray-700 leading-relaxed"
          >
            <p>
              Our mission is simple: democratize luxury travel for graduate students. We believe that
              just because you&apos;re living on a grad student budget doesn&apos;t mean you should miss out on
              incredible travel experiences.
            </p>

            <p>
              Through The Rich Grad Student, we share everything we&apos;ve learned about maximizing credit
              card points, finding the best redemptions, and traveling smart. We cut through the jargon
              and complexity to give you straightforward, actionable recommendations.
            </p>

            <p>
              We&apos;re committed to keeping this site ad-free and unbiased. We&apos;ll never push you toward
              cards that don&apos;t make sense for your situation just to earn a commission. Your success
              is our success.
            </p>
          </m.div>
        </div>
      </section>

      {/* The Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12 text-rgs-black text-center"
          >
            Meet the Team
          </m.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: 'Karan Jakhar',
                role: 'Business and Personal Credit Card Expert',
                photo: '/images/karan.jpg',
                imagePosition: 'object-[center_30%]',
                bio: 'PhD student at Rice University. Karan specializes in maximizing business card benefits and has mastered the art of churning without impacting credit scores. When not researching, he\'s planning his next points-funded adventure.'
              },
              {
                name: 'Giorgio Sarro',
                role: 'Personal Credit Card Expert, Hotel/Airfare Redemption Expert',
                photo: '/images/giorgio.jpg',
                imagePosition: 'object-center',
                bio: 'PhD student at UChicago. Giorgio is obsessed with finding the highest-value redemptions and has a knack for booking luxury hotels and flights for pennies on the dollar. He\'s your go-to for award travel strategies.'
              }
            ].map((member, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full shadow-xl overflow-hidden relative">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="128px"
                    className={`object-cover ${member.imagePosition}`}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-rgs-black">{member.name}</h3>
                <p className="text-rgs-green font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12 text-rgs-black text-center"
          >
            What We Stand For
          </m.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Transparency',
                description: 'No hidden agendas, no biased recommendations. We tell it like it is.',
                icon: '🔍'
              },
              {
                title: 'Community',
                description: 'We\'re grad students helping grad students. We understand your unique challenges.',
                icon: '🤝'
              },
              {
                title: 'Education',
                description: 'We don\'t just suggest you what to do—we teach you how to think about points and travel.',
                icon: '📚'
              }
            ].map((value, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white p-8 rounded-xl shadow-md text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-rgs-black">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rgs-green to-rgs-dark-green text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Community?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Start your journey to millionaire-style travel on a grad student budget
          </p>
          <a
            href="/blog"
            className="inline-block px-10 py-4 bg-white text-rgs-green font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Content
          </a>
        </div>
      </section>
    </main>
  )
}
