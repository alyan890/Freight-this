import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'FreightThis - Find Your Dream Partnership',
  description:
    'FreightThis is a modern partnership portal connecting talented professionals with top employers. Browse partnerships, apply, and find your next career opportunity.',
  keywords: ['partnerships', 'careers', 'partnership portal', 'employment', 'recruitment'],
  icons: {
    icon: [
      { url: '/PNG-1.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'FreightThis - Find Your Dream Partnership',
    description: 'Connect with top employers and discover opportunities that match your skills.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} antialiased bg-white flex flex-col min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main className='flex-1'>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
