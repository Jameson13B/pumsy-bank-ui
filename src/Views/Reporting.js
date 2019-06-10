import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../Components/Icon'
import { Query } from 'react-apollo'
import { USER_LOG } from '../Apollo/Query'
import moment from 'moment-timezone'

class Reporting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      student: '',
      start: '',
      end: ''
    }
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const variables =
      this.state.start === '' && this.state.end === ''
        ? { id: this.state.student || null }
        : {
            id: this.state.student || null,
            start: this.state.start,
            end: this.state.end
          }
    return (
      <Query query={USER_LOG} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error: Refresh Page</div>

          let logs = data.userLog
          let users = data.users

          return (
            <Container>
              {/* Header */}
              <Header>
                <CstmLink to='/'>
                  <Icon icon='home' />
                </CstmLink>
                <h3>Reporting</h3>
                {/* Student Dropodown */}
                <Select
                  onChange={e => this.setState({ student: e.target.value })}
                  value={this.state.student}>
                  <option value=''>Select Student</option>
                  {users.map(user => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
                {/* Start Date */}
                <DateLabel>Start: </DateLabel>
                <DateInput
                  type='date'
                  name='start'
                  value={this.state.start}
                  onChange={this.handleInputChange}
                />
                {/* End Date */}
                <DateLabel>End: </DateLabel>
                <DateInput
                  type='date'
                  name='end'
                  value={this.state.end}
                  onChange={this.handleInputChange}
                />
              </Header>
              {/* Body */}
              <Body>
                {/* If log is empty return 'nothing to show' */}
                {logs.length === 0 && <Entry>Nothing to show yet...</Entry>}
                {logs.map(log => {
                  const date = moment(log.createdAt)
                  // If there is only the default change return 'select student'
                  return !log.change ? (
                    <Entry key={log.id}>
                      <p>Select Student Above</p>
                    </Entry>
                  ) : (
                    // Else if there is a log with change, create an Entry for each
                    <Entry key={log.id}>
                      <p>{log.change}</p>
                      <p>{log.description}</p>
                      <p>{date.tz('America/Boise').format('l LT')}</p>
                    </Entry>
                  )
                })}
              </Body>
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default Reporting

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 65%;
  height: 9vh;
`
const CstmLink = styled(Link)`
  text-decoration: none;
  color: white;
  vertical-align: middle;
  margin-right: 15px;
  :hover {
    color: #bbb;
  }
`
const Select = styled.select`
  background: #444;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
  color: white;
  font-size: 1rem;
  margin-left: 15px;
  :focus {
    outline: none;
  }
  option {
    text-transform: uppercase;
  }
`
const DateInput = styled.input`
  background: #444;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-left: 5px;
  :focus {
    outline: none;
  }
`
const DateLabel = styled.h1`
  margin-left: 20px;
  font-size: 1.25rem;
`
const Body = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  height: 84vh
  padding: 2vh;
  width: 65%;
  overflow: auto;
`
const Entry = styled.div`
  display: flex;
  justify-content: space-between
  padding: 15px;
  border-top: 1px solid white;
  :last-child {
    border-bottom: 1px solid white;
  }
`
