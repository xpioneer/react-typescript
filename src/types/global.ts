import { isLogged, storage } from '@/utils/tools'
import { UserInfo } from 'types/user'
import { PRIMARY_COLOR, PRIMARY_KEY } from '@/constants'

export enum LangI18n {
  'zh-CN' = '简体中文',
  'en-US' = 'English',
}

export type LangKeys = keyof typeof LangI18n


export class Store {
  dark = false
  primary = storage.get(PRIMARY_KEY) || PRIMARY_COLOR
  lang: LangKeys = 'zh-CN'
  authorized = isLogged()
  loading = false
  userInfo = new UserInfo
}