'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import SearchModal from './SearchModal'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/articles', label: 'Articles' },
    { href: '/credit-cards', label: 'Credit Cards' },
    { href: '/about', label: 'About Us' },
  ]

  // Handle Cmd/Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-rgs-off-black/95 backdrop-blur-lg border-b border-rgs-green/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-bold bg-gradient-to-r from-rgs-light-green to-emerald-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">The Rich Grad Student</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-rgs-light-green transition-colors duration-300 font-semibold px-4 py-2 rounded-lg hover:bg-rgs-green/20 relative group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-rgs-light-green"
                    initial={{ width: 0 }}
                    whileHover={{ width: '70%' }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </Link>
              ))}

              {/* Desktop Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="ml-2 flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white bg-rgs-black/50 hover:bg-rgs-green/20 border border-gray-600 hover:border-rgs-green/50 rounded-lg transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <kbd className="text-xs px-1.5 py-0.5 bg-rgs-black/50 rounded border border-gray-600">⌘K</kbd>
              </button>
            </div>

            {/* Mobile buttons */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-rgs-light-green transition-colors p-2"
                aria-label="Open search"
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-rgs-light-green transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-rgs-black border-t border-rgs-green overflow-hidden"
            >
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
                className="px-4 py-4 space-y-2"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      open: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          y: { stiffness: 1000, velocity: -100 }
                        }
                      },
                      closed: {
                        y: 20,
                        opacity: 0,
                        transition: {
                          y: { stiffness: 1000 }
                        }
                      }
                    }}
                  >
                    <Link
                      href={link.href}
                      className="block text-white hover:text-rgs-light-green transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-rgs-dark-green/30"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

