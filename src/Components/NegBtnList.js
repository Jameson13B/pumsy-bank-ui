import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { ADD_POINTS } from '../Apollo/Mutation'

class NegBtnList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: JSON.parse(localStorage.getItem('NegBtnList')) || []
    }
  }
  render() {
    return (
      <Container>
        <List>
          {this.state.buttons.map((button, i) => {
            return (
              <Mutation
                mutation={ADD_POINTS}
                variables={{
                  id: this.props.id,
                  title: button.title,
                  points: button.points
                }}
                key={i}>
                {addPoints => (
                  <Button
                    onClick={() => {
                      addPoints()
                      this.props.history.replace('/dashboard')
                    }}>
                    <p>{button.title}</p>
                    <p>{button.points}</p>
                  </Button>
                )}
              </Mutation>
            )
          })}
        </List>
      </Container>
    )
  }
}

export default NegBtnList

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
  font-size: 1rem;
  :hover {
    background: #444;
  }
`
