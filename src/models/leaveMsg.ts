import { BaseModel } from './base'

export interface LeaveMsg extends BaseModel {

  description: string
  
  parentId: string

  ip: string

  client: string
}