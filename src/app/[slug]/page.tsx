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
        author->{
          name,
          role,
          image
        }
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
        }
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
        "pointsProgram": pointsProgram->name
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

  if (!content) {
    return (
      <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Content Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            This content doesn't exist yet, or Sanity CMS isn't connected.
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
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isCreditCard ? (content as CreditCard).name : (content as Post).title}
          </h1>

          {content.author && (
            <div className="flex items-center gap-4 mb-6">
              {content.author.image && (
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={urlFor(content.author.image).width(48).height(48).url()}
                    alt={content.author.name}
                    width={48}
                    height={48}
                  />
                </div>
              )}
              <div>
                <p className="font-semibold">{content.author.name}</p>
                <p className="text-sm text-gray-600">{content.author.role}</p>
              </div>
            </div>
          )}

          <time className="text-gray-600 text-sm">
            {new Date(content.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>

        {/* Credit Card Specific Content */}
        {isCreditCard && (
          <>
            {/* Card Image */}
            {(content as CreditCard).image && (
              <div className="mb-8 max-w-md mx-auto rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={urlFor((content as CreditCard).image).width(400).height(250).url()}
                  alt={(content as CreditCard).name}
                  width={400}
                  height={250}
                  className="w-full"
                />
              </div>
            )}

            {/* Apply Now Button */}
            <div className="mb-8 text-center">
              <a
                href={(content as CreditCard).affiliateLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Apply Now
              </a>
            </div>

            {/* Quick Info */}
            {((content as CreditCard).spendRequirement || (content as CreditCard).aprOffer || (content as CreditCard).pointsProgram) && (
              <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-bold text-lg mb-3">Quick Info</h3>
                {(content as CreditCard).pointsProgram && (
                  <p className="mb-2">
                    <strong>Points Program:</strong> {(content as CreditCard).pointsProgram === 'Cash Back' ? 'Cash Back Card (No Points)' : (content as CreditCard).pointsProgram}
                  </p>
                )}
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
                <h2 className="text-3xl font-bold mb-4">Why we opened it!</h2>
                <div className="prose prose-lg max-w-none">
                  <PortableText 
                    value={(content as CreditCard).introContent}
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
                <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
                <div className="prose prose-lg max-w-none">
                  <PortableText 
                    value={(content as CreditCard).additionalInfo}
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
            {(content as Article).mainImage && (
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
              <div className="prose prose-lg max-w-none mb-12">
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
                        {card.image && (
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
            {/* Body Content */}
            {(content as Post).body && (
              <div className="prose prose-lg max-w-none mb-12">
                <PortableText 
                  value={(content as Post).body}
                  components={portableTextComponents}
                />
              </div>
            )}
          </>
        )}

        {/* Disclaimer - Auto-appended to all content */}
        <Disclaimer />
      </article>
    </main>
  )
}
