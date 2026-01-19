import { client } from '@/lib/sanity'
import { Post } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/image'

export const dynamic = 'force-dynamic'

async function getBlogContent() {
  try {
    // Fetch blog posts with category "blog-post"
    const posts = await client.fetch<Post[]>(`
      *[_type == "post" && "blog-post" in categories] | order(publishedAt desc){
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        excerpt,
        "author": author->{name, role}
      }
    `)
    
    return { posts: posts || [] }
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return { posts: [] }
  }
}

export default async function BlogPage() {
  const { posts } = await getBlogContent()

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Posts</h1>
        </div>

        {/* Blog Posts Section */}
        {posts.length > 0 ? (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div key={post._id}>
                  <Link href={`/${post.slug.current}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                      {post.mainImage && (
                        <div className="relative h-48 bg-gray-100">
                          <Image
                            src={urlFor(post.mainImage).width(400).height(250).url()}
                            alt={post.title}
                            fill
                            priority={index < 3}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={85}
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
        ) : (
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">No Blog Posts Yet!</h2>
              <p className="text-xl text-gray-600 mb-6">
                Check back soon for new blog posts.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

