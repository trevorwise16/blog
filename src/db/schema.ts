import { pgTable, serial, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const postStatusEnum = pgEnum('post_status', ['draft', 'published', 'archived']);

export const blogPosts = pgTable('blog_posts', {
        id: serial('id').primaryKey(),
        title: varchar('title', { length: 255 }).notNull(),
        slug: varchar('slug', { length: 255 }).notNull().unique(),
        content: text('content').notNull(),
        excerpt: text('excerpt'),
        authorId: varchar('author_id', { length: 255 }),
        status: postStatusEnum('status').default('draft').notNull(),
        featuredImageUrl: text('featured_image_url'),
        tags: text('tags').array(),
        metaTitle: varchar('meta_title', { length: 255 }),
        metaDescription: text('meta_description'),
        publishedAt: timestamp('published_at', { withTimezone: true }),
        createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
        updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
