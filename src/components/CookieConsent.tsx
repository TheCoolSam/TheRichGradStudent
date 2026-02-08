'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COOKIE_CONSENT_KEY = 'rgs_cookie_consent'

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
        if (!consent) {
            // Delay showing banner slightly for better UX
            const timer = setTimeout(() => setShowBanner(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
        setShowBanner(false)
    }

    const handleDecline = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
        setShowBanner(false)
    }

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-rgs-black/95 backdrop-blur-lg rounded-2xl border border-rgs-green/30 shadow-2xl p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Cookie icon */}
                            <div className="hidden sm:flex w-12 h-12 bg-gradient-to-br from-rgs-green to-rgs-dark-green rounded-full items-center justify-center flex-shrink-0">
                                <span className="text-2xl">🍪</span>
                            </div>

                            {/* Text content */}
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-1">
                                    We use cookies
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    We use cookies to enhance your browsing experience, remember your preferences,
                                    and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                                    Read our{' '}
                                    <a href="/privacy" className="text-rgs-light-green hover:underline">
                                        Privacy Policy
                                    </a>{' '}
                                    for more information.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 w-full sm:w-auto flex-shrink-0">
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 sm:flex-none px-4 py-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200 text-sm font-medium"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 sm:flex-none px-6 py-2 bg-gradient-to-r from-rgs-green to-rgs-light-green text-rgs-black font-bold rounded-lg hover:shadow-lg hover:shadow-rgs-green/30 transition-all duration-200 text-sm"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
