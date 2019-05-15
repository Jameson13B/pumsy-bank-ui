import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Admin = () => {
  return (
    <Container>
      <h1>Pumsy Bank System</h1>
      Admin
      <Link to='/'>Home</Link>
    </Container>
  )
}

export default Admin

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
