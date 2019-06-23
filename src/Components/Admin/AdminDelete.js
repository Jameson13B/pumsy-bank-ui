import React, { Component } from 'react'
import styled from 'styled-components'
import Icon from '../Icon'
import { Mutation, Query } from 'react-apollo'
import { DELETE_USER } from '../../Apollo/Mutation'
import { USER_DASHBOARD_QUERY } from '../../Apollo/Query'
import { USER_CHANGE_SUBSCRIPTION } from '../../Apollo/Subscriptions'
import { confirmAlert } from 'react-confirm-alert'
import './alert.css'

class AdminDelete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback: null
    }
  }
  getInitials = name => {
    const first = name.substring(0, 1)
    let last = name
      .split(' ')
      .slice(1, 2)
      .join('')
      .substring(0, 1)
    return first + last
  }
  _subscribeToUserChanges = subscribeToMore => {
    subscribeToMore({
      document: USER_CHANGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const users = [...prev.users]
        const deletedUser = subscriptionData.data.dashboard
        const index = users.findIndex(user => user.id === deletedUser.id)
        if (index === -1) return prev
        users.splice(index, 1)
        return Object.assign({}, prev, {
          users
        })
      }
    })
  }
  render() {
    return (
      <Container>
        {this.state.feedback ? (
          <Feedback>{this.state.feedback}</Feedback>
        ) : null}
        {/* List of Users */}
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
                </Apollo>
              )

            this._subscribeToUserChanges(subscribeToMore)

            let users = data.users

            return (
              <List>
                {users.map(user => (
                  <User key={user.id} id={user.id} name={user.name}>
                    <Initials>{this.getInitials(user.name)}</Initials>
                    <Name>{user.name.substring(0, 20)}</Name>
                    <Mutation
                      mutation={DELETE_USER}
                      variables={{
                        id: user.id
                      }}
                      onCompleted={data => {
                        this.setState({
                          feedback: `Succeessfully deleted: ${
                            data.deleteUser.name
                          }`
                        })
                      }}
                    >
                      {deleteUser => (
                        <CustomIcon
                          icon='delete'
                          onClick={e => {
                            // deleteUser()
                            confirmAlert({
                              title: 'Delete Student?',
                              message: `Are you sure you want to delete ${
                                user.name
                              }? This cannot be undone.`,
                              buttons: [
                                {
                                  label: 'Yes',
                                  onClick: () => deleteUser()
                                },
                                {
                                  label: 'No',
                                  onClick: () => {}
                                }
                              ]
                            })
                          }}
                        />
                      )}
                    </Mutation>
                  </User>
                ))}
              </List>
            )
          }}
        </Query>
      </Container>
    )
  }
}

export default AdminDelete

const Container = styled.div`
  padding: 20px;
  height: 89%;
`
const Apollo = styled.div`
  height: 100vh;
  padding: 50px;
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  overflow: auto;
  height: 100%;
`
const User = styled.li`
  display: flex;
  border: 1px solid white;
  border-radius: 15px;
  padding: 2%;
  margin: 2% 0;
  cursor: pointer;
  line-height: 200%;
  width: 65%;
`
const Initials = styled.h1`
  font-size: 3rem;
  margin: auto 25px;
`
const Name = styled.h1`
  flex: 3;
  text-align: left;
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
`
const CustomIcon = styled(Icon)`
  :hover {
    color: red;
  }
`
const Feedback = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 5px;
`
