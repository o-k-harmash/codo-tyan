export interface ArticleBase {
  id: string
  title: string
}

export interface ArticlePreview extends ArticleBase {
  description: string
  tags: string[]
}

export interface Article extends ArticleBase {
  rawContent: string
}
