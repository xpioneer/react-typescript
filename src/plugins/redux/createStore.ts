import { IAction, ICreateStore } from './model'

// 创建store
export const createStore = (reducer: Function, initState?: any, enhancer?: Function): ICreateStore => {
  let state: any = initState, listeners: Function[] = [], isDispatch = false
  if(typeof initState === 'function') {
    enhancer = initState
    initState = undefined
  }

  if(enhancer) {
    const newCreateStore =  enhancer(createStore)
    return newCreateStore(reducer, initState)
  } else {
    // 获取状态
    const getState = () => state

    // 订阅
    const subscribe = (listener: Function) => {
      listeners.push(listener)
      const unsubscribe = () => {
        listeners = listeners.filter(ln => listener !== ln) // 保留之前订阅的
      }
      return unsubscribe
    }

    // 更新状态
    const dispatch = (action: IAction) => {
      if(isDispatch){
        throw new Error('dispatching...')
      }
      try{
        isDispatch = true
        console.log('触发方法:', action, '更新之前state:', JSON.stringify(state))
        state = reducer(state, action)
      } finally {
        isDispatch = false
      }
      listeners.forEach(ln => ln())
      console.log('更新state之后:', JSON.stringify(state))
    }

    // 更新reducer
    const replaceReducer = (nextReducer: Function) => {
      reducer = nextReducer
      dispatch({
        type: `@@REDUX/__REPLACE__${Math.random()}`
      })
    }

    // 用来获取初始值
    dispatch({
      type: `@@REDUX/__INIT__${Math.random()}`
    })

    return {
      getState,
      dispatch,
      subscribe,
      replaceReducer
    }
  }
}