
export interface IAction {
  type: string
  playload?: any
}

export interface IAnyObject {
  [key: string]: any
}

export interface ICreateStore {
  getState: () => any
  dispatch: (action: IAction) => void
  subscribe: (listener: Function) => () => void
  replaceReducer: (nextReducer: Function) => void
}