import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function generateStaticParams() {
  const files = fs.readdirSync('posts');
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }));
}

export default async function BlogPost({ params }) {
  const filePath = path.join('posts', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-sm text-gray-500">{data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
