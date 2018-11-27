import * as React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'mobx-react'
import stores from '../stores'
// import Login from '@pages/login/login'
// import Home from '@pages/home/home'

const {lazy, Suspense} = React
const Login = lazy(() => import('@pages/login/login'))
const Home = lazy(() => import('@pages/home/home'))


class App extends React.Component {

  render(){

    return (
      <Provider {...stores}>
        <Router>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route path="/" render={props => {
                console.log('home------', props)
                return <Home {...props}/>}
                }></Route>
              <Route path="/login" exact render={props => <Login {...props}/>}></Route>
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    )
  }
}

export default App;