import { createContext, Dispatch, useContext, useReducer } from 'react'
import { Store } from '@/types/global'
import { Action, } from './actions'

export const initState = new Store

type AppContextProps = [Store, Dispatch<Action>] | undefined

export const AppStore = createContext<AppContextProps>(undefined)

export const useAppStore = () => {
  const store = useContext(AppStore)
  if (!store) {
    throw new Error('useAppStore must be used within a AppStore.Provider');
  }
  return store
}