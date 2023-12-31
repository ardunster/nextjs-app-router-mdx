import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { globSync } from 'glob'

/** Available article paths in file system and navigation. Add additional article paths here. */
export type Subdirectory = 'articles'

/** Categories available to the filterArticlesByCategory function. */
export type ArticleCategory = 'category_1' | 'category_2'

export interface ArticleData {
  publishedDate: Date
  modifiedDate?: Date
  title: string
  description: string
  tags: string[]
  thumbnailUrl: string
  thumbnailSourceUrl?: string
  status: 'published' | 'draft'
  category: ArticleCategory
  // This typing can safely be removed if not using any additional YAML tags.
  [key: string]: any
}

export interface Article {
  data: ArticleData
  slug: string
  subdirectory: Subdirectory
  content: string
}

function getArticlesDirectory(subdirectory: Subdirectory) {
  const root = process.cwd()
  return path.join(root, `src/content/${subdirectory}`)
}

function recurseFilenamesInSubdirectory(
  directory: string,
  subdirectory: string,
  filenames: string[],
) {
  const files = fs.readdirSync(path.join(directory), {
    withFileTypes: true,
  })

  files.forEach((file) => {
    if (file.isDirectory()) {
      filenames = recurseFilenamesInSubdirectory(
        path.join(directory, file.name),
        path.join(subdirectory, file.name),
        filenames,
      )
    } else {
      filenames.push(path.join(subdirectory, file.name))
    }
  })

  return filenames
}

export function getFilenames(subdirectory: Subdirectory) {
  const articlesDirectory = getArticlesDirectory(subdirectory)
  return globSync(
    [articlesDirectory + '/**/*.md', articlesDirectory + '/**/*.mdx'],
    {
      absolute: false,
      cwd: articlesDirectory,
    },
  )
}

function sortArticlesByDate(article1: Article, article2: Article) {
  const date1 = article1.data.publishedDate.getTime()
  const date2 = article2.data.publishedDate.getTime()
  return date2 - date1
}

export function getArticles(subdirectory: Subdirectory): Article[] {
  const filenames = getFilenames(subdirectory)
  return filenames
    .map((filename) => {
      return getArticle(subdirectory, [filename])
    })
    .filter((article) => {
      return article.data.status !== 'draft'
    })
    .sort(sortArticlesByDate)
}

export function getArticle(
  subdirectory: Subdirectory,
  slugOrFilePath: string[],
): Article {
  const basePath = path.join(
    getArticlesDirectory(subdirectory),
    ...slugOrFilePath,
  )
  const filePaths = globSync([basePath + '.md', basePath + '.mdx', basePath])
  const markdownWithMeta = fs.readFileSync(filePaths[0], 'utf-8')
  const { data, content } = matter(markdownWithMeta)
  const articleData: ArticleData = {
    publishedDate: new Date(data.date),
    modifiedDate: data.modified ? new Date(data.modified) : undefined,
    title: data.title,
    description: data.description,
    tags: data.tags,
    thumbnailUrl: data.thumbnailUrl,
    // You can default these data imports to ensure they are always defined, if
    // you're not sure whether you can guarantee they are in all the content files.
    category: data.category ?? 'category_1',
    status: data.status ?? 'published',
    // This line can be removed if you are only using explicit data fields,
    // for example if you remove the [key: string]: any typing from the
    // ArticleData type.
    ...data,
  }
  return {
    data: articleData,
    content: content,
    slug: path.join(...slugOrFilePath).split('.')[0],
    subdirectory,
  }
}

export function filterArticlesByCategory(
  article: Article[],
  category: ArticleCategory,
): Article[] {
  return article.filter((article) => {
    return article.data.category === category
  })
}
