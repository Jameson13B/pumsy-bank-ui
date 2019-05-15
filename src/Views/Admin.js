import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../Components/Icon'

const Admin = () => {
  return (
    <Container>
      <Header>
        <CstmLink to='/'>
          <Icon icon='home' />
        </CstmLink>
        <h3>Admin</h3>
      </Header>
      <h1>Admin</h1>
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
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
`
const CstmLink = styled(Link)`
  text-decoration: none;
  color: white;
  vertical-align: middle;
  margin-right: 15px;
  :hover {
    color: #bbb;
  }
`
