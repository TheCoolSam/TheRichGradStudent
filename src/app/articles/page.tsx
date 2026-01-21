import { client } from '@/lib/sanity'
import { Article } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/image'
import ArticlesGrid from '@/components/ArticlesGrid'

export const revalidate = 60

async function getArticles() {
  try {
    const articles = await client.fetch<Article[]>(`
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
    
    return { articles: articles || [] }
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return { articles: [] }
  }
}

export default async function ArticlesPage() {
  const { articles } = await getArticles()

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ArticlesGrid articles={articles} />
      </div>
    </main>
  )
}
