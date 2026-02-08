import React from 'react'

interface StudentCardDisclaimerProps {
    cardName?: string
    className?: string
}

/**
 * Disclaimer for student-branded cards to clarify target audience
 * Required for CARD Act compliance when reviewing "Student" cards
 */
export default function StudentCardDisclaimer({
    cardName,
    className = ''
}: StudentCardDisclaimerProps) {
    return (
        <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 ${className}`}>
            <p className="text-sm text-blue-800">
                <strong>Graduate Student Content:</strong>{' '}
                {cardName ? (
                    <>
                        While the {cardName} is marketed as a &quot;student&quot; card, our review is intended for
                        graduate students age 21 and older.
                    </>
                ) : (
                    <>
                        This content is intended for graduate students age 21 and older.
                    </>
                )}{' '}
                If you&apos;re under 21, federal rules limit credit card approvals—you may need
                independent income or a co-signer to be approved.{' '}
                <a href="/editorial-policy" className="underline hover:text-blue-600">
                    See our editorial policy
                </a>.
            </p>
        </div>
    )
}
