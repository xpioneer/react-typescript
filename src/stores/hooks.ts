import { useAppStore } from './global'
import { Action, setTheme } from './actions'
import { THEME_MODE } from '@/constants'
import { Theme } from '../types/global'
import { storage } from '../utils/tools'

/**
 * set app theme
 * @param theme enum Theme
 */
export const useTheme = (theme: Theme, dispatch: React.Dispatch<Action>) => {
  storage.set(THEME_MODE, theme)
  dispatch(setTheme(theme))
}