import React from 'react'
import styled from 'styled-components'

const UserSummary = props => {
  return (
    <User key={props.user.id} data-id={props.user.id}>
      <h1 style={{ fontSize: '2em', margin: 'auto 25px' }}>
        {props.user.name.substring(0, 1)}
      </h1>
      <h1 style={{ flex: '3', textAlign: 'left' }}>{props.user.name}</h1>
      <p style={{ margin: 'auto 25px' }}>{props.user.balance}</p>
    </User>
  )
}

export default UserSummary

const User = styled.div`
  display: flex;
  border: 1px solid white;
  border-radius: 15px;
  padding: 15px 0;
  margin: 15px 0;
  cursor: pointer;
  line-height: 200%;
  :hover {
    background: #444;
  }
`
