import { getArticle, getFilenames } from '@/app/_utils/articles'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Button from '@/app/_components/client/Button'
import SyntaxHighlighterWrapper from '@/app/_components/client/SyntaxHighlighterWrapper'
import Image from 'next/image'
import path from 'path'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const filenames = getFilenames('articles')
  // console.log('filenames', filenames)
  const markdownRegex = /\.md(x)?$/
  const paths = filenames.map((filename) => ({
    slug: filename.replace(markdownRegex, '').split(path.sep),
  }))

  // console.log('generated paths', paths)

  return paths
}

export default async function ArticleBySlug(props: {
  params: Promise<{ slug: string[] }>
}) {
  const params = await props.params
  try {
    const article = getArticle('articles', params.slug)

    return (
      <>
        <h1>{article.data.title}</h1>
        <em>Created: {article.data.publishedDate.toLocaleDateString()}</em>
        <br />
        {article.data.modifiedDate != undefined && (
          <>
            <em>Modified: {article.data.modifiedDate.toLocaleDateString()}</em>
            <br />
          </>
        )}
        <br />
        <Image
          src={`/images/${article.data.thumbnailUrl}`}
          alt="thumbnail"
          width={640}
          height={200}
          style={{ objectFit: 'cover' }}
        />
        <MDXRemote
          source={article.content}
          components={{ Button, SyntaxHighlighter: SyntaxHighlighterWrapper }}
        />
      </>
    )
  } catch (e) {
    notFound()
  }
}
