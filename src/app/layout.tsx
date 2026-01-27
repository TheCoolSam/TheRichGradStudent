import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import JsonLd from '@/components/JsonLd'

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
      'https://twitter.com/TheRichGradStudent',
      'https://tiktok.com/@TheRichGradStudent',
      'https://youtube.com/@TheRichGradStudent'
    ],
    description: 'Mastering the points travel game on a graduate student budget.',
    founder: [
      {
        '@type': 'Person',
        name: 'Giorgio Sarro'
      },
      {
        '@type': 'Person',
        name: 'Karan'
      }
    ]
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
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
          {children}
        </div>

        <footer className="bg-rgs-off-black text-white pt-12 pb-24 md:pb-12 mt-20 border-t border-rgs-green supports-[padding-bottom:env(safe-area-inset-bottom)]:pb-[calc(3rem+env(safe-area-inset-bottom))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <address className="not-italic text-left">
                  <h3 className="text-xl font-bold mb-2">The Rich Grad Student</h3>
                  <p className="text-white/80 text-sm">
                    Millionaire Style Travel, GRAD STUDENT BUDGET
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
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
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
                  href="https://twitter.com/TheRichGradStudent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-rgs-green transition-colors"
                  aria-label="Twitter/X"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@TheRichGradStudent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-rgs-green transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@TheRichGradStudent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-rgs-green transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
              <p className="text-white/70 text-sm">© 2026 The Rich Grad Student LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
