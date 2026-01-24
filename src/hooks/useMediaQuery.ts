'use client'

import { useState, useEffect } from 'react'

/**
 * Hydration-safe media query hook
 * Returns false on server, then updates on client mount
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        setMatches(media.matches)

        const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
        media.addEventListener('change', listener)
        return () => media.removeEventListener('change', listener)
    }, [query])

    return matches
}

/**
 * Convenience hook for mobile detection
 */
export function useIsMobile(): boolean {
    return useMediaQuery('(max-width: 639px)')
}
