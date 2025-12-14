// Mock database for development when real DB is unreachable
export const mockUsers = [
  {
    id: '1',
    email: 'admin@freightthis.com',
    password: '$2b$10$gFMLKraOfJDxu9DXCAmSj.t01AaA/yWj67zTcRd5i3.aKmYXIYfgy', // bcrypt hash of 'admin123'
    name: 'Admin User',
    role: 'ADMIN',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: '2',
    email: 'user@freightthis.com',
    password: '$2b$10$8H69WKhuMecCUNwK55erQ.C7iDvFEjZOaNHJYJ4YeamPxOqB1rlWu', // bcrypt hash of 'password123'
    name: 'Test User',
    role: 'USER',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
]

export const mockJobs = [
  {
    id: '1',
    title: 'Truck Driver - Long Haul',
    description: 'Seeking experienced CDL truck drivers for long-haul routes across North America.',
    category: 'DRIVER',
    jobType: 'FULL_TIME',
    location: 'Los Angeles, CA',
    salary: 65000,
    status: 'APPROVED',
    createdAt: new Date('2025-01-10'),
    expiresAt: new Date('2025-02-10'),
    companyName: 'TransCorp Logistics',
    authorId: '1',
  },
  {
    id: '2',
    title: 'Logistics Coordinator',
    description: 'Looking for organized logistics coordinators to manage shipments and schedules.',
    category: 'LOGISTICS',
    jobType: 'FULL_TIME',
    location: 'Dallas, TX',
    salary: 55000,
    status: 'APPROVED',
    createdAt: new Date('2025-01-09'),
    expiresAt: new Date('2025-02-09'),
    companyName: 'ShipEase Inc',
    authorId: '1',
  },
  {
    id: '3',
    title: 'Warehouse Manager',
    description: 'Manage warehouse operations, staff, and inventory for our distribution center.',
    category: 'WAREHOUSE',
    jobType: 'FULL_TIME',
    location: 'Chicago, IL',
    salary: 60000,
    status: 'APPROVED',
    createdAt: new Date('2025-01-08'),
    expiresAt: new Date('2025-02-08'),
    companyName: 'DistCo Hub',
    authorId: '1',
  },
]
