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
export { USER_DASHBOARD_QUERY, USER_ADMIN, USER_PROFILE }
