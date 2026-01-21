'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import { Article } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/image'

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await client.fetch<Article[]>(`
          *[_type == "article"] | order(publishedAt desc){
            _id,
            title,
            slug,
            mainImage,
            publishedAt,
            excerpt,
            mainArticleType,
            "author": author->{name, role}
          }
        `)
        setArticles(data || [])
      } catch (error) {
        console.error('Error fetching from Sanity:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles</h1>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-rgs-green border-t-transparent rounded-full"
            />
          </div>
        ) : articles.length > 0 ? (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div 
                  key={article._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/articles/${article.slug.current}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-shadow duration-300 group">
                      {article.mainImage && (
                        <div className="relative h-48 bg-gray-100">
                          <Image
                            src={urlFor(article.mainImage).width(400).height(250).url()}
                            alt={article.title}
                            fill
                            priority={index < 3}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={85}
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-rgs-green transition-colors duration-300">{article.title}</h3>
                        {article.excerpt && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        {article.author && (
                          <p className="text-sm text-gray-500">
                            by {article.author.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">No Articles Yet!</h2>
              <p className="text-xl text-gray-600 mb-6">
                Check back soon for new articles.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
