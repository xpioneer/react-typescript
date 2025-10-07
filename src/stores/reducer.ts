import { LangI18n, Store, Theme } from '@/types/global'
import { User } from '@/models/user'
import { ACTION_TYPE, Action, } from './actions'

export const reducer = (
  state: Store,
  { type, payload }: Action
): Store => {
  // console.log(type, payload)
  switch (type) {
    case ACTION_TYPE.SET_THEME:
      return {
        ...state,
        theme: payload as Theme,
      }
    case ACTION_TYPE.SET_LANG:
      return {
        ...state,
        lang: payload as LangI18n,
      }
    case ACTION_TYPE.SET_PRIMARY:
      return {
        ...state,
        colorPrimary: payload as string,
      }
    case ACTION_TYPE.SET_AUTHORIZED:
      return {
        ...state,
        authorized: payload as boolean,
      }
    case ACTION_TYPE.SET_LOADING:
      return {
        ...state,
        loading: payload as boolean,
      }
    case ACTION_TYPE.SET_USER_INFO:
      return {
        ...state,
        userInfo: payload as User,
      }

    default:
      return state
  }
}