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
export { ADD_POINTS, REMOVE_POINTS }
