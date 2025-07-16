'use server'

import { db } from '@/db'
import { blogPosts, birds } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth'
import { eq } from 'drizzle-orm'

function createSlug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function createPost(formData: FormData) {
  // Check authentication first
  const session = await requireAuth()

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content) {
    throw new Error('Title and content are required')
  }

  const slug = createSlug(title)

  try {
    await db.insert(blogPosts).values({
      title,
      content,
      slug,
      status: 'published',
      authorId: session.user!.email,
      publishedAt: new Date(),
    })

    revalidatePath('/')
  } catch (error) {
    console.error('Failed to create post:', error)
    throw new Error('Failed to create post')
  }

  redirect('/')
}

export async function saveDraft(formData: FormData) {
  // Check authentication first
  const session = await requireAuth()

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content) {
    throw new Error('Title and content are required')
  }

  const slug = createSlug(title)

  try {
    await db.insert(blogPosts).values({
      title,
      content,
      slug,
      status: 'draft',
      authorId: session.user!.email,
    })

    // Revalidate any pages that might show drafts
    revalidatePath('/')
  } catch (error) {
    console.error('Failed to save draft:', error)
    throw new Error('Failed to save draft')
  }
}

export async function getRandomBirdFromDB() {
  const seed = Math.floor(Math.random() * 11000)
  const [bird] = await db.select().from(birds).where(eq(birds.id, seed))
  return {
    name: bird.comName,
    sciName: bird.sciName,
  }
}
