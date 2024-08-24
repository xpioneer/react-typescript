
export type QueryForm = Pick<ArticleType, 'name' | 'createdAt'>


export type ArticleType = {
  name: string
  remark: string
  createdAt: any
  creator: any
}
