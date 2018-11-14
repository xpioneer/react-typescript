import * as React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
            <Route path="/" component={Home}></Route>
            <Route path="/login" exact component={Login}></Route>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;