'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/articles', label: 'Articles' },
    { href: '/credit-cards', label: 'Credit Cards' },
    { href: '/about', label: 'About Us' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rgs-off-black/95 backdrop-blur-lg border-b border-rgs-green/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold bg-gradient-to-r from-rgs-light-green to-emerald-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">The Rich Grad Student</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-rgs-light-green transition-all duration-200 font-semibold px-4 py-2 rounded-lg hover:bg-rgs-green/10 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-rgs-light-green group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-rgs-light-green transition-colors"
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
  )
}
