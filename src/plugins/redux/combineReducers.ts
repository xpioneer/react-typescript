import { IAction, IAnyObject } from './model'

// 组合reducer，计算后存为单个state
export const combineReducers = (reducers: IAnyObject) => {
  // 这里重新组合state
  return (state: IAnyObject = {}, action: IAction) => {
    let newState: IAnyObject = {}
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action)
    }
    return newState
  }
}