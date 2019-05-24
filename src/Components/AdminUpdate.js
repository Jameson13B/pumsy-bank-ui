import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { CREATE_USER } from '../Apollo/Mutation'

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
  render() {
    return (
      <Mutation
        mutation={CREATE_USER}
        variables={{
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }}>
        {updateUser => (
          <Container>
            <List>
              <h1>Update</h1>
              <h1>Left</h1>
            </List>
            <Form
              onSubmit={e => {
                e.preventDefault()
                updateUser()
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
          </Container>
        )}
      </Mutation>
    )
  }
}

export default AdminUpdate

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 89%;
`

const List = styled.div`
  flex: 1.25;
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
