import { Store, LangKeys } from 'types/global'
import { UserInfo } from 'types/user'

export type ValueOfStore = Store[keyof Store]

export enum ACTION_TYPE {
  SET_AUTHORIZED,
  SET_LANG,
  SET_LOADING,
  SET_USER_INFO,
  SET_COLLAPSED,
}

export type Action<T = ValueOfStore> = {
  type: ACTION_TYPE
  payload: T
}

// action
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

export const setCollapsed = (payload = false) => ({
  type: ACTION_TYPE.SET_COLLAPSED,
  payload
})

export const setUserInfo = (payload: UserInfo) => ({
  type: ACTION_TYPE.SET_USER_INFO,
  payload
})
