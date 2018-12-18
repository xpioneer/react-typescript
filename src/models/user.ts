import { IBase } from './base'

export interface IUser extends IBase {

  username: string

  nickName: string

  userType: number

  sex: number

  remark: string
}