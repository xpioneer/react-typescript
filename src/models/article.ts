import { BaseModel } from './base'
import { ArticleType } from './articleType'
import { Tag } from './tag'

export interface Article extends BaseModel {
  title: string

  abstract: string

  description: string

  tag: string[]
}

export type ArticlesData = {
  articles?: IPageData<Article>
  article?: Article
  articleTypes: {
    list: ArticleType[]
  }
  tags: {
    list: Tag[]
  }
}
