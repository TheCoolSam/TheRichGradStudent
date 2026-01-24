'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/image'

interface BlogPost {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    mainImage?: {
        asset?: { _id: string; url: string }
        alt?: string
    }
    publishedAt: string
    author?: { name: string }
}

interface FeaturedBlogsSectionProps {
    posts: BlogPost[]
}

export default function FeaturedBlogsSection({ posts }: FeaturedBlogsSectionProps) {
    if (!posts || posts.length === 0) return null

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-rgs-black mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        Latest from the Blog
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Tips, strategies, and insights to maximize your credit card rewards
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.slice(0, 3).map((post, index) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/${post.slug.current}`} className="group block h-full">
                                <article className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                                    {/* Image */}
                                    {post.mainImage?.asset && (
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={urlFor(post.mainImage).width(600).height(400).url()}
                                                alt={post.mainImage.alt || post.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-rgs-black mb-3 group-hover:text-rgs-green transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                            {post.title}
                                        </h3>

                                        {post.excerpt && (
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                                {post.excerpt}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
                                            {post.author?.name && (
                                                <span>By {post.author.name}</span>
                                            )}
                                            <span>
                                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-rgs-green text-white font-semibold rounded-full hover:bg-rgs-dark-green transition-colors"
                    >
                        View All Posts
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
