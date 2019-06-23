import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { USER_PROFILE } from '../Apollo/Query'
import PosBtnList from '../Components/Profile/ProfilePosBtnList'
import NegBtnList from '../Components/Profile/ProfileNegBtnList'
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
    // If the profile is for a class:
    if (id.includes('Class')) {
      return (
        <Container>
          <Header>
            <CstmLink to='/dashboard'>
              <Icon icon='arrow_back' />
            </CstmLink>
            <h3>Profile</h3>
          </Header>
          <Body>
            <Name>{id}</Name>
            <Id>{id}</Id>
            <Item>Add/Remove points for the entire {id}</Item>
            <BtnPanel>
              <Btn
                onClick={() => this.handleTogglePos(true)}
                className={this.state.positive && 'active'}
              >
                Positive
              </Btn>
              <Btn
                onClick={() => this.handleTogglePos(false)}
                className={!this.state.positive && 'active'}
              >
                Needs Improvement
              </Btn>
            </BtnPanel>
            {this.state.positive ? (
              <PosBtnList id={id} history={this.props.history} />
            ) : (
              <NegBtnList id={id} history={this.props.history} />
            )}
          </Body>
        </Container>
      )
    }
    // If a profile is for a student:
    return (
      <Container>
        <Query query={USER_PROFILE} variables={{ id }}>
          {({ loading, error, data, refetch }) => {
            if (loading)
              return (
                <Apollo>
                  <span role='img'>👀</span> Fetching <span role='img'>👀</span>
                </Apollo>
              )
            if (error)
              return (
                <Apollo>
                  <span role='img'>💩</span> Error: Check your internet and try
                  refreshing
                </Apollo>
              )

            const user = data.user

            return (
              <View>
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
                    <Btn
                      onClick={() => this.handleTogglePos(true)}
                      className={this.state.positive && 'active'}
                    >
                      Positive
                    </Btn>
                    <Btn
                      onClick={() => this.handleTogglePos(false)}
                      className={!this.state.positive && 'active'}
                    >
                      Needs Improvement
                    </Btn>
                  </BtnPanel>
                  {this.state.positive ? (
                    <PosBtnList id={user.id} history={this.props.history} />
                  ) : (
                    <NegBtnList id={user.id} history={this.props.history} />
                  )}
                </Body>
              </View>
            )
          }}
        </Query>
      </Container>
    )
  }
}

export default Profile

const Container = styled.div`
  background-color: #282c34;
  font-size: calc(10px + 2vmin);
  color: white;
`
const Apollo = styled.div`
  height: 100vh;
  padding: 50px;
`
const View = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  &.active {
    background: #444;
  }
`
