import { IAction, ICreateStore } from './model'

// compose
const compose = (fns: Function[]) => fns.reduce((f, g) => (...args: any[]) => f(g(args)))

// 中间件
const loggerMiddleware = (store: any) => {
  return (next: Function) => {
    return (action: IAction) => {
      next(action)
    }
  }
}


export const applyMiddleware = (...middlewares: Function[]) => {
  return (createStore: Function) => {
    return (reducer: Function, initState: any): ICreateStore => {
      const store: ICreateStore = createStore(reducer, initState)
      const chain = middlewares.map(middleware => middleware(store))
      let dispatch = store.dispatch
      // chain.reverse().forEach(middleware => {
      //   dispatch = middleware(dispatch)
      // })
      dispatch = compose(chain)(dispatch)
      store.dispatch = dispatch // 重写dispatch
      return store
    }
  } 
} 