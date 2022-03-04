import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { Provider } from 'mobx-react'
import stores from '../stores'
import Loading from '@components/loading'

const { lazy, Suspense } = React
const Home = lazy(() => import( /* webpackChunkName:"home" */'@pages/home/home'))
const Login = lazy(() => import( /* webpackChunkName:"login" */'@pages/login/login'))

const App: React.FC = () => {

  return (
    <Provider {...stores}>
      <Router>
        <Suspense fallback={<Loading size="large"/>}>
          <Switch>
            <Route path="/login" exact component={(props: any) => <Login {...props}/>}/>
            <Route path="/" component={(props: any) => <Home {...props}/>}/>
            <Redirect to="*"/>
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App