'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

// ISSUERS constant removed in favor of dynamic props

interface IssuerFilterProps {
    issuers?: Array<{ label: string; value: string }>
}

export default function IssuerFilter({ issuers = [] }: IssuerFilterProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentIssuer = searchParams.get('issuer') || ''

    // Combine "All" with fetched issuers
    const allIssuers = [
        { label: 'All', value: '' },
        ...issuers
    ]

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set(name, value)
            } else {
                params.delete(name)
            }
            return params.toString()
        },
        [searchParams]
    )

    const handleIssuerChange = (issuerValue: string) => {
        const queryString = createQueryString('issuer', issuerValue)
        router.push(queryString ? `${pathname}?${queryString}` : pathname)
    }

    // Fallback to hardcoded list if no issuers provided? 
    // Ideally we rely on passed props, but if empty initially we could show defaults or nothing.
    // For now assuming props will be passed, or we show just "All".
    const displayIssuers = allIssuers.length > 1 ? allIssuers : [
        { label: 'All', value: '' },
        { label: 'Chase', value: 'Chase' },
        { label: 'Amex', value: 'American Express' },
        { label: 'Citi', value: 'Citi' },
        { label: 'Capital One', value: 'Capital One' },
        { label: 'Discover', value: 'Discover' },
    ]

    return (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {displayIssuers.map((issuer) => (
                <button
                    key={issuer.value || 'all'}
                    onClick={() => handleIssuerChange(issuer.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 border ${currentIssuer === issuer.value
                        ? 'bg-rgs-green text-black border-rgs-green'
                        : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                        }`}
                >
                    {issuer.label}
                </button>
            ))}
        </div>
    )
}
