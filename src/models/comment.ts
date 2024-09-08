import { BaseModel } from './base'

export interface Comment extends BaseModel {

  description: string

  articleId: string

  parentId: string

  ip: string

  client: string
}