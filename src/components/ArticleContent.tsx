'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/image'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import { Article } from '@/types/sanity'

interface ArticleContentProps {
  article: Article
  portableTextComponents: PortableTextComponents
}

export default function ArticleContent({ article, portableTextComponents }: ArticleContentProps) {
  return (
    <>
      {/* Header */}
      <motion.header 
        className="mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {article.title}
        </motion.h1>
        
        <motion.div 
          className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          
          {article.author && (
            <>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                {article.author.image && (
                  <Image
                    src={urlFor(article.author.image).width(40).height(40).url()}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{article.author.name}</p>
                  {article.author.role && (
                    <p className="text-xs text-gray-500">{article.author.role}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>

        {article.mainImage && (
          <motion.div 
            className="rounded-xl overflow-hidden shadow-2xl mb-8 group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={urlFor(article.mainImage).width(1200).height(675).url()}
              alt={article.title}
              width={1200}
              height={675}
              priority
              className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        )}
      </motion.header>

      {/* Content */}
      <motion.div 
        className="prose prose-lg max-w-none mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <PortableText value={article.body} components={portableTextComponents} />
      </motion.div>
    </>
  )
}
