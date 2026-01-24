'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/image'
import { ReactNode } from 'react'
import Timestamp from './Timestamp'
import ReadingProgress from './ReadingProgress'

interface ArticleMetadata {
  title: string
  publishedAt?: string
  _updatedAt?: string
  mainImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  author?: {
    name: string
    role?: string
    image?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }
}

interface ArticleContentProps {
  article: ArticleMetadata
  children: ReactNode // The PortableText content rendered in the server component
}

export default function ArticleContent({ article, children }: ArticleContentProps) {
  return (
    <>
      <ReadingProgress />

      {/* Article Main Image */}
      {/* Article Main Image removed per request */}

      {/* Content */}
      <motion.div
        className="prose prose-lg max-w-none mb-12 prose-headings:font-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
