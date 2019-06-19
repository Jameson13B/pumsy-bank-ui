import gql from 'graphql-tag'

const USER_CHANGE_SUBSCRIPTION = gql`
  subscription {
    dashboard {
      id
      name
      balance
      class
    }
  }
`

const PURCHASE_LOG_SUBSCRIPTION = gql`
  subscription {
    purchase {
      id
      description
      change
      createdAt
      postedBy {
        name
      }
    }
  }
`

export { USER_CHANGE_SUBSCRIPTION, PURCHASE_LOG_SUBSCRIPTION }
