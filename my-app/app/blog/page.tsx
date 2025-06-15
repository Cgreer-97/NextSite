import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDir);

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const fileContent = fs.readFileSync(path.join(postsDir, filename), 'utf8');
    const { data } = matter(fileContent);
    return { slug, title: data.title, date: data.date };
  });

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <p className="text-xl text-blue-600 hover:underline">{post.title}</p>
            </Link>
            <p className="text-sm text-gray-500">{post.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
