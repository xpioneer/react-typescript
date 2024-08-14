import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { Provider } from 'mobx-react'
import stores from '../stores'
import Loading from '@/components/loading'
import { ConfigProvider, theme } from 'antd'

const { lazy, Suspense } = React
const Home = lazy(() => import( /* webpackChunkName:"home" */'@pages/home/home'))
const Login = lazy(() => import( /* webpackChunkName:"login" */'@pages/login/loginNew'))

const App: React.FC = () => {

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
        <Router>
          <Suspense fallback={<Loading size="large"/>}>
            <Switch>
              <Route path="/login" exact component={(props: any) => <Login {...props}/>}/>
              <Route path="/" component={(props: any) => <Home {...props}/>}/>
              <Redirect to="*"/>
            </Switch>
          </Suspense>
        </Router>
      </ConfigProvider>
    </Provider>
  )
}

export default App