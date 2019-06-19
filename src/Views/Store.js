import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../Components/Icon'
import ItemMgmt from '../Components/StoreItemMgmt'
import PurchaseLog from '../Components/StorePurchaseLog'

class Store extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: props.view || 'log'
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
          <h3>Store</h3>
        </Header>
        <Body>
          <Nav>
            <NavBtn name='log' onClick={this.handleToggleView}>
              Purchase Log
            </NavBtn>
            <NavBtn name='mgmt' onClick={this.handleToggleView}>
              Item Management
            </NavBtn>
          </Nav>
          {this.state.view === 'log' ? <PurchaseLog /> : null}
          {this.state.view === 'mgmt' ? <ItemMgmt /> : null}
        </Body>
      </Container>
    )
  }
}

export default Store

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
  display: flex;
  flex-direction: column;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 30%;
  :hover {
    background: #444;
  }
`
