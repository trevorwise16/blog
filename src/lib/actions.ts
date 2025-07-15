"use server"

import { db } from "@/db"
import { blogPosts } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function createSlug(s: string) {
        return s
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
}

export async function createPost(formData: FormData) {
        const title = formData.get("title") as string
        const content = formData.get("content") as string

        if (!title || !content) {
                throw new Error("Title and content are required")
        }

        const slug = createSlug(title)

        try {
                const [post] = await db
                        .insert(blogPosts)
                        .values({
                                title,
                                content,
                                slug,
                                status: "published",
                                authorId: "trevor", // You can update this when auth is implemented
                                publishedAt: new Date(),
                        })
                        .returning()

                revalidatePath("/")
        } catch (error) {
                console.error("Failed to create post:", error)
                throw new Error("Failed to create post")
        }

        redirect("/")
}

export async function saveDraft(formData: FormData) {
        const title = formData.get("title") as string
        const content = formData.get("content") as string

        if (!title || !content) {
                throw new Error("Title and content are required")
        }

        const slug = createSlug(title)

        try {
                const [post] = await db
                        .insert(blogPosts)
                        .values({
                                title,
                                content,
                                slug,
                                status: "draft",
                                authorId: "trevor",
                        })
                        .returning()

                // Revalidate any pages that might show drafts
                revalidatePath("/")

                return { success: true, id: post.id }
        } catch (error) {
                console.error("Failed to save draft:", error)
                throw new Error("Failed to save draft")
        }
}
