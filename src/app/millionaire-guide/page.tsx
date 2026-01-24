import { client } from '@/lib/sanity'
import CreditCardGraph from '@/components/CreditCardGraph'
import SpendingCalculator from '@/components/SpendingCalculator'

export const revalidate = 30

async function getCreditCards() {
  const query = `*[_type == "creditCard"] | order(category asc, rating desc) {
    _id,
    name,
    slug,
    category,
    subCategory,
    issuer,
    image,
    "pointsProgram": pointsProgram->{name, baseValue},
    "relatedCardsSlugs": relatedCards[]->slug.current,
    rating,
    annualFee,
    annualCredits,
    travelMultiplier,
    groceryMultiplier,
    gasMultiplier,
    diningMultiplier,
    pharmacyMultiplier,
    otherMultiplier,
    pointsProgram->{baseValue}
  }`

  const cards = await client.fetch(query)
  console.log(`[Millionaire Guide] Fetched ${cards.length} cards`)

  // Filter out cards without required fields
  const filtered = cards.filter((card: any) =>
    card._id &&
    card.name &&
    card.slug
  )

  console.log(`[Millionaire Guide] After filtering: ${filtered.length} cards`)
  return filtered
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

        <div className="mb-20">
          <div className="bg-rgs-off-black/50 backdrop-blur-sm border border-rgs-green/20 rounded-3xl p-6 sm:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">Find Your Starting Point 📍</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Not sure where to begin? Enter your monthly spending below, and we&apos;ll calculate
                exactly which card will give you the highest return to start your journey.
              </p>
            </div>
            <SpendingCalculator cards={cards} />
          </div>
        </div>

        <CreditCardGraph cards={cards} />
      </div>
    </div>
  )
}
