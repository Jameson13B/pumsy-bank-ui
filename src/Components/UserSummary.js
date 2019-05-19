import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const UserSummary = props => {
  const getInitials = name => {
    const first = name.substring(0, 1)
    let last = name
      .split(' ')
      .slice(1, 2)
      .join('')
      .substring(0, 1)
    return first + last
  }
  return (
    <CustomLink to={`profile/${props.user.id}`}>
      <User data-id={props.user.id}>
        <h1 style={{ fontSize: '3rem', margin: 'auto 25px' }}>
          {getInitials(props.user.name)}
        </h1>
        <h1 style={{ flex: '3', textAlign: 'left', fontSize: '1.5rem' }}>
          {props.user.name.substring(0, 20)}
        </h1>
        <p style={{ margin: 'auto 25px', fontSize: '1.5rem' }}>
          {props.user.balance}
        </p>
      </User>
    </CustomLink>
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
const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
  height: 15%;
  width: 45%;
`
