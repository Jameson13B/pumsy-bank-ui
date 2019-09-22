import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { ADD_POINTS, ADD_POINTS_BY_CLASS } from '../../Apollo/Mutation'
import { USER_DASHBOARD_QUERY } from '../../Apollo/Query'
import { database as db } from '../../firebase'
import AddNew from '../Dashboard/DashboardAddNew'

class PosBtnList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: []
    }
  }
  componentDidMount() {
    if (this.state.buttons.length === 0) {
      db.collection('positive')
        .get()
        .then(querySnapshot => {
          let buttons = []
          querySnapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            buttons.push(data)
          })
          // Sort buttons point amount
          buttons.sort((a, b) => (a.points > b.points ? 1 : -1))
          this.setState({ buttons })
        })
        .catch(feedback => this.setState({ feedback }))
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
    localStorage.setItem('PosBtnList', JSON.stringify(list))
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
      ? ADD_POINTS_BY_CLASS
      : ADD_POINTS
    return (
      <Container>
        <List>
          {this.state.buttons.map((button, i) => {
            return (
              <Mutation
                mutation={mutation}
                variables={this.getVariables(button)}
                update={(cache, { data: { addPoints } }) => {
                  let { users } = cache.readQuery({
                    query: USER_DASHBOARD_QUERY
                  })
                  if (addPoints !== undefined) {
                    users.forEach(user => {
                      if (user.id === addPoints.id) {
                        user.balance = addPoints.balance
                      }
                    })
                    cache.writeQuery({
                      query: USER_DASHBOARD_QUERY,
                      data: { users }
                    })
                  }
                }}
                key={i}
              >
                {addPoints => (
                  <Button
                    data-index={i}
                    onTouchStart={this.handleLongPress}
                    onTouchEnd={this.handleLongRelease}
                    onMouseDown={this.handleLongPress}
                    onMouseUp={this.handleLongRelease}
                    onMouseLeave={this.handleLongRelease}
                    onClick={() => {
                      addPoints()
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
          status='Pos'
          id={this.props.id}
          handleListUpdate={this.handleListUpdate}
        />
      </Container>
    )
  }
}

export default PosBtnList

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
