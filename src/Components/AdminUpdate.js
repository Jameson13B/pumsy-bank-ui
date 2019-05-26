import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation, Query } from 'react-apollo'
import { UPDATE_USER } from '../Apollo/Mutation'
import { USER_ADMIN } from '../Apollo/Query'

class AdminUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      email: '',
      parentEmail: '',
      class: '',
      feedback: null
    }
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  handleUserSelect = user =>
    this.setState({
      id: user.id,
      name: user.name,
      email: user.email,
      parentEmail: user.parentEmail || '',
      class: user.class || '',
      feedback: null
    })
  getInitials = name => {
    const first = name.substring(0, 1)
    let last = name
      .split(' ')
      .slice(1, 2)
      .join('')
      .substring(0, 1)
    return first + last
  }
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
                    onClick={() => this.handleUserSelect(user)}>
                    <Initials>{this.getInitials(user.name)}</Initials>
                    <Name>{user.name.substring(0, 20)}</Name>
                  </User>
                ))}
              </List>
            )
          }}
        </Query>
        {/* Form to Update */}
        <Mutation
          mutation={UPDATE_USER}
          variables={{
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            parentEmail: this.state.parentEmail,
            class: this.state.class
          }}
          onCompleted={data => {
            this.setState({
              feedback: `Succeessfully updated: ${data.updateUser.name}`,
              id: '',
              name: '',
              email: '',
              parentEmail: '',
              class: ''
            })
          }}>
          {updateUser => (
            <Form
              onSubmit={e => {
                e.preventDefault()
                updateUser()
                this.setState({ name: '', email: '', password: '' })
              }}
              autoComplete='none'>
              <Input
                name='name'
                type='text'
                value={this.state.name}
                placeholder='Students Name'
                onChange={this.handleInputChange}
              />
              <Input
                name='email'
                type='email'
                value={this.state.email}
                placeholder='Students Email'
                onChange={this.handleInputChange}
              />
              <Input
                name='parentEmail'
                type='text'
                value={this.state.parentEmail}
                placeholder='Parents Email'
                onChange={this.handleInputChange}
              />
              <Input
                name='class'
                type='text'
                value={this.state.class}
                placeholder='Class Name'
                onChange={this.handleInputChange}
              />
              <UpdateButton type='submit'>Update</UpdateButton>
              {this.state.feedback ? (
                <Feedback>{this.state.feedback}</Feedback>
              ) : null}
            </Form>
          )}
        </Mutation>
      </Container>
    )
  }
}

export default AdminUpdate

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 89%;
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
const Input = styled.input`
  background: transparent;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
  color: white;
  font-size: 1.25rem;
  margin: 15px 0;
  :focus {
    outline: none;
  }
`
const UpdateButton = styled.button`
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
const Feedback = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 5px;
`
