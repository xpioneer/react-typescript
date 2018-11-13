import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Provider } from 'mobx-react'
import stores from '../stores'
import Login from '@pages/login/login'
import Home from '@pages/home/home'

class App extends React.Component {

  render(){

    return (
      <Provider {...stores}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            {/* <Redirect from="/" to="/home"></Redirect> */}
            <Route path="/login" exact component={Login}></Route>
            {/* <Route component={NotFound}></Route> */}
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;