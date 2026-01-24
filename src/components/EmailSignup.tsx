'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'

// Validation schema
const emailSchema = z.string().email('Please enter a valid email address')

export default function EmailSignup() {
    const [email, setEmail] = useState('')
    const [honeypot, setHoneypot] = useState('') // Hidden field for bots
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Bot check: if honeypot is filled, silent reject
        if (honeypot) {
            console.log('Bot detected')
            return
        }

        try {
            // Validate email
            emailSchema.parse(email)

            setStatus('loading')

            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong')
            }

            setStatus('success')
            setMessage('You are on the list! Watch your inbox.')
            setEmail('')
        } catch (error) {
            setStatus('error')
            if (error instanceof z.ZodError) {
                setMessage((error as z.ZodError<any>).errors[0].message)
            } else if (error instanceof Error) {
                setMessage(error.message)
            } else {
                setMessage('Something went wrong. Please try again.')
            }
        }
    }

    return (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rgs-dark-green to-rgs-black shadow-2xl border border-rgs-green/30">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-rgs-green/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-rgs-gold/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="relative px-6 py-12 md:px-12 md:py-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
                        Never Miss a <span className="text-rgs-gold">Great Deal</span>
                    </h2>

                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        We only email when there&apos;s something genuinely worth your time—usually just once a month when we find an exceptional offer.
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Honeypot field (hidden) */}
                            <input
                                type="text"
                                name="website_url"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                tabIndex={-1}
                                autoComplete="off"
                                className="hidden"
                                aria-hidden="true"
                            />

                            <div className="flex-grow text-left">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (status === 'error') setStatus('idle')
                                    }}
                                    placeholder="enter@email.com"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="w-full px-5 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rgs-gold/50 focus:border-rgs-gold transition-all backdrop-blur-sm"
                                    aria-label="Email address"
                                />
                                <AnimatePresence>
                                    {status === 'error' && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-red-400 text-sm mt-2 ml-1"
                                        >
                                            {message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`px-8 py-4 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center min-w-[140px] transition-all
                  ${status === 'success'
                                        ? 'bg-green-500 text-white cursor-default'
                                        : 'bg-gradient-to-r from-rgs-gold to-yellow-500 text-rgs-off-black hover:shadow-rgs-gold/20'
                                    }
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
                            >
                                {status === 'loading' ? (
                                    <svg className="animate-spin h-6 w-6 text-rgs-off-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : status === 'success' ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    'Join'
                                )}
                            </motion.button>
                        </div>
                    </form>

                    <p className="mt-6 text-sm text-gray-400">
                        No spam, ever. Unsubscribe anytime.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
