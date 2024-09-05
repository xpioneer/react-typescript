import React, { useReducer } from 'react'
import { Provider } from 'mobx-react'
import stores from '../stores'
import { AppStore, reducer, initState } from 'stores/store'
import { Navigation } from 'routes/index'

const App: React.FC = () => {

  const store = useReducer(reducer, initState)

  return (
    <Provider {...stores}>
      <AppStore.Provider value={store}>
        <Navigation />
      </AppStore.Provider>
    </Provider>
  )
}

export default App