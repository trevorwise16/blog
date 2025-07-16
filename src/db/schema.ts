import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  pgEnum,
  integer,
  boolean,
} from 'drizzle-orm/pg-core'

export const postStatusEnum = pgEnum('post_status', [
  'draft',
  'published',
  'archived',
])

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
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export type BlogPost = typeof blogPosts.$inferSelect
export type NewBlogPost = typeof blogPosts.$inferInsert

export const birds = pgTable('birds', {
  id: serial('id').primaryKey(),
  speciesCode: varchar('species_code', { length: 20 }).notNull().unique(),
  sciName: varchar('sci_name', { length: 255 }).notNull(),
  comName: varchar('com_name', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  taxonOrder: integer('taxon_order').notNull(),
  order: varchar('order', { length: 100 }),
  familyCode: varchar('family_code', { length: 50 }),
  familyComName: varchar('family_com_name', { length: 255 }),
  familySciName: varchar('family_sci_name', { length: 255 }),
  extinct: boolean('extinct').default(false),
  extinctYear: integer('extinct_year'),
  reportAs: varchar('report_as', { length: 20 }),
  imageUrl: text('image_url'), // For storing fetched image URLs
  description: text('description'), // For storing Wikipedia descriptions
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export type Bird = typeof birds.$inferSelect
export type NewBird = typeof birds.$inferInsert
