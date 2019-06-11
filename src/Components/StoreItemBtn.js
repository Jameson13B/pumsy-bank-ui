import React from 'react'
import styled from 'styled-components'

const ItemBtn = props => {
  let buttonPressTimer

  const handleLongPress = e => {
    // Create delete function inside timer
    const index = e.currentTarget.dataset.index
    const id = e.currentTarget.dataset.id
    buttonPressTimer = setTimeout(() => props.deleteItem(index, id), 2000)
    // buttonPressTimer = setTimeout(() => alert('Deleted'), 2000)
  }
  const handleLongRelease = () => {
    clearTimeout(buttonPressTimer)
  }
  return (
    <Container
      data-index={props.index}
      data-id={props.item.id}
      onClick={() => props.handleClick(props.item.title, props.item.description, props.item.amount, props.item.id)}
      onTouchStart={handleLongPress}
      onTouchEnd={handleLongRelease}
      onMouseDown={handleLongPress}
      onMouseUp={handleLongRelease}
      onMouseLeave={handleLongRelease}>
      <Title>{props.item.title}</Title>
      <Description>{props.item.description}</Description>
      <Amount>{props.item.amount}</Amount>
    </Container>
  )
}

export default ItemBtn

const Container = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  max-width: 550px;
  width: 100%;
  :hover {
    background: #444;
  }
  p {
    margin: 10px 0;
  }
`
const Title = styled.p`
  font-size: 1.5rem;
`
const Description = styled.p`
  font-size: 1rem;
  font-style: italic;
`
const Amount = styled.p`
  font-size: 1.5rem;
`
