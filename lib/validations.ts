import { z } from 'zod'

// Job Post validation schema
export const jobPostSchema = z.object({
  title: z.string().min(3, 'Job title must be at least 3 characters').max(200),
  description: z.string().min(50, 'Job description must be at least 50 characters (tell us more about the role)'),
  location: z.string().min(2, 'Please enter a job location'),
  category: z.string().min(2, 'Please select a job category'),
  jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP']),
  contactEmail: z.string().email('Please enter a valid email address'),
  companyName: z.string().optional(),
  salary: z.string().optional(),
  requirements: z.string().optional(),
  imageUrl: z.string().optional(),
})

// Application validation schema
export const applicationSchema = z.object({
  applicantName: z.string().min(2, 'Name must be at least 2 characters'),
  applicantEmail: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

// Comment validation schema
export const commentSchema = z.object({
  content: z.string().min(3, 'Comment must be at least 3 characters').max(500),
  authorName: z.string().min(2, 'Name must be at least 2 characters'),
  authorEmail: z.string().email('Invalid email address'),
  pageUrl: z.string().optional(),
  jobPostId: z.string().optional(),
})

// User registration schema
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
})

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type JobPostInput = z.infer<typeof jobPostSchema>
export type ApplicationInput = z.infer<typeof applicationSchema>
export type CommentInput = z.infer<typeof commentSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ContactInput = z.infer<typeof contactSchema>
