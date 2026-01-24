'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchResult {
    _id: string
    _type: 'article' | 'post' | 'creditCard'
    title?: string
    name?: string
    slug: {
        current: string
    }
}

interface GroupedResults {
    articles: SearchResult[]
    posts: SearchResult[]
    creditCards: SearchResult[]
}

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<GroupedResults | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    // Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults(null)
            return
        }

        const timeoutId = setTimeout(async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
                const data = await response.json()
                setResults(data)
            } catch (error) {
                console.error('Search failed:', error)
            } finally {
                setIsLoading(false)
            }
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [query])

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setQuery('')
            setResults(null)
        }
    }, [isOpen])

    const handleResultClick = useCallback((result: SearchResult) => {
        let path = ''
        if (result._type === 'article') {
            path = `/articles/${result.slug.current}`
        } else if (result._type === 'post') {
            path = `/${result.slug.current}`
        } else if (result._type === 'creditCard') {
            path = `/${result.slug.current}`
        }

        router.push(path)
        onClose()
    }, [router, onClose])

    const getDisplayTitle = (result: SearchResult) => {
        return result.title || result.name || 'Untitled'
    }

    const hasResults = results && (
        results.articles.length > 0 ||
        results.posts.length > 0 ||
        results.creditCards.length > 0
    )

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
                    >
                        <div className="bg-rgs-off-black/95 backdrop-blur-xl border border-rgs-green/30 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 p-4 border-b border-rgs-green/20">
                                <svg
                                    className="w-5 h-5 text-rgs-light-green flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search articles, blog posts, credit cards..."
                                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                                />
                                {isLoading && (
                                    <div className="w-5 h-5 border-2 border-rgs-light-green/30 border-t-rgs-light-green rounded-full animate-spin" />
                                )}
                                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-rgs-black/50 rounded border border-gray-600">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-[60vh] overflow-y-auto">
                                {query && !isLoading && !hasResults && (
                                    <div className="p-8 text-center text-gray-400">
                                        <p>No results found for &quot;{query}&quot;</p>
                                    </div>
                                )}

                                {hasResults && (
                                    <div className="p-2">
                                        {/* Articles */}
                                        {results.articles.length > 0 && (
                                            <ResultSection
                                                title="Articles"
                                                results={results.articles}
                                                onResultClick={handleResultClick}
                                                getDisplayTitle={getDisplayTitle}
                                                icon={
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                }
                                            />
                                        )}

                                        {/* Blog Posts */}
                                        {results.posts.length > 0 && (
                                            <ResultSection
                                                title="Blog Posts"
                                                results={results.posts}
                                                onResultClick={handleResultClick}
                                                getDisplayTitle={getDisplayTitle}
                                                icon={
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                }
                                            />
                                        )}

                                        {/* Credit Cards */}
                                        {results.creditCards.length > 0 && (
                                            <ResultSection
                                                title="Credit Cards"
                                                results={results.creditCards}
                                                onResultClick={handleResultClick}
                                                getDisplayTitle={getDisplayTitle}
                                                icon={
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                    </svg>
                                                }
                                            />
                                        )}
                                    </div>
                                )}

                                {!query && (
                                    <div className="p-8 text-center text-gray-400">
                                        <p>Start typing to search...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

interface ResultSectionProps {
    title: string
    results: SearchResult[]
    onResultClick: (result: SearchResult) => void
    getDisplayTitle: (result: SearchResult) => string
    icon: React.ReactNode
}

function ResultSection({ title, results, onResultClick, getDisplayTitle, icon }: ResultSectionProps) {
    return (
        <div className="mb-4 last:mb-0">
            <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rgs-light-green uppercase tracking-wider">
                {icon}
                {title}
            </div>
            <div className="space-y-1">
                {results.map((result) => (
                    <button
                        key={result._id}
                        onClick={() => onResultClick(result)}
                        className="w-full text-left px-3 py-3 rounded-lg hover:bg-rgs-green/20 transition-colors duration-200 group"
                    >
                        <span className="text-white group-hover:text-rgs-light-green transition-colors">
                            {getDisplayTitle(result)}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}
