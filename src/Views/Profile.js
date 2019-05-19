import React, { Component } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { USER_PROFILE } from '../Apollo/Query'
import PosBtnList from '../Components/PosBtnList'
import NegBtnList from '../Components/NegBtnList'

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
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 5vh 0;
  a {
    color: white;
    margin: 30px auto;
  }
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
  margin-bottom: 15px;
`
const Item = styled.p`
  margin-bottom: 15px;
  font-size: 1.5rem;
`
const BtnPanel = styled.div`
  display: flex;
  width: 25%;
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
