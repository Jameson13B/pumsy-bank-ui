import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { USER_DASHBOARD_QUERY } from '../Apollo/Query'
import { USER_CHANGE_SUBSCRIPTION } from '../Apollo/Subscriptions'
import UserSummary from '../Components/Dashboard/DashboardUserSummary'
import Icon from '../Components/Icon'
import styled from 'styled-components'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      class: localStorage.getItem('filterItem') || 'All'
    }
  }

  _subscribeToUserChanges = subscribeToMore => {
    subscribeToMore({
      document: USER_CHANGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newUser = subscriptionData.data.dashboard
        const exists = prev.users.find(({ id }) => id === newUser.id)
        if (exists) return prev
        return { ...prev, users: [newUser, ...prev.users] }
      }
    })
  }
  handleFilterChange = e => {
    localStorage.setItem('filterItem', e.target.value)
    this.setState({ class: e.target.value })
  }
  render() {
    return (
      <Container>
        <Query query={USER_DASHBOARD_QUERY}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading)
              return (
                <Apollo>
                  <span role='img' aria-label='looking'>
                    👀
                  </span>{' '}
                  Fetching{' '}
                  <span role='img' aria-label='looking'>
                    👀
                  </span>
                </Apollo>
              )
            if (error)
              return (
                <Apollo>
                  <span role='img' aria-label='poop'>
                    💩
                  </span>{' '}
                  Error: Check your internet and try refreshing
                  <br />
                  <CstmLink
                    to='/'
                    onClick={() => localStorage.removeItem('filterItem')}
                  >
                    <Icon icon='home' />
                  </CstmLink>
                </Apollo>
              )

            this._subscribeToUserChanges(subscribeToMore)

            let users = data.users
            // Create list for filter
            let classes = []
            users.forEach(user => {
              if (!classes.includes(user.class)) {
                classes.push(user.class)
              }
            })

            // Filter users and create class button
            let classUser = {
              id: '',
              name: '',
              balance: '',
              class: ''
            }
            if (this.state.class !== 'All') {
              users = users.filter(user => user.class === this.state.class)
              classUser.id = `${this.state.class} Class`
              classUser.name = `${this.state.class} Class`
              classUser.class = this.state.class
            }
            return (
              <View>
                <Header>
                  <CstmLink
                    to='/'
                    onClick={() => localStorage.removeItem('filterItem')}
                  >
                    <Icon icon='home' />
                  </CstmLink>
                  <h3>Dashboard</h3>
                  <Select
                    onChange={this.handleFilterChange}
                    value={this.state.class}
                  >
                    <option value='All'>All</option>
                    {classes.map((clas, i) => (
                      <option value={clas} key={i}>
                        {clas.charAt(0).toUpperCase() + clas.slice(1)}
                      </option>
                    ))}
                  </Select>
                </Header>
                <UserList>
                  {/* If class is filtered show class button */}
                  {this.state.class !== 'All' && (
                    <UserSummary user={classUser} />
                  )}
                  {/* List all users for current filter */}
                  {users
                    .sort((a, b) => {
                      return a.name > b.name ? 1 : -1
                    })
                    .map(user => (
                      <UserSummary key={user.id} user={user} />
                    ))}
                </UserList>
              </View>
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
  color: white;
  font-size: calc(10px + 2vmin);
`
const Apollo = styled.div`
  height: 100vh;
  padding: 50px;
`
const View = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const Header = styled.div`
  align-items: center;
  display: flex;
  height: 9vh;
  justify-content: flex-start;
  width: 75%;
`
const Select = styled.select`
  background: #444;
  border-bottom: 1px solid white;
  border-left: 0;
  border-right: 0;
  border-top: 0;
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
  align-content: flex-start;
  border: 1px solid white;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  height: 84vh;
  justify-content: space-evenly;
  overflow: auto;
  padding: 2vh;
  width: 75%;
`
const CstmLink = styled(Link)`
  color: white;
  margin-right: 15px;
  text-decoration: none;
  vertical-align: middle;
  :hover {
    color: #bbb;
  }
`
