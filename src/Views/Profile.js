import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { USER_PROFILE } from '../Apollo/Query'
import PosBtnList from '../Components/PosBtnList'

const Profile = props => {
  const id = props.match.params.id
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
            <PosBtnList id={user.id} history={props.history} />
          </Container>
        )
      }}
    </Query>
  )
}

export default Profile

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 50px 0;
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
