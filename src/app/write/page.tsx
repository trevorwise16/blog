"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Write() {
        const [title, setTitle] = useState("")
        const [content, setContent] = useState("")

        const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault()
                // For now, just log the data
                console.log("Title:", title)
                console.log("Content:", content)

                // TODO: Add API call to save post to database
                alert("Post would be saved! (Check console)")
        }

        return (
                <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">

                        <main>
                                <form onSubmit={handleSubmit} className="space-y-8
     h-full flex flex-col">
                                        <div>
                                                <input
                                                        id="title"
                                                        type="text"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        placeholder="Title"
                                                        className="w-full text-4xl font-bold border-0 shadow-none outline-none bg-transparent p-0 placeholder:text-muted-foreground focus:ring-0 focus:ring-offset-0"
                                                        required
                                                />
                                        </div>

                                        <div className="flex-1">
                                                <textarea
                                                        id="content"
                                                        value={content}
                                                        onChange={(e) => setContent(e.target.value)}
                                                        placeholder="Start writing..."
                                                        className="w-full h-96 border-0 bg-transparent p-0 text-lg leading-relaxed placeholder:text-muted-foreground resize-none focus:outline-none"
                                                        required
                                                />
                                        </div>

                                        <div className="flex gap-4">
                                                <Button type="submit" className="px-6">
                                                        Save Post
                                                </Button>
                                                <Button type="button" variant="outline" className="px-6">
                                                        Save Draft
                                                </Button>
                                        </div>
                                </form>
                        </main>
                </div>
        )
}
