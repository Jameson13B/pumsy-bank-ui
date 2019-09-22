import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { PURCHASE_LOG } from '../../Apollo/Query'
import { PURCHASE_LOG_SUBSCRIPTION } from '../../Apollo/Subscriptions'
import moment from 'moment-timezone'

class PurchaseLog extends React.Component {
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
    const start = moment()
      .subtract(1, 'day')
      .format()
    const end = moment()
      .add(1, 'day')
      .format()

    return (
      <Query query={PURCHASE_LOG} variables={{ start, end }}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading)
            return (
              <Apollo>
                <span role='img' aria-label='looking'>
                  👀
                </span>{' '}
                Fetching{' '}
                <span role='img' aria-label='looking'>
                  👀
                </span>
              </Apollo>
            )
          if (error)
            return (
              <Apollo>
                <span role='img' aria-label='poop'>
                  💩
                </span>{' '}
                Error: Check your internet and try refreshing
              </Apollo>
            )

          this._subscribeToPurchaseChanges(subscribeToMore)

          let logs = data.purchases

          return (
            <Container>
              {/* <Body> */}
              {/* If log is empty return 'nothing to show' */}
              {logs.length === 0 && <Entry>Nothing to show yet...</Entry>}
              {logs
                .sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1))
                .map(log => {
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
const Apollo = styled.div`
  height: 100vh;
  padding: 50px;
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
