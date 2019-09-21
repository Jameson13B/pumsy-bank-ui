import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { REMOVE_POINTS, REMOVE_POINTS_BY_CLASS } from '../../Apollo/Mutation'
import { USER_DASHBOARD_QUERY } from '../../Apollo/Query'
import AddNew from '../Dashboard/DashboardAddNew'

class NegBtnList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: JSON.parse(localStorage.getItem('NegBtnList')) || []
    }
  }
  handleLongPress = e => {
    // Create delete function inside timer
    const index = e.currentTarget.dataset.index
    this.buttonPressTimer = setTimeout(() => this.deleteButton(index), 2000)
  }
  deleteButton = i => {
    const list = this.state.buttons.slice()
    list.splice(i, 1)
    localStorage.setItem('NegBtnList', JSON.stringify(list))
    this.setState({ buttons: list })
  }
  handleLongRelease = () => {
    clearTimeout(this.buttonPressTimer)
  }
  handleListUpdate = list => {
    this.setState({ buttons: list })
  }
  getVariables = button => {
    if (this.props.id.includes('Class')) {
      return {
        class: this.props.id.split(' ')[0],
        title: button.title,
        points: button.points
      }
    } else {
      return {
        id: this.props.id,
        title: button.title,
        points: button.points
      }
    }
  }
  render() {
    const mutation = this.props.id.includes('Class')
      ? REMOVE_POINTS_BY_CLASS
      : REMOVE_POINTS
    return (
      <Container>
        <List>
          {this.state.buttons.map((button, i) => {
            return (
              <Mutation
                mutation={mutation}
                variables={this.getVariables(button)}
                update={(cache, { data: { removePoints } }) => {
                  let { users } = cache.readQuery({
                    query: USER_DASHBOARD_QUERY
                  })
                  users.forEach(user => {
                    if (user.id === removePoints.id) {
                      user.balance = removePoints.balance
                    }
                  })
                  cache.writeQuery({
                    query: USER_DASHBOARD_QUERY,
                    data: { users }
                  })
                }}
                key={i}
              >
                {removePoints => (
                  <Button
                    data-index={i}
                    onTouchStart={this.handleLongPress}
                    onTouchEnd={this.handleLongRelease}
                    onMouseDown={this.handleLongPress}
                    onMouseUp={this.handleLongRelease}
                    onMouseLeave={this.handleLongRelease}
                    onClick={() => {
                      removePoints()
                      this.props.history.replace('/dashboard')
                    }}
                  >
                    <p>{button.title}</p>
                    <p>{button.points}</p>
                  </Button>
                )}
              </Mutation>
            )
          })}
        </List>
        <AddNew
          status='Neg'
          id={this.props.id}
          handleListUpdate={this.handleListUpdate}
        />
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
