import React, { useReducer } from 'react'
import { AppStore, reducer, initState } from 'stores/store'
import { Navigation } from 'routes/index'

const App: React.FC = () => {

  const store = useReducer(reducer, initState)

  return (
    <AppStore.Provider value={store}>
      <Navigation />
    </AppStore.Provider>
  )
}

export default App