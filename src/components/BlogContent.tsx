'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/image'
import { ReactNode } from 'react'

interface BlogMetadata {
  title: string
  publishedAt?: string
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

interface BlogContentProps {
  post: BlogMetadata
  children: ReactNode // The PortableText content rendered in the server component
}

export default function BlogContent({ post, children }: BlogContentProps) {
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
          {post.title}
        </motion.h1>
        
        <motion.div 
          className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
          
          {post.author && (
            <>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  {post.author.role && (
                    <p className="text-xs text-gray-500">{post.author.role}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>

        {post.mainImage && (
          <motion.div 
            className="rounded-xl overflow-hidden shadow-2xl mb-8 group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={urlFor(post.mainImage).width(1200).height(675).url()}
              alt={post.title}
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
        {children}
      </motion.div>
    </>
  )
}
