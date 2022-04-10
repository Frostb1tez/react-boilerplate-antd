import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import { Spin } from 'antd'

const Home = lazy(() => import('../pages/Home'))
const DepositPage = lazy(() => import('../pages/Deposit'))
const Withdraw = lazy(() => import('../pages/Withdraw'))
const Routes = () => {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <Switch>
        <Route path={['/', '/deposit', '/withdraw']}>
          <AuthLayout>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/deposit">
              <DepositPage />
            </Route>
            <Route exact path="/withdraw">
              <Withdraw />
            </Route>
          </AuthLayout>
        </Route>
      </Switch>
    </Suspense>
  )
}

export default Routes
