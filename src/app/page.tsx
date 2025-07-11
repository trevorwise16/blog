import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

async function getPosts() {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .orderBy(desc(blogPosts.publishedAt));
    return posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          My Blog
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to my personal blog
        </p>
      </header>

      <main>
        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt || post.content}
                </p>
                <div className="text-sm text-gray-500">
                  Published on {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Unknown date'}
                </div>
              </article>
            ))
          ) : (
            <p className="text-gray-600">No posts found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
