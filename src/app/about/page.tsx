export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          About
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn more about this blog and its author.
        </p>
      </header>
      
      <main className="prose prose-lg max-w-none">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Welcome to my personal blog where I share thoughts, experiences, and insights 
            on various topics that interest me.
          </p>
          
          <p className="text-muted-foreground">
            This blog is built with Next.js, Tailwind CSS, shadcn/ui components, and 
            PostgreSQL for data storage.
          </p>
        </div>
      </main>
    </div>
  );
}