import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import JsonLd from '@/components/JsonLd'
import { AnimationProvider } from '@/components/AnimationProvider'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'The Rich Grad Student | Millionaire Style Travel, GRAD STUDENT BUDGET',
  description: 'We believe graduate students have the most to gain from mastering the points travel game. Ultimate millionaire guide to credit cards for grad students.',
  keywords: 'credit cards, travel points, graduate students, travel hacking, credit card rewards, points and miles',
  authors: [{ name: 'The Rich Grad Student' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'The Rich Grad Student | Millionaire Style Travel, GRAD STUDENT BUDGET',
    description: 'Ultimate millionaire guide to credit cards for grad students',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Rich Grad Student',
    description: 'Ultimate millionaire guide to credit cards for grad students',
  },
  metadataBase: new URL('https://therichgradstudent.com'),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = await draftMode()

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Rich Grad Student',
    url: 'https://therichgradstudent.com',
    logo: 'https://therichgradstudent.com/favicon.svg',
    sameAs: [
      'https://instagram.com/TheRichGradStudent',
      'https://facebook.com/TheRichGradStudent',
      'https://threads.net/@TheRichGradStudent',
      'https://x.com/TheRichGradStudent'
    ],
    description: 'Mastering the points travel game on a graduate student budget.',
    founder: [
      {
        '@type': 'Person',
        name: 'Giorgio Sarro'
      },
      {
        '@type': 'Person',
        name: 'Karan Jakhar'
      }
    ]
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <meta name="fo-verify" content="fa9f7891-10c2-42c0-af32-8bb43acf60c1" />
        <JsonLd data={orgSchema} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-gray-900 bg-[#FAFAFA]`}>
        {isEnabled && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-2 text-center font-bold">
            Preview Mode Enabled
            <a href="/api/disable-draft" className="ml-4 underline">
              Exit Preview
            </a>
          </div>
        )}
        <Navbar />
        <div className={isEnabled ? "pt-28" : "pt-16"}>
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </div>

        <footer className="bg-rgs-off-black text-white pt-12 pb-24 md:pb-12 mt-20 border-t border-rgs-green supports-[padding-bottom:env(safe-area-inset-bottom)]:pb-[calc(3rem+env(safe-area-inset-bottom))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <address className="not-italic text-left">
                  <h3 className="text-xl font-bold mb-2">The Rich Grad Student</h3>
                  <p className="text-white/80 text-sm">
                    Upgraded Travel, GRAD STUDENT BUDGET
                  </p>
                </address>
              </div>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-8">
                <Link
                  href="/"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/privacy"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/editorial-policy"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Editorial Policy
                </Link>
                <Link
                  href="/llms.txt"
                  className="text-white/40 hover:text-white transition-colors text-sm"
                >
                  AI Knowledge
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col items-center gap-6">
              {/* Social Media Links */}
              <div className="flex gap-6">
                <a
                  href="https://instagram.com/TheRichGradStudent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-rgs-green transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/TheRichGradStudent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-rgs-green transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://threads.net/@TheRichGradStudent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-rgs-green transition-colors"
                  aria-label="Threads"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.812-.674 1.96-1.089 3.42-1.233.9-.09 1.958-.086 3.094.012.012-.814-.073-1.56-.252-2.228-.243-.905-.715-1.645-1.41-2.206-1.057-.852-2.574-1.074-3.868-.566-1.113.438-1.94 1.283-2.326 2.376l-1.95-.672c.534-1.515 1.651-2.683 3.144-3.29.606-.246 1.255-.388 1.924-.422 1.996-.1 3.98.456 5.44 1.635 1.058.853 1.826 1.986 2.226 3.28.236.762.358 1.578.367 2.448l.002.096c.092.057.182.116.27.176.936.639 1.653 1.475 2.073 2.418.784 1.763.832 4.463-1.271 6.52-1.876 1.833-4.178 2.615-7.454 2.637zm-.3-10.166c-1.34-.035-2.435.213-3.17.716-.623.425-.934.996-.9 1.652.037.701.391 1.294 1.024 1.715.67.444 1.527.63 2.416.528 1.2-.137 2.12-.65 2.669-1.487.393-.6.622-1.382.685-2.333-.89-.082-1.792-.124-2.723-.148z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/TheRichGradStudent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-rgs-green transition-colors"
                  aria-label="X"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
              <p className="text-white/70 text-sm">© 2026 The Rich Grad Student LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Cookie Consent Banner */}
        <CookieConsent />

        {/* Google Analytics */}

      </body>
    </html>
  )
}
