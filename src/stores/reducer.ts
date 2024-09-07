import { Store } from 'types/global'
import { UserInfo } from 'types/user'
import { ACTION_TYPE, Action, } from './actions'

export const reducer = (
  state: Store,
  { type, payload }: Action
): Store => {
  // console.log(type, payload)
  switch(type) {
    case ACTION_TYPE.SET_DARK:
      return {
        ...state,
        dark: payload as boolean
      }
    case ACTION_TYPE.SET_PRIMARY:
      return {
        ...state,
        colorPrimary: payload as string
      }
    case ACTION_TYPE.SET_AUTHORIZED:
      return {
        ...state,
        authorized: payload as boolean
      }
    case ACTION_TYPE.SET_LOADING:
      return {
        ...state,
        loading: payload as boolean
      }
    case ACTION_TYPE.SET_USER_INFO:
      return {
        ...state,
        userInfo: payload as UserInfo
      }

    default:
      return state
  }
}