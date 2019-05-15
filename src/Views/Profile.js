import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { USER_PROFILE } from '../Apollo/Query'

const Profile = props => {
  const id = props.match.params.id
  console.log(id)
  return (
    <Container>
      <h1>User Profile</h1>
      <Query query={USER_PROFILE} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <div>Fetching</div>
          if (error) {
            console.log(error.graphQLErrors)
            console.log(error.networkError)
            return <div>Error</div>
          }

          const user = data.user

          return (
            <div>
              <h1>{user.id}</h1>
              <h1>{user.name}</h1>
              <h1>{user.email}</h1>
              <h1>{user.balance}</h1>
            </div>
          )
        }}
      </Query>
    </Container>
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
