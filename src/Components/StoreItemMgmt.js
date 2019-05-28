import React, { Component } from 'react'
import styled from 'styled-components'
import { database as db } from '../firebase'

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
            items.push(doc.data())
          })
          console.log(items)
          this.setState({ items })
        })
    }
  }
  render() {
    return (
      <Container>
        <p>Item Management</p>
        <ItemList>
          {/* {this.state.items.map(item => {
            return (
              <div style={{ border: '1px solid white' }}>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <p style={{ fontSize: '3rem' }}>{item.amount}</p>
              </div>
            )
          })} */}
        </ItemList>
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
`
