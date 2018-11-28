import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Provider } from 'mobx-react'
import stores from '../stores'
import Home from '@pages/home/home'
import Login from '@pages/login/login'


class App extends React.Component {

  render(){

    return (
      <Provider {...stores}>
        <Router>
          <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Redirect to="/home"/>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;