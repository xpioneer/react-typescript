import { IBase } from './base'

export interface ILeaveMsg extends IBase {

  description: string
  
  parentId: string

  ip: string

  client: string
}