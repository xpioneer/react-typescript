import React, { useReducer } from 'react'
import { Provider } from 'mobx-react'
import stores from '../stores'
import { ConfigProvider, theme } from 'antd'
import { AppStore, reducer, initState } from 'stores/store'
import { Routes } from 'routes/index'

const App: React.FC = () => {

  const store = useReducer(reducer, initState)

  return (
    <Provider {...stores}>
      <ConfigProvider
        theme={{
          // algorithm: theme.darkAlgorithm,
          token: {
            // colorPrimary: '#e87722'
          }
        }}
      >
        <AppStore.Provider value={store}>
          <Routes />
        </AppStore.Provider>
      </ConfigProvider>
    </Provider>
  )
}

export default App