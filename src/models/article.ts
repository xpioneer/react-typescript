import { IBase } from './base'
import { IArticleType } from './articleType'
import { ITag } from './tag'

export interface IArticle extends IBase {
  title: string

  abstract: string

  description: string

  tag: string[]
}

export type ArticlesData = {
  articles?: IPageData<IArticle>
  article?: IArticle
  articleTypes: {
    list: IArticleType[]
  }
  tags: {
    list: ITag[]
  }
}
