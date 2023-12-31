import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/app/_utils/articles'

export function ArticleCard(props: { article: Article }) {
  const { article } = props
  return (
    <Link
      href={`/${article.subdirectory}/${article.slug}`}
      data-testid={'article-card'}
    >
      <div
        style={{
          border: 'gray solid 1px',
          margin: '1em',
          padding: '0.75em',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ flex: 'auto' }}>
          <h3>{article.data.title}</h3>
          <p>{article.data.description}</p>
          <p>
            <small>{article.data.publishedDate.toLocaleDateString()}</small>
          </p>
          <p>
            <small>
              Tags:{' '}
              {article.data.tags.map((tag: string, index: number) => {
                return (
                  <span key={index}>
                    {tag}
                    {index !== article.data.tags.length - 1 && ', '}
                  </span>
                )
              })}
            </small>
          </p>
        </div>
        <div style={{ flex: '0 1 auto' }}>
          <Image
            src={`/images/${article.data.thumbnailUrl}`}
            alt="thumbnail"
            width={320}
            height={200}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </Link>
  )
}
