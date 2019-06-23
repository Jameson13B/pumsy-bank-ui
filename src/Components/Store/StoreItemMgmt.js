import React, { Component } from 'react'
import styled from 'styled-components'
import { database as db } from '../../firebase'
import ItemBtn from './StoreItemBtn'

class ItemMgmt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      feedback: null,
      title: '',
      description: '',
      amount: '',
      id: '',
      creating: true
    }
  }
  componentDidMount() {
    if (this.state.items.length === 0) {
      db.collection('inventory')
        .get()
        .then(querySnapshot => {
          let items = []
          querySnapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            items.push(data)
          })
          // Sort buttons alphabetically
          items.sort((a, b) => (a.title > b.title ? 1 : -1))
          this.setState({ items })
        })
        .catch(feedback => this.setState({ feedback }))
    }
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  handleUpdateSelect = (title, description, amount, id) =>
    this.setState({ title, description, amount, id, creating: false })
  clearState = list => {
    this.setState({
      items: list,
      title: '',
      description: '',
      amount: '',
      id: '',
      feedback: null
    })
  }
  deleteItem = (index, id) => {
    const list = this.state.items.slice()
    list.splice(index, 1)
    db.collection('inventory')
      .doc(id)
      .delete()
      .then(() => {
        this.clearState(list)
      })
      .catch(feedback => this.setState({ feedback }))
  }
  createItem = newItem => {
    const list = [...this.state.items, newItem].sort((a, b) =>
      a.title > b.title ? 1 : -1
    )
    db.collection('inventory')
      .add(newItem)
      .then(res => {
        this.clearState(list)
      })
      .catch(feedback => this.setState({ feedback }))
  }
  updateItem = newItem => {
    const list = this.state.items.map(item =>
      item.id === newItem.id ? newItem : item
    )
    db.collection('inventory')
      .doc(newItem.id)
      .update(newItem)
      .then(() =>
        this.setState({
          items: list,
          title: '',
          description: '',
          amount: '',
          id: '',
          feedback: null,
          creating: true
        })
      )
      .catch(feedback => this.setState({ feedback }))
  }
  render() {
    const newItem = {
      title: this.state.title,
      description: this.state.description,
      amount: this.state.amount,
      id: this.state.id
    }
    return (
      <Container>
        <ItemList>
          {this.state.items.map((item, i) => {
            return (
              // Props: { item: item }
              <ItemBtn
                item={item}
                key={i}
                index={i}
                deleteItem={this.deleteItem}
                handleClick={this.handleUpdateSelect}
              />
            )
          })}
        </ItemList>
        {/* Add/Update Item Form */}
        <Form
          onSubmit={e => {
            e.preventDefault()
            this.state.creating
              ? this.createItem(newItem)
              : this.updateItem(newItem)
          }}
          autoComplete='none'
        >
          <Input
            name='title'
            type='text'
            value={this.state.title}
            placeholder='Item Title'
            onChange={this.handleInputChange}
          />
          <Input
            name='description'
            type='text'
            value={this.state.description}
            placeholder='Item Description'
            onChange={this.handleInputChange}
          />
          <Input
            name='amount'
            type='text'
            value={this.state.amount}
            placeholder='Item Amount'
            onChange={this.handleInputChange}
          />
          <SubmitButton type='submit'>
            {this.state.creating ? 'Create Item' : 'Update Item'}
          </SubmitButton>
          {this.state.feedback ? (
            <Feedback>{this.state.feedback}</Feedback>
          ) : null}
        </Form>
      </Container>
    )
  }
}

export default ItemMgmt

const Container = styled.div`
  padding: 20px;
  height: 89%;
  min-height: 0;
`
const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60%;
  overflow: auto;
`
const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40%;
`
const Input = styled.input`
  background: transparent;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
  color: white;
  font-size: 1.25rem;
  margin: 15px 0;
  :focus {
    outline: none;
  }
`
const SubmitButton = styled.button`
  background: transparent;
  border: 1px solid white;
  border-radius: 15px;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 15px;
  margin: 15px 0;
  :hover {
    background: #444;
  }
`
const Feedback = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 5px;
`
