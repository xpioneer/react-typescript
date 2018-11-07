import * as React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from '@components/notFound'
import Login from '@pages/login/login'
import Home from '@pages/home/home'

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="" exact component={Home}></Route>
          <Route path="/login" exact component={Login}></Route>
          {/* <Route component={NotFound}></Route> */}
        </Switch>
      </Router>
  );
}

export default App;