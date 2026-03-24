import { create } from 'zustand'
import { LangI18n, Store, Theme } from '@/types/global'
import { User } from '@/models/user'
import { createActions, StoreState } from './actions'


export const useAppState = create<StoreState>((set, get, api) => ({
  ...new Store(), // initial state
  ...createActions(set, get), // Actions
}))
