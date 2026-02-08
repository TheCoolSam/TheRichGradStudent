'use client'

import React from 'react'

interface AffiliateDisclosureProps {
    variant?: 'inline' | 'banner' | 'compact'
    className?: string
}

/**
 * FTC-compliant affiliate disclosure component
 * Use 'inline' for blog posts before first affiliate link
 * Use 'banner' for prominent page-level disclosure
 * Use 'compact' for minimal disclosure in tight spaces
 */
export default function AffiliateDisclosure({
    variant = 'inline',
    className = ''
}: AffiliateDisclosureProps) {

    if (variant === 'compact') {
        return (
            <span className={`text-xs text-gray-500 italic ${className}`}>
                (We may earn a commission if you apply through our links.)
            </span>
        )
    }

    if (variant === 'banner') {
        return (
            <div className={`bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 ${className}`}>
                <p className="text-sm text-amber-800">
                    <strong>Advertiser Disclosure:</strong> We may earn a commission when you click on links and apply for credit cards.
                    This does not influence our ratings or recommendations.{' '}
                    <a href="/editorial-policy" className="underline hover:text-amber-600">
                        Learn more
                    </a>
                </p>
            </div>
        )
    }

    // Default: inline variant
    return (
        <p className={`text-sm text-gray-500 italic bg-gray-50 px-3 py-2 rounded border-l-4 border-rgs-green mb-4 ${className}`}>
            <strong>Disclosure:</strong> We may earn a commission if you use our links.{' '}
            <a href="/editorial-policy" className="underline hover:text-gray-700">
                See our editorial policy
            </a>.
        </p>
    )
}
