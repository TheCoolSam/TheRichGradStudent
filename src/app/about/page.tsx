'use client'

import React from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rgs-black via-rgs-off-black to-rgs-dark-green py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
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
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-8 text-rgs-black"
          >
            Our Story
          </motion.h2>
          
          <motion.div variants={itemVariants} className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              We started The Rich Grad Student because we realized something crucial: graduate students 
              are in a unique position to master the points and miles game. We are problem solvers, 
              we're constantly traveling for conferences and research, and we're living on tight budgets 
              where every dollar counts.
            </p>
            
            <p>
              As grad students ourselves, we've experienced the frustration of wanting to visit family, 
              attend conferences, or take a well-deserved vacation, only to be held back by finances. 
              That's when we discovered the world of credit card points and travel hacking.
            </p>
            
            <p>
              What started as a way to afford our own travels quickly turned into a passion for helping 
              others. We've flown business class to Europe for the price of a Starbucks coffee, stayed 
              in luxury hotels for free, and turned our grad student stipends into millionaire-level 
              travel experiences.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-8 text-rgs-black"
          >
            Our Mission
          </motion.h2>
          
          <motion.div variants={itemVariants} className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Our mission is simple: democratize luxury travel for graduate students. We believe that 
              just because you're living on a grad student budget doesn't mean you should miss out on 
              incredible travel experiences.
            </p>
            
            <p>
              Through The Rich Grad Student, we share everything we've learned about maximizing credit 
              card points, finding the best redemptions, and traveling smart. We cut through the jargon 
              and complexity to give you straightforward, actionable advice.
            </p>
            
            <p>
              We're committed to keeping this site ad-free and unbiased. We'll never push you toward 
              cards that don't make sense for your situation just to earn a commission. Your success 
              is our success.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* The Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-12 text-rgs-black text-center"
          >
            Meet the Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: 'Karan',
                role: 'Business and Personal Credit Card Expert',
                initial: 'K',
                bio: 'PhD student at Rice University. Karan specializes in maximizing business card benefits and has mastered the art of churning without impacting credit scores. When not researching, he\'s planning his next points-funded adventure.'
              },
              {
                name: 'Giorgio',
                role: 'Personal Credit Card Expert, Hotel/Airfare Redemption Expert',
                initial: 'G',
                bio: 'PhD student at UChicago. Giorgio is obsessed with finding the highest-value redemptions and has a knack for booking luxury hotels and flights for pennies on the dollar. He\'s your go-to for award travel strategies.'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-rgs-green to-rgs-light-green flex items-center justify-center shadow-xl">
                  <span className="text-5xl text-white font-bold">
                    {member.initial}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-rgs-black">{member.name}</h3>
                <p className="text-rgs-green font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-12 text-rgs-black text-center"
          >
            What We Stand For
          </motion.h2>

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
                description: 'We don\'t just tell you what to do—we teach you how to think about points and travel.',
                icon: '📚'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-xl shadow-md text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-rgs-black">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
