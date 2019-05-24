import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation, Query } from 'react-apollo'
import { CHANGE_PASSWORD } from '../Apollo/Mutation'
import { USER_ADMIN } from '../Apollo/Query'

class AdminPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      name: '',
      id: '',
      feedback: null
    }
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  getInitials = name => {
    const first = name.substring(0, 1)
    let last = name
      .split(' ')
      .slice(1, 2)
      .join('')
      .substring(0, 1)
    return first + last
  }
  handleUserSelect = e =>
    this.setState({
      id: e.currentTarget.id,
      name: e.currentTarget.getAttribute('name'),
      feedback: null,
      password: ''
    })
  render() {
    return (
      <Container>
        {/* List of Users */}
        <Query query={USER_ADMIN}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            let users = data.users

            return (
              <List>
                {users.map(user => (
                  <User
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    onClick={this.handleUserSelect}>
                    <Initials>{this.getInitials(user.name)}</Initials>
                    <Name>{user.name.substring(0, 20)}</Name>
                  </User>
                ))}
              </List>
            )
          }}
        </Query>
        {/* Form to Delete */}
        <Mutation
          mutation={CHANGE_PASSWORD}
          variables={{
            id: this.state.id,
            password: this.state.password
          }}
          onCompleted={data =>
            this.setState({ feedback: data.changePassword })
          }>
          {(changePassword, { data }) => (
            <Form
              onSubmit={e => {
                e.preventDefault()
                changePassword()
                this.setState({ password: '' })
              }}
              autoComplete='off'>
              <h1>{this.state.name}</h1>
              {this.state.feedback ? (
                <Feedback>{this.state.feedback}</Feedback>
              ) : null}
              <Input
                name='password'
                type='password'
                value={this.state.password}
                placeholder='New Password'
                onChange={this.handleInputChange}
              />
              <ChangeBtn type='submit'>Update</ChangeBtn>
            </Form>
          )}
        </Mutation>
      </Container>
    )
  }
}

export default AdminPassword

const Container = styled.div`
  display: flex;
  height: 90%;
`

const List = styled.ul`
  flex: 1.25;
  list-style: none;
  overflow: auto;
`
const User = styled.li`
  display: flex;
  border: 1px solid white;
  border-radius: 15px;
  padding: 2%;
  margin: 5% 0;
  cursor: pointer;
  line-height: 200%;
  width: 90%;
  :hover {
    background: #444;
  }
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
const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`
const Feedback = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 5px;
`
const Input = styled.input`
  background: transparent;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
  color: white;
  font-size: 1.25rem;
  margin: 20px 0 15px 0;
  :focus {
    outline: none;
  }
`
const ChangeBtn = styled.button`
  background: transparent;
  border: 1px solid white;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 15px;
  margin: 15px 0;
  :hover {
    background: #444;
  }
`
