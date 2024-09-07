import { isLogged, storage } from '@/utils/tools'
import { UserInfo } from 'types/user'
import { PREFERS_COLOR_SCHEME_DARK, PRIMARY_COLOR, COLOR_PRIMARY_KEY, CUSTOM_DARK_MODE } from '@/constants'

export enum LangI18n {
  'zh-CN' = '简体中文',
  'en-US' = 'English',
}

export type LangKeys = keyof typeof LangI18n


export class Store {
  dark = storage.get(CUSTOM_DARK_MODE) === '1' || window.matchMedia(PREFERS_COLOR_SCHEME_DARK).matches
  colorPrimary = storage.get(COLOR_PRIMARY_KEY) || PRIMARY_COLOR
  lang: LangKeys = 'zh-CN'
  authorized = isLogged()
  loading = false
  userInfo = new UserInfo
}