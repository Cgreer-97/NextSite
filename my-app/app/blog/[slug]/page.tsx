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

// Make the page component SYNC (not async)
export default function Post({ params }: { params: Params }) {
  const { slug } = params;
  const postsDir = path.join(process.cwd(), 'posts');
  const postPath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(postPath)) {
    return <p>Post not found</p>;
  }

  const fileContents = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Use remark synchronously
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
