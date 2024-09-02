import { IBase } from './base'

export interface IArticle extends IBase {
  title: string

  abstract: string

  description: string

  tag: string[]
}