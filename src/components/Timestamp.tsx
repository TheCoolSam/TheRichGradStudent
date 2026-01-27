'use client'

interface TimestampProps {
    publishedAt: string
    updatedAt?: string
}

/**
 * Formats a date string to "Month Day, Year" format
 */
function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC' // Fix hydration mismatch by enforcing UTC across server/client
    })
}

/**
 * Check if the update date is significantly different from publish date (>24 hours)
 */
function isSignificantUpdate(publishedAt: string, updatedAt: string): boolean {
    const publishedDate = new Date(publishedAt).getTime()
    const updatedDate = new Date(updatedAt).getTime()
    const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

    return (updatedDate - publishedDate) > twentyFourHours
}

export default function Timestamp({ publishedAt, updatedAt }: TimestampProps) {
    // Hydration fix: Ensure we don't render until we have a stable value or just accept UTC normalization above.
    // The UTC fix above solves the text mismatch. 

    // We also need to fix the updated date formatter usage if it exists:
    // It calls formatDate() inside the component, so it uses the updated wrapper now.
    const showUpdated = updatedAt && isSignificantUpdate(publishedAt, updatedAt)

    return (
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <time dateTime={publishedAt}>
                {formatDate(publishedAt)}
            </time>
            {showUpdated && (
                <>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs text-gray-500 italic">
                        Updated {formatDate(updatedAt)}
                    </span>
                </>
            )}
        </div>
    )
}
