import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { draftMode } from 'next/headers'
import Script from 'next/script'

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

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
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

        <footer className="bg-rgs-off-black text-white py-12 mt-20 border-t border-rgs-green">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">The Rich Grad Student</h3>
                <p className="text-white/80 text-sm">
                  Millionaire Style Travel, GRAD STUDENT BUDGET
                </p>
              </div>

              <div className="flex gap-8">
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
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-white/70 text-sm">
              <p>© 2026 The Rich Grad Student LLC. All rights reserved.</p>
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
