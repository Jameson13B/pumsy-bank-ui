import gql from 'graphql-tag'

const ADD_POINTS = gql`
  mutation($id: ID!, $title: String!, $points: Int!) {
    addPoints(id: $id, description: $title, points: $points) {
      name
      balance
    }
  }
`
const REMOVE_POINTS = gql`
  mutation($id: ID!, $title: String!, $points: Int!) {
    removePoints(id: $id, description: $title, points: $points) {
      name
      balance
    }
  }
`
const CREATE_USER = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`
const CHANGE_PASSWORD = gql`
  mutation($id: String!, $password: String!) {
    changePassword(id: $id, password: $password)
  }
`
export { ADD_POINTS, REMOVE_POINTS, CREATE_USER, CHANGE_PASSWORD }
