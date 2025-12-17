'use client'

import { useState, useRef, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NotificationCounts {
  jobs: number
  applications: number
  comments: number
}

export default function UserMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [counts, setCounts] = useState<NotificationCounts>({ jobs: 0, applications: 0, comments: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!session?.user) return

    const fetchCounts = async () => {
      try {
        setLoading(true)
        const endpoint = session.user.role === 'ADMIN' ? '/api/admin/counts' : '/api/user/counts'
        const response = await fetch(endpoint)
        if (response.ok) {
          const data = await response.json()
          setCounts(data)
        }
      } catch (error) {
        console.error('Failed to fetch counts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
    // Refresh counts every 30 seconds
    const interval = setInterval(fetchCounts, 30000)
    return () => clearInterval(interval)
  }, [session])

  if (!session) return null

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
    setIsOpen(false)
  }

  const isAdmin = session.user.role === 'ADMIN'
  const userInitial = session.user.name?.charAt(0).toUpperCase() || 'U'
  const totalNotifications = counts.jobs + counts.applications + counts.comments

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#e0d9c7] transition-colors relative"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
          {userInitial}
        </div>

        {/* Notification Dot */}
        {totalNotifications > 0 && (
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-[#e0d9c7] z-50">
          {/* User Info Section */}
          <div className="px-4 py-4 border-b border-[#e0d9c7] bg-gradient-to-br from-[#faf8f3] to-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg">
                {userInitial}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{session.user.name}</div>
                <div className="text-xs text-gray-500 truncate">{session.user.email}</div>
                <div className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${isAdmin ? 'text-amber-700' : 'text-green-700'}`}>
                  {isAdmin ? (
                    <>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"></path>
                      </svg>
                      Administrator
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                      User
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="px-4 py-3 border-b border-[#e0d9c7] bg-white">
            <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">
              {isAdmin ? '🔔 Notifications' : '📊 Activity'}
            </h3>

            {loading ? (
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {isAdmin ? (
                  <>
                    {/* Admin Dashboard Link */}
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded hover:bg-amber-50 transition-colors text-gray-700 font-medium text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                        Admin Dashboard
                      </span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>

                    {/* Jobs */}
                    <Link
                      href="/admin/jobs"
                      onClick={async () => {
                        await fetch('/api/admin/counts', { method: 'POST', body: JSON.stringify({ type: 'jobs' }) })
                        setIsOpen(false)
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded hover:bg-amber-50 transition-colors text-gray-700 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        Jobs
                      </span>
                      {counts.jobs > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{counts.jobs}</span>
                      )}
                    </Link>

                    {/* Applications */}
                    <Link
                      href="/admin/applications"
                      onClick={async () => {
                        await fetch('/api/admin/counts', { method: 'POST', body: JSON.stringify({ type: 'applications' }) })
                        setIsOpen(false)
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded hover:bg-amber-50 transition-colors text-gray-700 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Applications
                      </span>
                      {counts.applications > 0 && (
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">{counts.applications}</span>
                      )}
                    </Link>

                    {/* Comments */}
                    <Link
                      href="/admin/comments"
                      onClick={async () => {
                        await fetch('/api/admin/counts', { method: 'POST', body: JSON.stringify({ type: 'comments' }) })
                        setIsOpen(false)
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded hover:bg-amber-50 transition-colors text-gray-700 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                        Comments
                      </span>
                      {counts.comments > 0 && (
                        <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">{counts.comments}</span>
                      )}
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Jobs */}
                    <Link
                      href="/jobs"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded hover:bg-green-50 transition-colors text-gray-700 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        Jobs
                      </span>
                      {counts.jobs > 0 && (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">{counts.jobs}</span>
                      )}
                    </Link>

                    {/* Applications */}
                    <Link
                      href="/jobs"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded hover:bg-green-50 transition-colors text-gray-700 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Applications
                      </span>
                      {counts.applications > 0 && (
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">{counts.applications}</span>
                      )}
                    </Link>

                    {/* Comments */}
                    <Link
                      href="/jobs"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded hover:bg-green-50 transition-colors text-gray-700 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                        Comments
                      </span>
                      {counts.comments > 0 && (
                        <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">{counts.comments}</span>
                      )}
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Profile Settings Section */}
          <div className="border-t border-[#e0d9c7] p-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-amber-50 rounded transition-colors font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Profile Settings</span>
            </Link>
          </div>

          <div className="border-t border-[#e0d9c7] p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded transition-colors font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
