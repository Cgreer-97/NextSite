import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

// Non-async component
export default function Post({ params }: { params: Params }) {
  const { slug } = params;
  const postsDir = path.join(process.cwd(), 'posts');
  const postPath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(postPath)) {
    // Optionally you can throw or return notFound component here if you want
    return <p>Post not found</p>;
  }

  // Read and process markdown content synchronously (since component is sync)
  const fileContents = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(fileContents);

  // We can't use `await` inside sync component, so we use remark synchronously with `.processSync`
  const processedContent = remark().use(html).processSync(content);
  const contentHtml = processedContent.toString();

  return (
    <main className="prose p-6 max-w-2xl mx-auto">
      <h1>{data.title || slug}</h1>
      <p>{data.date || ''}</p>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
