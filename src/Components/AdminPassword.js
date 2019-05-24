import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { CHANGE_PASSWORD } from '../Apollo/Mutation'

class AdminPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ''
    }
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  render() {
    return (
      <Mutation
        mutation={CHANGE_PASSWORD}
        variables={{
          // id: FINISH THIS
          password: this.state.password
        }}>
        {changePassword => (
          <Container>
            <List>
              <h1>Password List</h1>
              <h1>Left</h1>
            </List>
            <Form
              onSubmit={e => {
                e.preventDefault()
                changePassword()
                this.setState({ password: '' })
              }}
              autoComplete='off'>
              <Input
                name='password'
                type='password'
                value={this.state.password}
                placeholder='New Password'
                onChange={this.handleInputChange}
              />
              <ChangeBtn type='submit'>Update</ChangeBtn>
            </Form>
          </Container>
        )}
      </Mutation>
    )
  }
}

export default AdminPassword

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
