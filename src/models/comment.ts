import { IBase } from './base'

export interface IComment extends IBase {

  description: string

  articleId: string

  parentId: string

  ip: string

  client: string
}