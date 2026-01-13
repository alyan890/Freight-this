"use client"

import { useMemo, useState } from 'react'

export interface AdminUserRow {
  id: string
  email: string
  name: string
  createdAt: string
}

export default function AdminUsersTable({ users }: { users: AdminUserRow[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter((user) => {
      const name = user.name?.toLowerCase() || ''
      const email = user.email?.toLowerCase() || ''
      return name.includes(q) || email.includes(q)
    })
  }, [query, users])

  return (
    <div className="bg-white rounded-lg border border-[#e0d9c7] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 gap-3 border-b border-[#e0d9c7] bg-[#faf8f3]">
        <label className="flex-1 text-sm text-gray-700">
          <span className="sr-only">Search users</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-[#e0d9c7] bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Search by name or email"
          />
        </label>
        <div className="text-xs text-gray-600 whitespace-nowrap pr-1">
          {filtered.length} / {users.length} shown
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#e0d9c7]">
          <thead className="bg-[#faf8f3]">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#e0d9c7]">
            {filtered.length === 0 ? (
              <tr>
                <td className="px-6 py-4 text-sm text-gray-500" colSpan={3}>
                  No users found.
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
