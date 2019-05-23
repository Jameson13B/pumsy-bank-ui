import React, { Component } from 'react'
import styled from 'styled-components'

class AdminUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Container>
        <h1>Update</h1>
      </Container>
    )
  }
}

export default AdminUpdate

const Container = styled.div`
  padding: 20px;
`
