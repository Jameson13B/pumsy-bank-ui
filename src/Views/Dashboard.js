import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { USER_DASHBOARD_QUERY } from '../Apollo/Query'
import UserSummary from '../Components/UserSummary'
import styled from 'styled-components'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Container>
        <h3>Dashboard</h3>
        <Link to='/'>Home</Link>
        <Query query={USER_DASHBOARD_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            const users = data.users

            return (
              <UserList>
                {users.map(user => (
                  <UserSummary user={user} />
                ))}
              </UserList>
            )
          }}
        </Query>
      </Container>
    )
  }
}

export default Dashboard

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
const UserList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 50%;
`
