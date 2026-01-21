import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { draftMode } from 'next/headers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'The Rich Grad Student | Millionaire Style Travel, GRAD STUDENT BUDGET',
  description: 'We believe graduate students have the most to gain from mastering the points travel game. Ultimate millionaire guide to credit cards for grad students.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = draftMode()
  
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
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
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-white/70 text-sm">
              <p>© 2026 The Rich Grad Student. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
