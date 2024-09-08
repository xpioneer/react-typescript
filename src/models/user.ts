import { object2Options } from '@/utils/tools'
import { BaseModel } from './base'

export class User extends BaseModel {

  username: string

  nickName: string

  userType: number

  sex: number

  remark: string
}

export enum UserType {
  超级用户 = 0,
  管理员 = 1,
  普通用户 = 2,
  测试用户 = 9,
}

export const userTypeOpts = object2Options(UserType)


export enum UserSex {
  女 = 0,
  男 = 1,
}

export const userSexOpts = object2Options(UserSex)