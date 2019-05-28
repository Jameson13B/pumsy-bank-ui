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

export { USER_CHANGE_SUBSCRIPTION }
