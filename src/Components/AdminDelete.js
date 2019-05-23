import React, { Component } from 'react'
import styled from 'styled-components'

class AdminDelete extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Container>
        <h1>Delete</h1>
      </Container>
    )
  }
}

export default AdminDelete

const Container = styled.div`
  padding: 20px;
`
