import * as React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'mobx-react'
import stores from '../stores'
import Login from '@pages/login/login'
import Home from '@pages/home/home'

const App = () => {
  return (
    <Provider {...stores}>
      <Router>
        <Switch>
          <Route path="" exact component={Home}></Route>
          <Route path="/login" exact component={Login}></Route>
          {/* <Route component={NotFound}></Route> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;