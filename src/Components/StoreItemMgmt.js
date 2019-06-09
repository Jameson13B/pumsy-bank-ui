import React, { Component } from 'react'
import styled from 'styled-components'
import { database as db } from '../firebase'
import ItemBtn from './StoreItemBtn'

class ItemMgmt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
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
          items.sort((a, b) => a.title > b.title ? 1 : -1)
          this.setState({ items })
        })
    }
  }
  deleteItem = (index, id) => {
    const list = this.state.items.slice()
    list.splice(index, 1)
    db.collection('inventory')
      .doc(id)
      .delete()
      .then(() => {
        this.setState({ items: list })
      })
      .catch(err => {
        console.log('Error Deleting: ', err)
        alert('Error Deleting: Try again or check console')
      })
  }
  render() {
    return (
      <Container>
        <p>Item Management</p>
        <ItemList>
          {this.state.items.map((item, i) => {
            return (
              // Props: { item: item }
              <ItemBtn
                item={item}
                key={i}
                index={i}
                deleteItem={this.deleteItem}
              />
            )
          })}
        </ItemList>
        {/* Add Item Form Here */}
      </Container>
    )
  }
}

export default ItemMgmt

const Container = styled.div`
  padding: 20px;
  height: 89%;
`
const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  overflow: auto:
`
