import { Store, LangKeys, Theme, getSystemTheme } from 'types/global'
import { User } from 'models/user'

export type ValueOfStore = Store[keyof Store]

export enum ACTION_TYPE {
  SET_THEME,
  SET_PRIMARY,
  SET_AUTHORIZED,
  SET_LANG,
  SET_LOADING,
  SET_USER_INFO,
}

export type Action<T = ValueOfStore> = {
  type: ACTION_TYPE
  payload: T
}

// actions
export const setTheme = (payload = getSystemTheme()) => ({
  type: ACTION_TYPE.SET_THEME,
  payload
})

export const setPrimary = (payload = '#e87722') => ({
  type: ACTION_TYPE.SET_PRIMARY,
  payload
})

export const setAuthorized = (payload = false) => ({
  type: ACTION_TYPE.SET_AUTHORIZED,
  payload
})

export const setLang = (payload: LangKeys = 'zh-CN') => ({
  type: ACTION_TYPE.SET_LANG,
  payload
})

export const setLoading = (payload = false) => ({
  type: ACTION_TYPE.SET_LOADING,
  payload
})

export const setUserInfo = (payload: User) => ({
  type: ACTION_TYPE.SET_USER_INFO,
  payload
})
