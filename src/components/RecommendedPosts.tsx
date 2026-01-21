import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/image'
import type { RecommendedContent } from '@/lib/recommendations'

interface RecommendedPostsProps {
  posts: RecommendedContent[]
}

export default function RecommendedPosts({ posts }: RecommendedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  const getSlugPath = (post: RecommendedContent) => {
    switch (post._type) {
      case 'article':
        return `/articles/${post.slug.current}`
      case 'post':
        return `/blog/${post.slug.current}`
      case 'creditCard':
        return `/credit-cards/${post.slug.current}`
      default:
        return '#'
    }
  }

  const getTitle = (post: RecommendedContent) => {
    return post.title || post.name || 'Untitled'
  }

  const getExcerpt = (post: RecommendedContent) => {
    return post.excerpt || post.description || ''
  }

  const getImage = (post: RecommendedContent) => {
    return post.mainImage || post.image
  }

  const getCategoryBadge = (categories?: string[]) => {
    if (!categories || categories.length === 0) return null
    
    const categoryColors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      everyday: 'bg-green-100 text-green-800',
      travel: 'bg-yellow-100 text-yellow-800',
      pro: 'bg-purple-100 text-purple-800',
    }

    const categoryLabels: Record<string, string> = {
      new: 'New Here',
      everyday: 'Everyday Earning',
      travel: 'Travel Cards',
      pro: 'Credit Card Pro',
    }

    const category = categories[0]
    const colorClass = categoryColors[category] || 'bg-gray-100 text-gray-800'
    const label = categoryLabels[category] || category

    return (
      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${colorClass}`}>
        {label}
      </span>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-rgs-black mb-8 text-center">
          Recommended for You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => {
            const image = getImage(post)
            const imageUrl = image ? urlFor(image).width(400).height(250).url() : null

            return (
              <Link
                key={post._id}
                href={getSlugPath(post)}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                {imageUrl && (
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={getTitle(post)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="mb-3">
                      {getCategoryBadge(post.categories)}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-rgs-black group-hover:text-rgs-green transition-colors mb-2 line-clamp-2">
                    {getTitle(post)}
                  </h3>

                  {/* Excerpt */}
                  {getExcerpt(post) && (
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {getExcerpt(post)}
                    </p>
                  )}

                  {/* Read More Link */}
                  <div className="mt-4 flex items-center text-rgs-green font-semibold group-hover:translate-x-1 transition-transform">
                    <span>
                      {post._type === 'creditCard' ? 'View Card' : 'Read More'}
                    </span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
