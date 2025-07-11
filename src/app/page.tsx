export default function Home() {
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
          <article className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome to My Blog
            </h2>
            <p className="text-gray-600 mb-4">
              This is the first post on my new blog. More content coming soon!
            </p>
            <div className="text-sm text-gray-500">
              Published on {new Date().toLocaleDateString()}
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
