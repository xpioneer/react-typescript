import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loading from '@components/loading'
import { routes } from './pageRoutes'

const { Suspense } = React

export const AuthorizedRoutes: React.FC<{authorized: boolean}> = ({
  authorized
}) => <Suspense fallback={<Loading/>}>
  <Switch>
    {
      routes.map(r => {
        const {path, exact, component} = r
        const LazyCom = component as any
        return <Route
          key={path + ''}
          exact={exact !== false}
          path={path}
          render={(props: any) => (authorized ? <LazyCom {...props}/> : <Redirect to="/login"/>)}/>
      })
    }
  </Switch>
</Suspense>
