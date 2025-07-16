import { db } from '@/db'
import { blogPosts } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'

async function getPosts() {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .orderBy(desc(blogPosts.publishedAt))
    return posts
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return []
  }
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Trevor&apos;s Soapbox
        </h1>
      </header>

      <main>
        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="border-b border-border pb-8">
                <Link
                  href={`/posts/${post.slug}`}
                  className="block hover:bg-accent p-4 -m-4 rounded-lg transition-colors"
                >
                  <h2 className="text-2xl font-semibold text-foreground mb-2 hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt || post.content}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Published on{' '}
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : 'Unknown date'}
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <p className="text-muted-foreground">No posts found.</p>
          )}
        </div>
      </main>
    </div>
  )
}
