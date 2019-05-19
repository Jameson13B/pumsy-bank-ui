import React, { Component } from 'react'
import styled from 'styled-components'

class AddNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      points: '',
      title: ''
    }
  }
  handleSave = () => {
    // Create new button
    const button = {
      title: this.state.title,
      points: this.state.points
    }
    // Add to localStorage
    let list = JSON.parse(localStorage.getItem(`${this.props.status}BtnList`))
    list.push(button)
    localStorage.setItem(`${this.props.status}BtnList`, JSON.stringify(list))
    this.setState({ points: '', title: '' })
    this.props.history.push(`${this.props.id}`)
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Container>
        <Button onClick={this.handleSave}>
          <p>Add New</p>
        </Button>
        <Input
          name='points'
          value={this.state.points}
          placeholder='Points'
          onChange={this.handleChange}
        />
        <Input
          name='title'
          value={this.state.title}
          placeholder='Title'
          onChange={this.handleChange}
        />
      </Container>
    )
  }
}

export default AddNew

const Container = styled.div`
  display: flex;
  padding: 25px 15px;
`
const Button = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  padding: 1% 0;
  cursor: pointer;
  flex: 1;
  font-size: 1rem;
  :hover {
    background: #444;
  }
`
const Input = styled.input`
  background: transparent;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
  color: white;
  flex: 1;
  font-size: 1rem;
  margin-left: 25px;
  :last-child {
    flex: 3;
  }
`
