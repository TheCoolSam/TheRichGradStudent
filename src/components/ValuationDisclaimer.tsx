import React from 'react'

interface ValuationDisclaimerProps {
    className?: string
}

/**
 * Disclaimer for points valuations to qualify claims
 * Required for compliance when showing cpp values or savings claims
 */
export default function ValuationDisclaimer({ className = '' }: ValuationDisclaimerProps) {
    return (
        <p className={`text-xs text-gray-500 mt-2 italic ${className}`}>
            *Point valuations shown are example redemptions; actual values vary by route, dates, and availability.
            Results not typical or guaranteed.
        </p>
    )
}
