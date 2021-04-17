import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login'
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path={['/login']}>
        <AuthLayout>
          <Route exact path="/login">
            <Login />
          </Route>
        </AuthLayout>
      </Route>
    </Switch>
  )
}

export default Routes
