import gql from 'graphql-tag'

const USER_CHANGE_SUBSCRIPTION = gql`
  subscription {
    dashboard {
      id
      name
      balance
    }
  }
`

export { USER_CHANGE_SUBSCRIPTION }
