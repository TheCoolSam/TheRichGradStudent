import { client } from '@/lib/sanity'
import { CreditCard } from '@/types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/image'

export const dynamic = 'force-dynamic'

async function getCreditCards() {
  try {
    // Fetch credit card reviews
    const cards = await client.fetch<CreditCard[]>(`
      *[_type == "creditCard"] | order(name asc){
        _id,
        name,
        slug,
        image,
        publishedAt,
        "author": author->{name, role}
      }
    `)
    
    return { cards: cards || [] }
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return { cards: [] }
  }
}

export default async function CreditCardsPage() {
  const { cards } = await getCreditCards()

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Credit Card Reviews</h1>
        </div>

        {cards.length > 0 ? (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <div key={card._id}>
                  <Link href={`/${card.slug.current}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                      {card.image && (
                        <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100">
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
                        <h3 className="text-xl font-bold mb-2">{card.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">
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
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">No Credit Card Reviews Yet!</h2>
              <p className="text-xl text-gray-600 mb-6">
                Check back soon for new credit card reviews.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
