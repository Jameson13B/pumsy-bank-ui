import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { PURCHASE_LOG } from '../Apollo/Query'
import { PURCHASE_LOG_SUBSCRIPTION } from '../Apollo/Subscriptions'
import moment from 'moment-timezone'

class PurchaseLog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date().toISOString().slice(0, 10)
    }
  }

  _subscribeToPurchaseChanges = subscribeToMore => {
    subscribeToMore({
      document: PURCHASE_LOG_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newEntry = subscriptionData.data.purchase
        const exists = prev.purchases.find(({ id }) => id === newEntry.id)
        if (exists) return prev
        return { ...prev, purchases: [newEntry, ...prev.purchases] }
      }
    })
  }

  render() {
    const date = new Date().toISOString().slice(0, 10)
    const start = moment(date)
    const end = moment(date).add(1, 'day')
    return (
      <Query query={PURCHASE_LOG} variables={{ start, end }}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error: Refresh Page</div>

          this._subscribeToPurchaseChanges(subscribeToMore)

          let logs = data.purchases

          return (
            <Container>
              {/* <Body> */}
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
                    <p>{log.postedBy.name}</p>
                    <p>{date.tz('America/Boise').format('MMM Do, LT')}</p>
                  </Entry>
                )
              })}
              {/* </Body> */}
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default PurchaseLog

const Container = styled.div`
  padding: 15px;
  height: 89%;
  overflow: auto;
`
const Entry = styled.div`
  display: flex;
  justify-content: space-between
  padding: 15px 10px;
  border-top: 1px solid white;
  :last-child {
    border-bottom: 1px solid white;
  }
`
