import React, { Component } from 'react'
import styled from 'styled-components'

class AdminPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Container>
        <h1>Password</h1>
      </Container>
    )
  }
}

export default AdminPassword

const Container = styled.div`
  padding: 20px;
`
