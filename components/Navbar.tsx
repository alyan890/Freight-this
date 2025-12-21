'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import UserMenu from './UserMenu'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const [hasNotifications, setHasNotifications] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/supporters', label: 'Supporters' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (path: string) => pathname === path

  // Check for notifications
  useEffect(() => {
    if (!session?.user) return

    const checkNotifications = async () => {
      try {
        const endpoint = session.user.role === 'ADMIN' ? '/api/admin/counts' : '/api/user/counts'
        const response = await fetch(endpoint)
        if (response.ok) {
          const data = await response.json()
          setHasNotifications(data.jobs > 0 || data.applications > 0 || data.comments > 0)
        }
      } catch (error) {
        console.error('Failed to check notifications:', error)
      }
    }

    checkNotifications()
    const interval = setInterval(checkNotifications, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [session])

  return (
    <nav className="bg-[#f5f0e6] border-b border-[#e0d9c7] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 relative">
            <Image src="/PNG-1.png" alt="FreightThis" width={70} height={70} priority />
            <div className="text-2xl font-bold text-gray-800">
              Freight<span className="text-amber-700">This</span>
            </div>
            {session && hasNotifications && (
              <div className="absolute -top-1 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-amber-700 border-b-2 border-amber-700'
                    : 'text-gray-700 hover:text-amber-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center space-x-4">
            {session ? (
              <UserMenu />
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-all duration-300 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-800 hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-amber-700 hover:bg-[#e0d9c7]"
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
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Create Account Button placed at the far right */}
          <Link
            href="/signup"
            className="hidden md:inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-amber-700 hover:to-amber-800 hover:shadow-lg hover:scale-105 transition-all duration-300 transform"
          >
            Create an Account
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#e0d9c7] text-amber-700'
                    : 'text-gray-700 hover:bg-[#e0d9c7] hover:text-amber-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              {session ? (
                <div className="border-t border-[#e0d9c7] pt-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-700">
                    Logged in as <span className="text-amber-700">{session.user.name}</span>
                  </div>
                  {session.user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#e0d9c7] hover:text-amber-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-sm font-medium bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
