import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

class AddPoints extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Container>
        <h1>Pumsy Bank System</h1>
        <h3>Add Points</h3>
        <Link to='/'>Home</Link>
      </Container>
    )
  }
}

export default AddPoints
