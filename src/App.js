import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import history from './routerHistory'
import './App.less'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <Router history={history}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  )
}

export default App
