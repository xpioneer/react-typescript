import React, { useReducer } from 'react'
import { Provider } from 'mobx-react'
import stores from '../stores'
import { AppStore, reducer, initState } from 'stores/store'
import { AppCustomize } from './appCustomize'

const App: React.FC = () => {

  const store = useReducer(reducer, initState)

  return (
    <Provider {...stores}>
      <AppStore.Provider value={store}>
        <AppCustomize />
      </AppStore.Provider>
    </Provider>
  )
}

export default App