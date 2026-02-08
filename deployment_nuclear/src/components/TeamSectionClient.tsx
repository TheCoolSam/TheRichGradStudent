'use client'

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

const teamMembers = [
  {
    name: 'Karan',
    role: 'Business and Personal Credit Card Expert',
    school: 'PhD Student at Rice University',
    initial: 'K'
  },
  {
    name: 'Giorgio',
    role: 'Personal Credit Card Expert, Hotel/Airfare Redemption Expert',
    school: 'PhD Student at UChicago',
    initial: 'G'
  }
]

export default function TeamSectionClient() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-rgs-off-black text-white">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Meet The Experts
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
              role="article"
              aria-label={`${member.name}, ${member.role}`}
            >
              <motion.div
                className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-rgs-green to-rgs-light-green flex items-center justify-center shadow-2xl relative overflow-hidden"
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 30px 60px rgba(16, 185, 129, 0.4)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                aria-hidden="true"
              >
                <span className="text-6xl text-white font-bold">
                  {member.initial}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-2 text-white">{member.name}</h3>
              <p className="text-rgs-light-green font-medium mb-1">{member.school}</p>
              <p className="text-white/80">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
