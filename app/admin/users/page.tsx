import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminUsersTable from '@/components/AdminUsersTable'

export const dynamic = 'force-dynamic'

interface DashboardUser {
  id: string
  email: string
  name: string
  createdAt: Date
}

async function getUsers(): Promise<DashboardUser[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return users.map((user) => ({
    id: user.id,
    email: user.email ?? 'N/A',
    name: user.name ?? 'N/A',
    createdAt: user.createdAt,
  }))
}

export default async function AdminUsersPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const users = await getUsers()
  const tableRows = users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt.toLocaleDateString(),
  }))

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-600">Showing existing Supabase users</p>
        </div>

        <AdminUsersTable users={tableRows} />
      </div>
    </div>
  )
}
