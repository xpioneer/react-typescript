import { isLogged, object2Options, storage } from '@/utils/tools'
import { User } from '@models/user'
import {
  PREFERS_COLOR_SCHEME_DARK,
  PRIMARY_COLOR,
  COLOR_PRIMARY_KEY,
  THEME_MODE,
  SYS_LANG,
} from '@/constants'

export enum LangI18n {
  '简体中文' = 'zh_CN',
  'English' = 'en_US',
  '繁体中文' = 'zh_TW',
}

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


const getSystemLang = () => {
  const language = window.navigator.language
  return /^en/g.test(language) ? LangI18n.English : LangI18n.简体中文
}

export const getCurrentLang = () => {
  const lang = storage.get(SYS_LANG) as LangI18n
  if (Object.keys(LangI18n).includes(lang)) {
    return lang
  }
  // if user not set language, use system language
  return getSystemLang()
}

export class Store {
  theme = getCurrentTheme()
  colorPrimary = getCurrentColor()
  lang = getCurrentLang()
  authorized = isLogged()
  loading = false
  userInfo = new User()
}