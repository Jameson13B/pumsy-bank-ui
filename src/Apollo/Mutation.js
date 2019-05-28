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
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $class: String!
  ) {
    createUser(name: $name, email: $email, password: $password, class: $class) {
      token
      user {
        id
        name
      }
    }
  }
`
const UPDATE_USER = gql`
  mutation(
    $id: ID!
    $name: String
    $email: String
    $parentEmail: String
    $class: String
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      parentEmail: $parentEmail
      class: $class
    ) {
      id
      name
      email
      parentEmail
      balance
      class
    }
  }
`
const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`
const CHANGE_PASSWORD = gql`
  mutation($id: ID!, $password: String!) {
    changePassword(id: $id, password: $password)
  }
`
export {
  ADD_POINTS,
  REMOVE_POINTS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CHANGE_PASSWORD
}
