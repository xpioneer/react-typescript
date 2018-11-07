import * as React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Demo } from './demo/demo'

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Demo}></Route>
        </Switch>
      </Router>
  );
}

export default App;