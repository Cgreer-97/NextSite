export default function Home() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Site</h1>
      <nav className="space-y-2">
        <p>
          <a href="/blog" className="text-blue-600 underline hover:text-blue-800">
            Go to Blog
          </a>
        </p>
        <p>
          <a href="/cars" className="text-blue-600 underline hover:text-blue-800">
            Go to Cars
          </a>
        </p>
      </nav>
    </main>
  );
}
