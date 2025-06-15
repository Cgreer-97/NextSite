import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

type Props = {
  params: { slug: string };
};

// REQUIRED for static site generation
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDir);

  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default async function Post({ params }: Props) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return { notFound: true }; // fallback if file doesn't exist
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <main className="prose p-6 max-w-2xl mx-auto">
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
