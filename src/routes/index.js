import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthLayout from '../layouts/AppLayout'
import { Spin } from 'antd'

const Home = lazy(() => import('../pages/Home'))

const Routes = () => {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <Switch>
        <Route path={['/']}>
          <AuthLayout>
            <Route exact path="/">
              <Home />
            </Route>
          </AuthLayout>
        </Route>
      </Switch>
    </Suspense>
  )
}

export default Routes
