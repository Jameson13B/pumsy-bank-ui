import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { CREATE_USER } from '../Apollo/Mutation'

class AdminCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
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
          password: this.state.password
        }}>
        {createUser => (
          <Container
            onSubmit={e => {
              e.preventDefault()
              createUser()
              this.setState({ name: '', email: '', password: '' })
            }}
            autoComplete='nope'>
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
            <CreateBtn type='submit'>Create</CreateBtn>
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
