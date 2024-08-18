import { createContext, Dispatch, useContext, useReducer } from 'react'
import { Store } from 'types/global'
import { UserInfo } from 'types/user'
import { ACTION_TYPE, Action, } from './actions'

export const initState = new Store

type AppContextProps = [Store, Dispatch<Action>]

export const AppStore = createContext<AppContextProps | undefined>(undefined)

export const reducer = (
  state: Store,
  { type, payload }: Action
): Store => {
  switch(type) {
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
    case ACTION_TYPE.SET_COLLAPSED:
      return {
        ...state,
        collapsed: payload as boolean
      }

    default:
      return state
  }
}

export const useAppStore = () => {
  const store = useContext(AppStore)
  if (!store) {
    throw new Error('useAppStore must be used within a AppStore.Provider');
  }
  return store
}