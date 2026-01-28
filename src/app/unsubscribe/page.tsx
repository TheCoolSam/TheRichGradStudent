'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'

function UnsubscribeContent() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (!id) {
            setStatus('error')
            setMessage('No subscriber ID found. Please use the link from your email.')
            return
        }

        const unsubscribe = async () => {
            try {
                const res = await fetch('/api/unsubscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                })

                if (!res.ok) {
                    throw new Error('Failed to unsub')
                }

                setStatus('success')
            } catch (err) {
                console.error(err)
                setStatus('error')
                setMessage('Failed to unsubscribe. You may already be unsubscribed or the link is invalid.')
            }
        }

        unsubscribe()
    }, [id])

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                {status === 'loading' && (
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-rgs-green border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">Unsubscribing you...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Unsubscribed</h1>
                        <p className="text-gray-600">
                            You have been successfully removed from our mailing list. We are sorry to see you go!
                        </p>
                        <Link href="/" className="inline-block px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium mt-4">
                            Return to Homepage
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Error</h1>
                        <p className="text-red-600">{message}</p>
                        <Link href="/" className="inline-block px-6 py-2 bg-rgs-green text-white rounded-lg hover:bg-rgs-dark-green transition-colors font-medium mt-4">
                            Go Home
                        </Link>
                    </div>
                )}
            </div>
        </main>
    )
}

export default function UnsubscribePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <UnsubscribeContent />
        </Suspense>
    )
}
