import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  try {
    const post = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    
    return post[0] || null;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {post.title}
          </h1>
          <div className="text-muted-foreground mb-4">
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toISOString()}>
                Published on {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            )}
          </div>
          {post.excerpt && (
            <p className="text-lg text-muted-foreground italic">
              {post.excerpt}
            </p>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}