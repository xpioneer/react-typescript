
export interface IAction {
  type: string
  playload?: any
}

export interface IAnyObject {
  [key: string]: any
}

export interface ICreateStore {
  getState: Function
  dispatch: Function
  subscribe: Function
  replaceReducer: Function
}