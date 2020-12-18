import * as React from 'react'
import { Button } from 'antd'


function useState<T> (initialValue: T): [T, (newState: T) => void] {
  let state = initialValue

  function setState (newState: T) {
    state = newState
    // render()
  }
  return [state, setState]
}


export const HookButton: React.FC = props => {

  let [count, setCount] = React.useState(0)

  React.useEffect(() => {
    console.log(count, '_v')
  }, [count > 5])
  
  return <Button onClick={() => setCount(++count)}>{count}</Button>
}

const AppContext = React.createContext(null)

const { Provider, Consumer } = AppContext

const DemoContextGrandson: React.FC = props => {

  const msg = React.useContext(AppContext)
  
  return <div>孙子节点：{msg}</div>
}

const DemoContextSon: React.FC = props => {
  
  return <Consumer>
    {/* <DemoContextGrandson></DemoContextGrandson> */}
  </Consumer>
}



const DemoContext: React.FC = props => {
  
  return <Provider value="this is test context">
    <DemoContextSon></DemoContextSon>
  </Provider>
}

