import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Provider } from 'mobx-react'
import stores from '../stores'

const { lazy, Suspense } = React
const Home = lazy(() => import( /* webpackChunkName:"home" */'@pages/home/home'))
const Login = lazy(() => import( /* webpackChunkName:"login" */'@pages/login/login'))

class App extends React.Component {

  render(){

    return (
      <Provider {...stores}>
        <Router>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route path="/home" component={(props: any) => <Home {...props}/>}/>
              <Route path="/login" exact component={(props: any) => <Login {...props}/>}/>
              <Redirect to="/home"/>
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    )
  }
}

export default App;