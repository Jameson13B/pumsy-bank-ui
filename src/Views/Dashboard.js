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
    this.state = {
      class: 'All'
    }
  }
  _updateCacheAfterVote = (store, createVote, userId) => {
    const data = store.readQuery({ query: USER_DASHBOARD_QUERY })
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
      <Query query={USER_DASHBOARD_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToUserChanges(subscribeToMore)

          let users = data.users
          // Create list for filter
          let classes = []
          users.forEach(user => {
            if (!classes.includes(user.class)) {
              classes.push(user.class)
            }
          })

          // Filter users
          if (this.state.class !== 'All') {
            users = users.filter(user => user.class === this.state.class)
          }
          return (
            <Container>
              <Header>
                <CstmLink to='/'>
                  <Icon icon='home' />
                </CstmLink>
                <h3>Dashboard</h3>
                <Select
                  onChange={e => this.setState({ class: e.target.value })}>
                  <option value='All'>All</option>
                  {classes.map((clas, i) => (
                    <option value={clas} key={i}>
                      {clas.charAt(0).toUpperCase() + clas.slice(1)}
                    </option>
                  ))}
                </Select>
              </Header>
              <UserList updateStoreAfterChange={this._updateCacheAfterVote}>
                {users
                  .sort((a, b) => {
                    return a.name > b.name ? 1 : -1
                  })
                  .map(user => (
                    <UserSummary key={user.id} user={user} />
                  ))}
              </UserList>
            </Container>
          )
        }}
      </Query>
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
const Select = styled.select`
  background: #444;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
  color: white;
  font-size: 1rem;
  margin-left: 15px;
  :focus {
    outline: none;
  }
  option {
    text-transform: uppercase;
  }
`
const UserList = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
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
