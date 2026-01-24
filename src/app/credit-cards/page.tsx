import { client } from '@/lib/sanity'
import { CreditCard } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/image'
import IssuerFilter from '@/components/IssuerFilter'

export const revalidate = 60

async function getCreditCards(category?: string, rewardType?: string, issuer?: string) {
  try {
    // Build query with optional filters
    const filters = []
    if (category) {
      filters.push(`category == "${category}"`)
    }
    if (rewardType) {
      filters.push(`rewardType == "${rewardType}"`)
    }
    if (issuer) {
      filters.push(`issuer == "${issuer}"`)
    }
    const filterString = filters.length > 0 ? `&& (${filters.join(' && ')})` : ''

    // Fetch credit card reviews
    const cards = await client.fetch<CreditCard[]>(`
      *[_type == "creditCard" ${filterString}] | order(name asc){
        _id,
        name,
        slug,
        image,
        issuer,
        publishedAt,
        category,
        rewardType,
        "author": author->{name, role},
        "pointsProgram": pointsProgram->{_id, name}
      }
    `)

    return { cards: cards || [] }
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return { cards: [] }
  }
}

export default async function CreditCardsPage({
  searchParams,
}: {
  searchParams: { category?: string; rewardType?: string; issuer?: string }
}) {
  const category = searchParams.category
  const rewardType = searchParams.rewardType
  const issuer = searchParams.issuer
  const { cards } = await getCreditCards(category, rewardType, issuer)

  const categoryTitles: Record<string, string> = {
    'new': "I'm New Here",
    'everyday': 'Everyday Earning',
    'travel': 'Travel Cards',
    'pro': 'Credit Card Pro'
  }

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rgs-black via-rgs-off-black to-rgs-dark-green text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {category ? `${categoryTitles[category]} Credit Cards` : 'Credit Card Reviews'}
          </h1>
          {category && (
            <Link
              href="/credit-cards"
              className="text-rgs-green hover:text-rgs-green/80 inline-flex items-center gap-2"
            >
              ← View All Cards
            </Link>
          )}

          {/* Reward Type Filter */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="text-sm font-semibold text-gray-400 self-center">Filter by:</span>
            <Link
              href={{
                pathname: '/credit-cards',
                query: { ...(category && { category }) }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${!rewardType
                ? 'bg-rgs-green text-black border-rgs-green'
                : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
            >
              All Cards
            </Link>
            <Link
              href={{
                pathname: '/credit-cards',
                query: { ...(category && { category }), rewardType: 'points' }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${rewardType === 'points'
                ? 'bg-rgs-green text-black border-rgs-green'
                : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
            >
              Points Cards
            </Link>
            <Link
              href={{
                pathname: '/credit-cards',
                query: { ...(category && { category }), rewardType: 'cashback' }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${rewardType === 'cashback'
                ? 'bg-rgs-green text-black border-rgs-green'
                : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
            >
              Cash Back Cards
            </Link>
          </div>

          {/* Issuer Filter */}
          <IssuerFilter />
        </div>

        {cards.length > 0 ? (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <div key={card._id}>
                  <Link href={`/${card.slug.current}`}>
                    <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-lg overflow-hidden h-full hover:shadow-[0_0_30px_rgba(0,255,136,0.15)] hover:scale-[1.02] border border-white/10 transition-all duration-300">
                      {card.image && (
                        <div className="relative h-48 bg-gradient-to-br from-white/5 to-white/10">
                          <Image
                            src={urlFor(card.image).width(400).height(250).url()}
                            alt={card.name}
                            fill
                            priority={index < 3}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={85}
                            className="object-contain p-4"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold flex-1 text-white line-clamp-2">{card.name}</h3>
                          {card.rewardType && (
                            <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${card.rewardType === 'points'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-green-500/20 text-green-300 border border-green-500/30'
                              }`}>
                              {card.rewardType === 'points' ? 'Points' : 'Cash Back'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                          {new Date(card.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
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
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-white">No Credit Card Reviews Yet!</h2>
              <p className="text-xl text-gray-400 mb-6">
                Check back soon for new credit card reviews.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
