import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation, Query } from 'react-apollo'
import { CHANGE_PASSWORD } from '../Apollo/Mutation'
import { USER_ADMIN } from '../Apollo/Query'

class AdminUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      parentsEmail: '',
      class: ''
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
          }}>
          {updateUser => (
            <Form
              onSubmit={e => {
                e.preventDefault()
                updateUser()
                this.setState({ name: '', email: '', password: '' })
              }}
              autoComplete='off'>
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
                name='parentsEmail'
                type='parentsEmail'
                value={this.state.parentsEmail}
                placeholder='Parents Email'
                onChange={this.handleInputChange}
              />
              <Input
                name='class'
                type='class'
                value={this.state.class}
                placeholder='Class Name'
                onChange={this.handleInputChange}
              />
              <CreateBtn type='submit'>Update</CreateBtn>
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
const CreateBtn = styled.button`
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
