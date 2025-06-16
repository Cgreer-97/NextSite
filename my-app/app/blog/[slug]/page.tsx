import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

type Params = {
  slug: string
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDir)

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }))
}

export default async function Post({ params }: { params: Params }) {
  const { slug } = params
  const postsDir = path.join(process.cwd(), 'posts')
  const postPath = path.join(postsDir, `${slug}.md`)

  let fileContents: string
  try {
    fileContents = await fs.readFile(postPath, 'utf8')
  } catch {
    return <p>Post not found</p>
  }

  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return (
    <main className="prose p-6 max-w-2xl mx-auto">
      <h1>{data.title || slug}</h1>
      <p>{data.date || ''}</p>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  )
}
