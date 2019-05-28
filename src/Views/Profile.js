import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { USER_PROFILE } from '../Apollo/Query'
import PosBtnList from '../Components/ProfilePosBtnList'
import NegBtnList from '../Components/ProfileNegBtnList'
import Icon from '../Components/Icon'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positive: true
    }
  }
  handleTogglePos = bool => {
    this.setState({ positive: bool })
  }
  render() {
    const id = this.props.match.params.id
    return (
      <Query query={USER_PROFILE} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const user = data.user

          return (
            <Container>
              <Header>
                <CstmLink to='/dashboard'>
                  <Icon icon='arrow_back' />
                </CstmLink>
                <h3>Profile</h3>
              </Header>
              <Body>
                <Name>{user.name}</Name>
                <Id>{user.id}</Id>
                <Item>Balance: {user.balance}</Item>
                <Item>{user.email}</Item>
                <BtnPanel>
                  <Btn onClick={() => this.handleTogglePos(true)}>Positive</Btn>
                  <Btn onClick={() => this.handleTogglePos(false)}>
                    Needs Improvement
                  </Btn>
                </BtnPanel>
                {this.state.positive ? (
                  <PosBtnList id={user.id} history={this.props.history} />
                ) : (
                  <NegBtnList id={user.id} history={this.props.history} />
                )}
              </Body>
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default Profile

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
  width: 65%;
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
  width: 65%;
`
const Name = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  line-height: 100%;
`
const Id = styled.p`
  font-size: 0.75rem;
  font-weight: normal;
  font-style: italic;
  color: #aaa;
  margin: 5px 0 15px 0;
`
const Item = styled.p`
  margin-bottom: 15px;
  font-size: 1.5rem;
`
const BtnPanel = styled.div`
  display: flex;
  width: 25%;
  margin: 0 auto;
`
const Btn = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  font-weight: bold;
  padding: 15px;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  :hover {
    background: #444;
  }
  :nth-child(1) {
    margin-right: 15px;
  }
`
