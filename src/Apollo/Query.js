import gql from 'graphql-tag'

const USER_DASHBOARD_QUERY = gql`
  {
    users {
      id
      name
      balance
      class
    }
  }
`
const USER_ADMIN = gql`
  {
    users {
      id
      name
      email
      parentEmail
      class
    }
  }
`
const USER_PROFILE = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      balance
    }
  }
`
const USER_LOG = gql`
  query($id: ID, $start: DateTime, $end: DateTime) {
    userLog(id: $id, start: $start, end: $end) {
      id
      change
      description
      createdAt
    }
    users {
      id
      name
    }
  }
`
const PURCHASE_LOG = gql`
  query($date: DateTime) {
    purchases(date: $date) {
      id
      description
      change
      createdAt
      postedBy {
        name
      }
    }
  }`
export { USER_DASHBOARD_QUERY, USER_ADMIN, USER_PROFILE, USER_LOG, PURCHASE_LOG }
