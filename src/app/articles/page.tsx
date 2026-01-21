import { client } from '@/lib/sanity'
import { Article } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/image'

export const revalidate = 60

async function getArticles() {
  try {
    // Fetch articles (not posts)
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
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles</h1>
        </div>

        {articles.length > 0 ? (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <div key={article._id}>
                  <Link href={`/articles/${article.slug.current}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                      {article.mainImage && (
                        <div className="relative h-48 bg-gray-100">
                          <Image
                            src={urlFor(article.mainImage).width(400).height(250).url()}
                            alt={article.title}
                            fill
                            priority={index < 3}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={85}
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
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
                </div>
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
