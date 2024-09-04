import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import useAntApp from 'components/message'
import Loading from '@components/loading'

const Home = lazy(() => import( /* webpackChunkName:"home" */'@pages/home/home'))
const Login = lazy(() => import( /* webpackChunkName:"login" */'@pages/login'))
const Register = lazy(() => import( /* webpackChunkName:"register" */'@pages/register'))

export const Routes: React.FC = () => {
  const app = useAntApp()

  return <Router>
    <Suspense fallback={<Loading size="large"/>}>
      <Switch>
        <Route path="/login" exact component={(props: any) => <Login {...props}/>}/>
        <Route path="/register" exact component={(props: any) => <Register {...props}/>}/>
        <Route path="/" component={(props: any) => <Home {...props}/>}/>
        <Redirect to="*"/>
      </Switch>
    </Suspense>
  </Router>
}
