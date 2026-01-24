import { client } from '@/lib/sanity'
import { CreditCard } from '@/types/sanity'
import SpendingCalculator from '@/components/SpendingCalculator'

export const revalidate = 60

export const metadata = {
    title: 'Spending Calculator | The Rich Grad Student',
    description: 'Calculate which credit card gives you the best value based on your monthly spending by category.',
}

async function getCreditCardsWithMultipliers(): Promise<CreditCard[]> {
    try {
        const cards = await client.fetch<CreditCard[]>(`
      *[_type == "creditCard"] | order(name asc) {
        _id,
        name,
        slug,
        image,
        annualFee,
        annualCredits,
        travelMultiplier,
        groceryMultiplier,
        gasMultiplier,
        diningMultiplier,
        pharmacyMultiplier,
        otherMultiplier,
        rewardType,
        "pointsProgram": pointsProgram->{_id, name, baseValue}
      }
    `)
        return cards || []
    } catch (error) {
        console.error('Error fetching credit cards:', error)
        return []
    }
}

export default async function CalculatorPage() {
    const cards = await getCreditCardsWithMultipliers()

    return (
        <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rgs-black via-rgs-off-black to-rgs-dark-green text-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Spending Calculator
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Enter your monthly spending by category to discover which credit cards
                        give you the best value based on your unique spending habits.
                    </p>
                </div>

                <SpendingCalculator cards={cards} />
            </div>
        </main>
    )
}
