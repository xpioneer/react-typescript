import { UserInfo } from 'types/user'


export enum LangI18n {
  'zh-CN' = '简体中文',
  'en-US' = 'English',
}

export type LangKeys = keyof typeof LangI18n


export class Store {
  lang: LangKeys = 'zh-CN'
  authorized = false
  loading = false
  userInfo = new UserInfo
  collapsed = false
}