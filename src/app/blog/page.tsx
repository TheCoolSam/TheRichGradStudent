import { client } from '@/lib/sanity'
import { Post, CreditCard } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/image'

export const dynamic = 'force-dynamic'

async function getBlogContent() {
  try {
    // Fetch blog posts
    const posts = await client.fetch<Post[]>(`
      *[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        excerpt,
        "author": author->{name, role}
      }
    `)
    
    // Fetch credit card reviews
    const cards = await client.fetch<CreditCard[]>(`
      *[_type == "creditCard"] | order(name asc){
        _id,
        name,
        slug,
        image,
        "author": author->{name, role}
      }
    `)
    
    return { posts: posts || [], cards: cards || [] }
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return { posts: [], cards: [] }
  }
}

export default async function BlogPage() {
  const { posts, cards } = await getBlogContent()

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Content</h1>
        </div>

        {/* Credit Card Reviews Section */}
        {cards.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Credit Card Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card) => (
                <div key={card._id}>
                  <Link href={`/${card.slug.current}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                      {card.image && (
                        <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100">
                          <Image
                            src={urlFor(card.image).width(400).height(250).url()}
                            alt={card.name}
                            fill
                            className="object-contain p-4"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{card.name}</h3>
                        {card.author && (
                          <p className="text-sm text-gray-500">
                            by {card.author.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Blog Posts Section */}
        {posts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post._id}>
                  <Link href={`/${post.slug.current}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                      {post.mainImage && (
                        <div className="relative h-48 bg-gray-100">
                          <Image
                            src={urlFor(post.mainImage).width(400).height(250).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        {post.author && (
                          <p className="text-sm text-gray-500">
                            by {post.author.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && cards.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Content Coming Soon!</h2>
              <p className="text-xl text-gray-600 mb-6">
                The blog is ready to go! Connect Sanity CMS to start adding amazing content.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
                <h3 className="font-bold text-lg mb-2">📝 For Developers:</h3>
                <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Set up your Sanity.io project</li>
                  <li>Add your credentials to <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code></li>
                  <li>Start adding blog posts and credit card reviews in Sanity Studio</li>
                  <li>Content will appear here automatically! ✨</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

