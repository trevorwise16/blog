CREATE TYPE "public"."post_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"excerpt" text,
	"author_id" varchar(255),
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"featured_image_url" text,
	"tags" text[],
	"meta_title" varchar(255),
	"meta_description" text,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
