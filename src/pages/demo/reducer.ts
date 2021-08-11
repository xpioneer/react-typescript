import { createStore, combineReducers, IAction } from '../../plugins/redux'

const initCountState = {
  count: 0
}

const initInfoState = {
  name: '这里是Redux',
  desc: '我们可以学习到redux的原理...'
}

const ADD = 'ADD', DECREASE = 'DECREASE'

export const countActions = {
  
  [ADD]: {
    type: ADD
  },

  [DECREASE]: {
    type: DECREASE
  }
}

// reducer
const countReducer = (state = initCountState, action: IAction) => {
  switch (action.type) {
    case ADD :
      state.count++
      console.log('add', state)
      return state
    case DECREASE :
      state.count--
      console.log('dec', state)
      return state
    default :
      return state
  }
}

// reducer
const infoReducer = (state = initInfoState, action: IAction) => {
  let random =  + Math.random()
  switch (action.type) {
    case 'SET_NAME' :
      state.name = '这里是Redux' + random
      return state
    case 'SET_DESC' :
      state.desc = '我们可以学习到redux的原理...' + random
      return state
    default :
      return state
  }
}


// 合并reducer
const rootReducer = combineReducers({
  counter: countReducer,
  info: infoReducer
})

// store
const store = createStore(rootReducer)

export {
  store
}