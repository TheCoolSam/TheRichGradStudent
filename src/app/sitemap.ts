import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://therichgradstudent.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/credit-cards`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/millionaire-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  try {
    // Fetch all articles
    const articles = await client.fetch<Array<{ slug: { current: string }; publishedAt: string }>>(
      `*[_type == "article" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
    )

    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug.current}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    // Fetch all blog posts
    const posts = await client.fetch<Array<{ slug: { current: string }; publishedAt: string }>>(
      `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
    )

    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    // Fetch all credit cards
    const cards = await client.fetch<Array<{ slug: { current: string }; publishedAt: string }>>(
      `*[_type == "creditCard" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
    )

    const cardPages: MetadataRoute.Sitemap = cards.map((card) => ({
      url: `${baseUrl}/${card.slug.current}`,
      lastModified: new Date(card.publishedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    return [...staticPages, ...articlePages, ...postPages, ...cardPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
