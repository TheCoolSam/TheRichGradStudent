'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface FeaturedItem {
  title: string
  excerpt: string
  slug: string
  type: 'article' | 'post' | 'creditCard'
  mainImage?: {
    asset?: {
      _id: string
      url: string
    }
  }
}

export function FeaturedContentSection({ items }: { items: FeaturedItem[] }) {
  if (!items || items.length === 0) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const getLink = (item: FeaturedItem) => {
    if (item.type === 'article') return `/articles/${item.slug}`
    return `/${item.slug}`
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link href={getLink(item)}>
                <div className="group cursor-pointer h-full">
                  <div className="bg-rgs-off-black rounded-lg overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-105">
                    {item.mainImage?.asset?.url && (
                      <div className="relative h-48 w-full overflow-hidden bg-rgs-dark-gray">
                        <Image
                          src={item.mainImage.asset.url}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-rgs-green transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-3 flex-grow">
                        {item.excerpt}
                      </p>
                      <div className="mt-4 inline-flex items-center text-rgs-green text-sm font-semibold group-hover:gap-2 transition-all">
                        Read More
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
