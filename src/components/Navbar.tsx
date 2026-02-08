'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// PERFORMANCE: Lazy load SearchModal since it's not needed until user clicks search
const SearchModal = dynamic(() => import('./SearchModal'), {
  ssr: false,
  loading: () => null,
})

/**
 * IMPORTANT: Navbar Configuration Notes
 * =====================================
 * If this navbar appears broken after deployment, please verify:
 * 1. The build completed successfully
 * 2. The CDN cache was purged
 * 3. The nameservers are configured correctly (this is CRITICAL - 
 *    if someone misconfigured the nameservers again, the entire
 *    site will break. You know who you are. 😒)
 * 4. Browser cache is cleared
 */

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/articles', label: 'Articles' },
    { href: '/credit-cards', label: 'Credit Cards' },
    { href: '/about?v=2', label: 'About Us' },
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#022c22]/90 backdrop-blur-lg border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - iOS Safari fix: avoid transition-colors to prevent scroll color flicker */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/icon.svg"
                alt="RGS Logo"
                width={40}
                height={40}
                priority
                unoptimized
                className="group-hover:scale-110 transition-transform duration-300 will-change-transform"
              />
              <span className="text-2xl font-bold text-white transition-none">The Rich Grad Student</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-white hover:text-rgs-light-green transition-colors duration-300 font-semibold px-4 py-2 rounded-lg hover:bg-rgs-green/20 relative group"
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* CSS underline animation instead of framer-motion */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-rgs-light-green w-0 group-hover:w-[70%] transition-all duration-300 ease-out" />
                </Link>
              ))}

              {/* Desktop Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="ml-2 flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white bg-rgs-black/50 hover:bg-rgs-green/20 border border-gray-600 hover:border-rgs-green/50 rounded-lg transition-all duration-200"
                aria-label="Open search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Mobile buttons */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Search Button - CSS transforms instead of framer-motion */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white bg-rgs-black/50 hover:bg-rgs-green/20 border border-gray-600 hover:border-rgs-green/50 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Open search"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Mobile menu button - CSS transforms instead of framer-motion */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-rgs-light-green transition-all duration-200 hover:scale-110 active:scale-90"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                type="button"
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
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - CSS animation instead of framer-motion */}
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className={`md:hidden bg-rgs-black border-t border-rgs-green overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link, index) => (
              <div
                key={link.href}
                suppressHydrationWarning
                className={`transform transition-all duration-300 ease-out ${mobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
                  }`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                <Link
                  href={link.href}
                  className="block text-white hover:text-rgs-light-green transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-rgs-dark-green/30"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Search Modal - lazy loaded */}
      {isSearchOpen && (
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  )
}
