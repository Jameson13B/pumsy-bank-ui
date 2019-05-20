import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../Components/Icon'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Container>
        <Title>Pumsy Bank System</Title>
        <BtnPanel>
          <IconBtn>
            <CstmLink to='/dashboard'>
              <p>Dashboard</p>
              <Icon icon='dashboard' />
            </CstmLink>
          </IconBtn>
          <IconBtn>
            <CstmLink to='/reports'>
              <p>Reporting</p>
              <Icon icon='description' />
            </CstmLink>
          </IconBtn>
          <IconBtn>
            <CstmLink to='/admin'>
              <p>Admin</p>
              <Icon icon='face' />
            </CstmLink>
          </IconBtn>
          <IconBtn>
            <CstmLink to='/store'>
              <p>Store</p>
              <Icon icon='store' />
            </CstmLink>
          </IconBtn>
        </BtnPanel>
        <br />
        <span style={{ fontSize: '1rem', padding: '15px' }}>
          By Atomic10 Studios
        </span>
      </Container>
    )
  }
}

export default Home

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  a {
    margin: 30px auto;
  }
`
const Title = styled.h1`
  font-size: 2.5rem;
  margin: 30px auto;
`
const BtnPanel = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 65%;
`
const IconBtn = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  padding: 15px;
  width: 20%;
  cursor: pointer;
  :hover {
    background: #444;
  }
  i {
    padding: 15px;
    display: block;
  }
`
const CstmLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.25rem;
`
