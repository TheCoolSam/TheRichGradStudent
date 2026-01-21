import { client } from '@/lib/sanity'
import { Article } from '@/types/sanity'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/image'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import DonationButton from '@/components/DonationButton'
import RecommendedPosts from '@/components/RecommendedPosts'
import { getRecommendedContent } from '@/lib/recommendations'

export const revalidate = 60

// Custom components for rendering Portable Text content
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      
      const sizeClasses = {
        small: 'max-w-md mx-auto',
        medium: 'max-w-2xl mx-auto',
        large: 'max-w-full',
      }
      
      const sizeClass = sizeClasses[value.size as keyof typeof sizeClasses] || sizeClasses.large
      
      return (
        <div className={`my-8 ${sizeClass}`}>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || 'Article image'}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <p className="text-sm text-gray-600 text-center mt-3 italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
    h5: ({ children }: any) => <h5 className="text-lg font-bold mt-4 mb-2">{children}</h5>,
    h6: ({ children }: any) => <h6 className="text-base font-bold mt-4 mb-2">{children}</h6>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:text-blue-800 underline">
          {children}
        </a>
      )
    },
    creditCardLink: ({ children, value }: any) => {
      const slug = value?.creditCard?.slug?.current || value?.creditCard
      if (!slug) return <>{children}</>
      return (
        <Link href={`/credit-cards/${slug}`} className="text-rgs-green hover:text-rgs-green/80 underline font-semibold">
          {children}
        </Link>
      )
    },
    articleLink: ({ children, value }: any) => {
      const slug = value?.article?.slug?.current || value?.article
      if (!slug) return <>{children}</>
      return (
        <Link href={`/articles/${slug}`} className="text-blue-600 hover:text-blue-800 underline font-semibold">
          {children}
        </Link>
      )
    },
    postLink: ({ children, value }: any) => {
      const slug = value?.post?.slug?.current || value?.post
      if (!slug) return <>{children}</>
      return (
        <Link href={`/blog/${slug}`} className="text-purple-600 hover:text-purple-800 underline font-semibold">
          {children}
        </Link>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
}

interface PageProps {
  params: {
    slug: string
  }
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const article = await client.fetch<Article | null>(
      `*[_type == "article" && slug.current == $slug][0]{
        ...,
        author->{
          name,
          role,
          image
        },
        "tags": tags[]->_id,
        "manualRecommendations": recommendedPosts[]->slug.current
      }`,
      { slug }
    )

    return article
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  // Get recommended content
  const recommendedContent = await getRecommendedContent(
    article._id,
    article.tags?.map(t => typeof t === 'string' ? t : t._id) || [],
    article.manualRecommendations || [],
    'article'
  )

  return (
    <main className="min-h-screen py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
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
          </div>

          {article.mainImage && (
            <div className="rounded-xl overflow-hidden shadow-2xl mb-8">
              <Image
                src={urlFor(article.mainImage).width(1200).height(675).url()}
                alt={article.title}
                width={1200}
                height={675}
                priority
                className="w-full h-auto"
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <PortableText value={article.body} components={portableTextComponents} />
        </div>

        {/* Donation Button */}
        <div className="my-12">
          <DonationButton />
        </div>

        {/* Recommended Content */}
        {recommendedContent.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <RecommendedPosts posts={recommendedContent} />
          </div>
        )}
      </article>
    </main>
  )
}
