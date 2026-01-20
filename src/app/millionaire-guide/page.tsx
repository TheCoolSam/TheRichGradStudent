import { client } from '@/lib/sanity'
import CreditCardGraph from '@/components/CreditCardGraph'
import type { CreditCard } from '@/types/sanity'

async function getCreditCards() {
  const query = `*[_type == "creditCard"] | order(category asc, rating desc) {
    _id,
    name,
    slug,
    category,
    subCategory,
    issuer,
    image,
    "pointsProgramName": pointsProgram->name,
    "relatedCardsSlugs": relatedCards[]->slug.current,
    rating
  }`

  const cards = await client.fetch(query)
  // Filter out cards without required fields
  return cards.filter((card: any) => 
    card._id && 
    card.name && 
    card.slug && 
    card.category && 
    card.issuer && 
    card.image
  )
}

export default async function MillionaireGuidePage() {
  const cards = await getCreditCards()

  return (
    <div className="min-h-screen bg-gradient-to-br from-rgs-black via-rgs-off-black to-rgs-dark-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Ultimate Millionaire Guide
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
            Your personalized pathway to mastering credit cards and travel rewards. 
            Follow the arrows to see which cards to apply for next based on your experience level.
          </p>
        </div>

        <CreditCardGraph cards={cards} />
      </div>
    </div>
  )
}
