import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { CREATE_USER } from '../../Apollo/Mutation'
import { USER_DASHBOARD_QUERY } from '../../Apollo/Query'

class AdminCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      class: '',
      feedback: null
    }
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  render() {
    return (
      <Mutation
        mutation={CREATE_USER}
        variables={{
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          class: this.state.class
        }}
        onCompleted={data => {
          this.setState({
            feedback: `Succeess: ${data.createUser.user.name} created`
          })
        }}
        update={(cache, { data: { createUser } }) => {
          let { users } = cache.readQuery({ query: USER_DASHBOARD_QUERY })
          users.push(createUser.user)
          cache.writeQuery({
            query: USER_DASHBOARD_QUERY,
            data: { users }
          })
        }}
      >
        {createUser => (
          <Container
            onSubmit={e => {
              e.preventDefault()
              if (
                !this.state.name ||
                !this.state.email ||
                !this.state.password ||
                !this.state.class
              ) {
                return this.setState({ feedback: 'Error: All fields required' })
              }
              createUser()
              this.setState({ name: '', email: '', password: '', class: '' })
            }}
            autoComplete='nope'
          >
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
              name='password'
              type='password'
              value={this.state.password}
              placeholder='Students Password'
              onChange={this.handleInputChange}
            />
            <Input
              name='class'
              type='text'
              value={this.state.class}
              placeholder='Students Class'
              onChange={this.handleInputChange}
            />
            <CreateBtn type='submit'>Create</CreateBtn>
            {this.state.feedback ? (
              <Feedback>{this.state.feedback}</Feedback>
            ) : null}
          </Container>
        )}
      </Mutation>
    )
  }
}

export default AdminCreate

const Container = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 89%;
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
const Feedback = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 5px;
`
