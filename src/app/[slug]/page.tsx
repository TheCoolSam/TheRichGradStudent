import { client } from '@/lib/sanity'
import { Post, CreditCard, Article } from '@/types/sanity'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/image'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import Disclaimer from '@/components/Disclaimer'
import CardValueTable from '@/components/CardValueTable'
import DonationButton from '@/components/DonationButton'
import QuickStatsDashboard from '@/components/QuickStatsDashboard'
import RecommendedPosts from '@/components/RecommendedPosts'
import BlogContent from '@/components/BlogContent'
import Breadcrumbs from '@/components/Breadcrumbs'
import Timestamp from '@/components/Timestamp'
import { getRecommendedContent } from '@/lib/recommendations'

// Revalidate every 60 seconds
export const revalidate = 60

// Custom components for rendering Portable Text content
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }

      // Determine image width based on size setting
      const sizeClasses = {
        small: 'max-w-md mx-auto',    // 50%
        medium: 'max-w-2xl mx-auto',   // 75%
        large: 'max-w-full',           // 100%
      }

      const sizeClass = sizeClasses[value.size as keyof typeof sizeClasses] || sizeClasses.large

      return (
        <div className={`my-8 ${sizeClass}`}>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || 'Blog image'}
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
      const slug = value?.creditCard?.slug?.current || value?.creditCard
      if (!slug) return <>{children}</>
      return (
        <Link href={`/${slug}`} className="text-rgs-green hover:text-rgs-green/80 underline font-semibold">
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
        <Link href={`/${slug}`} className="text-purple-600 hover:text-purple-800 underline font-semibold">
          {children}
        </Link>
      )
    },
  },
}

interface PageProps {
  params: {
    slug: string
  }
}

async function getTopCardsByCategory(categories: string[]) {
  if (!categories || categories.length === 0) return []

  try {
    const topCards = await client.fetch<CreditCard[]>(
      `*[_type == "creditCard" && category in $categories] | order(
        select(
          signupBonusRating == "great" => 4,
          signupBonusRating == "rgs-wallet" => 4,
          signupBonusRating == "good" => 3,
          signupBonusRating == "poor" => 2,
          true => 1
        ) desc,
        publishedAt desc
      )[0..2]{
        _id,
        name,
        slug,
        image,
        signupBonusValue,
        signupBonusRating
      }`,
      { categories }
    )
    return topCards
  } catch (error) {
    console.error('Error fetching top cards:', error)
    return []
  }
}

async function getContent(slug: string): Promise<Post | CreditCard | Article | null> {
  try {
    // First, try to fetch as a blog post
    const post = await client.fetch<Post | null>(
      `*[_type == "post" && slug.current == $slug][0]{
        ...,
        _updatedAt,
        author->{
          name,
          role,
          image
        },
        tags[]->{ _id },
        "manualRecommendations": recommendedPosts[]->_id
      }`,
      { slug }
    )

    if (post) return post

    // Try to fetch as an article
    const article = await client.fetch<Article | null>(
      `*[_type == "article" && slug.current == $slug][0]{
        ...,
        author->{
          name,
          role,
          image
        },
        tags[]->{ _id },
        "manualRecommendations": recommendedPosts[]->_id
      }`,
      { slug }
    )

    if (article) return article

    // If not found, try to fetch as a credit card review
    const creditCard = await client.fetch<CreditCard | null>(
      `*[_type == "creditCard" && slug.current == $slug][0]{
        ...,
        author->{
          name,
          role,
          image
        },
        "pointsProgram": pointsProgram->{_id, name, baseValue, bestRedemption},
        tags[]->{ _id },
        "manualRecommendations": recommendedPosts[]->_id,
        _updatedAt
      }`,
      { slug }
    )

    return creditCard
  } catch (error) {
    console.log('Sanity not connected yet')
    return null
  }
}

export default async function ContentPage({ params }: PageProps) {
  const content = await getContent(params.slug)

  // Fetch top cards if this is an article with categories
  const topCards = content && 'categories' in content && content.categories
    ? await getTopCardsByCategory(content.categories)
    : []

  // Fetch recommended content
  let recommendations: any[] = []
  if (content) {
    const contentAny = content as any
    recommendations = await getRecommendedContent({
      currentDocId: contentAny._id,
      currentType: contentAny._type,
      currentTags: contentAny.tags || [],
      currentCategories: contentAny.categories || [],
      currentPointsProgram: contentAny.pointsProgram?._id ? { _id: contentAny.pointsProgram._id } : undefined,
      manualRecommendations: contentAny.manualRecommendations || [],
    })
  }

  if (!content) {
    return (
      <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Content Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            This content doesn&apos;t exist yet, or Sanity CMS isn&apos;t connected.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-left max-w-2xl mx-auto">
            <h2 className="font-bold text-lg mb-4">🚀 Getting Started:</h2>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li>Set up your Sanity.io project</li>
              <li>Add environment variables to <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code>:
                <pre className="mt-2 bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                  NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
                  NEXT_PUBLIC_SANITY_DATASET=production
                  NEXT_PUBLIC_SANITY_API_VERSION=2024-01-18</pre>
              </li>
              <li>Create content in Sanity Studio</li>
              <li>Refresh this page - content will appear automatically! ✨</li>
            </ol>
          </div>
          <div className="mt-8">
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Homepage
            </a>
          </div>
        </div>
      </main>
    )
  }

  const isCreditCard = content._type === 'creditCard'
  const isPost = content._type === 'post'
  const isArticle = content._type === 'article'

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={
            isCreditCard
              ? [
                { label: 'Home', href: '/' },
                { label: 'Credit Cards', href: '/credit-cards' },
                { label: (content as CreditCard).name },
              ]
              : isPost
                ? [
                  { label: 'Home', href: '/' },
                  { label: 'Blog', href: '/' },
                  { label: (content as Post).title },
                ]
                : [
                  { label: 'Home', href: '/' },
                  { label: 'Articles', href: '/articles' },
                  { label: (content as Article).title },
                ]
          }
        />
        {/* Header */}
        <header className="mb-14 text-center max-w-3xl mx-auto">
          <div className="mb-6 flex justify-center items-center gap-3 text-sm font-medium tracking-wider text-rgs-green uppercase">
            {isCreditCard ? 'Credit Card Review' : isPost ? 'Blog Post' : 'Article'}
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <time className="text-gray-500">
              {new Date(content.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 font-heading leading-tight text-gray-900">
            {isCreditCard ? (content as CreditCard).name : (content as Post).title}
          </h1>

          {content.author && (
            <div className="flex items-center justify-center gap-4 mb-8">
              {content.author.image && (
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rgs-gold/50 shadow-sm">
                  <Image
                    src={urlFor(content.author.image).width(96).height(96).url()}
                    alt={content.author.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-sm">{content.author.name}</p>
                <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{content.author.role}</p>
              </div>
            </div>
          )}

          <div className="w-24 h-1 bg-gradient-to-r from-rgs-gold to-rgs-green mx-auto rounded-full opacity-80"></div>
        </header>

        {/* Credit Card Specific Content */}
        {isCreditCard && (
          <>
            {/* Card Image */}
            {(content as CreditCard).image?.asset && (
              <div className="mb-10 max-w-2xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-rgs-green/30 hover:border-rgs-green hover:shadow-rgs-green/40 transition-all duration-500 group">
                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 via-gray-900 to-black relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1),transparent_70%)]" />
                    <Image
                      src={urlFor((content as CreditCard).image).width(800).height(500).quality(95).url()}
                      alt={(content as CreditCard).name}
                      width={800}
                      height={500}
                      className="w-full h-full object-contain p-8 mix-blend-screen group-hover:scale-105 transition-transform duration-500"
                      priority
                      style={{ filter: 'drop-shadow(0 10px 40px rgba(0, 255, 136, 0.3))' }}
                    />
                  </div>
                </div>
                <p className="text-center text-base font-semibold text-gray-400 mt-4">{(content as CreditCard).name}</p>
              </div>
            )}

            {/* Apply Now Button */}
            <div className="mb-10 text-center">
              <a
                href={(content as CreditCard).affiliateLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block px-16 py-5 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-500 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="flex items-center justify-center gap-3 relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:rotate-12 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Apply Now
                </span>
              </a>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">Secure Application</p>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>We may earn a commission if approved</span>
                </div>
              </div>
            </div>

            {/* Last Updated Timestamp */}
            <div className="mb-6 flex justify-center">
              <Timestamp
                publishedAt={(content as CreditCard).publishedAt}
                updatedAt={(content as CreditCard)._updatedAt}
              />
            </div>

            {/* Quick Stats Dashboard */}
            <QuickStatsDashboard card={content as CreditCard} />

            {/* Quick Info */}
            {((content as CreditCard).spendRequirement || (content as CreditCard).aprOffer || (content as CreditCard).pointsProgram) && (
              <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-bold text-lg mb-3">Quick Info</h3>
                {(content as CreditCard).pointsProgram && (() => {
                  const pp = (content as CreditCard).pointsProgram
                  const programName = typeof pp === 'string' ? pp : pp?.name
                  return (
                    <p className="mb-2">
                      <strong>Points Program:</strong> {programName === 'Cash Back' ? 'Cash Back Card (No Points)' : programName}
                    </p>
                  )
                })()}
                {(content as CreditCard).spendRequirement && (
                  <p className="mb-2">
                    <strong>Spend Requirement:</strong> {(content as CreditCard).spendRequirement}
                  </p>
                )}
                {(content as CreditCard).aprOffer && (
                  <p>
                    <strong>APR Offer:</strong> {(content as CreditCard).aprOffer}
                  </p>
                )}
              </div>
            )}

            {/* Intro Content */}
            {(content as CreditCard).introContent && (
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 font-heading text-rgs-black">Why we opened it!</h2>
                <div className="prose prose-lg max-w-none prose-headings:font-heading">
                  <PortableText
                    value={(content as CreditCard).introContent!}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            )}

            {/* Value Table */}
            <CardValueTable card={content as CreditCard} />

            {/* Additional Information */}
            {(content as CreditCard).additionalInfo && (
              <div className="my-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 font-heading text-rgs-black">Additional Information</h2>
                <div className="prose prose-lg max-w-none prose-headings:font-heading">
                  <PortableText
                    value={(content as CreditCard).additionalInfo!}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            )}

            {/* Donation Button */}
            <div className="my-12 text-center">
              <DonationButton />
            </div>
          </>
        )}

        {/* Article Specific Content */}
        {isArticle && (
          <>
            {/* Main Image */}
            {(content as Article).mainImage?.asset && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={urlFor((content as Article).mainImage!).width(1200).height(675).url()}
                  alt={(content as Article).title}
                  width={1200}
                  height={675}
                  className="w-full"
                />
              </div>
            )}

            {/* Body Content */}
            {(content as Article).body && (
              <div className="prose prose-lg max-w-none mb-12 prose-headings:font-heading">
                <PortableText
                  value={(content as Article).body}
                  components={portableTextComponents}
                />
              </div>
            )}

            {/* Top Cards Section */}
            {topCards.length > 0 && (
              <div className="my-12 p-8 bg-gradient-to-br from-rgs-green to-emerald-700 rounded-xl">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Top Rated Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topCards.map((card: CreditCard) => (
                    <Link key={card._id} href={`/${card.slug.current}`}>
                      <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        {card.image?.asset && (
                          <div className="relative h-40 bg-gradient-to-br from-amber-100 to-orange-100">
                            <Image
                              src={urlFor(card.image).width(300).height(200).url()}
                              alt={card.name}
                              fill
                              className="object-contain p-4"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2">{card.name}</h3>
                          {card.signupBonusValue && (
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">Bonus:</span> {card.signupBonusValue}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Blog Post Specific Content */}
        {isPost && (
          <>
            <BlogContent post={content as Post}>
              <PortableText
                value={(content as Post).body}
                components={portableTextComponents}
              />
            </BlogContent>

            {/* Donation Button */}
            <div className="my-12">
              <DonationButton />
            </div>
          </>
        )}

        {/* Disclaimer - Auto-appended to all content */}
        <Disclaimer />
      </article>

      {/* Recommended Posts Section */}
      <RecommendedPosts posts={recommendations} />
    </main>
  )
}
