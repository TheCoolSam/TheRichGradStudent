import { client } from '@/lib/sanity'
import { Article } from '@/types/sanity'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/image'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import DonationButton from '@/components/DonationButton'
import RecommendedPosts from '@/components/RecommendedPosts'
import ArticleContent from '@/components/ArticleContent'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getRecommendedContent } from '@/lib/recommendations'
import JsonLd from '@/components/JsonLd'

export const revalidate = 60

// Custom components for rendering Portable Text content
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      try {
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
      } catch (e) {
        console.warn('Error rendering image block:', e)
        return null
      }
    },
    creditCardBlock: ({ value }: any) => {
      const card = value?.creditCard
      if (!card) return null

      const sizeWidths = {
        small: 200,
        medium: 300,
        large: 400,
      }
      const width = sizeWidths[value.imageSize as keyof typeof sizeWidths] || 300

      // Safe image check
      const hasImage = value.showImage && card.image?.asset?._ref

      return (
        <div className="my-8 flex flex-col items-center">
          {hasImage && (
            <Link href={`/${card.slug?.current}`} className="block hover:scale-105 transition-transform">
              <div className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 p-4">
                <Image
                  src={urlFor(card.image).width(width * 2).url()}
                  alt={card.name || 'Credit Card'}
                  width={width}
                  height={Math.round(width * 0.63)}
                  className="object-contain"
                />
              </div>
            </Link>
          )}
          {value.showDetails && (
            <div className="mt-4 text-center">
              <Link href={`/${card.slug?.current}`} className="text-lg font-semibold text-rgs-green hover:text-rgs-green/80">
                {card.name}
              </Link>
              {card.signupBonusValue && (
                <p className="text-sm text-gray-600 mt-1">
                  Signup Bonus: {card.signupBonusValue}
                </p>
              )}
            </div>
          )}
        </div>
      )
    },
    simpleTable: ({ value }: any) => {
      const rows = value?.rows || []
      if (rows.length === 0) return null

      return (
        <div className="my-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-100 rounded-lg overflow-hidden">
            <tbody className="bg-white divide-y divide-gray-100">
              {rows.map((row: any, i: number) => (
                <tr key={i} className={i === 0 ? 'bg-gray-50 font-bold' : ''}>
                  {row.cells?.map((cell: string, j: number) => (
                    <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {value.caption && (
            <p className="text-xs text-gray-500 mt-2 italic text-center">{value.caption}</p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-12 mb-6 text-rgs-black" style={{ fontFamily: 'var(--font-playfair), serif' }}>{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-10 mb-5 text-rgs-black" style={{ fontFamily: 'var(--font-playfair), serif' }}>{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-rgs-black" style={{ fontFamily: 'var(--font-playfair), serif' }}>{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold mt-6 mb-3 text-rgs-black" style={{ fontFamily: 'var(--font-playfair), serif' }}>{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-rgs-green pl-6 py-2 my-8 italic text-lg text-gray-700 bg-gray-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-gray-800 text-lg">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-rgs-green hover:text-emerald-700 underline decoration-2 decoration-rgs-green/30 underline-offset-2 transition-colors font-medium">
          {children}
        </a>
      )
    },
    creditCardLink: ({ children, value }: any) => {
      const slug = value?.creditCard
      if (!slug) return <>{children}</>
      return (
        <Link href={`/${slug}`} className="text-rgs-green hover:text-rgs-green/80 underline font-semibold">
          {children}
        </Link>
      )
    },
    articleLink: ({ children, value }: any) => {
      const slug = value?.article
      if (!slug) return <>{children}</>
      return (
        <Link href={`/articles/${slug}`} className="text-blue-600 hover:text-blue-800 underline font-semibold">
          {children}
        </Link>
      )
    },
    postLink: ({ children, value }: any) => {
      const slug = value?.post
      if (!slug) return <>{children}</>
      return (
        <Link href={`/${slug}`} className="text-purple-600 hover:text-purple-800 underline font-semibold">
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
        _updatedAt,
        body[]{
          ...,
          _type == "creditCardBlock" => {
            ...,
            "creditCard": creditCard->{
              name,
              slug,
              image,
              signupBonusValue
            }
          },
          markDefs[]{
            ...,
            _type == "creditCardLink" => {
              ...,
              "creditCard": creditCard->slug.current
            },
            _type == "articleLink" => {
              ...,
              "article": article->slug.current
            },
            _type == "postLink" => {
              ...,
              "post": post->slug.current
            }
          }
        },
        author->{
          name,
          role,
          image
        },
        "tags": tags[]->_id,
        "manualRecommendations": recommendedPosts[]->_id
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
  const recommendedContent = await getRecommendedContent({
    currentDocId: article._id,
    currentType: 'article',
    currentTags: article.tags?.map(t => typeof t === 'string' ? { _id: t } : t) || [],
    currentCategories: article.categories || [],
    manualRecommendations: article.manualRecommendations || [],
  })

  return (
    <main className="min-h-screen py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Articles', href: '/articles' },
            { label: article.title },
          ]}
        />
        {/* Header */}
        <header className="mb-14 text-center max-w-3xl mx-auto">
          <div className="mb-6 flex justify-center items-center gap-3 text-sm font-medium tracking-wider text-rgs-green uppercase">
            ARTICLE
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <time className="text-gray-500">
              {new Date(article.publishedAt || article._createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC'
              })}
            </time>
          </div>
          <Link href="/editorial-policy" className="block mb-6 text-xs text-gray-400 hover:text-gray-600 underline decoration-dotted transition-colors">
            Advertiser Disclosure & Editorial Policy
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 font-heading leading-tight text-gray-900">
            {article.title}
          </h1>

          {/* GEO: Answer-First Summary (40-60 words) */}
          {article.excerpt && (
            <div className="mb-10 text-xl text-gray-700 leading-relaxed font-medium bg-rgs-green/5 p-6 rounded-2xl border-l-4 border-rgs-green text-balance mx-auto max-w-2xl text-left">
              <p>{article.excerpt}</p>
            </div>
          )}

          {article.author && (
            <address className="not-italic flex items-center justify-center gap-4 mb-8">
              {article.author.image?.asset?._ref && (
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rgs-gold/50 shadow-sm">
                  <Image
                    src={urlFor(article.author.image).width(96).height(96).url()}
                    alt={article.author.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-sm" itemProp="author">{article.author.name}</p>
                <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{article.author.role}</p>
              </div>
            </address>
          )}

          <div className="w-24 h-1 bg-gradient-to-r from-rgs-gold to-rgs-green mx-auto rounded-full opacity-80"></div>
        </header>

        {/* GEO: Article Schema */}
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.metaDescription || article.excerpt,
          image: article.mainImage?.asset?._ref ? urlFor(article.mainImage).url() : undefined,
          datePublished: article.publishedAt,
          dateModified: article._updatedAt,
          author: {
            '@type': 'Person',
            name: article.author?.name,
            jobTitle: article.author?.role,
          },
          publisher: {
            '@type': 'Organization',
            name: 'The Rich Grad Student',
            logo: {
              '@type': 'ImageObject',
              url: 'https://therichgradstudent.com/favicon.svg'
            }
          }
        }} />

        <ArticleContent article={article}>
          <PortableText value={article.body as any} components={portableTextComponents} />
        </ArticleContent>

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
