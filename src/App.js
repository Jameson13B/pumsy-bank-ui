import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import Home from './Views/Home'
import Dashboard from './Views/Dashboard'
import Reporting from './Views/Reporting'
import Admin from './Views/Admin'
import Profile from './Views/Profile'
import Store from './Views/Store'

const AppContainer = styled.div`
  text-align: center;
`

function App() {
  return (
    <AppContainer>
      <Route exact path='/' component={Home} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/reports' component={Reporting} />
      <Route path='/admin' component={Admin} />
      <Route path='/store' component={Store} />
      <Route path='/profile/:id' component={Profile} />
    </AppContainer>
  )
}

export default App
