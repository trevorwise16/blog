import Form from 'next/form'
import { Button } from '@/components/ui/button'
import { createPost, saveDraft } from '@/lib/actions'
import { AuthGuard } from '@/components/auth-guard'

export default function Write() {
  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
        <main>
          <Form action={createPost} className="space-y-8 h-full flex flex-col">
            <div>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                className="w-full text-4xl font-bold border-0 shadow-none outline-none bg-transparent p-0 placeholder:text-muted-foreground focus:ring-0 focus:ring-offset-0"
                required
              />
            </div>

            <div className="flex-1">
              <textarea
                id="content"
                name="content"
                placeholder="Start writing..."
                className="w-full h-96 border-0 bg-transparent p-0 text-lg leading-relaxed placeholder:text-muted-foreground resize-none focus:outline-none"
                required
              />
            </div>

            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6 z-40">
              <div className="flex gap-4 justify-end pr-16">
                <Button type="submit" className="px-6">
                  Save Post
                </Button>
                <Button
                  type="submit"
                  formAction={saveDraft}
                  variant="outline"
                  className="px-6"
                >
                  Save Draft
                </Button>
              </div>
            </div>
          </Form>
        </main>
      </div>
    </AuthGuard>
  )
}
