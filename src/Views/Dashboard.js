import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { USER_DASHBOARD_QUERY } from '../Apollo/Query'
import { USER_CHANGE_SUBSCRIPTION } from '../Apollo/Subscriptions'
import UserSummary from '../Components/UserSummary'
import Icon from '../Components/Icon'
import styled from 'styled-components'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  _updateCacheAfterVote = (store, createVote, userId) => {
    const data = store.readQuery({ query: USER_DASHBOARD_QUERY })
    console.log('CACHE(Dashboard): ', data)
    const user = data.links.find(user => user.id === userId)
    user.votes = createVote.link.votes

    store.writeQuery({ query: USER_DASHBOARD_QUERY, data })
  }
  _subscribeToUserChanges = subscribeToMore => {
    subscribeToMore({
      document: USER_CHANGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newUser = subscriptionData.data.dashboard
        const exists = prev.users.find(({ id }) => id === newUser.id)
        if (exists) return prev
        return Object.assign({}, prev, {
          users: [newUser, ...prev.users]
        })
      }
    })
  }
  render() {
    return (
      <Container>
        <Header>
          <CstmLink to='/'>
            <Icon icon='home' />
          </CstmLink>
          <h3>Dashboard</h3>
        </Header>
        <Query query={USER_DASHBOARD_QUERY}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            this._subscribeToUserChanges(subscribeToMore)

            const users = data.users

            return (
              <UserList updateStoreAfterChange={this._updateCacheAfterVote}>
                {users
                  .sort((a, b) => {
                    return a.name > b.name ? 1 : -1
                  })
                  .map(user => (
                    <UserSummary key={user.id} user={user} />
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
const UserList = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 2vh;
  width: 65%;
  height: 84vh;
  overflow: auto;
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
