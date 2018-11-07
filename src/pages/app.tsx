import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Demo } from './demo/demo'
import NotFound from '@components/notFound'

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Demo}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
  );
}

export default App;