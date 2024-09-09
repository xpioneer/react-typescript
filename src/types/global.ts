import { isLogged, object2Options, storage } from '@/utils/tools'
import { User } from 'models/user'
import { PREFERS_COLOR_SCHEME_DARK, PRIMARY_COLOR, COLOR_PRIMARY_KEY, THEME_MODE } from '@/constants'

export enum LangI18n {
  'zh-CN' = '简体中文',
  'en-US' = 'English',
}

export type LangKeys = keyof typeof LangI18n

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export const themeOpts = object2Options(Theme)

export const getSystemTheme = () => {
  const darkMode = window.matchMedia(PREFERS_COLOR_SCHEME_DARK).matches
  return darkMode ? Theme.Dark : Theme.Light
}

const getCurrentTheme = () => {
  const theme = storage.get(THEME_MODE) as Theme
  if([Theme.Dark, Theme.Light].includes(theme)) {
    return theme
  }
  // if user not set theme, use system theme
  return getSystemTheme()
}

const getCurrentColor = () => {
  return storage.get(COLOR_PRIMARY_KEY) || PRIMARY_COLOR
}

export class Store {
  theme = getCurrentTheme()
  colorPrimary = getCurrentColor()
  lang: LangKeys = 'zh-CN'
  authorized = isLogged()
  loading = false
  userInfo = new User
}