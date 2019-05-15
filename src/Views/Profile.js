import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { USER_PROFILE } from '../Apollo/Query'
import PosBtnList from '../Components/PosBtnList'

const Profile = props => {
  const id = props.match.params.id
  console.log(id)
  return (
    <Query query={USER_PROFILE} variables={{ id }}>
      {({ loading, error, data, refetch }) => {
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        const user = data.user

        return (
          <Container>
            <h1>
              {user.name} - <span>{user.id}</span>
            </h1>
            <h1>Balance: {user.balance}</h1>
            <h1>{user.email}</h1>
            <PosBtnList />
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
  justify-content: center;
  color: white;
  a {
    color: white;
    margin: 30px auto;
  }
`
