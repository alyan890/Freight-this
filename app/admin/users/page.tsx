import { auth } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface DashboardUser {
  id: string
  email: string
  name: string
  createdAt: string
}

async function getUsers(): Promise<DashboardUser[]> {
  if (!supabaseAdmin) {
    console.warn('[Admin Users] SUPABASE_SERVICE_ROLE_KEY is not configured')
    return []
  }

  const { data, error } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 })

  if (error) {
    console.error('[Admin Users] Failed to fetch users from Supabase:', error)
    return []
  }

  return (data.users || []).map((user) => {
    const metadata = user.user_metadata || {}
    const name = (metadata.name as string) || (metadata.full_name as string) || 'N/A'

    return {
      id: user.id,
      email: user.email ?? 'N/A',
      name,
      createdAt: user.created_at ?? '',
    }
  })
}

export default async function AdminUsersPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const users = await getUsers()

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-600">Showing existing Supabase users</p>
        </div>

        <div className="bg-white rounded-lg border border-[#e0d9c7] overflow-hidden">
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
                {users.length === 0 ? (
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-500" colSpan={3}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
