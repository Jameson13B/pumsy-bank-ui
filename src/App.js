import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import Home from './Views/Home'
import AddPoints from './Views/AddPoints'

const AppContainer = styled.div`
  text-align: center;
`

function App() {
  return (
    <AppContainer>
      <Route exact path='/' component={Home} />
      <Route path='/add-points' component={AddPoints} />
    </AppContainer>
  )
}

export default App
