import gql from 'graphql-tag'

const USER_DASHBOARD_QUERY = gql`
  {
    users {
      id
      name
      balance
    }
  }
`
const USER_PROFILE_QUERY = gql`
  {
    user($id: String!) {
      id
      name
      email
      balance
    }
  }
`
export { USER_DASHBOARD_QUERY, USER_PROFILE_QUERY }
