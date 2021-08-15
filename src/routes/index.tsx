import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loading from '@components/loading'
import { routes } from './pageRoutes'

const { Suspense } = React

const Routes = (authorized: boolean) => <Suspense fallback={<Loading/>}>
  <Switch>
    {
      routes.map(r => {
        const {path, exact, component} = r
        const LazyCom = component
        return <Route
          key={path + ''}
          exact={exact !== false}
          path={path}
          render={(props: any) => (authorized ? <LazyCom {...props}/> : <Redirect to="/login"/>)}/>
      })
    }
  </Switch>
</Suspense>

export default Routes