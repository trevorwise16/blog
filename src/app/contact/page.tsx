export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Contact</h1>
        <p className="text-lg text-muted-foreground">Get in touch with me.</p>
      </header>

      <main className="space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Feel free to reach out if you have any questions, comments, or just
            want to connect.
          </p>

          <div className="space-y-2">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Email:</strong>{' '}
              your.email@example.com
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Twitter:</strong>{' '}
              @yourusername
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">GitHub:</strong>{' '}
              github.com/yourusername
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
