import React, { Component } from 'react'
import styled from 'styled-components'

class PosBtnList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: JSON.parse(localStorage.getItem('PosBtnList')) || []
    }
  }
  render() {
    return (
      <Container>
        <h1>Positive</h1>
        <List>
          {this.state.buttons.map(button => {
            return (
              <Button>
                <p>{button.title}</p>
                <p>{button.points}</p>
              </Button>
            )
          })}
        </List>
      </Container>
    )
  }
}

export default PosBtnList

const Container = styled.div`
  margin: 0 auto;
  width: 50%;
`
const List = styled.ul`
  display flex;
  justify-content: space-around
`
const Button = styled.li`
  border: 1px solid white;
  border-radius: 15px;
  padding: 15px;
  margin: 15px;
  cursor: pointer;
  width: 30%;
  font-size: 1em;
  :hover {
    background: #444;
  }
`
