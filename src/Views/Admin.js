import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../Components/Icon'
import AdminCreate from '../Components/AdminCreate'
import AdminUpdate from '../Components/AdminUpdate'
import AdminDelete from '../Components/AdminDelete'
import AdminPassword from '../Components/AdminPassword'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: props.view || 'create'
    }
  }
  handleToggleView = e => this.setState({ view: e.target.getAttribute('name') })
  render() {
    return (
      <Container>
        <Header>
          <CstmLink to='/'>
            <Icon icon='home' />
          </CstmLink>
          <h3>Admin</h3>
        </Header>
        <Body>
          <Nav>
            <NavBtn name='create' onClick={this.handleToggleView}>
              Create
            </NavBtn>
            <NavBtn name='update' onClick={this.handleToggleView}>
              Update
            </NavBtn>
            <NavBtn name='delete' onClick={this.handleToggleView}>
              Delete
            </NavBtn>
            <NavBtn name='password' onClick={this.handleToggleView}>
              Password
            </NavBtn>
          </Nav>
          {this.state.view === 'create' ? <AdminCreate /> : null}
          {this.state.view === 'update' ? <AdminUpdate /> : null}
          {this.state.view === 'delete' ? <AdminDelete /> : null}
          {this.state.view === 'password' ? <AdminPassword /> : null}
        </Body>
      </Container>
    )
  }
}

export default Admin

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 75%;
  height: 9vh;
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
const Body = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  height: 84vh
  padding: 2vh;
  width: 75%;
`
const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const NavBtn = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  padding: 15px;
  width: 20%;
  :hover {
    background: #444;
  }
`
