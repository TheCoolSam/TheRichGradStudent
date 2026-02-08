'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CreditCard } from '@/types/sanity'
import { urlFor } from '@/lib/image'
import Disclaimer from './Disclaimer'

interface SpendingInputs {
    travel: number
    grocery: number
    gas: number
    dining: number
    pharmacy: number
    other: number
}

interface CardResult {
    card: CreditCard
    monthlyPoints: number
    annualPoints: number
    pointValue: number
    annualCredits: number
    annualFee: number
    netValue: number
}

interface SpendingCalculatorProps {
    cards: CreditCard[]
}

const DEFAULT_CPP = 1.5 // Default cents per point valuation

const categories: { key: keyof SpendingInputs; label: string; icon: string }[] = [
    { key: 'travel', label: 'Travel', icon: '✈️' },
    { key: 'grocery', label: 'Grocery', icon: '🛒' },
    { key: 'gas', label: 'Gas', icon: '⛽' },
    { key: 'dining', label: 'Dining', icon: '🍽️' },
    { key: 'pharmacy', label: 'Pharmacy', icon: '💊' },
    { key: 'other', label: 'Other', icon: '💳' },
]

export default function SpendingCalculator({ cards }: SpendingCalculatorProps) {
    const [spending, setSpending] = useState<SpendingInputs>({
        travel: 0,
        grocery: 0,
        gas: 0,
        dining: 0,
        pharmacy: 0,
        other: 0,
    })

    const handleInputChange = (category: keyof SpendingInputs, value: string) => {
        const numValue = parseFloat(value) || 0
        setSpending((prev) => ({
            ...prev,
            [category]: numValue,
        }))
    }

    const calculateCardValue = (card: CreditCard): CardResult => {
        const monthlyPoints =
            (spending.travel * (card.travelMultiplier || 1)) +
            (spending.grocery * (card.groceryMultiplier || 1)) +
            (spending.gas * (card.gasMultiplier || 1)) +
            (spending.dining * (card.diningMultiplier || 1)) +
            (spending.pharmacy * (card.pharmacyMultiplier || 1)) +
            (spending.other * (card.otherMultiplier || 1))

        const annualPoints = monthlyPoints * 12

        // Get point value from program or use default
        const pointsProgram = card.pointsProgram as { baseValue?: number } | undefined
        const cppValue = pointsProgram?.baseValue ?? DEFAULT_CPP

        // Precision-safe currency conversion (Fix #12)
        const pointValue = Math.round(annualPoints * cppValue) / 100

        const annualCredits = card.annualCredits || 0
        const annualFee = card.annualFee || 0
        const netValue = Math.round((pointValue + annualCredits - annualFee) * 100) / 100

        return {
            card,
            monthlyPoints,
            annualPoints,
            pointValue,
            annualCredits,
            annualFee,
            netValue,
        }
    }

    const rankedCards = useMemo(() => {
        const results = cards.map(calculateCardValue)
        return results.sort((a, b) => b.netValue - a.netValue).slice(0, 3)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards, spending])

    const totalMonthlySpend = Object.values(spending).reduce((sum, val) => sum + val, 0)

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    const formatPoints = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <div className="space-y-12">
            {/* Spending Input Section */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-rgs-green/30">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-3xl">📊</span>
                    Enter Your Monthly Spending
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <div key={category.key} className="space-y-2">
                            <label
                                htmlFor={category.key}
                                className="text-sm font-medium text-gray-300 flex items-center gap-2"
                            >
                                <span>{category.icon}</span>
                                {category.label}
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                <input
                                    type="number"
                                    id={category.key}
                                    min="0"
                                    step="50"
                                    value={spending[category.key] || ''}
                                    onChange={(e) => handleInputChange(category.key, e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-white/10 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rgs-green focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-300 font-medium">Total Monthly Spending:</span>
                        <motion.span
                            key={totalMonthlySpend}
                            initial={{ scale: 1.2, color: '#10b981' }}
                            animate={{ scale: 1, color: '#ffffff' }}
                            className="text-2xl font-bold text-white"
                        >
                            {formatCurrency(totalMonthlySpend)}
                        </motion.span>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                    <span className="text-3xl">🏆</span>
                    Top Cards for Your Spending
                </h2>

                {totalMonthlySpend === 0 ? (
                    <div className="text-center py-12 text-gray-400 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-lg">Enter your monthly spending above to see the best cards for you.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {rankedCards.map((result, index) => (
                                <motion.div
                                    key={result.card._id}
                                    layoutId={result.card._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{
                                        layout: { type: 'spring', stiffness: 300, damping: 30 },
                                        delay: index * 0.1
                                    }}
                                    layout
                                >
                                    <Link href={`/${result.card.slug?.current}`}>
                                        <div
                                            className={`relative rounded-2xl overflow-hidden h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,136,0.15)] ${index === 0
                                                ? 'bg-gradient-to-br from-rgs-green/20 to-emerald-900/40 border-2 border-rgs-green'
                                                : 'bg-white/5 backdrop-blur-md border border-white/10'
                                                }`}
                                        >
                                            {/* Rank Badge */}
                                            <div
                                                className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg ${index === 0
                                                    ? 'bg-rgs-green text-rgs-black'
                                                    : index === 1
                                                        ? 'bg-gray-200 text-gray-800'
                                                        : 'bg-amber-700 text-white'
                                                    }`}
                                            >
                                                #{index + 1}
                                            </div>

                                            {/* Card Image */}
                                            {result.card.image && (
                                                <div className="relative h-40 bg-gradient-to-br from-white/5 to-white/10">
                                                    <Image
                                                        src={urlFor(result.card.image).width(400).height(200).url()}
                                                        alt={result.card.name}
                                                        fill
                                                        className="object-contain p-2"
                                                    />
                                                </div>
                                            )}

                                            {/* Card Details */}
                                            <div className="p-6 space-y-4">
                                                <h3 className="text-lg font-bold line-clamp-2 text-white">{result.card.name}</h3>

                                                {/* Value Breakdown */}
                                                <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Annual Points:</span>
                                                        <span className="font-medium text-white">{formatPoints(result.annualPoints)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Point Value:</span>
                                                        <span className="font-medium text-rgs-green">
                                                            +{formatCurrency(result.pointValue)}
                                                        </span>
                                                    </div>
                                                    {result.annualCredits > 0 && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">Annual Credits:</span>
                                                            <span className="font-medium text-rgs-green">
                                                                +{formatCurrency(result.annualCredits)}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {result.annualFee > 0 && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">Annual Fee:</span>
                                                            <span className="font-medium text-red-400">
                                                                -{formatCurrency(result.annualFee)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Net Value */}
                                                <div className="pt-4 border-t border-white/10">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-semibold text-gray-300">Net Annual Value:</span>
                                                        <motion.span
                                                            key={result.netValue}
                                                            initial={{ scale: 1.1 }}
                                                            animate={{ scale: 1 }}
                                                            className={`text-xl font-bold ${result.netValue >= 0 ? 'text-rgs-green' : 'text-red-400'
                                                                }`}
                                                        >
                                                            {result.netValue >= 0 ? '+' : ''}
                                                            {formatCurrency(result.netValue)}
                                                        </motion.span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Disclaimer */}
            <Disclaimer variant="compact">
                Values are estimates based on a default point valuation of {DEFAULT_CPP} cents per point.
                Actual value may vary based on redemption method. Annual credits assume full utilization.
            </Disclaimer>
        </div>
    )
}
