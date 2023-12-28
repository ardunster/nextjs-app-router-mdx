import {
  Article,
  filterArticlesByCategory,
  getArticle,
  getArticles,
  getFilenames,
} from '@/app/_utils/articles'
import {
  mockArticleAntwerp,
  mockArticleBermuda,
  mockArticleSome,
  mockArticleSomeOther,
  mockArticleSteve,
} from '@/app/_testutils/testArticles'

describe('getFilenames', () => {
  test('exists', () => {
    expect(getFilenames).toBeDefined()
  })
})

describe('getArticles', () => {
  test('exists', () => {
    expect(getArticles).toBeDefined()
  })

  test('returns an array of articles including some selected articles', () => {
    const result = getArticles('articles')
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.objectContaining({ title: 'Newer Test Article' }),
        }),
        expect.objectContaining({
          data: expect.objectContaining({ title: 'Older Test Article' }),
        }),
      ]),
    )
  })

  test('does not return articles with a status of draft', () => {
    const result = getArticles('articles')
    expect(result).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.objectContaining({
            title: "Some Draft article that isn't finished",
          }),
        }),
      ]),
    )
    expect(result).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'draft',
          }),
        }),
      ]),
    )
  })
})

describe('getArticle', () => {
  test('exists', () => {
    expect(getArticle).toBeDefined()
  })

  test('returns status in object', () => {
    const withDraftStatus = getArticle('articles', [
      '2023',
      'draft-test-article',
    ])
    expect(withDraftStatus.data.status).toEqual('draft')
    const withPublishedStatus = getArticle('articles', [
      '2023',
      'newest-article',
    ])
    expect(withPublishedStatus.data.status).toEqual('published')
  })

  test('defaults article category to category_1 if not defined', () => {
    const testArticle = getArticle('articles', ['2023', 'newest-article'])
    expect(testArticle.data.category).toEqual('category_1')
  })

  test('returns article category category_2 if defined', () => {
    const testArticle = getArticle('articles', ['2023', 'draft-test-article'])
    expect(testArticle.data.category).toEqual('category_2')
  })
})

describe('filterArticlesByCategory', () => {
  const articles: Article[] = [
    mockArticleSteve,
    mockArticleBermuda,
    mockArticleAntwerp,
    mockArticleSome,
    mockArticleSomeOther,
  ]

  test('exists', () => {
    expect(filterArticlesByCategory).toBeDefined()
  })

  test('returns only articles that have the requested category', () => {
    expect(filterArticlesByCategory(articles, 'category_1')).toEqual([
      mockArticleSteve,
      mockArticleAntwerp,
      mockArticleSome,
    ])
    expect(filterArticlesByCategory(articles, 'category_2')).toEqual([
      mockArticleBermuda,
      mockArticleSomeOther,
    ])
  })
})
