import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { REMOVE_POINTS } from '../Apollo/Mutation'
import AddNew from '../Components/AddNew'

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
                mutation={REMOVE_POINTS}
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
        <AddNew status='Neg' id={this.props.id} history={this.props.history} />
      </Container>
    )
  }
}

export default NegBtnList

const Container = styled.div`
  margin: 25px auto;
  width: 75%;
`
const List = styled.ul`
  border: 1px solid white;
  border-radius: 15px;
  display flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-between;
  height: 85%;
  padding-bottom: 25px;
`
const Button = styled.li`
  border: 1px solid white;
  border-radius: 15px;
  padding: 1% 0;
  cursor: pointer;
  width: 30%;
  font-size: 1rem;
  margin-top: 25px;
  :hover {
    background: #444;
  }
`
