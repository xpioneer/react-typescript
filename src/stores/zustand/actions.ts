import { LangI18n, Theme, Store } from '@/types/global'
import { User } from '@/models/user'
import { storage } from '@/utils/tools'
import { COLOR_PRIMARY_KEY, SYS_LANG, THEME_MODE } from '@/constants'
import { useAppState } from './index'

//demo: Separate actions that update the Zustand store
export const setTheme = (theme: Theme) => {
  storage.set(THEME_MODE, theme)
  useAppState.setState({ theme })
}

export const createActions = (set: (partial: Partial<StoreState>) => void, get: () => StoreState) => ({
  setTheme: (theme: Theme) => {
    storage.set(THEME_MODE, theme)
    set({ theme })
  },
  setPrimary: (colorPrimary: string) => {
    storage.set(COLOR_PRIMARY_KEY, colorPrimary)
    set({ colorPrimary })
  },
  setAuthorized: (authorized: boolean) => {
    set({ authorized })
  },
  setLang: (lang: LangI18n) => {
    storage.set(SYS_LANG, lang)
    set({ lang })
  },
  setLoading: (loading: boolean) => {
    set({ loading })
  },
  setUserInfo: (userInfo: User) => {
    set({ userInfo })
  },
})

// 使用 `ReturnType` 和 `typeof` 从 createActions 的实现中精确推断出 Actions 的类型。
export type Actions = ReturnType<typeof createActions>

// 定义最终的、完整的 StoreState 类型。
export interface StoreState extends Store, Actions {}
